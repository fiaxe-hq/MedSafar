import { catalog } from "@/content/catalog";
import { global as home0 } from "@/content/countries/global";
import { home } from "@/content/home";
import { about, cancellations, contact, disclaimer, editorialPolicy, privacy, terms } from "@/content/pages";
import { questionnaireText, questionnaires } from "@/content/questionnaires";
import { places } from "@/content/places";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { bodyAreas, plainSpeciality, wholeBody } from "@/data/bodyMap";
import { doctors } from "@/data/doctors";
import { hospitals } from "@/data/hospitals";
import { postCategories, posts } from "@/data/posts";
import { specialities } from "@/data/specialities";
import { treatments } from "@/data/treatments";

/**
 * All the English text on the site, in one object. Each language is this
 * object with its sentences swapped (lib/i18n/walk.ts).
 */
/** The parts of the original home page content the home page still uses. */
const global = {
  meta: home0.meta,
  hero: { headline: home0.hero.headline, support: home0.hero.support },
  trust: { promises: home0.trust.promises },
  hospitals: home0.hospitals,
  countryInfo: { visa: home0.countryInfo.visa },
  faq: home0.faq,
  enquiry: home0.enquiry,
};

export const source = {
  site,
  ui,
  global,
  places,
  home,
  catalog,
  about,
  contact,
  privacy,
  terms,
  disclaimer,
  editorialPolicy,
  cancellations,
  questionnaireText,
  questionnaires,
  specialities,
  treatments,
  hospitals,
  doctors,
  postCategories,
  posts,
  bodyAreas,
  wholeBody,
  plainSpeciality,
};

export type Text = typeof source;

/** What the treatment finder needs, from the text of one language. */
export function finderWords(text: Text) {
  return {
    text: text.ui.finder,
    bodyAreas: text.bodyAreas,
    wholeBody: text.wholeBody,
    plainSpeciality: text.plainSpeciality,
  };
}
