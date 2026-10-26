import Image from "next/image";
import Link from "@/components/ui/Link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import type { Picture } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Pending";
import { btnPrimary } from "@/components/ui/styles";
import { getText } from "@/lib/i18n/text";

/**
 * Opener for a list or detail page: where you are, what it is, what to do.
 * Optional live counts sit beside the heading, optional links sit under it,
 * and an optional photo opens out to full width as you scroll.
 */
export async function PageHead({
  back,
  heading,
  intro,
  pending = false,
  cta = false,
  tight = false,
  center = false,
  stats,
  children,
  picture,
}: {
  back?: { href: string; label: string };
  heading: string;
  intro?: string;
  pending?: boolean;
  cta?: boolean;
  /** Less space below, for a page that follows with a picture. */
  tight?: boolean;
  center?: boolean;
  /** Short counts shown beside the heading. */
  stats?: { value: number; label: string }[];
  /** Shown under the intro, for links such as jump-to chips. */
  children?: React.ReactNode;
  /** A photo under the heading that opens out as you scroll. */
  picture?: Picture;
}) {
  const { site } = await getText();
  const side = Boolean(stats?.length) && !center;
  const photo = picture && !picture.pending && picture.src ? picture : null;

  return (
    <section className="relative isolate overflow-hidden">
      {/* A faint grid and a soft mint glow, so the opener has some depth
          without a coloured band. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_22rem_at_85%_0%,rgb(94_224_189/0.24),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-80 [background-image:linear-gradient(to_right,var(--hairline)_1px,transparent_1px),linear-gradient(to_bottom,var(--hairline)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_80%_10%,black,transparent_65%)]"
      />
      <Container
        className={`home-hero-copy grid gap-8 pt-10 sm:pt-12 lg:items-end lg:gap-10 ${
          photo || tight ? "pb-8 sm:pb-10" : "pb-10 sm:pb-12"
        } ${side ? "lg:grid-cols-12" : ""} ${center ? "text-center" : ""}`}
      >
        <div className={`min-w-0 ${side ? "lg:col-span-7" : ""}`}>
          {back ? (
            <Link
              href={back.href}
              className="group hero-rise mb-6 inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-hover"
            >
              <ArrowLeftIcon size={18} className="transition-[translate] duration-300 ease-(--ease-soft) group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" aria-hidden />
              {back.label}
            </Link>
          ) : null}

          <h1
            className={`hero-rise display-2 max-w-[22ch] text-balance [animation-delay:60ms] ${center ? "mx-auto" : ""}`}
          >
            {heading}
          </h1>
          {intro ? (
            <p
              className={`hero-rise mt-5 max-w-[58ch] text-lg text-pretty text-ink-2 [animation-delay:120ms] ${
                center ? "mx-auto" : ""
              }`}
            >
              {intro}
            </p>
          ) : null}
          {pending ? <Mark className="hero-rise mt-6 [animation-delay:160ms]" /> : null}

          {cta ? (
            <div className="hero-rise mt-8 [animation-delay:200ms]">
              <a href="#plan" className={btnPrimary}>
                {site.cta.primary}
              </a>
            </div>
          ) : null}

          {children ? <div className="hero-rise mt-8 [animation-delay:200ms]">{children}</div> : null}
        </div>

        {stats?.length ? (
          <dl
            className={`hero-rise grid grid-cols-3 divide-x divide-hairline border-y border-hairline [animation-delay:240ms] rtl:divide-x-reverse ${
              side ? "lg:col-span-5" : "mx-auto max-w-2xl"
            }`}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="grid min-w-0 content-start gap-2 px-4 py-5 first:ps-0 sm:px-6">
                <dt className="row-start-2 text-sm text-ink-3">{stat.label}</dt>
                <dd className="row-start-1 font-display text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-none font-semibold tracking-[-0.04em] text-accent tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>

      {photo ? (
        <div className="hero-rise [animation-delay:300ms]">
          <div className="home-expand relative overflow-hidden">
            <div className="relative aspect-[16/9] sm:aspect-[3/1] lg:aspect-[7/2]">
              <Image
                src={photo.src!}
                alt={photo.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={photo.focus ? { objectPosition: photo.focus } : undefined}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
