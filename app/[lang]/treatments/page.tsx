import type { Metadata } from "next";
import { getSpecialities, getTreatments } from "@/lib/catalog";
import { PageShell } from "@/components/site/PageShell";
import { BodyPicker, FinderSearch } from "@/components/catalog/TreatmentFinder";
import { TreatmentBrowser } from "@/components/catalog/TreatmentBrowser";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Container } from "@/components/ui/Container";
import { showUpcoming } from "@/lib/preview";
import { Note } from "@/components/ui/Section";
import { getLang, getText } from "@/lib/i18n/text";
import { finderWords } from "@/lib/i18n/source";
import { languageAlternates } from "@/lib/i18n/alternates";

/** Shared page: one copy for every country. It opens on one question, do you
 *  know what it is called, and each answer has its own way in: search and
 *  browse for yes, the body for no. */

export async function generateMetadata(): Promise<Metadata> {
  const { catalog } = await getText();
  const lang = await getLang();
  return {
    title: catalog.treatments.meta.title,
    description: catalog.treatments.meta.description,
    alternates: languageAlternates("/treatments", lang.code),
  };
}

export default async function Page() {
  const all = await getText();
  const { catalog, ui } = all;
  const text = catalog.treatments;
  const words = finderWords(all);
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
    summary: t.summary,
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
              {ui.finder.question}
            </p>
          </div>
          <div className="hero-rise mt-8 grid grid-cols-[minmax(0,1fr)] gap-5 [animation-delay:220ms] lg:grid-cols-2 lg:gap-6">
            <FinderSearch treatments={finder} types={groups.map((g) => g.slug)} words={words} />
            <BodyPicker treatments={finder} words={words} />
          </div>
        </Container>
      </section>

      <TreatmentBrowser
        groups={groups}
        total={treatments.length}
        more={showUpcoming ? text.more : null}
        text={ui.browser}
        plainSpeciality={all.plainSpeciality}
        back={ui.finder.backToBody}
      />

      <Container className="pb-4">
        <Note>{text.note}</Note>
      </Container>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/treatments" />
    </PageShell>
  );
}
