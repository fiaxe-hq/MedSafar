"use client";

import { useEffect } from "react";

/**
 * Pointer interactions for the design lab: card spotlight, magnetic primary
 * buttons and the tilt on Variant D's collage. Writes CSS variables and
 * inline translate only, never React state, and does nothing when the visitor
 * prefers reduced motion or has no fine pointer.
 */
const CARD = "article, figure, details, li, [class*='rounded-[2rem]'], [class*='rounded-lg'][class*='border']";
const MAGNET = "main a[class*='bg-cta'], main button[class*='bg-cta'], main [class*='bg-cta'][class*='rounded-full']";

export function LabMotion() {
  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!motionOk || !finePointer) return;

    const main = document.querySelector("[data-lab] main");
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
    cards.forEach((el) => el.classList.add("lab-spot"));

    const magnets = Array.from(document.querySelectorAll<HTMLElement>(MAGNET));
    magnets.forEach((el) => el.classList.add("lab-magnet"));

    const collage = main.querySelector<HTMLElement>(".d-collage");

    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const card = target?.closest<HTMLElement>(".lab-spot");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const magnet = target?.closest<HTMLElement>(".lab-magnet");
      magnets.forEach((m) => {
        if (m !== magnet) m.style.translate = "";
      });
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        magnet.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      }

      if (collage) {
        const r = collage.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        const x = inside ? (e.clientX - r.left) / r.width - 0.5 : 0;
        const y = inside ? (e.clientY - r.top) / r.height - 0.5 : 0;
        collage.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
        collage.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      magnets.forEach((m) => (m.style.translate = ""));
      collage?.style.setProperty("--rx", "0deg");
      collage?.style.setProperty("--ry", "0deg");
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cards.forEach((el) => el.classList.remove("lab-spot"));
      magnets.forEach((el) => {
        el.classList.remove("lab-magnet");
        el.style.translate = "";
      });
    };
  }, []);

  return null;
}
