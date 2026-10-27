import type { CatalogContent } from "./types";

/**
 * Text for the hospital, doctor and treatment pages. These pages are shared:
 * one copy for every country. The records themselves come from
 * lib/catalog.ts, not from here.
 */
export const catalog: CatalogContent = {
  draft: "Pending doctor check",
  legalNote: "This page is a translation, for your convenience. Only the English version is legally binding. If the two differ, the English version applies.",
  legalEnglish: "Read it in English",
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
    stats: { specialities: "Specialities", doctors: "Doctors", treatments: "Treatments" },
    browse: {
      heading: "Browse by speciality",
      intro: "Pick what you need treated to see the hospitals that handle it.",
      all: "All specialities",
      one: "hospital",
      many: "hospitals",
      showing: "Hospitals for",
      more: "Treatments and doctors in",
    },
    detail: {
      overview: "Overview",
      accreditation: "Accreditation",
      specialities: "Specialities",
      address: "Address",
      centres: "Centres of excellence",
      services: "Services for international patients",
      photos: "Photos",
      gallery: { all: "Show all photos", close: "Close", previous: "Previous photo", next: "Next photo" },
      videos: "Videos",
      doctors: "Doctors at this hospital",
      treatments: "Treatments offered",
      packages: "Package prices",
      priceFrom: "Packages from",
      packagesNote:
        "Package prices from the hospital, in US dollars, for the hospital stay shown. Your written estimate confirms the final cost for your case, including anything outside the package.",
      quoteHeading: "Ask for a price",
      quoteBody:
        "This hospital has not published package prices. Send your reports and we'll come back with a written estimate for your case.",
      quoteCta: "Request a quote",
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
    stats: { doctors: "Doctors", specialities: "Specialities", hospitals: "Partner hospitals" },
    view: "View profile",
    book: {
      button: "Book a consultation with {name}",
      short: "Book a consultation",
      heading: "Book a consultation with {name}",
      support:
        "Leave your mobile number. We arrange a one-on-one consultation with {name} and confirm the time with you. It costs nothing to ask.",
      submit: "Book my consultation",
    },
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
    note: "Each description is written in plain words and marked until a doctor has checked it.",
    back: "All treatments",
    stats: { treatments: "Treatments", specialities: "Specialities", doctors: "Doctors" },
    jump: "Jump to a speciality",
    more: "See doctors and hospitals",
    one: "treatment",
    many: "treatments",
    detail: {
      what: "What it is",
      who: "Who needs it",
      stay: "Typical hospital stay",
      recovery: "Recovery time",
      hospitals: "Hospitals offering this treatment",
      doctors: "Doctors for this treatment",
      faq: "Questions about this treatment",
      cost: {
        heading: "What affects the cost",
        intro:
          "Every patient gets their own estimate, in writing, from the hospital. These are the things that move it.",
        factors: [
          {
            title: "The hospital and the city",
            body: "Room types, equipment and running costs differ from one hospital to the next.",
          },
          {
            title: "The doctor",
            body: "A surgeon's fee follows their experience and how complex the operation is.",
          },
          {
            title: "The technique and the materials",
            body: "Keyhole or robotic surgery, and the make of any implant, can change the price.",
          },
          {
            title: "Your health",
            body: "Other conditions, earlier treatment and the tests you need before treatment all count.",
          },
          {
            title: "How long you stay",
            body: "Days in hospital, any time in intensive care and the weeks you spend recovering in India.",
          },
          {
            title: "What else you need",
            body: "Physiotherapy, medicines to take home and follow-up visits are added only if your doctor asks for them.",
          },
        ],
        note: "The estimate is not final until the doctor has examined you in India. If anything changes, we explain it before you agree to it.",
        cta: "Get your written estimate",
      },
      speciality: "More in",
    },
  },

  specialities: {
    meta: {
      title: "Specialities. Medsafar India.",
      description:
        "The kinds of care Medsafar arranges in India, with the treatments, doctors and hospitals for each.",
    },
    eyebrow: "Specialities",
    heading: "What we can help you with",
    intro:
      "Pick a speciality to see its treatments, the doctors who carry them out and the hospitals that offer them.",
    note: "More specialities are being added as Medsafar takes on new partner hospitals.",
    back: "All specialities",
    stats: { specialities: "Specialities", treatments: "Treatments", doctors: "Doctors" },
    view: "See treatments",
    detail: {
      treatments: "Treatments",
      doctors: "Doctors",
      hospitals: "Hospitals",
      stats: { treatments: "Treatments", doctors: "Doctors", hospitals: "Hospitals" },
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
