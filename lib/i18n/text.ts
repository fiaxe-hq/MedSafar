import { lang as rootLang } from "next/root-params";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { defaultLanguage, getLanguage, type Language } from "./languages";
import { source, type Text } from "./source";
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

/** All the site's text, in the language of the page being drawn. */
export async function getText(): Promise<Text> {
  return textFor((await getLang()).code);
}
