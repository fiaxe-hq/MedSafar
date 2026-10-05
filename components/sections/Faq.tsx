import type { CountryContent } from "@/content/types";
import { Section } from "@/components/ui/Section";

/** Heading held to one side, questions on the other. Built on <details>, so
 *  it opens and closes without any JavaScript. */
export function Faq({ content }: { content: Pick<CountryContent, "faq"> }) {
  const { faq } = content;

  return (
    <Section id="faq" tone="quiet">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 className="reveal display-2 max-w-[14ch] lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          {faq.heading}
        </h2>

        <div className="reveal space-y-3 lg:col-span-8">
          {faq.items.map((item, i) => (
            <details
              key={i}
              className="group accordion rounded-lg bg-surface px-5 ring-1 ring-hairline transition-shadow duration-300 open:shadow-card sm:px-7"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold tracking-[-0.01em] transition-colors hover:text-accent">
                <span className="max-w-[44ch]">{item.question}</span>
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-ink-2 transition-[rotate,background-color,color] duration-300 ease-(--ease-soft) group-open:rotate-45 group-open:bg-accent group-open:text-accent-ink group-hover:bg-accent-soft group-hover:text-accent"
                >
                  <svg viewBox="0 0 12 12" className="size-3 fill-current">
                    <path d="M5.25 0h1.5v5.25H12v1.5H6.75V12h-1.5V6.75H0v-1.5h5.25z" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-[64ch] pb-6 text-base text-ink-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
