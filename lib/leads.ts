import { env } from "./cloudflare";

/**
 * Enquiry store.
 *
 * Leads live in the D1 database (LEADS_DB) and uploaded reports in the R2
 * bucket (REPORTS). The CRM, the email alert and the WhatsApp hook plug in here
 * later — nothing else has to change, because the rest of the app only calls
 * the functions below.
 */

export type Lead = {
  id: string;
  /** Full number in E.164, e.g. +2348012345678 */
  phone: string;
  phoneIso: string;
  /** Page the enquiry came from: "/", "/ng" or "/treatments/knee-replacement" */
  source: string;
  createdAt: string;
  updatedAt: string;
  /** Filled in at step 2. */
  name?: string;
  email?: string;
  country?: string;
  treatment?: string;
  timeline?: string;
  budget?: string;
  preference?: string;
  notes?: string;
  reportFile?: string;
  /** True once the team chose to keep a report past its month (see listOldReports). */
  reportKept?: boolean;
  consent?: boolean;
  /** Optional, separate from `consent`: may we send promotional messages. */
  marketing?: boolean;
  completedAt?: string;
};

type LeadRow = {
  id: string;
  phone: string;
  phone_iso: string;
  source: string;
  created_at: string;
  updated_at: string;
  name: string | null;
  email: string | null;
  country: string | null;
  treatment: string | null;
  timeline: string | null;
  budget: string | null;
  preference: string | null;
  notes: string | null;
  report_file: string | null;
  report_kept: number | null;
  consent: number | null;
  marketing: number | null;
  completed_at: string | null;
};

/** Lead fields that step 2 may set, mapped to their column names. */
const patchColumns = {
  phone: "phone",
  phoneIso: "phone_iso",
  source: "source",
  name: "name",
  email: "email",
  country: "country",
  treatment: "treatment",
  timeline: "timeline",
  budget: "budget",
  preference: "preference",
  notes: "notes",
  reportFile: "report_file",
  consent: "consent",
  marketing: "marketing",
  completedAt: "completed_at",
} as const;

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    phone: row.phone,
    phoneIso: row.phone_iso,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    name: row.name ?? undefined,
    email: row.email ?? undefined,
    country: row.country ?? undefined,
    treatment: row.treatment ?? undefined,
    timeline: row.timeline ?? undefined,
    budget: row.budget ?? undefined,
    preference: row.preference ?? undefined,
    notes: row.notes ?? undefined,
    reportFile: row.report_file ?? undefined,
    reportKept: row.report_kept === 1,
    consent: row.consent === null ? undefined : row.consent === 1,
    marketing: row.marketing === null ? undefined : row.marketing === 1,
    completedAt: row.completed_at ?? undefined,
  };
}

/** New enquiries allowed from one connection or one phone number per window. */
export const LEAD_LIMIT = 3;
const LEAD_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * One-way hash of the visitor's IP address, so the rate limit works without
 * storing the address itself.
 */
export async function hashIp(ip: string): Promise<string> {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`medsafar-leads:${ip}`),
  );
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** True once this connection or this number has sent LEAD_LIMIT enquiries in 24 hours. */
export async function overLeadLimit(phone: string, ipHash: string | null): Promise<boolean> {
  const since = new Date(Date.now() - LEAD_WINDOW_MS).toISOString();
  const row = await env()
    .LEADS_DB.prepare(
      "SELECT COUNT(*) AS n FROM leads WHERE created_at > ? AND (phone = ? OR (? IS NOT NULL AND ip_hash = ?))",
    )
    .bind(since, phone, ipHash, ipHash)
    .first<{ n: number }>();
  return (row?.n ?? 0) >= LEAD_LIMIT;
}

/** Step 1. Called the moment a mobile number is submitted. */
export async function createLead(input: {
  phone: string;
  phoneIso: string;
  source: string;
  ipHash: string | null;
}): Promise<Lead> {
  const now = new Date().toISOString();
  const { ipHash, ...rest } = input;
  const lead: Lead = { id: crypto.randomUUID(), ...rest, createdAt: now, updatedAt: now };
  await env()
    .LEADS_DB.prepare(
      "INSERT INTO leads (id, phone, phone_iso, source, created_at, updated_at, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(lead.id, lead.phone, lead.phoneIso, lead.source, now, now, ipHash)
    .run();
  return lead;
}

/** Step 2. Adds the details to the lead saved at step 1. */
export async function updateLead(
  id: string,
  patch: Partial<Omit<Lead, "id" | "createdAt">>,
): Promise<Lead | null> {
  const sets = ["updated_at = ?"];
  const values: (string | number | null)[] = [new Date().toISOString()];
  for (const [key, column] of Object.entries(patchColumns)) {
    const value = patch[key as keyof typeof patchColumns];
    if (value === undefined) continue;
    sets.push(`${column} = ?`);
    values.push(typeof value === "boolean" ? Number(value) : value);
  }

  const row = await env()
    .LEADS_DB.prepare(`UPDATE leads SET ${sets.join(", ")} WHERE id = ? RETURNING *`)
    .bind(...values, id)
    .first<LeadRow>();
  return row ? toLead(row) : null;
}

/** Stores an uploaded medical report and returns the stored file name. */
export async function saveReport(leadId: string, file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
  const stored = `${leadId}-${safeName}`;
  await env().REPORTS.put(stored, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });
  return stored;
}

// Admin

/** Newest first, for the read-only list in /admin/enquiries. */
export async function listLeads(limit = 200): Promise<Lead[]> {
  const { results } = await env()
    .LEADS_DB.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all<LeadRow>();
  return results.map(toLead);
}

/**
 * Erases an enquiry for good: its row, its uploaded report and the code
 * checks kept for its number. The copy in the CRM is not touched; it is
 * deleted there. Returns false if no such enquiry exists.
 */
export async function deleteLead(id: string): Promise<boolean> {
  const db = env().LEADS_DB;
  const row = await db
    .prepare("SELECT phone, report_file FROM leads WHERE id = ?")
    .bind(id)
    .first<{ phone: string; report_file: string | null }>();
  if (!row) return false;
  if (row.report_file) await env().REPORTS.delete(row.report_file);
  await db.batch([
    db.prepare("DELETE FROM leads WHERE id = ?").bind(id),
    db.prepare("DELETE FROM otp_sends WHERE phone = ?").bind(row.phone),
    db.prepare("DELETE FROM otp_attempts WHERE phone = ?").bind(row.phone),
  ]);
  return true;
}

/** How long a report is kept before the team is asked whether to keep it. */
export const REPORT_REVIEW_DAYS = 30;

/** Reports uploaded more than a month ago that nobody has chosen to keep yet. Oldest first. */
export async function listOldReports(): Promise<Lead[]> {
  const before = new Date(Date.now() - REPORT_REVIEW_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { results } = await env()
    .LEADS_DB.prepare(
      "SELECT * FROM leads WHERE report_file IS NOT NULL AND report_kept IS NOT 1 AND completed_at < ? ORDER BY completed_at",
    )
    .bind(before)
    .all<LeadRow>();
  return results.map(toLead);
}

/** Keeps a report past its month; it is not listed again. */
export async function keepReport(id: string): Promise<void> {
  await env().LEADS_DB.prepare("UPDATE leads SET report_kept = 1 WHERE id = ?").bind(id).run();
}

/** Erases a report but keeps the rest of the enquiry. */
export async function deleteReport(id: string): Promise<void> {
  const db = env().LEADS_DB;
  const row = await db.prepare("SELECT report_file FROM leads WHERE id = ?").bind(id).first<{ report_file: string | null }>();
  if (!row?.report_file) return;
  await env().REPORTS.delete(row.report_file);
  await db.prepare("UPDATE leads SET report_file = NULL, report_kept = NULL WHERE id = ?").bind(id).run();
}

/**
 * An uploaded report, but only one that belongs to a lead: a stored file name
 * that no lead points at is never served.
 */
export async function getReport(file: string): Promise<R2ObjectBody | null> {
  const owner = await env()
    .LEADS_DB.prepare("SELECT id FROM leads WHERE report_file = ? LIMIT 1")
    .bind(file)
    .first<{ id: string }>();
  if (!owner) return null;
  return env().REPORTS.get(file);
}
