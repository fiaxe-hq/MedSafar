import { connection } from "next/server";
import { questionnaires } from "@/content/questionnaires";
import { getEntries, type ListKind } from "@/lib/content";
import { defaultLanguage, languages, localPath } from "@/lib/i18n/languages";
import { textWithEdits } from "@/lib/i18n/text";
import { hiddenLink } from "@/lib/preview";
import { siteUrl } from "@/lib/seo";

/**
 * /sitemap.xml: every page worth finding in search, once per language.
 *
 * Each language's address is its own entry, and every entry names the same
 * page in all the other languages (hreflang, with English as x-default), so a
 * search engine can show each reader their own. Each entry carries the day
 * the page last changed and how much it matters next to the others.
 *
 * Hospital, doctor and blog pages are left out while they are placeholders.
 * Includes the changes made in /admin. public/sitemap.css makes the file
 * readable when a person opens it.
 */

/** The day of this build: when the pages built from the files last changed. */
const BUILT = process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10);

type Page = { path: string; priority: number; changed?: string };

const xml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  // Drawn per request, so hospitals, doctors and posts added in /admin are listed.
  await connection();
  const [{ specialities, treatments, hospitals, doctors, posts }, entries] = await Promise.all([
    textWithEdits(defaultLanguage),
    getEntries(),
  ]);
  const real = <T extends { pending?: boolean }>(records: T[]) => records.filter((r) => !r.pending);

  /** The day a record was last changed in /admin, if it ever was. */
  const edited = new Map(entries.map((e) => [`${e.kind}:${e.slug}`, e.updatedAt.slice(0, 10)]));
  const day = (kind: ListKind, slug: string) => edited.get(`${kind}:${slug}`);
  /** The latest of the days given. */
  const latest = (days: (string | undefined)[]) => days.filter(Boolean).sort().pop();

  const pages: Page[] = [
    { path: "/", priority: 1 },
    { path: "/treatments", priority: 0.9, changed: latest(treatments.map((t) => day("treatment", t.slug))) },
    ...treatments.map((t) => ({ path: `/treatments/${t.slug}`, priority: 0.8, changed: day("treatment", t.slug) })),
    { path: "/hospitals", priority: 0.9, changed: latest(hospitals.map((h) => day("hospital", h.slug))) },
    ...real(hospitals).map((h) => ({ path: `/hospitals/${h.slug}`, priority: 0.8, changed: day("hospital", h.slug) })),
    { path: "/doctors", priority: 0.8, changed: latest(doctors.map((d) => day("doctor", d.slug))) },
    ...real(doctors).map((d) => ({ path: `/doctors/${d.slug}`, priority: 0.7, changed: day("doctor", d.slug) })),
    { path: "/specialities", priority: 0.8 },
    ...specialities.map((s) => ({ path: `/specialities/${s.slug}`, priority: 0.7 })),
    { path: "/blog", priority: 0.6, changed: latest(real(posts).map((p) => day("post", p.slug) ?? p.date ?? undefined)) },
    ...real(posts).map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, changed: day("post", p.slug) ?? p.date ?? undefined })),
    { path: "/questionnaires", priority: 0.5 },
    ...questionnaires.map((q) => ({ path: `/questionnaires/${q.slug}`, priority: 0.5 })),
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
    { path: "/cancellations", priority: 0.2 },
    { path: "/disclaimer", priority: 0.2 },
    { path: "/editorial-policy", priority: 0.2 },
  ].filter(({ path }) => !hiddenLink(path));

  const address = (lang: string, path: string) => {
    const local = localPath(lang, path);
    return xml(`${siteUrl}${local === "/" ? "" : local}`);
  };

  const out: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/css" href="/sitemap.css"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];
  for (const page of pages) {
    // The same list of languages goes under each language's entry.
    const alternates = [
      ...languages.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${l.code}" href="${address(l.code, page.path)}" />`,
      ),
      `<xhtml:link rel="alternate" hreflang="x-default" href="${address(defaultLanguage, page.path)}" />`,
    ].join("\n");
    // A file's own date can be older than the build that last drew the page.
    const changed = page.changed && page.changed > BUILT ? page.changed : BUILT;
    for (const lang of languages) {
      out.push(
        "<url>",
        `<loc>${address(lang.code, page.path)}</loc>`,
        alternates,
        `<lastmod>${changed}</lastmod>`,
        // A translation counts a little less than the English original.
        `<priority>${lang.code === defaultLanguage ? page.priority : Math.round(page.priority * 80) / 100}</priority>`,
        "</url>",
      );
    }
  }
  out.push("</urlset>");

  return new Response(out.join("\n"), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Search engines read it a few times a day at most.
      "Cache-Control": "public, max-age=3600",
    },
  });
}
