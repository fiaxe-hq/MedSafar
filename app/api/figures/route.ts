import { getLanguage } from "@/lib/i18n/languages";
import { getPublishedStats } from "@/lib/stats";
import { getLanguageTranslations, liveTranslation, translationKey } from "@/lib/translations";

/**
 * The figures published in /admin/stats, for the strip on the home page.
 * With ?lang=<code>, each label in that language where /admin has one for
 * the current English.
 */
export async function GET(request: Request) {
  const figures = await getPublishedStats(null);
  const lang = getLanguage(new URL(request.url).searchParams.get("lang") ?? "");
  if (lang && lang.code !== "en") {
    const sets = await getLanguageTranslations(lang.code);
    for (const figure of figures) {
      figure.label = liveTranslation(sets.get(translationKey("figure", figure.key)), "label", figure.label) ?? figure.label;
    }
  }
  return Response.json(figures, { headers: { "Cache-Control": "public, max-age=60" } });
}
