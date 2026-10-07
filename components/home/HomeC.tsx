import Image from "next/image";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { FirstAidIcon } from "@phosphor-icons/react/dist/ssr/FirstAid";
import { GlobeHemisphereEastIcon } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereEast";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { Container } from "@/components/ui/Container";
import { handledIcons } from "@/components/ui/HandledIcon";
import { global as content } from "@/content/countries";
import { site } from "@/content/site";
import { dialCodesFor, defaultIso } from "@/content/dial-codes";
import { getHospitalsBySlugs, getSpecialities, nameOf } from "@/lib/catalog";
import { EnquiryForm } from "@/components/form/EnquiryForm";

/**
 * Home page: precise and structured.
 * A deep green hero on a faint grid, the photo framed as a panel, then
 * numbered sections on hairlines: label on the left, content on the right.
 */
function Block({
  id,
  heading,
  intro,
  tone = "",
  stacked = false,
  children,
}: {
  id: string;
  heading: string;
  intro?: string;
  tone?: string;
  /** Heading above the content instead of beside it, for content wide
   *  enough to fill the page on its own. */
  stacked?: boolean;
  children: React.ReactNode;
}) {
  if (stacked) {
    return (
      <section id={id} className={`scroll-mt-24 border-t border-hairline py-20 sm:py-24 ${tone}`}>
        <Container>
          <div className="reveal grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h2 className="display-2 max-w-[16ch] lg:col-span-6">{heading}</h2>
            {intro ? <p className="max-w-[40ch] text-lg text-ink-2 lg:col-span-5 lg:col-start-8">{intro}</p> : null}
          </div>
          <div className="mt-12 min-w-0">{children}</div>
        </Container>
      </section>
    );
  }
  return (
    <section id={id} className={`scroll-mt-24 border-t border-hairline py-20 sm:py-24 ${tone}`}>
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 className="display-2 max-w-[14ch]">{heading}</h2>
          {intro ? <p className="mt-5 max-w-[36ch] text-lg text-ink-2">{intro}</p> : null}
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </Container>
    </section>
  );
}

export async function HomeC() {
  const { hero, trust, howItWorks, hospitals, handled, countryInfo, faq, enquiry } = content;
  const cards = await featuredHospitals();
  const gallery = (cards[0]?.hospital.gallery ?? []).filter((p) => !p.pending && p.src).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="band-deep relative isolate overflow-hidden text-white">
        <div
          aria-hidden
          className="home-grid-pan absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_75%)]"
        />
        <Container className="home-hero-copy grid gap-8 py-9 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12">
          <div className="min-w-0 lg:col-span-7">
            <h1 className="hero-rise display max-w-[22ch] text-[clamp(2rem,1.4rem+2.4vw,3.125rem)] [animation-delay:80ms]">{hero.headline}</h1>
            <p className="hero-rise mt-4 max-w-[46ch] text-lg text-white/75 [animation-delay:160ms]">{hero.support}</p>
            <ul className="hero-rise mt-6 space-y-2 [animation-delay:240ms]">
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
              <HomeForm compact />
            </div>
          </div>
        </Container>

        {/* Photo that opens out from the text column to the full width of the
            screen as you scroll. Along its foot, the practical side of the trip
            that Medsafar takes off your hands. */}
        <div className="hero-rise [animation-delay:400ms]">
          <div className="home-expand relative overflow-hidden">
            <div className="relative aspect-[4/3] sm:aspect-[5/2] lg:aspect-[3/1]">
              {hero.picture.src ? (
                <Image src={hero.picture.src} alt={hero.picture.alt} fill priority sizes="100vw" className="object-cover" />
              ) : null}
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-deep via-deep/40 to-transparent md:via-deep/20" />
            </div>
            <div className="bg-deep md:absolute md:inset-x-0 md:bottom-0 md:bg-transparent">
              <Container className="pt-6 pb-10 md:pt-0 md:pb-8">
                <p className="max-w-[34ch] text-xl font-medium tracking-[-0.01em] text-white md:text-2xl">
                  {handled.intro}
                </p>
                <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3">
                  {handled.items.map((item) => {
                    const Glyph = handledIcons[item.icon];
                    return (
                      <li key={item.title} className="flex items-center gap-2 text-sm text-white/85 md:text-base">
                        <Glyph size={18} className="shrink-0 text-glow" aria-hidden />
                        {item.title}
                      </li>
                    );
                  })}
                </ul>
              </Container>
            </div>
          </div>
        </div>
      </section>

      <Block id="how-it-works" heading={howItWorks.heading} intro={howItWorks.intro}>
        <ol className="relative">
          <span aria-hidden className="absolute start-10 top-8 bottom-8 w-px bg-hairline sm:start-12">
            <span className="home-line-fill absolute inset-0 bg-brand" />
          </span>
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="home-focus relative grid grid-cols-[3rem_1fr] gap-5 rounded-lg p-4 sm:gap-7 sm:p-6">
              <span className="home-pop relative grid size-12 place-items-center rounded-full bg-surface font-mono text-sm text-accent ring-1 ring-line">
                0{i + 1}
              </span>
              <div className="reveal pt-2.5">
                <h3 className="text-xl font-medium tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-2 max-w-[52ch] text-base text-ink-2">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="what-we-handle" heading={handled.heading} intro={handled.intro} tone="bg-surface-2" stacked>
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
                {i === 0 ? (
                  <VisaPapers />
                ) : (
                  <span
                    className={`home-pop grid size-11 place-items-center rounded-md ${
                      i === 2 ? "bg-white/15" : "bg-accent text-accent-ink"
                    }`}
                  >
                    <Glyph size={22} aria-hidden />
                  </span>
                )}
                <h3 className={`font-medium tracking-[-0.02em] ${i === 0 ? "mt-auto pt-10 text-3xl" : "mt-6 text-lg"}`}>{item.title}</h3>
                <p className={`mt-2 max-w-[46ch] text-base ${muted}`}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Block>

      <Block id="hospitals" heading={hospitals.heading} intro={hospitals.intro}>
        <div className="grid gap-5">
          {cards.map(({ hospital, specialities }) => (
            <HospitalCard key={hospital.slug} hospital={hospital} specialities={specialities} feature sizes="(min-width: 1024px) 60vw, 100vw" />
          ))}
        </div>
        {gallery.length ? (
          <div className="mt-5 overflow-hidden rounded-lg">
            <div className="home-pan flex w-max gap-4">
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

      <Block id="country-info" heading={countryInfo.heading} intro={countryInfo.intro} tone="bg-surface-2">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="reveal rounded-lg border border-hairline bg-surface p-7 md:col-span-2">
            <h3 className="text-lg font-medium">{countryInfo.visa.heading}</h3>
            <ol className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
              {countryInfo.visa.steps.map((step, i) => (
                <li key={i} className="reveal flex gap-3">
                  <span className="home-pop font-mono text-sm text-accent">0{i + 1}</span>
                  <p className="text-base text-ink-2">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 border-t border-hairline pt-5 text-sm text-ink-3">{countryInfo.visa.note}</p>
          </div>
          {[countryInfo.flights, countryInfo.language].map((block) => (
            <div key={block.heading} className="reveal rounded-lg border border-hairline bg-surface p-7">
              <h3 className="text-lg font-medium">{block.heading}</h3>
              <p className="mt-3 text-base text-ink-2">{block.body}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="faq" heading={faq.heading}>
        <div className="reveal divide-y divide-hairline border-y border-hairline">
          {faq.items.map((item, i) => (
            <details key={i} className="group accordion">
              <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 text-lg font-medium hover:text-accent">
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
            <h2 className="display-2 max-w-[16ch]">{enquiry.heading}</h2>
            <p className="mt-6 max-w-[46ch] text-lg text-white/75">{enquiry.support}</p>
          </div>
          <div className="reveal min-w-0 rounded-xl bg-surface p-5 text-ink sm:p-7 lg:col-span-6">
            <HomeForm />
          </div>
        </Container>
      </section>
    </>
  );
}

/**
 * Drawing for the medical visa tile: the hospital's invitation letter, stamped
 * and signed, resting on a passport. Built from markup, so it stays sharp and
 * costs no download. Decorative only.
 */
function VisaPapers() {
  const line = "block h-1.5 rounded-full bg-ink/10";
  return (
    <div aria-hidden className="relative mx-auto h-56 w-full max-w-md select-none sm:h-64">
      <div className="home-float-late absolute start-[6%] top-8 flex aspect-[5/7] w-36 -rotate-8 flex-col items-center justify-between rounded-lg bg-[#0d4a3a] px-4 py-5 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/15 sm:w-40">
        <span className="text-[0.625rem] font-medium tracking-[0.25em] text-glow/80 uppercase">Passport</span>
        <GlobeHemisphereEastIcon size={52} weight="thin" className="text-glow/70" />
        <span className="h-1 w-12 rounded-full bg-glow/30" />
      </div>

      <div className="home-float absolute end-[4%] top-0 w-60 rotate-3 rounded-md bg-white p-5 text-ink shadow-[0_32px_60px_-24px_rgb(0_0_0/0.7)] sm:w-68">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-sm bg-accent text-white">
            <FirstAidIcon size={14} weight="bold" />
          </span>
          <span className="h-1.5 w-20 rounded-full bg-ink/15" />
          <span className="ms-auto h-1.5 w-10 rounded-full bg-ink/10" />
        </div>
        <p className="mt-4 text-[0.75rem] leading-snug font-semibold tracking-[-0.01em]">
          Invitation letter for medical treatment
        </p>
        <div className="mt-3 space-y-2">
          <span className={`${line} w-full`} />
          <span className={`${line} w-[92%]`} />
          <span className={`${line} w-[96%]`} />
          <span className={`${line} w-[60%]`} />
        </div>
        <div className="mt-5 flex items-end justify-between">
          <svg viewBox="0 0 90 30" className="h-7 w-20 text-ink/70" fill="none">
            <path
              d="M2 22c6-10 10-16 14-12s-6 14 0 12 9-14 14-12 1 12 6 11 7-9 11-8 2 7 7 6 8-6 12-5 6 3 10 2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="grid size-16 -rotate-12 place-items-center rounded-full border-2 border-accent/70 text-center text-[0.5625rem] leading-tight font-bold tracking-[0.12em] text-accent uppercase">
            Visa
            <br />
            ready
          </span>
        </div>
      </div>
    </div>
  );
}

function HomeForm({ compact = false }: { compact?: boolean }) {
  return (
    <EnquiryForm
      text={site.form}
      dialCodes={dialCodesFor(null)}
      defaultIso={defaultIso}
      defaultCountry=""
      source="/"
      compact={compact}
    />
  );
}

async function featuredHospitals() {
  const [cards, specialities] = await Promise.all([
    getHospitalsBySlugs(content.hospitals.featured),
    getSpecialities(),
  ]);
  return cards.map((hospital) => ({
    hospital,
    specialities: hospital.specialities.map((s) => nameOf(specialities, s)).join(", "),
  }));
}
