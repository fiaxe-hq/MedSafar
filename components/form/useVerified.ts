"use client";

import { useEffect, useState } from "react";
import { getVerified } from "@/app/actions";

export type Verified = { phone: string; iso: string; shown: string };

/**
 * The number this browser has already checked with a code, so no form asks
 * for it twice. The second value drops it for this form, back to typing a
 * number; the third reads it again, after a new number has been checked.
 */
export function useVerified() {
  const [verified, setVerified] = useState<Verified | null>(null);
  const refresh = () => getVerified().then(setVerified);
  useEffect(() => {
    let live = true;
    getVerified().then((v) => live && setVerified(v));
    return () => {
      live = false;
    };
  }, []);
  return [verified, () => setVerified(null), refresh] as const;
}
