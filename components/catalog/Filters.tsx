import Link from "next/link";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { catalog } from "@/content/catalog";
import { btnQuiet } from "@/components/ui/styles";

export type FilterField = {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
};

const chip =
  "inline-flex min-h-11 items-center gap-1.5 rounded-md border px-4 py-2 text-sm leading-snug text-left transition-[color,border-color,background-color,translate] duration-300 ease-(--ease-soft)";
const chipOff = `${chip} border-hairline bg-surface text-ink-2 hover:-translate-y-0.5 hover:border-line hover:text-ink`;
const chipOn = `${chip} border-accent bg-accent-quiet font-medium text-accent`;

/**
 * List filters, as rows of links. Each choice is one tap, every option is
 * readable in full, and the page needs no JavaScript: the choice lives in the
 * address bar and the filtering happens on the server.
 *
 * A field with only one option filters nothing, so it is not shown.
 */
export function Filters({ action, fields }: { action: string; fields: FilterField[] }) {
  const text = catalog.filters;
  const shown = fields.filter((f) => f.options.length > 1);
  if (!shown.length) return null;
  const active = fields.some((f) => f.value);

  /** The address with one field changed and the others kept. */
  const href = (name: string, value: string) => {
    const params = new URLSearchParams();
    for (const f of fields) {
      const v = f.name === name ? value : f.value;
      if (v) params.set(f.name, v);
    }
    const query = params.toString();
    return query ? `${action}?${query}` : action;
  };

  return (
    <nav
      aria-label={text.heading}
      className="space-y-6 rounded-lg border border-hairline bg-surface p-5 sm:p-6"
    >
      {shown.map((f) => (
        <div key={f.name} className="min-w-0">
          <h2 className="text-sm font-medium text-ink-3">{f.label}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[{ value: "", label: text.all }, ...f.options].map((o) => {
              const on = o.value === f.value;
              return (
                <li key={o.value || "all"} className="max-w-full">
                  <Link
                    href={href(f.name, o.value)}
                    scroll={false}
                    aria-current={on ? "true" : undefined}
                    className={on ? chipOn : chipOff}
                  >
                    {on ? <CheckIcon size={14} weight="bold" aria-hidden /> : null}
                    {o.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {active ? (
        <div className="border-t border-hairline pt-5">
          <Link
            href={action}
            scroll={false}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            <XIcon size={14} weight="bold" aria-hidden />
            {text.clear}
          </Link>
        </div>
      ) : null}
    </nav>
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
