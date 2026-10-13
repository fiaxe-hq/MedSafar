import type { Metadata } from "next";
import { cancellations } from "@/content/pages";
import { LegalPage } from "@/components/catalog/LegalPage";

export const metadata: Metadata = {
  title: cancellations.meta.title,
  description: cancellations.meta.description,
  alternates: { canonical: "/cancellations" },
};

export default function Page() {
  return <LegalPage content={cancellations} source="/cancellations" />;
}
