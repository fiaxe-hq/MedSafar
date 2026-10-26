import type { Metadata } from "next";
import { LegalPage } from "@/components/catalog/LegalPage";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const { cancellations } = await getText();
  const lang = await getLang();
  return {
    title: cancellations.meta.title,
    description: cancellations.meta.description,
    alternates: languageAlternates("/cancellations", lang.code),
  };
}

export default async function Page() {
  const { cancellations } = await getText();
  return <LegalPage content={cancellations} source="/cancellations" />;
}
