import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { GlobeHemisphereEastIcon } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereEast";
import { site } from "@/content/site";
import { countries } from "@/content/countries";
import { CountryFlag } from "./CountryFlag";

/**
 * One switch for country and language together: each country page is written
 * in that country's language, so picking a country picks both. English only
 * for now; a new language arrives with its country page. Built with <details>
 * so it needs no JavaScript.
 */
export function LanguageSwitch({ iso = null }: { iso?: string | null }) {
  const { current, options, note } = site.languages;
  const code = options[0]?.code.toUpperCase();
  const places = [
    { href: "/", iso: null, name: site.languages.global },
    ...Object.entries(countries).map(([slug, c]) => ({ href: `/${slug}`, iso: c.iso, name: c.countryName ?? slug })),
  ];

  return (
    <details className="group/lang relative">
      <summary className="flex h-8 cursor-pointer list-none items-center gap-1.5 rounded-full px-2.5 text-ink-2 ring-1 ring-hairline transition-[background-color,color,box-shadow] duration-200 hover:bg-surface-2 hover:text-ink hover:ring-line group-open/lang:bg-surface-2 group-open/lang:ring-line">
        {iso ? <CountryFlag iso={iso} /> : <GlobeHemisphereEastIcon size={18} className="text-ink-3" aria-hidden />}
        <span className="sr-only">
          {site.languages.countries}: {current}
        </span>
        <span aria-hidden className="text-[0.75rem] font-medium tracking-[0.06em]">
          {code}
        </span>
        <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 fill-current transition-transform duration-200 group-open/lang:rotate-180" aria-hidden>
          <path d="M0 0h10L5 6z" />
        </svg>
      </summary>
      <div className="absolute end-0 z-50 mt-2 w-64 rounded-2xl bg-surface p-2 shadow-lift ring-1 ring-hairline">
        <p className="px-3 pt-1.5 pb-2 text-[0.8125rem] font-medium text-ink-3">{site.languages.countries}</p>
        <ul>
          {places.map((place) => {
            const here = place.iso === iso;
            return (
              <li key={place.href}>
                {/* A plain link, so the menu closes as the new page loads. */}
                <a
                  href={place.href}
                  aria-current={here ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-[0.9375rem] transition-colors hover:bg-surface-2 hover:text-ink ${
                    here ? "bg-surface-2 font-medium text-ink" : "text-ink-2"
                  }`}
                >
                  {place.iso ? (
                    <CountryFlag iso={place.iso} />
                  ) : (
                    <GlobeHemisphereEastIcon size={20} className="text-ink-3" aria-hidden />
                  )}
                  <span className="flex-1">{place.name}</span>
                  <span className="text-[0.8125rem] text-ink-3">{current}</span>
                  {here ? <CheckIcon size={14} weight="bold" className="text-accent" aria-hidden /> : null}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-1 border-t border-hairline px-3 pt-2.5 pb-1.5 text-[0.8125rem] text-ink-3">{note}</p>
      </div>
    </details>
  );
}
