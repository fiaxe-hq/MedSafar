"use client";

import { useLayoutEffect, useRef } from "react";

const KEY = "nav-underline";

/**
 * The line under the current nav link. It slides from the last link to the
 * new one when the page changes. Links to a home page section, like "How it
 * works", count as current while the address shows their #section. The last
 * position is kept in sessionStorage as well, for when the header is
 * rendered fresh on the next page.
 */
export function NavUnderline({ current }: { current?: string }) {
  const line = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = line.current;
    const nav = el?.parentElement;
    if (!el || !nav) return;

    const target = () => {
      const page = nav.querySelector<HTMLElement>('[aria-current="page"]');
      if (page || !location.hash) return page;
      return [...nav.querySelectorAll<HTMLAnchorElement>("a[href*='#']")].find(
        (a) => a.hash === location.hash && a.pathname === location.pathname,
      );
    };

    const place = (x: number, w: number) => {
      el.style.transform = `translateX(${x}px)`;
      el.style.width = `${w}px`;
    };

    // The first check can run before the address has its #section, so it
    // keeps the saved spot for the second check to slide from.
    const sync = (settled = true) => {
      const link = target();
      if (!link) {
        el.style.opacity = "0";
        if (settled) {
          try {
            sessionStorage.removeItem(KEY);
          } catch {}
        }
        return;
      }

      // The link's text box, matching the inset of the hover underline.
      const inset = parseFloat(getComputedStyle(link).paddingInlineStart);
      const left = link.offsetLeft + inset;
      const width = link.offsetWidth - inset * 2;

      // Already showing: the transition carries it from the last link. A
      // fresh header starts at the saved spot. With no saved spot (arriving
      // from the top of the home page) it fades in under the link. Moves
      // without a transition need a forced layout to stick.
      if (el.style.opacity !== "1") {
        let previous: { left: number; width: number } | null = null;
        try {
          previous = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
        } catch {}
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.style.transition = "none";
        if (previous && !reduce) {
          place(previous.left, previous.width);
          el.style.opacity = "1";
        } else {
          place(left, width);
        }
        void el.offsetWidth;
        el.style.transition = "";
      }
      el.style.opacity = "1";
      place(left, width);
      try {
        sessionStorage.setItem(KEY, JSON.stringify({ left, width }));
      } catch {}
    };

    sync(false);
    // The router can update the address just after this runs, and moving to
    // a #section on the same page changes no prop, so check again on both.
    const later = setTimeout(() => sync(), 50);
    const onClick = () => setTimeout(() => sync(), 50);
    const onHash = () => sync();
    nav.addEventListener("click", onClick);
    addEventListener("hashchange", onHash);
    addEventListener("popstate", onHash);
    return () => {
      clearTimeout(later);
      nav.removeEventListener("click", onClick);
      removeEventListener("hashchange", onHash);
      removeEventListener("popstate", onHash);
    };
  }, [current]);

  return (
    <span
      ref={line}
      aria-hidden
      className="pointer-events-none absolute bottom-1 left-0 h-0.5 rounded-full bg-brand opacity-0 transition-[transform,width,opacity] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
    />
  );
}
