import { site } from "@/content/site";
import { CountryFlag } from "./CountryFlag";

/**
 * The visitor's country flag and the language the page is in. English only
 * for now. The switch is in place so that adding a language is a content
 * change: add an entry to site.languages.options and point it at the
 * translated route. Built with <details> so it needs no JavaScript.
 */
export function LanguageSwitch({ iso = null }: { iso?: string | null }) {
  const { label, current, options, note } = site.languages;

  return (
    <details className="relative">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-sm px-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
        <CountryFlag iso={iso} />
        <span className="sr-only">{label}: {current}</span>
        <span aria-hidden className="text-sm font-medium tracking-[0.04em]">
          {options[0]?.code.toUpperCase()}
        </span>
        <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 fill-current" aria-hidden>
          <path d="M0 0h10L5 6z" />
        </svg>
      </summary>
      <div className="absolute end-0 z-50 mt-2 w-56 rounded-md border border-hairline bg-surface p-2 shadow-lift">
        <ul>
          {options.map((o) => (
            <li key={o.code}>
              <span
                aria-current="true"
                className="flex min-h-11 items-center gap-2.5 rounded-sm bg-surface-2 px-3 text-base font-medium text-ink"
              >
                <CountryFlag iso={iso} />
                {o.label}
              </span>
            </li>
          ))}
        </ul>
        <p className="px-3 py-2 text-sm text-ink-3">{note}</p>
      </div>
    </details>
  );
}
