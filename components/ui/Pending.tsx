import Image from "next/image";
import { ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";
import type { Picture } from "@/content/types";
import { site } from "@/content/site";

/** Marks anything on the page that is a stand-in, not real content. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm bg-surface-2 px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.08em] text-ink-3 uppercase ${className}`}
    >
      {site.pendingLabel}
    </span>
  );
}

/**
 * A photo slot.
 *
 * Until a real photo is supplied nothing is downloaded: the slot renders as a
 * finished surface carrying the brief for the photograph, so the page reads as
 * designed while staying honest about what is missing.
 */
export function Figure({
  picture,
  ratio = "aspect-[4/5]",
  rounded = "rounded-lg",
  className = "",
  priority = false,
  sizes = "100vw",
  /** Small slots, such as a round portrait, show the surface without the brief. */
  compact = false,
  /** Which part of the photo stays in view when the slot crops it. */
  position = "object-center",
}: {
  picture: Picture;
  ratio?: string;
  rounded?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
  position?: "object-center" | "object-top";
}) {
  if (picture.pending || !picture.src) {
    if (compact) {
      return (
        <div
          title={`${site.photoLabel}: ${picture.alt}`}
          className={`pending-surface flex min-w-0 ${ratio} ${rounded} items-center justify-center ${className}`}
        >
          <ImageIcon size={18} className="text-ink-3" aria-hidden />
          <span className="sr-only">
            {site.pendingLabel}. {site.photoLabel}: {picture.alt}
          </span>
        </div>
      );
    }
    return (
      <div
        className={`pending-surface relative flex w-full min-w-0 ${ratio} ${rounded} flex-col justify-end overflow-hidden p-6 ${className}`}
      >
        <ImageIcon
          size={26}
          className="absolute start-6 top-6 text-ink-3"
          aria-hidden
        />
        <p className="max-w-[34ch] text-base text-ink-2">{picture.alt}</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-ink-3">{site.photoLabel}</span>
          <Mark />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full min-w-0 ${ratio} ${rounded} overflow-hidden bg-surface-2 ${className}`}
    >
      <Image
        src={picture.src}
        alt={picture.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${position}`}
      />
    </div>
  );
}
