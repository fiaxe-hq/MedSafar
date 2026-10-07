"use client";

import { useSyncExternalStore } from "react";
import { BD, GE, IN, IQ, KE, NG, UZ } from "country-flag-icons/react/3x2";
import { GlobeHemisphereEastIcon } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereEast";

/** Flags for the countries the site serves. Anyone else sees a globe. */
const flags = { BD, GE, IN, IQ, KE, NG, UZ } as const;

function readCookie() {
  return document.cookie.match(/(?:^|;\s*)country=([A-Z]{2})/)?.[1] ?? null;
}

const noop = () => () => {};

/**
 * The visitor's country flag. A country page passes its own country; every
 * other page uses the country the proxy found for the visitor.
 */
export function CountryFlag({ iso }: { iso: string | null }) {
  const visitor = useSyncExternalStore(noop, readCookie, () => null);
  const code = (iso ?? visitor) as keyof typeof flags | null;
  const Flag = code ? flags[code] : undefined;

  if (!Flag) return <GlobeHemisphereEastIcon size={20} className="text-ink-3" aria-hidden />;
  return <Flag aria-hidden className="h-[0.9rem] w-[1.35rem] rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.08)]" />;
}
