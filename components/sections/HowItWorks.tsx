import type { CountryContent } from "@/content/types";
import { Section, SectionHead } from "@/components/ui/Section";

/** Four steps across one row, joined by a rule, each led by a large numeral. */
export function HowItWorks({ content }: { content: CountryContent }) {
  const { howItWorks } = content;

  return (
    <Section id="how-it-works">
      <SectionHead heading={howItWorks.heading} intro={howItWorks.intro} />

      <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
        <span
          aria-hidden
          className="absolute inset-x-8 top-7 hidden h-px bg-linear-to-r from-brand via-line to-transparent lg:block rtl:bg-linear-to-l"
        />
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className="group reveal relative flex gap-5 sm:block">
            <span
              aria-hidden
              className="relative grid size-12 shrink-0 place-items-center rounded-full sm:size-14 bg-accent font-display text-lg font-semibold text-accent-ink tabular-nums ring-8 ring-bg transition-[scale] duration-300 ease-(--ease-soft) group-hover:scale-110"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="mt-2.5 text-xl font-semibold tracking-[-0.02em] sm:mt-6">{step.title}</h3>
              <p className="mt-2 max-w-[34ch] text-base text-ink-2">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
