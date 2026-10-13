import Link from "next/link";
import type { Treatment } from "@/content/types";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { CardFoot } from "./CardFoot";

/** A treatment, linked to its own page. A hairline along the top fills with
 *  green on hover. */
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
    <article className="group reveal relative h-full overflow-hidden rounded-lg border border-hairline bg-surface lift">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-brand to-glow transition-transform duration-500 ease-(--ease-soft) group-hover:scale-x-100 rtl:origin-right"
      />
      <Link
        href={`/treatments/${treatment.slug}`}
        className="flex h-full flex-col p-6 focus-visible:-outline-offset-2 sm:p-7"
      >
        {speciality ? (
          <p className="flex items-center gap-2 text-sm font-medium text-accent">
            <SpecialityIcon slug={treatment.speciality} size={16} aria-hidden />
            {speciality}
          </p>
        ) : null}
        <Heading
          className={`text-xl font-semibold tracking-[-0.02em] text-balance transition-colors group-hover:text-accent ${
            speciality ? "mt-3" : ""
          }`}
        >
          {treatment.name}
        </Heading>
        <p className="mt-3 line-clamp-3 text-sm text-ink-3">{treatment.summary}</p>
        <CardFoot pending={treatment.pending} />
      </Link>
    </article>
  );
}
