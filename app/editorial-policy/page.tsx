import type { Metadata } from "next";
import { editorialPolicy } from "@/content/pages";
import { LegalPage } from "@/components/catalog/LegalPage";

export const metadata: Metadata = {
  title: editorialPolicy.meta.title,
  description: editorialPolicy.meta.description,
  alternates: { canonical: "/editorial-policy" },
};

export default function Page() {
  return <LegalPage content={editorialPolicy} source="/editorial-policy" />;
}
