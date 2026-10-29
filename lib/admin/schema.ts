/**
 * What the admin editors show for each kind of record, field by field.
 *
 * Shared by the browser (to draw the form) and the server (to check what is
 * sent), so it holds plain data only. A field missing from here is kept as it
 * is when a record is saved, so videos, photo framing and the like survive an
 * edit even though the form does not show them.
 */

import type { ListKind } from "@/lib/content";

/** Lists of choices, filled in by the page from the site's own records. */
export type OptionList = "specialities" | "hospitals" | "treatments" | "categories";

export type Field =
  | { type: "text"; key: string; label: string; help?: string; required?: boolean; max?: number; placeholder?: string }
  | { type: "textarea"; key: string; label: string; help?: string; required?: boolean; rows?: number; max?: number }
  /** A list of short lines, typed one per line. */
  | { type: "lines"; key: string; label: string; help?: string; required?: boolean; omitEmpty?: boolean }
  /** Paragraphs, separated by an empty line. */
  | { type: "paragraphs"; key: string; label: string; help?: string; required?: boolean }
  | { type: "select"; key: string; label: string; help?: string; options: OptionList; required?: boolean }
  | { type: "checklist"; key: string; label: string; help?: string; options: OptionList }
  | { type: "checkbox"; key: string; label: string; help?: string; invert?: boolean }
  | { type: "date"; key: string; label: string; help?: string }
  /** omitEmpty: the record may have no photo at all (a blog post). */
  | { type: "picture"; key: string; label: string; help?: string; omitEmpty?: boolean }
  | { type: "gallery"; key: string; label: string; help?: string }
  | { type: "faq"; key: string; label: string; help?: string }
  | { type: "packages"; key: string; label: string; help?: string }
  | { type: "sources"; key: string; label: string; help?: string };

export type Section = { title: string; intro?: string; fields: Field[] };

export type KindInfo = {
  kind: ListKind;
  /** The address part in /admin and on the site. */
  path: string;
  sitePath: string;
  plural: string;
  singular: string;
  /** The field that names a record, also used to make its web address. */
  nameKey: string;
  intro: string;
  sections: Section[];
};

const pictureHelp = "A clear photo, at least 1200 pixels wide. JPG, PNG or WebP.";

export const kinds: Record<ListKind, KindInfo> = {
  hospital: {
    kind: "hospital",
    path: "hospitals",
    sitePath: "/hospitals",
    plural: "Hospitals",
    singular: "hospital",
    nameKey: "name",
    intro: "Partner hospitals, their photos, treatments and package prices.",
    sections: [
      {
        title: "Basics",
        fields: [
          { type: "text", key: "name", label: "Hospital name", required: true, max: 120 },
          { type: "text", key: "city", label: "City", required: true, max: 60 },
          { type: "text", key: "address", label: "Street address", help: "Shown on the hospital's page.", max: 200 },
          {
            type: "text",
            key: "accreditation",
            label: "Accreditation",
            help: "For example JCI or NABH. Leave empty if the hospital names none.",
            max: 120,
          },
          {
            type: "textarea",
            key: "overview",
            label: "About the hospital",
            help: "A short paragraph in plain words.",
            required: true,
            rows: 6,
            max: 2000,
          },
          {
            type: "checkbox",
            key: "pending",
            label: "Details still to be confirmed",
            help: "Shows a small 'to be confirmed' note on the page.",
          },
        ],
      },
      {
        title: "Photos",
        fields: [
          { type: "picture", key: "picture", label: "Main photo", help: pictureHelp },
          { type: "gallery", key: "gallery", label: "More photos", help: "Shown in the gallery on the hospital's page." },
        ],
      },
      {
        title: "What the hospital offers",
        fields: [
          { type: "checklist", key: "specialities", label: "Specialities", options: "specialities" },
          { type: "checklist", key: "treatments", label: "Treatments offered here", options: "treatments" },
          {
            type: "lines",
            key: "centres",
            label: "Centres of excellence",
            help: "One per line. Leave empty to hide this list.",
            omitEmpty: true,
          },
          {
            type: "lines",
            key: "services",
            label: "Services for international patients",
            help: "One per line, for example 'Airport pickup'.",
          },
        ],
      },
      {
        title: "Package prices",
        intro: "Prices the hospital has supplied, in US dollars. Without any, the page invites visitors to ask for a quote.",
        fields: [{ type: "packages", key: "packages", label: "Packages" }],
      },
    ],
  },

  doctor: {
    kind: "doctor",
    path: "doctors",
    sitePath: "/doctors",
    plural: "Doctors",
    singular: "doctor",
    nameKey: "name",
    intro: "Doctors at partner hospitals and the treatments they perform.",
    sections: [
      {
        title: "Basics",
        fields: [
          { type: "text", key: "name", label: "Full name", help: "With the title, for example 'Dr Asha Rao'.", required: true, max: 100 },
          { type: "text", key: "role", label: "Job title", help: "As the hospital gives it.", required: true, max: 160 },
          { type: "select", key: "hospital", label: "Hospital", options: "hospitals", required: true },
          { type: "select", key: "speciality", label: "Speciality", options: "specialities", required: true },
          {
            type: "text",
            key: "experience",
            label: "Experience",
            help: "Written out, for example 'More than 20 years'.",
            required: true,
            max: 160,
          },
          { type: "text", key: "otherPractice", label: "Also sees patients at", help: "Optional.", max: 160 },
          {
            type: "checkbox",
            key: "pending",
            label: "Details still to be confirmed",
            help: "Shows a small 'to be confirmed' note on the page.",
          },
        ],
      },
      {
        title: "Photo",
        fields: [{ type: "picture", key: "picture", label: "Portrait", help: "A head-and-shoulders photo works best. JPG, PNG or WebP." }],
      },
      {
        title: "Profile",
        fields: [
          { type: "textarea", key: "profile", label: "About the doctor", required: true, rows: 6, max: 2000 },
          { type: "lines", key: "qualifications", label: "Qualifications", help: "One per line." },
          { type: "lines", key: "expertise", label: "Areas of expertise", help: "One per line." },
          { type: "lines", key: "languages", label: "Languages spoken", help: "One per line. Leave empty to hide." },
          { type: "checklist", key: "treatments", label: "Treatments this doctor performs", options: "treatments" },
        ],
      },
    ],
  },

  treatment: {
    kind: "treatment",
    path: "treatments",
    sitePath: "/treatments",
    plural: "Treatments",
    singular: "treatment",
    nameKey: "name",
    intro: "Treatment pages. Which hospitals and doctors offer each one is set on the hospital and doctor.",
    sections: [
      {
        title: "Basics",
        fields: [
          { type: "text", key: "name", label: "Treatment name", required: true, max: 120 },
          { type: "select", key: "speciality", label: "Speciality", options: "specialities", required: true },
          { type: "textarea", key: "summary", label: "Short summary", help: "One or two sentences for lists and search.", required: true, rows: 3, max: 400 },
          {
            type: "checkbox",
            key: "checked",
            label: "Checked by a doctor",
            help: "Until this is ticked, the page says the text is waiting for a doctor's check.",
          },
        ],
      },
      {
        title: "The page",
        fields: [
          { type: "textarea", key: "what", label: "What it is", required: true, rows: 5, max: 2000 },
          { type: "textarea", key: "who", label: "Who it is for", required: true, rows: 4, max: 2000 },
          { type: "textarea", key: "stay", label: "How long you stay in India", required: true, rows: 3, max: 1000 },
          { type: "textarea", key: "recovery", label: "Recovery", required: true, rows: 4, max: 2000 },
          { type: "faq", key: "faq", label: "Questions and answers" },
        ],
      },
    ],
  },

  post: {
    kind: "post",
    path: "blog",
    sitePath: "/blog",
    plural: "Blog posts",
    singular: "blog post",
    nameKey: "title",
    intro: "Articles on the blog. Write in plain words; leave patients unnamed.",
    sections: [
      {
        title: "Basics",
        fields: [
          { type: "text", key: "title", label: "Title", required: true, max: 160 },
          { type: "textarea", key: "summary", label: "Short summary", help: "Shown in the list of posts.", required: true, rows: 3, max: 400 },
          { type: "select", key: "category", label: "Category", options: "categories", required: true },
          { type: "text", key: "author", label: "Author", required: true, max: 80 },
          { type: "date", key: "date", label: "Date", help: "Leave empty to show no date." },
        ],
      },
      {
        title: "The article",
        fields: [
          {
            type: "paragraphs",
            key: "body",
            label: "Text",
            help: "Leave an empty line between paragraphs.",
            required: true,
          },
          { type: "picture", key: "picture", label: "Photo", help: pictureHelp, omitEmpty: true },
          { type: "sources", key: "sources", label: "Sources", help: "Where the facts come from. Each needs a name and a web address." },
        ],
      },
      {
        title: "Related pages",
        fields: [
          { type: "checklist", key: "treatments", label: "Treatments this post is about", options: "treatments" },
          { type: "checklist", key: "hospitals", label: "Hospitals this post is about", options: "hospitals" },
        ],
      },
    ],
  },
};

export const kindByPath = Object.fromEntries(Object.values(kinds).map((k) => [k.path, k])) as Record<string, KindInfo>;

/** A blank record of each kind, for "Add". */
export function blankRecord(kind: ListKind): Record<string, unknown> {
  const picture = { src: null, alt: "", pending: true };
  switch (kind) {
    case "hospital":
      return { slug: "", name: "", city: "", overview: "", specialities: [], treatments: [], services: [], picture, gallery: [] };
    case "doctor":
      return {
        slug: "",
        name: "",
        speciality: "",
        role: "",
        hospital: "",
        experience: "",
        qualifications: [],
        languages: [],
        expertise: [],
        treatments: [],
        profile: "",
        picture,
      };
    case "treatment":
      return { slug: "", checked: false, name: "", speciality: "", summary: "", what: "", who: "", stay: "", recovery: "", faq: [] };
    case "post":
      return { slug: "", title: "", date: null, category: "", author: "Medsafar", summary: "", body: [], treatments: [], hospitals: [] };
  }
}

/** A web address from a name: "Dr Asha Rao" becomes "asha-rao" for a doctor. */
export function slugFrom(kind: ListKind, name: string): string {
  let text = name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
  if (kind === "doctor") text = text.replace(/^(dr|prof|professor)\.?\s+/, "");
  return text
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}
