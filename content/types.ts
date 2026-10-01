/**
 * Every piece of visible text and every image path lives in the content files
 * that use these types. Components never hard code copy, so a later
 * translation pass only has to add new content files.
 */

/** A photo slot. While `pending` is true nothing is loaded and a labelled
 *  surface is shown instead, using `alt` as the brief for the photographer. */
export type Picture = {
  src: string | null;
  alt: string;
  /** true until a real, cleared photo has been supplied. */
  pending: boolean;
};

/** Marks copy that is a stand-in until Medsafar supplies the real thing. */
export type Pending = { pending?: boolean };

export type NavItem = {
  label: string;
  href: string;
};

export type Language = {
  code: string;
  label: string;
};

export type SiteContent = {
  brand: {
    name: string;
    country: string;
    legal: string;
    tagline: string;
  };
  nav: {
    items: NavItem[];
    menuLabel: string;
  };
  languages: {
    label: string;
    current: string;
    options: Language[];
    note: string;
  };
  cta: {
    /** Never "Contact us". */
    primary: string;
    secondary: string;
    whatsapp: string;
  };
  contact: {
    whatsapp: {
      /** Digits only, country code first, no "+". Used in wa.me links. */
      number: string;
      display: string;
      /** Prefilled in the chat, so the visitor only has to press send. */
      message: string;
    };
    phone: {
      /** E.164, used in tel: links. */
      number: string;
      display: string;
    };
    /** For every patient enquiry. */
    email: string;
  };
  company: {
    /** Shown in the footer once supplied; hidden while null. */
    registeredAddress: string | null;
    /** Shown in the footer once supplied; hidden while null. */
    gstin: string | null;
  };
  mobileBar: {
    plan: string;
  };
  consultation: ConsultationText;
  form: FormContent;
  footer: {
    legalName: string;
    lines: string[];
    /** A link that starts with "#" points at a section of the home page. */
    columns: { heading: string; items: NavItem[] }[];
    contact: {
      heading: string;
      whatsapp: string;
      phone: string;
      email: string;
    };
    company: {
      registeredAddress: string;
      gstin: string;
    };
    parentLogoAlt: string;
    copyright: string;
  };
  notFound: {
    heading: string;
    body: string;
  };
  pendingLabel: string;
  photoLabel: string;
};

/** The pop-up form behind the header's "Free consultation" button. */
export type ConsultationText = {
  eyebrow: string;
  heading: string;
  intro: string;
  promises: string[];
  note: string;
  close: string;
};

export type FormContent = {
  step1: {
    label: string;
    hint: string;
    countryLabel: string;
    submit: string;
    reassurance: string;
  };
  step2: {
    heading: string;
    intro: string;
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string; hint: string };
    country: { label: string; placeholder: string };
    treatment: { label: string; placeholder: string; options: string[] };
    timeline: { label: string; options: string[] };
    notes: { label: string; placeholder: string };
    reports: { label: string; hint: string };
    /** `privacy` is the link text that follows the label and opens /privacy. */
    consent: { label: string; privacy: string };
    submit: string;
  };
  saved: {
    heading: string;
    body: string;
  };
  done: {
    heading: string;
    body: string;
    again: string;
  };
  errors: {
    phone: string;
    name: string;
    email: string;
    consent: string;
    file: string;
    generic: string;
  };
  sending: string;
};

export type DialCode = {
  /** ISO 3166-1 alpha-2 */
  iso: string;
  name: string;
  /** With leading "+" */
  dial: string;
};

export type Step = { title: string; body: string };

export type Story = Pending & {
  quote: string;
  name: string;
  city: string;
  treatment: string;
  picture: Picture;
};

export type Faq = { question: string; answer: string };

export type Handled = {
  /** Key into the icon map in components/ui/HandledIcon.tsx */
  icon: "visa" | "pickup" | "stay" | "interpreter" | "aftercare";
  title: string;
  body: string;
};

/**
 * One file per country. The home page uses `global.ts`; every country page
 * uses the same shape, so the layout is identical everywhere and only the
 * words, photos, stories and visa information change.
 */
export type CountryContent = {
  /** URL segment. "" for the home page. */
  slug: string;
  /** ISO code used to preselect the phone country. null on the home page. */
  iso: string | null;
  countryName: string | null;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: string;
    /** Kept short on purpose: it has to fit the first screen of a phone. */
    support: string;
    picture: Picture;
  };
  trust: {
    heading: string;
    promises: string[];
    accreditations: (Pending & { name: string; body: string })[];
    note: string;
  };
  howItWorks: {
    heading: string;
    intro: string;
    steps: Step[];
  };
  hospitals: {
    heading: string;
    intro: string;
    /** Slugs of the three hospitals shown, read through lib/catalog.ts. */
    featured: string[];
    note: string;
  };
  handled: {
    heading: string;
    intro: string;
    items: Handled[];
  };
  stories: {
    heading: string;
    intro: string;
    items: Story[];
    note: string;
  };
  countryInfo: {
    heading: string;
    intro: string;
    visa: { heading: string; steps: string[]; note: string };
    flights: { heading: string; body: string; routes: (Pending & { label: string })[] };
    language: { heading: string; body: string };
  };
  faq: {
    heading: string;
    items: Faq[];
  };
  enquiry: {
    heading: string;
    support: string;
  };
};

/**
 * Hospitals, doctors and treatments. The admin panel manages these records
 * later, so pages never import them directly: they go through lib/catalog.ts.
 * Records point at each other by slug.
 */

export type Speciality = {
  slug: string;
  name: string;
};

export type Hospital = Pending & {
  slug: string;
  name: string;
  city: string;
  accreditation: string;
  overview: string;
  /** Speciality slugs. */
  specialities: string[];
  /** Slugs of the treatments offered here. */
  treatments: string[];
  /** What the hospital does for patients travelling from abroad. */
  services: string[];
  picture: Picture;
  /** Further photo slots, shown on the hospital's own page. */
  gallery: Picture[];
};

export type Doctor = Pending & {
  slug: string;
  name: string;
  /** Speciality slug. */
  speciality: string;
  /** Hospital slug. */
  hospital: string;
  /** Written out, for example "18 years". Not a number, so it can stay a
   *  placeholder until it is confirmed. */
  experience: string;
  qualifications: string[];
  languages: string[];
  /** Slugs of the treatments this doctor performs. */
  treatments: string[];
  profile: string;
  picture: Picture;
};

export type Treatment = Pending & {
  slug: string;
  name: string;
  /** Speciality slug. */
  speciality: string;
  summary: string;
  what: string;
  who: string;
  stay: string;
  recovery: string;
  faq: Faq[];
};

type ListPageText = {
  meta: { title: string; description: string };
  eyebrow: string;
  heading: string;
  intro: string;
  note: string;
  /** Link back to the list from a detail page. */
  back: string;
};

export type PostCategory = {
  slug: string;
  name: string;
};

export type Post = Pending & {
  slug: string;
  title: string;
  /** ISO date, for example "2026-03-14". null until the post is published. */
  date: string | null;
  /** Category slug. */
  category: string;
  author: string;
  summary: string;
  /** One entry per paragraph. */
  body: string[];
  /** Slugs of treatments and hospitals the post is about. */
  treatments: string[];
  hospitals: string[];
};

/** Text for the hospital, doctor, treatment and blog pages. */
export type CatalogContent = {
  filters: {
    heading: string;
    all: string;
    apply: string;
    clear: string;
    empty: string;
    /** Follows the number of results: "1 result", "3 results". */
    result: string;
    results: string;
  };
  hospitals: ListPageText & {
    filters: { city: string; speciality: string };
    detail: {
      overview: string;
      accreditation: string;
      specialities: string;
      services: string;
      photos: string;
      doctors: string;
      treatments: string;
    };
  };
  doctors: ListPageText & {
    filters: { speciality: string; hospital: string };
    detail: {
      profile: string;
      speciality: string;
      hospital: string;
      experience: string;
      qualifications: string;
      languages: string;
      procedures: string;
      worksAt: string;
    };
  };
  treatments: ListPageText & {
    detail: {
      what: string;
      who: string;
      stay: string;
      recovery: string;
      hospitals: string;
      doctors: string;
      faq: string;
    };
  };
  blog: ListPageText & {
    filters: { category: string };
    /** Shown in place of the date until a post is published. */
    undated: string;
    detail: {
      related: string;
      treatments: string;
      hospitals: string;
    };
  };
  enquiry: {
    heading: string;
    support: string;
  };
};

/** About, Contact, Privacy and Terms. One content object per page. */

type PageMeta = { title: string; description: string };

export type AboutContent = Pending & {
  meta: PageMeta;
  eyebrow: string;
  heading: string;
  intro: string;
  who: { heading: string; body: string[] };
  does: { heading: string; items: string[] };
  doesNot: { heading: string; items: string[] };
  selection: { heading: string; body: string };
  team: {
    heading: string;
    intro: string;
    members: (Pending & { name: string; role: string; picture: Picture })[];
  };
  legal: { heading: string; name: string; body: string };
  note: string;
};

export type ContactContent = Pending & {
  meta: PageMeta;
  eyebrow: string;
  heading: string;
  intro: string;
  details: {
    heading: string;
    intro: string;
    /** `href` stays null until the real number or address is supplied. */
    items: (Pending & { label: string; value: string; href: string | null })[];
    note: string;
  };
};

/** Privacy and Terms. Headings only until Medsafar supplies the legal text. */
export type LegalContent = Pending & {
  meta: PageMeta;
  heading: string;
  intro: string;
  updated: { label: string; value: string };
  sections: { heading: string; body: string }[];
};
