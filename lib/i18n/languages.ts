/**
 * The languages the site is written in. English is the source; every other
 * language lives at /<code>/..., English at the plain address.
 *
 * Adding a language: add it here, then add public/i18n/<code>.json
 * (see scripts/i18n.mjs).
 */
export type Language = {
  code: string;
  /** The name in the language itself, shown in the picker. */
  name: string;
  /** The English name, for search in the picker and for translators. */
  english: string;
  dir?: "rtl";
};

/**
 * The languages offered: the native languages of the countries the site
 * serves, plus English and Hindi for everyone. Iraq: Arabic, Kurdish
 * (Sorani). Bangladesh: Bengali. Georgia: Georgian. Kenya: Swahili. Nigeria:
 * Hausa, Yoruba, Igbo. Uzbekistan: Uzbek, Russian. Each has a
 * public/i18n/<code>.json; text added in /admin is translated there.
 */
export const languages: Language[] = [
  { code: "en", name: "English", english: "English" },
  { code: "hi", name: "हिन्दी", english: "Hindi" },
  { code: "ar", name: "العربية", english: "Arabic", dir: "rtl" },
  { code: "ckb", name: "کوردی", english: "Kurdish (Sorani)", dir: "rtl" },
  { code: "bn", name: "বাংলা", english: "Bengali" },
  { code: "ka", name: "ქართული", english: "Georgian" },
  { code: "sw", name: "Kiswahili", english: "Swahili" },
  { code: "ha", name: "Hausa", english: "Hausa" },
  { code: "yo", name: "Yorùbá", english: "Yoruba" },
  { code: "ig", name: "Igbo", english: "Igbo" },
  { code: "uz", name: "Oʻzbekcha", english: "Uzbek" },
  { code: "ru", name: "Русский", english: "Russian" },
];

/**
 * Languages the site once had or planned. Their addresses (/fr/about) lead
 * to the same page in English, so old links and search results still work.
 */
export const retiredCodes = [
  "fr", "es", "pt", "de", "it", "nl", "pl", "ro", "uk", "tr", "az", "fa", "ps", "ur", "sd", "mr",
  "gu", "pa", "ta", "te", "kn", "ml", "or", "ne", "si", "my", "th", "vi", "id", "ms", "jv", "fil",
  "zh", "zh-hant", "ja", "ko", "am", "so",
];

export const defaultLanguage = "en";

export const languageCodes = languages.map((l) => l.code);

export function getLanguage(code: string): Language | undefined {
  return languages.find((l) => l.code === code);
}

/** An address in a language: English keeps the plain address. */
export function localPath(lang: string, href: string): string {
  if (!href.startsWith("/") || lang === defaultLanguage) return href;
  if (href === "/") return `/${lang}`;
  // "/#plan" and "/?x" belong to the home page: "/bn#plan", not "/bn/#plan".
  if (href.startsWith("/#") || href.startsWith("/?")) return `/${lang}${href.slice(1)}`;
  return `/${lang}${href}`;
}

/** The address with any language prefix taken off. */
export function stripLanguage(pathname: string): string {
  const first = pathname.split("/")[1];
  if (first && first !== defaultLanguage && languageCodes.includes(first)) {
    return pathname.slice(first.length + 1) || "/";
  }
  return pathname;
}
