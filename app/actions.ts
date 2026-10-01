"use server";

import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { createLead, saveReport, updateLead } from "@/lib/leads";

/**
 * Enquiry handling. Phone validation runs here rather than in the browser, so
 * the phone metadata never has to be downloaded to a slow connection.
 */

export type ActionResult =
  | { ok: true; leadId: string }
  | { ok: false; error: "phone" | "name" | "email" | "consent" | "file" | "generic" };

/**
 * Both actions take the previous state as their first argument so the form can
 * use them with `useActionState`. That also lets the form submit and work
 * before, or without, JavaScript.
 */

const MAX_REPORT_BYTES = 8 * 1024 * 1024;
const ALLOWED_REPORT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

/** Step 1: mobile number only. Saved immediately, before anything else is asked. */
export async function saveNumber(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const iso = String(formData.get("iso") ?? "").toUpperCase();
    const digits = String(formData.get("phone") ?? "");
    const source = String(formData.get("source") ?? "/");

    const parsed = parsePhoneNumberFromString(digits, iso as CountryCode);
    if (!parsed || !parsed.isValid()) return { ok: false, error: "phone" };

    const lead = await createLead({
      phone: parsed.number,
      phoneIso: parsed.country ?? iso,
      source,
    });
    return { ok: true, leadId: lead.id };
  } catch {
    return { ok: false, error: "generic" };
  }
}

/** Step 2: the rest of the details, attached to the lead from step 1. */
export async function saveDetails(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const leadId = String(formData.get("leadId") ?? "");
    if (!leadId) return { ok: false, error: "generic" };

    const name = String(formData.get("name") ?? "").trim();
    if (name.length < 2) return { ok: false, error: "name" };

    const email = String(formData.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, error: "email" };

    if (formData.get("consent") !== "yes") return { ok: false, error: "consent" };

    const report = formData.get("report");
    let reportFile: string | undefined;
    if (report instanceof File && report.size > 0) {
      if (report.size > MAX_REPORT_BYTES || !ALLOWED_REPORT_TYPES.includes(report.type)) {
        return { ok: false, error: "file" };
      }
      reportFile = await saveReport(leadId, report);
    }

    const updated = await updateLead(leadId, {
      name,
      email,
      country: String(formData.get("country") ?? ""),
      treatment: String(formData.get("treatment") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      consent: true,
      reportFile,
      completedAt: new Date().toISOString(),
    });
    if (!updated) return { ok: false, error: "generic" };

    return { ok: true, leadId };
  } catch {
    return { ok: false, error: "generic" };
  }
}
