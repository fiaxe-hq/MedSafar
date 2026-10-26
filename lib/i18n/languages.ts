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

/** Every language planned. Only those in `translated` are offered. */
const planned: Language[] = [
  { code: "en", name: "English", english: "English" },
  { code: "ar", name: "العربية", english: "Arabic", dir: "rtl" },
  { code: "bn", name: "বাংলা", english: "Bengali" },
  { code: "ka", name: "ქართული", english: "Georgian" },
  { code: "sw", name: "Kiswahili", english: "Swahili" },
  { code: "uz", name: "Oʻzbekcha", english: "Uzbek" },
  { code: "ckb", name: "کوردی", english: "Kurdish (Sorani)", dir: "rtl" },
  { code: "ha", name: "Hausa", english: "Hausa" },
  { code: "yo", name: "Yorùbá", english: "Yoruba" },
  { code: "ig", name: "Igbo", english: "Igbo" },
  { code: "ru", name: "Русский", english: "Russian" },
  { code: "fr", name: "Français", english: "French" },
  { code: "es", name: "Español", english: "Spanish" },
  { code: "pt", name: "Português", english: "Portuguese" },
  { code: "de", name: "Deutsch", english: "German" },
  { code: "it", name: "Italiano", english: "Italian" },
  { code: "nl", name: "Nederlands", english: "Dutch" },
  { code: "pl", name: "Polski", english: "Polish" },
  { code: "ro", name: "Română", english: "Romanian" },
  { code: "uk", name: "Українська", english: "Ukrainian" },
  { code: "tr", name: "Türkçe", english: "Turkish" },
  { code: "az", name: "Azərbaycanca", english: "Azerbaijani" },
  { code: "fa", name: "فارسی", english: "Persian", dir: "rtl" },
  { code: "ps", name: "پښتو", english: "Pashto", dir: "rtl" },
  { code: "ur", name: "اردو", english: "Urdu", dir: "rtl" },
  { code: "sd", name: "سنڌي", english: "Sindhi", dir: "rtl" },
  { code: "hi", name: "हिन्दी", english: "Hindi" },
  { code: "mr", name: "मराठी", english: "Marathi" },
  { code: "gu", name: "ગુજરાતી", english: "Gujarati" },
  { code: "pa", name: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { code: "ta", name: "தமிழ்", english: "Tamil" },
  { code: "te", name: "తెలుగు", english: "Telugu" },
  { code: "kn", name: "ಕನ್ನಡ", english: "Kannada" },
  { code: "ml", name: "മലയാളം", english: "Malayalam" },
  { code: "or", name: "ଓଡ଼ିଆ", english: "Odia" },
  { code: "ne", name: "नेपाली", english: "Nepali" },
  { code: "si", name: "සිංහල", english: "Sinhala" },
  { code: "my", name: "မြန်မာ", english: "Burmese" },
  { code: "th", name: "ไทย", english: "Thai" },
  { code: "vi", name: "Tiếng Việt", english: "Vietnamese" },
  { code: "id", name: "Bahasa Indonesia", english: "Indonesian" },
  { code: "ms", name: "Bahasa Melayu", english: "Malay" },
  { code: "jv", name: "Basa Jawa", english: "Javanese" },
  { code: "fil", name: "Filipino", english: "Filipino" },
  { code: "zh", name: "简体中文", english: "Chinese (Simplified)" },
  { code: "zh-hant", name: "繁體中文", english: "Chinese (Traditional)" },
  { code: "ja", name: "日本語", english: "Japanese" },
  { code: "ko", name: "한국어", english: "Korean" },
  { code: "am", name: "አማርኛ", english: "Amharic" },
  { code: "so", name: "Soomaali", english: "Somali" },
];

/** Languages with a finished public/i18n/<code>.json. Add a code here once its file is in. */
const translated = new Set([
  "ar", "az", "bn", "ckb", "de", "en", "es", "fa", "fr", "gu", "ha", "hi", "ig", "it", "ka", "mr", "nl", "pa", "pl", "ps", "pt", "ro", "ru", "sd", "sw", "ta", "te", "tr", "uk", "ur", "uz", "yo",
]);

export const languages = planned.filter((l) => translated.has(l.code));

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
