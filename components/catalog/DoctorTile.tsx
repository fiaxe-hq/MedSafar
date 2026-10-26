import Image from "next/image";
import Link from "@/components/ui/Link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { StethoscopeIcon } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import type { Doctor } from "@/content/types";
import { Mark } from "@/components/ui/Pending";
import { getText } from "@/lib/i18n/text";

/**
 * A doctor on the /doctors list: portrait first, then who they are and where
 * they work. A pale tray holds a white card, so it reads as something to pick
 * up. Until a portrait is supplied, the slot is a green field with a
 * stethoscope, never a stand-in face.
 */
export async function DoctorTile({
  doctor,
  speciality,
  hospital,
  view,
}: {
  doctor: Doctor;
  /** Speciality and hospital names, already looked up. */
  speciality: string;
  hospital: string;
  /** Label on the link. */
  view: string;
}) {
  const { site } = await getText();
  const { picture } = doctor;
  const photo = !picture.pending && picture.src;

  return (
    <article className="group reveal h-full">
      <Link
        href={`/doctors/${doctor.slug}`}
        className="block h-full rounded-[1.75rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 ease-(--ease-soft) hover:-translate-y-1 hover:shadow-lift focus-visible:outline-offset-4"
      >
        <div className="flex h-full gap-1 rounded-[calc(1.75rem-0.375rem)] bg-surface p-2 sm:flex-col sm:gap-0 shadow-[inset_0_1px_1px_rgb(255_255_255/0.7),0_24px_48px_-32px_rgb(11_61_49/0.35)]">
          <div className="relative aspect-[4/5] w-28 shrink-0 self-start overflow-hidden rounded-[1.25rem] bg-surface-2 sm:w-full">
            {photo ? (
              <Image
                src={picture.src!}
                alt={picture.alt}
                fill
                sizes="(min-width: 1280px) 20rem, (min-width: 640px) 45vw, 7rem"
                className="object-cover transition-[scale] duration-1000 ease-(--ease-soft) group-hover:scale-[1.04]"
              />
            ) : (
              <div
                title={`${site.photoLabel}: ${picture.alt}`}
                className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--glow),var(--brand)_55%,var(--deep))] transition-[scale] duration-1000 ease-(--ease-soft) group-hover:scale-[1.04]"
              >
                <StethoscopeIcon weight="thin" className="size-14 text-white/90 sm:size-24" aria-hidden />
                <span className="sr-only">
                  {site.pendingLabel}. {site.photoLabel}: {picture.alt}
                </span>
              </div>
            )}
          </div>

          <div className="flex min-w-0 grow flex-col px-3 pt-1 pb-1 sm:px-5 sm:pt-6 sm:pb-4">
            <p className="text-sm font-medium text-accent">{speciality}</p>
            <h2 className="mt-1 font-display text-xl leading-[1.15] sm:mt-2 sm:text-2xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-accent">
              {doctor.name}
            </h2>
            <p className="mt-2 text-sm text-ink-2 sm:text-base">{doctor.role}</p>
            <p className="mt-3 flex items-start gap-1.5 text-sm text-ink-3">
              <MapPinIcon size={16} weight="light" className="mt-0.5 shrink-0 text-brand" aria-hidden />
              {hospital}
            </p>

            <div className="mt-auto flex items-center justify-between gap-3 pt-4 sm:pt-6">
              {doctor.pending ? <Mark /> : <span className="text-base font-medium text-ink">{view}</span>}
              <span className="flex items-center gap-2">
                {doctor.pending ? <span className="sr-only">{view}</span> : null}
                <span
                  aria-hidden
                  className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent transition-[background-color,color,scale] duration-500 ease-(--ease-soft) group-hover:scale-105 group-hover:bg-cta group-hover:text-cta-ink"
                >
                  <ArrowUpRightIcon
                    size={18}
                    className="transition-transform duration-500 ease-(--ease-soft) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
