import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { notFound } from "next/navigation";
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
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";
import { fill } from "@/content/ui";
import { btnPrimary } from "@/components/ui/styles";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getDoctors()).map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { site } = await getText();
  const lang = await getLang();
  const { slug } = await params;
  const doctor = await getDoctor(slug);
  if (!doctor) return {};
  return {
    title: `${doctor.name}. ${site.brand.name} ${site.brand.country}.`,
    alternates: languageAlternates(`/doctors/${doctor.slug}`, lang.code),
    description: doctor.profile,
  };
}

export default async function Page({ params }: Props) {
  const { catalog } = await getText();
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
  // Every button on this page books a consultation with this doctor.
  const book = (line: string) => fill(line, { name: doctor.name });

  return (
    <PageShell current="/doctors">
      <PageHead
        back={{ href: "/doctors", label: text.back }}
        heading={doctor.name}
        intro={doctor.role}
        pending={doctor.pending}
        cta={book(text.book.button)}
      />

      <Section tone="quiet">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* On a laptop the photo stays in view while the profile scrolls
              past it, then both move on together. */}
          <div className="min-w-0 sm:max-w-sm lg:sticky lg:top-24 lg:col-span-4 lg:max-w-none lg:self-start">
            <Figure
              picture={doctor.picture}
              ratio="aspect-[4/5]"
              position="object-top"
              priority
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 100vw"
            />
            <a href="#plan" className={`${btnPrimary} mt-5 w-full`}>
              {text.book.short}
            </a>
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

      <EnquiryBlock
        content={{ enquiry: { heading: book(text.book.heading), support: book(text.book.support) } }}
        source={`/doctors/${doctor.slug}`}
        submit={text.book.submit}
      />
    </PageShell>
  );
}
