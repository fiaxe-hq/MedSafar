import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { notFound } from "next/navigation";
import {
  getDoctors,
  getHospital,
  getHospitals,
  getSpecialities,
  getTreatmentsBySlugs,
  nameOf,
} from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr/SealCheck";
import { TagIcon } from "@phosphor-icons/react/dist/ssr/Tag";
import { HospitalGallery } from "@/components/catalog/HospitalGallery";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { DoctorCard } from "@/components/catalog/DoctorCard";
import { TreatmentCard } from "@/components/catalog/TreatmentCard";
import { PackagePrices, QuotePrompt } from "@/components/catalog/PackagePrices";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Pending";
import { btnPrimary } from "@/components/ui/styles";
import { Section, SectionHead } from "@/components/ui/Section";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getHospitals()).map((hospital) => ({ slug: hospital.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { site } = await getText();
  const lang = await getLang();
  const { slug } = await params;
  const hospital = await getHospital(slug);
  if (!hospital) return {};
  return {
    title: `${hospital.name}. ${site.brand.name} ${site.brand.country}.`,
    alternates: languageAlternates(`/hospitals/${hospital.slug}`, lang.code),
    description: hospital.overview,
  };
}

export default async function Page({ params }: Props) {
  const { catalog, site, ui } = await getText();
  const { slug } = await params;
  const hospital = await getHospital(slug);
  if (!hospital) notFound();

  const text = catalog.hospitals;
  const [doctors, treatments, specialities] = await Promise.all([
    getDoctors({ hospital: hospital.slug }),
    getTreatmentsBySlugs(hospital.treatments),
    getSpecialities(),
  ]);

  const pictures = [hospital.picture, ...hospital.gallery];
  const lowest = hospital.packages?.length
    ? Math.min(...hospital.packages.flatMap((group) => group.items.map((item) => item.priceUsd)))
    : null;
  const counts = [
    { value: hospital.specialities.length, label: text.stats.specialities },
    { value: doctors.length, label: text.stats.doctors },
    { value: treatments.length, label: text.stats.treatments },
  ].filter((count) => count.value);

  // Bands below the main block alternate in tone, whichever ones are shown.
  let band = 0;
  const tone = () => (band++ % 2 === 0 ? "quiet" : "page");

  return (
    <PageShell current="/hospitals">
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_22rem_at_85%_0%,rgb(94_224_189/0.2),transparent_70%)]"
        />
        <Container className="pt-8 sm:pt-10">
          <Link
            href="/hospitals"
            className="group hero-rise inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-hover"
          >
            <ArrowLeftIcon size={18} className="transition-[translate] duration-300 ease-(--ease-soft) group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" aria-hidden />
            {text.back}
          </Link>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <h1 className="hero-rise display-2 max-w-[26ch] text-balance [animation-delay:60ms]">{hospital.name}</h1>
              <ul className="hero-rise mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-ink-2 [animation-delay:120ms]">
                <li className="inline-flex items-center gap-1.5">
                  <MapPinIcon size={18} className="text-accent" aria-hidden />
                  {hospital.city}
                </li>
                {hospital.accreditation ? (
                  <li className="inline-flex items-center gap-1.5">
                    <SealCheckIcon size={18} className="text-accent" aria-hidden />
                    {hospital.accreditation}
                  </li>
                ) : null}
                {hospital.pending ? (
                  <li>
                    <Mark />
                  </li>
                ) : null}
              </ul>
            </div>
            <div className="hero-rise hidden shrink-0 [animation-delay:160ms] lg:block">
              <a href="#plan" className={btnPrimary}>
                {site.cta.primary}
              </a>
            </div>
          </div>

          <div className="hero-rise mt-8 [animation-delay:200ms]">
            <HospitalGallery pictures={pictures} labels={text.detail.gallery} />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="min-w-0 lg:sticky lg:top-28 lg:order-last lg:col-span-4 lg:self-start">
            <div className="reveal rounded-lg border border-hairline bg-surface p-6 shadow-card sm:p-7">
              {counts.length ? (
                <dl className="grid grid-cols-3 divide-x divide-hairline border-b border-hairline pb-5 rtl:divide-x-reverse">
                  {counts.map((count) => (
                    <div key={count.label} className="grid min-w-0 content-start gap-1 px-3 first:ps-0 last:pe-0">
                      <dt className="row-start-2 text-sm text-ink-3">{count.label}</dt>
                      <dd className="row-start-1 font-display text-3xl leading-none font-semibold tracking-[-0.03em] text-accent tabular-nums">
                        {count.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <dl className="divide-y divide-hairline">
                {hospital.address ? (
                  <div className="relative py-4 ps-8">
                    <dt className="text-sm text-ink-3">
                      <MapPinIcon size={20} className="absolute start-0 top-[1.125rem] text-accent" aria-hidden />
                      {text.detail.address}
                    </dt>
                    <dd className="mt-0.5 text-base text-ink">{hospital.address}</dd>
                  </div>
                ) : null}
                {hospital.accreditation ? (
                  <div className="relative py-4 ps-8">
                    <dt className="text-sm text-ink-3">
                      <SealCheckIcon size={20} className="absolute start-0 top-[1.125rem] text-accent" aria-hidden />
                      {text.detail.accreditation}
                    </dt>
                    <dd className="mt-0.5 text-base text-ink">{hospital.accreditation}</dd>
                  </div>
                ) : null}
                {lowest !== null ? (
                  <div className="relative py-4 ps-8">
                    <dt className="text-sm text-ink-3">
                      <TagIcon size={20} className="absolute start-0 top-[1.125rem] text-accent" aria-hidden />
                      {text.detail.priceFrom}
                    </dt>
                    <dd className="mt-0.5 text-base text-ink">
                      <a href="#packages" className="font-semibold text-accent underline-offset-4 hover:underline">
                        {usd.format(lowest)}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>

              <a href="#plan" className={`${btnPrimary} mt-2 w-full`}>
                {site.cta.primary}
              </a>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8">
            <div className="reveal">
              <h2 className={subhead}>{text.detail.overview}</h2>
              <p className="mt-4 max-w-[68ch] text-lg text-pretty text-ink-2">{hospital.overview}</p>
            </div>

            <div className="reveal mt-12 border-t border-hairline pt-10">
              <h2 className={subhead}>{text.detail.specialities}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {hospital.specialities.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/treatments#${s}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface px-4 text-sm text-ink-2 transition-[color,border-color,background-color,translate] duration-300 ease-(--ease-soft) hover:-translate-y-0.5 hover:border-line hover:bg-accent-quiet hover:text-ink"
                    >
                      <SpecialityIcon slug={s} size={16} className="text-accent" aria-hidden />
                      {nameOf(specialities, s)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {hospital.centres?.length ? (
              <div className="reveal mt-12 border-t border-hairline pt-10">
                <h2 className={subhead}>{hospital.centresLabel ?? text.detail.centres}</h2>
                <Ticks items={hospital.centres} />
              </div>
            ) : null}

            {hospital.services.length ? (
              <div className="reveal mt-12 border-t border-hairline pt-10">
                <h2 className={subhead}>{text.detail.services}</h2>
                <Ticks items={hospital.services} />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <Section id="packages" tone={tone()}>
        {hospital.packages?.length ? (
          <>
            <SectionHead heading={text.detail.packages} />
            <div className="mt-10">
              <PackagePrices groups={hospital.packages} note={text.detail.packagesNote} stay={ui.stay} />
            </div>
          </>
        ) : (
          <QuotePrompt
            heading={text.detail.quoteHeading}
            body={text.detail.quoteBody}
            cta={text.detail.quoteCta}
          />
        )}
      </Section>

      {hospital.videos?.length ? (
        <Section tone={tone()}>
          <SectionHead heading={text.detail.videos} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hospital.videos.map((video) => (
              <VideoEmbed key={video.title} video={video} />
            ))}
          </div>
        </Section>
      ) : null}

      {doctors.length ? (
        <Section tone={tone()}>
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
        <Section tone={tone()}>
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

const subhead = "font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** A short ticked list in two columns, for centres and services. */
function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 border-b border-hairline py-3.5 text-base text-ink">
          <CheckIcon size={16} weight="bold" className="mt-1 shrink-0 text-cta" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
