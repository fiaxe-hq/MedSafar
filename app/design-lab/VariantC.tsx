import Image from "next/image";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { Container } from "@/components/ui/Container";
import { handledIcons } from "@/components/ui/HandledIcon";
import { content, featuredHospitals, LabForm } from "./shared";

/**
 * C: Precise and structured (Linear, Stripe).
 * A deep green hero on a faint grid, the photo framed as a panel, then
 * numbered sections on hairlines: label on the left, content on the right.
 */
function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[0.8125rem] tracking-[0.12em] text-accent uppercase">
      <span className="text-ink-3">{n}</span>
      <span aria-hidden className="lab-draw h-px w-8 origin-left bg-brand rtl:origin-right" />
      {children}
    </p>
  );
}

function Block({
  id,
  n,
  label,
  heading,
  intro,
  tone = "",
  children,
}: {
  id: string;
  n: string;
  label: string;
  heading: string;
  intro?: string;
  tone?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-hairline py-20 sm:py-24 ${tone}`}>
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Label n={n}>{label}</Label>
          <h2 className="display-2 mt-5 max-w-[14ch]">{heading}</h2>
          {intro ? <p className="mt-5 max-w-[36ch] text-lg text-ink-2">{intro}</p> : null}
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </Container>
    </section>
  );
}

export async function VariantC() {
  const { hero, trust, howItWorks, hospitals, handled, countryInfo, faq, enquiry } = content;
  const cards = await featuredHospitals();
  const gallery = (cards[0]?.hospital.gallery ?? []).filter((p) => !p.pending && p.src).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="band-deep relative isolate overflow-hidden text-white">
        <div
          aria-hidden
          className="lab-grid-pan absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_75%)]"
        />
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="min-w-0 lg:col-span-7">
            <p className="hero-rise font-mono text-[0.8125rem] tracking-[0.14em] text-glow uppercase">{hero.eyebrow}</p>
            <h1 className="hero-rise display mt-6 max-w-[15ch] [animation-delay:80ms]">{hero.headline}</h1>
            <p className="hero-rise mt-6 max-w-[44ch] text-lg text-white/75 [animation-delay:160ms] sm:text-xl">{hero.support}</p>
            <ul className="hero-rise mt-9 space-y-3 [animation-delay:240ms]">
              {trust.promises.map((promise) => (
                <li key={promise} className="flex items-start gap-3 text-base text-white/85">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm bg-glow/20 text-glow">
                    <CheckIcon size={13} weight="bold" aria-hidden />
                  </span>
                  {promise}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-rise min-w-0 [animation-delay:320ms] lg:col-span-5">
            <div className="rounded-xl bg-surface p-5 text-ink shadow-[0_30px_60px_-20px_rgb(2_20_16/0.6)] sm:p-7">
              <LabForm compact />
            </div>
          </div>
        </Container>

        {/* Photo panel with the five things we handle along its foot */}
        <Container className="pb-16 sm:pb-20">
          <div className="lab-expand relative overflow-hidden rounded-xl ring-1 ring-white/15">
            <div className="relative aspect-[4/3] sm:aspect-[24/9]">
              {hero.picture.src ? (
                <Image src={hero.picture.src} alt={hero.picture.alt} fill priority sizes="100vw" className="object-cover" />
              ) : null}
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-deep/90 via-deep/10 to-transparent" />
            </div>
            <ul className="absolute inset-x-0 bottom-0 hidden grid-cols-5 divide-x divide-white/15 border-t border-white/15 bg-deep/60 backdrop-blur-md md:grid">
              {handled.items.map((item) => {
                const Glyph = handledIcons[item.icon];
                return (
                  <li key={item.title} className="reveal flex items-center gap-2.5 px-5 py-4 text-sm text-white/90">
                    <Glyph size={18} className="shrink-0 text-glow" aria-hidden />
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <Block id="how-it-works" n="01" label="Process" heading={howItWorks.heading} intro={howItWorks.intro}>
        <ol className="relative">
          <span aria-hidden className="absolute start-10 top-8 bottom-8 w-px bg-hairline sm:start-12">
            <span className="lab-line-fill absolute inset-0 bg-brand" />
          </span>
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="lab-focus relative grid grid-cols-[3rem_1fr] gap-5 rounded-lg p-4 sm:gap-7 sm:p-6">
              <span className="lab-pop relative grid size-12 place-items-center rounded-full bg-surface font-mono text-sm text-accent ring-1 ring-line">
                0{i + 1}
              </span>
              <div className="reveal pt-2.5">
                <h3 className="text-xl font-semibold tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-2 max-w-[52ch] text-base text-ink-2">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="what-we-handle" n="02" label="Services" heading={handled.heading} intro={handled.intro} tone="bg-surface-2">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {handled.items.map((item, i) => {
            const Glyph = handledIcons[item.icon];
            const cell = [
              "band-deep relative isolate overflow-hidden text-white sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:p-10",
              "border border-hairline bg-surface lg:col-span-2",
              "bg-accent text-white lg:col-span-2",
              "relative isolate overflow-hidden border border-hairline bg-surface lg:col-span-3",
              "bg-[linear-gradient(135deg,#c8f3e6,var(--accent-soft)_60%)] sm:col-span-2 lg:col-span-3",
            ][i];
            const muted = i === 0 ? "text-white/75" : i === 2 ? "text-white/85" : "text-ink-2";
            return (
              <li key={item.title} className={`reveal flex flex-col rounded-lg p-7 ${cell}`}>
                {i === 3 ? (
                  <Glyph size={180} weight="thin" className="absolute -end-6 -bottom-10 -z-10 text-accent-soft" aria-hidden />
                ) : null}
                <span
                  className={`lab-pop grid place-items-center rounded-md ${
                    i === 0 ? "size-16 bg-glow/15 text-glow" : i === 2 ? "size-11 bg-white/15" : "size-11 bg-accent text-accent-ink"
                  }`}
                >
                  <Glyph size={i === 0 ? 32 : 22} weight={i === 0 ? "light" : "regular"} aria-hidden />
                </span>
                <h3 className={`font-semibold tracking-[-0.02em] ${i === 0 ? "mt-auto pt-16 text-3xl" : "mt-6 text-lg"}`}>{item.title}</h3>
                <p className={`mt-2 max-w-[46ch] text-base ${muted}`}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Block>

      <Block id="hospitals" n="03" label="Network" heading={hospitals.heading} intro={hospitals.intro}>
        <div className="grid gap-5">
          {cards.map(({ hospital, specialities }) => (
            <HospitalCard key={hospital.slug} hospital={hospital} specialities={specialities} feature sizes="(min-width: 1024px) 60vw, 100vw" />
          ))}
        </div>
        {gallery.length ? (
          <div className="mt-5 overflow-hidden rounded-lg">
            <div className="lab-pan flex w-max gap-4">
              {gallery.map((p) => (
                <div key={p.src} className="relative h-40 w-60 shrink-0 overflow-hidden rounded-lg bg-surface-2 sm:h-48 sm:w-72">
                  {p.src ? <Image src={p.src} alt={p.alt} fill sizes="18rem" className="object-cover" /> : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <p className="mt-6 text-sm text-ink-3">{hospitals.note}</p>
      </Block>

      <Block id="country-info" n="04" label="Travel" heading={countryInfo.heading} intro={countryInfo.intro} tone="bg-surface-2">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="reveal rounded-lg border border-hairline bg-surface p-7 md:col-span-2">
            <h3 className="text-lg font-semibold">{countryInfo.visa.heading}</h3>
            <ol className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
              {countryInfo.visa.steps.map((step, i) => (
                <li key={i} className="reveal flex gap-3">
                  <span className="lab-pop font-mono text-sm text-accent">0{i + 1}</span>
                  <p className="text-base text-ink-2">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 border-t border-hairline pt-5 text-sm text-ink-3">{countryInfo.visa.note}</p>
          </div>
          {[countryInfo.flights, countryInfo.language].map((block) => (
            <div key={block.heading} className="reveal rounded-lg border border-hairline bg-surface p-7">
              <h3 className="text-lg font-semibold">{block.heading}</h3>
              <p className="mt-3 text-base text-ink-2">{block.body}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="faq" n="05" label="FAQ" heading={faq.heading}>
        <div className="reveal divide-y divide-hairline border-y border-hairline">
          {faq.items.map((item, i) => (
            <details key={i} className="group accordion">
              <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 text-lg font-semibold hover:text-accent">
                <span className="font-mono text-sm font-normal text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                {item.question}
                <span aria-hidden className="font-mono text-ink-3 transition-[rotate] duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-[64ch] ps-14 pb-6 text-base text-ink-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </Block>

      {/* Closing form */}
      <section id="plan" className="band-deep relative isolate overflow-hidden py-20 text-white sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="reveal min-w-0 lg:col-span-6">
            <p className="font-mono text-[0.8125rem] tracking-[0.14em] text-glow uppercase">06 — Start</p>
            <h2 className="display-2 mt-5 max-w-[16ch]">{enquiry.heading}</h2>
            <p className="mt-6 max-w-[46ch] text-lg text-white/75">{enquiry.support}</p>
          </div>
          <div className="reveal min-w-0 rounded-xl bg-surface p-5 text-ink sm:p-7 lg:col-span-6">
            <LabForm />
          </div>
        </Container>
      </section>
    </>
  );
}
