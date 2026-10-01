import type { Faq, Treatment } from "@/content/types";

/**
 * Placeholder records. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * The treatment names are examples. Every description, stay and recovery
 * time is a stand-in until a doctor has written and checked the real text.
 */

const what =
  "A plain description of the treatment, to be written and checked by a doctor before it is published.";
const who =
  "Who this treatment is usually for, to be written and checked by a doctor before it is published.";
const stay = "To be confirmed by the treating hospital";
const recovery = "To be confirmed by the treating doctor";

const faq: Faq[] = [
  {
    question: "Question to be supplied",
    answer: "Answer to be supplied and checked by a doctor.",
  },
  {
    question: "Question to be supplied",
    answer: "Answer to be supplied and checked by a doctor.",
  },
];

export const treatments: Treatment[] = [
  {
    slug: "heart-bypass-surgery",
    name: "Heart bypass surgery",
    speciality: "cardiology",
    summary: "Summary to be supplied and checked by a doctor.",
    what,
    who,
    stay,
    recovery,
    faq,
    pending: true,
  },
  {
    slug: "knee-replacement",
    name: "Knee replacement",
    speciality: "orthopaedics",
    summary: "Summary to be supplied and checked by a doctor.",
    what,
    who,
    stay,
    recovery,
    faq,
    pending: true,
  },
  {
    slug: "hip-replacement",
    name: "Hip replacement",
    speciality: "orthopaedics",
    summary: "Summary to be supplied and checked by a doctor.",
    what,
    who,
    stay,
    recovery,
    faq,
    pending: true,
  },
  {
    slug: "chemotherapy",
    name: "Chemotherapy",
    speciality: "oncology",
    summary: "Summary to be supplied and checked by a doctor.",
    what,
    who,
    stay,
    recovery,
    faq,
    pending: true,
  },
];
