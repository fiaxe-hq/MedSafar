import type { CountryContent } from "../types";
import { global } from "./global";
import { bd } from "./bd";
import { ge } from "./ge";
import { iq } from "./iq";
import { ke } from "./ke";
import { ng } from "./ng";
import { uz } from "./uz";

/**
 * Register a country here and its page exists at /<slug>.
 * Add one content file per country. Nothing else changes.
 */
export const countries: Record<string, CountryContent> = {
  ng,
  iq,
  bd,
  ke,
  ge,
  uz,
};

export const countrySlugs = Object.keys(countries);

export function getCountry(slug: string): CountryContent | null {
  return countries[slug] ?? null;
}

export { global };
