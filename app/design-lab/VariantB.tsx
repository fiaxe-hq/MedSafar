import Image from "next/image";
import { HeadsetIcon } from "@phosphor-icons/react/dist/ssr/Headset";
import { FileTextIcon } from "@phosphor-icons/react/dist/ssr/FileText";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr/ChatsCircle";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { Container } from "@/components/ui/Container";
import { handledIcons } from "@/components/ui/HandledIcon";
import { content, featuredHospitals, LabForm } from "./shared";

/**
 * B: Warm and human (Notion warmth, Apple polish).
 * A warm sand tone sits beside the green, corners are softer, and the hero
 * puts a person-shaped promise ("one case manager") on top of the photo.
 */
const sand = "bg-[#faf7f1]";
const promiseIcons = [HeadsetIcon, FileTextIcon, ChatsCircleIcon];

export async function VariantB() {
  const { hero, trust, howItWorks, hospitals, handled, countryInfo, faq, enquiry } = content;
  const cards = await featuredHospitals();

  return (
    <>
      {/* Hero: split, photo with floating notes */}
      <section className={`${sand} overflow-hidden`}>
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
          <div className="min-w-0 lg:col-span-6">
            <p className="hero-rise inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent">
              <span aria-hidden className="size-2 rounded-full bg-brand" />
              {hero.eyebrow}
            </p>
            <h1 className="hero-rise display mt-6 max-w-[15ch] [animation-delay:80ms]">{hero.headline}</h1>
            <svg aria-hidden viewBox="0 0 220 14" className="hero-rise mt-3 h-3 w-48 text-glow [animation-delay:120ms]">
              <path d="M2 10C50 3 120 2 218 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <p className="hero-rise mt-6 max-w-[42ch] text-lg text-ink-2 [animation-delay:160ms] sm:text-xl">{hero.support}</p>
            <div className="hero-rise mt-9 max-w-lg rounded-[1.25rem] bg-surface p-5 shadow-lift ring-1 ring-hairline [animation-delay:240ms] sm:p-7">
              <LabForm compact />
            </div>
          </div>

          <div className="hero-rise relative min-w-0 [animation-delay:200ms] lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/5]">
              {hero.picture.src ? (
                <Image src={hero.picture.src} alt={hero.picture.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="hero-photo object-cover" />
              ) : null}
            </div>
            <div className="lab-float absolute -bottom-5 start-4 max-w-[17rem] rounded-2xl bg-surface p-4 shadow-lift ring-1 ring-hairline sm:-start-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                  <HeadsetIcon size={20} aria-hidden />
                </span>
                <p className="text-sm font-medium leading-snug text-ink">{trust.promises[0]}</p>
              </div>
            </div>
            <div className="lab-float-late absolute end-4 top-5 hidden rounded-full bg-surface/95 px-4 py-2 text-sm font-medium text-ink shadow-card backdrop-blur sm:block">
              {trust.promises[2]}
            </div>
          </div>
        </Container>
      </section>

      {/* Promises as three soft tiles */}
      <section className="py-14 sm:py-20">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-3">
            {trust.promises.map((promise, i) => {
              const Glyph = promiseIcons[i];
              return (
                <li key={promise} className="reveal flex items-start gap-4 rounded-2xl bg-accent-quiet p-6">
                  <Glyph size={26} className="shrink-0 text-accent" aria-hidden />
                  <span className="text-base font-medium text-ink">{promise}</span>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* How it works: four cards on a path */}
      <section id="how-it-works" className={`${sand} py-20 sm:py-28`}>
        <Container>
          <div className="reveal max-w-2xl">
            <h2 className="display-2">{howItWorks.heading}</h2>
            <p className="mt-5 text-lg text-ink-2">{howItWorks.intro}</p>
          </div>
          <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden className="lab-draw absolute inset-x-10 top-10 hidden origin-left border-t-2 border-dashed border-line lg:block rtl:origin-right" />
            {howItWorks.steps.map((step, i) => (
              <li key={step.title} className="reveal lift relative rounded-[1.25rem] bg-surface p-7 ring-1 ring-hairline">
                <span className="lab-pop grid size-12 place-items-center rounded-full bg-glow/25 font-display text-lg font-bold text-accent">{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-base text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* What we handle: big friendly tiles, first one leads */}
      <section id="what-we-handle" className="py-20 sm:py-28">
        <Container>
          <div className="reveal mx-auto max-w-2xl text-center">
            <h2 className="display-2">{handled.heading}</h2>
            <p className="mt-5 text-lg text-ink-2">{handled.intro}</p>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {handled.items.map((item, i) => {
              const Glyph = handledIcons[item.icon];
              const span = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
              return (
                <li key={item.title} className={`reveal lift rounded-[1.5rem] border border-hairline bg-surface p-8 ${span}`}>
                  <span className="lab-pop grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Glyph size={28} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 max-w-[44ch] text-base text-ink-2">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Hospitals */}
      <section id="hospitals" className={`${sand} py-20 sm:py-28`}>
        <Container>
          <div className="reveal max-w-2xl">
            <h2 className="display-2">{hospitals.heading}</h2>
            <p className="mt-5 text-lg text-ink-2">{hospitals.intro}</p>
          </div>
          <div className="lab-expand mt-12 grid gap-5 [&_article]:rounded-[1.5rem]">
            {cards.map(({ hospital, specialities }) => (
              <HospitalCard key={hospital.slug} hospital={hospital} specialities={specialities} wide sizes="(min-width: 1024px) 56vw, 100vw" />
            ))}
          </div>
        </Container>
      </section>

      {/* Travelling: three cards */}
      <section id="country-info" className="py-20 sm:py-28">
        <Container>
          <div className="reveal max-w-2xl">
            <h2 className="display-2">{countryInfo.heading}</h2>
            <p className="mt-5 text-lg text-ink-2">{countryInfo.intro}</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="reveal rounded-[1.5rem] bg-accent-quiet p-8 sm:p-10 lg:row-span-2">
              <h3 className="text-2xl font-semibold">{countryInfo.visa.heading}</h3>
              <ol className="mt-6 space-y-4">
                {countryInfo.visa.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="lab-pop grid size-7 shrink-0 place-items-center rounded-full bg-surface text-sm font-semibold text-accent">{i + 1}</span>
                    <p className="text-base text-ink-2">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-ink-3">{countryInfo.visa.note}</p>
            </div>
            {[countryInfo.flights, countryInfo.language].map((block) => (
              <div key={block.heading} className="reveal rounded-[1.5rem] border border-hairline p-8 sm:p-10">
                <h3 className="text-2xl font-semibold">{block.heading}</h3>
                <p className="mt-3 text-base text-ink-2">{block.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ: two columns of soft cards */}
      <section id="faq" className={`${sand} py-20 sm:py-28`}>
        <Container>
          <h2 className="reveal display-2">{faq.heading}</h2>
          <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
            {faq.items.map((item, i) => (
              <details key={i} className="group accordion reveal rounded-[1.25rem] bg-surface px-6 ring-1 ring-hairline open:shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold">
                  {item.question}
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-[rotate] duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 text-base text-ink-2">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing form on deep green */}
      <section id="plan" className="py-20 sm:py-28">
        <Container>
          <div className="band-deep lab-expand relative isolate grid gap-10 overflow-hidden rounded-[2rem] p-6 text-white sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-16">
            <div className="min-w-0">
              <h2 className="display-2 max-w-[16ch]">{enquiry.heading}</h2>
              <p className="mt-6 max-w-[46ch] text-lg text-white/75">{enquiry.support}</p>
            </div>
            <div className="min-w-0 rounded-[1.25rem] bg-surface p-5 text-ink sm:p-7">
              <LabForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
