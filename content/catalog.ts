import type { CatalogContent } from "./types";

/**
 * Text for the hospital, doctor and treatment pages. These pages are shared:
 * one copy for every country. The records themselves come from
 * lib/catalog.ts, not from here.
 */
export const catalog: CatalogContent = {
  filters: {
    heading: "Filter",
    all: "All",
    clear: "Clear filters",
    empty: "Nothing matches these filters yet. Clear them to see everything.",
    result: "result",
    results: "results",
  },

  hospitals: {
    meta: {
      title: "Partner hospitals in India. Medsafar India.",
      description:
        "Hospitals in India that Medsafar works with. Filter by city and speciality, then ask for a free treatment plan.",
    },
    eyebrow: "Hospitals",
    heading: "Partner hospitals in India",
    intro:
      "We match the hospital to the case, not the other way round. You see the choice, the doctor and the estimate before you decide.",
    note: "More partner hospitals are being added. Every hospital here is one Medsafar works with directly.",
    back: "All hospitals",
    filters: { city: "City", speciality: "Speciality" },
    detail: {
      overview: "Overview",
      accreditation: "Accreditation",
      specialities: "Specialities",
      address: "Address",
      centres: "Centres of excellence",
      services: "Services for international patients",
      photos: "Photos",
      videos: "Videos",
      doctors: "Doctors at this hospital",
      treatments: "Treatments offered",
    },
  },

  doctors: {
    meta: {
      title: "Doctors at partner hospitals in India. Medsafar India.",
      description:
        "Doctors at the hospitals Medsafar works with in India. Filter by speciality and hospital, then ask for a free treatment plan.",
    },
    eyebrow: "Doctors",
    heading: "Doctors at our partner hospitals",
    intro:
      "Your doctor is chosen for your case once a specialist has read the reports. These are the doctors we work with.",
    note: "Profiles are taken from the hospital's own doctor profiles. Ask us about any doctor who is not listed.",
    back: "All doctors",
    filters: { speciality: "Speciality", hospital: "Hospital" },
    detail: {
      profile: "Profile",
      speciality: "Speciality",
      hospital: "Hospital",
      experience: "Experience",
      qualifications: "Qualifications and training",
      languages: "Languages",
      expertise: "Areas of expertise",
      otherPractice: "Also sees patients at",
      procedures: "Procedures",
      worksAt: "Where this doctor works",
    },
  },

  treatments: {
    meta: {
      title: "Treatments in India. Medsafar India.",
      description:
        "Treatments Medsafar arranges at partner hospitals in India, grouped by speciality. Ask for a free treatment plan for your case.",
    },
    eyebrow: "Treatments",
    heading: "Treatments we arrange in India",
    intro:
      "Find the treatment you have been advised to have, or tell us what is wrong and a doctor will advise.",
    note: "The treatments listed are examples. Descriptions are placeholders until a doctor has written and checked them.",
    back: "All treatments",
    detail: {
      what: "What it is",
      who: "Who needs it",
      stay: "Typical hospital stay",
      recovery: "Recovery time",
      hospitals: "Hospitals offering this treatment",
      doctors: "Doctors for this treatment",
      faq: "Questions about this treatment",
    },
  },

  blog: {
    meta: {
      title: "Blog. Medsafar India.",
      description:
        "Guides for patients travelling to India for treatment: what to expect, how to prepare and what happens afterwards.",
    },
    eyebrow: "Blog",
    heading: "Guides for patients and families",
    intro: "What to expect, how to prepare and what happens after you fly home.",
    note: "Every article names its sources. Anything medical is checked by a doctor before it is published.",
    back: "All articles",
    filters: { category: "Category" },
    undated: "Date to be supplied",
    detail: {
      related: "More to read",
      sources: "Sources",
      treatments: "Treatments in this article",
      hospitals: "Hospitals in this article",
    },
  },

  enquiry: {
    heading: "Start with a free treatment plan.",
    support:
      "Leave your mobile number. A case manager will come back to you, and you can add your reports whenever you are ready.",
  },
};
