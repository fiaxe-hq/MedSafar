import type { HomeContent } from "./types";

/**
 * Home page copy, laid out as the patient's journey in nine steps. Every claim
 * here repeats one already made on the About and Contact pages.
 */
export const home: HomeContent = {
  quick: {
    heading: "What would you like to do?",
    items: [
      { icon: "treatment", title: "Find a treatment", body: "Search, or tap the body", href: "/treatments" },
      { icon: "doctor", title: "Find a doctor", body: "Senior specialists", href: "/doctors" },
      { icon: "hospital", title: "Compare hospitals", body: "Side by side", href: "/hospitals" },
      { icon: "opinion", title: "Get a free opinion", body: "Send your reports", href: "#plan" },
    ],
  },
  journey: {
    heading: "Your journey, step by step",
    intro: "Nine steps, one team with you at every one.",
    strip: "From your first question to your follow-up at home.",
    phases: [
      {
        name: "Choose",
        steps: [
          {
            title: "Find the right treatment",
            body: "Search in your own words.",
            href: "#treatment",
          },
          {
            title: "Find the right specialist",
            body: "A senior doctor, chosen for your case.",
            href: "#specialist",
          },
          {
            title: "Compare suitable hospitals",
            body: "Hospitals for your condition, side by side.",
            href: "#hospitals",
          },
        ],
      },
      {
        name: "Plan",
        steps: [
          {
            title: "Get a medical opinion",
            body: "A specialist reads your reports.",
            href: "#opinion",
          },
          {
            title: "Receive a treatment estimate",
            body: "The cost in writing, before you decide.",
            href: "#opinion",
          },
          {
            title: "Visa assistance",
            body: "Invitation letter and papers checked.",
            href: "#visa",
          },
        ],
      },
      {
        name: "Travel and care",
        steps: [
          {
            title: "Travel and accommodation",
            body: "Flights, pickup and a room nearby.",
            href: "#travel",
          },
          {
            title: "Hospital coordination",
            body: "A case manager and interpreter with you.",
            href: "#travel",
          },
          {
            title: "Post-treatment support",
            body: "Follow-up with your doctor from home.",
            href: "#aftercare",
          },
        ],
      },
    ],
  },
  treatment: {
    step: "Step 01",
    heading: "Find the right treatment",
    intro: "Search in your own words, tap the body, or pick a type of care.",
    browse: "Or start from a speciality",
    all: "See all treatments",
    body: "Point to where it hurts on the body map",
  },
  specialist: { step: "Step 02" },
  compare: {
    step: "Step 03",
    heading: "Compare suitable hospitals",
    intro: "You see the hospital, the doctor and the cost before you decide.",
    all: "Compare all hospitals",
  },
  opinion: {
    step: "Step 04 and 05",
    heading: "A medical opinion and a written estimate",
    intro: "Send your reports. Nothing costs you anything until you agree to travel.",
    items: [
      {
        title: "Medical opinion",
        body: "A specialist reads your reports and recommends a treatment. A phone photo of a report is enough.",
      },
      {
        title: "Treatment estimate",
        body: "The hospital's written cost for your case, before you agree to anything.",
      },
    ],
    cta: "Send your reports",
    note: "The opinion and the estimate are free.",
  },
  visa: {
    step: "Step 06",
    heading: "Visa assistance",
    intro: "The hospital's invitation letter, and a check of every paper you need.",
    papers: { passport: "Passport", letter: "Invitation letter for medical treatment", stamp: "Visa ready" },
  },
  travel: {
    step: "Step 07 and 08",
    heading: "Travel, stay and the hospital, arranged",
    intro: "Everything outside the operating theatre, arranged.",
    items: [
      {
        icon: "flight",
        title: "Flights",
        body: "The right route for your condition and budget.",
      },
      {
        icon: "pickup",
        title: "Airport pickup",
        body: "We meet you at the airport.",
      },
      {
        icon: "stay",
        title: "Where you stay",
        body: "A room near the hospital for you and your companion.",
      },
      {
        icon: "manager",
        title: "One case manager",
        body: "One person, from first message to flight home.",
      },
      {
        icon: "interpreter",
        title: "Interpreter",
        body: "Someone who speaks your language, in every consultation.",
      },
      {
        icon: "dates",
        title: "Hospital dates",
        body: "Admission dates agreed before you fly.",
      },
    ],
  },
  aftercare: {
    step: "Step 09",
    heading: "Support after treatment",
    intro: "We keep the link with your doctor open after you fly home.",
    items: [
      "Discharge papers and a summary of your treatment",
      "Your medicines and how to take them",
      "The follow-up schedule your doctor sets",
      "Follow-up calls with your doctor from home",
    ],
  },
  selection: {
    heading: "How we choose doctors and hospitals",
    intro: "The checks behind every name we show you.",
    items: [
      {
        title: "Senior doctors only",
        body: "Specialists with more than 15 years of experience.",
      },
      {
        title: "Multi-speciality hospitals",
        body: "Intensive care and every department under one roof.",
      },
      {
        title: "Certificates checked",
        body: "Accreditations and training checked first.",
      },
      {
        title: "Ready for patients from abroad",
        body: "International patient teams and interpreters.",
      },
      {
        title: "Costs in writing",
        body: "Every cost in writing before you travel.",
      },
      {
        title: "With you before and after",
        body: "One case manager, and follow-up once you are home.",
      },
    ],
  },
  doctors: {
    heading: "Find the right specialist",
    intro: "Senior specialists at our partner hospitals.",
    featured: ["ganesh-nagarajan", "jatin-kothari", "amandeep-gujral", "nilesh-satbhai"],
    book: "Book a consultation",
    profile: "View profile",
    all: "See all doctors",
  },
};
