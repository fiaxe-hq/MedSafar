import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { requireAdmin } from "@/lib/admin/auth";
import { getTarget, pageNames, sentencesFor, targetLanguages, type Sentence } from "@/lib/admin/translate";
import { getRecordTranslations } from "@/lib/translations";
import { AdminHeading, adminCard } from "@/components/admin/ui";
import { TranslationPanel } from "@/components/admin/TranslationPanel";

/** "sections.3.body.0" → "Sections 4 › Body 1": a readable place within the page. */
function placeName(path: string): string {
  const words = path
    .split(".")
    .slice(1)
    .map((part) => (/^\d+$/.test(part) ? String(Number(part) + 1) : part.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/-/g, " ").toLowerCase()));
  const joined = words.join(" › ").replace(/ › (\d+)/g, " $1");
  return joined ? joined[0].toUpperCase() + joined.slice(1) : "Text";
}

/**
 * One of the site's fixed pages: its English, read only (the web team changes
 * it), and the panel to translate it one piece at a time.
 */
export default async function PageTranslations({ params }: PageProps<"/admin/translations/pages/[slug]">) {
  await requireAdmin();
  const { slug } = await params;
  const target = await getTarget("page", slug);
  if (!target) notFound();
  const sentences: Sentence[] = await sentencesFor("page", slug, target.record, target.original, await getRecordTranslations("page", slug));
  const labels = Object.fromEntries(sentences.map((s) => [s.path, placeName(s.path)]));

  return (
    <>
      <Link href="/admin/translations" className="inline-flex min-h-10 items-center gap-1.5 text-sm text-ink-2 hover:text-accent">
        <ArrowLeftIcon size={16} aria-hidden />
        Translations
      </Link>
      <AdminHeading
        eyebrow="Website page"
        title={pageNames[slug]}
        intro="The English below is the page as visitors see it; the web team changes it. Open Edit translations to pick a language and change its text one piece at a time, or use a CSV on the Translations page for many at once."
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <TranslationPanel
          kind="page"
          slug={slug}
          label={pageNames[slug]}
          buttonLabel="Edit translations"
          sentences={sentences}
          partLabels={labels}
          languages={targetLanguages}
        />
        <span className="text-sm text-ink-3">{sentences.length} pieces of text</span>
      </div>

      <ol className={`${adminCard} mt-6 divide-y divide-hairline`}>
        {sentences.map((s) => (
          <li key={s.path} className="px-5 py-3.5">
            <p className="text-xs font-medium tracking-[0.06em] text-ink-3 uppercase">{labels[s.path]}</p>
            <p className="mt-1 text-sm whitespace-pre-wrap text-ink">{s.english}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
