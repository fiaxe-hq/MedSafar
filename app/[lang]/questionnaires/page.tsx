import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { QuestionnaireCallout } from "@/components/questionnaire/QuestionnaireCallout";
import { Section } from "@/components/ui/Section";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

/** Shared page: one copy for every country. */

export async function generateMetadata(): Promise<Metadata> {
  const { questionnaireText } = await getText();
  const lang = await getLang();
  return {
    title: questionnaireText.list.meta.title,
    description: questionnaireText.list.meta.description,
    alternates: languageAlternates("/questionnaires", lang.code),
  };
}

export default async function Page() {
  const { questionnaires, questionnaireText } = await getText();
  const text = questionnaireText;
  return (
    <PageShell>
      <PageHead heading={text.list.heading} intro={text.list.intro} />
      <Section tone="quiet" className="border-t border-hairline">
        <div className="grid max-w-4xl gap-5">
          {questionnaires.map((q) => (
            <QuestionnaireCallout key={q.slug} questionnaire={q} />
          ))}
        </div>
        <p className="mt-10 max-w-[68ch] text-sm text-ink-3">{text.note}</p>
      </Section>
    </PageShell>
  );
}
