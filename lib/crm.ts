import { env } from "./cloudflare";
import type { Lead } from "./leads";

/**
 * Sends each enquiry to the CRM (crm.fiaxe.com) as a lead. The mobile number
 * is the match: if the CRM already has a lead with it, that lead is updated,
 * otherwise a new one is created. So a number that enquires twice, or moves
 * from the first step to the full form, stays one lead.
 *
 * A number that has only been verified is a "Partial entry": it is still a
 * lead the team can call. Once the rest of the form comes in, the same lead
 * moves to "New". A lead the team has already moved on is left where it is.
 *
 * Setting, a Worker secret: CRM_API_KEY. Until it is set, nothing is sent.
 *
 * A failed sync never fails the enquiry: it is already saved in D1.
 */

const BASE = "https://crm.fiaxe.com/api/records";

/** Pipeline stages this file sets; both must exist in the CRM, spelled exactly like this. */
const PARTIAL = "Partial entry";
const NEW = "New";

type CrmRecord = { id: string; status?: string | null; phone?: string | null; notes?: string | null };

const noteRows: [keyof Lead, string][] = [
  ["country", "Country"],
  ["treatment", "Treatment"],
  ["timeline", "Travel"],
  ["budget", "Matters most"],
  ["preference", "City or hospital"],
  ["notes", "Notes"],
  ["reportFile", "Report"],
  ["source", "Page"],
];

export async function syncLeadToCrm(lead: Lead): Promise<void> {
  const key = env().CRM_API_KEY?.trim();
  if (!key) {
    console.log("[crm] not sent (CRM_API_KEY not set)");
    return;
  }

  try {
    const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

    const found = await fetch(`${BASE}?${new URLSearchParams({ phone: lead.phone, limit: "20" })}`, { headers });
    if (!found.ok) throw new Error(`search ${found.status}`);
    const { records = [] } = (await found.json()) as { records?: CrmRecord[] };
    const existing = records.find((r) => r.phone?.replace(/\s/g, "") === lead.phone);

    const partial = !lead.completedAt;
    const stamp = (lead.completedAt ?? lead.updatedAt ?? lead.createdAt).slice(0, 10);
    const entry = [
      `Website enquiry ${stamp}${partial ? " (number only so far)" : ""}`,
      ...noteRows
        .map(([k, title]) => [title, String(lead[k] ?? "").trim()] as const)
        .filter(([, value]) => value)
        .map(([title, value]) => `${title}: ${value}`),
    ].join("\n");

    // Only fields that have a value are sent, so a later, thinner form never
    // blanks out what an earlier one filled in.
    const fields: Record<string, string> = { phone: lead.phone };
    if (lead.name) fields.name = lead.name;
    if (lead.email) fields.email = lead.email;

    const res = existing
      ? await fetch(`${BASE}/${existing.id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            ...fields,
            ...(!partial && (!existing.status || existing.status === PARTIAL) ? { status: NEW } : {}),
            notes: existing.notes && !existing.notes.includes(entry) ? `${existing.notes}\n\n---\n${entry}` : entry,
          }),
        })
      : await fetch(BASE, {
          method: "POST",
          headers,
          body: JSON.stringify({ name: lead.name || lead.phone, ...fields, status: partial ? PARTIAL : NEW, notes: entry }),
        });
    if (!res.ok) throw new Error(`${existing ? "update" : "create"} ${res.status}`);
  } catch (error) {
    console.error("[crm] sync failed", error instanceof Error ? error.message : String(error));
  }
}
