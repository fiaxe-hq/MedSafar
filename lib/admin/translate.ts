import { CONTACT, applyEntries, getEntries, type ListKind } from "@/lib/content";
import { defaultLanguage, languages } from "@/lib/i18n/languages";
import { source } from "@/lib/i18n/source";
import { getDict } from "@/lib/i18n/text";
import { flatten, textAt } from "@/lib/i18n/walk";
import { listStats } from "@/lib/stats";
import { filePrefix, type TranslationKind, type TranslationSet } from "@/lib/translations";
import { allOf, fileRecord, getRecord } from "./records";
import { kinds } from "./schema";

/**
 * What the translation panel and the CSV work with: every sentence of a
 * record that can be translated, with its English and, per language, the
 * text visitors see now and where it comes from.
 */

/** The languages translated in /admin: every one but English. */
export const targetLanguages = languages.filter((l) => l.code !== defaultLanguage);

export type Origin = "admin" | "file" | "none";

export type LangState = {
  text: string;
  origin: Origin;
  /** A translation typed in /admin for an older English: not shown on the site. */
  stale: boolean;
};

export type Sentence = { path: string; field: string; english: string; langs: Record<string, LangState> };

/** The sentences of a value, by place, as public/i18n/*.json addresses them. */
export function sentencesOf(field: string, value: unknown): { path: string; english: string }[] {
  return Object.entries(flatten(value, field, {}, field)).map(([path, english]) => ({ path, english }));
}

/**
 * The site's fixed text that has no editor of its own, by its key in the
 * site's text, with what the team calls it. Its English is changed in the
 * code; only its translations are edited in /admin.
 */
export const pageNames: Record<string, string> = {
  home: "Home page",
  global: "Home page: top and questions",
  about: "About",
  contact: "Contact page",
  site: "Menus, footer and forms",
  ui: "Buttons and small text",
  catalog: "Treatment, hospital and doctor pages: shared text",
  specialities: "Specialities",
  places: "Countries and cities",
  questionnaires: "Questionnaires",
  questionnaireText: "Questionnaires: shared text",
  postCategories: "Blog categories",
  bodyAreas: "Body map: areas",
  wholeBody: "Body map: whole body",
  plainSpeciality: "Body map: speciality names",
  privacy: "Privacy policy",
  terms: "Terms and conditions",
  disclaimer: "Medical disclaimer",
  cancellations: "Cancellations and refunds",
  editorialPolicy: "Editorial policy",
};

/** Contact details: only the WhatsApp greeting is prose. */
const CONTACT_FIELDS = ["whatsapp"];

/** The fields of a record that hold prose, in the order of its form. */
function fieldsOf(kind: TranslationKind, record: Record<string, unknown>): { field: string; value: unknown }[] {
  if (kind === "settings") return CONTACT_FIELDS.map((field) => ({ field, value: record[field] }));
  if (kind === "figure") return [{ field: "label", value: record.label }];
  if (kind === "page") return Object.entries(record).map(([field, value]) => ({ field, value }));
  return kinds[kind].sections.flatMap((s) => s.fields).filter((f) => f.type !== "checkbox" && f.type !== "number").map((f) => ({ field: f.key, value: record[f.key] }));
}

/**
 * Every sentence of one record, with each language's state. `original` is the
 * record as the files have it, whose translations come from public/i18n.
 */
export async function sentencesFor(
  kind: TranslationKind,
  slug: string,
  record: Record<string, unknown>,
  original: Record<string, unknown> | undefined,
  sets: Record<string, TranslationSet>,
): Promise<Sentence[]> {
  const prefix = filePrefix(kind, slug);
  const dicts = Object.fromEntries(
    await Promise.all(targetLanguages.map(async (l) => [l.code, prefix !== null && original ? await getDict(l.code) : {}] as const)),
  );
  return fieldsOf(kind, record).flatMap(({ field, value }) =>
    sentencesOf(field, value)
      // The contact details have their own editor and translations.
      .filter(({ path }) => !(kind === "page" && path.startsWith("site.contact.")))
      .map(({ path, english }) => {
      const fromFile = original !== undefined && textAt(original, path) === english;
      const langs = Object.fromEntries(
        targetLanguages.map((l) => {
          const typed = sets[l.code]?.[path];
          if (typed && typed.text.trim()) {
            return [l.code, { text: typed.text, origin: "admin", stale: typed.source !== english }];
          }
          const file = fromFile && prefix !== null ? dicts[l.code][`${prefix}${path}`] : undefined;
          return [l.code, file ? { text: file, origin: "file", stale: false } : { text: "", origin: "none", stale: false }];
        }),
      ) as Record<string, LangState>;
      return { path, field, english, langs };
    }),
  );
}

/** The current English contact details, with the changes from /admin. */
export async function currentContact() {
  return applyEntries(source, source, await getEntries()).site.contact as unknown as Record<string, unknown>;
}

export type Target = {
  kind: TranslationKind;
  slug: string;
  /** What the team calls it, for messages and the CSV. */
  name: string;
  record: Record<string, unknown>;
  original: Record<string, unknown> | undefined;
};

/** One record that can be translated, or null if it does not exist. */
export async function getTarget(kind: TranslationKind, slug: string): Promise<Target | null> {
  if (kind === "settings") {
    if (slug !== CONTACT) return null;
    return {
      kind,
      slug,
      name: "Contact details",
      record: await currentContact(),
      original: source.site.contact as unknown as Record<string, unknown>,
    };
  }
  if (kind === "page") {
    if (!Object.hasOwn(pageNames, slug)) return null;
    const english = applyEntries(source, source, await getEntries()) as unknown as Record<string, unknown>;
    return {
      kind,
      slug,
      name: pageNames[slug],
      record: { [slug]: english[slug] },
      original: { [slug]: (source as unknown as Record<string, unknown>)[slug] },
    };
  }
  if (kind === "figure") {
    const stat = (await listStats()).find((s) => s.key === slug);
    return stat ? { kind, slug, name: stat.label, record: { label: stat.label }, original: undefined } : null;
  }
  const current = await getRecord(kind, slug);
  if (!current) return null;
  const info = kinds[kind];
  return {
    kind,
    slug,
    name: String(current.record[info.nameKey] ?? slug),
    record: current.record,
    original: fileRecord(kind, slug) as Record<string, unknown> | undefined,
  };
}

/** Every record that can be translated, in the CSV's order. */
export async function allTargets(): Promise<Target[]> {
  const out: Target[] = [];
  for (const kind of ["hospital", "doctor", "treatment", "post"] as ListKind[]) {
    for (const { record, file } of await allOf(kind)) {
      out.push({
        kind,
        slug: record.slug,
        name: String(record[kinds[kind].nameKey] ?? record.slug),
        record,
        original: file,
      });
    }
  }
  const contact = await getTarget("settings", CONTACT);
  if (contact) out.push(contact);
  for (const stat of await listStats()) {
    out.push({ kind: "figure", slug: stat.key, name: stat.label, record: { label: stat.label }, original: undefined });
  }
  for (const slug of Object.keys(pageNames)) {
    const page = await getTarget("page", slug);
    if (page) out.push(page);
  }
  return out;
}
