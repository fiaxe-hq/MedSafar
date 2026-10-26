import { dialCodes } from "@/content/dial-codes";
import type { DialCode } from "@/content/types";

/**
 * The phone field's country list, with country names in the page's language
 * (from the browser's own country names, so nothing needs translating) and
 * sorted for that language. One country can be pulled to the top.
 */
export function dialCodesFor(iso: string | null, lang = "en"): DialCode[] {
  let names: Intl.DisplayNames | null = null;
  try {
    names = new Intl.DisplayNames([lang, "en"], { type: "region" });
  } catch {}
  const list = dialCodes
    .map((c) => ({ ...c, name: names?.of(c.iso) ?? c.name }))
    .sort((a, b) => a.name.localeCompare(b.name, lang));
  const first = iso ? list.find((c) => c.iso === iso) : undefined;
  return first ? [first, ...list.filter((c) => c.iso !== iso)] : list;
}

/** A country's name in a language, from its ISO code. */
export function countryName(iso: string, lang = "en"): string {
  try {
    return new Intl.DisplayNames([lang, "en"], { type: "region" }).of(iso) ?? iso;
  } catch {
    return iso;
  }
}

/** The phone field's country list in the language of the page being drawn. */
export async function getDialCodes(iso: string | null = null): Promise<DialCode[]> {
  const { getLang } = await import("./text");
  return dialCodesFor(iso, (await getLang()).code);
}
