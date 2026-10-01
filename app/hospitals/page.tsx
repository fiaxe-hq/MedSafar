import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { getHospitalCities, getHospitals, getSpecialities, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { Filters, NoResults, ResultCount } from "@/components/catalog/Filters";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note, Section } from "@/components/ui/Section";

/** Shared page: one copy for every country. */

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export const metadata: Metadata = {
  title: catalog.hospitals.meta.title,
  description: catalog.hospitals.meta.description,
};

export default async function Page({ searchParams }: Props) {
  const text = catalog.hospitals;
  const query = await searchParams;
  const city = first(query.city);
  const speciality = first(query.speciality);

  const [hospitals, cities, specialities] = await Promise.all([
    getHospitals({ city, speciality }),
    getHospitalCities(),
    getSpecialities(),
  ]);

  return (
    <PageShell current="/hospitals">
      <PageHead label={text.eyebrow} heading={text.heading} intro={text.intro} />

      <Section tone="quiet">
        <Filters
          action="/hospitals"
          fields={[
            {
              name: "city",
              label: text.filters.city,
              value: city,
              options: cities.map((c) => ({ value: c, label: c })),
            },
            {
              name: "speciality",
              label: text.filters.speciality,
              value: speciality,
              options: specialities.map((s) => ({ value: s.slug, label: s.name })),
            },
          ]}
        />

        <ResultCount count={hospitals.length} />

        {hospitals.length ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((hospital) => (
              <HospitalCard
                key={hospital.slug}
                hospital={hospital}
                specialities={hospital.specialities.map((s) => nameOf(specialities, s)).join(", ")}
                heading="h2"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        ) : (
          <NoResults action="/hospitals" />
        )}

        <Note>{text.note}</Note>
      </Section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/hospitals" />
    </PageShell>
  );
}
