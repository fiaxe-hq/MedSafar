import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { questionnaires } from "@/content/questionnaires";
import { getQuestionnaire } from "@/lib/catalog";
import { defaultIso } from "@/content/dial-codes";
import { getDialCodes } from "@/lib/i18n/dialCodes";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { QuestionnaireForm } from "@/components/questionnaire/QuestionnaireForm";
import { Section } from "@/components/ui/Section";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return questionnaires.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang();
  const { slug } = await params;
  const questionnaire = await getQuestionnaire(slug);
  if (!questionnaire) return {};
  return {
    title: questionnaire.meta.title,
    description: questionnaire.meta.description,
    alternates: languageAlternates(`/questionnaires/${questionnaire.slug}`, lang.code),
  };
}

export default async function Page({ params }: Props) {
  const { site, questionnaireText } = await getText();
  const { slug } = await params;
  const questionnaire = await getQuestionnaire(slug);
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
            dialCodes={await getDialCodes(null)}
            defaultIso={defaultIso}
          />
          <p className="mt-8 text-sm text-ink-3">{text.note}</p>
        </div>
      </Section>
    </PageShell>
  );
}
