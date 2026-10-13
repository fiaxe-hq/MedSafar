import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuestionnaire, questionnaires, questionnaireText } from "@/content/questionnaires";
import { site } from "@/content/site";
import { defaultIso, dialCodesFor } from "@/content/dial-codes";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { QuestionnaireForm } from "@/components/questionnaire/QuestionnaireForm";
import { Section } from "@/components/ui/Section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return questionnaires.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const questionnaire = getQuestionnaire(slug);
  if (!questionnaire) return {};
  return {
    title: questionnaire.meta.title,
    description: questionnaire.meta.description,
    alternates: { canonical: `/questionnaires/${questionnaire.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const questionnaire = getQuestionnaire(slug);
  if (!questionnaire) notFound();
  const text = questionnaireText;

  return (
    <PageShell>
      <PageHead
        back={{ href: "/questionnaires", label: text.list.back }}
        heading={questionnaire.heading}
        intro={questionnaire.intro}
      />
      <Section tone="quiet" className="border-t border-hairline">
        <div className="max-w-3xl">
          <QuestionnaireForm
            questionnaire={questionnaire}
            text={text}
            form={site.form}
            dialCodes={dialCodesFor(null)}
            defaultIso={defaultIso}
          />
          <p className="mt-8 text-sm text-ink-3">{text.note}</p>
        </div>
      </Section>
    </PageShell>
  );
}
