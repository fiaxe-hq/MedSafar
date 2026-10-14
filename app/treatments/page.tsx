import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { getSpecialities, getTreatments } from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { BodyPicker, FinderSearch } from "@/components/catalog/TreatmentFinder";
import { TreatmentBrowser } from "@/components/catalog/TreatmentBrowser";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Container } from "@/components/ui/Container";
import { showUpcoming } from "@/lib/preview";
import { Note } from "@/components/ui/Section";

/** Shared page: one copy for every country. It opens on one question, do you
 *  know what it is called, and each answer has its own way in: search and
 *  browse for yes, the body for no. */

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
      slug: speciality.slug,
      name: speciality.name,
      treatments: treatments.filter((t) => t.speciality === speciality.slug),
    }))
    .filter((group) => group.treatments.length);

  const finder = treatments.map((t) => ({
    slug: t.slug,
    name: t.name,
    speciality: t.speciality,
    // The finder shows the plain sentence only, without the draft note.
    summary: t.summary.replace(/\s*Draft, to be checked by a doctor before it is published\.$/, ""),
  }));

  return (
    <PageShell current="/treatments">
      <section className="relative isolate">
        {/* A faint grid and a soft mint glow behind the opener. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(48rem_22rem_at_85%_0%,rgb(94_224_189/0.24),transparent_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-80 [background-image:linear-gradient(to_right,var(--hairline)_1px,transparent_1px),linear-gradient(to_bottom,var(--hairline)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]"
        />
        <Container className="pt-10 pb-14 sm:pt-12 sm:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="hero-rise display-2 text-balance [animation-delay:60ms]">{text.heading}</h1>
            <p className="hero-rise mx-auto mt-5 max-w-[56ch] text-lg text-pretty text-ink-2 [animation-delay:120ms]">
              {text.intro}
            </p>
            <p className="hero-rise mt-8 font-display text-xl font-semibold tracking-[-0.01em] text-balance [animation-delay:160ms] sm:text-2xl">
              First, do you know what your condition or treatment is called?
            </p>
          </div>
          <div className="hero-rise mt-8 grid gap-5 [animation-delay:220ms] lg:grid-cols-2 lg:gap-6">
            <FinderSearch treatments={finder} types={groups.map((g) => g.slug)} />
            <BodyPicker treatments={finder} />
          </div>
        </Container>
      </section>

      <TreatmentBrowser groups={groups} total={treatments.length} more={showUpcoming ? text.more : null} />

      <Container className="pb-4">
        <Note>{text.note}</Note>
      </Container>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/treatments" />
    </PageShell>
  );
}
