import type { HomeContent } from "./types";

/**
 * Home page sections that the country pages do not have: how partners are
 * chosen, and a few of the doctors. Every claim here repeats one already made
 * on the About and Contact pages.
 */
export const home: HomeContent = {
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
    heading: "Some of the doctors we work with",
    intro: "Senior specialists at our partner hospitals. Your doctor is chosen for your case once your reports have been read.",
    featured: ["ganesh-nagarajan", "jatin-kothari", "amandeep-gujral", "nilesh-satbhai"],
    book: "Book a consultation",
    profile: "View profile",
    all: "See all doctors",
  },
};
