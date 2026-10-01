import type { Metadata } from "next";
import { global } from "@/content/countries";
import { CountryPage } from "@/components/CountryPage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <CountryPage content={global} />;
}
