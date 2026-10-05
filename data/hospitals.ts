import type { Hospital, Picture } from "@/content/types";

/**
 * Partner hospitals. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * Every fact here comes from material the hospital supplied to Medsafar
 * (the originals are in docs/client-content/), unless a comment says otherwise.
 */

const photo = (file: string, alt: string): Picture => ({
  src: `/photos/hospitals/nanavati-max/${file}.jpg`,
  alt,
  pending: false,
});

export const hospitals: Hospital[] = [
  {
    slug: "nanavati-max",
    name: "Nanavati Max Super Speciality Hospital",
    city: "Mumbai",
    address: "S. V. Road, Vile Parle (West), Mumbai 400 056, India",
    accreditation: "NABL-accredited laboratories",
    overview:
      "A Mumbai hospital with 75 years of service, now run by Max Healthcare. It has more than 595 beds, 600 full-time doctors and 3,500 caregivers, a new tower with an international patient lounge, and 12 modular operating theatres. It is known for cancer care, organ and bone marrow transplants, robotic surgery and complex reconstructive surgery, including hand transplants.",
    // From the "Centres of Excellence" sheet the hospital supplied.
    centres: [
      "Nanavati Max Institute of Cancer Care",
      "Nanavati Max Institute of Renal Sciences and Kidney Transplant",
      "Nanavati Max Institute of Liver, Intestine and Pancreas Sciences",
      "Centre for Bone Marrow Transplant",
      "Heart Institute",
      "Centre for Neurosciences",
      "Nanavati Max Institute of Advanced Orthopaedics, Spine and Joint Care",
      "Centre for Plastic and Cosmetic Surgery",
      "Centre for Critical Care",
      "Centre for Child Health",
      "Centre for Women's Health",
      "Centre for Chest and Respiratory Diseases",
      "Radiology and Imaging Institute",
    ],
    specialities: [
      "organ-transplant",
      "oncology",
      "haematology-bmt",
      "neurology-neurosurgery",
      "orthopaedics",
      "cardiology",
      "cosmetic-plastic-surgery",
      "bariatric-surgery",
    ],
    treatments: [
      "kidney-transplant",
      "liver-transplant",
      "pancreas-transplant",
      "intestine-transplant",
      "hand-transplant",
      "chemotherapy",
      "radiation-therapy",
      "cancer-surgery",
      "liver-tumour-embolisation",
      "bone-marrow-transplant",
      "car-t-cell-therapy",
      "brain-tumour-surgery",
      "spinal-fusion",
      "acdf",
      "microdiscectomy",
      "deep-brain-stimulation",
      "knee-replacement",
      "hip-replacement",
      "heart-bypass-surgery",
      "angioplasty",
      "heart-valve-replacement",
      "hair-transplant",
    ],
    services: [
      "An international patient lounge in the new tower",
      "Cashless treatment with all major international insurers",
      "Private rooms with a view of the sea",
      "Air ambulance transfer for critically ill patients",
      "A 24-hour helpline and a round-the-clock emergency department",
    ],
    picture: photo(
      "international-lounge",
      "Patients and families waiting in the international patient lounge at Nanavati Max Super Speciality Hospital",
    ),
    gallery: [
      photo("lobby", "The main lobby of the new tower, with a reception desk below a world map"),
      photo("private-room", "A private patient room with floor-to-ceiling windows"),
      photo("critical-care", "Glass-fronted bays in the critical care unit"),
      photo("opd", "The outpatient department waiting area"),
      photo("operating-theatre", "A modular operating theatre"),
      photo("robotic-surgery", "The da Vinci Xi robotic surgery system"),
      photo("halcyon", "The Halcyon radiotherapy machine for cancer treatment"),
      photo("linear-accelerator", "A Varian Edge linear accelerator for precise radiotherapy"),
      photo("emergency", "The entrance to the emergency department"),
    ],
    videos: [
      {
        title: "A tour of the new tower",
        src: "/photos/hospitals/nanavati-max/new-tower.mp4",
        poster: "/photos/hospitals/nanavati-max/new-tower-poster.jpg",
      },
      { title: "Nanavati Max: a journey of providing quality care", youtube: "s-qnXGZW0RA" },
      { title: "Nanavati Max Super Speciality Hospital", youtube: "JC9kP_S9Oys" },
    ],
  },
];
