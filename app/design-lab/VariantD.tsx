import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { FileArrowUpIcon } from "@phosphor-icons/react/dist/ssr/FileArrowUp";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr/SealCheck";
import type { Picture } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { handledIcons } from "@/components/ui/HandledIcon";
import { content, featuredHospitals, LabForm } from "./shared";
import "./variantD.css";

/**
 * D: Soft structuralism, pushed.
 * Huge tight type, a tilted photo collage, one marquee, journey cards that
 * physically stack as you scroll, a photo-led bento, and a full-bleed photo
 * close. Every surface is a "double bezel": a pale tray holding a white core.
 * Motion is CSS only (scroll-driven timelines), so nothing new is installed.
 */

function Photo({ picture, sizes, className = "", priority = false }: { picture: Picture; sizes: string; className?: string; priority?: boolean }) {
  return picture.src ? (
    <Image src={picture.src} alt={picture.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
  ) : null;
}

/** Outer tray + inner core, with concentric radii. */
function Bezel({ children, className = "", core = "bg-surface" }: { children: React.ReactNode; className?: string; core?: string }) {
  return (
    <div className={`rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/[0.06] ${className}`}>
      <div className={`h-full rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgb(255_255_255/0.7),0_24px_48px_-28px_rgb(11_61_49/0.35)] ${core}`}>
        {children}
      </div>
    </div>
  );
}

export async function VariantD() {
  const { hero, trust, howItWorks, hospitals, handled, countryInfo, faq, enquiry } = content;
  const [first] = await featuredHospitals();
  const gallery = first?.hospital.gallery ?? [];
  const pic = (name: string): Picture => gallery.find((p) => p.src?.includes(name)) ?? hero.picture;
  const icon = (key: (typeof handled.items)[number]["icon"]) => handled.items.find((i) => i.icon === key)!;

  const stepVisual: (Picture | null)[] = [null, pic("opd"), pic("international-lounge"), pic("robotic-surgery")];
  const stepTone = [
    "bg-surface",
    "bg-accent-soft",
    "bg-deep text-white",
    "bg-surface-2",
  ];

  const rolling = [...handled.items.map((i) => i.title), ...trust.promises.slice(1)];

  return (
    <div className="bg-[#fbfdfc]">
      {/* ---------- Hero: tight type left, tilted collage right ---------- */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(42rem_28rem_at_80%_30%,rgb(94_224_189/0.22),transparent_70%),radial-gradient(30rem_20rem_at_0%_100%,rgb(14_148_117/0.08),transparent_70%)]"
        />
        <Container className="grid items-center gap-14 py-12 sm:py-16 lg:min-h-[min(calc(100dvh-5rem),58rem)] lg:grid-cols-12 lg:gap-6 lg:py-16">
          <div className="min-w-0 lg:col-span-7">
            <p className="hero-rise inline-flex rounded-full bg-accent-soft px-3.5 py-1 text-xs font-medium tracking-[0.18em] text-accent uppercase">
              {hero.eyebrow}
            </p>
            <h1 className="hero-rise mt-6 max-w-[14ch] font-display text-[clamp(2.75rem,1.1rem+4.4vw,4.75rem)] leading-[0.98] font-bold tracking-[-0.045em] [animation-delay:80ms]">
              {hero.headline}
            </h1>
            <p className="hero-rise mt-6 max-w-[40ch] text-lg text-ink-2 [animation-delay:160ms] sm:text-xl">{hero.support}</p>
            <Bezel className="hero-rise mt-9 max-w-xl [animation-delay:240ms]">
              <div className="p-5 sm:p-7">
                <LabForm compact />
              </div>
            </Bezel>
          </div>

          <div className="d-collage hero-rise relative mx-auto aspect-[5/6] w-full max-w-md [animation-delay:200ms] lg:col-span-5 lg:max-w-none">
            {[
              { p: hero.picture, box: "inset-x-[12%] top-0 aspect-[4/5]", tilt: "[--tilt:2.5deg]", z: "z-10", priority: true },
              { p: pic("lobby"), box: "bottom-[4%] start-0 w-[50%] aspect-square", tilt: "[--tilt:-5deg]", z: "z-20", priority: false },
              { p: pic("operating-theatre"), box: "bottom-0 end-0 w-[44%] aspect-[3/4]", tilt: "[--tilt:6deg]", z: "z-20", priority: false },
            ].map(({ p, box, tilt, z, priority }) => (
              <div key={p.alt} className={`d-tilt absolute ${box} ${tilt} ${z} rounded-[1.75rem] bg-surface p-2 shadow-[0_30px_60px_-30px_rgb(11_61_49/0.45)] ring-1 ring-ink/5`}>
                <div className="relative h-full overflow-hidden rounded-[1.25rem] bg-surface-2">
                  <Photo picture={p} sizes="(min-width: 1024px) 30vw, 70vw" priority={priority} className={priority ? "hero-photo" : ""} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- The one marquee ---------- */}
      <section aria-label={handled.heading} className="d-marquee-wrap overflow-hidden border-y border-hairline bg-surface py-7">
        <div className="d-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {rolling.map((text) => (
                <li key={text} className="flex items-center gap-8 pe-8 font-display text-2xl font-semibold tracking-[-0.02em] whitespace-nowrap text-ink sm:text-4xl">
                  {text}
                  <SealCheckIcon size={28} weight="light" className="text-brand" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ---------- Journey: sticky stacking cards ---------- */}
      <section id="how-it-works" className="py-24 sm:py-32">
        <Container>
          <div className="reveal max-w-2xl">
            <h2 className="font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em]">{howItWorks.heading}</h2>
            <p className="mt-5 max-w-[46ch] text-lg text-ink-2">{howItWorks.intro}</p>
          </div>

          <ol className="mt-14 space-y-5 md:space-y-0">
            {howItWorks.steps.map((step, i) => {
              const visual = stepVisual[i];
              const dark = i === 2;
              return (
                <li key={step.title} style={{ "--i": i } as React.CSSProperties} className="d-stack-card md:mb-[16vh] md:last:mb-0">
                  <div className={`d-stack-inner grid overflow-hidden rounded-[2rem] ring-1 ring-ink/[0.06] shadow-[0_30px_60px_-36px_rgb(11_61_49/0.4)] md:min-h-[26rem] md:grid-cols-2 ${stepTone[i]}`}>
                    <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
                      <span className={`font-display text-[clamp(4rem,2rem+6vw,7.5rem)] leading-none font-bold tracking-[-0.06em] tabular-nums ${dark ? "text-glow" : "text-brand/25"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{step.title}</h3>
                        <p className={`mt-4 max-w-[42ch] text-lg ${dark ? "text-white/75" : "text-ink-2"}`}>{step.body}</p>
                      </div>
                    </div>
                    <div className="relative min-h-60 p-2 md:p-3">
                      {visual ? (
                        <div className="relative h-full min-h-56 overflow-hidden rounded-[1.5rem]">
                          <Photo picture={visual} sizes="(min-width: 768px) 45vw, 100vw" />
                        </div>
                      ) : (
                        <div className="grid h-full min-h-56 place-items-center rounded-[1.5rem] bg-[radial-gradient(circle_at_30%_20%,var(--glow),var(--brand)_60%,var(--deep))]">
                          <FileArrowUpIcon size={120} weight="thin" className="text-white" aria-hidden />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* ---------- What we handle: photo-led bento, exactly five cells ---------- */}
      <section id="what-we-handle" className="bg-surface-2 py-24 sm:py-32">
        <Container>
          <div className="reveal max-w-2xl">
            <h2 className="font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em]">{handled.heading}</h2>
            <p className="mt-5 max-w-[46ch] text-lg text-ink-2">{handled.intro}</p>
          </div>

          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]">
            {(() => {
              const stay = icon("stay");
              const visa = icon("visa");
              const pickup = icon("pickup");
              const interpreter = icon("interpreter");
              const after = icon("aftercare");
              const Stay = handledIcons.stay;
              const Visa = handledIcons.visa;
              const Pickup = handledIcons.pickup;
              const Interp = handledIcons.interpreter;
              const After = handledIcons.aftercare;
              return (
                <>
                  <li className="reveal group relative isolate min-h-[26rem] overflow-hidden rounded-[2rem] md:col-span-2 lg:col-span-7 lg:row-span-2">
                    <div className="absolute inset-0 -z-10 transition-[scale] duration-1000 d-ease group-hover:scale-[1.04]">
                      <Photo picture={pic("private-room")} sizes="(min-width: 1024px) 58vw, 100vw" />
                    </div>
                    <div className="absolute inset-x-3 bottom-3 rounded-[1.5rem] bg-surface p-6 sm:inset-x-4 sm:bottom-4 sm:p-8">
                      <Stay size={30} weight="light" className="text-accent" aria-hidden />
                      <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em]">{stay.title}</h3>
                      <p className="mt-2 max-w-[48ch] text-base text-ink-2">{stay.body}</p>
                    </div>
                  </li>

                  <li className="reveal relative overflow-hidden rounded-[2rem] bg-[linear-gradient(140deg,var(--glow),#b9f0e1_55%,var(--accent-soft))] p-8 lg:col-span-5">
                    <Visa size={36} weight="light" className="text-deep" aria-hidden />
                    <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em] text-deep">{visa.title}</h3>
                    <p className="mt-2 max-w-[40ch] text-base text-ink">{visa.body}</p>
                  </li>

                  <li className="reveal relative isolate overflow-hidden rounded-[2rem] bg-surface p-8 ring-1 ring-ink/[0.06] lg:col-span-5">
                    <Pickup size={200} weight="thin" className="absolute -end-8 -bottom-12 -z-10 text-accent-soft" aria-hidden />
                    <Pickup size={36} weight="light" className="text-accent" aria-hidden />
                    <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em]">{pickup.title}</h3>
                    <p className="mt-2 max-w-[40ch] text-base text-ink-2">{pickup.body}</p>
                  </li>

                  <li className="reveal rounded-[2rem] bg-accent p-8 text-white lg:col-span-5">
                    <Interp size={36} weight="light" aria-hidden />
                    <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em]">{interpreter.title}</h3>
                    <p className="mt-2 max-w-[40ch] text-base text-white/85">{interpreter.body}</p>
                  </li>

                  <li className="reveal band-deep relative isolate overflow-hidden rounded-[2rem] p-8 text-white md:col-span-2 lg:col-span-7">
                    <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <After size={36} weight="light" className="text-glow" aria-hidden />
                        <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em]">{after.title}</h3>
                        <p className="mt-2 max-w-[46ch] text-base text-white/75">{after.body}</p>
                      </div>
                    </div>
                  </li>
                </>
              );
            })()}
          </ul>
        </Container>
      </section>

      {/* ---------- Hospital: full-bleed photo, card overlapping it ---------- */}
      {first ? (
        <section id="hospitals" className="py-24 sm:py-32">
          <Container>
            <div className="reveal max-w-2xl">
              <h2 className="font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em]">{hospitals.heading}</h2>
              <p className="mt-5 max-w-[50ch] text-lg text-ink-2">{hospitals.intro}</p>
            </div>

            <div className="reveal relative mt-14 aspect-[4/3] overflow-hidden rounded-[2.5rem] sm:aspect-[21/9]">
              <Photo picture={first.hospital.picture} sizes="100vw" />
            </div>

            <div className="relative grid gap-4 lg:-mt-36 lg:grid-cols-12 lg:px-10">
              <Bezel className="reveal -mt-16 mx-3 sm:mx-8 lg:col-span-6 lg:mx-0 lg:mt-0">
                <Link href={`/hospitals/${first.hospital.slug}`} className="group block p-7 sm:p-10">
                  <h3 className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{first.hospital.name}</h3>
                  <p className="mt-3 flex items-center gap-1.5 text-base text-ink-2">
                    <MapPinIcon size={18} weight="light" className="text-accent" aria-hidden />
                    {first.hospital.city}
                  </p>
                  <p className="mt-1 text-base text-ink-2">{first.hospital.accreditation}</p>
                  <p className="mt-4 text-sm text-ink-3">{first.specialities}</p>
                  <span className="mt-8 inline-flex items-center gap-3 rounded-full bg-cta py-2 ps-6 pe-2 text-base font-medium text-cta-ink transition-[scale] duration-500 d-ease group-active:scale-[0.98]">
                    {first.hospital.name}
                    <span className="grid size-9 place-items-center rounded-full bg-white/15 transition-transform duration-500 d-ease group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                      <ArrowUpRightIcon size={18} aria-hidden />
                    </span>
                  </span>
                </Link>
              </Bezel>
              <div className="hidden gap-4 self-end lg:col-span-6 lg:grid lg:grid-cols-3">
                {["international-lounge", "linear-accelerator", "critical-care"].map((name) => (
                  <div key={name} className="reveal relative aspect-[3/4] overflow-hidden rounded-[1.5rem] ring-4 ring-[#fbfdfc]">
                    <Photo picture={pic(name)} sizes="14vw" />
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-8 max-w-[68ch] text-sm text-ink-3">{hospitals.note}</p>
          </Container>
        </section>
      ) : null}

      {/* ---------- Travelling: sticky intro, visa path with a filling line ---------- */}
      <section id="country-info" className="border-t border-hairline py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <h2 className="font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em]">{countryInfo.heading}</h2>
            <p className="mt-5 max-w-[40ch] text-lg text-ink-2">{countryInfo.intro}</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {[countryInfo.flights, countryInfo.language].map((block) => (
                <div key={block.heading} className="border-s-2 border-glow ps-5">
                  <h3 className="text-lg font-bold">{block.heading}</h3>
                  <p className="mt-2 text-base text-ink-2">{block.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Bezel>
              <div className="p-7 sm:p-12">
                <h3 className="font-display text-3xl font-bold tracking-[-0.03em]">{countryInfo.visa.heading}</h3>
                <ol className="relative mt-10 space-y-10">
                  <span aria-hidden className="absolute start-[1.1875rem] top-2 bottom-2 w-0.5 bg-hairline">
                    <span className="d-line-fill absolute inset-0 bg-brand" />
                  </span>
                  {countryInfo.visa.steps.map((step, i) => (
                    <li key={i} className="relative flex gap-6">
                      <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-surface font-display text-base font-bold text-accent ring-2 ring-brand">
                        {i + 1}
                      </span>
                      <p className="pt-1.5 text-lg text-ink">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-10 rounded-[1.25rem] bg-surface-2 p-5 text-sm text-ink-2">{countryInfo.visa.note}</p>
              </div>
            </Bezel>
          </div>
        </Container>
      </section>

      {/* ---------- FAQ: one large panel ---------- */}
      <section id="faq" className="bg-surface-2 py-24 sm:py-32">
        <Container className="max-w-4xl">
          <h2 className="reveal text-center font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em]">{faq.heading}</h2>
          <Bezel className="reveal mt-14">
            <div className="divide-y divide-hairline px-6 sm:px-10">
              {faq.items.map((item, i) => (
                <details key={i} className="group accordion">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-semibold tracking-[-0.01em] transition-colors duration-300 hover:text-accent sm:text-xl">
                    {item.question}
                    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-[rotate,background-color,color] duration-500 d-ease group-open:rotate-45 group-open:bg-accent group-open:text-white">
                      <PlusIcon size={16} weight="bold" />
                    </span>
                  </summary>
                  <p className="max-w-[64ch] pb-6 text-base text-ink-2">{item.answer}</p>
                </details>
              ))}
            </div>
          </Bezel>
        </Container>
      </section>

      {/* ---------- Close: full-bleed photo, the one dark moment ---------- */}
      <section id="plan" className="relative isolate overflow-hidden py-24 text-white sm:py-36">
        <div className="d-drift absolute inset-0 -z-20">
          <Photo picture={pic("new-tower-poster")} sizes="100vw" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(6_41_31/0.95)_10%,rgb(6_41_31/0.75)_55%,rgb(6_41_31/0.45))]" />
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="reveal min-w-0 lg:col-span-6">
            <h2 className="max-w-[12ch] font-display text-[clamp(2.75rem,1.2rem+4.4vw,5rem)] leading-[0.98] font-bold tracking-[-0.045em]">
              {enquiry.heading}
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg text-white/80">{enquiry.support}</p>
          </div>
          <div className="reveal min-w-0 lg:col-span-6">
            <div className="rounded-[2rem] bg-white/10 p-1.5 ring-1 ring-white/20">
              <div className="rounded-[calc(2rem-0.375rem)] bg-surface p-5 text-ink sm:p-8">
                <LabForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
