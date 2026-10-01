import Link from "next/link";
import type { Doctor } from "@/content/types";
import { Figure } from "@/components/ui/Pending";
import { CardFoot } from "./CardFoot";

/** A doctor, linked to their own page. */
export function DoctorCard({
  doctor,
  speciality,
  hospital,
  heading: Heading = "h3",
}: {
  doctor: Doctor;
  /** Speciality and hospital names, already looked up. */
  speciality: string;
  hospital: string;
  heading?: "h2" | "h3";
}) {
  return (
    <article className="group reveal h-full rounded-lg border border-hairline bg-surface transition-colors hover:border-line">
      <Link
        href={`/doctors/${doctor.slug}`}
        className="flex h-full gap-5 p-6 focus-visible:-outline-offset-2 sm:p-7"
      >
        <Figure
          picture={doctor.picture}
          ratio="aspect-square"
          rounded="rounded-md"
          className="size-16 shrink-0"
          sizes="64px"
          compact
        />
        <div className="flex min-w-0 grow flex-col">
          <Heading className="text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent">
            {doctor.name}
          </Heading>
          <p className="mt-2 text-base text-ink-2">{speciality}</p>
          <p className="mt-1 text-base text-ink-2">{hospital}</p>
          <p className="mt-4 text-sm text-ink-3">{doctor.experience}</p>
          <CardFoot pending={doctor.pending} />
        </div>
      </Link>
    </article>
  );
}
