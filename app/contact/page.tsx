import type { Metadata } from "next";
import { catalog } from "@/content/catalog";
import { contact } from "@/content/pages";
import { PageShell } from "@/components/site/PageShell";
import { PageHead } from "@/components/catalog/PageHead";
import { Facts } from "@/components/catalog/Facts";
import { EnquiryBlock } from "@/components/sections/EnquiryBlock";
import { Mark } from "@/components/ui/Pending";
import { Note, Section, SectionHead } from "@/components/ui/Section";

/** Shared page: one copy for every country. The form comes first here, and
 *  the other ways to reach Medsafar follow it. */

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  const { details } = contact;

  return (
    <PageShell>
      <PageHead heading={contact.heading} intro={contact.intro} />

      <EnquiryBlock content={{ enquiry: catalog.enquiry }} source="/contact" />

      <Section tone="quiet">
        <SectionHead heading={details.heading} intro={details.intro} />

        <Facts
          className="mt-10 max-w-3xl"
          items={details.items.map((item) => ({
            label: item.label,
            value: (
              <span className="flex flex-wrap items-center gap-3">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("https:") ? "_blank" : undefined}
                    rel={item.href.startsWith("https:") ? "noopener" : undefined}
                    className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-ink-2">{item.value}</span>
                )}
                {item.pending ? <Mark /> : null}
              </span>
            ),
          }))}
        />

        {details.note ? <Note>{details.note}</Note> : null}
      </Section>
    </PageShell>
  );
}
