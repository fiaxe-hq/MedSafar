import type { Metadata } from "next";
import { LegalPage } from "@/components/catalog/LegalPage";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const { privacy } = await getText();
  const lang = await getLang();
  return {
    title: privacy.meta.title,
    description: privacy.meta.description,
    alternates: languageAlternates("/privacy", lang.code),
  };
}

export default async function Page() {
  const { privacy } = await getText();
  return <LegalPage content={privacy} source="/privacy" />;
}
