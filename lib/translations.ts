import { cache } from "react";
import { env } from "@/lib/cloudflare";
import { CONTACT, textKey, type Kind, type ListKind } from "@/lib/content";
import type { Text } from "@/lib/i18n/source";
import { textAt, withTextAt } from "@/lib/i18n/walk";

/**
 * Translations typed in /admin (table content_translations), one set per
 * record and language: each sentence's place in the record ("overview",
 * "faq.0.answer") with its translation and the English it was made from.
 *
 * On a page in that language a translation shows only while the English is
 * still the one it was made from. Once someone changes the English, the page
 * shows the new English until the translation is redone, so an outdated
 * translation (an old price, a changed treatment) never shows.
 *
 * Kinds: hospital, doctor, treatment, post, settings (slug "contact"),
 * figure (slug = a trust figure's key, sentence "label") and page (slug = a
 * part of the site's fixed text, such as "home" or "privacy"; a sentence's
 * place is its full path, "privacy.sections.2.body.0").
 */

export type TranslationKind = Kind | "figure" | "page";
export type Translation = { text: string; source: string };
export type TranslationSet = Record<string, Translation>;

type Row = { kind: string; slug: string; lang: string; data: string };

function db() {
  return env().LEADS_DB;
}

function parse(row: Row): TranslationSet {
  try {
    const data = JSON.parse(row.data);
    return data && typeof data === "object" ? (data as TranslationSet) : {};
  } catch {
    console.error(`content_translations: unreadable JSON for ${row.kind}/${row.slug}/${row.lang}`);
    return {};
  }
}

const key = (kind: string, slug: string) => `${kind}/${slug}`;

/** Every set for one language, once per request. Empty while building and if D1 fails. */
export const getLanguageTranslations = cache(async (lang: string): Promise<Map<string, TranslationSet>> => {
  if (process.env.NEXT_PHASE === "phase-production-build") return new Map();
  try {
    const { results } = await db()
      .prepare("SELECT kind, slug, lang, data FROM content_translations WHERE lang = ?")
      .bind(lang)
      .all<Row>();
    return new Map(results.map((row) => [key(row.kind, row.slug), parse(row)]));
  } catch (error) {
    console.error("content_translations read failed", error);
    return new Map();
  }
});

/** Every language's set for one record, for its editor. */
export async function getRecordTranslations(kind: TranslationKind, slug: string): Promise<Record<string, TranslationSet>> {
  const { results } = await db()
    .prepare("SELECT kind, slug, lang, data FROM content_translations WHERE kind = ? AND slug = ?")
    .bind(kind, slug)
    .all<Row>();
  return Object.fromEntries(results.map((row) => [row.lang, parse(row)]));
}

/** Every set, for the CSV export and import: kind/slug -> lang -> set. */
export async function getAllTranslations(): Promise<Map<string, Record<string, TranslationSet>>> {
  const { results } = await db().prepare("SELECT kind, slug, lang, data FROM content_translations").all<Row>();
  const all = new Map<string, Record<string, TranslationSet>>();
  for (const row of results) {
    const k = key(row.kind, row.slug);
    all.set(k, { ...all.get(k), [row.lang]: parse(row) });
  }
  return all;
}

export const translationKey = key;

/** The translation to show, if it still matches the English. */
export function liveTranslation(set: TranslationSet | undefined, path: string, english: string | undefined) {
  const t = set?.[path];
  return t && english !== undefined && t.source === english && t.text.trim() ? t.text : undefined;
}

function translateRecord<T>(english: T, local: T, set: TranslationSet | undefined): T {
  if (!set) return local;
  let out = local;
  for (const path of Object.keys(set)) {
    const text = liveTranslation(set, path, textAt(english, path));
    if (text !== undefined) out = withTextAt(out, path, text);
  }
  return out;
}

function translateList<T extends { slug: string }>(
  kind: ListKind,
  english: T[],
  local: T[],
  sets: Map<string, TranslationSet>,
): T[] {
  const bySlug = new Map(english.map((r) => [r.slug, r]));
  return local.map((record) => {
    const set = sets.get(key(kind, record.slug));
    const source = bySlug.get(record.slug);
    return set && source ? translateRecord(source, record, set) : record;
  });
}

/**
 * Lays one language's translations from /admin over its text. `english` is
 * the same text in English, with the changes from /admin, to check each
 * translation against.
 */
export function applyTranslations(english: Text, local: Text, sets: Map<string, TranslationSet>): Text {
  if (sets.size === 0) return local;
  // Fixed pages first: their places are full paths into the site's text.
  for (const [k, set] of sets) {
    if (!k.startsWith("page/")) continue;
    for (const path of Object.keys(set)) {
      const text = liveTranslation(set, path, textAt(english, path));
      if (text !== undefined) local = withTextAt(local, path, text);
    }
  }
  return {
    ...local,
    site: {
      ...local.site,
      contact: translateRecord(english.site.contact, local.site.contact, sets.get(key("settings", CONTACT))),
    },
    hospitals: translateList("hospital", english.hospitals, local.hospitals, sets),
    doctors: translateList("doctor", english.doctors, local.doctors, sets),
    treatments: translateList("treatment", english.treatments, local.treatments, sets),
    posts: translateList("post", english.posts, local.posts, sets),
  };
}

/** The place of a list kind's records in the translation files: "hospitals.<slug>.". */
export function filePrefix(kind: TranslationKind, slug: string): string | null {
  if (kind === "page") return "";
  if (kind === "settings") return slug === CONTACT ? "site.contact." : null;
  if (kind === "figure") return null;
  return `${textKey[kind]}.${slug}.`;
}

/**
 * Writes the changes for one record and language. `changes` maps a place in
 * the record to its new text (empty removes it) and the English it translates.
 */
export async function saveTranslations(
  kind: TranslationKind,
  slug: string,
  lang: string,
  changes: { path: string; text: string; source: string }[],
  by: string,
) {
  const row = await db()
    .prepare("SELECT kind, slug, lang, data FROM content_translations WHERE kind = ? AND slug = ? AND lang = ?")
    .bind(kind, slug, lang)
    .first<Row>();
  const set: TranslationSet = row ? parse(row) : {};
  for (const { path, text, source } of changes) {
    if (text.trim()) set[path] = { text: text.trim(), source };
    else delete set[path];
  }
  await writeSet(kind, slug, lang, set, by);
}

export function writeStatement(kind: string, slug: string, lang: string, set: TranslationSet, by: string) {
  const now = new Date().toISOString();
  if (Object.keys(set).length === 0) {
    return db().prepare("DELETE FROM content_translations WHERE kind = ? AND slug = ? AND lang = ?").bind(kind, slug, lang);
  }
  return db()
    .prepare(
      `INSERT INTO content_translations (kind, slug, lang, data, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT (kind, slug, lang) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at, updated_by = excluded.updated_by`,
    )
    .bind(kind, slug, lang, JSON.stringify(set), now, by);
}

async function writeSet(kind: string, slug: string, lang: string, set: TranslationSet, by: string) {
  await writeStatement(kind, slug, lang, set, by).run();
}

/** Many sets at once (CSV import), in batches D1 accepts. */
export async function writeSets(sets: { kind: string; slug: string; lang: string; set: TranslationSet }[], by: string) {
  for (let i = 0; i < sets.length; i += 50) {
    await db().batch(sets.slice(i, i + 50).map((s) => writeStatement(s.kind, s.slug, s.lang, s.set, by)));
  }
}
