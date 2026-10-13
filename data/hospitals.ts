import type { Hospital, Picture } from "@/content/types";

/**
 * Partner hospitals. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * Every fact here comes from material the hospital supplied to Medsafar
 * (the originals are in docs/client-content/), unless a comment says otherwise.
 */

const photos = (hospital: string) => (file: string, alt: string): Picture => ({
  src: `/photos/hospitals/${hospital}/${file}.jpg`,
  alt,
  pending: false,
});

const photo = photos("nanavati-max");
// From the hospital's website.
const keniaPhoto = photos("kenia-eye");

/** A stand-in hospital with no real details, marked as pending on the page. */
const placeholder = (slug: string, city: string, specialities: string[]): Hospital => ({
  slug,
  name: `Partner hospital, ${city}`,
  city,
  accreditation: "Accreditation to be confirmed",
  overview: "Details of this partner hospital are being added.",
  specialities,
  treatments: [],
  services: ["Services for international patients to be confirmed"],
  picture: { src: null, alt: `The main building of the partner hospital in ${city}`, pending: true },
  gallery: [
    { src: null, alt: "The reception area", pending: true },
    { src: null, alt: "A patient room", pending: true },
    { src: null, alt: "An operating theatre", pending: true },
  ],
  pending: true,
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
      "dialysis",
      "childhood-cancer-treatment",
      "targeted-therapy-immunotherapy",
      "head-neck-cancer-surgery",
      "thyroid-surgery",
      "breast-cancer-surgery",
      "hpb-cancer-surgery",
      "gi-cancer-surgery",
      "hipec",
      "urologic-cancer-surgery",
      "gynaecologic-cancer-surgery",
      "bone-cancer-surgery",
      "tumour-ablation",
      "endoscopic-spine-surgery",
      "cervical-disc-replacement",
      "scoliosis-surgery",
      "minimally-invasive-heart-surgery",
      "ecmo",
      "heart-diabetes-care",
      "varicose-veins",
      "peripheral-artery-disease",
      "hand-surgery",
      "brachial-plexus-surgery",
      "reconstructive-microsurgery",
      "lymphoedema-surgery",
      "childrens-plastic-surgery",
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
  {
    slug: "kenia-eye",
    name: "Kenia Eye Hospital",
    city: "Mumbai",
    address: "1st Floor, Rizvi Nagar, near Sarang Restaurant, S. V. Road, Santacruz (West), Mumbai 400 054, India",
    accreditation: "NABH, QAI and FEQH accredited",
    // From the hospital's website (keniaeyehospital.com), its services board
    // and keniadentalclinic.com.
    overview:
      "A specialist eye hospital in Santacruz, Mumbai, caring for patients since 1998. It is led by Dr. Vaishal Kenia, a cataract and refractive surgeon, with a team of doctors and consultants covering every part of eye care. It is approved for corneal transplants and has the FEMTO Z8 NEO bladeless laser, the first in Western India, alongside advanced scanners such as the IOL Master 700, Pentacam, Verion and OPTOS ultra-wide retinal imaging. It treats everything from cataract and LASIK to cornea, glaucoma, retina, squint and eyelid problems. Dental care is offered alongside, through Kenia Dental Clinic in the same building, run by Dr. Pallavi Kenia.",
    centresLabel: "Services offered",
    // From the "Services offered" board at the hospital.
    centres: [
      "Cataract and premium IOL services",
      "LASIK, Femto-LASIK, CLEAR and refractive surgery",
      "Cornea and keratoconus services",
      "Glaucoma services",
      "Retina and vitreo-retinal services",
      "Diabetic eye screening",
      "Dry eye and eyelid care",
      "Low vision and vision therapy",
      "Contact lens services",
      "Oculoplasty services",
      "Squint and children's eye care",
      "Comprehensive eye check-up",
      "Dental care at Kenia Dental Clinic, in the same building",
    ],
    specialities: ["ophthalmology", "dentistry"],
    treatments: [
      "cataract-surgery",
      "lasik",
      "icl",
      "keratoconus-treatment",
      "corneal-transplant",
      "glaucoma-treatment",
      "vitreoretinal-surgery",
      "squint-surgery",
      "oculoplastic-surgery",
      "dental-implants",
      "root-canal-treatment",
      "smile-design",
      "full-mouth-rehabilitation",
      "braces-aligners",
    ],
    services: [
      "Most eye operations are day procedures, with no overnight stay",
      "A specialist on call 24 hours a day for eye emergencies",
    ],
    picture: keniaPhoto("surgery", "A surgeon operating at the microscope at Kenia Eye Hospital"),
    gallery: [
      keniaPhoto("refractive-screening", "A doctor scanning a patient's eyes in the refractive screening room"),
      keniaPhoto("eye-exam", "Doctors examining a patient at the slit lamp"),
      keniaPhoto("dry-eye-therapy", "A patient having light therapy for dry eye"),
      keniaPhoto("femto-z8-neo", "The FEMTO Z8 NEO bladeless laser"),
      keniaPhoto("femto-laser-arm", "The laser arm of the FEMTO Z8 NEO"),
    ],
  },

  // Placeholders, to show how the lists look with more hospitals. Replace
  // each with a real partner hospital.
  placeholder("partner-hospital-delhi", "New Delhi", ["oncology", "cardiology", "orthopaedics"]),
  placeholder("partner-hospital-chennai", "Chennai", ["organ-transplant", "neurology-neurosurgery", "fertility-ivf"]),
  placeholder("partner-hospital-bengaluru", "Bengaluru", ["haematology-bmt", "bariatric-surgery", "cosmetic-plastic-surgery"]),
];
