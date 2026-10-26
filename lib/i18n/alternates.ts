import type { Metadata } from "next";
import { defaultLanguage, languages, localPath } from "./languages";

/**
 * The canonical address of a page in one language, and the same page in every
 * other language, so search engines show each reader their own.
 */
export function languageAlternates(path: string, lang: string): Metadata["alternates"] {
  return {
    canonical: localPath(lang, path),
    languages: {
      ...Object.fromEntries(languages.map((l) => [l.code, localPath(l.code, path)])),
      "x-default": localPath(defaultLanguage, path),
    },
  };
}
