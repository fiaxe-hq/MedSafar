/**
 * Small pieces of text used inside interactive parts of the site (the
 * treatment finder, the phone field, the enquiry form). "{n}" and "{name}" are
 * filled in on the page; keep them in translations.
 */
export const ui = {
  finder: {
    know: "Yes, I know the name",
    searchHeading: "Search for it",
    searchIntro: "Type the treatment, or the problem in your own words.",
    searchLabel: "Search treatments",
    searchPlaceholder: "For example “knee pain”",
    matchOne: "1 match",
    matchMany: "{n} matches",
    noMatch: "Nothing matches “{q}”. Try other words, or",
    noMatchLink: "point on the body",
    noMatchEnd: "instead.",
    popular: "Popular",
    suggestions: ["Knee pain", "Back pain", "Heart", "Cancer", "Having a baby", "Weight loss", "Kidney", "Eyes"],
    browse: "Or browse by type",
    allTypes: "All {n} types",
    notSure: "No, I’m not sure",
    bodyHeading: "Show us on the body",
    bodyIntro: "Tap where the problem is. We’ll show what can be treated there.",
    bodyLabel: "Body",
    female: "Female",
    male: "Male",
    turn: "Turn around",
    tapHint: "Tap a part. Drag to turn.",
    notOnePlace: "Not in one place?",
    listLabel: "Pick a part of the body from a list",
    listPlaceholder: "Or pick from a list",
    close: "Close",
    treatmentOne: "1 treatment",
    treatmentMany: "{n} treatments",
    which: "Which of these sounds like it?",
    readMore: "Read more",
    unsure: "I’m not sure",
    unsureBody: "A doctor will read your reports and tell you what fits.",
    askAbout: "Ask us about {name}",
    askProblem: "Ask us about this problem",
    askNote: "Free. We’ll fill in the problem for you.",
    backToBody: "Not sure? Point on the body instead",
    question: "First, do you know what your condition or treatment is called?",
  },
  /** Hospital stays in the package price list. */
  stay: {
    dayOne: "1 day",
    dayMany: "{n} days",
    hospital: "{days} in hospital",
    ward: "{days} on the ward",
    icu: "{days} in ICU, {ward} on the ward",
  },
  browser: {
    know: "If you know the name",
    heading: "Browse by type",
    label: "Treatment types",
    count: "{total} treatments in {groups} groups. Pick a type to see its treatments.",
  },
};

export type Ui = typeof ui;

/** Fills "{n}", "{name}" and the like in a piece of text. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
