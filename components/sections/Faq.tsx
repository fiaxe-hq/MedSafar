import type { CountryContent } from "@/content/types";
import { Section } from "@/components/ui/Section";

/** Built on <details>, so it opens and closes without any JavaScript. */
export function Faq({ content }: { content: Pick<CountryContent, "faq"> }) {
  const { faq } = content;

  return (
    <Section id="faq" tone="quiet">
      <h2 className="reveal display-2 max-w-[18ch]">{faq.heading}</h2>

      <div className="mt-10 rounded-lg border border-hairline bg-surface px-5 sm:px-8 lg:mt-12">
        {faq.items.map((item, i) => (
          <details key={i} className="group border-b border-hairline last:border-b-0">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-lg font-medium tracking-[-0.01em] sm:text-xl transition-colors hover:text-accent">
              <span className="max-w-[40ch]">{item.question}</span>
              <span
                aria-hidden
                className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-ink-2 transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-accent-soft group-open:text-accent"
              >
                <svg viewBox="0 0 12 12" className="size-3 fill-current">
                  <path d="M5.25 0h1.5v5.25H12v1.5H6.75V12h-1.5V6.75H0v-1.5h5.25z" />
                </svg>
              </span>
            </summary>
            <p className="max-w-[68ch] pb-7 text-lg text-ink-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
