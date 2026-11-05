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

/**
 * Stores an uploaded medical report and returns the stored file name. A copy
 * goes to REPORTS_BACKUP, which keeps it for 30 days. The `?.` lets a Worker
 * without that bucket still take reports.
 */
export async function saveReport(leadId: string, file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
  const stored = `${leadId}-${safeName}`;
  const body = await file.arrayBuffer();
  const options = { httpMetadata: { contentType: file.type } };
  await Promise.all([env().REPORTS.put(stored, body, options), env().REPORTS_BACKUP?.put(stored, body, options)]);
  return stored;
}

/** Erases a report and its backup copy. */
async function eraseReport(file: string): Promise<void> {
  await Promise.all([env().REPORTS.delete(file), env().REPORTS_BACKUP?.delete(file)]);
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

/** Filters for /admin/enquiries, read from the page's search params. Empty means "any". */
export type LeadFilters = {
  /** Words to find in the name, phone, email, treatment or notes. */
  q?: string;
  /** "full": step 2 sent; "step1": number only. */
  status?: "full" | "step1";
  /** Country given at step 2, or the phone's country when there is none. */
  from?: string;
  treatment?: string;
  timeline?: string;
  budget?: string;
  preference?: string;
  report?: "yes" | "no";
  marketing?: "yes" | "no";
  /** Days in IST, as yyyy-mm-dd, both ends included. */
  since?: string;
  until?: string;
  sort?: LeadSort;
};

export const leadSorts = {
  newest: { label: "Newest first", sql: "created_at DESC" },
  oldest: { label: "Oldest first", sql: "created_at ASC" },
  updated: { label: "Recently updated", sql: "updated_at DESC" },
  name: { label: "Name A–Z", sql: "name IS NULL OR name = '', name COLLATE NOCASE ASC, created_at DESC" },
  from: { label: "Country A–Z", sql: "lead_from COLLATE NOCASE ASC, created_at DESC" },
  treatment: {
    label: "Treatment A–Z",
    sql: "treatment IS NULL OR treatment = '', treatment COLLATE NOCASE ASC, created_at DESC",
  },
} as const;
export type LeadSort = keyof typeof leadSorts;

const FROM_SQL = "COALESCE(NULLIF(country, ''), phone_iso)";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
/** "IN" → "India". Country names given at step 2 pass through as they are. */
export function countryName(value: string): string {
  if (!/^[A-Z]{2}$/.test(value)) return value;
  try {
    return regionNames.of(value) ?? value;
  } catch {
    return value;
  }
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** Start of a yyyy-mm-dd day in IST, as a UTC ISO string; null if not a date. */
function istDayStart(day: string, addDays = 0): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return null;
  const ms = Date.parse(`${day}T00:00:00Z`);
  if (Number.isNaN(ms)) return null;
  return new Date(ms - IST_OFFSET_MS + addDays * 86_400_000).toISOString();
}

/** Enquiries matching the filters (at most `limit`), and how many match in all. */
export async function findLeads(
  filters: LeadFilters,
  limit = 200,
): Promise<{ leads: Lead[]; total: number }> {
  const where: string[] = [];
  const binds: (string | number)[] = [];
  const add = (sql: string, ...values: (string | number)[]) => {
    where.push(sql);
    binds.push(...values);
  };

  const q = filters.q?.trim();
  if (q) {
    const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
    const digits = q.replace(/\D/g, "");
    const parts = ["name", "email", "treatment", "notes", "country"].map((c) => `${c} LIKE ? ESCAPE '\\'`);
    const values: string[] = Array(parts.length).fill(like);
    // Phone numbers match on their digits, so "98336 02738" finds +919833602738.
    if (digits.length >= 3) {
      parts.push("phone LIKE ?");
      values.push(`%${digits}%`);
    }
    add(`(${parts.join(" OR ")})`, ...values);
  }
  if (filters.status === "full") add("name IS NOT NULL AND name != ''");
  if (filters.status === "step1") add("(name IS NULL OR name = '')");
  if (filters.from) {
    // Matches the country given at step 2, or, for step-1 numbers, the phone's country.
    const { results: codes } = await env()
      .LEADS_DB.prepare("SELECT DISTINCT phone_iso AS v FROM leads")
      .all<{ v: string }>();
    const isos = codes.map((c) => c.v).filter((v) => v && countryName(v) === filters.from);
    add(
      `(country = ? OR ((country IS NULL OR country = '') AND phone_iso IN (${isos.map(() => "?").join(",") || "NULL"})))`,
      filters.from,
      ...isos,
    );
  }
  if (filters.treatment) add("treatment = ?", filters.treatment);
  if (filters.timeline) add("timeline = ?", filters.timeline);
  if (filters.budget) add("budget = ?", filters.budget);
  if (filters.preference) add("preference = ?", filters.preference);
  if (filters.report === "yes") add("report_file IS NOT NULL");
  if (filters.report === "no") add("report_file IS NULL");
  if (filters.marketing === "yes") add("marketing = 1");
  if (filters.marketing === "no") add("(marketing IS NULL OR marketing = 0)");
  const since = filters.since ? istDayStart(filters.since) : null;
  const until = filters.until ? istDayStart(filters.until, 1) : null;
  if (since) add("created_at >= ?", since);
  if (until) add("created_at < ?", until);

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const order = leadSorts[filters.sort ?? "newest"]?.sql ?? leadSorts.newest.sql;
  const db = env().LEADS_DB;
  const [rows, count] = await db.batch([
    db
      .prepare(`SELECT *, ${FROM_SQL} AS lead_from FROM leads ${whereSql} ORDER BY ${order} LIMIT ?`)
      .bind(...binds, limit),
    db.prepare(`SELECT count(*) AS n FROM leads ${whereSql}`).bind(...binds),
  ]);
  return {
    leads: (rows.results as LeadRow[]).map(toLead),
    total: (count.results[0] as { n: number } | undefined)?.n ?? 0,
  };
}

/** The values that occur in each filterable column, for the filter menus. */
export async function leadFilterOptions(): Promise<
  Record<"from" | "treatment" | "timeline" | "budget" | "preference", string[]>
> {
  const db = env().LEADS_DB;
  const distinct = (expr: string) =>
    db.prepare(
      `SELECT DISTINCT ${expr} AS v FROM leads WHERE ${expr} IS NOT NULL AND ${expr} != '' ORDER BY v COLLATE NOCASE`,
    );
  const keys = ["from", "treatment", "timeline", "budget", "preference"] as const;
  const results = await db.batch(
    [FROM_SQL, "treatment", "timeline", "budget", "preference"].map((expr) => distinct(expr)),
  );
  const options = Object.fromEntries(
    keys.map((key, i) => [key, (results[i].results as { v: string }[]).map((r) => r.v)]),
  ) as Record<(typeof keys)[number], string[]>;
  // Phone codes and typed names for the same country become one choice.
  options.from = [...new Set(options.from.map(countryName))].sort((a, b) => a.localeCompare(b));
  return options;
}

/**
 * Erases an enquiry for good: its row, its uploaded report and its backup,
 * and the code checks kept for its number. The copy in the CRM is not
 * touched; it is deleted there. Returns false if no such enquiry exists.
 */
export async function deleteLead(id: string): Promise<boolean> {
  const db = env().LEADS_DB;
  const row = await db
    .prepare("SELECT phone, report_file FROM leads WHERE id = ?")
    .bind(id)
    .first<{ phone: string; report_file: string | null }>();
  if (!row) return false;
  if (row.report_file) await eraseReport(row.report_file);
  await db.prepare("DELETE FROM leads WHERE id = ?").bind(id).run();
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
  await eraseReport(row.report_file);
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
  // The backup answers if the main copy is lost.
  return (await env().REPORTS.get(file)) ?? (await env().REPORTS_BACKUP?.get(file)) ?? null;
}
