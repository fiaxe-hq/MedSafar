"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FunnelSimpleIcon } from "@phosphor-icons/react/dist/ssr/FunnelSimple";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { adminButton, adminInput, adminLabel } from "./ui";

type Option = { value: string; label: string };

export type FilterField = {
  name: string;
  label: string;
  options: Option[];
  /** Label for the empty choice. */
  any?: string;
};

const select = `${adminInput} min-h-10 cursor-pointer pe-8 text-sm`;

/**
 * Search, sort and filters for the enquiries list. Each view has its own link
 * (shareable, and the back button works). Menus apply as
 * soon as they change; the search applies on Enter or with the button.
 */
export function EnquiryFilters({
  values,
  sorts,
  quick,
  more,
  moreActive,
}: {
  values: Record<string, string>;
  sorts: Option[];
  /** Always on show next to the search. */
  quick: FilterField[];
  /** In the "More filters" panel. */
  more: FilterField[];
  /** How many of the panel's filters are set, so it opens when any are. */
  moreActive: number;
}) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const submit = () => form.current?.requestSubmit();

  // Only the filters that are set go in the link, so it stays short and readable.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    for (const [key, value] of new FormData(e.currentTarget)) {
      const v = String(value).trim();
      if (v && !(key === "sort" && v === "newest")) params.set(key, v);
    }
    const qs = params.toString();
    router.push(qs ? `/admin/enquiries?${qs}` : "/admin/enquiries");
  }

  const field = (f: FilterField) => (
    <label key={f.name} className="min-w-0">
      <span className={`${adminLabel} mb-1 text-[0.8125rem]`}>{f.label}</span>
      <select name={f.name} defaultValue={values[f.name] ?? ""} onChange={submit} className={select}>
        <option value="">{f.any ?? "Any"}</option>
        {f.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    // key: a new view (e.g. after "Clear all") resets the fields to the URL's values.
    <form
      ref={form}
      action="/admin/enquiries"
      method="get"
      onSubmit={onSubmit}
      key={JSON.stringify(values)}
      className="mt-5 sm:mt-6"
    >
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-0 flex-[1_1_16rem]">
          <span className={`${adminLabel} mb-1 text-[0.8125rem]`}>Search</span>
          <span className="relative block">
            <MagnifyingGlassIcon
              size={18}
              className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-ink-3"
              aria-hidden
            />
            <input
              type="search"
              name="q"
              defaultValue={values.q ?? ""}
              placeholder="Name, phone, email, treatment or notes"
              className={`${adminInput} min-h-10 ps-10 text-sm`}
            />
          </span>
        </label>
        {quick.map((f) => (
          <div key={f.name} className="w-[calc(33.333%-0.5rem)] sm:w-44">
            {field(f)}
          </div>
        ))}
        <label className="w-[calc(33.333%-0.5rem)] sm:w-44">
          <span className={`${adminLabel} mb-1 text-[0.8125rem]`}>Sort</span>
          <select name="sort" defaultValue={values.sort ?? "newest"} onChange={submit} className={select}>
            {sorts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        {/* On a phone the keyboard's search key sends it. */}
        <button type="submit" className={`${adminButton.quiet} max-sm:hidden`}>
          Search
        </button>
      </div>

      <details className="group mt-3" open={moreActive > 0}>
        <summary className="inline-flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-md text-sm font-medium text-accent hover:underline">
          <FunnelSimpleIcon size={17} aria-hidden />
          <span className="group-open:hidden">More filters</span>
          <span className="hidden group-open:inline">Fewer filters</span>
          {moreActive > 0 ? (
            <span className="grid min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[0.75rem] text-accent-ink">
              {moreActive}
            </span>
          ) : null}
        </summary>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {more.map(field)}
          <label className="min-w-0">
            <span className={`${adminLabel} mb-1 text-[0.8125rem]`}>Received from</span>
            <input
              type="date"
              name="since"
              defaultValue={values.since ?? ""}
              onChange={submit}
              className={`${adminInput} min-h-10 text-sm`}
            />
          </label>
          <label className="min-w-0">
            <span className={`${adminLabel} mb-1 text-[0.8125rem]`}>Received until</span>
            <input
              type="date"
              name="until"
              defaultValue={values.until ?? ""}
              onChange={submit}
              className={`${adminInput} min-h-10 text-sm`}
            />
          </label>
        </div>
      </details>
    </form>
  );
}
