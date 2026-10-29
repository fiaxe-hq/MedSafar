import { cache } from "react";
import type { Doctor, Hospital, Post, Treatment } from "@/content/types";
import { env } from "@/lib/cloudflare";
import type { Text } from "@/lib/i18n/source";

/**
 * Changes made in /admin, stored in D1 (table content_entries).
 *
 * The records in data/ and content/ stay the starting point. A row here, for
 * a kind and a slug, either replaces that record, adds a new one (a slug the
 * files do not have) or hides it. The site never reads this table directly:
 * lib/i18n/text.ts lays the rows over the text of each language, so every
 * page, menu and list picks the change up with no other code.
 *
 * Changes are typed in English. In another language a field nobody changed
 * keeps its translation; a changed field shows the new English until it is
 * translated, so an outdated translation (an old price) never shows.
 */

export const listKinds = ["hospital", "doctor", "treatment", "post"] as const;
export type ListKind = (typeof listKinds)[number];
export type Kind = ListKind | "settings";

export type RecordOf = { hospital: Hospital; doctor: Doctor; treatment: Treatment; post: Post };

/** Where each kind lives in the site's text. */
export const textKey = { hospital: "hospitals", doctor: "doctors", treatment: "treatments", post: "posts" } as const;

/** Settings rows: one per group, keyed by slug. */
export const CONTACT = "contact";
export type Contact = Text["site"]["contact"];

export type Entry = {
  kind: Kind;
  slug: string;
  data: unknown;
  hidden: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
};

type EntryRow = {
  kind: string;
  slug: string;
  data: string;
  hidden: number;
  created_at: string;
  updated_at: string;
  updated_by: string;
};

function db() {
  return env().LEADS_DB;
}

function toEntry(row: EntryRow): Entry | null {
  try {
    return {
      kind: row.kind as Kind,
      slug: row.slug,
      data: JSON.parse(row.data),
      hidden: row.hidden === 1,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      updatedBy: row.updated_by,
    };
  } catch {
    console.error(`content_entries: unreadable JSON for ${row.kind}/${row.slug}`);
    return null;
  }
}

// Reading

/**
 * Every row, once per request. Empty while the site is being built (pages are
 * drawn on first visit instead, with the live rows) and if D1 fails, so the
 * site falls back to the files rather than breaking.
 */
export const getEntries = cache(async (): Promise<Entry[]> => {
  if (process.env.NEXT_PHASE === "phase-production-build") return [];
  try {
    const { results } = await db().prepare("SELECT * FROM content_entries").all<EntryRow>();
    return results.flatMap((row) => toEntry(row) ?? []);
  } catch (error) {
    console.error("content_entries read failed", error);
    return [];
  }
});

export async function getEntry(kind: Kind, slug: string): Promise<Entry | null> {
  const row = await db()
    .prepare("SELECT * FROM content_entries WHERE kind = ? AND slug = ?")
    .bind(kind, slug)
    .first<EntryRow>();
  return row ? toEntry(row) : null;
}

// Laying the changes over the text

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** JSON with object keys in a fixed order, so two copies of a record compare equal. */
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (isObject(value)) {
    return Object.fromEntries(
      Object.keys(value)
        .filter((k) => value[k] !== undefined)
        .sort()
        .map((k) => [k, canonical(value[k])]),
    );
  }
  return value;
}

export function same(a: unknown, b: unknown): boolean {
  return JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
}

/** How lib/i18n/walk.ts addresses an item in a list: by slug, then id, then position. */
function itemKey(item: unknown, index: number): string {
  if (isObject(item)) {
    if (typeof item.slug === "string") return `s:${item.slug}`;
    if (typeof item.id === "string") return `i:${item.id}`;
  }
  return `n:${index}`;
}

/**
 * The edited value, keeping the translated parts the edit left as they were.
 * `english` and `local` are the same record from the files, in English and in
 * the page's language.
 */
export function overlay(english: unknown, local: unknown, edited: unknown): unknown {
  if (same(english, edited)) return local ?? edited;
  if (Array.isArray(edited) && Array.isArray(english)) {
    const localList = Array.isArray(local) ? local : [];
    const byKey = new Map(english.map((item, i) => [itemKey(item, i), i]));
    return edited.map((item, i) => {
      const at = byKey.get(itemKey(item, i));
      return at === undefined ? item : overlay(english[at], localList[at], item);
    });
  }
  if (isObject(edited) && isObject(english)) {
    const localObject = isObject(local) ? local : {};
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(edited)) out[key] = overlay(english[key], localObject[key], value);
    return out;
  }
  return edited;
}

function applyList<T extends { slug: string }>(
  english: T[],
  local: T[],
  entries: Entry[],
): T[] {
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const known = new Set(english.map((r) => r.slug));
  const kept = english.flatMap((record, i) => {
    const entry = bySlug.get(record.slug);
    if (!entry) return [local[i] ?? record];
    if (entry.hidden) return [];
    return [overlay(record, local[i], entry.data) as T];
  });
  const added = entries
    .filter((e) => !known.has(e.slug) && !e.hidden)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((e) => e.data as T);
  return [...kept, ...added];
}

/** The site's text in one language, with the changes from /admin laid over it. */
export function applyEntries(english: Text, local: Text, entries: Entry[]): Text {
  if (entries.length === 0) return local;
  const of = (kind: Kind) => entries.filter((e) => e.kind === kind);
  const contact = of("settings").find((e) => e.slug === CONTACT);

  return {
    ...local,
    site: contact
      ? { ...local.site, contact: overlay(english.site.contact, local.site.contact, contact.data) as Contact }
      : local.site,
    hospitals: applyList(english.hospitals, local.hospitals, of("hospital")),
    doctors: applyList(english.doctors, local.doctors, of("doctor")),
    treatments: applyList(english.treatments, local.treatments, of("treatment")),
    posts: applyList(english.posts, local.posts, of("post")),
  };
}

// Writing (admin only; callers check the session)

export async function saveEntry(kind: Kind, slug: string, data: unknown, by: string) {
  const now = new Date().toISOString();
  await db()
    .prepare(
      `INSERT INTO content_entries (kind, slug, data, hidden, created_at, updated_at, updated_by)
       VALUES (?, ?, ?, 0, ?, ?, ?)
       ON CONFLICT (kind, slug) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at, updated_by = excluded.updated_by`,
    )
    .bind(kind, slug, JSON.stringify(data), now, now, by)
    .run();
}

/** Hiding needs a row; for a record from the files with no changes, the row holds the record as it is. */
export async function setHidden(kind: Kind, slug: string, hidden: boolean, data: unknown, by: string) {
  const now = new Date().toISOString();
  await db()
    .prepare(
      `INSERT INTO content_entries (kind, slug, data, hidden, created_at, updated_at, updated_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (kind, slug) DO UPDATE SET hidden = excluded.hidden, updated_at = excluded.updated_at, updated_by = excluded.updated_by`,
    )
    .bind(kind, slug, JSON.stringify(data), hidden ? 1 : 0, now, now, by)
    .run();
}

/** Back to the version in the files (or, for a record added in /admin, gone). */
export async function deleteEntry(kind: Kind, slug: string) {
  await db().prepare("DELETE FROM content_entries WHERE kind = ? AND slug = ?").bind(kind, slug).run();
}
