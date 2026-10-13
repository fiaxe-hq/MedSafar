import type { CountryContent } from "@/content/types";
import { Mark } from "@/components/ui/Pending";
import { Section } from "@/components/ui/Section";

/** Split editorial: the visa path as a timeline, with the shorter practical
 *  notes held beside it. */
export function CountryInfo({ content }: { content: CountryContent }) {
  const { countryInfo } = content;

  return (
    <Section id="country-info">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <h2 className="display-2">{countryInfo.heading}</h2>
          <p className="mt-5 max-w-[42ch] text-lg text-ink-2">{countryInfo.intro}</p>

          <div className="mt-12 space-y-10">
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em]">
                {countryInfo.flights.heading}
              </h3>
              <p className="mt-3 max-w-[48ch] text-base text-ink-2">
                {countryInfo.flights.body}
              </p>
              <ul className="mt-4 space-y-2">
                {countryInfo.flights.routes.map((route, i) => (
                  <li key={i} className="flex flex-wrap items-center gap-3 text-sm text-ink-3">
                    {route.label}
                    {route.pending ? <Mark /> : null}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em]">
                {countryInfo.language.heading}
              </h3>
              <p className="mt-3 max-w-[48ch] text-base text-ink-2">
                {countryInfo.language.body}
              </p>
            </div>
          </div>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7">
          <h3 className="text-xl font-medium tracking-[-0.02em]">
            {countryInfo.visa.heading}
          </h3>

          {/* Timeline. The rule is the connector, so no decorative graphics. */}
          <ol className="mt-8 border-s border-hairline">
            {countryInfo.visa.steps.map((step, i) => (
              <li key={i} className="relative ps-8 pb-9 last:pb-0">
                <span
                  aria-hidden
                  className="absolute start-0 top-1.5 size-2.5 -translate-x-1/2 rounded-full bg-brand ring-4 ring-accent-soft rtl:translate-x-1/2"
                />
                <p className="max-w-[52ch] text-lg text-ink-2">{step}</p>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-[56ch] border-t border-hairline pt-6 text-sm text-ink-3">
            {countryInfo.visa.note}
          </p>
        </div>
      </div>
    </Section>
  );
}
