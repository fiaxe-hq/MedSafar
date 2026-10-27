import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/Link";
import { specialityPhoto } from "@/data/treatmentPhotos";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { getDoctors, getSpecialities, getTreatments } from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Container } from "@/components/ui/Container";
import { Note } from "@/components/ui/Section";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

/** Shared page: one copy for every country. Each speciality links to its own
 *  page with its treatments, doctors and hospitals. */

export async function generateMetadata(): Promise<Metadata> {
  const { catalog } = await getText();
  const lang = await getLang();
  return {
    title: catalog.specialities.meta.title,
    description: catalog.specialities.meta.description,
    alternates: languageAlternates("/specialities", lang.code),
  };
}

export default async function Page() {
  const { catalog } = await getText();
  const text = catalog.specialities;
  const [specialities, treatments, doctors] = await Promise.all([
    getSpecialities(),
    getTreatments(),
    getDoctors(),
  ]);
  const count = (slug: string) =>
    treatments.filter((t) => t.speciality === slug).length;

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
              const photo = specialityPhoto(speciality.slug);
              return (
                <li key={speciality.slug} className="min-w-0">
                  <Link
                    href={`/specialities/${speciality.slug}`}
                    className="group reveal flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface lift"
                  >
                    <span className="relative block aspect-[16/9] overflow-hidden bg-surface-2">
                      {photo?.src ? (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.04]"
                        />
                      ) : null}
                      <span className="absolute start-4 bottom-4 grid size-11 place-items-center rounded-md bg-accent text-accent-ink">
                        <SpecialityIcon
                          slug={speciality.slug}
                          size={22}
                          weight="light"
                          aria-hidden
                        />
                      </span>
                    </span>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-xl font-semibold tracking-[-0.02em] text-balance transition-colors group-hover:text-accent">
                        {speciality.name}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-base text-ink-2">
                        {speciality.summary}
                      </p>
                      <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
                        <span className="text-ink-3">
                          {n}{" "}
                          {n === 1
                            ? catalog.treatments.one
                            : catalog.treatments.many}
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
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Note>{text.note}</Note>
        </Container>
      </section>

      <EnquiryBlock
        content={{ enquiry: catalog.enquiry }}
        source="/specialities"
      />
    </PageShell>
  );
}
