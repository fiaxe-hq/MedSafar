import type { CountryContent } from "@/content/types";
import { getHospitalsBySlugs, getSpecialities, nameOf } from "@/lib/catalog";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { Note, Section, SectionHead } from "@/components/ui/Section";

/** Asymmetric grid: one feature tile, two supporting tiles. Three cells for
 *  three hospitals, so the grid never shows an empty cell. Each tile links to
 *  the hospital's own page. */
export async function Hospitals({ content }: { content: CountryContent }) {
  const { hospitals } = content;
  const [cards, specialities] = await Promise.all([
    getHospitalsBySlugs(hospitals.featured),
    getSpecialities(),
  ]);
  const [feature, ...rest] = cards;
  const names = (slugs: string[]) => slugs.map((s) => nameOf(specialities, s)).join(", ");

  return (
    <Section id="hospitals" tone="quiet">
      <SectionHead heading={hospitals.heading} intro={hospitals.intro} />

      {feature ? (
        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <HospitalCard
              hospital={feature}
              specialities={names(feature.specialities)}
              feature
              sizes="(min-width: 1024px) 56vw, 100vw"
            />
          </div>
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((hospital) => (
              <HospitalCard
                key={hospital.slug}
                hospital={hospital}
                specialities={names(hospital.specialities)}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            ))}
          </div>
        </div>
      ) : null}

      <Note>{hospitals.note}</Note>
    </Section>
  );
}
