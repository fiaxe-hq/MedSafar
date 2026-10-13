import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { about } from "@/content/pages";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { CheckList } from "@/components/catalog/CheckList";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Figure, Mark } from "@/components/ui/Pending";
import { Note, Section, SectionHead } from "@/components/ui/Section";

/** Shared page: one copy for every country. */

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <PageShell current="/about">
      <PageHead
        heading={about.heading}
        intro={about.intro}
        pending={about.pending}
        cta
      />

      <Section tone="quiet">
        <div className="reveal max-w-3xl">
          <h2 className="display-2">{about.who.heading}</h2>
          <div className="mt-5 space-y-5">
            {about.who.body.map((paragraph, i) => (
              <p key={i} className="max-w-[60ch] text-lg text-ink-2">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h2 className="reveal text-2xl font-medium tracking-[-0.02em]">
              {about.does.heading}
            </h2>
            <CheckList items={about.does.items} className="mt-6" />
          </div>
          <div className="min-w-0">
            <h2 className="reveal text-2xl font-medium tracking-[-0.02em]">
              {about.doesNot.heading}
            </h2>
            <CheckList items={about.doesNot.items} tone="no" className="mt-6" />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead heading={about.selection.heading} intro={about.selection.body} />
        {about.selection.pending ? <Mark className="mt-6" /> : null}
      </Section>

      {about.team ? (
        <Section>
          <SectionHead heading={about.team.heading} intro={about.team.intro} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.team.members.map((member, i) => (
              <li
                key={i}
                className="reveal lift flex items-start gap-5 rounded-lg border border-hairline bg-surface p-6 sm:p-7"
              >
                <Figure
                  picture={member.picture}
                  ratio="aspect-square"
                  rounded="rounded-md"
                  className="size-16 shrink-0"
                  sizes="64px"
                  compact
                />
                <div className="min-w-0">
                  <h3 className="text-xl font-medium tracking-[-0.02em]">{member.name}</h3>
                  <p className="mt-2 text-base text-ink-2">{member.role}</p>
                  {member.pending ? <Mark className="mt-5" /> : null}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

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
