import type { Faq, Treatment } from "@/content/types";

/**
 * Placeholder records. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * The treatment names are the common ones patients search for. Every
 * summary is a plain-English draft, and every description, stay and recovery
 * time is a stand-in, until a doctor has written and checked the real text.
 * Nothing here is medical advice, a promise of an outcome or a price.
 *
 * Slugs referenced from data/hospitals.ts, data/doctors.ts and data/posts.ts
 * (heart-bypass-surgery, knee-replacement, hip-replacement, chemotherapy)
 * must not change.
 */

const check = "Draft, to be checked by a doctor before it is published.";

const what =
  "A plain description of the treatment, to be written and checked by a doctor before it is published.";
const who =
  "Who this treatment is usually for, to be written and checked by a doctor before it is published.";
const stay = "To be confirmed by the treating hospital and checked by a doctor";
const recovery = "To be confirmed by the treating doctor and checked by a doctor";

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

/** Every record shares the placeholder fields and stays pending. */
function treatment(slug: string, name: string, speciality: string, summary: string): Treatment {
  return {
    slug,
    name,
    speciality,
    summary: `${summary} ${check}`,
    what,
    who,
    stay,
    recovery,
    faq,
    pending: true,
  };
}

export const treatments: Treatment[] = [
  // Organ transplant
  treatment(
    "kidney-transplant",
    "Kidney transplant",
    "organ-transplant",
    "An operation that places a healthy kidney from a donor into a person whose own kidneys have stopped working.",
  ),
  treatment(
    "liver-transplant",
    "Liver transplant",
    "organ-transplant",
    "An operation that replaces a failing liver with all or part of a healthy liver from a donor.",
  ),
  treatment(
    "bone-marrow-transplant",
    "Bone marrow transplant (stem cell transplant)",
    "organ-transplant",
    "A treatment that replaces damaged or diseased bone marrow with healthy blood-forming stem cells, used for some blood cancers and blood disorders.",
  ),

  // Oncology
  treatment(
    "chemotherapy",
    "Chemotherapy",
    "oncology",
    "Medicines that kill cancer cells or stop them growing, given by drip, injection or tablet over a series of sessions.",
  ),
  treatment(
    "radiation-therapy",
    "Radiation therapy (radiotherapy)",
    "oncology",
    "Treatment that uses carefully aimed high-energy beams to destroy cancer cells in one part of the body.",
  ),
  treatment(
    "cancer-surgery",
    "Cancer surgery (surgical oncology)",
    "oncology",
    "An operation to remove a tumour and, where needed, nearby tissue or lymph nodes.",
  ),

  // Neurology and neurosurgery
  treatment(
    "brain-tumour-surgery",
    "Brain tumour surgery (craniotomy)",
    "neurology-neurosurgery",
    "An operation in which the surgeon opens a small part of the skull to remove or reduce a tumour in the brain.",
  ),
  treatment(
    "spinal-fusion",
    "Spinal fusion",
    "neurology-neurosurgery",
    "An operation that joins two or more bones of the spine so they heal into one, to steady a painful or unstable part of the back or neck.",
  ),
  treatment(
    "deep-brain-stimulation",
    "Deep brain stimulation (DBS)",
    "neurology-neurosurgery",
    "A small device placed under the skin sends mild electrical signals to part of the brain, used for some movement disorders such as Parkinson's disease.",
  ),

  // Weight loss (bariatric) surgery
  treatment(
    "gastric-sleeve",
    "Sleeve gastrectomy (gastric sleeve)",
    "bariatric-surgery",
    "Keyhole surgery that removes a large part of the stomach, leaving a narrow sleeve, so a person feels full sooner.",
  ),
  treatment(
    "gastric-bypass",
    "Roux-en-Y gastric bypass",
    "bariatric-surgery",
    "Surgery that makes a small stomach pouch and connects it further down the small intestine, so less food is eaten and absorbed.",
  ),

  // Fertility and IVF
  treatment(
    "ivf",
    "In vitro fertilisation (IVF)",
    "fertility-ivf",
    "Eggs are collected and fertilised with sperm in a laboratory, and an embryo is then placed in the womb.",
  ),
  treatment(
    "icsi",
    "Intracytoplasmic sperm injection (ICSI)",
    "fertility-ivf",
    "A form of IVF in which a single sperm is injected directly into each egg, often used when there are problems with sperm.",
  ),

  // Orthopaedics
  treatment(
    "knee-replacement",
    "Total knee replacement",
    "orthopaedics",
    "An operation that replaces the worn surfaces of the knee joint with metal and plastic parts.",
  ),
  treatment(
    "hip-replacement",
    "Total hip replacement",
    "orthopaedics",
    "An operation that replaces a damaged hip joint with an artificial ball and socket.",
  ),
  treatment(
    "acl-reconstruction",
    "ACL reconstruction",
    "orthopaedics",
    "Keyhole surgery that rebuilds a torn anterior cruciate ligament, one of the main ligaments inside the knee.",
  ),

  // Cardiology and heart surgery
  treatment(
    "heart-bypass-surgery",
    "Coronary artery bypass grafting (CABG)",
    "cardiology",
    "Heart bypass surgery: a blood vessel from elsewhere in the body is used to route blood around a narrowed or blocked artery of the heart.",
  ),
  treatment(
    "angioplasty",
    "Coronary angioplasty and stenting",
    "cardiology",
    "A thin tube is passed to a narrowed heart artery, a small balloon widens it, and a mesh tube called a stent is usually left to hold it open.",
  ),
  treatment(
    "heart-valve-replacement",
    "Heart valve replacement",
    "cardiology",
    "An operation or catheter procedure that replaces a heart valve that is too narrow or leaks, with a mechanical or tissue valve.",
  ),

  // Cosmetic and plastic surgery
  treatment(
    "rhinoplasty",
    "Rhinoplasty (nose reshaping)",
    "cosmetic-plastic-surgery",
    "Surgery to change the shape or size of the nose, for appearance, for breathing, or both.",
  ),
  treatment(
    "liposuction",
    "Liposuction",
    "cosmetic-plastic-surgery",
    "Surgery that removes fat from chosen areas of the body through small cuts. It reshapes the body; it is not a weight-loss treatment.",
  ),
  treatment(
    "hair-transplant",
    "Hair transplant (FUE)",
    "cosmetic-plastic-surgery",
    "Hair follicles are moved one by one from the back or sides of the head to thinning or bald areas.",
  ),
];
