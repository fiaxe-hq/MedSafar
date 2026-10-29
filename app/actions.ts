"use server";

import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { headers } from "next/headers";
import { after } from "next/server";
import { syncLeadToCrm } from "@/lib/crm";
import { createLead, hashIp, overLeadLimit, saveReport, updateLead, type Lead } from "@/lib/leads";
import { checkPhone, rememberVerified, verifiedPhone, type PhoneCheck } from "@/lib/otp";
import { getQuestionnaire } from "@/content/questionnaires";
import { dialCodes } from "@/content/dial-codes";

/**
 * Enquiry handling. Phone validation runs here rather than in the browser, so
 * the phone metadata never has to be downloaded to a slow connection.
 */

export type ActionResult =
  | { ok: true; leadId: string }
  | {
      ok: false;
      error:
        | "phone"
        | "name"
        | "email"
        | "consent"
        | "file"
        | "limit"
        | "required"
        | "generic"
        | Exclude<PhoneCheck, "verified">;
      /** Set while the visitor is at the code step: the number, written out. */
      sentTo?: string;
    };

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

/**
 * The code step, shared by both forms. A `code` field in the form means the
 * visitor typed one; without it (or with the resend button) a new code is
 * sent. A number already checked in this browser passes straight through.
 */
async function verifyPhone(formData: FormData, phone: string, ipHash: string | null): Promise<PhoneCheck> {
  const code = formData.get("code");
  if (formData.get("resend") !== "yes" && typeof code === "string") {
    // TEMP: an empty code passes outside production, for testing.
    if (!code.trim() && process.env.NODE_ENV !== "production") {
      await rememberVerified(phone);
      return "verified";
    }
    return code.trim() ? checkPhone(phone, ipHash, code) : "code";
  }
  return checkPhone(phone, ipHash, null);
}

/** Sends the enquiry to the CRM once the response has gone, so the visitor never waits on it. The CRM emails the team. */
async function alertTeam(lead: Lead) {
  after(() => syncLeadToCrm(lead));
}

/** The number already checked in this browser, so the forms need not ask again. */
export async function getVerified(): Promise<{ phone: string; iso: string; shown: string } | null> {
  try {
    const phone = await verifiedPhone();
    const parsed = phone ? parsePhoneNumberFromString(phone) : null;
    if (!parsed?.country) return null;
    return { phone: parsed.number, iso: parsed.country, shown: parsed.formatInternational() };
  } catch {
    return null;
  }
}

/**
 * Step 1: mobile number only. Saved as soon as the number is confirmed with
 * its code, before anything else is asked.
 */
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

    const ip = (await headers()).get("cf-connecting-ip");
    const ipHash = ip ? await hashIp(ip) : null;
    if (await overLeadLimit(parsed.number, ipHash)) return { ok: false, error: "limit" };

    const check = await verifyPhone(formData, parsed.number, ipHash);
    if (check !== "verified") return { ok: false, error: check, sentTo: parsed.formatInternational() };

    const lead = await createLead({
      phone: parsed.number,
      phoneIso: parsed.country ?? iso,
      source,
      ipHash,
    });
    // A problem picked on the treatments page travels with the number, so it
    // is kept even if step 2 is never sent.
    const treatment = String(formData.get("treatment") ?? "").slice(0, 200);
    const notes = String(formData.get("notes") ?? "").slice(0, 500);
    const saved = treatment || notes ? ((await updateLead(lead.id, { treatment, notes })) ?? lead) : lead;
    after(() => syncLeadToCrm(saved));
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
      budget: String(formData.get("budget") ?? ""),
      preference: String(formData.get("preference") ?? "").trim(),
      notes: String(formData.get("notes") ?? ""),
      consent: true,
      reportFile,
      completedAt: new Date().toISOString(),
    });
    if (!updated) return { ok: false, error: "generic" };

    await alertTeam(updated);
    return { ok: true, leadId };
  } catch {
    return { ok: false, error: "generic" };
  }
}

/**
 * A pre-surgery questionnaire, sent in one go with the contact details. The
 * answers become the enquiry's notes, one line per question.
 */
export async function saveQuestionnaire(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const questionnaire = getQuestionnaire(String(formData.get("questionnaire") ?? ""));
    if (!questionnaire) return { ok: false, error: "generic" };

    const lines = [`Questionnaire: ${questionnaire.heading}`];
    for (const question of questionnaire.sections.flatMap((s) => s.questions)) {
      const values = formData
        .getAll(question.id)
        .map((v) => String(v).trim())
        .filter(Boolean);
      if (question.kind === "number" && values[0]) {
        const n = Number(values[0]);
        if (!Number.isFinite(n) || n < question.min || n > question.max) {
          return { ok: false, error: "required" };
        }
      }
      if (!values.length) {
        if (question.optional) continue;
        return { ok: false, error: "required" };
      }
      const answer = question.kind === "number" ? `${values[0]} ${question.unit}` : values.join(", ");
      lines.push(`${question.label}: ${answer}`);
    }

    if (questionnaire.bmi) {
      const cm = Number(formData.get(questionnaire.bmi.height));
      const kg = Number(formData.get(questionnaire.bmi.weight));
      if (cm && kg) lines.push(`BMI: ${(kg / (cm / 100) ** 2).toFixed(1)}`);
    }

    const name = String(formData.get("name") ?? "").trim();
    if (name.length < 2) return { ok: false, error: "name" };

    const email = String(formData.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, error: "email" };

    if (formData.get("consent") !== "yes") return { ok: false, error: "consent" };

    const iso = String(formData.get("iso") ?? "").toUpperCase();
    const parsed = parsePhoneNumberFromString(String(formData.get("phone") ?? ""), iso as CountryCode);
    if (!parsed || !parsed.isValid()) return { ok: false, error: "phone" };

    const ip = (await headers()).get("cf-connecting-ip");
    const ipHash = ip ? await hashIp(ip) : null;
    if (await overLeadLimit(parsed.number, ipHash)) return { ok: false, error: "limit" };

    const check = await verifyPhone(formData, parsed.number, ipHash);
    if (check !== "verified") return { ok: false, error: check, sentTo: parsed.formatInternational() };

    const phoneIso = parsed.country ?? iso;
    const lead = await createLead({
      phone: parsed.number,
      phoneIso,
      source: `/questionnaires/${questionnaire.slug}`,
      ipHash,
    });
    const updated = await updateLead(lead.id, {
      name,
      email,
      country: dialCodes.find((c) => c.iso === phoneIso)?.name ?? "",
      treatment: questionnaire.treatment,
      notes: lines.join("\n"),
      consent: true,
      completedAt: new Date().toISOString(),
    });
    if (!updated) return { ok: false, error: "generic" };

    await alertTeam(updated);
    return { ok: true, leadId: lead.id };
  } catch {
    return { ok: false, error: "generic" };
  }
}
