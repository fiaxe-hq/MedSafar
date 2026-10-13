import type { Metadata } from "next";
import { disclaimer } from "@/content/pages";
import { LegalPage } from "@/components/catalog/LegalPage";

export const metadata: Metadata = {
  title: disclaimer.meta.title,
  description: disclaimer.meta.description,
  alternates: { canonical: "/disclaimer" },
};

export default function Page() {
  return <LegalPage content={disclaimer} source="/disclaimer" />;
}
