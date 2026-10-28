"use client";

import { usePathname } from "next/navigation";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr/Translate";
import { languageCodes, languages, localPath } from "@/lib/i18n/languages";

/**
 * The language picker in the header: the whole site, kept in the address
 * (/bn/...). Picking one opens the same page in that language.
 *
 * A <details> menu, so it opens without JavaScript. It shares a name with
 * the phone menu, so opening one closes the other, and the open one is
 * raised above its neighbour.
 */

const summary =
  "flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-full px-2.5 text-ink-2 ring-1 ring-hairline transition-[background-color,color,box-shadow] duration-200 hover:bg-surface-2 hover:text-ink hover:ring-line group-open/pick:bg-surface-2 group-open/pick:ring-line";

const panel =
  "absolute end-0 z-50 mt-2 rounded-2xl bg-surface p-2 shadow-lift ring-1 ring-hairline";

const row = (here: boolean) =>
  `flex min-h-11 items-center gap-3 rounded-lg px-3 text-[0.9375rem] transition-colors hover:bg-surface-2 hover:text-ink ${
    here ? "bg-surface-2 font-medium text-ink" : "text-ink-2"
  }`;

function Caret() {
  return (
    <svg
      viewBox="0 0 10 6"
      className="h-1.5 w-2.5 fill-current transition-transform duration-200 group-open/pick:rotate-180"
      aria-hidden
    >
      <path d="M0 0h10L5 6z" />
    </svg>
  );
}

/** The page's address with its language taken off, and the home page's inner address undone. */
function pageAddress(pathname: string): string {
  const parts = pathname.split("/");
  let rest = languageCodes.includes(parts[1])
    ? `/${parts.slice(2).join("/")}`
    : pathname;
  if (rest === "/home" || rest.startsWith("/home/")) rest = "/";
  return rest || "/";
}

export function LanguagePicker({
  lang,
  label,
}: {
  lang: string;
  label: string;
}) {
  const rest = pageAddress(usePathname() ?? "/");
  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <details name="header-menu" className="group/pick relative open:z-[60]">
      <summary className={summary}>
        <TranslateIcon size={17} className="text-ink-3" aria-hidden />
        <span className="sr-only">
          {label}: {current.name}
        </span>
        <span
          aria-hidden
          className="text-[0.75rem] font-medium tracking-[0.06em] uppercase"
        >
          {current.code.split("-")[0]}
        </span>
        <Caret />
      </summary>
      <div className={`${panel} w-[min(34rem,calc(100vw-2.5rem))]`}>
        <p className="px-3 pt-1.5 pb-2 text-[0.8125rem] font-medium text-ink-3">
          {label}
        </p>
        <ul className="grid max-h-[min(28rem,calc(100dvh-8rem))] grid-cols-1 overflow-y-auto overscroll-contain sm:grid-cols-2">
          {languages.map((l) => {
            const here = l.code === lang;
            return (
              <li key={l.code}>
                {/* A plain link, so the menu closes as the new page loads. */}
                <a
                  href={localPath(l.code, rest)}
                  hrefLang={l.code}
                  lang={l.code}
                  dir={l.dir ?? "ltr"}
                  aria-current={here ? "page" : undefined}
                  className={row(here)}
                >
                  <span className="flex-1">{l.name}</span>
                  {here ? (
                    <CheckIcon
                      size={14}
                      weight="bold"
                      className="text-accent"
                      aria-hidden
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
