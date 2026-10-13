import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { catalog } from "@/content/catalog";
import { getDoctors, getSpecialities, getTreatments } from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Container } from "@/components/ui/Container";
import { Note } from "@/components/ui/Section";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";

/** Shared page: one copy for every country. Each speciality links to its own
 *  page with its treatments, doctors and hospitals. */

export const metadata: Metadata = {
  title: catalog.specialities.meta.title,
  description: catalog.specialities.meta.description,
  alternates: { canonical: "/specialities" },
};

export default async function Page() {
  const text = catalog.specialities;
  const [specialities, treatments, doctors] = await Promise.all([
    getSpecialities(),
    getTreatments(),
    getDoctors(),
  ]);
  const count = (slug: string) => treatments.filter((t) => t.speciality === slug).length;

  return (
    <PageShell current="/treatments">
      <PageHead
        heading={text.heading}
        intro={text.intro}
        stats={[
          { value: specialities.length, label: text.stats.specialities },
          { value: treatments.length, label: text.stats.treatments },
          { value: doctors.length, label: text.stats.doctors },
        ]}
      />

      <section className="border-t border-hairline bg-surface-2 py-16 sm:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specialities.map((speciality) => {
              const n = count(speciality.slug);
              return (
                <li key={speciality.slug} className="min-w-0">
                  <Link
                    href={`/specialities/${speciality.slug}`}
                    className="group reveal flex h-full flex-col rounded-lg border border-hairline bg-surface p-6 lift sm:p-7"
                  >
                    <span className="home-pop grid size-12 place-items-center rounded-md bg-accent text-accent-ink">
                      <SpecialityIcon slug={speciality.slug} size={24} weight="light" aria-hidden />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-balance transition-colors group-hover:text-accent">
                      {speciality.name}
                    </h2>
                    <p className="mt-2 text-base text-ink-2">{speciality.summary}</p>
                    <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm">
                      <span className="text-ink-3">
                        {n} {n === 1 ? catalog.treatments.one : catalog.treatments.many}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                        {text.view}
                        <ArrowRightIcon
                          size={16}
                          className="transition-[translate] duration-300 ease-(--ease-soft) group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Note>{text.note}</Note>
        </Container>
      </section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/specialities" />
    </PageShell>
  );
}
