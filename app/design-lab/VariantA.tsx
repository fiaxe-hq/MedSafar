import Image from "next/image";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { Container } from "@/components/ui/Container";
import { handledIcons } from "@/components/ui/HandledIcon";
import { content, featuredHospitals, LabForm } from "./shared";

/**
 * A: Calm editorial (Apple, Stripe).
 * All light. A centred headline, the form right under it, and one wide photo.
 * Sections breathe; nothing competes with the headline or the form.
 */
export async function VariantA() {
  const { hero, trust, howItWorks, hospitals, handled, countryInfo, faq, enquiry } = content;
  const cards = await featuredHospitals();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="lab-orb absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]" />
          <div className="lab-orb absolute top-40 -left-40 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgb(94_224_189/0.18),transparent)] [animation-delay:-8s]" />
        </div>
        <Container className="relative pt-16 text-center sm:pt-24 lg:pt-28">
          <p className="hero-rise text-sm font-medium tracking-[0.14em] text-accent uppercase">{hero.eyebrow}</p>
          <h1 className="display mx-auto mt-6 max-w-[17ch]">
            {hero.headline.split(" ").map((word, i, words) => (
              <span key={i}>
                <span
                  className={`hero-rise inline-block ${i >= words.length - 4 ? "text-accent" : ""}`}
                  style={{ animationDelay: `${80 + i * 70}ms` }}
                >
                  {word}
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p className="hero-rise mx-auto mt-6 max-w-[44ch] text-lg text-ink-2 [animation-delay:160ms] sm:text-xl">
            {hero.support}
          </p>
          <div className="hero-rise mx-auto mt-10 max-w-xl rounded-2xl bg-surface p-5 text-start shadow-lift ring-1 ring-hairline [animation-delay:240ms] sm:p-7">
            <LabForm compact />
          </div>
        </Container>

        <Container className="relative mt-14 sm:mt-20">
          <div className="lab-expand relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[21/9]">
            {hero.picture.src ? (
              <Image src={hero.picture.src} alt={hero.picture.alt} fill priority sizes="100vw" className="hero-photo object-cover" />
            ) : null}
          </div>
          <ul className="grid gap-6 py-10 sm:grid-cols-3 sm:gap-10 sm:py-14">
            {trust.promises.map((promise) => (
              <li key={promise} className="reveal flex gap-3.5">
                <CheckIcon size={20} weight="bold" className="mt-1 shrink-0 text-brand" aria-hidden />
                <span className="text-base font-medium text-ink">{promise}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How it works: heading held left, steps as a quiet list */}
      <section id="how-it-works" className="border-t border-hairline py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <h2 className="display-2">{howItWorks.heading}</h2>
            <p className="mt-5 max-w-[34ch] text-lg text-ink-2">{howItWorks.intro}</p>
          </div>
          <ol className="lg:col-span-8">
            {howItWorks.steps.map((step, i) => (
              <li key={step.title} className="reveal grid grid-cols-[4rem_1fr] gap-4 border-b border-hairline py-8 first:pt-0 sm:grid-cols-[6rem_1fr]">
                <span className="numeral lab-light text-line">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-base text-ink-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* What we handle: light, three across */}
      <section id="what-we-handle" className="bg-surface-2 py-20 sm:py-28">
        <Container>
          <div className="reveal mx-auto max-w-2xl text-center">
            <h2 className="display-2">{handled.heading}</h2>
            <p className="mt-5 text-lg text-ink-2">{handled.intro}</p>
          </div>
          <ul className="mt-16 grid gap-x-10 gap-y-14 text-center sm:grid-cols-2 lg:grid-cols-6">
            {handled.items.map((item) => {
              const Glyph = handledIcons[item.icon];
              return (
                <li
                  key={item.title}
                  className="reveal flex flex-col items-center sm:last:col-span-2 lg:col-span-2 lg:last:col-span-2 lg:nth-4:col-start-2"
                >
                  <span className="lab-pop grid size-14 place-items-center rounded-full bg-surface text-accent shadow-card ring-1 ring-hairline">
                    <Glyph size={22} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 max-w-[34ch] text-base text-ink-2">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Hospitals */}
      <section id="hospitals" className="py-20 sm:py-28">
        <Container>
          <div className="reveal max-w-2xl">
            <h2 className="display-2">{hospitals.heading}</h2>
            <p className="mt-5 text-lg text-ink-2">{hospitals.intro}</p>
          </div>
          <div className="mt-12 grid gap-5">
            {cards.map(({ hospital, specialities }) => (
              <HospitalCard key={hospital.slug} hospital={hospital} specialities={specialities} wide sizes="(min-width: 1024px) 56vw, 100vw" />
            ))}
          </div>
          <p className="mt-8 max-w-[68ch] text-sm text-ink-3">{hospitals.note}</p>
        </Container>
      </section>

      {/* Travelling */}
      <section id="country-info" className="border-t border-hairline py-20 sm:py-28">
        <Container>
          <div className="reveal max-w-2xl">
            <h2 className="display-2">{countryInfo.heading}</h2>
            <p className="mt-5 text-lg text-ink-2">{countryInfo.intro}</p>
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="reveal lg:col-span-2">
              <h3 className="text-xl font-semibold">{countryInfo.visa.heading}</h3>
              <ol className="mt-6 space-y-5">
                {countryInfo.visa.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-6 shrink-0 font-display font-semibold text-accent tabular-nums">{i + 1}.</span>
                    <p className="max-w-[56ch] text-base text-ink-2">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-[60ch] text-sm text-ink-3">{countryInfo.visa.note}</p>
            </div>
            <div className="reveal space-y-10">
              <div>
                <h3 className="text-xl font-semibold">{countryInfo.flights.heading}</h3>
                <p className="mt-3 text-base text-ink-2">{countryInfo.flights.body}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{countryInfo.language.heading}</h3>
                <p className="mt-3 text-base text-ink-2">{countryInfo.language.body}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ: one centred column */}
      <section id="faq" className="bg-surface-2 py-20 sm:py-28">
        <Container className="max-w-3xl">
          <h2 className="reveal display-2 text-center">{faq.heading}</h2>
          <div className="reveal mt-12 divide-y divide-hairline border-y border-hairline">
            {faq.items.map((item, i) => (
              <details key={i} className="group accordion">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold transition-colors hover:text-accent">
                  {item.question}
                  <span aria-hidden className="text-2xl font-light text-ink-3 transition-[rotate] duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[64ch] pb-6 text-base text-ink-2">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing form: soft, light panel */}
      <section id="plan" className="py-20 sm:py-28">
        <Container>
          <div className="reveal grid gap-10 rounded-3xl bg-accent-soft p-6 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-16">
            <div className="min-w-0">
              <h2 className="display-2 max-w-[16ch]">{enquiry.heading}</h2>
              <p className="mt-6 max-w-[46ch] text-lg text-ink-2">{enquiry.support}</p>
            </div>
            <div className="min-w-0 rounded-2xl bg-surface p-5 shadow-card sm:p-7">
              <LabForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
