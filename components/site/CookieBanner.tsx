"use client";

import { useEffect, useState } from "react";
import Link from "@/components/ui/Link";
import { gaId } from "@/lib/analytics";

/**
 * The cookie notice, and Google Analytics behind it.
 *
 * The site's own cookies (language, country) are needed for it to work and
 * are always set. Google Analytics counts visits and sets cookies of its own,
 * so it is loaded only after the visitor accepts. The answer is kept in this
 * browser for a year, and the notice is not shown again until then.
 */

const KEY = "cookie-consent";
const YEAR = 60 * 60 * 24 * 365;

export type CookieText = { text: string; privacy: string; accept: string; decline: string };

type Answer = "yes" | "no";

function readAnswer(): Answer | null {
  const found = document.cookie.match(/(?:^|;\s*)cookie-consent=(yes|no)/)?.[1];
  return (found as Answer | undefined) ?? null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Loads Google Analytics once. Page changes inside the site are counted by GA itself. */
function startAnalytics() {
  if (!gaId || window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  // gtag reads the `arguments` object itself, so this cannot be an arrow function.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaId);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(script);
}

export function CookieBanner({ text }: { text: CookieText }) {
  const [open, setOpen] = useState(false);

  // The answer lives in the browser, so it is read after the page is on screen.
  useEffect(() => {
    const answer = readAnswer();
    if (answer === "yes") startAnalytics();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!answer) setOpen(true);
  }, []);

  const answer = (value: Answer) => {
    document.cookie = `${KEY}=${value}; path=/; max-age=${YEAR}; samesite=lax`;
    if (value === "yes") startAnalytics();
    setOpen(false);
  };

  if (!open) return null;

  const button =
    "inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-medium whitespace-nowrap transition-colors sm:flex-none";

  return (
    // Above the fixed bar on phones; in the corner, clear of the WhatsApp
    // button, on computers.
    <section
      aria-label={text.accept}
      data-intro-fade
      className="cookie-in fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-xl rounded-xl border border-hairline bg-surface p-4 shadow-lift sm:p-5 lg:inset-x-auto lg:start-6 lg:bottom-6 lg:mx-0"
    >
      <p className="text-sm text-ink-2">
        {text.text}{" "}
        <Link
          href="/privacy"
          className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
        >
          {text.privacy}
        </Link>
      </p>
      <div className="mt-3 flex gap-2 sm:justify-end">
        <button
          type="button"
          onClick={() => answer("no")}
          className={`${button} border border-line bg-surface text-ink hover:bg-surface-2`}
        >
          {text.decline}
        </button>
        <button
          type="button"
          onClick={() => answer("yes")}
          className={`${button} bg-cta text-cta-ink hover:bg-cta-hover`}
        >
          {text.accept}
        </button>
      </div>
    </section>
  );
}
