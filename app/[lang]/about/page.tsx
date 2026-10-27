import type { Metadata } from "next";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { getHospitals, getSpecialities, getTreatments } from "@/lib/catalog";
import { whatsappHref } from "@/lib/contact";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { CheckList } from "@/components/catalog/CheckList";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Figure, Mark } from "@/components/ui/Pending";
import { Note, Section, SectionHead } from "@/components/ui/Section";
import { btnPrimary, eyebrow } from "@/components/ui/styles";
import { getLang, getText } from "@/lib/i18n/text";
import { languageAlternates } from "@/lib/i18n/alternates";

/** Shared page: one copy for every country. */

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getText();
  const lang = await getLang();
  return {
    title: about.meta.title,
    description: about.meta.description,
    alternates: languageAlternates("/about", lang.code),
  };
}

export default async function Page() {
  const { catalog, about } = await getText();
  const [hospitals, treatments, specialities] = await Promise.all([
    getHospitals(),
    getTreatments(),
    getSpecialities(),
  ]);
  const stats = [
    { value: hospitals.filter((h) => !h.pending).length, label: about.stats.hospitals },
    { value: treatments.length, label: about.stats.treatments },
    { value: specialities.length, label: about.stats.specialities },
  ];
  const { founder } = about;

  return (
    <PageShell current="/about">
      <PageHead heading={about.heading} intro={about.intro} pending={about.pending} stats={stats} cta />

      <Section tone="quiet">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal min-w-0 lg:col-span-7">
            <h2 className="display-2">{about.who.heading}</h2>
            <div className="mt-5 space-y-5">
              {about.who.body.map((paragraph, i) => (
                <p key={i} className="max-w-[60ch] text-lg text-ink-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="reveal min-w-0 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <h2 className="text-2xl font-medium tracking-[-0.02em]">{about.glance.heading}</h2>
            <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
              {about.glance.items.map((item) => (
                <div key={item.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <dt className="text-base text-ink-3">{item.label}</dt>
                  <dd className="flex items-center gap-3 text-base font-medium text-ink">
                    {item.value}
                    {item.pending ? <Mark /> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section id="founder">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* On a laptop the photo stays in view while the story scrolls past
              it, then both move on together. It is capped to the screen's
              height so the story has room to scroll past it. */}
          <div className="reveal min-w-0 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            {/* The photo's own shape, so nothing of it is cut off. */}
            <Figure
              picture={founder.picture}
              ratio="aspect-[914/1460]"
              className="lg:max-w-[calc(62svh*914/1460)]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="min-w-0 lg:col-span-7">
            <div className="reveal">
              <p className={eyebrow}>{founder.eyebrow}</p>
              <h2 className="display-2 mt-4">{founder.name}</h2>
              <p className="mt-2 text-lg text-ink-2">{founder.role}</p>
            </div>

            <blockquote className="reveal mt-8 border-s-2 border-brand ps-6">
              <p className="font-display text-2xl leading-snug font-medium tracking-[-0.02em] text-ink">
                “{founder.quote.text}”
              </p>
              {founder.quote.pending ? <Mark className="mt-4" /> : null}
            </blockquote>

            <div className="reveal mt-10">
              <h3 className="text-2xl font-medium tracking-[-0.02em]">{founder.story.heading}</h3>
              <div className="mt-5 space-y-5">
                {founder.story.body.map((paragraph, i) => (
                  <p key={i} className="max-w-[60ch] text-lg text-ink-2">
                    {paragraph}
                  </p>
                ))}
              </div>
              {founder.story.pending ? <Mark className="mt-5" /> : null}
            </div>

            <div className="reveal mt-10 rounded-lg border border-hairline bg-surface-2 p-6 sm:p-7">
              <p className="max-w-[56ch] text-base text-ink-2">{founder.contact.body}</p>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-5`}>
                <WhatsappLogoIcon size={20} aria-hidden />
                {founder.contact.label}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="quiet">
        <SectionHead heading={about.mission.heading} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {about.mission.items.map((item) => (
            <div key={item.title} className="reveal rounded-lg border border-hairline bg-surface p-6 sm:p-7">
              <h3 className="text-xl font-medium tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-3 text-base text-ink-2">{item.body}</p>
            </div>
          ))}
        </div>
        {about.mission.pending ? <Mark className="mt-6" /> : null}
      </Section>

      <Section>
        <SectionHead heading={about.values.heading} intro={about.values.intro} />
        <ol className="mt-10 grid gap-8 lg:grid-cols-3">
          {about.values.items.map((item, i) => (
            <li key={item.title} className="reveal border-t border-hairline pt-6">
              <p className="text-sm font-medium text-accent tabular-nums">0{i + 1}</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-3 max-w-[40ch] text-base text-ink-2">{item.body}</p>
            </li>
          ))}
        </ol>
        {about.values.pending ? <Mark className="mt-6" /> : null}
      </Section>

      <Section tone="quiet">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h2 className="reveal text-2xl font-medium tracking-[-0.02em]">{about.does.heading}</h2>
            <CheckList items={about.does.items} className="mt-6" />
          </div>
          <div className="min-w-0">
            <h2 className="reveal text-2xl font-medium tracking-[-0.02em]">{about.doesNot.heading}</h2>
            <CheckList items={about.doesNot.items} tone="no" className="mt-6" />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead heading={about.selection.heading} intro={about.selection.body} />
        {about.selection.pending ? <Mark className="mt-6" /> : null}
      </Section>

      <Section tone="quiet">
        <SectionHead heading={about.legal.heading} />
        <p className="mt-5 max-w-[60ch] text-lg text-ink">{about.legal.name}</p>
        <p className="mt-3 max-w-[60ch] text-base text-ink-2">{about.legal.body}</p>
        {about.note ? <Note>{about.note}</Note> : null}
      </Section>

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/about" />
    </PageShell>
  );
}
