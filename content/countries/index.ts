import type { CountryContent } from "../types";
import { global } from "./global";
import { ng } from "./ng";

/**
 * Register a country here and its page exists at /<slug>.
 * Add one content file per country. Nothing else changes.
 */
export const countries: Record<string, CountryContent> = {
  ng,
};

export const countrySlugs = Object.keys(countries);

export function getCountry(slug: string): CountryContent | null {
  return countries[slug] ?? null;
}

export { global };
