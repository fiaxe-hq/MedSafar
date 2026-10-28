"use client";

import { useEffect } from "react";

/**
 * The visitor's country normally comes from their IP address (the proxy sets
 * the "country" cookie). When it could not be found, this asks the browser
 * for the visitor's location once. If they allow it, the country is looked
 * up from the coordinates and remembered, and the home page reloads with
 * that country's photos and phone code. If they refuse, nothing changes: no
 * country, English.
 */
export function LocationPrompt() {
  useEffect(() => {
    if (/(?:^|;\s*)country=[A-Z]{2}/.test(document.cookie)) return;
    try {
      if (localStorage.getItem("ms-geo-asked")) return;
      localStorage.setItem("ms-geo-asked", "1");
    } catch {
      return;
    }
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          // Country only, from rounded coordinates; nothing else is sent.
          const lat = coords.latitude.toFixed(1);
          const lon = coords.longitude.toFixed(1);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
          );
          const data = (await res.json()) as { countryCode?: string };
          const iso = String(data.countryCode ?? "").toUpperCase();
          if (!/^[A-Z]{2}$/.test(iso)) return;
          document.cookie = `country=${iso}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
          location.reload();
        } catch {}
      },
      () => {},
      { timeout: 10000, maximumAge: 60 * 60 * 1000 },
    );
  }, []);
  return null;
}
