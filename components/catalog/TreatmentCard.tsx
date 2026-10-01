import Link from "next/link";
import type { Treatment } from "@/content/types";
import { CardFoot } from "./CardFoot";

/** A treatment, linked to its own page. */
export function TreatmentCard({
  treatment,
  speciality,
  heading: Heading = "h3",
}: {
  treatment: Treatment;
  /** Speciality name. Left out where the card already sits under it. */
  speciality?: string;
  heading?: "h2" | "h3";
}) {
  return (
    <article className="group reveal h-full rounded-lg border border-hairline bg-surface transition-colors hover:border-line">
      <Link
        href={`/treatments/${treatment.slug}`}
        className="flex h-full flex-col p-6 focus-visible:-outline-offset-2 sm:p-7"
      >
        <Heading className="text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent">
          {treatment.name}
        </Heading>
        {speciality ? <p className="mt-2 text-base text-ink-2">{speciality}</p> : null}
        <p className="mt-4 text-sm text-ink-3">{treatment.summary}</p>
        <CardFoot pending={treatment.pending} />
      </Link>
    </article>
  );
}
