import Link from "@/components/ui/Link";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr/SealCheck";
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
  reveal = true,
}: {
  hospital: Hospital;
  /** Speciality names, already joined for display. */
  specialities: string;
  feature?: boolean;
  wide?: boolean;
  heading?: "h2" | "h3";
  sizes: string;
  /** Off inside a sideways scroller, where the page's scroll reveal would
   *  follow the wrong axis. */
  reveal?: boolean;
}) {
  return (
    <article className={`group h-full overflow-hidden rounded-lg border border-hairline bg-surface lift ${reveal ? "reveal" : ""}`}>
      <Link
        href={`/hospitals/${hospital.slug}`}
        className={`flex h-full flex-col focus-visible:-outline-offset-2 ${
          wide ? "lg:grid lg:grid-cols-12" : ""
        }`}
      >
        <div className={`relative overflow-hidden ${wide ? "lg:col-span-7" : ""}`}>
          <Figure
            picture={hospital.picture}
            ratio={feature || wide ? "aspect-[16/11]" : "aspect-[16/9]"}
            rounded="rounded-none"
            className="border-0 transition-[scale] duration-700 ease-(--ease-soft) group-hover:scale-[1.04]"
            sizes={sizes}
          />
          <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-deep/70 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur-md">
            <MapPinIcon size={15} weight="fill" className="text-glow" aria-hidden />
            {hospital.city}
          </span>
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
          {hospital.accreditation ? (
            <p className="mt-3 flex items-start gap-2 text-base text-ink-2">
              <SealCheckIcon size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
              {hospital.accreditation}
            </p>
          ) : null}
          <p className="mt-4 line-clamp-3 border-t border-hairline pt-4 text-sm leading-relaxed text-ink-3">{specialities}</p>
          <CardFoot pending={hospital.pending} />
        </div>
      </Link>
    </article>
  );
}
