import Image from "next/image";
import Link from "next/link";
import { AirplaneTiltIcon } from "@phosphor-icons/react/dist/ssr/AirplaneTilt";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { CalendarCheckIcon } from "@phosphor-icons/react/dist/ssr/CalendarCheck";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr/ChatsCircle";
import { HospitalIcon } from "@phosphor-icons/react/dist/ssr/Hospital";
import { ReceiptIcon } from "@phosphor-icons/react/dist/ssr/Receipt";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr/SealCheck";
import { StethoscopeIcon } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr/Translate";
import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr/UserCircle";
import { DoctorFeature } from "@/components/catalog/DoctorFeature";
import { home } from "@/content/home";
import { showUpcoming } from "@/lib/preview";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { FirstAidIcon } from "@phosphor-icons/react/dist/ssr/FirstAid";
import { GlobeHemisphereEastIcon } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereEast";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { HospitalCarousel } from "@/components/catalog/HospitalCarousel";
import { BodyPicker, FinderSearch } from "@/components/catalog/TreatmentFinder";
import { Container } from "@/components/ui/Container";
import { handledIcons } from "@/components/ui/HandledIcon";
import { btnPrimary, eyebrow } from "@/components/ui/styles";
import { global as content } from "@/content/countries";
import { site } from "@/content/site";
import { dialCodesFor, defaultIso } from "@/content/dial-codes";
import {
  getDoctorsBySlugs,
  getHospitals,
  getHospitalsBySlugs,
  getSpecialities,
  getTreatments,
  nameOf,
} from "@/lib/catalog";
import { EnquiryForm } from "@/components/form/EnquiryForm";

/**
 * Home page: the patient's journey in nine steps.
 * A deep green hero, then the nine steps at a glance, then one section per
 * step (or pair of steps) in the same order, each labelled with its number.
 */
function Block({
  id,
  heading,
  intro,
  tone = "",
  stacked = false,
  bleed = false,
  children,
}: {
  id: string;
  heading: string;
  intro?: string;
  tone?: string;
  /** Heading above the content instead of beside it, for content wide
   *  enough to fill the page on its own. */
  stacked?: boolean;
  /** With `stacked`: the content runs the full width of the screen and
   *  lines itself up with the page edge. */
  bleed?: boolean;
  children: React.ReactNode;
}) {
  if (stacked) {
    return (
      <section id={id} className={`scroll-mt-24 border-t border-hairline py-20 sm:py-24 ${tone}`}>
        <Container>
          <div className="reveal grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="display-2 max-w-[16ch]">{heading}</h2>
            </div>
            {intro ? <p className="max-w-[40ch] text-lg text-ink-2 lg:col-span-5 lg:col-start-8">{intro}</p> : null}
          </div>
          {bleed ? null : <div className="mt-12 min-w-0">{children}</div>}
        </Container>
        {bleed ? <div className="reveal mt-9">{children}</div> : null}
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

/** Two-digit step number, for example "04". */
const num = (n: number) => String(n).padStart(2, "0");

function More({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-hover"
    >
      {children}
      <ArrowRightIcon size={16} className="transition-[translate] duration-300 group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
    </Link>
  );
}

export async function HomeC() {
  const { hero, trust, hospitals, countryInfo, faq, enquiry } = content;
  const { journey, treatment, compare, opinion, visa, travel, aftercare } = home;
  const [cards, doctors, finder] = await Promise.all([featuredHospitals(), featuredDoctors(), finderData()]);

  return (
    <>
      {/* Hero */}
      {/* The top padding runs the green up behind the header. */}
      <section className="band-deep relative isolate overflow-hidden pt-16 text-white">
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
            screen as you scroll. Along its foot, the journey's three phases. */}
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
                <p className="max-w-[34ch] text-xl font-medium tracking-[-0.01em] text-white md:text-2xl">{journey.strip}</p>
                <ol className="mt-4 flex flex-wrap items-center gap-3">
                  {journey.phases.map((phase, i) => (
                    <li key={phase.name} className="flex items-center gap-3">
                      <a
                        href="#journey"
                        className="flex min-h-11 items-center rounded-full bg-white/10 px-5 text-sm text-white/90 ring-1 ring-white/15 backdrop-blur-sm transition-colors hover:bg-white/20 md:text-base"
                      >
                        {phase.name}
                      </a>
                      {i < journey.phases.length - 1 ? (
                        <ArrowRightIcon size={16} className="shrink-0 text-glow/70 rtl:rotate-180" aria-hidden />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </Container>
            </div>
          </div>
        </div>
      </section>

      {/* The nine steps at a glance. Each one leads to its own section below. */}
      <Block id="journey" heading={journey.heading} intro={journey.intro}>
        <div className="space-y-10">
          {journey.phases.map((phase, p) => (
            <div key={phase.name}>
              <p className={`${eyebrow} ps-4 sm:ps-6`}>{phase.name}</p>
              <ol className="relative mt-2">
                <span aria-hidden className="absolute start-10 top-8 bottom-8 w-px bg-hairline sm:start-12">
                  <span className="home-line-fill absolute inset-0 bg-brand" />
                </span>
                {phase.steps.map((step, i) => (
                  <li key={step.title} className="home-focus relative rounded-lg">
                    <a href={step.href} className="group grid grid-cols-[3rem_1fr] gap-5 p-4 sm:gap-7 sm:p-6">
                      <span className="home-pop relative grid size-12 place-items-center rounded-full bg-surface font-mono text-sm text-accent ring-1 ring-line transition-colors group-hover:bg-accent group-hover:text-white">
                        {num(p * 3 + i + 1)}
                      </span>
                      <span className="reveal block pt-2.5">
                        <span className="flex items-center gap-2 text-xl font-medium tracking-[-0.01em] transition-colors group-hover:text-accent">
                          {step.title}
                          <ArrowRightIcon
                            size={16}
                            className="opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-1 group-hover:opacity-100 rtl:rotate-180"
                            aria-hidden
                          />
                        </span>
                        <span className="mt-2 block max-w-[52ch] text-base text-ink-2">{step.body}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Block>

      {/* Step 01 */}
      <Block id="treatment" heading={treatment.heading} intro={treatment.intro} tone="bg-surface-2" stacked>
        <div className="reveal grid gap-5 lg:grid-cols-2 lg:gap-6">
          <FinderSearch treatments={finder.treatments} types={finder.types} base="/treatments" />
          <BodyPicker treatments={finder.treatments} />
        </div>
        <div className="mt-8">
          <More href="/treatments">{treatment.all}</More>
        </div>
      </Block>

      {/* Step 02 */}
      {doctors.length ? (
        <Block id="specialist" heading={home.doctors.heading} intro={home.doctors.intro} stacked>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map(({ doctor, speciality, hospital }) => (
              <li key={doctor.slug} className="min-w-0">
                <DoctorFeature
                  doctor={doctor}
                  speciality={speciality}
                  hospital={hospital}
                  book={home.doctors.book}
                  profile={home.doctors.profile}
                />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <More href="/doctors">{home.doctors.all}</More>
          </div>
        </Block>
      ) : null}

      {/* Step 03 */}
      <Block id="hospitals" heading={compare.heading} intro={compare.intro} tone="bg-surface-2" stacked bleed>
        <HospitalCarousel
          label={compare.heading}
          note={hospitals.note}
          previous={site.carousel.previous}
          next={site.carousel.next}
        >
          {cards.map(({ hospital, specialities }) => (
            <HospitalCard
              key={hospital.slug}
              hospital={hospital}
              specialities={specialities}
              reveal={false}
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 85vw"
            />
          ))}
        </HospitalCarousel>
        <Container className="mt-6">
          <More href="/hospitals">{compare.all}</More>
        </Container>
      </Block>

      {showUpcoming ? (
        <Block id="how-we-choose" heading={home.selection.heading} intro={home.selection.intro}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {home.selection.items.map((item, i) => {
              const Glyph = selectionIcons[i] ?? SealCheckIcon;
              return (
                <li key={item.title} className="reveal rounded-lg border border-hairline bg-surface p-6 sm:p-7">
                  <span className="home-pop grid size-11 place-items-center rounded-md bg-accent-soft text-accent">
                    <Glyph size={22} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-medium tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-2 text-base text-ink-2">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </Block>
      ) : null}

      {/* Steps 04 and 05 */}
      <Block id="opinion" heading={opinion.heading} intro={opinion.intro} tone="bg-surface-2">
        <ul className="grid gap-4 md:grid-cols-2">
          {opinion.items.map((item, i) => {
            const Glyph = i === 0 ? StethoscopeIcon : ReceiptIcon;
            return (
              <li key={item.title} className="reveal flex flex-col rounded-lg border border-hairline bg-surface p-7">
                <div className="flex items-center justify-between">
                  <span className="home-pop grid size-11 place-items-center rounded-md bg-accent text-accent-ink">
                    <Glyph size={22} aria-hidden />
                  </span>
                  <span className="home-light font-mono text-3xl text-brand">{num(4 + i)}</span>
                </div>
                <h3 className="mt-6 text-xl font-medium tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-2 text-base text-ink-2">{item.body}</p>
              </li>
            );
          })}
        </ul>
        <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#plan" className={btnPrimary}>
            {opinion.cta}
            <ArrowRightIcon size={18} className="rtl:rotate-180" aria-hidden />
          </a>
          <p className="text-base text-ink-2">{opinion.note}</p>
        </div>
      </Block>

      {/* Step 06 */}
      <Block id="visa" heading={visa.heading} intro={visa.intro} stacked>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="band-deep reveal relative isolate flex items-center overflow-hidden rounded-lg p-7">
            <VisaPapers />
          </div>
          <div className="reveal rounded-lg border border-hairline bg-surface p-7">
            <h3 className="text-lg font-medium">{countryInfo.visa.heading}</h3>
            <ol className="mt-5 space-y-4">
              {countryInfo.visa.steps.map((line, i) => (
                <li key={i} className="flex gap-3">
                  <span className="home-pop font-mono text-sm text-accent">{num(i + 1)}</span>
                  <p className="text-base text-ink-2">{line}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 border-t border-hairline pt-5 text-sm text-ink-3">{countryInfo.visa.note}</p>
          </div>
        </div>
      </Block>

      {/* Steps 07 and 08 */}
      <Block id="travel" heading={travel.heading} intro={travel.intro} tone="bg-surface-2" stacked>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {travel.items.map((item) => {
            const Glyph = travelIcons[item.icon];
            return (
              <li key={item.title} className="reveal flex flex-col rounded-lg border border-hairline bg-surface p-7">
                <span className="home-pop grid size-11 place-items-center rounded-md bg-accent-soft text-accent">
                  <Glyph size={22} aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-medium tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-2 text-base text-ink-2">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Block>

      {/* Step 09 */}
      <section id="aftercare" className="band-deep relative isolate scroll-mt-24 overflow-hidden py-20 text-white sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="reveal min-w-0 lg:col-span-5">
            <h2 className="display-2 max-w-[14ch]">{aftercare.heading}</h2>
            <p className="mt-5 max-w-[36ch] text-lg text-white/75">{aftercare.intro}</p>
          </div>
          <ul className="grid min-w-0 gap-3 sm:grid-cols-2 lg:col-span-7">
            {aftercare.items.map((item) => (
              <li key={item} className="reveal flex items-start gap-3 rounded-lg bg-white/5 p-5 ring-1 ring-white/10">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-sm bg-glow/20 text-glow">
                  <CheckIcon size={14} weight="bold" aria-hidden />
                </span>
                <span className="text-base text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Block id="faq" heading={faq.heading}>
        <div className="reveal divide-y divide-hairline border-y border-hairline">
          {faq.items.map((item, i) => (
            <details key={i} className="group accordion">
              <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 text-lg font-medium hover:text-accent">
                <span className="font-mono text-sm font-normal text-ink-3">{num(i + 1)}</span>
                {item.question}
                <span aria-hidden className="font-mono text-ink-3 transition-[rotate] duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-[64ch] ps-14 pb-6 text-base text-ink-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </Block>

      {/* Closing form */}
      <section id="plan" className="band-deep relative isolate scroll-mt-24 overflow-hidden py-20 text-white sm:py-28">
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

const travelIcons = {
  flight: AirplaneTiltIcon,
  pickup: handledIcons.pickup,
  stay: handledIcons.stay,
  manager: UserCircleIcon,
  interpreter: handledIcons.interpreter,
  dates: CalendarCheckIcon,
} as const;

/** The treatment finder's data, built the same way as on the treatments page. */
async function finderData() {
  const [treatments, specialities] = await Promise.all([getTreatments(), getSpecialities()]);
  return {
    treatments: treatments.map((t) => ({
      slug: t.slug,
      name: t.name,
      speciality: t.speciality,
      summary: t.summary.replace(/\s*Draft, to be checked by a doctor before it is published\.$/, ""),
    })),
    types: specialities.filter((sp) => treatments.some((t) => t.speciality === sp.slug)).map((sp) => sp.slug),
  };
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

/** One per item in content/home.ts, in the same order. */
const selectionIcons = [StethoscopeIcon, HospitalIcon, SealCheckIcon, TranslateIcon, ReceiptIcon, ChatsCircleIcon];

async function featuredDoctors() {
  const [doctors, specialities, hospitals] = await Promise.all([
    getDoctorsBySlugs(home.doctors.featured),
    getSpecialities(),
    getHospitals(),
  ]);
  return doctors.map((doctor) => ({
    doctor,
    speciality: nameOf(specialities, doctor.speciality),
    hospital: nameOf(hospitals, doctor.hospital),
  }));
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
