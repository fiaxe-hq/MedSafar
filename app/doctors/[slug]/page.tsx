import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/content/catalog";
import { site } from "@/content/site";
import {
  getDoctor,
  getDoctors,
  getHospital,
  getSpecialities,
  getTreatmentsBySlugs,
  nameOf,
} from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { Facts, Lines } from "@/components/catalog/Facts";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { TreatmentCard } from "@/components/catalog/TreatmentCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Figure } from "@/components/ui/Pending";
import { Section, SectionHead } from "@/components/ui/Section";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getDoctors()).map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctor(slug);
  if (!doctor) return {};
  return {
    title: `${doctor.name}. ${site.brand.name} ${site.brand.country}.`,
    description: doctor.profile,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const doctor = await getDoctor(slug);
  if (!doctor) notFound();

  const text = catalog.doctors;
  const [hospital, treatments, specialities] = await Promise.all([
    getHospital(doctor.hospital),
    getTreatmentsBySlugs(doctor.treatments),
    getSpecialities(),
  ]);
  const speciality = nameOf(specialities, doctor.speciality);

  return (
    <PageShell current="/doctors">
      <PageHead
        back={{ href: "/doctors", label: text.back }}
        heading={doctor.name}
        intro={doctor.role}
        pending={doctor.pending}
        cta
      />

      <Section tone="quiet">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 sm:max-w-sm lg:col-span-4 lg:max-w-none">
            <Figure
              picture={doctor.picture}
              ratio="aspect-[4/5]"
              priority
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 100vw"
            />
          </div>

          <div className="reveal min-w-0 lg:col-span-7 lg:col-start-6">
            <h2 className="display-2">{text.detail.profile}</h2>
            <p className="mt-5 max-w-[60ch] text-lg text-ink-2">{doctor.profile}</p>

            <Facts
              className="mt-10"
              items={[
                { label: text.detail.speciality, value: speciality },
                {
                  label: text.detail.hospital,
                  value: hospital ? (
                    <Link
                      href={`/hospitals/${hospital.slug}`}
                      className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
                    >
                      {hospital.name}
                    </Link>
                  ) : null,
                },
                { label: text.detail.otherPractice, value: doctor.otherPractice },
                { label: text.detail.experience, value: doctor.experience },
                {
                  label: text.detail.expertise,
                  value: doctor.expertise.length ? <Lines items={doctor.expertise} /> : null,
                },
                {
                  label: text.detail.qualifications,
                  value: doctor.qualifications.length ? (
                    <Lines items={doctor.qualifications} />
                  ) : null,
                },
                {
                  label: text.detail.languages,
                  value: doctor.languages.length ? <Lines items={doctor.languages} /> : null,
                },
              ]}
            />
          </div>
        </div>
      </Section>

      {treatments.length ? (
        <Section>
          <SectionHead heading={text.detail.procedures} />
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

      {hospital ? (
        <Section tone="quiet">
          <SectionHead heading={text.detail.worksAt} />
          <div className="mt-10 max-w-xl">
            <HospitalCard
              hospital={hospital}
              specialities={hospital.specialities.map((s) => nameOf(specialities, s)).join(", ")}
              sizes="(min-width: 640px) 36rem, 100vw"
            />
          </div>
        </Section>
      ) : null}

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source={`/doctors/${doctor.slug}`} />
    </PageShell>
  );
}
