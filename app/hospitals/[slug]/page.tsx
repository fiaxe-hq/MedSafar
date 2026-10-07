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
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { CheckList } from "@/components/catalog/CheckList";
import { DoctorCard } from "@/components/catalog/DoctorCard";
import { Facts } from "@/components/catalog/Facts";
import { TreatmentCard } from "@/components/catalog/TreatmentCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Figure } from "@/components/ui/Pending";
import { Section, SectionHead } from "@/components/ui/Section";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

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
        heading={hospital.name}
        intro={hospital.accreditation}
        pending={hospital.pending}
        cta
        picture={hospital.picture}
      />

      <Section tone="quiet">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal min-w-0 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <h2 className="display-2">{text.detail.overview}</h2>
            <p className="mt-5 max-w-[60ch] text-lg text-ink-2">{hospital.overview}</p>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <Facts
              items={[
                { label: text.detail.address, value: hospital.address },
                { label: text.detail.accreditation, value: hospital.accreditation },
                {
                  label: text.detail.specialities,
                  value: (
                    <ul className="flex flex-wrap gap-2">
                      {hospital.specialities.map((s) => {
                        return (
                          <li key={s}>
                            <Link
                              href={`/treatments#${s}`}
                              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface px-4 text-sm text-ink-2 transition-[color,border-color,background-color,translate] duration-300 ease-(--ease-soft) hover:-translate-y-0.5 hover:border-line hover:bg-accent-quiet hover:text-ink"
                            >
                              <SpecialityIcon slug={s} size={16} className="text-accent" aria-hidden />
                              {nameOf(specialities, s)}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHead heading={text.detail.services} />
            <CheckList items={hospital.services} className="mt-10" />
          </div>
          {hospital.centres?.length ? (
            <div className="min-w-0">
              <SectionHead heading={text.detail.centres} />
              <CheckList items={hospital.centres} className="mt-10" />
            </div>
          ) : null}
        </div>

        <h2 className="reveal mt-16 text-2xl font-medium tracking-[-0.02em] lg:mt-20">
          {text.detail.photos}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hospital.gallery.map((picture, i) => (
            <div key={i} className={`reveal min-w-0 ${i % 5 === 0 ? "sm:col-span-2" : ""}`}>
              <Figure
                picture={picture}
                ratio={i % 5 === 0 ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full" : "aspect-[4/3]"}
                rounded="rounded-lg"
                sizes={i % 5 === 0 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
              />
            </div>
          ))}
        </div>

        {hospital.videos?.length ? (
          <>
            <h2 className="reveal mt-16 text-2xl font-medium tracking-[-0.02em] lg:mt-20">
              {text.detail.videos}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hospital.videos.map((video) => (
                <VideoEmbed key={video.title} video={video} />
              ))}
            </div>
          </>
        ) : null}
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
