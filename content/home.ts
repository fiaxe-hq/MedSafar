import type { HomeContent } from "./types";

/**
 * Home page copy, laid out as the patient's journey in six steps. Every claim
 * here repeats one already made on the About and Contact pages.
 */
export const home: HomeContent = {
  quick: {
    heading: "What Would You Like to Do?",
    /** Tag on the free-opinion option. */
    free: "Free",
    items: [
      { icon: "treatment", title: "Find a Treatment", body: "Search, or tap the body", href: "/treatments" },
      { icon: "doctor", title: "Find a Doctor", body: "Senior specialists", href: "/doctors" },
      { icon: "hospital", title: "Compare Hospitals", body: "Side by side", href: "/hospitals" },
      { icon: "opinion", title: "Get a Free Opinion", body: "Send your reports", href: "#reports" },
    ],
  },
  journey: {
    heading: "Your Journey, Step by Step",
    intro: "Six steps, one team with you at every one.",
    strip: "From your first question to your follow-up at home.",
    phases: [
      {
        name: "Choose",
        steps: [
          {
            title: "Find the Right Treatment",
            body: "Search in your own words.",
            href: "#treatment",
          },
          {
            title: "Choose Your Doctor and Hospital",
            body: "A senior specialist and the right hospital for your case.",
            href: "#specialist",
          },
        ],
      },
      {
        name: "Plan",
        steps: [
          {
            title: "Free Opinion and Written Estimate",
            body: "A specialist reads your reports, and the cost comes in writing.",
            href: "#opinion",
          },
          {
            title: "Visa Assistance",
            body: "Invitation letter and papers checked.",
            href: "#visa",
          },
        ],
      },
      {
        name: "Travel and Care",
        steps: [
          {
            title: "Travel, Stay and Hospital Support",
            body: "Flights, pickup, a room nearby, and a case manager with you.",
            href: "#travel",
          },
          {
            title: "Post-Treatment Support",
            body: "Follow-up with your doctor from home.",
            href: "#aftercare",
          },
        ],
      },
    ],
  },
  treatment: {
    step: "Step 01",
    heading: "Find the Right Treatment",
    intro: "Search in your own words, tap the body, or pick a type of care.",
    browse: "Or Start from a Speciality",
    all: "See All Treatments",
    body: "Point to where it hurts on the body map",
  },
  specialist: { step: "Step 02" },
  compare: {
    step: "Step 03",
    heading: "Compare Suitable Hospitals",
    intro: "You see the hospital, the doctor and the cost before you decide.",
    all: "Compare All Hospitals",
  },
  opinion: {
    step: "Step 04 and 05",
    heading: "A Medical Opinion and a Written Estimate",
    intro: "Send your reports. Nothing costs you anything until you agree to travel.",
    items: [
      {
        title: "Medical Opinion",
        body: "A specialist reads your reports and recommends a treatment. A phone photo of a report is enough.",
      },
      {
        title: "Treatment Estimate",
        body: "The hospital's written cost for your case, before you agree to anything.",
      },
    ],
    cta: "Send Your Reports",
    note: "The opinion and the estimate are free.",
  },
  visa: {
    step: "Step 06",
    heading: "Visa Assistance",
    intro: "The hospital's invitation letter, and a check of every paper you need.",
    papers: { passport: "Passport", letter: "Invitation letter for medical treatment", stamp: "Visa ready" },
  },
  travel: {
    step: "Step 07 and 08",
    heading: "Travel, Stay and the Hospital, Arranged",
    intro: "Everything outside the operating theatre, arranged.",
    items: [
      {
        icon: "flight",
        title: "Flights",
        body: "The right route for your condition and budget.",
      },
      {
        icon: "pickup",
        title: "Airport Pickup",
        body: "We meet you at the airport.",
      },
      {
        icon: "stay",
        title: "Where You Stay",
        body: "A room near the hospital for you and your companion.",
      },
      {
        icon: "manager",
        title: "One Case Manager",
        body: "One person, from first message to flight home.",
      },
      {
        icon: "interpreter",
        title: "Interpreter",
        body: "Someone who speaks your language, in every consultation.",
      },
      {
        icon: "dates",
        title: "Hospital Dates",
        body: "Admission dates agreed before you fly.",
      },
    ],
  },
  aftercare: {
    step: "Step 09",
    heading: "Support After Treatment",
    intro: "We keep the link with your doctor open after you fly home.",
    items: [
      "Discharge papers and a summary of your treatment",
      "Your medicines and how to take them",
      "The follow-up schedule your doctor sets",
      "Follow-up calls with your doctor from home",
    ],
  },
  selection: {
    heading: "How We Choose Doctors and Hospitals",
    intro: "The checks behind every name we show you.",
    items: [
      {
        title: "Senior Doctors Only",
        body: "Specialists with more than 15 years of experience.",
      },
      {
        title: "Multi-Speciality Hospitals",
        body: "Intensive care and every department under one roof.",
      },
      {
        title: "Certificates Checked",
        body: "Accreditations and training checked first.",
      },
      {
        title: "Ready for Patients from Abroad",
        body: "International patient teams and interpreters.",
      },
      {
        title: "Costs in Writing",
        body: "Every cost in writing before you travel.",
      },
      {
        title: "With You Before and After",
        body: "One case manager, and follow-up once you are home.",
      },
    ],
  },
  doctors: {
    heading: "Find the Right Specialist",
    intro: "Senior specialists at our partner hospitals.",
    featured: ["ganesh-nagarajan", "jatin-kothari", "amandeep-gujral", "nilesh-satbhai"],
    book: "Book a Consultation",
    profile: "View Profile",
    all: "See All Doctors",
  },
};
