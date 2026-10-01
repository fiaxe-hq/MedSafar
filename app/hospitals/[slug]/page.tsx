import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/content/catalog";
import { site } from "@/content/site";
import {
  getDoctors,
  getHospital,
  getHospitals,
  getSpecialities,
  getTreatmentsBySlugs,
  nameOf,
} from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { CheckList } from "@/components/catalog/CheckList";
import { DoctorCard } from "@/components/catalog/DoctorCard";
import { Facts } from "@/components/catalog/Facts";
import { TreatmentCard } from "@/components/catalog/TreatmentCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Figure } from "@/components/ui/Pending";
import { Section, SectionHead } from "@/components/ui/Section";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getHospitals()).map((hospital) => ({ slug: hospital.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hospital = await getHospital(slug);
  if (!hospital) return {};
  return {
    title: `${hospital.name}. ${site.brand.name} ${site.brand.country}.`,
    description: hospital.overview,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const hospital = await getHospital(slug);
  if (!hospital) notFound();

  const text = catalog.hospitals;
  const [doctors, treatments, specialities] = await Promise.all([
    getDoctors({ hospital: hospital.slug }),
    getTreatmentsBySlugs(hospital.treatments),
    getSpecialities(),
  ]);

  return (
    <PageShell current="/hospitals">
      <PageHead
        back={{ href: "/hospitals", label: text.back }}
        label={hospital.city}
        heading={hospital.name}
        intro={hospital.accreditation}
        pending={hospital.pending}
        cta
      />

      <Section tone="quiet">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal min-w-0 lg:col-span-6">
            <h2 className="display-2">{text.detail.overview}</h2>
            <p className="mt-5 max-w-[60ch] text-lg text-ink-2">{hospital.overview}</p>

            <Facts
              className="mt-10"
              items={[
                { label: text.detail.accreditation, value: hospital.accreditation },
                {
                  label: text.detail.specialities,
                  value: (
                    <ul className="flex flex-wrap gap-2">
                      {hospital.specialities.map((s) => (
                        <li key={s}>
                          <Link
                            href={`/treatments#${s}`}
                            className="inline-flex min-h-11 items-center rounded-md border border-hairline bg-surface px-4 text-sm text-ink-2 transition-colors hover:border-line hover:text-ink"
                          >
                            {nameOf(specialities, s)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ),
                },
              ]}
            />
          </div>

          <div className="min-w-0 lg:col-span-6">
            <Figure
              picture={hospital.picture}
              ratio="aspect-[4/3]"
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead heading={text.detail.services} />
        <CheckList items={hospital.services} className="mt-10 max-w-3xl" />

        <h2 className="reveal mt-16 text-2xl font-semibold tracking-[-0.02em] lg:mt-20">
          {text.detail.photos}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hospital.gallery.map((picture, i) => (
            <Figure
              key={i}
              picture={picture}
              ratio="aspect-[4/3]"
              rounded="rounded-lg"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      </Section>

      {doctors.length ? (
        <Section tone="quiet">
          <SectionHead heading={text.detail.doctors} />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.slug}
                doctor={doctor}
                speciality={nameOf(specialities, doctor.speciality)}
                hospital={hospital.name}
              />
            ))}
          </div>
        </Section>
      ) : null}

      {treatments.length ? (
        <Section>
          <SectionHead heading={text.detail.treatments} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((treatment) => (
              <TreatmentCard
                key={treatment.slug}
                treatment={treatment}
                speciality={nameOf(specialities, treatment.speciality)}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source={`/hospitals/${hospital.slug}`} />
    </PageShell>
  );
}
