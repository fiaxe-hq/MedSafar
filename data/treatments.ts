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
 * Slugs are referenced from data/hospitals.ts, data/doctors.ts and
 * data/posts.ts; change them there too.
 *
 * A `stay` passed in `known` comes from the package sheet Nanavati Max
 * Super Speciality Hospital supplied (docs/client-content/). The sheet's
 * prices are not used: every patient gets an individual quote.
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

/** Text supplied for a treatment so far. Anything left out stays a placeholder. */
type Known = Partial<Pick<Treatment, "what" | "who" | "stay">>;

const atNanavati = (days: string) =>
  `${days} at Nanavati Max Super Speciality Hospital. Your hospital confirms it for your case.`;

/** Every record stays pending until a doctor has checked it. */
function treatment(
  slug: string,
  name: string,
  speciality: string,
  summary: string,
  known: Known = {},
): Treatment {
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
    ...known,
  };
}

export const treatments: Treatment[] = [
  // Organ transplant
  treatment(
    "kidney-transplant",
    "Kidney transplant",
    "organ-transplant",
    "An operation that places a healthy kidney from a donor into a person whose own kidneys have stopped working.",
    { stay: atNanavati("About 8 days: 3 in intensive care and 5 on the ward") },
  ),
  treatment(
    "liver-transplant",
    "Liver transplant",
    "organ-transplant",
    "An operation that replaces a failing liver with all or part of a healthy liver from a donor.",
    { stay: atNanavati("About 21 days") },
  ),
  treatment(
    "pancreas-transplant",
    "Pancreas transplant",
    "organ-transplant",
    "An operation that places a healthy pancreas from a donor into a person with diabetes, so their body makes its own insulin again. It is often done together with a kidney transplant.",
    {
      // Indications and figures supplied by the client.
      who: "Mainly people with type 1 diabetes: those who no longer feel the warning signs of a dangerously low blood sugar (hypoglycaemia unawareness), those who develop kidney, nerve or eye damage despite insulin, and those who also have chronic kidney disease. Some people with type 2 diabetes are also suitable. Diabetes with kidney disease is serious: the risk of death is about twice that of kidney disease alone, average survival is about 4 to 5 years, and around 16 years of life are lost.",
    },
  ),
  treatment(
    "intestine-transplant",
    "Intestine transplant",
    "organ-transplant",
    "An operation that replaces a small intestine that has failed or been lost with a healthy intestine from a donor.",
    {
      // Indications supplied by the client.
      who: "In children, intestinal failure after necrotising enterocolitis (NEC), gastroschisis or a motility disorder. In adults, loss of the intestine from mesenteric ischaemia (a blocked blood supply), midgut volvulus (a twisted gut) or tumours of the mesentery.",
    },
  ),
  treatment(
    "hand-transplant",
    "Hand transplant",
    "organ-transplant",
    "An operation that attaches one or both hands from a deceased donor to a person who has lost theirs, joining bone, blood vessels, tendons, nerves and skin.",
    {
      // From Max Healthcare's case report and Dr Satbhai's profile card.
      what: "A hand transplant moves skin, muscle, tendon, bone, blood vessels and nerves together, which is why it is called a composite tissue transplant. Surgeons fix the bones, join the arteries and veins, repair the tendons and connect the nerves. Afterwards the patient takes medicine to stop the body rejecting the new hands, and has long-term physiotherapy. When it succeeds, a hand transplant can bring back feeling, a sense of position and coordinated movement beyond what a prosthetic hand can give.",
      who: "People who have lost one or both hands or arms, after careful medical, psychological and immune testing. A suitable donor has to be found, so there is usually a waiting period.",
    },
  ),

  // Haematology and bone marrow transplant
  treatment(
    "bone-marrow-transplant",
    "Bone marrow transplant (stem cell transplant)",
    "haematology-bmt",
    "A treatment that replaces damaged or diseased bone marrow with healthy blood-forming stem cells, used for some blood cancers and blood disorders.",
    {
      who: "People with some blood cancers, such as leukaemia, lymphoma and myeloma, and some blood disorders, such as thalassaemia, sickle cell disease and anaemia. The stem cells can come from the patient (autologous) or from a donor (allogeneic), who may be a full or a half match.",
      stay: atNanavati("About 30 days"),
    },
  ),
  treatment(
    "car-t-cell-therapy",
    "CAR-T cell therapy",
    "haematology-bmt",
    "The patient's own immune cells are collected, changed in a laboratory to recognise their cancer, and given back by drip. Used for some leukaemias, lymphomas and myeloma.",
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
  treatment(
    "liver-tumour-embolisation",
    "Liver tumour embolisation (TACE and TARE)",
    "oncology",
    "Through a pinhole in the groin or wrist, a fine tube is guided to the artery feeding a liver tumour, and chemotherapy (TACE) or tiny radioactive beads (TARE) are delivered straight into it.",
  ),

  // Neurology and neurosurgery
  treatment(
    "brain-tumour-surgery",
    "Brain tumour surgery (craniotomy)",
    "neurology-neurosurgery",
    "An operation in which the surgeon opens a small part of the skull to remove or reduce a tumour in the brain.",
    { stay: atNanavati("About 5 days: 1 in intensive care and 4 on the ward") },
  ),
  treatment(
    "spinal-fusion",
    "Spinal fusion",
    "neurology-neurosurgery",
    "An operation that joins two or more bones of the spine so they heal into one, to steady a painful or unstable part of the back or neck.",
    { stay: atNanavati("About 5 days for up to two levels: 1 in intensive care and 4 on the ward") },
  ),
  treatment(
    "acdf",
    "Anterior cervical discectomy and fusion (ACDF)",
    "neurology-neurosurgery",
    "Through a small cut at the front of the neck, a damaged disc pressing on the nerves or spinal cord is removed and the bones either side are joined.",
    { stay: atNanavati("About 4 days: 1 in intensive care and 3 on the ward") },
  ),
  treatment(
    "microdiscectomy",
    "Microdiscectomy and laminectomy",
    "neurology-neurosurgery",
    "Keyhole surgery on the lower back that removes the part of a slipped disc, or of the bone, that is pressing on a nerve, to relieve sciatica and leg pain.",
    { stay: atNanavati("About 3 days on the ward") },
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
    {
      stay: atNanavati(
        "About 6 days for one knee (1 in intensive care, 5 on the ward), or 8 days for both (2 and 6)",
      ),
    },
  ),
  treatment(
    "hip-replacement",
    "Total hip replacement",
    "orthopaedics",
    "An operation that replaces a damaged hip joint with an artificial ball and socket.",
    {
      stay: atNanavati(
        "About 6 days for one hip (1 in intensive care, 5 on the ward), or 8 days for both (2 and 6)",
      ),
    },
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
    {
      stay: atNanavati(
        "About 7 to 9 days: 3 to 5 in intensive care, depending on risk, and 4 on the ward",
      ),
    },
  ),
  treatment(
    "angioplasty",
    "Coronary angioplasty and stenting",
    "cardiology",
    "A thin tube is passed to a narrowed heart artery, a small balloon widens it, and a mesh tube called a stent is usually left to hold it open.",
    { stay: atNanavati("About 2 days: 1 in intensive care and 1 on the ward") },
  ),
  treatment(
    "heart-valve-replacement",
    "Heart valve replacement",
    "cardiology",
    "An operation or catheter procedure that replaces a heart valve that is too narrow or leaks, with a mechanical or tissue valve.",
    { stay: atNanavati("About 7 days for one valve: 3 in intensive care and 4 on the ward") },
  ),

  // Plastic, reconstructive and cosmetic surgery
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
