import type { CountryContent } from "../types";

/**
 * Iraq. Same shape and same layout as the home page. Only the words,
 * photos, stories and travel information change.
 */
export const iq: CountryContent = {
  slug: "iq",
  iso: "IQ",
  countryName: "Iraq",

  meta: {
    title: "Treatment in India for patients from Iraq. Medsafar India.",
    description:
      "Medsafar helps patients in Iraq get treatment in India: a doctor's opinion, a written cost estimate, the medical visa, flights, a place to stay and follow-up care after you return.",
  },

  hero: {
    eyebrow: "For patients travelling from Iraq",
    headline: "Treatment in India, arranged for you from Iraq.",
    support:
      "Send your reports from Baghdad, Basra, Erbil or anywhere in Iraq. We come back with a doctor's opinion and a written cost estimate.",
    // Stock photo, illustration only: Pexels 27593286, Eslames1. Pexels Licence.
    picture: {
      src: "/photos/hero-iq.jpg",
      alt: "A grandmother holding a young child, both smiling",
      pending: false,
    },
  },

  trust: {
    heading: "What you can hold us to",
    promises: [
      "One case manager, reachable on WhatsApp from Iraq",
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
        body: "Medical visa invitation, flights from Iraq, airport pickup in India, a place to stay near the hospital and an interpreter if you need one.",
      },
      {
        title: "Treatment and follow-up",
        body: "Your case manager stays with you in India, and we keep the link with your doctor open after you return to Iraq.",
      },
    ],
  },

  hospitals: {
    heading: "Partner hospitals",
    intro:
      "We match the hospital to the case, not the other way round. You see the choice, the doctor and the estimate before you decide.",
    featured: ["nanavati-max", "kenia-eye"],
    note: "More partner hospitals are being added. Your doctor is chosen for your case once a specialist has read the reports.",
  },

  handled: {
    heading: "What we handle",
    intro: "Everything outside the operating theatre is ours to organise.",
    items: [
      {
        icon: "visa",
        title: "Medical visa",
        // Source: https://www.eoibaghdad.gov.in/page/visa-services-for-iraqi-nationals/
        body: "We prepare the hospital invitation letter and tell you exactly which papers to hand in at the VFS Global centre in Baghdad or Basra for the Embassy of India.",
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
        title: "Follow-up in Iraq",
        body: "Discharge papers, medicines, the follow-up schedule and a way to reach your doctor after you fly home.",
      },
    ],
  },

  stories: {
    heading: "Patients from Iraq",
    intro:
      "Stories from Iraqi patients go here, with their permission, once Medsafar has cleared them.",
    items: [
      {
        quote:
          "Story from a patient in Iraq, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Iraq",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Iraqi patient, used with permission",
          pending: true,
        },
      },
      {
        quote:
          "Story from a patient in Iraq, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Iraq",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Iraqi patient, used with permission",
          pending: true,
        },
      },
      {
        quote:
          "Story from a patient in Iraq, to be supplied in the patient's own words and with written consent.",
        name: "Patient name",
        city: "City, Iraq",
        treatment: "Treatment",
        pending: true,
        picture: {
          src: null,
          alt: "Portrait of the Iraqi patient, used with permission",
          pending: true,
        },
      },
    ],
    note: "No story on this page is real yet. Nothing is published without the patient's written consent.",
  },

  countryInfo: {
    heading: "Iraq to India",
    intro: "What the journey looks like when you start from Iraq.",
    visa: {
      heading: "Medical visa from Iraq",
      steps: [
        "We send you an invitation letter from the treating hospital in India, with the plan and the dates.",
        // Source: https://indianvisaonline.gov.in/evisa/tvoa.html (Iraq not listed); https://www.eoibaghdad.gov.in/page/visa-services-for-iraqi-nationals/
        "Iraq is not on India's e-Visa list, so you apply for a regular medical visa. You fill in the form online at indianvisaonline.gov.in and choose the Indian mission in Baghdad.",
        // Source: https://www.eoibaghdad.gov.in/page/visa-services-for-iraqi-nationals/
        "You hand in the signed form, your passport, the letter and your reports at the VFS Global centre in Baghdad or Basra.",
        "One or two people travelling with you can apply as medical attendants. We check your papers with you before you go.",
      ],
      note: "Visa rules are set by the Indian government and can change. We confirm the current requirement for Iraq before you apply.",
    },
    flights: {
      heading: "Flights from Iraq",
      body: "Patients fly from Baghdad, Basra or Erbil, direct or with one stop in the Gulf. We book the route that suits your condition and your budget.",
      routes: [
        // Source: https://www.flightsfrom.com/BGW-DEL (aggregator, not confirmed with the airline)
        { label: "Baghdad to Delhi, direct with Iraqi Airways, about 5½ hours", pending: true },
        // Source: https://www.iraq-businessnews.com/?p=37638 (news report, not confirmed with the airline)
        { label: "Baghdad to Mumbai, direct with Iraqi Airways", pending: true },
        // Source: https://www.flydubai.com/en-bh/flights-from-delhi-to-iraq/
        { label: "Baghdad, Basra or Erbil to Delhi, Mumbai or Chennai with one stop in Dubai on flydubai" },
      ],
    },
    language: {
      heading: "Language support",
      body: "Indian hospitals work in English. Most Iraqi patients prefer Arabic or Kurdish, so tell us which you speak and we arrange an interpreter for your consultations and the paperwork.",
    },
  },

  faq: {
    heading: "Questions patients from Iraq ask",
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
        // Source: https://cbi.iq/
        answer: "Iraq's currency is the Iraqi dinar (IQD), and costs in India are in Indian rupees (INR). Your case manager tells you how the hospital takes payment before you travel.",
      },
      {
        question: "Is Medsafar a hospital?",
        answer:
          "No. Medsafar is a medical travel facilitator. Treatment is given by independent hospitals and doctors in India. We arrange everything around it.",
      },
      {
        question: "How do I get the medical visa?",
        answer:
          "We prepare the hospital invitation letter and the checklist. You apply online, then hand in your papers at the VFS Global centre in Baghdad or Basra for the Embassy of India. We go through everything with you first so nothing is missing.",
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
      "Leave your Iraqi mobile number. A case manager will come back to you, and you can add your reports whenever you are ready.",
  },
};
