import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDoctors,
  getHospitals,
  getSpecialities,
  getSpeciality,
  getTreatments,
  nameOf,
  getQuestionnaireFor,
} from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { TreatmentCard } from "@/components/catalog/TreatmentCard";
import { DoctorTile } from "@/components/catalog/DoctorTile";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { QuestionnaireCallout } from "@/components/questionnaire/QuestionnaireCallout";
import { Section, SectionHead } from "@/components/ui/Section";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getSpecialities()).map((speciality) => ({ slug: speciality.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { site } = await getText();
  const lang = await getLang();
  const { slug } = await params;
  const speciality = await getSpeciality(slug);
  if (!speciality) return {};
  return {
    title: `${speciality.name} in India. ${site.brand.name} ${site.brand.country}.`,
    description: speciality.summary,
    alternates: languageAlternates(`/specialities/${speciality.slug}`, lang.code),
  };
}

export default async function Page({ params }: Props) {
  const { catalog } = await getText();
  const { slug } = await params;
  const speciality = await getSpeciality(slug);
  if (!speciality) notFound();

  const text = catalog.specialities;
  const [allTreatments, doctors, hospitals, allHospitals, specialities] = await Promise.all([
    getTreatments(),
    getDoctors({ speciality: speciality.slug }),
    getHospitals({ speciality: speciality.slug }),
    getHospitals(),
    getSpecialities(),
  ]);
  const treatments = allTreatments.filter((t) => t.speciality === speciality.slug);
  const questionnaire = await getQuestionnaireFor(speciality.slug);

  return (
    <PageShell current="/treatments">
      <PageHead
        back={{ href: "/specialities", label: text.back }}
        heading={speciality.name}
        intro={speciality.summary}
        cta
        stats={[
          { value: treatments.length, label: text.detail.stats.treatments },
          { value: doctors.length, label: text.detail.stats.doctors },
          { value: hospitals.length, label: text.detail.stats.hospitals },
        ]}
      />

      {treatments.length ? (
        <Section tone="quiet" className="border-t border-hairline">
          <SectionHead heading={text.detail.treatments} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((treatment) => (
              <li key={treatment.slug} className="min-w-0">
                <TreatmentCard treatment={treatment} />
              </li>
            ))}
          </ul>
          {questionnaire ? <QuestionnaireCallout questionnaire={questionnaire} className="mt-10" /> : null}
        </Section>
      ) : null}

      {doctors.length ? (
        <Section>
          <SectionHead heading={text.detail.doctors} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {doctors.map((doctor) => (
              <li key={doctor.slug} className="min-w-0">
                <DoctorTile
                  doctor={doctor}
                  speciality={nameOf(specialities, doctor.speciality)}
                  hospital={nameOf(allHospitals, doctor.hospital)}
                  view={catalog.doctors.view}
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {hospitals.length ? (
        <Section tone="quiet">
          <SectionHead heading={text.detail.hospitals} />
          <div className={`mt-10 grid gap-5 ${hospitals.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
            {hospitals.map((hospital) => (
              <HospitalCard
                key={hospital.slug}
                hospital={hospital}
                specialities={hospital.specialities.map((s) => nameOf(specialities, s)).join(", ")}
                wide={hospitals.length === 1}
                sizes={
                  hospitals.length === 1
                    ? "(min-width: 1024px) 56vw, 100vw"
                    : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                }
              />
            ))}
          </div>
        </Section>
      ) : null}

      <EnquiryBlock
        content={{ enquiry: catalog.enquiry }}
        source={`/specialities/${speciality.slug}`}
        treatment={speciality.name}
      />
    </PageShell>
  );
}
