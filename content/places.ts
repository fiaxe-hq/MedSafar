import type { Picture } from "./types";

/**
 * The countries the home page is tailored to. A visitor's country (from their
 * IP address, or the country picker) only changes the home page's photo; the
 * language is chosen separately and applies to the whole site.
 *
 * "global" is everyone else. Adding a country: add it here with its photo.
 */
export type Place = {
  slug: string;
  /** ISO 3166 code, for the flag and the phone field. Null for "global". */
  iso: string | null;
  picture: Picture;
};

export const places: Place[] = [
  {
    slug: "global",
    iso: null,
    // Stock photo, illustration only: Pexels 31499386, Adarsh MP. Pexels Licence.
    picture: { src: "/photos/hero-global.jpg", alt: "Two nurses talking in a hospital corridor in India", pending: false },
  },
  {
    slug: "bd",
    iso: "BD",
    // Pexels 30789962, Sadia Ashraf. Pexels Licence.
    picture: { src: "/photos/hero-bd.jpg", alt: "A young boy resting in a hospital bed in Bangladesh, a drip in his hand", pending: false, focus: "50% 35%" },
  },
  {
    slug: "ge",
    iso: "GE",
    // Pexels 6129651, Tima Miroshnichenko. Pexels Licence.
    picture: { src: "/photos/hero-ge.jpg", alt: "A doctor talking with a young woman resting in a hospital bed", pending: false },
  },
  {
    slug: "iq",
    iso: "IQ",
    // Pexels 34007073, khezez. Pexels Licence.
    picture: { src: "/photos/hero-iq.jpg", alt: "Dentists treating patients in a modern clinic in Baghdad", pending: false },
  },
  {
    slug: "ke",
    iso: "KE",
    // Pexels 35043676, OfficialDesign Africa. Pexels Licence.
    picture: { src: "/photos/hero-ke.jpg", alt: "A patient in a hospital room talking with a member of the medical team", pending: false },
  },
  {
    slug: "ng",
    iso: "NG",
    // Pexels 30677591, Ninthgrid. Pexels Licence.
    picture: { src: "/photos/hero-ng.jpg", alt: "A doctor checking a man's blood pressure at a clinic in Lagos", pending: false },
  },
  {
    slug: "uz",
    iso: "UZ",
    // Pexels 7659572, Thirdman. Pexels Licence.
    picture: { src: "/photos/hero-uz.jpg", alt: "A doctor taking the blood pressure of a woman in a headscarf", pending: false },
  },
];

export const placeSlugs = places.map((p) => p.slug);

/** ISO country code to place, for the country found from the IP address. */
export function placeForIso(iso: string | null | undefined): string {
  return places.find((p) => p.iso && p.iso === iso?.toUpperCase())?.slug ?? "global";
}
