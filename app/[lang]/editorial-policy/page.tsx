import type { Metadata } from "next";
import { LegalPage } from "@/components/catalog/LegalPage";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const { editorialPolicy } = await getText();
  const lang = await getLang();
  return {
    title: editorialPolicy.meta.title,
    description: editorialPolicy.meta.description,
    alternates: languageAlternates("/editorial-policy", lang.code),
  };
}

export default async function Page() {
  const { editorialPolicy } = await getText();
  return <LegalPage content={editorialPolicy} source="/editorial-policy" />;
}
