import type { CountryContent } from "@/content/types";
import { HandledIcon } from "@/components/ui/HandledIcon";
import { Section, SectionHead } from "@/components/ui/Section";

/**
 * Bento grid, five cells for five things we handle: 7+5 on the first row,
 * 4+4+4 on the second. No empty cell at any breakpoint.
 */
const cells = [
  "sm:col-span-2 lg:col-span-7",
  "sm:col-span-2 lg:col-span-5",
  "sm:col-span-2 lg:col-span-4",
  "sm:col-span-1 lg:col-span-4",
  "sm:col-span-1 lg:col-span-4",
];

export function WhatWeHandle({ content }: { content: CountryContent }) {
  const { handled } = content;

  return (
    <Section id="what-we-handle">
      <SectionHead heading={handled.heading} intro={handled.intro} />

      <ul className="mt-12 grid auto-rows-fr grid-flow-dense gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-12">
        {handled.items.map((item, i) => (
          <li
            key={item.title}
            className={`reveal flex flex-col rounded-lg bg-surface-2 p-7 sm:p-8 ${cells[i]}`}
          >
            <HandledIcon name={item.icon} />
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
            <p className="mt-3 max-w-[46ch] text-base text-ink-2">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
