import type {
  AboutContent,
  ContactContent,
  LegalContent,
  Picture,
} from "./types";

/**
 * Text for About, Contact, Privacy and Terms. Shared pages: one copy for
 * every country.
 *
 * Everything here is a placeholder until Medsafar supplies the real text.
 * Nothing about the team, the office or the company's history is invented.
 */

const portrait: Picture = {
  src: null,
  alt: "Portrait of the team member",
  pending: true,
};

export const about: AboutContent = {
  meta: {
    title: "About Medsafar India.",
    description:
      "Medsafar is a medical travel facilitator. It arranges treatment in India for patients from abroad. It is not a hospital.",
  },
  eyebrow: "About",
  heading: "Medsafar arranges treatment in India for patients from abroad.",
  intro:
    "Medsafar is a medical travel facilitator. It is not a hospital and does not provide medical treatment.",
  who: {
    heading: "Who we are",
    body: [
      "Medsafar helps patients who live outside India get treatment at hospitals in India, and looks after everything around that treatment.",
      "The rest of this section is to be supplied by Medsafar: how the company started, who runs it and where it works from.",
    ],
  },
  does: {
    heading: "What Medsafar does",
    items: [
      "Sends your reports to a doctor at a partner hospital",
      "Brings back a written treatment plan and an estimate prepared by the hospital",
      "Arranges the visa invitation, travel, airport pickup and a place to stay",
      "Provides a case manager and an interpreter if you need one",
      "Keeps the link with your doctor open after you fly home",
    ],
  },
  doesNot: {
    heading: "What Medsafar does not do",
    items: [
      "Give medical treatment or medical advice",
      "Decide your treatment. That is between you and the doctor",
      "Set the cost of treatment. The estimate comes from the treating hospital",
    ],
  },
  selection: {
    heading: "How hospitals are chosen",
    body: "To be supplied by Medsafar: the checks a hospital has to pass before Medsafar will send a patient there.",
  },
  team: {
    heading: "The team",
    intro: "Names, roles and photos to be supplied by Medsafar.",
    members: [
      { name: "Team member name", role: "Role to be supplied", picture: portrait, pending: true },
      { name: "Team member name", role: "Role to be supplied", picture: portrait, pending: true },
      { name: "Team member name", role: "Role to be supplied", picture: portrait, pending: true },
    ],
  },
  legal: {
    heading: "Legal name",
    name: "Medsafar India, a division of Travgrub Private Limited",
    body: "Registered address and registration number to be supplied.",
  },
  note: "This page is a placeholder until Medsafar supplies its own text.",
  pending: true,
};

export const contact: ContactContent = {
  meta: {
    title: "Contact Medsafar India.",
    description:
      "Start a free treatment plan, or reach Medsafar on WhatsApp, by phone or by email.",
  },
  eyebrow: "Contact",
  heading: "Tell us what you need.",
  intro: "The quickest way is to leave your mobile number. A case manager comes back to you.",
  details: {
    heading: "Other ways to reach us",
    intro: "Contact details to be supplied by Medsafar.",
    items: [
      { label: "WhatsApp", value: "WhatsApp number to be supplied", href: null, pending: true },
      { label: "Phone", value: "Phone number to be supplied", href: null, pending: true },
      { label: "Email", value: "Email address to be supplied", href: null, pending: true },
      { label: "Office", value: "Office address to be supplied", href: null, pending: true },
      { label: "Working hours", value: "Working hours to be supplied", href: null, pending: true },
    ],
    note: "None of these details are real yet. Until they are, use the form above.",
  },
  pending: true,
};

const awaiting = "Awaiting legal text from Medsafar.";

export const privacy: LegalContent = {
  meta: {
    title: "Privacy. Medsafar India.",
    description: "How Medsafar handles your details and medical reports.",
  },
  heading: "Privacy",
  intro:
    "This page is a placeholder. The headings show what it will cover. The wording is awaiting legal text from Medsafar and is not final.",
  updated: { label: "Last updated", value: "Date to be supplied" },
  sections: [
    { heading: "What we collect", body: awaiting },
    { heading: "How we use it", body: awaiting },
    { heading: "Medical reports", body: awaiting },
    { heading: "Who we share it with", body: awaiting },
    { heading: "How long we keep it", body: awaiting },
    { heading: "Your choices", body: awaiting },
    { heading: "How to contact us about your data", body: awaiting },
  ],
  pending: true,
};

export const terms: LegalContent = {
  meta: {
    title: "Terms. Medsafar India.",
    description: "The terms for using Medsafar and this website.",
  },
  heading: "Terms",
  intro:
    "This page is a placeholder. The headings show what it will cover. The wording is awaiting legal text from Medsafar and is not final.",
  updated: { label: "Last updated", value: "Date to be supplied" },
  sections: [
    { heading: "What Medsafar is", body: awaiting },
    { heading: "Treatment plans and estimates", body: awaiting },
    { heading: "Hospitals and doctors", body: awaiting },
    { heading: "Payments and refunds", body: awaiting },
    { heading: "Travel and stay", body: awaiting },
    { heading: "Using this website", body: awaiting },
    { heading: "Liability", body: awaiting },
    { heading: "Governing law", body: awaiting },
  ],
  pending: true,
};
