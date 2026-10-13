"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { Container } from "@/components/ui/Container";

/**
 * A row of cards that runs to the edges of the screen, with the first card
 * lined up on the page's content edge. Native scrolling and snap points do the
 * motion, so a swipe or a trackpad flick keeps its momentum and can be caught
 * mid-flight; the arrows step one card at a time.
 *
 * The track has room above and below for the cards' hover lift and shadow,
 * so nothing is clipped at its edge.
 */
export function HospitalCarousel({
  label,
  note,
  previous,
  next,
  children,
}: {
  label: string;
  note?: string;
  previous: string;
  next: string;
  children: React.ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // Right-to-left pages count scrollLeft down from 0, so use its size.
    const at = Math.abs(el.scrollLeft);
    setEdges({ start: at <= 2, end: at >= max - 2 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), measure()));
    };
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sign = getComputedStyle(el).direction === "rtl" ? -1 : 1;
    el.scrollBy({ left: sign * direction * (card.offsetWidth + gap), behavior: still ? "auto" : "smooth" });
  };

  const scrolls = !(edges.start && edges.end);
  const button =
    "grid size-11 place-items-center rounded-full border border-hairline bg-surface text-ink transition-[background-color,border-color,color,opacity,scale] duration-150 ease-out hover:border-line hover:bg-surface-2 active:scale-[0.94] disabled:pointer-events-none disabled:opacity-35";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} data-carousel>
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pt-3 pb-10 [--g:1.25rem] [padding-inline:max(var(--g),calc((100%-78rem)/2+var(--g)))] [scroll-padding-inline:max(var(--g),calc((100%-78rem)/2+var(--g)))] [scrollbar-width:none] sm:[--g:2rem] lg:[--g:3rem] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
            {child}
          </div>
        ))}
      </div>

      <Container className="-mt-4 flex items-start justify-between gap-6">
        {note ? <p className="max-w-[60ch] text-sm text-ink-3">{note}</p> : <span />}
        {scrolls ? (
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label={previous} className={button}>
              <CaretLeftIcon size={18} weight="bold" className="rtl:rotate-180" aria-hidden />
            </button>
            <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label={next} className={button}>
              <CaretRightIcon size={18} weight="bold" className="rtl:rotate-180" aria-hidden />
            </button>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
