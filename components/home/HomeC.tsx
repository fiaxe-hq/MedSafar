import Image from "next/image";
import Link from "@/components/ui/Link";
import { AirplaneTiltIcon } from "@phosphor-icons/react/dist/ssr/AirplaneTilt";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { CalendarCheckIcon } from "@phosphor-icons/react/dist/ssr/CalendarCheck";
import { ChatsCircleIcon } from "@phosphor-icons/react/dist/ssr/ChatsCircle";
import { HospitalIcon } from "@phosphor-icons/react/dist/ssr/Hospital";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { FileTextIcon } from "@phosphor-icons/react/dist/ssr/FileText";
import { ReceiptIcon } from "@phosphor-icons/react/dist/ssr/Receipt";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr/SealCheck";
import { StethoscopeIcon } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import { TranslateIcon } from "@phosphor-icons/react/dist/ssr/Translate";
import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr/UserCircle";
import { DoctorFeature } from "@/components/catalog/DoctorFeature";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { specialityPhoto } from "@/data/treatmentPhotos";
import { showUpcoming } from "@/lib/preview";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { FirstAidIcon } from "@phosphor-icons/react/dist/ssr/FirstAid";
import { GlobeHemisphereEastIcon } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereEast";
import { HospitalCard } from "@/components/catalog/HospitalCard";
import { HospitalCarousel } from "@/components/catalog/HospitalCarousel";
import { BodyPicker, FinderSearch } from "@/components/catalog/TreatmentFinder";
import { Container } from "@/components/ui/Container";
import { TrustFigures } from "@/components/home/TrustFigures";
import { handledIcons } from "@/components/ui/HandledIcon";
import { btnPrimary, eyebrow } from "@/components/ui/styles";
import { getText } from "@/lib/i18n/text";
import { finderWords, type Text } from "@/lib/i18n/source";
import { defaultIso } from "@/content/dial-codes";
import { getDialCodes } from "@/lib/i18n/dialCodes";
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
      <section
        id={id}
        className={`scroll-mt-24 border-t border-hairline py-14 sm:py-24 ${tone}`}
      >
        <Container>
          <div className="reveal grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="display-2 max-w-[16ch]">{heading}</h2>
            </div>
            {intro ? (
              <p className="max-w-[40ch] text-lg text-ink-2 lg:col-span-5 lg:col-start-8">
                {intro}
              </p>
            ) : null}
          </div>
          {bleed ? null : <div className="mt-12 min-w-0">{children}</div>}
        </Container>
        {bleed ? <div className="reveal mt-9">{children}</div> : null}
      </section>
    );
  }
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-hairline py-14 sm:py-24 ${tone}`}
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 className="display-2 max-w-[14ch]">{heading}</h2>
          {intro ? (
            <p className="mt-5 max-w-[36ch] text-lg text-ink-2">{intro}</p>
          ) : null}
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
      <ArrowRightIcon
        size={16}
        className="transition-[translate] duration-300 group-hover:translate-x-1 rtl:rotate-180"
        aria-hidden
      />
    </Link>
  );
}

/** `place` is the visitor's country; it only changes the hero photo. */
export async function HomeC({ place }: { place: string }) {
  const text = await getText();
  const { home, site, global: content } = text;
  const { hero, hospitals, countryInfo, faq, enquiry } = content;
  const { journey, treatment, compare, opinion, visa, travel, aftercare } =
    home;
  const picture = (text.places.find((p) => p.slug === place) ?? text.places[0])
    .picture;
  const [cards, doctors, finder] = await Promise.all([
    featuredHospitals(content.hospitals.featured),
    featuredDoctors(home.doctors.featured),
    finderData(),
  ]);

  return (
    <>
      {/* Hero */}
      {/* The photo fills the first screen, behind the header. The intro opens
          on it alone; the form, the line along its foot and the header then
          come in (see components/site/Intro.tsx). */}
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-deep text-white">
        <h1 className="sr-only">{hero.headline}</h1>
        {picture.src ? (
          <Image
            src={picture.src}
            alt={picture.alt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
            style={picture.focus ? { objectPosition: picture.focus } : undefined}
          />
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-t from-deep via-deep/45 to-deep/10 md:bg-linear-to-r md:from-deep/75 md:via-deep/15 md:to-deep/45"
        />

        {/* Room above for the header; on phones, below for the fixed bar. */}
        <Container className="grid gap-8 pt-28 pb-28 md:grid-cols-[1fr_22rem] md:items-end md:pb-12 lg:grid-cols-[1fr_25rem] lg:pt-36 lg:pb-14">
          <div data-intro-fade className="order-2 min-w-0 md:order-1">
            <p className="max-w-[34ch] text-xl font-medium tracking-[-0.01em] text-white md:text-2xl">
              {journey.strip}
            </p>
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
          </div>
          <div
            data-intro-pop
            className="order-1 w-full min-w-0 rounded-xl bg-surface p-5 text-ink shadow-[0_30px_60px_-20px_rgb(2_20_16/0.6)] sm:p-6 md:order-2 md:self-center lg:p-7"
          >
            <HomeForm site={site} compact />
          </div>
        </Container>
      </section>

      {/* The four things most visitors came for, straight under the photo.
          The last one, the free opinion, is the one we most want picked. */}
      <section aria-labelledby="quick-heading" className="bg-surface-2 py-10 sm:py-12">
        <Container>
          <h2 id="quick-heading" className="sr-only">
            {home.quick.heading}
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {home.quick.items.map((item) => {
              const Glyph = quickIcons[item.icon];
              const lead = item.icon === "opinion";
              return (
                <li
                  key={item.title}
                  className="reveal min-w-0"
                >
                  <Link
                    href={item.href}
                    className={`group flex h-full flex-col items-start gap-3 rounded-xl p-4 transition-[background-color,box-shadow,translate] duration-300 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-4 sm:p-5 ${
                      lead
                        ? "relative bg-surface text-ink ring-[3px] ring-accent hover:shadow-lift"
                        : "border border-hairline bg-surface text-ink hover:border-line hover:shadow-lift"
                    }`}
                  >
                    <span
                      className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white sm:size-14"
                    >
                      <Glyph size={26} aria-hidden />
                    </span>
                    {lead ? (
                      <span className="absolute -top-3 end-4 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold tracking-wide text-white uppercase">
                        {home.quick.free}
                      </span>
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block text-base leading-snug font-semibold sm:text-lg">
                        {item.title}
                      </span>
                      <span className={`mt-0.5 block text-sm text-ink-3`}>
                        {item.body}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Proof figures from /admin/stats; nothing shows until some are published. */}
      <TrustFigures />

      {/* The nine steps at a glance. Each one leads to its own section below. */}
      <Block
        id="journey"
        heading={journey.heading}
        intro={journey.intro}
        stacked
      >
        <div className="space-y-8">
          {journey.phases.map((phase, p) => (
            <div key={phase.name}>
              <p className={eyebrow}>{phase.name}</p>
              <ol className="mt-3 grid gap-3 sm:grid-cols-3 sm:gap-4">
                {phase.steps.map((step, i) => {
                  const n = p * 3 + i;
                  return (
                    <li key={step.title} className="reveal min-w-0">
                      <a
                        href={step.href}
                        className="group flex h-full items-center gap-4 overflow-hidden rounded-lg border border-hairline bg-surface p-3 transition-[border-color,box-shadow] duration-300 hover:border-line hover:shadow-lift sm:block sm:p-0"
                      >
                        <span className="relative block size-20 shrink-0 overflow-hidden rounded-md bg-surface-2 sm:aspect-[3/2] sm:size-auto sm:rounded-none">
                          <Image
                            src={stepPhotos[n]}
                            alt=""
                            fill
                            sizes="(min-width: 1280px) 400px, (min-width: 640px) 33vw, 80px"
                            className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.05]"
                          />
                          <span className="absolute start-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 font-mono text-xs text-accent shadow-sm sm:start-3 sm:top-3 sm:size-9 sm:text-sm">
                            {num(n + 1)}
                          </span>
                        </span>
                        <span className="block min-w-0 sm:p-4">
                          <span className="block text-lg leading-snug font-medium tracking-[-0.01em] transition-colors group-hover:text-accent">
                            {step.title}
                          </span>
                          <span className="mt-1 block text-sm text-ink-3">
                            {step.body}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </Block>

      {/* Step 01 */}
      <Block
        id="treatment"
        heading={treatment.heading}
        intro={treatment.intro}
        tone="bg-surface-2"
        stacked
      >
        <div className="reveal grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-2 lg:gap-6">
          <FinderSearch
            treatments={finder.treatments}
            types={finder.types}
            base="/treatments"
            words={finderWords(text)}
          />
          <BodyPicker
            treatments={finder.treatments}
            words={finderWords(text)}
          />
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-medium tracking-[-0.01em]">
            {treatment.browse}
          </h3>
          <ul className="rail mt-4 grid grid-cols-2 gap-x-3 gap-y-5 [--rail-item:42%] sm:grid-cols-4 lg:grid-cols-8">
            {finder.types.map((slug) => {
              const photo = specialityPhoto(slug);
              return (
                <li key={slug} className="reveal min-w-0">
                  {/* The photo keeps its own 3:2 shape, so nothing is cut;
                      the name sits under it. */}
                  <Link href={`/treatments#${slug}`} className="group block">
                    <span className="relative block aspect-[3/2] overflow-hidden rounded-lg bg-surface-2">
                      {photo?.src ? (
                        <Image
                          src={photo.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 12vw, (min-width: 640px) 24vw, 48vw"
                          className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.06]"
                        />
                      ) : null}
                    </span>
                    <span className="mt-2 flex items-start gap-1.5 text-sm leading-tight font-medium text-ink transition-colors group-hover:text-accent">
                      <SpecialityIcon
                        slug={slug}
                        size={16}
                        className="mt-px shrink-0 text-accent"
                        aria-hidden
                      />
                      {text.plainSpeciality[slug] ?? slug}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-8">
          <More href="/treatments">{treatment.all}</More>
        </div>
      </Block>

      {/* Step 02 */}
      {doctors.length ? (
        <Block
          id="specialist"
          heading={home.doctors.heading}
          intro={home.doctors.intro}
          stacked
        >
          <ul className="rail grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
      <Block
        id="hospitals"
        heading={compare.heading}
        intro={compare.intro}
        tone="bg-surface-2"
        stacked
        bleed
      >
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
        <Block
          id="how-we-choose"
          heading={home.selection.heading}
          intro={home.selection.intro}
        >
          <ul className="rail grid gap-4 sm:grid-cols-2">
            {home.selection.items.map((item, i) => {
              const Glyph = selectionIcons[i] ?? SealCheckIcon;
              return (
                <li
                  key={item.title}
                  className="group reveal relative isolate overflow-hidden rounded-lg border border-hairline bg-surface p-5 sm:p-7"
                >
                  {selectionPhotos[i] ? (
                    // A faded photo along the card's far side, behind the words.
                    <span
                      aria-hidden
                      className="absolute inset-y-0 end-0 -z-10 hidden w-[62%] sm:block opacity-[0.3] grayscale-[25%] transition-opacity duration-500 ease-(--ease-soft) [mask-image:linear-gradient(to_right,transparent,black_75%)] group-hover:opacity-[0.4] rtl:[mask-image:linear-gradient(to_left,transparent,black_75%)]"
                    >
                      <Image
                        src={selectionPhotos[i]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 60vw"
                        className="object-cover"
                      />
                    </span>
                  ) : null}
                  <span className="home-pop grid size-11 place-items-center rounded-md bg-accent-soft text-accent">
                    <Glyph size={22} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base text-ink-2">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </Block>
      ) : null}

      {/* Steps 04 and 05 */}
      <Block
        id="opinion"
        heading={opinion.heading}
        intro={opinion.intro}
        tone="bg-surface-2"
      >
        <ul className="rail grid gap-4 [--rail-item:85%] md:grid-cols-2">
          {opinion.items.map((item, i) => {
            const Glyph = i === 0 ? StethoscopeIcon : ReceiptIcon;
            return (
              <li
                key={item.title}
                className="reveal flex flex-col overflow-hidden rounded-lg border border-hairline bg-surface"
              >
                <div className="relative aspect-[3/2] bg-surface-2">
                  <Image
                    src={stepPhotos[3 + i]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute start-4 bottom-4 grid size-11 place-items-center rounded-md bg-accent text-accent-ink">
                    <Glyph size={22} aria-hidden />
                  </span>
                  <span className="absolute end-4 top-3 font-mono text-3xl text-white drop-shadow">
                    {num(4 + i)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base text-ink-2">{item.body}</p>
                </div>
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
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-2">
          <div className="band-deep reveal relative isolate hidden items-center overflow-hidden rounded-lg p-7 sm:flex">
            <VisaPapers words={visa.papers} />
          </div>
          <div className="reveal rounded-lg border border-hairline bg-surface p-5 sm:p-7">
            <h3 className="text-lg font-medium">{countryInfo.visa.heading}</h3>
            <ol className="mt-5 space-y-4">
              {countryInfo.visa.steps.map((line, i) => (
                <li key={i} className="flex gap-3">
                  <span className="home-pop font-mono text-sm text-accent">
                    {num(i + 1)}
                  </span>
                  <p className="text-base text-ink-2">{line}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 border-t border-hairline pt-5 text-sm text-ink-3">
              {countryInfo.visa.note}
            </p>
          </div>
        </div>
      </Block>

      {/* Steps 07 and 08 */}
      <Block
        id="travel"
        heading={travel.heading}
        intro={travel.intro}
        tone="bg-surface-2"
        stacked
      >
        <ul className="rail grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {travel.items.map((item) => {
            const Glyph = travelIcons[item.icon];
            return (
              <li
                key={item.title}
                className="reveal flex flex-col overflow-hidden rounded-lg border border-hairline bg-surface"
              >
                <div className="relative aspect-[3/2] bg-surface-2">
                  <Image
                    src={travelPhotos[item.icon]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute start-4 bottom-4 grid size-10 place-items-center rounded-md bg-accent text-accent-ink">
                    <Glyph size={20} aria-hidden />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base text-ink-2">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Block>

      {/* Step 09 */}
      <section
        id="aftercare"
        className="band-deep relative isolate scroll-mt-24 overflow-hidden py-14 text-white sm:py-24"
      >
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="reveal min-w-0 lg:col-span-5">
            <h2 className="display-2 max-w-[14ch]">{aftercare.heading}</h2>
            <p className="mt-5 max-w-[36ch] text-lg text-white/75">
              {aftercare.intro}
            </p>
          </div>
          <ul className="grid min-w-0 gap-3 sm:grid-cols-2 lg:col-span-7">
            {aftercare.items.map((item) => (
              <li
                key={item}
                className="reveal flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10 sm:p-5"
              >
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
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-4 py-4 text-base font-medium hover:text-accent sm:grid-cols-[2.5rem_1fr_auto] sm:py-5 sm:text-lg">
                <span className="hidden font-mono text-sm font-normal text-ink-3 sm:inline">
                  {num(i + 1)}
                </span>
                {item.question}
                <span
                  aria-hidden
                  className="font-mono text-ink-3 transition-[rotate] duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[64ch] pb-5 text-base text-ink-2 sm:ps-14 sm:pb-6">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Block>

      {/* Closing form */}
      <section
        id="plan"
        className="band-deep relative isolate scroll-mt-24 overflow-hidden py-14 text-white sm:py-28"
      >
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="reveal min-w-0 lg:col-span-6">
            <h2 className="display-2 max-w-[16ch]">{enquiry.heading}</h2>
            <p className="mt-6 max-w-[46ch] text-lg text-white/75">
              {enquiry.support}
            </p>
          </div>
          <div id="reports" className="reveal min-w-0 scroll-mt-28 rounded-xl bg-surface p-5 text-ink sm:p-7 lg:col-span-6">
            <HomeForm site={site} />
          </div>
        </Container>
      </section>
    </>
  );
}

/** One photo per journey step, in order. Stock photos illustrate the step;
 *  the hospital photo is Nanavati Max's own. */
const stepPhotos = [
  "/photos/journey/find.jpg",
  "/photos/care/consult.jpg",
  "/photos/hospitals/nanavati-max/lobby.jpg",
  "/photos/care/mri.jpg",
  "/photos/journey/estimate.jpg",
  "/photos/journey/visa.jpg",
  "/photos/journey/flight.jpg",
  "/photos/journey/reception.jpg",
  "/photos/journey/followup.jpg",
];

const quickIcons = {
  treatment: MagnifyingGlassIcon,
  doctor: StethoscopeIcon,
  hospital: HospitalIcon,
  opinion: FileTextIcon,
} as const;

/** A photo for each travel item, by its icon key. */
const travelPhotos = {
  flight: "/photos/journey/flight.jpg",
  pickup: "/photos/journey/pickup.jpg",
  stay: "/photos/journey/hotel.jpg",
  manager: "/photos/journey/reception.jpg",
  interpreter: "/photos/care/bedside.jpg",
  dates: "/photos/journey/estimate.jpg",
} as const;

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
  const [treatments, specialities] = await Promise.all([
    getTreatments(),
    getSpecialities(),
  ]);
  return {
    treatments: treatments.map((t) => ({
      slug: t.slug,
      name: t.name,
      speciality: t.speciality,
      summary: t.summary,
    })),
    types: specialities
      .filter((sp) => treatments.some((t) => t.speciality === sp.slug))
      .map((sp) => sp.slug),
  };
}

/**
 * Drawing for the medical visa tile: the hospital's invitation letter, stamped
 * and signed, resting on a passport. Built from markup, so it stays sharp and
 * costs no download. Decorative only.
 */
function VisaPapers({ words }: { words: Text["home"]["visa"]["papers"] }) {
  const line = "block h-1.5 rounded-full bg-ink/10";
  return (
    <div
      aria-hidden
      className="relative mx-auto h-56 w-full max-w-md select-none sm:h-64"
    >
      <div className="home-float-late absolute start-[6%] top-8 flex aspect-[5/7] w-36 -rotate-8 flex-col items-center justify-between rounded-lg bg-[#0d4a3a] px-4 py-5 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/15 sm:w-40">
        <span className="text-[0.625rem] font-medium tracking-[0.25em] text-glow/80 uppercase">
          {words.passport}
        </span>
        <GlobeHemisphereEastIcon
          size={52}
          weight="thin"
          className="text-glow/70"
        />
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
          {words.letter}
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
            {words.stamp}
          </span>
        </div>
      </div>
    </div>
  );
}

async function HomeForm({
  site,
  compact = false,
}: {
  site: Text["site"];
  compact?: boolean;
}) {
  return (
    <EnquiryForm
      text={site.form}
      dialCodes={await getDialCodes(null)}
      defaultIso={defaultIso}
      defaultCountry=""
      source="/"
      compact={compact}
    />
  );
}

/** One per item in content/home.ts, in the same order. */
/** Photos behind the "How we choose" cards, in the order of the cards. */
const selectionPhotos = [
  "/photos/care/consult.jpg",
  "/photos/hospitals/nanavati-max/critical-care.jpg",
  "/photos/care/lab.jpg",
  "/photos/hospitals/nanavati-max/international-lounge.jpg",
  "/photos/journey/estimate.jpg",
  "/photos/hospitals/nanavati-max/private-room.jpg",
];

const selectionIcons = [
  StethoscopeIcon,
  HospitalIcon,
  SealCheckIcon,
  TranslateIcon,
  ReceiptIcon,
  ChatsCircleIcon,
];

async function featuredDoctors(featured: string[]) {
  const [doctors, specialities, hospitals] = await Promise.all([
    getDoctorsBySlugs(featured),
    getSpecialities(),
    getHospitals(),
  ]);
  return doctors.map((doctor) => ({
    doctor,
    speciality: nameOf(specialities, doctor.speciality),
    hospital: nameOf(hospitals, doctor.hospital),
  }));
}

async function featuredHospitals(featured: string[]) {
  const [cards, specialities] = await Promise.all([
    getHospitalsBySlugs(featured),
    getSpecialities(),
  ]);
  return cards.map((hospital) => ({
    hospital,
    specialities: hospital.specialities
      .map((s) => nameOf(specialities, s))
      .join(", "),
  }));
}
