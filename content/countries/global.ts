import type { CountryContent } from "../types";

/**
 * The home page. Same shape and same layout as every country file, written for
 * a visitor whose country we do not know yet.
 */
export const global: CountryContent = {
  slug: "",
  iso: null,
  countryName: null,

  meta: {
    title: "Medsafar India. Treatment in India, arranged end to end.",
    description:
      "Medsafar helps patients abroad get treatment in India. We arrange the hospital, the doctor, a written cost estimate, the visa, travel, stay and follow-up care.",
  },

  hero: {
    eyebrow: "Medical travel to India",
    headline: "Treatment in India, arranged from start to finish.",
    support:
      "Send your reports. We come back with a doctor's opinion, a written cost estimate and a travel plan.",
    // Stock photo, illustration only: Pexels 31499386, Adarsh MP. Pexels Licence.
    picture: {
      src: "/photos/hero-global.jpg",
      alt: "Two nurses talking in a hospital corridor in India",
      pending: false,
    },
  },

  trust: {
    heading: "What you can hold us to",
    promises: [
      "One case manager, from your first message to your flight home",
      "A written estimate, prepared by the hospital for your case",
      "Help in your language at every step",
    ],
    accreditations: [
      {
        name: "Partner hospital accreditation",
        body: "Accreditation name and certificate, to be supplied by Medsafar.",
        pending: true,
      },
      {
        name: "Partner hospital accreditation",
        body: "Accreditation name and certificate, to be supplied by Medsafar.",
        pending: true,
      },
      {
        name: "Partner hospital accreditation",
        body: "Accreditation name and certificate, to be supplied by Medsafar.",
        pending: true,
      },
    ],
    note: "Accreditations appear here once Medsafar has supplied certificates it can prove.",
  },

  howItWorks: {
    heading: "How it works",
    intro: "Four steps. Nothing costs you anything until you agree to travel.",
    steps: [
      {
        title: "Send your reports",
        body: "Share your mobile number, then your diagnosis, scans or discharge summary. A photo of a paper report is enough.",
      },
      {
        title: "Get a plan and a cost",
        body: "A doctor at a partner hospital reads the case. You receive a written treatment plan, an estimate prepared for you and the length of stay.",
      },
      {
        title: "We arrange the travel",
        body: "Medical visa invitation, flights, airport pickup, a place to stay near the hospital and an interpreter if you need one.",
      },
      {
        title: "Treatment and follow-up",
        body: "Your case manager stays with you in India, and we keep the link with your doctor open after you fly home.",
      },
    ],
  },

  hospitals: {
    heading: "Partner hospitals",
    intro:
      "We match the hospital to the case, not the other way round. You see the choice, the doctor and the estimate before you decide.",
    featured: ["nanavati-max", "kenia-eye", "kenia-dental"],
    note: "More partner hospitals are being added. Your doctor is chosen for your case once a specialist has read the reports.",
  },

  handled: {
    heading: "What we handle",
    intro: "Everything outside the operating theatre is ours to organise.",
    items: [
      {
        icon: "visa",
        title: "Medical visa",
        body: "We prepare the hospital invitation letter and tell you exactly which papers to carry to the embassy.",
      },
      {
        icon: "pickup",
        title: "Airport pickup",
        body: "Someone from Medsafar meets you at the airport and takes you to the hospital or to your room.",
      },
      {
        icon: "stay",
        title: "Where you stay",
        body: "A room for you and the person travelling with you, close to the hospital and chosen to fit your budget.",
      },
      {
        icon: "interpreter",
        title: "Interpreter",
        body: "Someone who speaks your language is with you in the consultation room, so nothing is lost.",
      },
      {
        icon: "aftercare",
        title: "Follow-up at home",
        body: "Discharge papers, medicines, the follow-up schedule and a way to reach your doctor after you fly back.",
      },
    ],
  },

  stories: {
    heading: "Patients we have helped",
    intro: "Real stories go here, with the patient's permission, once Medsafar has cleared them.",
    items: [
      {
        quote:
          "Patient story to be supplied, in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City",
        treatment: "Treatment",
        pending: true,
        picture: { src: null, alt: "Portrait of the patient, used with permission", pending: true },
      },
      {
        quote:
          "Patient story to be supplied, in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City",
        treatment: "Treatment",
        pending: true,
        picture: { src: null, alt: "Portrait of the patient, used with permission", pending: true },
      },
      {
        quote:
          "Patient story to be supplied, in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City",
        treatment: "Treatment",
        pending: true,
        picture: { src: null, alt: "Portrait of the patient, used with permission", pending: true },
      },
    ],
    note: "No story on this page is real yet. Nothing is published without the patient's written consent.",
  },

  countryInfo: {
    heading: "Travelling to India for treatment",
    intro: "What the journey looks like, wherever you are starting from.",
    visa: {
      heading: "Medical visa",
      steps: [
        "We send you an invitation letter from the treating hospital, with the plan and the dates.",
        "You apply for an Indian medical visa with that letter, your passport and your reports.",
        "One or two people travelling with you can apply as medical attendants.",
        "We tell you which documents to carry and check them with you before the appointment.",
      ],
      note: "Visa rules are set by the Indian government and can change. We confirm the current requirement for your country before you apply.",
    },
    flights: {
      heading: "Flights",
      body: "We book the route that suits your condition and your budget, and plan the arrival so someone can meet you.",
      routes: [{ label: "Routes and airlines to be supplied", pending: true }],
    },
    language: {
      heading: "Language support",
      body: "English is used in Indian hospitals. Where you need another language, we arrange an interpreter for consultations and for the paperwork.",
    },
  },

  faq: {
    heading: "Questions patients ask",
    items: [
      {
        question: "What does Medsafar charge me?",
        answer:
          "Nothing for the treatment plan and the cost estimate. You pay the hospital for treatment and the usual costs of travel and stay. Anything Medsafar charges is written down before you agree to it.",
      },
      {
        question: "Why is there no price on this page?",
        answer:
          "Because a real figure depends on your reports, the hospital and the length of stay. Where a hospital has given us its package prices, they are on that hospital's page as a guide. Either way, we send you a written estimate prepared for your case.",
      },
      {
        question: "Is Medsafar a hospital?",
        answer:
          "No. Medsafar is a medical travel facilitator. Treatment is given by independent hospitals and doctors in India. We arrange everything around it.",
      },
      {
        question: "Which reports should I send?",
        answer:
          "Whatever you already have: the doctor's letter, scans, blood test results or a discharge summary. Clear photos taken on a phone are fine.",
      },
      {
        question: "How soon will someone reply?",
        answer:
          "A case manager picks up your enquiry and comes back to you on WhatsApp or by call. A doctor's opinion takes longer, because a specialist has to read the reports.",
      },
      {
        question: "How many days will I spend in India?",
        answer:
          "That depends on what you need. A check-up or a minor procedure may take only a few days. A major operation, such as a knee or hip replacement, usually means two to three weeks, so you can recover before the flight home. Your treatment plan tells you what to expect.",
      },
      {
        question: "Can a family member travel with me?",
        answer:
          "Yes, and it helps to have someone with you. Indian medical visas allow attendants, so we add them to the visa invitation and arrange a room for them near the hospital.",
      },
      {
        question: "How does paying for treatment work?",
        answer:
          "You pay the hospital, based on the written estimate it gives you. Some hospitals take a small deposit to confirm your admission, and the balance is paid after you arrive. We go through every amount with you beforehand.",
      },
      {
        question: "Does Medsafar help after I return home?",
        answer:
          "Yes. We arrange follow-up calls with your doctor, share your reports with your local doctor if you want, and stay in touch while you recover.",
      },
      {
        question: "What happens to my medical reports?",
        answer:
          "They go to the doctors and hospitals reviewing your case, and nowhere else. You tick a box to allow that before we share anything.",
      },
    ],
  },

  enquiry: {
    heading: "Start with a free treatment plan.",
    support:
      "Leave your mobile number. A case manager will come back to you, and you can add your reports whenever you are ready.",
  },
};
