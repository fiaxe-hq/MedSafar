import type { Language } from "@/lib/i18n/languages";
import {
  getAllTranslations,
  translationKey,
  writeSets,
  type TranslationKind,
  type TranslationSet,
} from "@/lib/translations";
import { parseCsv } from "./csv";
import { allTargets, sentencesFor, targetLanguages, type Sentence, type Target } from "./translate";

/**
 * The translations CSV: one row per sentence, with its English for reference
 * and one column per language. The same layout is downloaded (empty as a
 * template, or filled with everything to translate) and imported.
 */

const sections: { name: string; kind: TranslationKind }[] = [
  { name: "hospitals", kind: "hospital" },
  { name: "doctors", kind: "doctor" },
  { name: "treatments", kind: "treatment" },
  { name: "blog", kind: "post" },
  { name: "contact", kind: "settings" },
  { name: "figures", kind: "figure" },
  { name: "pages", kind: "page" },
];
export const sectionNames = sections.map((s) => s.name);
const sectionOf = (kind: TranslationKind) => sections.find((s) => s.kind === kind)!.name;

const languageHeading = (l: Language) => `${l.code} (${l.english})`;

export function headings(): string[] {
  return ["Section", "ID", "Field", "English", ...targetLanguages.map(languageHeading)];
}

/** Rows starting with these are notes for people, skipped on import. */
const NOTE_MARKERS = ["HOW TO USE", "EXAMPLE"];
const isNote = (first: string) => NOTE_MARKERS.some((m) => first.trim().toUpperCase().startsWith(m));

export function templateRows(): string[][] {
  const blank = (cells: string[]) => [...cells, ...Array(headings().length - cells.length).fill("")];
  const note = (text: string) => blank([`HOW TO USE: ${text}`]);
  const languageList = targetLanguages.map((l) => `${l.code} = ${l.english}`).join(", ");
  return [
    headings(),
    note("Delete every row that starts with HOW TO USE or EXAMPLE before you import. Keep row 1, the headings, exactly as it is."),
    note("Easiest: on the Translations page, download 'Everything to translate' instead. It has every Section, ID, Field and English filled in; you only add the languages."),
    note(`One row per piece of text. Section is one of: ${sectionNames.join(", ")}.`),
    note("ID is the name in the page's web address. For example nanavati-max for /hospitals/nanavati-max. For figures, the figure's name in lower case with dashes, for example partner-hospitals."),
    note("Field is the part of the page, for example name, overview, summary, faq.0.question or faq.0.answer (questions are counted from 0)."),
    note("English is only there to help you. It is not imported. If the English on the site has changed since the file was downloaded, that row is skipped, so an old translation never replaces a new text."),
    note(`Fill in the language columns you have: ${languageList}. Leave a cell empty to keep what the site shows now.`),
    note("Save the file as 'CSV UTF-8' (in Excel: File, Save As, CSV UTF-8) so Arabic, Bengali, Georgian and the other scripts are kept."),
    blank(["EXAMPLE (delete this row)", "nanavati-max", "city", "Mumbai", "मुंबई", "مومباي"]),
  ];
}

/** Every sentence of every record, or of one section, with what each language shows now. */
export async function exportRows(section?: string, onlyMissing = false): Promise<string[][]> {
  const kind = sections.find((s) => s.name === section)?.kind;
  const all = await getAllTranslations();
  const rows: string[][] = [headings()];
  for (const target of await allTargets()) {
    if (kind && target.kind !== kind) continue;
    const sentences = await sentencesFor(target.kind, target.slug, target.record, target.original, all.get(translationKey(target.kind, target.slug)) ?? {});
    for (const s of sentences) {
      const shown = targetLanguages.map((l) => (s.langs[l.code].stale ? "" : s.langs[l.code].text));
      if (onlyMissing && shown.every(Boolean)) continue;
      rows.push([sectionOf(target.kind), target.slug, s.path, s.english, ...shown]);
    }
  }
  return rows;
}

export type ImportSummary = {
  ok: boolean;
  /** A problem with the whole file; nothing is imported. */
  error?: string;
  rowsRead: number;
  added: number;
  replaced: number;
  unchanged: number;
  byLanguage: { language: string; count: number }[];
  skipped: { row: number; reason: string }[];
  ignoredColumns: string[];
};

type Change = { kind: TranslationKind; slug: string; lang: string; path: string; text: string; source: string };

const normalise = (h: string) => h.trim().toLowerCase();

/** Reads a CSV and works out what it would change, without saving anything. */
async function analyse(csv: string): Promise<{ summary: ImportSummary; changes: Change[] }> {
  const summary: ImportSummary = {
    ok: false,
    rowsRead: 0,
    added: 0,
    replaced: 0,
    unchanged: 0,
    byLanguage: [],
    skipped: [],
    ignoredColumns: [],
  };
  const rows = parseCsv(csv);
  const header = rows[0]?.map(normalise) ?? [];
  const column = (name: string) => header.indexOf(name);
  const [cSection, cId, cField, cEnglish] = ["section", "id", "field", "english"].map(column);
  if (cSection < 0 || cId < 0 || cField < 0) {
    summary.error = "The first row must be the headings: Section, ID, Field, English and the languages. Download the template to see them.";
    return { summary, changes: [] };
  }

  // Language columns: "ar (Arabic)", "ar" or "Arabic" all work.
  const langColumns: { index: number; code: string }[] = [];
  header.forEach((h, index) => {
    if ([cSection, cId, cField, cEnglish].includes(index) || !h) return;
    const language = targetLanguages.find(
      (l) => h === normalise(languageHeading(l)) || h.split(/[\s(]/)[0] === l.code || h === l.english.toLowerCase(),
    );
    if (language) langColumns.push({ index, code: language.code });
    else summary.ignoredColumns.push(rows[0][index]);
  });
  if (langColumns.length === 0) {
    summary.error = "No language columns were found. Keep the headings from the template, for example 'ar (Arabic)'.";
    return { summary, changes: [] };
  }

  const targets = new Map((await allTargets()).map((t) => [translationKey(t.kind, t.slug), t]));
  const all = await getAllTranslations();
  const sentenceCache = new Map<string, Map<string, Sentence>>();
  async function sentencesOf(target: Target) {
    const k = translationKey(target.kind, target.slug);
    let found = sentenceCache.get(k);
    if (!found) {
      const list = await sentencesFor(target.kind, target.slug, target.record, target.original, all.get(k) ?? {});
      found = new Map(list.map((s) => [s.path, s]));
      sentenceCache.set(k, found);
    }
    return found;
  }

  const changes: Change[] = [];
  const counts = new Map<string, number>();
  const skip = (row: number, reason: string) => summary.skipped.push({ row, reason });

  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    const at = (i: number) => (i >= 0 ? (cells[i] ?? "").trim() : "");
    if (cells.every((c) => !c.trim()) || isNote(cells[0] ?? "")) continue;
    summary.rowsRead++;
    const line = r + 1;

    const kind = sections.find((s) => s.name === at(cSection).toLowerCase())?.kind;
    if (!kind) {
      skip(line, `Unknown section "${at(cSection)}". Use one of: ${sectionNames.join(", ")}.`);
      continue;
    }
    const target = targets.get(translationKey(kind, at(cId)));
    if (!target) {
      skip(line, `No ${at(cSection)} with the ID "${at(cId)}".`);
      continue;
    }
    const sentence = (await sentencesOf(target)).get(at(cField));
    if (!sentence) {
      skip(line, `"${target.name}" has no field "${at(cField)}" that can be translated.`);
      continue;
    }
    if (cEnglish >= 0 && at(cEnglish) && at(cEnglish) !== sentence.english.trim()) {
      skip(line, `The English of "${target.name}" (${at(cField)}) has changed since this file was made. Download a new one for this row.`);
      continue;
    }
    for (const { index, code } of langColumns) {
      const text = at(index);
      if (!text) continue;
      const now = sentence.langs[code];
      if (now && !now.stale && now.text.trim() === text) {
        summary.unchanged++;
        continue;
      }
      if (text.length > 5000) {
        skip(line, `The ${code} text is longer than 5,000 characters.`);
        continue;
      }
      if (now?.text) summary.replaced++;
      else summary.added++;
      counts.set(code, (counts.get(code) ?? 0) + 1);
      changes.push({ kind, slug: target.slug, lang: code, path: sentence.path, text, source: sentence.english });
    }
  }

  summary.byLanguage = targetLanguages
    .filter((l) => counts.has(l.code))
    .map((l) => ({ language: l.english, count: counts.get(l.code)! }));
  summary.ok = true;
  return { summary, changes };
}

export async function previewImport(csv: string): Promise<ImportSummary> {
  return (await analyse(csv)).summary;
}

/** Saves what the CSV changes. Returns the same summary the preview showed. */
export async function applyImport(csv: string, by: string): Promise<ImportSummary> {
  const { summary, changes } = await analyse(csv);
  if (!summary.ok || changes.length === 0) return summary;
  const all = await getAllTranslations();
  const sets = new Map<string, { kind: TranslationKind; slug: string; lang: string; set: TranslationSet }>();
  for (const c of changes) {
    const k = `${c.kind}/${c.slug}/${c.lang}`;
    let entry = sets.get(k);
    if (!entry) {
      entry = { kind: c.kind, slug: c.slug, lang: c.lang, set: { ...(all.get(translationKey(c.kind, c.slug))?.[c.lang] ?? {}) } };
      sets.set(k, entry);
    }
    entry.set[c.path] = { text: c.text, source: c.source };
  }
  await writeSets([...sets.values()], by);
  return summary;
}
