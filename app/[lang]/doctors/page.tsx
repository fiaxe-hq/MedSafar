import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { getDoctors, getHospitals, getSpecialities, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";
import { PageHead } from "@/components/catalog/PageHead";
import { DoctorTile } from "@/components/catalog/DoctorTile";
import { FilterMenu } from "@/components/catalog/FilterMenu";
import { NoResults, ResultCount } from "@/components/catalog/Filters";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note } from "@/components/ui/Section";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

/** Shared page: one copy for every country. */

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export async function generateMetadata(): Promise<Metadata> {
  const { catalog } = await getText();
  const lang = await getLang();
  return {
    title: catalog.doctors.meta.title,
    alternates: languageAlternates("/doctors", lang.code),
    description: catalog.doctors.meta.description,
  };
}

/** The list address with the given filters, leaving out empty ones. */
function href(filter: { speciality?: string; hospital?: string }) {
  const params = new URLSearchParams(
    Object.entries(filter).filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
  const query = params.toString();
  return query ? `/doctors?${query}` : "/doctors";
}

export default async function Page({ searchParams }: Props) {
  const { catalog } = await getText();
  const text = catalog.doctors;
  const query = await searchParams;
  const speciality = first(query.speciality);
  const hospital = first(query.hospital);

  const [doctors, everyone, hospitals, specialities] = await Promise.all([
    getDoctors({ speciality, hospital }),
    getDoctors(),
    getHospitals(),
    getSpecialities(),
  ]);

  // Only specialities and hospitals that have a doctor on the list, so no
  // option leads to an empty page.
  const count = (slug: string) => everyone.filter((d) => d.speciality === slug).length;
  const chips = specialities.filter((s) => count(s.slug) > 0);
  const places = hospitals.filter((h) => everyone.some((d) => d.hospital === h.slug));

  const stats = [
    { value: everyone.length, label: text.stats.doctors },
    { value: chips.length, label: text.stats.specialities },
    { value: places.length, label: text.stats.hospitals },
  ];

  const groups = [
    {
      name: "speciality" as const,
      label: text.filters.speciality,
      value: speciality,
      options: chips.map((s) => ({ value: s.slug, label: s.name, count: count(s.slug) })),
    },
    {
      name: "hospital" as const,
      label: text.filters.hospital,
      value: hospital,
      options: places.map((h) => ({
        value: h.slug,
        label: h.name,
        count: everyone.filter((d) => d.hospital === h.slug).length,
      })),
    },
    // One option filters nothing, so that group is not shown.
  ].filter((g) => g.options.length > 1);

  // One row of an open filter menu.
  const option =
    "flex min-h-11 items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[0.9375rem] transition-[background-color,color] duration-200";
  const optionOff = `${option} text-ink-2 hover:bg-surface-2 hover:text-ink`;
  const optionOn = `${option} bg-accent-quiet font-medium text-ink`;

  return (
    <PageShell current="/doctors">
      <PageHead heading={text.heading} intro={text.intro} stats={stats} />

      <section className="bg-surface-2 pb-12 sm:pb-16 lg:pb-20">
        {/* A slim filter bar that stays under the header while the doctors
            scroll, so every filter is always in reach. */}
        {groups.length ? (
          <div className="sticky top-16 z-30 border-b border-hairline bg-surface-2/90 backdrop-blur-md lg:top-[4.25rem]">
            <Container className="relative flex flex-wrap items-center gap-2 py-3 sm:gap-3">
              <span className="sr-only">{catalog.filters.heading}</span>
              {groups.map((g) => {
                const chosen = g.options.find((o) => o.value === g.value);
                return (
                  <FilterMenu
                    key={g.name}
                    name="doctor-filter"
                    label={g.label}
                    current={chosen?.label ?? catalog.filters.all}
                    active={Boolean(chosen)}
                  >
                    <ul>
                      {[{ value: "", label: catalog.filters.all, count: everyone.length }, ...g.options].map((o) => {
                        const on = o.value === g.value;
                        return (
                          <li key={o.value || "all"}>
                            <Link
                              href={href({ speciality, hospital, [g.name]: o.value })}
                              scroll={false}
                              aria-current={on ? "true" : undefined}
                              className={on ? optionOn : optionOff}
                            >
                              <span className="flex items-center gap-2">
                                {on ? <CheckIcon size={14} weight="bold" className="text-accent" aria-hidden /> : null}
                                {o.label}
                              </span>
                              <span className="text-sm text-ink-3 tabular-nums">{o.count}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </FilterMenu>
                );
              })}

              {speciality || hospital ? (
                <Link
                  href="/doctors"
                  scroll={false}
                  className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  <XIcon size={14} weight="bold" aria-hidden />
                  {catalog.filters.clear}
                </Link>
              ) : null}

              <ResultCount count={doctors.length} className="ms-auto hidden sm:block" />
            </Container>
          </div>
        ) : null}

        <Container className="pt-8 sm:pt-10">
          {/* On a phone the count sits here, keeping the filter bar to one row. */}
          <ResultCount count={doctors.length} className={`mb-5 ${groups.length ? "sm:hidden" : ""}`} />

          {doctors.length ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {doctors.map((doctor) => (
                <li key={doctor.slug} className="min-w-0">
                  <DoctorTile
                    doctor={doctor}
                    speciality={nameOf(specialities, doctor.speciality)}
                    hospital={nameOf(hospitals, doctor.hospital)}
                    view={text.view}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <NoResults action="/doctors" />
          )}

          <Note>{text.note}</Note>
        </Container>
      </section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/doctors" />
    </PageShell>
  );
}
