import type { LegalContent } from "@/content/types";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Section } from "@/components/ui/Section";
import { defaultLanguage } from "@/lib/i18n/languages";
import { getLang, getText } from "@/lib/i18n/text";

/** "1. Scope" in the text is "Scope" in the list, which numbers its own rows. */
const LEADING_NUMBER = /^\d+[.)]\s*/;

/** Privacy and Terms: a plain text page with headings and a last-updated date. */
export async function LegalPage({ content, source }: { content: LegalContent; source: string }) {
  const [{ catalog }, lang] = await Promise.all([getText(), getLang()]);
  return (
    <PageShell>
      <PageHead heading={content.heading} intro={content.intro} pending={content.pending} />

      <Section tone="quiet">
        {/* The text on the left; beside it on a wide screen, a list of the
            sections that stays in view, so the page is not half empty. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="max-w-3xl min-w-0 lg:col-span-8">
          {lang.code === defaultLanguage ? null : (
            <p className="mb-6 rounded-md border border-hairline bg-surface p-4 text-base text-ink-2">
              {catalog.legalNote}{" "}
              {/* hrefLang "en" so the link leaves the translation for the plain English address. */}
              <a href={source} hrefLang="en" lang="en" className="font-medium text-accent underline underline-offset-2">
                {catalog.legalEnglish}
              </a>
            </p>
          )}
          {content.draft ? (
            <p className="mb-6 rounded-md border border-line bg-accent-quiet p-4 text-base font-medium text-ink">
              {content.draft}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-3">
            {content.effective ? (
              <span>
                {content.effective.label}: {content.effective.value}
              </span>
            ) : null}
            <span>
              {content.updated.label}: {content.updated.value}
            </span>
          </div>

          {content.preamble ? (
            <div className="mt-8 space-y-3">
              {content.preamble.map((paragraph, i) => (
                <p key={i} className="max-w-[68ch] text-base text-ink-2">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          <div className="mt-8 border-t border-hairline">
            {content.sections.map((section, i) => (
              <div key={section.heading} id={`section-${i + 1}`} className="scroll-mt-28 border-b border-hairline py-7">
                <h2 className="text-xl font-medium tracking-[-0.02em]">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {[section.body].flat().map((paragraph, j) => (
                    <p key={j} className="max-w-[68ch] text-base text-ink-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {content.sections.length > 2 ? (
          <nav
            aria-label={catalog.legalContents}
            className="hidden lg:sticky lg:top-28 lg:col-span-4 lg:block lg:self-start"
          >
            <div className="max-h-[calc(100dvh-9rem)] overflow-y-auto overscroll-contain rounded-lg border border-hairline bg-surface p-6">
              <p className="text-sm font-medium text-ink-3">{catalog.legalContents}</p>
              <ol className="mt-3 space-y-0.5">
                {content.sections.map((section, i) => (
                  <li key={section.heading}>
                    <a
                      href={`#section-${i + 1}`}
                      className="flex gap-3 rounded-md px-2 py-2 text-[0.9375rem] leading-snug text-ink-2 transition-colors hover:bg-surface-2 hover:text-accent"
                    >
                      <span className="font-mono text-xs leading-[1.6] text-ink-3 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.heading.replace(LEADING_NUMBER, "")}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        ) : null}
        </div>
      </Section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source={source} />
    </PageShell>
  );
}
