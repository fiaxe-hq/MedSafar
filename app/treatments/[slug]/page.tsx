import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalog } from "@/content/catalog";
import { site } from "@/content/site";
import {
  getDoctorsByTreatment,
  getHospitals,
  getHospitalsByTreatment,
  getSpecialities,
  getTreatment,
  getTreatments,
  nameOf,
} from "@/lib/catalog";
import { BedIcon } from "@phosphor-icons/react/dist/ssr/Bed";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { DoctorCard } from "@/components/catalog/DoctorCard";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Faq } from "@/components/sections/Faq";
import { Section, SectionHead } from "@/components/ui/Section";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getTreatments()).map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) return {};
  return {
    title: `${treatment.name}. ${site.brand.name} ${site.brand.country}.`,
    description: treatment.summary,
    alternates: { canonical: `/treatments/${treatment.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) notFound();

  const text = catalog.treatments;
  const [hospitals, doctors, allHospitals, specialities] = await Promise.all([
    getHospitalsByTreatment(treatment.slug),
    getDoctorsByTreatment(treatment.slug),
    getHospitals(),
    getSpecialities(),
  ]);

  return (
    <PageShell current="/treatments">
      <PageHead
        back={{ href: "/treatments", label: text.back }}
        heading={treatment.name}
        intro={treatment.summary}
        pending={treatment.pending}
        cta
      />

      <Section tone="quiet">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <h2 className="display-2">{text.detail.what}</h2>
            <p className="mt-5 max-w-[60ch] text-lg text-ink-2">{treatment.what}</p>
          </div>
          <div className="reveal">
            <h2 className="display-2">{text.detail.who}</h2>
            <p className="mt-5 max-w-[60ch] text-lg text-ink-2">{treatment.who}</p>
          </div>
        </div>

        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16">
          {[
            { label: text.detail.stay, value: treatment.stay, Glyph: BedIcon },
            { label: text.detail.recovery, value: treatment.recovery, Glyph: ClockIcon },
          ].map(({ label, value, Glyph }) => (
            <div key={label} className="reveal flex gap-5 rounded-lg border border-hairline bg-surface p-6 sm:p-7">
              <span className="home-pop grid size-12 shrink-0 place-items-center rounded-md bg-accent text-accent-ink">
                <Glyph size={22} aria-hidden />
              </span>
              <div className="min-w-0">
                <dt className="text-sm font-medium text-ink-3">{label}</dt>
                <dd className="mt-1.5 text-lg font-medium text-ink">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Section>

      {hospitals.length || doctors.length ? (
        <Section>
          {hospitals.length ? (
            <>
              <SectionHead heading={text.detail.hospitals} />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {hospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.slug}
                    hospital={hospital}
                    specialities={hospital.specialities
                      .map((s) => nameOf(specialities, s))
                      .join(", ")}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  />
                ))}
              </div>
            </>
          ) : null}

          {doctors.length ? (
            <>
              <SectionHead
                heading={text.detail.doctors}
                className={hospitals.length ? "mt-20 lg:mt-24" : ""}
              />
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.slug}
                    doctor={doctor}
                    speciality={nameOf(specialities, doctor.speciality)}
                    hospital={nameOf(allHospitals, doctor.hospital)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </Section>
      ) : null}

      {treatment.faq.length ? (
        <Faq content={{ faq: { heading: text.detail.faq, items: treatment.faq } }} />
      ) : null}

      <EnquiryBlock
        content={{ enquiry: catalog.enquiry }}
        source={`/treatments/${treatment.slug}`}
        treatment={treatment.name}
      />
    </PageShell>
  );
}
