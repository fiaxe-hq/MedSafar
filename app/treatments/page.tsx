import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { getSpecialities, getTreatments } from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { TreatmentCard } from "@/components/catalog/TreatmentCard";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Note, Section } from "@/components/ui/Section";

/** Shared page: one copy for every country. Treatments sit under their
 *  speciality, and each group can be linked to by its speciality slug. */

export const metadata: Metadata = {
  title: catalog.treatments.meta.title,
  description: catalog.treatments.meta.description,
  alternates: { canonical: "/treatments" },
};

export default async function Page() {
  const text = catalog.treatments;
  const [treatments, specialities] = await Promise.all([getTreatments(), getSpecialities()]);

  const groups = specialities
    .map((speciality) => ({
      speciality,
      treatments: treatments.filter((t) => t.speciality === speciality.slug),
    }))
    .filter((group) => group.treatments.length);

  return (
    <PageShell current="/treatments">
      <PageHead label={text.eyebrow} heading={text.heading} intro={text.intro} />

      <Section tone="quiet">
        <div className="space-y-14 lg:space-y-16">
          {groups.map(({ speciality, treatments }) => (
            <div key={speciality.slug} id={speciality.slug} className="scroll-mt-28">
              <h2 className="reveal text-2xl font-semibold tracking-[-0.02em]">
                {speciality.name}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {treatments.map((treatment) => (
                  <TreatmentCard key={treatment.slug} treatment={treatment} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <Note>{text.note}</Note>
      </Section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/treatments" />
    </PageShell>
  );
}
