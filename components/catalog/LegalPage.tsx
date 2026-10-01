import type { LegalContent } from "@/content/types";
import { catalog } from "@/content/catalog";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Section } from "@/components/ui/Section";

/** Privacy and Terms: a plain text page with headings and a last-updated date. */
export function LegalPage({ content, source }: { content: LegalContent; source: string }) {
  return (
    <PageShell>
      <PageHead heading={content.heading} intro={content.intro} pending={content.pending} />

      <Section tone="quiet">
        <div className="max-w-3xl">
          <p className="text-sm text-ink-3">
            {content.updated.label}: {content.updated.value}
          </p>

          <div className="mt-8 border-t border-hairline">
            {content.sections.map((section) => (
              <div key={section.heading} className="border-b border-hairline py-7">
                <h2 className="text-xl font-semibold tracking-[-0.02em]">{section.heading}</h2>
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
