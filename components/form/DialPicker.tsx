"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { DialCode } from "@/content/types";

const noop = () => () => {};

/** A country's flag, from the SVGs copied into public/flags. */
function Flag({ iso }: { iso: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/flags/${iso}.svg`}
      alt=""
      width={21}
      height={14}
      loading="lazy"
      className="h-3.5 w-[1.3125rem] shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgb(0_0_0/0.08)]"
    />
  );
}

/**
 * The country code half of the phone field. Starts empty ("+00") so nobody is
 * assigned a country they are not in. Before the JavaScript arrives it is a
 * plain <select>, so the form still works; after, a list with flags.
 */
export function DialPicker({
  id,
  label,
  dialCodes,
  value,
  onChange,
}: {
  id: string;
  label: string;
  dialCodes: DialCode[];
  value: string;
  onChange: (iso: string) => void;
}) {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const listId = useId();
  const current = dialCodes.find((c) => c.iso === value);

  useEffect(() => {
    if (!open) return;
    search.current?.focus();
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !root.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const caret = (
    <svg viewBox="0 0 10 6" aria-hidden className="h-1.5 w-2.5 shrink-0 fill-ink-3">
      <path d="M0 0h10L5 6z" />
    </svg>
  );

  if (!hydrated) {
    return (
      <div className="relative shrink-0">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <select
          id={id}
          name="iso"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-full w-[7.5rem] cursor-pointer appearance-none rounded-s-md bg-transparent ps-4 pe-8 text-base font-medium text-ink focus:outline-none"
        >
          <option value="">+00</option>
          {dialCodes.map((c) => (
            <option key={c.iso} value={c.iso}>
              {c.dial} {c.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2">{caret}</span>
      </div>
    );
  }

  const q = query.trim().toLowerCase();
  const shown = q
    ? dialCodes.filter((c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.iso.toLowerCase() === q)
    : dialCodes;

  const pick = (iso: string) => {
    onChange(iso);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={root} className="relative shrink-0">
      <input type="hidden" name="iso" value={value} />
      <button
        id={id}
        type="button"
        aria-label={`${label}: ${current ? `${current.name} ${current.dial}` : "+00"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex h-full cursor-pointer items-center gap-2 rounded-s-md ps-4 pe-3 text-base font-medium text-ink focus:outline-none"
      >
        {current ? <Flag iso={current.iso} /> : null}
        <span className={current ? "" : "text-ink-3"}>{current?.dial ?? "+00"}</span>
        {caret}
      </button>

      {open ? (
        <div className="absolute start-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-3rem)] rounded-xl bg-surface p-2 shadow-lift ring-1 ring-hairline">
          <input
            ref={search}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (shown[0]) pick(shown[0].iso);
              }
            }}
            placeholder="Search country"
            aria-label="Search country"
            className="mb-1 h-10 w-full rounded-lg bg-surface-2 px-3 text-[0.9375rem] text-ink placeholder:text-ink-3 focus:outline-none"
          />
          <ul id={listId} role="listbox" aria-label={label} className="max-h-64 overflow-y-auto overscroll-contain">
            {shown.map((c) => (
              <li key={c.iso} role="option" aria-selected={c.iso === value}>
                <button
                  type="button"
                  onClick={() => pick(c.iso)}
                  className={`flex min-h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-start text-[0.9375rem] transition-colors hover:bg-surface-2 ${
                    c.iso === value ? "bg-surface-2 font-medium text-ink" : "text-ink-2"
                  }`}
                >
                  <Flag iso={c.iso} />
                  <span className="min-w-0 flex-1 truncate">{c.name}</span>
                  <span className="text-[0.8125rem] text-ink-3 tabular-nums">{c.dial}</span>
                </button>
              </li>
            ))}
            {shown.length === 0 ? <li className="px-3 py-2 text-sm text-ink-3">No match</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
