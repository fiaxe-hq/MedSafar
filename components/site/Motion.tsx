"use client";

import { useEffect } from "react";

/**
 * Pointer interactions for the home page and the shared pages: the card
 * spotlight. Writes CSS variables only, never React state, and does nothing when the visitor
 * prefers reduced motion or has no fine pointer.
 */
const CARD = "article, figure, details, li, [class*='rounded-[2rem]'], [class*='rounded-lg'][class*='border']";

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
        !el.closest("[data-carousel]") &&
        parseFloat(style.borderRadius) > 0 &&
        style.backgroundImage === "none" &&
        el.getBoundingClientRect().width > 160
      );
    });
    cards.forEach((el) => el.classList.add("home-spot"));

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
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      cards.forEach((el) => el.classList.remove("home-spot"));
    };
  }, []);

  return null;
}
