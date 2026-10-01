import type { CountryContent } from "../types";

/**
 * Uzbekistan. Same shape and same layout as the home page. Only the words,
 * photos, stories and travel information change.
 */
export const uz: CountryContent = {
  slug: "uz",
  iso: "UZ",
  countryName: "Uzbekistan",

  meta: {
    title: "Treatment in India for patients from Uzbekistan. Medsafar India.",
    description:
      "Medsafar helps patients in Uzbekistan get treatment in India: a doctor's opinion, a written cost estimate, the medical visa, flights, a place to stay and follow-up care after you return.",
  },

  hero: {
    eyebrow: "For patients travelling from Uzbekistan",
    headline: "Treatment in India, arranged for you from Uzbekistan.",
    support:
      "Send your reports from Tashkent, Samarkand, Bukhara or anywhere in Uzbekistan. We come back with a doctor's opinion and a written cost estimate.",
    // Stock photo, illustration only: Pexels 7158617, RDNE. Pexels Licence.
    picture: {
      src: "/photos/hero-uz.jpg",
      alt: "Two smiling women in headscarves",
      pending: false,
    },
  },

  trust: {
    heading: "What you can hold us to",
    promises: [
      "One case manager, reachable on WhatsApp from Uzbekistan",
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
        body: "Medical visa invitation, flights from Uzbekistan, airport pickup in India, a place to stay near the hospital and an interpreter if you need one.",
      },
      {
        title: "Treatment and follow-up",
        body: "Your case manager stays with you in India, and we keep the link with your doctor open after you return to Uzbekistan.",
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
        // Source: https://indianvisaonline.gov.in/evisa/tvoa.html ; https://igod.gov.in/int/226/missions_abroad
        body: "We prepare the hospital invitation letter and help you apply online for the e-Medical Visa. The Embassy of India in Tashkent handles regular visas.",
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
        title: "Follow-up in Uzbekistan",
        body: "Discharge papers, medicines, the follow-up schedule and a way to reach your doctor after you fly home.",
      },
    ],
  },

  stories: {
    heading: "Patients from Uzbekistan",
    intro:
      "Stories from Uzbek patients go here, with their permission, once Medsafar has cleared them.",
    items: [
      {
        quote:
          "Story from a patient in Uzbekistan, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Uzbekistan",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Uzbek patient, used with permission",
          pending: true,
        },
      },
      {
        quote:
          "Story from a patient in Uzbekistan, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Uzbekistan",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Uzbek patient, used with permission",
          pending: true,
        },
      },
      {
        quote:
          "Story from a patient in Uzbekistan, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Uzbekistan",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Uzbek patient, used with permission",
          pending: true,
        },
      },
    ],
    note: "No story on this page is real yet. Nothing is published without the patient's written consent.",
  },

  countryInfo: {
    heading: "Uzbekistan to India",
    intro: "What the journey looks like when you start from Uzbekistan.",
    visa: {
      heading: "Medical visa from Uzbekistan",
      steps: [
        "We send you an invitation letter from the treating hospital in India, with the plan and the dates.",
        // Source: https://indianvisaonline.gov.in/evisa/tvoa.html
        "Uzbek citizens can apply online for an Indian e-Medical Visa at indianvisaonline.gov.in, with that letter, your passport and your reports, at least 4 days before you fly.",
        // Source: https://indianvisaonline.gov.in/evisa/tvoa.html
        "Up to two people travelling with you can apply for e-Medical Attendant Visas.",
        // Source: https://indianvisaonline.gov.in/evisa/tvoa.html
        "The e-Visa is valid for arrival at designated airports, which include Delhi, Mumbai and Chennai.",
      ],
      // Source: https://igod.gov.in/int/226/missions_abroad (Embassy of India, Tashkent)
      note: "Visa rules are set by the Indian government and can change. We confirm the current requirement for Uzbekistan before you apply. A regular medical visa is also available at the Embassy of India in Tashkent.",
    },
    flights: {
      heading: "Flights from Uzbekistan",
      body: "Tashkent has direct flights to Delhi, and the flight is short. From Samarkand or Bukhara you usually connect through Tashkent. We book the route that suits your condition and your budget.",
      routes: [
        // Source: https://www.uzairways.com/en/press-center/news/uzbekistan-airways-increases-frequency-flights-delhi (schedule 02:15 UZT to 05:45 IST)
        { label: "Tashkent to Delhi, direct with Uzbekistan Airways, about 3 hours" },
        // Source: https://uzbekembassy.in/?p=22237 (launch announcement; current schedule not confirmed)
        { label: "Tashkent to Mumbai, direct with Uzbekistan Airways, about 4 hours", pending: true },
        // Not yet researched.
        { label: "Tashkent to Chennai, routes and journey times to be supplied", pending: true },
      ],
    },
    language: {
      heading: "Language support",
      body: "Indian hospitals work in English. If you would rather speak Uzbek or Russian, tell us and we arrange an interpreter for your consultations and the paperwork.",
    },
  },

  faq: {
    heading: "Questions patients from Uzbekistan ask",
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
        question: "Which currency will I need?",
        // Source: https://cbu.uz/en/
        answer: "Uzbekistan's currency is the Uzbek som (UZS), and costs in India are in Indian rupees (INR). Your case manager tells you how the hospital takes payment before you travel.",
      },
      {
        question: "Is Medsafar a hospital?",
        answer:
          "No. Medsafar is a medical travel facilitator. Treatment is given by independent hospitals and doctors in India. We arrange everything around it.",
      },
      {
        question: "How do I get the medical visa?",
        answer:
          "Uzbek citizens can apply online for an Indian e-Medical Visa. We prepare the hospital invitation letter and the checklist, and go through your papers with you first so nothing is missing.",
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
      "Leave your Uzbek mobile number. A case manager will come back to you, and you can add your reports whenever you are ready.",
  },
};
