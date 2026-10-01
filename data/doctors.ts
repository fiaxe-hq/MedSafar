import type { Doctor, Picture } from "@/content/types";

/**
 * Placeholder records. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * Nothing here is a real doctor. Names, qualifications and experience are
 * stand-ins until Medsafar supplies profiles the doctors have approved.
 */

const portrait: Picture = {
  src: null,
  alt: "Portrait of the doctor, supplied by the hospital",
  pending: true,
};

const profile =
  "Profile to be supplied: the doctor's training, the cases they see most and how they work with patients from abroad.";

export const doctors: Doctor[] = [
  {
    slug: "partner-doctor-a",
    name: "Partner doctor A",
    speciality: "cardiology",
    hospital: "partner-hospital-a",
    experience: "Years of experience to be confirmed",
    qualifications: ["Qualifications to be confirmed"],
    languages: ["Languages to be confirmed"],
    treatments: ["heart-bypass-surgery"],
    profile,
    picture: portrait,
    pending: true,
  },
  {
    slug: "partner-doctor-b",
    name: "Partner doctor B",
    speciality: "orthopaedics",
    hospital: "partner-hospital-a",
    experience: "Years of experience to be confirmed",
    qualifications: ["Qualifications to be confirmed"],
    languages: ["Languages to be confirmed"],
    treatments: ["knee-replacement", "hip-replacement"],
    profile,
    picture: portrait,
    pending: true,
  },
  {
    slug: "partner-doctor-c",
    name: "Partner doctor C",
    speciality: "oncology",
    hospital: "partner-hospital-b",
    experience: "Years of experience to be confirmed",
    qualifications: ["Qualifications to be confirmed"],
    languages: ["Languages to be confirmed"],
    treatments: ["chemotherapy"],
    profile,
    picture: portrait,
    pending: true,
  },
  {
    slug: "partner-doctor-d",
    name: "Partner doctor D",
    speciality: "orthopaedics",
    hospital: "partner-hospital-c",
    experience: "Years of experience to be confirmed",
    qualifications: ["Qualifications to be confirmed"],
    languages: ["Languages to be confirmed"],
    treatments: ["knee-replacement"],
    profile,
    picture: portrait,
    pending: true,
  },
];
