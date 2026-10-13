import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { getDoctors, getSpecialities, getTreatments } from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { TreatmentCard } from "@/components/catalog/TreatmentCard";
import { TreatmentFinder } from "@/components/catalog/TreatmentFinder";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Container } from "@/components/ui/Container";
import { showUpcoming } from "@/lib/preview";
import { Note } from "@/components/ui/Section";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";

/** Shared page: one copy for every country. Treatments sit under their
 *  speciality, and each group can be linked to by its speciality slug. */

export const metadata: Metadata = {
  title: catalog.treatments.meta.title,
  description: catalog.treatments.meta.description,
  alternates: { canonical: "/treatments" },
};

export default async function Page() {
  const text = catalog.treatments;
  const [treatments, specialities, doctors] = await Promise.all([
    getTreatments(),
    getSpecialities(),
    getDoctors(),
  ]);

  const groups = specialities
    .map((speciality) => ({
      speciality,
      treatments: treatments.filter((t) => t.speciality === speciality.slug),
    }))
    .filter((group) => group.treatments.length);

  return (
    <PageShell current="/treatments">
      <PageHead
        tight
        heading={text.heading}
        intro={text.intro}
        stats={[
          { value: treatments.length, label: text.stats.treatments },
          { value: groups.length, label: text.stats.specialities },
          { value: doctors.length, label: text.stats.doctors },
        ]}
      />

      <TreatmentFinder
        treatments={treatments.map((t) => ({
          slug: t.slug,
          name: t.name,
          speciality: t.speciality,
          // The finder shows the plain sentence only, without the draft note.
          summary: t.summary.replace(/\s*Draft, to be checked by a doctor before it is published\.$/, ""),
        }))}
      />

      {/* Jump links, kept in view under the header while the list scrolls. */}
      <div className="sticky top-16 z-30 border-y border-hairline bg-bg/85 backdrop-blur-md">
        <Container>
          <nav aria-label={text.jump}>
            <ul className="-mx-5 flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-3 lg:px-3 lg:[mask-image:linear-gradient(to_right,black_92%,transparent)]">
              {groups.map(({ speciality }) => (
                <li key={speciality.slug} className="shrink-0 snap-start">
                  <a
                    href={`#${speciality.slug}`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-hairline bg-surface px-4 text-sm whitespace-nowrap text-ink-2 transition-[background-color,border-color,color] duration-300 ease-(--ease-soft) hover:border-line hover:bg-accent-quiet hover:text-ink"
                  >
                    <SpecialityIcon slug={speciality.slug} size={16} className="text-accent" aria-hidden />
                    {speciality.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      {/* One band per speciality: its name stays in view on the left
          while its treatments pass on the right. */}
      {groups.map(({ speciality, treatments }, i) => {
        return (
          <section
            key={speciality.slug}
            id={speciality.slug}
            className={`scroll-mt-32 border-t border-hairline py-16 sm:py-20 ${i % 2 ? "bg-surface-2" : "bg-bg"}`}
          >
            <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="reveal lg:sticky lg:top-40 lg:col-span-4 lg:self-start">
                <span className="home-pop grid size-14 place-items-center rounded-md bg-accent text-accent-ink">
                  <SpecialityIcon slug={speciality.slug} size={28} weight="light" aria-hidden />
                </span>
                <h2 className="display-2 mt-5 max-w-[16ch] text-balance">{speciality.name}</h2>
                <p className="mt-3 text-base text-ink-3">
                  {treatments.length} {treatments.length === 1 ? text.one : text.many}
                </p>
                {showUpcoming ? (
                  <Link
                    href={`/specialities/${speciality.slug}`}
                    className="group mt-4 inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    {text.more}
                    <ArrowRightIcon size={16} className="transition-[translate] duration-300 group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
                  </Link>
                ) : null}
              </div>
              <ul className="grid min-w-0 gap-5 sm:grid-cols-2 lg:col-span-8">
                {treatments.map((treatment) => (
                  <li key={treatment.slug} className="min-w-0">
                    <TreatmentCard treatment={treatment} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      <Container className="pb-4">
        <Note>{text.note}</Note>
      </Container>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/treatments" />
    </PageShell>
  );
}
