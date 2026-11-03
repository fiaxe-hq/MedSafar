"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile, inside a form. Most visitors never see it; a box
 * appears only when Cloudflare wants a click. It adds a hidden
 * `cf-turnstile-response` field that lib/turnstile.ts checks.
 *
 * A token works once, so the widget is reset whenever `resetKey` changes
 * (pass the form's last result).
 */

/** The site key is public. Locally, Cloudflare's always-pass test key. */
const SITE_KEY =
  process.env.NODE_ENV === "production" ? "0x4AAAAAAFwQahnROGl4xqRV" : "1x00000000000000000000AA";

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  loading ??= new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile")));
    script.onerror = () => {
      loading = null;
      reject(new Error("turnstile"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export function Turnstile({ resetKey }: { resetKey?: unknown }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    let gone = false;
    loadTurnstile()
      .then((api) => {
        if (gone || !box.current) return;
        widget.current = api.render(box.current, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          size: "flexible",
          language: "auto",
        });
      })
      .catch(() => {});
    return () => {
      gone = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, []);

  useEffect(() => {
    if (resetKey && widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);

  return <div ref={box} className="empty:hidden" />;
}
