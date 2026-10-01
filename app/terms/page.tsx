import type { Metadata } from "next";
import { terms } from "@/content/pages";
import { LegalPage } from "@/components/catalog/LegalPage";

export const metadata: Metadata = {
  title: terms.meta.title,
  description: terms.meta.description,
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <LegalPage content={terms} source="/terms" />;
}
