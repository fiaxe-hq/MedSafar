"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { SquaresFourIcon } from "@phosphor-icons/react/dist/ssr/SquaresFour";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import type { Picture } from "@/content/types";
import { Figure } from "@/components/ui/Pending";

/** Grid shape on large screens, by how many tiles are shown. */
const layouts: Record<number, { grid: string; first: string }> = {
  1: { grid: "lg:grid-cols-1", first: "" },
  2: { grid: "lg:grid-cols-2", first: "" },
  3: {
    grid: "lg:grid-cols-3 lg:grid-rows-2",
    first: "lg:col-span-2 lg:row-span-2",
  },
  5: {
    grid: "lg:grid-cols-4 lg:grid-rows-2",
    first: "lg:col-span-2 lg:row-span-2",
  },
};

/**
 * The photos at the top of a hospital page: one large photo and up to four
 * smaller ones, then every photo full size in a viewer. The viewer is a
 * native scroll track, so a swipe keeps its momentum; arrows and the
 * keyboard step one photo at a time.
 */
export function HospitalGallery({
  pictures,
  labels,
}: {
  pictures: Picture[];
  labels: { all: string; close: string; previous: string; next: string };
}) {
  const real = pictures.filter((p) => !p.pending && p.src);
  // Pending slots stand in only when there is no real photo at all.
  const source = real.length ? real : pictures;
  const tiles = source.slice(0, source.length >= 5 ? 5 : source.length >= 3 ? 3 : source.length);
  const layout = layouts[tiles.length];

  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const go = useCallback((index: number, smooth = true) => {
    const el = track.current;
    if (!el) return;
    const i = Math.max(0, Math.min(index, el.children.length - 1));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: i * el.clientWidth,
      behavior: smooth && !still ? "smooth" : "auto",
    });
  }, []);

  const open = (index: number) => {
    dialog.current?.showModal();
    setCurrent(index);
    // Wait a frame so the track has its width before jumping to the photo.
    requestAnimationFrame(() => go(index, false));
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          setCurrent(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
        });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Keep the current thumbnail in view.
  useEffect(() => {
    const thumb = thumbs.current?.children[current] as HTMLElement | undefined;
    thumb?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
  }, [current]);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    go(current + step);
  };

  const control =
    "grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-[background-color,opacity,scale] duration-150 ease-out hover:bg-white/20 active:scale-[0.94] disabled:pointer-events-none disabled:opacity-25";

  return (
    <>
      <div
        className={`relative grid grid-cols-2 gap-2 overflow-hidden rounded-lg lg:h-[clamp(24rem,62vh,34rem)] ${layout.grid}`}
      >
        {tiles.map((picture, i) => {
          const shape =
            i === 0
              ? `col-span-2 aspect-[16/10] sm:aspect-[16/9] lg:col-span-1 lg:aspect-auto ${layout.first}`
              : `aspect-[4/3] lg:aspect-auto ${i > 2 || tiles.length === 2 ? "hidden lg:block" : ""}`;

          if (picture.pending || !picture.src) {
            return <Figure key={i} picture={picture} ratio={shape} rounded="rounded-none" className="lg:h-full" />;
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => open(i)}
              aria-label={picture.alt}
              className={`group relative min-w-0 cursor-zoom-in overflow-hidden bg-surface-2 focus-visible:-outline-offset-4 ${shape}`}
            >
              <Image
                src={picture.src}
                alt=""
                fill
                priority={i === 0}
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition-[scale,filter] duration-500 ease-(--ease-soft) group-hover:scale-[1.03] group-hover:brightness-[0.92]"
                style={picture.focus ? { objectPosition: picture.focus } : undefined}
              />
            </button>
          );
        })}

        {real.length > 1 ? (
          <button
            type="button"
            onClick={() => open(0)}
            className="absolute end-3 bottom-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-hairline bg-surface/95 px-4 text-sm font-medium text-ink shadow-card backdrop-blur transition-[background-color,translate] duration-300 ease-(--ease-soft) hover:-translate-y-0.5 hover:bg-surface sm:end-4 sm:bottom-4"
          >
            <SquaresFourIcon size={18} aria-hidden />
            <span className="sr-only sm:not-sr-only">{labels.all}</span>
            <span className="tabular-nums">
              <span className="sm:hidden">{real.length}</span>
              <span className="hidden sm:inline">({real.length})</span>
            </span>
          </button>
        ) : null}
      </div>

      <dialog
        ref={dialog}
        aria-label={labels.all}
        onKeyDown={onKey}
        className="gallery-dialog m-0 size-full max-h-none max-w-none bg-[#0b0f0e] p-0 text-white"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-sm text-white/70 tabular-nums" aria-live="polite">
              {current + 1} / {real.length}
            </p>
            <button type="button" onClick={() => dialog.current?.close()} aria-label={labels.close} className={control}>
              <XIcon size={20} weight="bold" aria-hidden />
            </button>
          </div>

          <div className="relative min-h-0 grow">
            <div
              ref={track}
              dir="ltr"
              className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {real.map((picture, i) => (
                <figure key={i} className="flex h-full w-full shrink-0 snap-center flex-col px-4 sm:px-20">
                  <div className="relative min-h-0 grow">
                    <Image
                      src={picture.src!}
                      alt={picture.alt}
                      fill
                      sizes="100vw"
                      // Load the photo on screen and its neighbours, so a step
                      // never lands on an empty frame.
                      loading={Math.abs(i - current) <= 1 ? "eager" : "lazy"}
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="mx-auto max-w-[60ch] py-3 text-center text-sm text-white/75">
                    {picture.alt}
                  </figcaption>
                </figure>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(current - 1)}
              disabled={current === 0}
              aria-label={labels.previous}
              className={`${control} absolute start-4 top-1/2 hidden -translate-y-1/2 sm:grid`}
            >
              <CaretLeftIcon size={20} weight="bold" className="rtl:rotate-180" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              disabled={current === real.length - 1}
              aria-label={labels.next}
              className={`${control} absolute end-4 top-1/2 hidden -translate-y-1/2 sm:grid`}
            >
              <CaretRightIcon size={20} weight="bold" className="rtl:rotate-180" aria-hidden />
            </button>
          </div>

          <div className="shrink-0 overflow-x-auto px-4 pt-1 pb-4 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
            <div ref={thumbs} dir="ltr" className="mx-auto flex w-max gap-2 p-0.5">
              {real.map((picture, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={picture.alt}
                  aria-current={i === current}
                  className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md transition-opacity duration-200 ${
                    i === current ? "opacity-100 ring-2 ring-white" : "opacity-45 hover:opacity-80"
                  }`}
                >
                  <Image src={picture.src!} alt="" fill sizes="80px" loading="eager" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
