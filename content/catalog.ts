import type { CatalogContent } from "./types";

/**
 * Text for the hospital, doctor and treatment pages. These pages are shared:
 * one copy for every country. The records themselves come from
 * lib/catalog.ts, not from here.
 */
export const catalog: CatalogContent = {
  seo: {
    treatmentTitle: "{name} in India: cost and hospitals",
    treatmentDescription: "{name} in India: costs at accredited hospitals in {cities}, expert doctors and a free written estimate. Visa and travel arranged.",
    specialityTitle: "{name} in India",
    hospitalTitle: "{name}, {city}",
    doctorTitle: "{name}, {role}",
  },
  medicalNote:
    "General information only, to give you a rough idea. It is not medical advice, it may contain mistakes, and it may not fit your case. We are not doctors and are not responsible for decisions made from this page. Please confirm everything with your own doctor.",
  legalNote: "This page is a translation, for your convenience. Only the English version is legally binding. If the two differ, the English version applies.",
  legalEnglish: "Read It in English",
  legalContents: "On This Page",
  filters: {
    heading: "Filter",
    all: "All",
    clear: "Clear Filters",
    empty: "Nothing matches these filters yet. Clear them to see everything.",
    result: "result",
    results: "results",
    search: "Search",
    allSpecialities: "All Specialities",
    specialities: "Specialities",
  },

  hospitals: {
    meta: {
      title: "Accredited Hospitals in India",
      description:
        "Accredited hospitals in Mumbai and across India for international patients. Compare package prices, treatments and doctors, and get a free cost estimate.",
    },
    eyebrow: "Hospitals",
    heading: "Accredited Hospitals in India",
    intro:
      "We match the hospital to the case, not the other way round. You see the choice, the doctor and the estimate before you decide.",
    note: "More partner hospitals are being added. Every hospital here is one Med Safar works with directly.",
    back: "All Hospitals",
    filters: { city: "City", speciality: "Speciality" },
    searchPlaceholder: "Search by hospital, city or treatment",
    stats: { specialities: "Specialities", doctors: "Doctors", treatments: "Treatments" },
    browse: {
      heading: "Browse by Speciality",
      intro: "Pick what you need treated to see the hospitals that handle it.",
      all: "All Specialities",
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
      centres: "Centres of Excellence",
      services: "Services for International Patients",
      photos: "Photos",
      gallery: { all: "Show All Photos", close: "Close", previous: "Previous photo", next: "Next photo" },
      videos: "Videos",
      doctors: "Doctors at This Hospital",
      treatments: "Treatments Offered",
      treatmentSearch: {
        label: "Search the treatments at this hospital",
        placeholder: "Search treatments, for example knee",
        count: "{n} of {total} treatments",
        none: "No treatment here matches “{q}”. Ask us: the hospital may still treat it.",
      },
      packages: "Package Prices",
      priceFrom: "Packages from",
      packagesNote:
        "Package prices from the hospital, in US dollars, for the hospital stay shown. Your written estimate confirms the final cost for your case, including anything outside the package.",
      quoteHeading: "Ask for a Price",
      quoteBody:
        "This hospital has not published package prices. Send your reports and we'll come back with a written estimate for your case.",
      quoteCta: "Request a Quote",
    },
  },

  doctors: {
    meta: {
      title: "Experienced Doctors and Surgeons in India",
      description:
        "Experienced doctors and surgeons at accredited hospitals in India. Filter by speciality and hospital, then book a free consultation for your treatment.",
    },
    eyebrow: "Doctors",
    heading: "Experienced Doctors and Surgeons in India",
    intro:
      "Your doctor is chosen for your case once a specialist has read the reports. These are the doctors we work with.",
    note: "Profiles are taken from the hospital's own doctor profiles. Ask us about any doctor who is not listed.",
    back: "All Doctors",
    filters: { speciality: "Speciality", hospital: "Hospital" },
    searchPlaceholder: "Search by doctor, speciality or hospital",
    stats: { doctors: "Doctors", specialities: "Specialities", hospitals: "Partner hospitals" },
    view: "View Profile",
    book: {
      button: "Book a Consultation with {name}",
      short: "Book a Consultation",
      heading: "Book a Consultation with {name}",
      support:
        "Leave your mobile number. We arrange a one-on-one consultation with {name} and confirm the time with you. It costs nothing to ask.",
      submit: "Book My Consultation",
    },
    detail: {
      profile: "Profile",
      speciality: "Speciality",
      hospital: "Hospital",
      experience: "Experience",
      qualifications: "Qualifications and Training",
      languages: "Languages",
      expertise: "Areas of Expertise",
      otherPractice: "Also Sees Patients at",
      procedures: "Procedures",
      worksAt: "Where This Doctor Works",
      source:
        "This profile is taken from the hospital's own doctor profile. Details can change, so the hospital confirms them before you decide.",
    },
  },

  treatments: {
    meta: {
      title: "Affordable Medical Treatment in India",
      description:
        "Low-cost surgery, cancer care, transplants and more at accredited hospitals in India. See costs and doctors, then get a free treatment plan and estimate.",
    },
    eyebrow: "Treatments",
    heading: "Affordable Medical Treatment in India",
    intro:
      "Find the treatment you have been advised to have, or tell us what is wrong and a doctor will advise.",
    note: "Each description is a general guide, written in plain words. Your doctor will tell you what applies to your case.",
    back: "All Treatments",
    stats: { treatments: "Treatments", specialities: "Specialities", doctors: "Doctors" },
    jump: "Jump to a Speciality",
    more: "See Doctors and Hospitals",
    one: "treatment",
    many: "treatments",
    detail: {
      what: "What It Is",
      who: "Who Needs It",
      stay: "Typical Hospital Stay",
      recovery: "Recovery Time",
      hospitals: "Hospitals Offering This Treatment",
      doctors: "Doctors for This Treatment",
      fieldDoctors: "Specialists in This Field",
      fieldDoctorsIntro:
        "These doctors work in this speciality at our partner hospitals. Send your reports and they can advise whether this treatment is right for you.",
      noDoctors:
        "No specialist doctors in this field are listed yet. Send your reports and we will find the right specialist for you.",
      faq: "Questions About This Treatment",
      cost: {
        heading: "What Affects the Cost",
        intro:
          "Every patient gets their own estimate, in writing, from the hospital. These are the things that move it.",
        factors: [
          {
            title: "The Hospital and the City",
            body: "Room types, equipment and running costs differ from one hospital to the next.",
          },
          {
            title: "The Doctor",
            body: "A surgeon's fee follows their experience and how complex the operation is.",
          },
          {
            title: "The Technique and the Materials",
            body: "Keyhole or robotic surgery, and the make of any implant, can change the price.",
          },
          {
            title: "Your Health",
            body: "Other conditions, earlier treatment and the tests you need before treatment all count.",
          },
          {
            title: "How Long You Stay",
            body: "Days in hospital, any time in intensive care and the weeks you spend recovering in India.",
          },
          {
            title: "What Else You Need",
            body: "Physiotherapy, medicines to take home and follow-up visits are added only if your doctor asks for them.",
          },
        ],
        note: "The estimate is not final until the doctor has examined you in India. If anything changes, we explain it before you agree to it.",
        cta: "Get Your Written Estimate",
      },
      speciality: "More in",
    },
  },

  specialities: {
    meta: {
      title: "Medical Specialities in India",
      description:
        "Cancer, heart, transplant, orthopaedic, IVF and more: the treatments, doctors and hospitals in India for each speciality, with a free treatment plan.",
    },
    eyebrow: "Specialities",
    heading: "Medical Specialities in India",
    intro:
      "Pick a speciality to see its treatments, the doctors who carry them out and the hospitals that offer them.",
    note: "More specialities are being added as Med Safar takes on new partner hospitals.",
    back: "All Specialities",
    stats: { specialities: "Specialities", treatments: "Treatments", doctors: "Doctors" },
    view: "See Treatments",
    detail: {
      treatments: "Treatments",
      doctors: "Doctors",
      hospitals: "Hospitals",
      stats: { treatments: "Treatments", doctors: "Doctors", hospitals: "Hospitals" },
      faq: "How Long Will I Be in India?",
      stayQuestion: "{treatment}: how long will I stay?",
    },
  },

  blog: {
    meta: {
      title: "Medical Travel to India: Patient Guides",
      description:
        "Guides for international patients travelling to India for treatment: costs, medical visas, what to expect, how to prepare and recovery back home.",
    },
    eyebrow: "Blogs",
    heading: "Medical Travel to India: Patient Guides",
    intro: "What to expect, how to prepare and what happens after you fly home.",
    note: "Every article names its sources.",
    back: "All Articles",
    filters: { category: "Category" },
    undated: "Date to be supplied",
    detail: {
      related: "More to Read",
      sources: "Sources",
      disclaimer:
        "This article is general information, not medical advice. Every patient is different, and results vary. Talk to your own doctor before deciding on any treatment.",
      disclaimerLink: "Read Our Full Disclaimer",
      treatments: "Treatments in This Article",
      hospitals: "Hospitals in This Article",
    },
  },

  enquiry: {
    heading: "Start with a Free Treatment Plan.",
    support:
      "Leave your mobile number. A case manager will come back to you, and you can add your reports whenever you are ready.",
  },
};
