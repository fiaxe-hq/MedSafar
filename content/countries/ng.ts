import type { CountryContent } from "../types";

/**
 * Nigeria. Same shape and same layout as the home page. Only the words,
 * photos, stories and travel information change.
 */
export const ng: CountryContent = {
  slug: "ng",
  iso: "NG",
  countryName: "Nigeria",

  meta: {
    title: "Treatment in India for patients from Nigeria. Medsafar India.",
    description:
      "Medsafar helps patients in Nigeria get treatment in India: a doctor's opinion, a written cost estimate, the medical visa, flights, a place to stay and follow-up care after you return.",
  },

  hero: {
    eyebrow: "For patients travelling from Nigeria",
    headline: "Treatment in India, arranged for you from Nigeria.",
    support:
      "Send your reports from anywhere in Nigeria. We come back with a doctor's opinion and a written cost estimate.",
    picture: {
      src: null,
      alt: "A Nigerian patient and their family, photographed with permission",
      pending: true,
    },
  },

  trust: {
    heading: "What you can hold us to",
    promises: [
      "One case manager, reachable on WhatsApp from Nigeria",
      "A written estimate, prepared by the hospital for your case",
      "A medical visa invitation letter prepared for you",
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
        body: "Share your mobile number, then your diagnosis, scans or discharge summary. A photo taken on your phone is enough.",
      },
      {
        title: "Get a plan and a cost",
        body: "A doctor at a partner hospital in India reads the case. You receive a written treatment plan, an estimate prepared for you and the length of stay.",
      },
      {
        title: "We arrange the travel",
        body: "Medical visa invitation, flights from Nigeria, airport pickup in India, a place to stay near the hospital and an interpreter if you need one.",
      },
      {
        title: "Treatment and follow-up",
        body: "Your case manager stays with you in India, and we keep the link with your doctor open after you return to Nigeria.",
      },
    ],
  },

  hospitals: {
    heading: "Partner hospitals",
    intro:
      "We match the hospital to the case, not the other way round. You see the choice, the doctor and the estimate before you decide.",
    featured: ["partner-hospital-a", "partner-hospital-b", "partner-hospital-c"],
    note: "Hospital names, cities and accreditations are placeholders until Medsafar confirms its partner list. Your doctor is chosen for your case once a specialist has read the reports.",
  },

  handled: {
    heading: "What we handle",
    intro: "Everything outside the operating theatre is ours to organise.",
    items: [
      {
        icon: "visa",
        title: "Medical visa",
        body: "We prepare the hospital invitation letter and tell you exactly which papers to carry to the Indian mission in Nigeria.",
      },
      {
        icon: "pickup",
        title: "Airport pickup",
        body: "Someone from Medsafar meets you when you land in India and takes you to the hospital or to your room.",
      },
      {
        icon: "stay",
        title: "Where you stay",
        body: "A room for you and the person travelling with you, close to the hospital and chosen to fit your budget.",
      },
      {
        icon: "interpreter",
        title: "Interpreter",
        body: "Tell us the language you are most comfortable in and we arrange someone to be with you in the consultation room.",
      },
      {
        icon: "aftercare",
        title: "Follow-up in Nigeria",
        body: "Discharge papers, medicines, the follow-up schedule and a way to reach your doctor after you fly home.",
      },
    ],
  },

  stories: {
    heading: "Patients from Nigeria",
    intro:
      "Stories from Nigerian patients go here, with their permission, once Medsafar has cleared them.",
    items: [
      {
        quote:
          "Story from a patient in Nigeria, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Nigeria",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Nigerian patient, used with permission",
          pending: true,
        },
      },
      {
        quote:
          "Story from a patient in Nigeria, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Nigeria",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Nigerian patient, used with permission",
          pending: true,
        },
      },
      {
        quote:
          "Story from a patient in Nigeria, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Nigeria",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Nigerian patient, used with permission",
          pending: true,
        },
      },
    ],
    note: "No story on this page is real yet. Nothing is published without the patient's written consent.",
  },

  countryInfo: {
    heading: "Nigeria to India",
    intro: "What the journey looks like when you start from Nigeria.",
    visa: {
      heading: "Medical visa from Nigeria",
      steps: [
        "We send you an invitation letter from the treating hospital in India, with the plan and the dates.",
        "You apply for an Indian medical visa at the Indian mission in Nigeria, with that letter, your passport and your reports.",
        "One or two people travelling with you can apply as medical attendants.",
        "We tell you which documents to carry and check them with you before your appointment.",
      ],
      note: "Visa rules are set by the Indian government and can change. We confirm the current requirement for Nigeria before you apply.",
    },
    flights: {
      heading: "Flights from Nigeria",
      body: "Most patients fly from Lagos or Abuja with one stop on the way to India. We book the route that suits your condition and your budget.",
      routes: [{ label: "Routes, airlines and journey times to be supplied", pending: true }],
    },
    language: {
      heading: "Language support",
      body: "English is used in Indian hospitals and by our team, so most Nigerian patients need no interpreter. If you would rather speak another language, tell us and we arrange someone for your consultations.",
    },
  },

  faq: {
    heading: "Questions patients from Nigeria ask",
    items: [
      {
        question: "What does Medsafar charge me?",
        answer:
          "Nothing for the treatment plan and the cost estimate. You pay the hospital for treatment and the usual costs of travel and stay. Anything Medsafar charges is written down before you agree to it.",
      },
      {
        question: "Why is there no price on this page?",
        answer:
          "Because a real figure depends on your reports, the hospital and the length of stay. A number on a web page would be a guess. We send you an estimate prepared for your case.",
      },
      {
        question: "Is Medsafar a hospital?",
        answer:
          "No. Medsafar is a medical travel facilitator. Treatment is given by independent hospitals and doctors in India. We arrange everything around it.",
      },
      {
        question: "How do I get the medical visa?",
        answer:
          "We prepare the hospital invitation letter and the checklist, and you apply at the Indian mission in Nigeria. We go through your papers with you first so nothing is missing.",
      },
      {
        question: "Which reports should I send?",
        answer:
          "Whatever you already have: the doctor's letter, scans, blood test results or a discharge summary. Clear photos taken on a phone are fine.",
      },
      {
        question: "Can my wife, husband or child travel with me?",
        answer:
          "Yes. Indian medical visas allow attendants to travel with the patient, and we arrange a room for them too.",
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
      "Leave your Nigerian mobile number. A case manager will come back to you, and you can add your reports whenever you are ready.",
  },
};
