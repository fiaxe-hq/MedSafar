import { env } from "./cloudflare";
import type { Lead } from "./leads";

/**
 * Sends each enquiry to the CRM (crm.fiaxe.com) as a lead. The mobile number
 * is the match: if the CRM already has a lead with it, that lead is updated,
 * otherwise a new one is created. So a number that enquires twice, or moves
 * from the first step to the full form, stays one lead.
 *
 * A number on its own is a "Partial entry": it is still a
 * lead the team can call. Once the rest of the form comes in, the same lead
 * moves to "Email pending"; a CRM workflow sends the thank-you email and then
 * moves it to "New". A lead already moved on is left where it is.
 *
 * The workflow fires only on updates, so a lead always starts as a "Partial
 * entry" and is moved to "Email pending" by an update, even when the whole
 * form arrives in one go (the questionnaires).
 *
 * The page the enquiry came from goes in its own CRM field, "page_source"
 * (PAGE_FIELD below), not in the notes. If the CRM refuses the field (it has
 * not been added there yet), the lead is sent again without it and the page
 * goes in the notes as before, so no lead is ever lost over it.
 *
 * Setting, a Worker secret: CRM_API_KEY. Until it is set, nothing is sent.
 *
 * A failed sync never fails the enquiry: it is already saved in D1.
 */

const BASE = "https://crm.fiaxe.com/api/records";

/**
 * Pipeline stages this file sets, spelled exactly as the CRM workflow expects.
 * The workflow, not this file, moves a lead from EMAIL_PENDING to "New".
 */
/** The CRM field that holds the page the enquiry came from. */
const PAGE_FIELD = "page_source";

const PARTIAL = "Partial entry";
const EMAIL_PENDING = "Email pending";

type CrmRecord = { id: string; status?: string | null; phone?: string | null; notes?: string | null };

const noteRows: [keyof Lead, string][] = [
  ["country", "Country"],
  ["treatment", "Treatment"],
  ["timeline", "Travel"],
  ["budget", "Matters most"],
  ["preference", "City or hospital"],
  ["notes", "Notes"],
  ["reportFile", "Report"],
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
    /** The notes for this enquiry; `withPage` only when the page has no field of its own. */
    const entryText = (withPage: boolean) =>
      [
        `Website enquiry ${stamp}${partial ? " (number only so far)" : ""}`,
        ...noteRows
          .map(([k, title]) => [title, String(lead[k] ?? "").trim()] as const)
          .filter(([, value]) => value)
          .map(([title, value]) => `${title}: ${value}`),
        ...(withPage && lead.source ? [`Page: ${lead.source}`] : []),
        ...(partial ? [] : [`Marketing messages: ${lead.marketing ? "yes" : "no"}`]),
      ].join("\n");

    // Only fields that have a value are sent, so a later, thinner form never
    // blanks out what an earlier one filled in.
    const fields: Record<string, string> = { phone: lead.phone };
    if (lead.name) fields.name = lead.name;
    if (lead.email) fields.email = lead.email;

    /** Creates or updates the lead, with the page in its own field or in the notes. */
    const send = (pageField: boolean) => {
      const entry = entryText(!pageField);
      const page = pageField && lead.source ? { [PAGE_FIELD]: lead.source } : {};
      return existing
        ? fetch(`${BASE}/${existing.id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({
              ...fields,
              ...page,
              ...(!partial && (!existing.status || existing.status === PARTIAL) ? { status: EMAIL_PENDING } : {}),
              notes: existing.notes && !existing.notes.includes(entry) ? `${existing.notes}\n\n---\n${entry}` : entry,
            }),
          })
        : fetch(BASE, {
            method: "POST",
            headers,
            body: JSON.stringify({ name: lead.name || lead.phone, ...fields, ...page, status: PARTIAL, notes: entry }),
          });
    };

    let res = await send(true);
    if (res.status === 400 || res.status === 422) {
      console.error(`[crm] "${PAGE_FIELD}" refused (${res.status}); sent with the page in the notes`);
      res = await send(false);
    }
    if (!res.ok) throw new Error(`${existing ? "update" : "create"} ${res.status}`);

    if (!existing && !partial) {
      const { record } = (await res.json()) as { record: { id: string } };
      const moved = await fetch(`${BASE}/${record.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: EMAIL_PENDING }),
      });
      if (!moved.ok) throw new Error(`status ${moved.status}`);
    }
  } catch (error) {
    console.error("[crm] sync failed", error instanceof Error ? error.message : String(error));
  }
}
