import type { Speciality } from "@/content/types";

/**
 * Placeholder records. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * The order is the order the client leads with, and the order of the groups
 * on /treatments. Keep it in line with the treatment options in the enquiry
 * form (content/site.ts, form.step2.treatment.options).
 */
export const specialities: Speciality[] = [
  { slug: "organ-transplant", name: "Organ transplant" },
  { slug: "oncology", name: "Oncology" },
  { slug: "haematology-bmt", name: "Haematology and bone marrow transplant" },
  { slug: "neurology-neurosurgery", name: "Neurology and neurosurgery" },
  { slug: "bariatric-surgery", name: "Weight loss (bariatric) surgery" },
  { slug: "fertility-ivf", name: "Fertility and IVF" },
  { slug: "orthopaedics", name: "Orthopaedics" },
  { slug: "cardiology", name: "Cardiology and heart surgery" },
  { slug: "cosmetic-plastic-surgery", name: "Plastic, reconstructive and cosmetic surgery" },
];
