import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { getDoctors, getHospitalCities, getHospitals, getSpecialities, getTreatments, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { Filters, NoResults, ResultCount } from "@/components/catalog/Filters";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

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

  const [hospitals, everyone, cities, specialities, doctors, treatments] = await Promise.all([
    getHospitals({ city, speciality }),
    getHospitals(),
    getHospitalCities(),
    getSpecialities(),
    getDoctors(),
    getTreatments(),
  ]);
  const covered = new Set(everyone.flatMap((h) => h.specialities));

  return (
    <PageShell current="/hospitals">
      <PageHead
        heading={text.heading}
        intro={text.intro}
        stats={[
          { value: covered.size, label: text.stats.specialities },
          { value: doctors.length, label: text.stats.doctors },
          { value: treatments.length, label: text.stats.treatments },
        ]}
        picture={everyone[0]?.gallery.find((p) => !p.pending && p.src) ?? everyone[0]?.picture}
      />

      <section className="bg-surface-2 pt-8 pb-16 sm:pt-10 sm:pb-20">
        <Container>
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
          <div
            className={`mt-4 grid gap-5 ${hospitals.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}
          >
            {hospitals.map((hospital) => (
              <HospitalCard
                key={hospital.slug}
                hospital={hospital}
                specialities={hospital.specialities.map((s) => nameOf(specialities, s)).join(", ")}
                heading="h2"
                wide={hospitals.length === 1}
                sizes={
                  hospitals.length === 1
                    ? "(min-width: 1024px) 56vw, 100vw"
                    : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                }
              />
            ))}
          </div>
        ) : (
          <NoResults action="/hospitals" />
        )}

        <Note>{text.note}</Note>
        </Container>
      </section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/hospitals" />
    </PageShell>
  );
}
