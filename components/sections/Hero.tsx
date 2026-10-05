import Image from "next/image";
import type { CountryContent } from "@/content/types";
import { site } from "@/content/site";
import { dialCodesFor, defaultIso } from "@/content/dial-codes";
import { Container } from "@/components/ui/Container";
import { handledIcons } from "@/components/ui/HandledIcon";
import { EnquiryForm } from "@/components/form/EnquiryForm";

/**
 * Full-bleed photo hero. The headline sits on a deep green wash over the
 * photograph, the form floats beside it, and a row of chips names what we
 * arrange, so the offer reads at a glance without a paragraph.
 * Without a cleared photo the wash stands on its own.
 */
export function Hero({ content, source }: { content: CountryContent; source: string }) {
  const { hero, handled } = content;
  const photo = !hero.picture.pending && hero.picture.src ? hero.picture.src : null;

  return (
    <section className="relative isolate overflow-hidden bg-deep">
      {photo ? (
        <Image
          src={photo}
          alt={hero.picture.alt}
          fill
          priority
          sizes="100vw"
          className="hero-photo -z-20 object-cover"
        />
      ) : null}
      <div aria-hidden className="hero-wash absolute inset-0 -z-10" />

      <Container className="grid min-h-[min(88dvh,54rem)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="min-w-0 lg:col-span-7">
          <p className="hero-rise inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
            <span aria-hidden className="size-2 rounded-full bg-glow shadow-[0_0_0_4px_rgb(94_224_189/0.3)]" />
            {hero.eyebrow}
          </p>

          <h1
            className="hero-rise display mt-7 max-w-[15ch] text-white [animation-delay:80ms]"
          >
            {hero.headline}
          </h1>

          <p
            className="hero-rise mt-6 max-w-[42ch] text-lg text-white/80 [animation-delay:160ms] sm:text-xl"
          >
            {hero.support}
          </p>

          <ul className="hero-rise mt-9 flex flex-wrap gap-2.5 [animation-delay:240ms]">
            {handled.items.slice(0, 4).map((item) => {
              const Glyph = handledIcons[item.icon];
              return (
                <li
                  key={item.title}
                  className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3.5 py-2 text-sm text-white/90 ring-1 ring-white/15 backdrop-blur-md ring-inset"
                >
                  <Glyph size={17} className="text-glow" aria-hidden />
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="hero-rise min-w-0 [animation-delay:320ms] lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9"
        >
          <div className="rounded-xl bg-surface p-5 shadow-[0_30px_60px_-20px_rgb(2_20_16/0.55)] ring-1 ring-white/40 sm:p-7">
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
      </Container>
    </section>
  );
}
