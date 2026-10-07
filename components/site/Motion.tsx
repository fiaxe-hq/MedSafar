"use client";

import { useEffect } from "react";

/**
 * Pointer interactions for the home page and the shared pages: card spotlight, magnetic primary
 * buttons. Writes CSS variables and
 * inline translate only, never React state, and does nothing when the visitor
 * prefers reduced motion or has no fine pointer.
 */
const CARD = "article, figure, details, li, [class*='rounded-[2rem]'], [class*='rounded-lg'][class*='border']";
const MAGNET = "main a[class*='bg-cta'], main button[class*='bg-cta'], main [class*='bg-cta'][class*='rounded-full']";

export function Motion() {
  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!motionOk || !finePointer) return;

    const main = document.querySelector(":is([data-home], [data-page]) main");
    if (!main) return;

    // Spotlight only on flat cards, so photo and gradient tiles keep their look.
    const cards = Array.from(main.querySelectorAll<HTMLElement>(CARD)).filter((el) => {
      const style = getComputedStyle(el);
      return (
        parseFloat(style.borderRadius) > 0 &&
        style.backgroundImage === "none" &&
        el.getBoundingClientRect().width > 160
      );
    });
    cards.forEach((el) => el.classList.add("home-spot"));

    const magnets = Array.from(document.querySelectorAll<HTMLElement>(MAGNET));
    magnets.forEach((el) => el.classList.add("home-magnet"));


    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const card = target?.closest<HTMLElement>(".home-spot");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const magnet = target?.closest<HTMLElement>(".home-magnet");
      magnets.forEach((m) => {
        if (m !== magnet) m.style.translate = "";
      });
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        magnet.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      }

    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      magnets.forEach((m) => (m.style.translate = ""));
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cards.forEach((el) => el.classList.remove("home-spot"));
      magnets.forEach((el) => {
        el.classList.remove("home-magnet");
        el.style.translate = "";
      });
    };
  }, []);

  return null;
}
