import type { HomeContent } from "./types";

/**
 * Home page copy, laid out as the patient's journey in nine steps. Every claim
 * here repeats one already made on the About and Contact pages.
 */
export const home: HomeContent = {
  journey: {
    heading: "Your journey, step by step",
    intro: "Nine steps from your first question to your follow-up at home. One team walks every one of them with you.",
    strip: "From your first question to your follow-up at home.",
    phases: [
      {
        name: "Choose",
        steps: [
          {
            title: "Find the right treatment",
            body: "Search in your own words, or tell us what the doctors at home have said.",
            href: "#treatment",
          },
          {
            title: "Find the right specialist",
            body: "A senior doctor in your condition, chosen once your reports have been read.",
            href: "#specialist",
          },
          {
            title: "Compare suitable hospitals",
            body: "See the hospitals that treat your condition, side by side.",
            href: "#hospitals",
          },
        ],
      },
      {
        name: "Plan",
        steps: [
          {
            title: "Get a medical opinion",
            body: "A specialist reads your reports and says what treatment they recommend.",
            href: "#opinion",
          },
          {
            title: "Receive a treatment estimate",
            body: "The hospital puts the cost in writing before you decide anything.",
            href: "#opinion",
          },
          {
            title: "Visa assistance",
            body: "The invitation letter from the hospital, and a check of your papers.",
            href: "#visa",
          },
        ],
      },
      {
        name: "Travel and care",
        steps: [
          {
            title: "Travel and accommodation",
            body: "Flights, airport pickup and a room close to the hospital.",
            href: "#travel",
          },
          {
            title: "Hospital coordination",
            body: "Your case manager and an interpreter with you at the hospital.",
            href: "#travel",
          },
          {
            title: "Post-treatment support",
            body: "Medicines, follow-up dates and a line to your doctor once you are home.",
            href: "#aftercare",
          },
        ],
      },
    ],
  },
  treatment: {
    step: "Step 01",
    heading: "Find the right treatment",
    intro: "Not sure what it is called? Search in your own words, or start from the kind of care you need.",
    browse: "Or start from a speciality",
    all: "See all treatments",
    body: "Point to where it hurts on the body map",
  },
  specialist: { step: "Step 02" },
  compare: {
    step: "Step 03",
    heading: "Compare suitable hospitals",
    intro: "We match the hospital to the case, not the other way round. You see the choice, the doctor and the estimate before you decide.",
    all: "Compare all hospitals",
  },
  opinion: {
    step: "Step 04 and 05",
    heading: "A medical opinion and a written estimate",
    intro: "Send your reports. Nothing costs you anything until you agree to travel.",
    items: [
      {
        title: "Medical opinion",
        body: "A specialist at a partner hospital reads your diagnosis, scans or discharge summary, and tells you what treatment they recommend and how long you would stay. A photo of a paper report is enough.",
      },
      {
        title: "Treatment estimate",
        body: "The hospital prepares a written cost estimate for your case. You see every cost before you agree to it, and anything Medsafar charges is written down too.",
      },
    ],
    cta: "Send your reports",
    note: "The opinion and the estimate are free.",
  },
  visa: {
    step: "Step 06",
    heading: "Visa assistance",
    intro: "We prepare the hospital invitation letter and tell you exactly which papers to carry to the embassy.",
    papers: { passport: "Passport", letter: "Invitation letter for medical treatment", stamp: "Visa ready" },
  },
  travel: {
    step: "Step 07 and 08",
    heading: "Travel, stay and the hospital, arranged",
    intro: "Everything outside the operating theatre is ours to organise.",
    items: [
      {
        icon: "flight",
        title: "Flights",
        body: "We book the route that suits your condition and your budget, and plan the arrival so someone can meet you.",
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
        icon: "manager",
        title: "One case manager",
        body: "The same person from your first message to your flight home, and with you in India.",
      },
      {
        icon: "interpreter",
        title: "Interpreter",
        body: "Someone who speaks your language is with you in the consultation room, so nothing is lost.",
      },
      {
        icon: "dates",
        title: "Hospital dates",
        body: "We agree the admission and treatment dates with the hospital before you fly, and keep you posted while you are there.",
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
    intro: "Your safety comes first. These are the checks behind every name we put in front of you.",
    items: [
      {
        title: "Senior doctors only",
        body: "Your case goes to a specialist in your condition with more than 15 years of experience.",
      },
      {
        title: "Multi-speciality hospitals",
        body: "Large hospitals with intensive care, laboratories and every department under one roof, in case you need more than one.",
      },
      {
        title: "Certificates checked",
        body: "We look at each hospital's accreditations and each doctor's training before we work with them.",
      },
      {
        title: "Ready for patients from abroad",
        body: "Partner hospitals have a team for international patients, and we add an interpreter when you need one.",
      },
      {
        title: "Costs in writing",
        body: "The estimate comes in writing from the hospital before you travel. You see every cost before you agree to it.",
      },
      {
        title: "With you before and after",
        body: "One case manager from your first message, and follow-up calls with your doctor once you are home.",
      },
    ],
  },
  doctors: {
    heading: "Find the right specialist",
    intro: "Senior specialists at our partner hospitals. Your doctor is chosen for your case once your reports have been read.",
    featured: ["ganesh-nagarajan", "jatin-kothari", "amandeep-gujral", "nilesh-satbhai"],
    book: "Book a consultation",
    profile: "View profile",
    all: "See all doctors",
  },
};
