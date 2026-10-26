/** "2026-03-14" becomes "14 March 2026", in the reader's language. */
export function formatDate(iso: string, lang = "en"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const options = { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" } as const;
  try {
    return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : lang, options).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  }
}
