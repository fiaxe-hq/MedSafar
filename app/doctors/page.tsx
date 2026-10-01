import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { getDoctors, getHospitals, getSpecialities, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { DoctorCard } from "@/components/catalog/DoctorCard";
import { Filters, NoResults, ResultCount } from "@/components/catalog/Filters";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note, Section } from "@/components/ui/Section";

/** Shared page: one copy for every country. */

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export const metadata: Metadata = {
  title: catalog.doctors.meta.title,
  description: catalog.doctors.meta.description,
};

export default async function Page({ searchParams }: Props) {
  const text = catalog.doctors;
  const query = await searchParams;
  const speciality = first(query.speciality);
  const hospital = first(query.hospital);

  const [doctors, hospitals, specialities] = await Promise.all([
    getDoctors({ speciality, hospital }),
    getHospitals(),
    getSpecialities(),
  ]);

  return (
    <PageShell current="/doctors">
      <PageHead label={text.eyebrow} heading={text.heading} intro={text.intro} />

      <Section tone="quiet">
        <Filters
          action="/doctors"
          fields={[
            {
              name: "speciality",
              label: text.filters.speciality,
              value: speciality,
              options: specialities.map((s) => ({ value: s.slug, label: s.name })),
            },
            {
              name: "hospital",
              label: text.filters.hospital,
              value: hospital,
              options: hospitals.map((h) => ({ value: h.slug, label: h.name })),
            },
          ]}
        />

        <ResultCount count={doctors.length} />

        {doctors.length ? (
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.slug}
                doctor={doctor}
                speciality={nameOf(specialities, doctor.speciality)}
                hospital={nameOf(hospitals, doctor.hospital)}
                heading="h2"
              />
            ))}
          </div>
        ) : (
          <NoResults action="/doctors" />
        )}

        <Note>{text.note}</Note>
      </Section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/doctors" />
    </PageShell>
  );
}
