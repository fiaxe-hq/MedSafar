import type { CountryContent } from "@/content/types";
import { site } from "@/content/site";
import { dialCodesFor, defaultIso } from "@/content/dial-codes";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Pending";
import { eyebrow } from "@/components/ui/styles";
import { EnquiryForm } from "@/components/form/EnquiryForm";

/**
 * Editorial hero: one statement across the full measure, then the offer and
 * the photograph side by side underneath it. No wash, no gradient.
 */
export function Hero({ content, source }: { content: CountryContent; source: string }) {
  const { hero } = content;

  return (
    <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      <Container>
        <p className={eyebrow}>{hero.eyebrow}</p>

        <h1 className="display mt-6 max-w-[26ch]">{hero.headline}</h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="min-w-0 lg:col-span-6 xl:col-span-5">
            <p className="max-w-[46ch] text-lg text-ink-2">{hero.support}</p>

            <div className="mt-8 rounded-lg border border-hairline bg-surface p-5 shadow-card sm:p-7">
              <EnquiryForm
                text={site.form}
                dialCodes={dialCodesFor(content.iso)}
                defaultIso={content.iso ?? defaultIso}
                defaultCountry={content.countryName ?? ""}
                source={source}
                compact
              />
            </div>
          </div>

          <div className="min-w-0 lg:col-span-6 lg:col-start-7 xl:col-span-7">
            <Figure
              picture={hero.picture}
              ratio="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4]"
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
