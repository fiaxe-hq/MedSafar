"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "@/components/ui/Link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { Container } from "@/components/ui/Container";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { field } from "@/components/ui/styles";

export type ListItem = {
  slug: string;
  /** Everything a visitor might type to find it: name, place, specialities,
   *  treatments. Matched word by word. */
  search: string;
  specialities: string[];
  /** The value of the place filter: a city, or a hospital slug. */
  place: string;
};

export type ListText = {
  search: string;
  placeholder: string;
  allSpecialities: string;
  specialities: string;
  place: string;
  all: string;
  clear: string;
  empty: string;
  result: string;
  results: string;
};

/**
 * Hospitals or doctors, laid out like the treatment browser: specialities on
 * the left (a row of chips on a phone), and above the cards a search box and
 * the place filter. Everything filters at once, in the page; the choices are
 * kept in the address so a link or a reload opens the same view.
 */
export function ListBrowser({
  items,
  cards,
  specialities,
  places,
  plainSpeciality,
  initial,
  placeParam,
  path,
  more,
  text,
  grid,
}: {
  items: ListItem[];
  /** The card for each item, by slug, drawn on the server. */
  cards: Record<string, React.ReactNode>;
  specialities: { slug: string; name: string }[];
  places: { value: string; label: string }[];
  plainSpeciality: Record<string, string>;
  initial: { speciality: string; place: string };
  /** Address field for the place filter: "city" or "hospital". */
  placeParam: string;
  /** The page's own address, for the history entry. */
  path: string;
  /** Label for the link to the chosen speciality's page, or null to leave it out. */
  more: string | null;
  text: ListText;
  /** Grid classes for the cards. */
  grid: string;
}) {
  const [speciality, setSpeciality] = useState(initial.speciality);
  const [place, setPlace] = useState(initial.place);
  const [q, setQ] = useState("");
  const top = useRef<HTMLDivElement>(null);

  const words = useMemo(
    () =>
      q
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 1),
    [q],
  );
  const matches = (item: ListItem) => words.every((w) => item.search.includes(w));
  const inPlace = (item: ListItem) => !place || item.place === place;

  // Counts beside each speciality follow the place and the search.
  const pool = items.filter((i) => inPlace(i) && matches(i));
  const shown = pool.filter((i) => !speciality || i.specialities.includes(speciality));
  const picked = specialities.find((s) => s.slug === speciality);

  useEffect(() => {
    const params = new URLSearchParams();
    if (speciality) params.set("speciality", speciality);
    if (place) params.set(placeParam, place);
    const query = params.toString();
    window.history.replaceState(window.history.state, "", query ? `${path}?${query}` : path);
  }, [speciality, place, placeParam, path]);

  const pick = (slug: string) => {
    setSpeciality(slug);
    // On a phone the chips sit above the cards: bring the cards into view.
    if (window.matchMedia("(max-width: 1023px)").matches)
      requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const clear = () => {
    setSpeciality("");
    setPlace("");
    setQ("");
  };

  const chip =
    "inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm leading-snug whitespace-nowrap transition-[color,border-color,background-color] duration-300 ease-(--ease-soft)";

  return (
    <section className="bg-surface-2 pt-8 pb-16 sm:pt-10 sm:pb-20">
      <Container>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:gap-10">
          <nav
            aria-label={text.specialities}
            className="sticky top-16 z-20 -mx-5 min-w-0 border-y border-hairline bg-surface-2/90 backdrop-blur-md sm:-mx-8 lg:top-24 lg:col-span-4 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:backdrop-blur-none xl:col-span-3"
          >
            <p className="hidden px-4 pb-2 text-sm font-medium text-ink-3 lg:block">{text.specialities}</p>
            <ul className="flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:px-8 lg:flex-col lg:gap-1 lg:overflow-visible lg:p-0">
              {[{ slug: "", name: text.allSpecialities }, ...specialities].map((s) => {
                const active = s.slug === speciality;
                const n = s.slug ? pool.filter((i) => i.specialities.includes(s.slug)).length : pool.length;
                return (
                  <li key={s.slug || "all"} className="shrink-0">
                    <button
                      onClick={() => pick(s.slug)}
                      aria-pressed={active}
                      className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-full border px-4 text-start text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,opacity] duration-300 ease-(--ease-soft) lg:rounded-lg lg:py-2.5 lg:whitespace-normal ${
                        active
                          ? "border-deep bg-deep text-white"
                          : "border-hairline bg-surface text-ink-2 hover:border-line hover:bg-accent-quiet hover:text-ink lg:border-transparent lg:bg-transparent"
                      } ${!active && !n ? "opacity-50" : ""}`}
                    >
                      <SpecialityIcon
                        slug={s.slug || "all"}
                        size={18}
                        className={active ? "text-glow" : "text-accent"}
                        aria-hidden
                      />
                      <span className="flex-1">{s.slug ? (plainSpeciality[s.slug] ?? s.name) : s.name}</span>
                      <span
                        className={`hidden rounded-full px-2 py-0.5 text-xs tabular-nums lg:inline ${
                          active ? "bg-white/15 text-white" : "bg-surface-2 text-ink-3"
                        }`}
                      >
                        {n}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div ref={top} className="min-w-0 scroll-mt-32 lg:col-span-8 xl:col-span-9">
            <div className="rounded-[1.5rem] bg-surface p-4 ring-1 ring-hairline sm:p-5">
              <label className="relative block">
                <span className="sr-only">{text.search}</span>
                <MagnifyingGlassIcon
                  size={20}
                  className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-3"
                  aria-hidden
                />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={text.placeholder}
                  className={`${field} ps-12`}
                />
              </label>
              {places.length > 1 ? (
                <div className="mt-4 flex min-w-0 items-center gap-3">
                  <span className="shrink-0 text-sm font-medium text-ink-3">{text.place}</span>
                  <ul className="-me-4 flex min-w-0 gap-2 overflow-x-auto pe-4 [scrollbar-width:none] sm:-me-5 sm:flex-wrap sm:overflow-visible sm:pe-5">
                    {[{ value: "", label: text.all }, ...places].map((o) => {
                      const on = o.value === place;
                      return (
                        <li key={o.value || "all"} className="shrink-0">
                          <button
                            onClick={() => setPlace(o.value)}
                            aria-pressed={on}
                            className={`${chip} ${
                              on
                                ? "border-deep bg-deep font-medium text-white"
                                : "border-hairline bg-surface text-ink-2 hover:border-line hover:bg-accent-quiet hover:text-ink"
                            }`}
                          >
                            {on ? <CheckIcon size={14} weight="bold" className="text-glow" aria-hidden /> : null}
                            {o.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <p role="status" className="text-sm text-ink-3">
                {shown.length} {shown.length === 1 ? text.result : text.results}
                {picked ? ` · ${plainSpeciality[picked.slug] ?? picked.name}` : ""}
              </p>
              <div className="flex flex-wrap items-center gap-x-5">
                {picked && more ? (
                  <Link
                    href={`/specialities/${picked.slug}`}
                    className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    {more} {picked.name.toLowerCase()}
                    <ArrowRightIcon
                      size={14}
                      className="transition-[translate] duration-300 group-hover:translate-x-1 rtl:rotate-180"
                      aria-hidden
                    />
                  </Link>
                ) : null}
                {speciality || place || words.length ? (
                  <button
                    onClick={clear}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    <XIcon size={14} weight="bold" aria-hidden />
                    {text.clear}
                  </button>
                ) : null}
              </div>
            </div>

            {shown.length ? (
              <ul className={`mt-4 grid gap-5 ${grid}`}>
                {shown.map((i) => (
                  <li key={i.slug} className="finder-in min-w-0">
                    {cards[i.slug]}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 flex flex-col items-start gap-5 rounded-lg border border-hairline bg-surface p-6 sm:p-7">
                <p className="max-w-[52ch] text-base text-ink-2">{text.empty}</p>
                <button
                  onClick={clear}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:bg-accent-quiet"
                >
                  {text.clear}
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
