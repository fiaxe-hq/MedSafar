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
  /** CSS object-position for the part that must stay in view when a wide
   *  frame crops the photo, e.g. "50% 20%" to keep a face. */
  focus?: string;
};

/** Marks copy that is a stand-in until Medsafar supplies the real thing. */
export type Pending = { pending?: boolean };

export type NavItem = {
  label: string;
  href: string;
};

/** A top nav entry. `menu` fills its dropdown from the catalog; `items` is a
 *  fixed dropdown. */
export type NavEntry = NavItem & {
  menu?: "treatments" | "hospitals" | "doctors";
  items?: NavItem[];
  /** The last link in the dropdown, to the full list. */
  all?: string;
  /** A highlighted link in the dropdown to a finder tool on the list page. */
  finder?: { title: string; text: string; href: string };
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
    items: NavEntry[];
    menuLabel: string;
    contact: NavItem;
  };
  languages: {
    label: string;
    current: string;
    options: Language[];
    note: string;
    /** Heading over the list of country pages, and the name of the main site. */
    countries: string;
    global: string;
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
    /** Shown as icons in the footer and on the Contact page. */
    social: { network: "instagram" | "facebook" | "youtube"; label: string; href: string }[];
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
    /** How treatment is paid for, under the lines above. */
    payment: string;
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
    follow: string;
    copyright: string;
  };
  notFound: {
    heading: string;
    body: string;
  };
  pendingLabel: string;
  photoLabel: string;
  /** Labels on a carousel's arrow buttons. */
  carousel: { previous: string; next: string };
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
    /** What matters most when we suggest a hospital and doctor. */
    budget: { label: string; options: string[] };
    /** A city or hospital the visitor already has in mind. */
    preference: { label: string; placeholder: string };
    notes: { label: string; placeholder: string };
    reports: { label: string; hint: string };
    /** `privacy` is the link text that follows the label and opens /privacy. */
    consent: { label: string; privacy: string };
    submit: string;
  };
  /** Under the form: how medical details are handled. */
  privacyNote: string;
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
    limit: string;
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
  /** One or two plain sentences for the speciality's own page. */
  summary: string;
};

/** A video on a hospital page: a YouTube video, or a file in public/. */
export type Video = { title: string } & (
  | { youtube: string }
  | { src: string; poster: string }
);

export type Hospital = Pending & {
  slug: string;
  name: string;
  city: string;
  /** Street address, shown on the hospital's own page. */
  address?: string;
  /** Left out when the hospital names none, so no check mark is shown. */
  accreditation?: string;
  overview: string;
  /** Departments the hospital names as its centres of excellence. */
  centres?: string[];
  /** Heading for `centres` when the hospital names them differently. */
  centresLabel?: string;
  /** Speciality slugs. */
  specialities: string[];
  /** Slugs of the treatments offered here. */
  treatments: string[];
  /** What the hospital does for patients travelling from abroad. */
  services: string[];
  picture: Picture;
  /** Further photo slots, shown on the hospital's own page. */
  gallery: Picture[];
  videos?: Video[];
  /** Package prices the hospital has supplied. Where this is missing, the
   *  page invites a quote instead of showing a price. */
  packages?: PackageGroup[];
};

/** A priced package the hospital has supplied, grouped under its category
 *  (e.g. "Cardiac procedures"). */
export type PackageGroup = {
  category: string;
  items: {
    name: string;
    /** Hospital stay as the hospital wrote it: "1+4" for ICU + ward days,
     *  or a single number for a total. */
    stay: string;
    priceUsd: number;
  }[];
};

export type Doctor = Pending & {
  slug: string;
  name: string;
  /** Speciality slug. */
  speciality: string;
  /** Job title at the hospital, as the hospital gives it. */
  role: string;
  /** Hospital slug. */
  hospital: string;
  /** Somewhere else the doctor sees patients, written out. */
  otherPractice?: string;
  /** Written out, for example "18 years". Not a number, so it can stay a
   *  placeholder until it is confirmed. */
  experience: string;
  /** Rows left empty are not shown. */
  qualifications: string[];
  languages: string[];
  expertise: string[];
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
  picture?: Picture;
  /** Where the facts in the post come from. */
  sources?: { label: string; href: string }[];
  /** Slugs of treatments and hospitals the post is about. */
  treatments: string[];
  hospitals: string[];
};

/** Text for the hospital, doctor, treatment and blog pages. */
export type CatalogContent = {
  filters: {
    heading: string;
    all: string;
    clear: string;
    empty: string;
    /** Follows the number of results: "1 result", "3 results". */
    result: string;
    results: string;
  };
  hospitals: ListPageText & {
    filters: { city: string; speciality: string };
    /** Labels under the counts in the page opener. */
    stats: { specialities: string; doctors: string; treatments: string };
    /** The row of speciality tiles above the list. */
    browse: {
      heading: string;
      intro: string;
      all: string;
      /** Follows the number of hospitals: "1 hospital", "3 hospitals". */
      one: string;
      many: string;
      /** Shown over the list once a speciality is picked. */
      showing: string;
      /** Link from a picked speciality to its own page. */
      more: string;
    };
    detail: {
      overview: string;
      accreditation: string;
      specialities: string;
      address: string;
      centres: string;
      services: string;
      photos: string;
      /** The photo viewer: open it, close it, step through it. */
      gallery: { all: string; close: string; previous: string; next: string };
      videos: string;
      doctors: string;
      treatments: string;
      packages: string;
      /** Beside the lowest package price, e.g. "Packages from $400". */
      priceFrom: string;
      packagesNote: string;
      quoteHeading: string;
      quoteBody: string;
      quoteCta: string;
    };
  };
  doctors: ListPageText & {
    filters: { speciality: string; hospital: string };
    /** Labels under the counts in the page opener. */
    stats: { doctors: string; specialities: string; hospitals: string };
    /** Label on each card's link. */
    view: string;
    detail: {
      profile: string;
      speciality: string;
      hospital: string;
      experience: string;
      qualifications: string;
      languages: string;
      expertise: string;
      otherPractice: string;
      procedures: string;
      worksAt: string;
    };
  };
  treatments: ListPageText & {
    /** Labels under the counts in the page opener. */
    stats: { treatments: string; specialities: string; doctors: string };
    /** Label for the row of links to each speciality. */
    jump: string;
    /** Link from a speciality group to the speciality's own page. */
    more: string;
    /** Follows the number of treatments in a group: "1 treatment", "3 treatments". */
    one: string;
    many: string;
    detail: {
      what: string;
      who: string;
      stay: string;
      recovery: string;
      hospitals: string;
      doctors: string;
      faq: string;
      /** What moves the price. The same for every treatment until real
       *  prices are supplied. */
      cost: {
        heading: string;
        intro: string;
        factors: { title: string; body: string }[];
        note: string;
        cta: string;
      };
      /** Link to the speciality's own page. */
      speciality: string;
    };
  };
  specialities: ListPageText & {
    stats: { specialities: string; treatments: string; doctors: string };
    /** Label on each card's link. */
    view: string;
    detail: {
      treatments: string;
      doctors: string;
      hospitals: string;
      /** Labels under the counts in the page opener. */
      stats: { treatments: string; doctors: string; hospitals: string };
    };
  };
  blog: ListPageText & {
    filters: { category: string };
    /** Shown in place of the date until a post is published. */
    undated: string;
    detail: {
      related: string;
      sources: string;
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
  selection: Pending & { heading: string; body: string };
  /** Left out until Medsafar supplies names, roles and photos. */
  team?: {
    heading: string;
    intro: string;
    members: (Pending & { name: string; role: string; picture: Picture })[];
  };
  legal: { heading: string; name: string; body: string };
  note?: string;
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
    items: (Pending & { label: string; value: string; href: string | null; hint?: string })[];
    note?: string;
  };
  follow: string;
  form: { heading: string; intro: string };
  steps: { heading: string; items: { title: string; body: string }[] };
  why: { heading: string; items: { title: string; body: string }[] };
  faq: { heading: string; items: Faq[] };
};

/** Privacy and Terms. A section body is one paragraph, or several. */
export type LegalContent = Pending & {
  meta: PageMeta;
  heading: string;
  intro: string;
  updated: { label: string; value: string };
  sections: { heading: string; body: string | string[] }[];
};

/** The two home page sections that show how partners are chosen and who
 *  some of the doctors are. */
export type HomeContent = {
  selection: {
    heading: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  doctors: {
    heading: string;
    intro: string;
    /** Doctor slugs, read through lib/catalog.ts. */
    featured: string[];
    book: string;
    profile: string;
    all: string;
  };
};

/** One question on a pre-surgery questionnaire. */
export type Question =
  | { id: string; kind: "number"; label: string; unit: string; min: number; max: number; optional?: boolean }
  | { id: string; kind: "choice"; label: string; options: string[]; optional?: boolean }
  | { id: string; kind: "multi"; label: string; options: string[]; optional?: boolean }
  | { id: string; kind: "text"; label: string; placeholder: string; optional?: boolean };

/** A short questionnaire a patient fills before a doctor looks at the case. */
export type Questionnaire = {
  slug: string;
  /** Speciality slug: the speciality and treatment pages link here. */
  speciality: string;
  /** Saved as the enquiry's treatment. */
  treatment: string;
  meta: PageMeta;
  /** Card text where other pages link to the questionnaire. */
  card: { title: string; body: string };
  heading: string;
  intro: string;
  /** Shows a live BMI from the height and weight questions. */
  bmi?: { height: string; weight: string; label: string; note: string };
  sections: { heading: string; questions: Question[] }[];
};

/** Text shared by every questionnaire. */
export type QuestionnaireText = {
  eyebrow: string;
  list: { meta: PageMeta; heading: string; intro: string; open: string; back: string };
  optional: string;
  contact: { heading: string; intro: string };
  submit: string;
  done: { heading: string; body: string; again: string };
  errors: { required: string };
  note: string;
};
