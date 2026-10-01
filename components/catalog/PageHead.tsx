import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Pending";
import { btnPrimary, eyebrow } from "@/components/ui/styles";

/** Opener for a list or detail page: where you are, what it is, what to do. */
export function PageHead({
  back,
  label,
  heading,
  intro,
  pending = false,
  cta = false,
}: {
  back?: { href: string; label: string };
  label?: string;
  heading: string;
  intro?: string;
  pending?: boolean;
  cta?: boolean;
}) {
  return (
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16">
      <Container>
        {back ? (
          <Link
            href={back.href}
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-base font-medium text-accent transition-colors hover:text-accent-hover"
          >
            <ArrowLeftIcon size={18} className="rtl:rotate-180" aria-hidden />
            {back.label}
          </Link>
        ) : null}

        {label ? <p className={eyebrow}>{label}</p> : null}
        <h1 className="display-2 mt-5 max-w-[24ch]">{heading}</h1>
        {intro ? <p className="mt-5 max-w-[60ch] text-lg text-ink-2">{intro}</p> : null}
        {pending ? <Mark className="mt-6" /> : null}

        {cta ? (
          <div className="mt-8">
            <a href="#plan" className={btnPrimary}>
              {site.cta.primary}
            </a>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
