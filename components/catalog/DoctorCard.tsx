import Link from "@/components/ui/Link";
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
    <article className="group reveal h-full rounded-lg border border-hairline bg-surface lift">
      <Link
        href={`/doctors/${doctor.slug}`}
        className="flex h-full gap-5 p-6 focus-visible:-outline-offset-2 sm:p-7"
      >
        <div className="size-16 shrink-0">
          <Figure
            picture={doctor.picture}
            ratio="aspect-square"
            rounded="rounded-md"
            className="w-full"
            position="object-top"
            sizes="64px"
            compact
          />
        </div>
        <div className="flex min-w-0 grow flex-col">
          <Heading className="text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent">
            {doctor.name}
          </Heading>
          <p className="mt-2 text-base text-ink-2">{doctor.role}</p>
          <p className="mt-1 text-base text-ink-2">{hospital}</p>
          <p className="mt-1 text-sm text-ink-3">{speciality}</p>
          <p className="mt-3 text-sm text-ink-3">{doctor.experience}</p>
          <CardFoot pending={doctor.pending} />
        </div>
      </Link>
    </article>
  );
}
