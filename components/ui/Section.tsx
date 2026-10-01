import { Container } from "./Container";

const tones = {
  page: "bg-bg",
  quiet: "bg-surface-2",
} as const;

/**
 * A page band. Sections own their own header markup so that no two sections
 * end up with the same composition.
 */
export function Section({
  id,
  tone = "page",
  children,
  className = "",
}: {
  id?: string;
  tone?: keyof typeof tones;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} scroll-mt-24 py-16 sm:py-24 lg:py-28 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** The standard section opener: headline, then body underneath it. */
export function SectionHead({
  heading,
  intro,
  className = "",
}: {
  heading: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      <h2 className="display-2">{heading}</h2>
      {intro ? <p className="mt-5 max-w-[60ch] text-lg text-ink-2">{intro}</p> : null}
    </div>
  );
}

/** Quiet line under a block, for notes about content still to be supplied. */
export function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-10 max-w-[68ch] text-sm text-ink-3">{children}</p>;
}
