import type { Metadata } from "next";
import { LegalPage } from "@/components/catalog/LegalPage";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const { terms } = await getText();
  const lang = await getLang();
  return {
    title: terms.meta.title,
    description: terms.meta.description,
    alternates: languageAlternates("/terms", lang.code),
  };
}

export default async function Page() {
  const { terms } = await getText();
  return <LegalPage content={terms} source="/terms" />;
}
