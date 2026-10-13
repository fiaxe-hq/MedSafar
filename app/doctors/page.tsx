import type { Metadata } from "next";
import Link from "next/link";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { catalog } from "@/content/catalog";
import { getDoctors, getHospitals, getSpecialities, nameOf } from "@/lib/catalog";
import { first } from "@/lib/query";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";
import { PageHead } from "@/components/catalog/PageHead";
import { DoctorTile } from "@/components/catalog/DoctorTile";
import { ShowCurrent } from "@/components/catalog/ShowCurrent";
import { NoResults, ResultCount } from "@/components/catalog/Filters";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note } from "@/components/ui/Section";

/** Shared page: one copy for every country. */

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export const metadata: Metadata = {
  title: catalog.doctors.meta.title,
  description: catalog.doctors.meta.description,
};

/** The list address with the given filters, leaving out empty ones. */
function href(filter: { speciality?: string; hospital?: string }) {
  const params = new URLSearchParams(
    Object.entries(filter).filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
  const query = params.toString();
  return query ? `/doctors?${query}` : "/doctors";
}

export default async function Page({ searchParams }: Props) {
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

  // A pill in a swipeable row on a phone, a full-width row in the sidebar on
  // a laptop. Long names stay on one line on a phone and wrap in the sidebar.
  const option =
    "flex min-h-11 shrink-0 snap-start items-center justify-between gap-3 rounded-full px-4 text-base whitespace-nowrap transition-[background-color,color] duration-300 ease-(--ease-soft) lg:w-full lg:rounded-xl lg:px-3.5 lg:py-2.5 lg:text-start lg:whitespace-normal";
  const optionOff = `${option} bg-surface text-ink-2 ring-1 ring-hairline hover:bg-accent-quiet hover:text-ink lg:bg-transparent lg:ring-0`;
  const optionOn = `${option} bg-deep font-medium text-white`;

  return (
    <PageShell current="/doctors">
      <PageHead heading={text.heading} intro={text.intro} stats={stats} />

      <section className="bg-surface-2 py-12 sm:py-16 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-12">
          {groups.length ? (
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <nav
                id="doctor-filters"
                aria-label={catalog.filters.heading}
                className="space-y-6 lg:rounded-[1.5rem] lg:bg-surface lg:p-3 lg:ring-1 lg:ring-hairline"
              >
                {groups.map((g) => (
                  <div key={g.name}>
                    <h2 className="px-1 text-sm font-medium text-ink-3 lg:px-3.5 lg:pt-2">{g.label}</h2>
                    <ul className="-mx-5 mt-3 flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:mt-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:p-0">
                      {[{ value: "", label: catalog.filters.all, count: everyone.length }, ...g.options].map((o) => {
                        const on = o.value === g.value;
                        return (
                          <li key={o.value || "all"} className="shrink-0">
                            <Link
                              href={href({ speciality, hospital, [g.name]: o.value })}
                              scroll={false}
                              aria-current={on ? "true" : undefined}
                              className={on ? optionOn : optionOff}
                            >
                              {o.label}
                              <span className={`text-sm tabular-nums ${on ? "text-glow" : "text-ink-3"}`}>
                                {o.count}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

                {speciality || hospital ? (
                  <Link
                    href="/doctors"
                    scroll={false}
                    className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover lg:border-t lg:border-hairline lg:px-3.5 lg:pt-1"
                  >
                    <XIcon size={14} weight="bold" aria-hidden />
                    {catalog.filters.clear}
                  </Link>
                ) : null}
              </nav>
              <ShowCurrent id="doctor-filters" />
            </aside>
          ) : null}

          <div className={`min-w-0 ${groups.length ? "" : "lg:col-span-2"}`}>
            <ResultCount count={doctors.length} />

            {doctors.length ? (
              <ul className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
          </div>
        </Container>
      </section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/doctors" />
    </PageShell>
  );
}
