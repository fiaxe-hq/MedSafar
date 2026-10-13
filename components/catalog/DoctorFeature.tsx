import Link from "next/link";
import type { Doctor } from "@/content/types";
import { Figure } from "@/components/ui/Pending";
import { btnPrimary } from "@/components/ui/styles";

/**
 * A doctor on the home page: portrait, who they are, and two ways on. "Book"
 * goes to the form on the doctor's own page, so the enquiry records which
 * doctor it was for.
 */
export function DoctorFeature({
  doctor,
  speciality,
  hospital,
  book,
  profile,
}: {
  doctor: Doctor;
  /** Speciality and hospital names, already looked up. */
  speciality: string;
  hospital: string;
  book: string;
  profile: string;
}) {
  const href = `/doctors/${doctor.slug}`;

  return (
    <article className="reveal flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface">
      <Link href={href} tabIndex={-1} aria-hidden className="block overflow-hidden">
        <Figure
          picture={doctor.picture}
          ratio="aspect-[4/3]"
          rounded="rounded-none"
          className="border-0 transition-[scale] duration-700 ease-(--ease-soft) hover:scale-[1.03]"
          position="object-top"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />
      </Link>
      <div className="flex grow flex-col p-6 sm:p-7">
        <p className="text-sm font-medium text-accent">{speciality}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">
          <Link href={href} className="transition-colors hover:text-accent">
            {doctor.name}
          </Link>
        </h3>
        <p className="mt-2 text-base text-ink-2">{doctor.role}</p>
        <p className="mt-1 text-sm text-ink-3">{hospital}</p>
        <p className="mt-3 text-sm text-ink-3">{doctor.experience}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <Link href={`${href}#plan`} className={`${btnPrimary} min-h-11 px-5 text-sm sm:px-5`}>
            {book}
          </Link>
          <Link
            href={href}
            className="inline-flex min-h-11 items-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {profile}
          </Link>
        </div>
      </div>
    </article>
  );
}
