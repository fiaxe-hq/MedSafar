import type { CountryContent } from "@/content/types";
import { Section, SectionHead } from "@/components/ui/Section";

/** Editorial list. Each step is a full row, not a card in a row of four. */
export function HowItWorks({ content }: { content: CountryContent }) {
  const { howItWorks } = content;

  return (
    <Section id="how-it-works">
      <SectionHead heading={howItWorks.heading} intro={howItWorks.intro} />

      <ol className="mt-12 border-t border-hairline lg:mt-14">
        {howItWorks.steps.map((step, i) => (
          <li
            key={step.title}
            className="reveal grid gap-4 border-b border-hairline py-8 lg:grid-cols-12 lg:items-start lg:gap-10 lg:py-10"
          >
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-full bg-accent-soft text-sm font-medium tabular-nums text-accent lg:col-span-1"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] lg:col-span-4">
              {step.title}
            </h3>
            <p className="max-w-[58ch] text-lg text-ink-2 lg:col-span-7">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
