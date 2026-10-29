"use server";

import { logActivity, requireAdmin } from "@/lib/admin/auth";
import { refreshSite } from "@/lib/admin/records";
import { getTarget, sentencesFor, targetLanguages } from "@/lib/admin/translate";
import { applyImport, previewImport, type ImportSummary } from "@/lib/admin/translationCsv";
import { saveTranslations, type TranslationKind } from "@/lib/translations";

const KINDS: TranslationKind[] = ["hospital", "doctor", "treatment", "post", "settings", "figure"];
const MAX_TEXT = 5000;

export type SaveTranslationsResult = { ok: boolean; message: string };

/**
 * Saves one language's translations for some sentences of one record, from
 * the translation panel. Each is checked against the record's current
 * English, which is stored with it.
 */
export async function saveTranslationsAction(input: {
  kind: string;
  slug: string;
  lang: string;
  changes: { path: string; text: string }[];
}): Promise<SaveTranslationsResult> {
  const user = await requireAdmin();
  const kind = input.kind as TranslationKind;
  const language = targetLanguages.find((l) => l.code === input.lang);
  if (!KINDS.includes(kind) || !language) return { ok: false, message: "Unknown language or section." };

  const target = await getTarget(kind, String(input.slug));
  if (!target) return { ok: false, message: "This no longer exists. It may have been deleted." };
  const english = new Map(
    (await sentencesFor(kind, target.slug, target.record, target.original, {})).map((s) => [s.path, s.english]),
  );

  const changes = [];
  for (const change of Array.isArray(input.changes) ? input.changes : []) {
    const source = english.get(String(change.path));
    if (source === undefined) {
      return { ok: false, message: "The English was changed and saved meanwhile. Close this panel, reload the page and try again." };
    }
    const text = String(change.text ?? "").replace(/\r\n/g, "\n");
    if (text.length > MAX_TEXT) return { ok: false, message: `Keep each translation under ${MAX_TEXT} characters.` };
    changes.push({ path: String(change.path), text, source });
  }
  if (changes.length === 0) return { ok: true, message: "Nothing to save." };

  await saveTranslations(kind, target.slug, language.code, changes, user.name);
  refreshSite();
  await logActivity(user, `translated "${target.name}" into ${language.english} (${changes.length} ${changes.length === 1 ? "sentence" : "sentences"})`);
  return { ok: true, message: `Saved. The ${language.english} site shows it within a minute.` };
}

const MAX_CSV = 5 * 1024 * 1024;

/** Step 1 of an import: what the CSV would change. Nothing is saved. */
export async function previewImportAction(csv: string): Promise<ImportSummary> {
  await requireAdmin();
  if (typeof csv !== "string" || csv.length > MAX_CSV) return tooBig();
  return previewImport(csv);
}

/** Step 2: save it. */
export async function applyImportAction(csv: string): Promise<ImportSummary> {
  const user = await requireAdmin();
  if (typeof csv !== "string" || csv.length > MAX_CSV) return tooBig();
  const summary = await applyImport(csv, user.name);
  const saved = summary.added + summary.replaced;
  if (summary.ok && saved > 0) {
    refreshSite();
    await logActivity(user, `imported ${saved} ${saved === 1 ? "translation" : "translations"} from a CSV`, "/admin/translations");
  }
  return summary;
}

function tooBig(): ImportSummary {
  return {
    ok: false,
    error: "That file is too large. Split it into smaller files of under 5 MB.",
    rowsRead: 0,
    added: 0,
    replaced: 0,
    unchanged: 0,
    byLanguage: [],
    skipped: [],
    ignoredColumns: [],
  };
}
