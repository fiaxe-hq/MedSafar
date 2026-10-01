import Link from "next/link";
import { catalog } from "@/content/catalog";
import { btnPlain, btnQuiet, field, label } from "@/components/ui/styles";

export type FilterField = {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
};

/**
 * List filters. A plain GET form, so the filtering happens on the server and
 * the page needs no JavaScript: the choice lives in the address bar.
 */
export function Filters({ action, fields }: { action: string; fields: FilterField[] }) {
  const text = catalog.filters;
  const active = fields.some((f) => f.value);
  // One field keeps a readable width instead of stretching across the card.
  const columns =
    fields.length > 1
      ? "sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]"
      : "sm:grid-cols-[minmax(0,22rem)_auto] sm:justify-start";

  return (
    <form
      action={action}
      method="get"
      aria-label={text.heading}
      className={`grid gap-4 rounded-lg border border-hairline bg-surface p-5 sm:items-end sm:p-6 ${columns}`}
    >
      {fields.map((f) => (
        <div key={f.name} className="min-w-0">
          <label htmlFor={`filter-${f.name}`} className={label}>
            {f.label}
          </label>
          <select
            id={`filter-${f.name}`}
            name={f.name}
            defaultValue={f.value}
            className={`${field} mt-2 cursor-pointer`}
          >
            <option value="">{text.all}</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div
        className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${
          fields.length > 1 ? "sm:col-span-2 lg:col-span-1" : ""
        }`}
      >
        <button type="submit" className={btnQuiet}>
          {text.apply}
        </button>
        {active ? (
          <Link href={action} className={btnPlain}>
            {text.clear}
          </Link>
        ) : null}
      </div>
    </form>
  );
}

/** How many records the filters left, so a change is never silent. */
export function ResultCount({ count }: { count: number }) {
  const text = catalog.filters;
  return (
    <p role="status" className="mt-8 text-sm text-ink-3">
      {count} {count === 1 ? text.result : text.results}
    </p>
  );
}

/** Shown in place of the cards when the filters match nothing: says so, and
 *  offers the way out. */
export function NoResults({ action }: { action: string }) {
  const text = catalog.filters;
  return (
    <div className="mt-4 flex flex-col items-start gap-5 rounded-lg border border-hairline bg-surface p-6 sm:p-7">
      <p className="max-w-[52ch] text-base text-ink-2">{text.empty}</p>
      <Link href={action} className={btnQuiet}>
        {text.clear}
      </Link>
    </div>
  );
}
