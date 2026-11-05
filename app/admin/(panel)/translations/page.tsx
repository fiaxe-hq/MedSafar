import Link from "next/link";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { requireAdmin } from "@/lib/admin/auth";
import { allTargets, pageNames, sentencesFor, targetLanguages } from "@/lib/admin/translate";
import { sectionNames } from "@/lib/admin/translationCsv";
import { getAllTranslations, translationKey } from "@/lib/translations";
import { AdminHeading, adminButton, adminCard } from "@/components/admin/ui";
import { ImportCsv } from "@/components/admin/ImportCsv";

const sectionLabels: Record<string, string> = {
  hospitals: "Hospitals",
  doctors: "Doctors",
  treatments: "Treatments",
  blog: "Blog",
  contact: "Contact details",
  figures: "Trust figures",
  pages: "Website pages",
};

/** How far each language is, and the CSV downloads and import. */
export default async function TranslationsPage() {
  await requireAdmin();
  const all = await getAllTranslations();
  let total = 0;
  const done = new Map<string, number>();
  // Per website page: pieces of text, and how many of them every language has.
  const pages = new Map<string, { count: number; complete: number }>();
  for (const target of await allTargets()) {
    const sentences = await sentencesFor(target.kind, target.slug, target.record, target.original, all.get(translationKey(target.kind, target.slug)) ?? {});
    total += sentences.length;
    for (const s of sentences) {
      for (const l of targetLanguages) if (s.langs[l.code].text && !s.langs[l.code].stale) done.set(l.code, (done.get(l.code) ?? 0) + 1);
    }
    if (target.kind === "page") {
      const complete = sentences.filter((s) => targetLanguages.every((l) => s.langs[l.code].text && !s.langs[l.code].stale)).length;
      pages.set(target.slug, { count: sentences.length, complete });
    }
  }
  const href = (params: string) => `/admin/translations/download?${params}`;

  return (
    <>
      <AdminHeading
        eyebrow="Languages"
        title="Translations"
        intro="Everything is written in English first. Visitors to another language see its translation where there is one, and the English where there is not. Translate hospitals, doctors, treatments and blog posts from their own pages (Translate beside a field, or Translate whole page), the website's other pages below, or many at once with a CSV file."
      />

      <section className={`${adminCard} mt-8 p-5 sm:p-6`} aria-labelledby="progress">
        <h2 id="progress" className="font-display text-lg font-semibold">How far each language is</h2>
        <p className="mt-1 text-sm text-ink-3">
          Of the {total.toLocaleString("en-GB")} pieces of text on the whole website.
        </p>
        <ul className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
          {targetLanguages.map((l) => {
            const count = done.get(l.code) ?? 0;
            const percent = total ? Math.floor((count / total) * 100) : 100;
            return (
              <li key={l.code}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium text-ink">
                    {l.english} <span className="font-normal text-ink-3">{l.name}</span>
                  </span>
                  <span className="text-ink-3">{percent}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={l.english}>
                  <div className="h-full rounded-full bg-brand" style={{ width: `${percent}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={`${adminCard} mt-6 p-5 sm:p-6`} aria-labelledby="pages">
        <h2 id="pages" className="font-display text-lg font-semibold">Website pages</h2>
        <p className="mt-1 text-sm text-ink-3">
          Pages without an editor of their own: the home page, menus and buttons, the legal pages and the rest. Open one to translate it piece by piece.
        </p>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {Object.entries(pageNames).map(([slug, name]) => {
            const page = pages.get(slug);
            return (
              <li key={slug}>
                <Link
                  href={`/admin/translations/pages/${slug}`}
                  className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-line px-4 py-2.5 text-sm transition-colors hover:border-accent hover:bg-accent-quiet"
                >
                  <span className="font-medium text-ink">{name}</span>
                  <span className="flex items-center gap-2 text-ink-3">
                    {page ? `${page.complete} of ${page.count} in every language` : ""}
                    <CaretRightIcon size={15} aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2 lg:[&>*]:min-w-0">
        <section className={`${adminCard} p-5 sm:p-6`} aria-labelledby="download">
          <h2 id="download" className="font-display text-lg font-semibold">1. Download a file</h2>
          <p className="mt-1 text-sm text-ink-3">Open it in Excel or Google Sheets. Each row is one piece of text, with its English and a column per language.</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={href("missing=1")} className={`${adminButton.primary} w-full justify-start py-2.5 text-start whitespace-normal`}>
                <DownloadSimpleIcon size={18} aria-hidden />
                What still needs translating
              </a>
            </li>
            <li>
              <a href={href("")} className={`${adminButton.quiet} w-full justify-start py-2.5 text-start whitespace-normal`}>
                <DownloadSimpleIcon size={18} aria-hidden />
                Everything, with the current translations
              </a>
            </li>
            <li>
              <a href={href("type=template")} className={`${adminButton.quiet} w-full justify-start py-2.5 text-start whitespace-normal`}>
                <DownloadSimpleIcon size={18} aria-hidden />
                Empty template with instructions
              </a>
            </li>
          </ul>
          <p className="mt-5 text-sm font-medium text-ink-2">One section only</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sectionNames.map((s) => (
              <a key={s} href={href(`section=${s}`)} className="inline-flex min-h-10 items-center rounded-full border border-line px-3.5 text-sm text-ink-2 hover:border-accent hover:text-accent">
                {sectionLabels[s] ?? s}
              </a>
            ))}
          </div>
        </section>

        <section className={`${adminCard} p-5 sm:p-6`} aria-labelledby="import">
          <h2 id="import" className="font-display text-lg font-semibold">2. Fill it in, then import it</h2>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-ink-2">
            <li>Only fill in the language columns. Do not change Section, ID, Field or English.</li>
            <li>An empty cell leaves that language as it is.</li>
            <li>Save as &ldquo;CSV UTF-8&rdquo; so every script is kept.</li>
            <li>You see what will change before anything is saved.</li>
          </ul>
          <div className="mt-5">
            <ImportCsv />
          </div>
        </section>
      </div>
    </>
  );
}
