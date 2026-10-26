import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDoctorsByTreatment,
  getHospitals,
  getHospitalsByTreatment,
  getSpecialities,
  getTreatment,
  getTreatments,
  nameOf,
  getQuestionnaireFor,
} from "@/lib/catalog";
import { BedIcon } from "@phosphor-icons/react/dist/ssr/Bed";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import Link from "@/components/ui/Link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { QuestionnaireCallout } from "@/components/questionnaire/QuestionnaireCallout";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { btnPrimary } from "@/components/ui/styles";
import { showUpcoming } from "@/lib/preview";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { DoctorCard } from "@/components/catalog/DoctorCard";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Faq } from "@/components/sections/Faq";
import { Section, SectionHead } from "@/components/ui/Section";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getTreatments()).map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { site } = await getText();
  const lang = await getLang();
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) return {};
  return {
    title: `${treatment.name}. ${site.brand.name} ${site.brand.country}.`,
    description: treatment.summary,
    alternates: languageAlternates(`/treatments/${treatment.slug}`, lang.code),
  };
}

export default async function Page({ params }: Props) {
  const { catalog } = await getText();
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
  const { cost } = text.detail;
  const questionnaire = await getQuestionnaireFor(treatment.speciality);

  return (
    <PageShell current="/treatments">
      <PageHead
        back={{ href: "/treatments", label: text.back }}
        heading={treatment.name}
        intro={treatment.pending ? `${treatment.summary} ${catalog.draft}` : treatment.summary}
        pending={treatment.pending}
        cta
      >
        {showUpcoming ? (
          <Link
            href={`/specialities/${treatment.speciality}`}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface px-4 text-sm text-ink-2 transition-[background-color,border-color,color] duration-300 ease-(--ease-soft) hover:border-line hover:bg-accent-quiet hover:text-ink"
          >
            <SpecialityIcon slug={treatment.speciality} size={16} className="text-accent" aria-hidden />
            {text.detail.speciality} {nameOf(specialities, treatment.speciality)}
            <ArrowRightIcon size={14} className="text-ink-3 transition-[translate] duration-300 group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden />
          </Link>
        ) : null}
      </PageHead>

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

        {showUpcoming ? (
          <div className="mt-20 border-t border-hairline pt-16 lg:mt-24 lg:pt-20">
            <SectionHead heading={cost.heading} intro={cost.intro} />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cost.factors.map((factor, i) => (
                <li key={factor.title} className="reveal rounded-lg border border-hairline bg-surface p-6 sm:p-7">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-medium tracking-[-0.01em]">{factor.title}</h3>
                  <p className="mt-2 text-base text-ink-2">{factor.body}</p>
                </li>
              ))}
            </ol>
            <div className="reveal mt-8 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-[60ch] text-sm text-ink-3">{cost.note}</p>
              <a href="#plan" className={btnPrimary}>
                {cost.cta}
              </a>
            </div>
          </div>
        ) : null}

        {showUpcoming && questionnaire ? <QuestionnaireCallout questionnaire={questionnaire} className="mt-16" /> : null}
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
