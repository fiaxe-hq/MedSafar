import type { Metadata } from "next";
import { privacy } from "@/content/pages";
import { LegalPage } from "@/components/catalog/LegalPage";

export const metadata: Metadata = {
  title: privacy.meta.title,
  description: privacy.meta.description,
};

export default function Page() {
  return <LegalPage content={privacy} source="/privacy" />;
}
