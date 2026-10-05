import Link from "next/link";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import type { Hospital } from "@/content/types";
import { Figure } from "@/components/ui/Pending";
import { CardFoot } from "./CardFoot";

/** A hospital, linked to its own page. Used on the home page and in lists.
 *  `wide` lays the photo beside the text, for a hospital shown on its own. */
export function HospitalCard({
  hospital,
  specialities,
  feature = false,
  wide = false,
  heading: Heading = "h3",
  sizes,
}: {
  hospital: Hospital;
  /** Speciality names, already joined for display. */
  specialities: string;
  feature?: boolean;
  wide?: boolean;
  heading?: "h2" | "h3";
  sizes: string;
}) {
  return (
    <article className="group reveal h-full overflow-hidden rounded-lg border border-hairline bg-surface lift">
      <Link
        href={`/hospitals/${hospital.slug}`}
        className={`flex h-full flex-col focus-visible:-outline-offset-2 ${
          wide ? "lg:grid lg:grid-cols-12" : ""
        }`}
      >
        <div className={`overflow-hidden ${wide ? "lg:col-span-7" : ""}`}>
          <Figure
            picture={hospital.picture}
            ratio={feature || wide ? "aspect-[16/11]" : "aspect-[16/9]"}
            rounded="rounded-none"
            className="border-0 transition-[scale] duration-700 ease-(--ease-soft) group-hover:scale-[1.04]"
            sizes={sizes}
          />
        </div>
        <div
          className={`flex grow flex-col ${feature || wide ? "p-7 sm:p-9" : "p-6 sm:p-7"} ${
            wide ? "lg:col-span-5 lg:p-12" : ""
          }`}
        >
          <Heading
            className={`font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent ${
              wide ? "text-3xl" : feature ? "text-2xl" : "text-xl"
            }`}
          >
            {hospital.name}
          </Heading>
          <p className="mt-2 flex items-center gap-1.5 text-base text-ink-2">
            <MapPinIcon size={17} className="shrink-0 text-ink-3" aria-hidden />
            {hospital.city}
          </p>
          <p className="mt-1 text-base text-ink-2">{hospital.accreditation}</p>
          <p className="mt-4 text-sm text-ink-3">{specialities}</p>
          <CardFoot pending={hospital.pending} />
        </div>
      </Link>
    </article>
  );
}
