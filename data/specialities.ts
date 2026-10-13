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
  {
    slug: "organ-transplant",
    name: "Organ transplant",
    summary:
      "Kidney, liver and other organ transplants, often from a living family donor. The transplant team checks the patient and the donor, and the hospital's committee reviews the papers before anything is planned.",
  },
  {
    slug: "oncology",
    name: "Oncology",
    summary:
      "Cancer care: surgery, chemotherapy, radiation therapy and newer treatments. A team of cancer doctors reads the reports and plans treatment together.",
  },
  {
    slug: "haematology-bmt",
    name: "Haematology and bone marrow transplant",
    summary:
      "Care for blood disorders and blood cancers, including bone marrow transplants for adults and children.",
  },
  {
    slug: "neurology-neurosurgery",
    name: "Neurology and neurosurgery",
    summary:
      "Care and surgery for the brain, spine and nerves, from tumours to movement disorders.",
  },
  {
    slug: "bariatric-surgery",
    name: "Weight loss (bariatric) surgery",
    summary:
      "Operations that help people with severe obesity lose weight and keep it off, when diet and exercise have not been enough.",
  },
  {
    slug: "fertility-ivf",
    name: "Fertility and IVF",
    summary:
      "Help for couples who are trying to have a baby, including IVF and ICSI, after tests for both partners.",
  },
  {
    slug: "orthopaedics",
    name: "Orthopaedics",
    summary:
      "Surgery for bones and joints, such as hip and knee replacement and the repair of sports injuries.",
  },
  {
    slug: "cardiology",
    name: "Cardiology and heart surgery",
    summary:
      "Tests, procedures and operations for the heart, from angioplasty to bypass surgery and valve replacement.",
  },
  {
    slug: "cosmetic-plastic-surgery",
    name: "Plastic, reconstructive and cosmetic surgery",
    summary:
      "Surgery to rebuild or reshape the body and face, and hair transplants, planned after a consultation with the surgeon.",
  },
  {
    slug: "ophthalmology",
    name: "Eye care (ophthalmology)",
    summary:
      "Surgery and care for the eyes, from cataract and LASIK to cornea, glaucoma and retina treatment, after a full eye check.",
  },
  {
    slug: "dentistry",
    name: "Dental care",
    summary:
      "Implants, root canal treatment, braces and cosmetic dentistry, planned after a check-up and X-rays.",
  },
];
