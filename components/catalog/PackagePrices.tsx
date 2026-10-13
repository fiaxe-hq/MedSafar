import type { PackageGroup } from "@/content/types";
import { btnPrimary } from "@/components/ui/styles";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const days = (n: number) => `${n} day${n === 1 ? "" : "s"}`;

/** "1+4" is ICU + ward days; a single number is the whole stay. */
function formatStay(stay: string): string {
  const [first, second] = stay.split("+").map(Number);
  if (second === undefined) return `${days(first)} in hospital`;
  if (first === 0) return `${days(second)} on the ward`;
  return `${days(first)} in ICU, ${second} on the ward`;
}

/** The package prices a hospital has supplied, grouped by category. */
export function PackagePrices({ groups, note }: { groups: PackageGroup[]; note: string }) {
  return (
    <div>
      <div className="reveal gap-x-8 lg:columns-2">
        {groups.map((group) => (
          <section key={group.category} className="mb-8 break-inside-avoid">
            <h3 className="mb-3 text-lg font-medium tracking-[-0.01em]">{group.category}</h3>
            <ul className="rounded-lg border border-hairline bg-surface px-5 sm:px-6">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-4 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="text-base text-ink">{item.name}</p>
                    <p className="mt-0.5 text-sm text-ink-3">{formatStay(item.stay)}</p>
                  </div>
                  <p className="shrink-0 text-base font-semibold text-ink tabular-nums">{usd.format(item.priceUsd)}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-2 max-w-[68ch] text-sm text-ink-3">{note}</p>
    </div>
  );
}

/** For a hospital with no package prices on file: an invitation to ask for
 *  one, instead of a table. */
export function QuotePrompt({ heading, body, cta }: { heading: string; body: string; cta: string }) {
  return (
    <div className="reveal flex flex-col gap-6 rounded-lg border border-hairline bg-surface p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">{heading}</h2>
        <p className="mt-3 max-w-[52ch] text-base text-ink-2">{body}</p>
      </div>
      <a href="#plan" className={`${btnPrimary} self-start lg:self-auto`}>
        {cta}
      </a>
    </div>
  );
}
