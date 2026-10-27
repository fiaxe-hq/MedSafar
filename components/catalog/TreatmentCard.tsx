import Image from "next/image";
import Link from "@/components/ui/Link";
import type { Treatment } from "@/content/types";
import { SpecialityIcon } from "@/components/ui/SpecialityIcon";
import { treatmentPhoto } from "@/data/treatmentPhotos";
import { CardFoot } from "./CardFoot";

/** A treatment, linked to its own page: a photo that shows what it is about,
 *  then the name. A hairline along the top fills with green on hover. */
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
  const photo = treatmentPhoto(treatment.slug, treatment.speciality);
  return (
    <article className="group reveal relative h-full overflow-hidden rounded-lg border border-hairline bg-surface lift">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-linear-to-r from-brand to-glow transition-transform duration-500 ease-(--ease-soft) group-hover:scale-x-100 rtl:origin-right"
      />
      <Link href={`/treatments/${treatment.slug}`} className="flex h-full flex-col focus-visible:-outline-offset-2">
        {photo?.src ? (
          <div className="relative aspect-[3/2] overflow-hidden bg-surface-2">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-(--ease-soft) group-hover:scale-[1.04]"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {speciality ? (
            <p className="flex items-center gap-2 text-sm font-medium text-accent">
              <SpecialityIcon slug={treatment.speciality} size={16} aria-hidden />
              {speciality}
            </p>
          ) : null}
          <Heading
            className={`text-lg font-semibold tracking-[-0.02em] text-balance transition-colors group-hover:text-accent ${
              speciality ? "mt-2" : ""
            }`}
          >
            {treatment.name}
          </Heading>
          <p className="mt-2 line-clamp-2 text-sm text-ink-3">{treatment.summary}</p>
          <CardFoot pending={treatment.checked ? false : "check"} />
        </div>
      </Link>
    </article>
  );
}
