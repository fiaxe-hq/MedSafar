"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { fill } from "@/content/ui";
import { field } from "@/components/ui/styles";

/**
 * A hospital's treatments with a search box above them. Every card is drawn
 * on the server and stays in the page; the search only hides the ones that do
 * not match, so typing stays quick on a slow phone.
 */
export function TreatmentSearchList({
  items,
  cards,
  text,
  grid,
}: {
  /** `search` is the card's words, lower case. */
  items: { slug: string; search: string }[];
  cards: Record<string, React.ReactNode>;
  text: { label: string; placeholder: string; count: string; none: string };
  grid: string;
}) {
  const [q, setQ] = useState("");
  const deferred = useDeferredValue(q);
  const words = useMemo(
    () =>
      deferred
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 1),
    [deferred],
  );
  const shown = useMemo(
    () => new Set(items.filter((i) => words.every((w) => i.search.includes(w))).map((i) => i.slug)),
    [items, words],
  );

  return (
    <>
      <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-md">
          <span className="sr-only">{text.label}</span>
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
        <p aria-live="polite" className="text-sm text-ink-3">
          {words.length ? fill(text.count, { n: shown.size, total: items.length }) : null}
        </p>
      </div>

      {shown.size ? null : (
        <p className="mt-8 text-base text-ink-2">
          <a href="#plan" className="underline-offset-2 hover:text-accent hover:underline">
            {fill(text.none, { q: deferred.trim() })}
          </a>
        </p>
      )}

      <ul className={`mt-8 grid gap-5 ${grid}`}>
        {items.map((i) => (
          <li key={i.slug} className={shown.has(i.slug) ? "min-w-0" : "hidden"}>
            {cards[i.slug]}
          </li>
        ))}
      </ul>
    </>
  );
}
