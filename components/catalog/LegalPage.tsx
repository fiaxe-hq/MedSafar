import type { LegalContent } from "@/content/types";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Section } from "@/components/ui/Section";
import { defaultLanguage } from "@/lib/i18n/languages";
import { getLang, getText } from "@/lib/i18n/text";

/** Privacy and Terms: a plain text page with headings and a last-updated date. */
export async function LegalPage({ content, source }: { content: LegalContent; source: string }) {
  const [{ catalog }, lang] = await Promise.all([getText(), getLang()]);
  return (
    <PageShell>
      <PageHead heading={content.heading} intro={content.intro} pending={content.pending} />

      <Section tone="quiet">
        <div className="max-w-3xl">
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
            {content.sections.map((section) => (
              <div key={section.heading} className="border-b border-hairline py-7">
                <h2 className="text-xl font-medium tracking-[-0.02em]">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {[section.body].flat().map((paragraph, i) => (
                    <p key={i} className="max-w-[68ch] text-base text-ink-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source={source} />
    </PageShell>
  );
}
