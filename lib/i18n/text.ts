import { lang as rootLang } from "next/root-params";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { defaultLanguage, getLanguage, type Language } from "./languages";
import { source, type Text } from "./source";
import { applyEntries, getEntries } from "@/lib/content";
import { applyTranslations, getLanguageTranslations } from "@/lib/translations";
import { localize, type Dict } from "./walk";

/**
 * The site's text in the language of the page being drawn.
 *
 * Translations live in public/i18n/<code>.json, outside the Worker's code, so
 * fifty languages do not weigh down every request. Pages are drawn at build
 * time, where the file is read from disk; on the Worker it comes from the
 * static assets.
 */

const cache = new Map<string, Promise<Text>>();

const dicts = new Map<string, Promise<Dict>>();

/** A language's translation file, read once per Worker (tried again if the read failed). */
export function getDict(code: string): Promise<Dict> {
  let dict = dicts.get(code);
  if (!dict) {
    dict = readDict(code).then((d) => {
      if (!d) dicts.delete(code);
      return d ?? {};
    });
    dicts.set(code, dict);
  }
  return dict;
}

/** The language's sentences, or null when the file could not be read. */
async function readDict(code: string): Promise<Dict | null> {
  try {
    const onWorker = typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
    if (onWorker) {
      const { env } = getCloudflareContext();
      const res = await env.ASSETS?.fetch(new Request(`https://assets.local/i18n/${code}.json`));
      return res?.ok ? await res.json() : null;
    }
    const { readFile } = await import("node:fs/promises");
    const { join } = await import("node:path");
    return JSON.parse(await readFile(join(process.cwd(), "public", "i18n", `${code}.json`), "utf8"));
  } catch {
    return null;
  }
}

export function textFor(code: string): Promise<Text> {
  if (code === defaultLanguage || !getLanguage(code)) return Promise.resolve(source);
  let text = cache.get(code);
  if (!text) {
    // A failed read shows English for this page only and is tried again on
    // the next one, rather than leaving the language in English until the
    // Worker restarts.
    text = readDict(code).then((dict) => {
      if (!dict) cache.delete(code);
      return dict ? localize(source, dict) : source;
    });
    cache.set(code, text);
  }
  return text;
}

/** The language of the page being drawn. */
export async function getLang(): Promise<Language> {
  return getLanguage((await rootLang()) ?? defaultLanguage) ?? getLanguage(defaultLanguage)!;
}

/**
 * The site's text in one language, with the changes made in /admin: edits
 * first (typed in English), then the translations typed for them.
 */
export async function textWithEdits(code: string): Promise<Text> {
  const [local, entries] = await Promise.all([textFor(code), getEntries()]);
  const edited = applyEntries(source, local, entries);
  if (code === defaultLanguage) return edited;
  const english = applyEntries(source, source, entries);
  return applyTranslations(english, edited, await getLanguageTranslations(code));
}

/** All the site's text, in the language of the page being drawn. */
export async function getText(): Promise<Text> {
  return textWithEdits((await getLang()).code);
}
