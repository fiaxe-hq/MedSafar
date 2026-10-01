import type { Hospital, Picture } from "@/content/types";

/**
 * Placeholder records. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * Nothing here is a real hospital. Names, cities and accreditations are
 * stand-ins until Medsafar confirms its partner list.
 */

const photo = (alt: string): Picture => ({ src: null, alt, pending: true });

const services = [
  "International patient desk, to be confirmed by the hospital",
  "Interpreter support, to be confirmed by the hospital",
  "Visa invitation letter, to be confirmed by the hospital",
];

const gallery = [
  photo("Photograph of a patient room at the partner hospital"),
  photo("Photograph of the international patient desk"),
  photo("Photograph of a treatment area at the partner hospital"),
];

export const hospitals: Hospital[] = [
  {
    slug: "partner-hospital-a",
    name: "Partner hospital A",
    city: "City A",
    accreditation: "Accreditation to be confirmed",
    overview:
      "Overview to be supplied by Medsafar once the partner hospital is confirmed: what the hospital is known for, its size and how it looks after patients from abroad.",
    specialities: ["cardiology", "orthopaedics"],
    treatments: ["heart-bypass-surgery", "knee-replacement", "hip-replacement"],
    services,
    picture: photo("Photograph of the partner hospital"),
    gallery,
    pending: true,
  },
  {
    slug: "partner-hospital-b",
    name: "Partner hospital B",
    city: "City B",
    accreditation: "Accreditation to be confirmed",
    overview:
      "Overview to be supplied by Medsafar once the partner hospital is confirmed: what the hospital is known for, its size and how it looks after patients from abroad.",
    specialities: ["oncology", "cardiology"],
    treatments: ["chemotherapy", "heart-bypass-surgery"],
    services,
    picture: photo("Photograph of the partner hospital"),
    gallery,
    pending: true,
  },
  {
    slug: "partner-hospital-c",
    name: "Partner hospital C",
    city: "City A",
    accreditation: "Accreditation to be confirmed",
    overview:
      "Overview to be supplied by Medsafar once the partner hospital is confirmed: what the hospital is known for, its size and how it looks after patients from abroad.",
    specialities: ["orthopaedics", "oncology"],
    treatments: ["knee-replacement", "hip-replacement", "chemotherapy"],
    services,
    picture: photo("Photograph of the partner hospital"),
    gallery,
    pending: true,
  },
];
