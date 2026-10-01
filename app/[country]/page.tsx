import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { countrySlugs, getCountry } from "@/content/countries";
import { CountryPage } from "@/components/CountryPage";

/**
 * One page per country: /ng, and later /ke, /iq and the rest. Adding a country
 * means adding a content file and registering it in content/countries/index.ts.
 */

type Params = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  return countrySlugs.map((country) => ({ country }));
}

/** Only registered countries exist; anything else is a 404. */
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { country } = await params;
  const content = getCountry(country);
  if (!content) return {};
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: `/${content.slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { country } = await params;
  const content = getCountry(country);
  if (!content) notFound();
  return <CountryPage content={content} />;
}
