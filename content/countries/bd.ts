import type { CountryContent } from "../types";

/**
 * Bangladesh. Same shape and same layout as the home page. Only the words,
 * photos, stories and travel information change.
 */
export const bd: CountryContent = {
  slug: "bd",
  iso: "BD",
  countryName: "Bangladesh",

  meta: {
    title: "Treatment in India for patients from Bangladesh. Medsafar India.",
    description:
      "Medsafar helps patients in Bangladesh get treatment in India: a doctor's opinion, a written cost estimate, the medical visa, flights, a place to stay and follow-up care after you return.",
  },

  hero: {
    eyebrow: "For patients travelling from Bangladesh",
    headline: "Treatment in India, arranged for you from Bangladesh.",
    support:
      "Send your reports from Dhaka, Chittagong, Sylhet or anywhere in Bangladesh. We come back with a doctor's opinion and a written cost estimate.",
    // Stock photo, illustration only: Pexels 34935084, Minhaj Ahmed Ahyan. Pexels Licence.
    picture: {
      src: "/photos/hero-bd.jpg",
      alt: "A family laughing together by the river in Chittagong",
      pending: false,
    },
  },

  trust: {
    heading: "What you can hold us to",
    promises: [
      "One case manager, reachable on WhatsApp from Bangladesh",
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
        body: "Medical visa invitation, flights from Bangladesh, airport pickup in India, a place to stay near the hospital and an interpreter if you need one.",
      },
      {
        title: "Treatment and follow-up",
        body: "Your case manager stays with you in India, and we keep the link with your doctor open after you return to Bangladesh.",
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
        // Source: https://ivacbd.com/
        body: "We prepare the hospital invitation letter and tell you exactly which papers you need, online or at an Indian Visa Application Centre in Bangladesh.",
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
        title: "Follow-up in Bangladesh",
        body: "Discharge papers, medicines, the follow-up schedule and a way to reach your doctor after you fly home.",
      },
    ],
  },

  stories: {
    heading: "Patients from Bangladesh",
    intro:
      "Stories from Bangladeshi patients go here, with their permission, once Medsafar has cleared them.",
    items: [
      {
        quote:
          "Story from a patient in Bangladesh, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Bangladesh",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Bangladeshi patient, used with permission",
          pending: true,
        },
      },
      {
        quote:
          "Story from a patient in Bangladesh, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Bangladesh",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Bangladeshi patient, used with permission",
          pending: true,
        },
      },
      {
        quote:
          "Story from a patient in Bangladesh, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Bangladesh",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Bangladeshi patient, used with permission",
          pending: true,
        },
      },
    ],
    note: "No story on this page is real yet. Nothing is published without the patient's written consent.",
  },

  countryInfo: {
    heading: "Bangladesh to India",
    intro: "What the journey looks like when you start from Bangladesh.",
    visa: {
      heading: "Medical visa from Bangladesh",
      steps: [
        "We send you an invitation letter from the treating hospital in India, with the plan and the dates.",
        // Source: https://indianvisaonline.gov.in/evisa/tvoa.html
        "Bangladesh is on India's e-Visa list. Where the online route is open to you, you apply for an e-Medical Visa at indianvisaonline.gov.in, at least 4 days before you fly.",
        // Source: https://ivacbd.com/
        "Medical visas are also handled at the Indian Visa Application Centres in Dhaka, Chittagong, Khulna, Rajshahi and Sylhet. We tell you which route to use.",
        // Source: https://indianvisaonline.gov.in/evisa/tvoa.html
        "Up to two people travelling with you can apply as medical attendants.",
      ],
      // Source: https://ivacbd.com/ ; reopening reported by https://www.dhakatribune.com/bangladesh/foreign-affairs/413708/india-to-resume-tourist-visas-for-bangladeshis-on
      note: "India limited visa services in Bangladesh from August 2024 and has since reopened them in stages, with medical visas kept open. Visa rules can change, so we confirm the current route before you apply.",
    },
    flights: {
      heading: "Flights from Bangladesh",
      body: "Dhaka has direct flights to several Indian cities, and the journey is short. We book the route that suits your condition and your budget.",
      routes: [
        // Source: https://www.flightsfrom.com/DAC-MAA (aggregator, not confirmed with the airlines)
        { label: "Dhaka to Chennai, direct with IndiGo, US-Bangla and Biman, about 2¾ hours", pending: true },
        // Source: https://www.flightsfrom.com/DAC-BOM (aggregator, not confirmed with the airline)
        { label: "Dhaka to Mumbai, direct with IndiGo, about 3½ hours", pending: true },
        // Source: https://en.ittefaq.com.bd/5880/us-bangla-is-going-to-start-dhaka-delhi-flights (news report, not confirmed with the airline)
        { label: "Dhaka to Delhi, direct with US-Bangla", pending: true },
      ],
    },
    language: {
      heading: "Language support",
      body: "Indian hospitals work in English. If you would rather speak Bengali, tell us and we arrange someone to be with you in your consultations.",
    },
  },

  faq: {
    heading: "Questions patients from Bangladesh ask",
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
        // Source: https://www.bb.org.bd/
        answer: "Bangladesh's currency is the Bangladeshi taka (BDT), and costs in India are in Indian rupees (INR). Your case manager tells you how the hospital takes payment before you travel.",
      },
      {
        question: "Is Medsafar a hospital?",
        answer:
          "No. Medsafar is a medical travel facilitator. Treatment is given by independent hospitals and doctors in India. We arrange everything around it.",
      },
      {
        question: "How do I get the medical visa?",
        answer:
          "We prepare the hospital invitation letter and the checklist. You apply online for an e-Medical Visa where that route is open, or at an Indian Visa Application Centre in Bangladesh. We go through your papers with you first so nothing is missing.",
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
      "Leave your Bangladeshi mobile number. A case manager will come back to you, and you can add your reports whenever you are ready.",
  },
};
