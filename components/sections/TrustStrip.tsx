import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr/SealCheck";
import type { CountryContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { getPublishedStats } from "@/lib/stats";

/**
 * A slim band under the hero: the three promises side by side, then the
 * figures and accreditations once they are real. Figures come from D1 and are
 * managed in /admin; stand-in accreditations are not shown.
 */
export async function TrustStrip({ content }: { content: CountryContent }) {
  const { trust } = content;
  const stats = await getPublishedStats(content.slug || null);
  const accreditations = trust.accreditations.filter((a) => !a.pending);

  return (
    <section id="trust" aria-label={trust.heading} className="scroll-mt-24 border-b border-hairline bg-surface-2">
      <Container>
        <ul className="reveal grid divide-hairline py-4 sm:grid-cols-3 sm:divide-x sm:py-0 rtl:sm:divide-x-reverse">
          {trust.promises.map((promise) => (
            <li key={promise} className="flex items-center gap-3.5 py-3 sm:px-6 sm:py-7 sm:first:ps-0 sm:last:pe-0">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                <CheckIcon size={16} weight="bold" aria-hidden />
              </span>
              <span className="text-base leading-snug font-medium text-ink">{promise}</span>
            </li>
          ))}
        </ul>

        {stats.length > 0 || accreditations.length > 0 ? (
          <div className="reveal flex flex-wrap items-end justify-between gap-8 border-t border-hairline py-8">
            {stats.length > 0 ? (
              <dl className="flex flex-wrap gap-x-12 gap-y-6">
                {stats.map((stat) => (
                  <div key={stat.key} className="flex flex-col-reverse">
                    <dt className="mt-1 text-sm text-ink-2">{stat.label}</dt>
                    <dd className="numeral text-accent">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {accreditations.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {accreditations.map((item) => (
                  <li
                    key={item.name}
                    title={item.body}
                    className="inline-flex items-center gap-2 rounded-md bg-surface px-3.5 py-2 text-sm text-ink-2 ring-1 ring-hairline"
                  >
                    <SealCheckIcon size={17} className="text-brand" aria-hidden />
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
