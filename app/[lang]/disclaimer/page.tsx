import type { Metadata } from "next";
import { LegalPage } from "@/components/catalog/LegalPage";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const { disclaimer } = await getText();
  const lang = await getLang();
  return {
    title: disclaimer.meta.title,
    description: disclaimer.meta.description,
    alternates: languageAlternates("/disclaimer", lang.code),
  };
}

export default async function Page() {
  const { disclaimer } = await getText();
  return <LegalPage content={disclaimer} source="/disclaimer" />;
}
