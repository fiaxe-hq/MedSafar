import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr/SealCheck";
import type { CountryContent } from "@/content/types";
import { Section, Note } from "@/components/ui/Section";
import { Mark } from "@/components/ui/Pending";

export function TrustStrip({ content }: { content: CountryContent }) {
  const { trust } = content;
  const pendingStats = trust.stats.some((s) => s.pending);

  return (
    <Section id="trust" tone="quiet">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <h2 className="display-2">{trust.heading}</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {trust.accreditations.map((item, i) => (
              <span
                key={i}
                title={item.body}
                className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface px-4 py-2 text-sm text-ink-2"
              >
                <SealCheckIcon size={17} className="text-brand" aria-hidden />
                {item.name}
              </span>
            ))}
            {trust.accreditations.some((a) => a.pending) ? <Mark className="self-center" /> : null}
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="reveal rounded-lg border border-hairline bg-surface px-6 sm:px-8">
            {trust.promises.map((promise) => (
              <li
                key={promise}
                className="flex items-start gap-4 border-b border-hairline py-5 text-lg last:border-b-0"
              >
                <CheckIcon
                  size={18}
                  weight="bold"
                  className="mt-1.5 shrink-0 text-cta"
                  aria-hidden
                />
                <span>{promise}</span>
              </li>
            ))}
          </ul>

          <dl className="reveal mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trust.stats.map((stat) => (
              <div key={stat.label} className="rounded-md border border-hairline bg-surface p-4">
                <dd className={stat.pending ? "" : "numeral text-accent"}>
                  {stat.pending ? (
                    <span className="block text-sm text-ink-3">
                      {stat.value}
                    </span>
                  ) : (
                    stat.value
                  )}
                </dd>
                <dt className="mt-2 text-sm font-medium text-ink">{stat.label}</dt>
              </div>
            ))}
          </dl>
          {pendingStats ? <Mark className="mt-6" /> : null}
        </div>
      </div>

      <Note>{trust.note}</Note>
    </Section>
  );
}
