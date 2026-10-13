import type { Metadata } from "next";
import { questionnaires, questionnaireText } from "@/content/questionnaires";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { QuestionnaireCallout } from "@/components/questionnaire/QuestionnaireCallout";
import { Section } from "@/components/ui/Section";

/** Shared page: one copy for every country. */

export const metadata: Metadata = {
  title: questionnaireText.list.meta.title,
  description: questionnaireText.list.meta.description,
  alternates: { canonical: "/questionnaires" },
};

export default function Page() {
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
