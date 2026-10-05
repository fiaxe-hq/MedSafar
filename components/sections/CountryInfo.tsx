import { IdentificationCardIcon } from "@phosphor-icons/react/dist/ssr/IdentificationCard";
import { AirplaneTiltIcon } from "@phosphor-icons/react/dist/ssr/AirplaneTilt";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr/Translate";
import type { CountryContent } from "@/content/types";
import { Section, SectionHead } from "@/components/ui/Section";

/** The visa path as numbered steps in one tile; flights and language as two
 *  smaller tiles beside it. */
export function CountryInfo({ content }: { content: CountryContent }) {
  const { countryInfo } = content;
  const { visa, flights, language } = countryInfo;

  return (
    <Section id="country-info">
      <SectionHead heading={countryInfo.heading} intro={countryInfo.intro} />

      <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-12">
        <div className="reveal rounded-lg bg-surface-2 p-7 sm:p-10 lg:col-span-7 lg:row-span-2">
          <Tile icon={<IdentificationCardIcon size={22} aria-hidden />} heading={visa.heading} />
          <ol className="mt-7 space-y-4">
            {visa.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-sm font-semibold text-accent tabular-nums ring-1 ring-hairline"
                >
                  {i + 1}
                </span>
                <p className="max-w-[52ch] text-base text-ink-2">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-7 max-w-[56ch] text-sm text-ink-3">{visa.note}</p>
        </div>

        <div className="reveal lift rounded-lg border border-hairline p-7 sm:p-8 lg:col-span-5">
          <Tile icon={<AirplaneTiltIcon size={22} aria-hidden />} heading={flights.heading} />
          <p className="mt-4 max-w-[46ch] text-base text-ink-2">{flights.body}</p>
          {flights.routes.some((r) => !r.pending) ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {flights.routes
                .filter((r) => !r.pending)
                .map((route) => (
                  <li key={route.label} className="rounded-md bg-surface-2 px-3 py-1.5 text-sm text-ink-2">
                    {route.label}
                  </li>
                ))}
            </ul>
          ) : null}
        </div>

        <div className="reveal lift rounded-lg border border-hairline p-7 sm:p-8 lg:col-span-5">
          <Tile icon={<TranslateIcon size={22} aria-hidden />} heading={language.heading} />
          <p className="mt-4 max-w-[46ch] text-base text-ink-2">{language.body}</p>
        </div>
      </div>
    </Section>
  );
}

function Tile({ icon, heading }: { icon: React.ReactNode; heading: string }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="grid size-11 place-items-center rounded-md bg-accent text-accent-ink">{icon}</span>
      <h3 className="text-xl font-semibold tracking-[-0.02em]">{heading}</h3>
    </div>
  );
}
