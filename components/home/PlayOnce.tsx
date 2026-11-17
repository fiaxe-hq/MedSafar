"use client";

import { useEffect, useRef } from "react";

/**
 * A box whose entrance plays once, the first time it comes into view, and
 * then stays. Sets data-play="ready" when the script runs (so the parts can
 * start hidden: with no script, everything simply shows) and
 * data-play="on" once the box is well on screen.
 *
 * Watches with an IntersectionObserver, and also checks on scroll, since
 * some embedded browsers never call the observer back.
 */
export function PlayOnce({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      el.dataset.play = "on";
      return;
    }

    let frame = 0;
    const play = () => {
      el.dataset.play = "on";
      stop();
    };
    // Well on screen: the box's middle band is inside the window.
    const check = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      if (r.width && r.top < innerHeight * 0.75 && r.bottom > innerHeight * 0.25) play();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) play();
    }, { threshold: 0.45 });
    function stop() {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    }

    el.dataset.play = "ready";
    io.observe(el);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    check();
    return stop;
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
