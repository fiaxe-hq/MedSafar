import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { showUpcoming } from "@/lib/preview";
import { getDoctors, getHospitalCities, getHospitals, getSpecialities, getTreatments, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { Filters, NoResults, ResultCount } from "@/components/catalog/Filters";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

/** Shared page: one copy for every country. */

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export async function generateMetadata(): Promise<Metadata> {
  const { catalog } = await getText();
  const lang = await getLang();
  return {
    title: catalog.hospitals.meta.title,
    alternates: languageAlternates("/hospitals", lang.code),
    description: catalog.hospitals.meta.description,
  };
}

export default async function Page({ searchParams }: Props) {
  const { catalog } = await getText();
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
  const offered = specialities.filter((s) => covered.has(s.slug));
  const picked = specialities.find((s) => s.slug === speciality);
  const inCity = city ? everyone.filter((h) => h.city === city) : everyone;
  const tileHref = (slug: string) => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (slug) params.set("speciality", slug);
    const query = params.toString();
    return query ? `/hospitals?${query}` : "/hospitals";
  };

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
        {/* Speciality first: most visitors know what they need treated, not
            which hospital they want. */}
        {showUpcoming ? (
          <nav aria-label={text.browse.heading} className="reveal">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">{text.browse.heading}</h2>
            <p className="mt-1.5 text-base text-ink-2">{text.browse.intro}</p>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {[{ slug: "", name: text.browse.all }, ...offered].map((s) => {
                const on = s.slug === speciality;
                const n = s.slug ? inCity.filter((h) => h.specialities.includes(s.slug)).length : inCity.length;
                return (
                  <li key={s.slug || "all"} className="min-w-0">
                    <Link
                      href={tileHref(s.slug)}
                      scroll={false}
                      aria-current={on ? "true" : undefined}
                      className={`flex h-full min-h-13 items-start gap-3 rounded-md border p-3.5 transition-[background-color,border-color,color,translate] duration-300 ease-(--ease-soft) ${
                        on
                          ? "border-deep bg-deep text-white"
                          : "border-hairline bg-surface text-ink hover:-translate-y-0.5 hover:border-line hover:bg-accent-quiet"
                      }`}
                    >
                      <SpecialityIcon
                        slug={s.slug || "all"}
                        size={20}
                        className={`mt-0.5 shrink-0 ${on ? "text-glow" : "text-accent"}`}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span className="block text-sm leading-snug font-medium">{s.name}</span>
                        <span className={`mt-0.5 block text-xs ${on ? "text-white/70" : "text-ink-3"}`}>
                          {n} {n === 1 ? text.browse.one : text.browse.many}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <div className={showUpcoming ? "mt-6" : ""}>
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
              // Chosen with the tiles above. Kept here, with no options to
              // show, so a change of city keeps the speciality.
              name: "speciality",
              label: text.filters.speciality,
              value: speciality,
              options: showUpcoming ? [] : specialities.map((s) => ({ value: s.slug, label: s.name })),
            },
          ]}
        />
        </div>

        {showUpcoming && picked ? (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="display-2 text-[clamp(1.5rem,1.2rem+1vw,2rem)]">
              {text.browse.showing} {picked.name.toLowerCase()}
            </h2>
            <Link
              href={`/specialities/${picked.slug}`}
              className="group inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {text.browse.more} {picked.name.toLowerCase()}
              <ArrowRightIcon size={16} className="transition-[translate] duration-300 group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        ) : null}

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
