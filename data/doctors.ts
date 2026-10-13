import type { Doctor, Picture } from "@/content/types";

/**
 * Doctors at partner hospitals. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * Every profile is taken from the doctor's profile card, supplied by the
 * hospital (the originals are in docs/client-content/). Languages are left
 * empty, and so hidden, until they are confirmed.
 */

const portrait = (slug: string, name: string): Picture => ({
  src: `/photos/doctors/${slug}.jpg`,
  alt: `Portrait of ${name}`,
  pending: false,
});

const nanavati = "nanavati-max";

export const doctors: Doctor[] = [
  // Oncology
  {
    slug: "devendra-chaukar",
    name: "Dr Devendra Chaukar",
    role: "Senior Director, Surgical Oncology (Head and Neck)",
    speciality: "oncology",
    hospital: nanavati,
    experience: "More than 20 years",
    qualifications: ["Former Professor and Head, Division of Head and Neck, Tata Memorial Hospital"],
    languages: [],
    expertise: [
      "Laser, trans-oral robotic and minimally invasive surgery",
      "Voice-preserving surgery of the larynx and voice rehabilitation",
      "Thyroid and parathyroid surgery",
      "Clinical research in head and neck cancer",
    ],
    treatments: ["head-neck-cancer-surgery", "thyroid-surgery", "cancer-surgery"],
    profile:
      "A head and neck cancer surgeon with more than 20 years of experience and over 150 publications in national and international journals. He is a member of the Indian Association of Surgical Oncology and the Indian Society of Oncology, and an honorary member of the Israel Society of Head and Neck Oncology.",
    picture: portrait("devendra-chaukar", "Dr Devendra Chaukar"),
  },
  {
    slug: "ganesh-nagarajan",
    name: "Dr Ganesh Nagarajan",
    role: "Vice Chairman, HPB and GI Surgery",
    speciality: "oncology",
    hospital: nanavati,
    experience: "More than 20 years; over 7,000 major GI and HPB cancer operations",
    qualifications: [
      "Fellowship in HPB surgery and liver transplantation, Beaujon Hospital, Paris",
      "Surgical oncology training, Tata Memorial Hospital, Mumbai",
    ],
    languages: [],
    expertise: [
      "Surgery for cancers of the liver, bile duct and gall bladder",
      "Pancreatic resections for pancreatic cancer, including Whipple's",
      "Colorectal, stomach, oesophageal and intestinal cancer",
      "Robotic and laparoscopic GI and HPB cancer surgery",
      "HIPEC surgery",
      "Vascular resection and reconstruction in HPB tumours",
      "Abdominal sarcomas and retroperitoneal tumours",
    ],
    treatments: ["hpb-cancer-surgery", "gi-cancer-surgery", "hipec", "cancer-surgery"],
    profile:
      "One of India's leading surgeons for cancers of the liver, pancreas, bile duct and gut. His team performs some of the highest numbers of complex liver and pancreatic resections, and his department is a referral centre for complex GI and HPB cancer. Before Nanavati Max he was a senior consultant at Hinduja Hospital for almost 10 years and at Bombay Hospital for 4.",
    picture: portrait("ganesh-nagarajan", "Dr Ganesh Nagarajan"),
  },
  {
    slug: "garvit-chitkara",
    name: "Dr Garvit Chitkara",
    role: "Associate Director, Breast Surgical Oncology and Oncoplastic Surgery",
    speciality: "oncology",
    hospital: nanavati,
    experience: "More than 15 years",
    qualifications: [
      "Certified Breast Surgical Oncologist, European Society of Surgical Oncology",
      "Cancer genetics courses, Harvard Medical School",
      "Former Associate Professor, Tata Memorial Hospital, Mumbai",
    ],
    languages: [],
    expertise: [
      "Breast cancer surgery",
      "Oncoplastic breast surgery",
      "Cancer genetics",
      "Vacuum-assisted breast biopsy",
    ],
    treatments: ["breast-cancer-surgery", "cancer-surgery"],
    profile:
      "A breast cancer surgeon who has treated thousands of patients, many with complex cases, with evidence-based treatment planned around how they want to live afterwards. As Associate Professor at Tata Memorial Hospital he helped train several generations of cancer surgeons.",
    picture: portrait("garvit-chitkara", "Dr Garvit Chitkara"),
  },
  {
    slug: "hemant-tongaonkar",
    name: "Dr Hemant B. Tongaonkar",
    role: "Head of Department and Principal Director, Urologic and Gynaecologic Oncosurgery",
    speciality: "oncology",
    hospital: nanavati,
    experience: "More than 36 years",
    qualifications: [
      "Former Head, Department of Surgery, and Head, Urologic and Gynaecologic Oncology, Tata Memorial Hospital",
      "Former Head Consultant, Urologic and Gynaecologic Oncology, Hinduja Hospital",
    ],
    languages: [],
    expertise: [
      "Kidney, bladder, prostate, penile and testicular cancers, and adrenal tumours",
      "Ovarian, uterine, cervical and vulval cancers, and gynaecological sarcomas",
      "Ultra-radical cytoreductive surgery for ovarian cancer",
      "Robotic surgery",
      "Treatment that preserves organ function and fertility where possible",
    ],
    treatments: ["urologic-cancer-surgery", "gynaecologic-cancer-surgery", "hipec", "cancer-surgery"],
    profile:
      "Among the most experienced cancer surgeons in India, and part of the team that developed modern urologic and gynaecologic cancer surgery in the country. He leads the ICMR sub-committee on ovarian cancer guidelines, has more than 200 publications, and has trained surgeons from India and abroad.",
    picture: portrait("hemant-tongaonkar", "Dr Hemant B. Tongaonkar"),
  },
  {
    slug: "muzammil-shaikh",
    name: "Dr Muzammil Shaikh",
    role: "Principal Director, Medical Oncology",
    speciality: "oncology",
    hospital: nanavati,
    experience: "More than 21 years",
    qualifications: [
      "MBBS, Grant Medical College and Sir J.J. Hospital, Mumbai",
      "MD (Internal Medicine), Seth G.S. Medical College and KEM Hospital, Mumbai",
      "DM (Medical Oncology), Gujarat Cancer and Research Institute",
      "DNB, National Board, New Delhi",
      "Preceptorship in metastatic colorectal cancer, Liverpool, UK",
      "Observership, MD Anderson Cancer Center, Houston, USA",
    ],
    languages: [],
    expertise: [
      "Precision and molecular oncology",
      "Breast, ovarian and lung cancer",
      "Gastrointestinal and hepatobiliary cancers",
      "Head and neck cancers",
      "Genito-urinary cancers",
      "Bone and soft tissue sarcomas",
      "Geriatric oncology and palliative care",
    ],
    treatments: ["chemotherapy", "targeted-therapy-immunotherapy"],
    profile:
      "A medical oncologist who plans and leads drug treatment for cancer, including chemotherapy, targeted therapy and immunotherapy, with training in India, the UK and the USA.",
    picture: portrait("muzammil-shaikh", "Dr Muzammil Shaikh"),
  },
  {
    slug: "manish-agarwal",
    name: "Dr Manish Agarwal",
    role: "Director and Head, Orthopaedic Oncology",
    speciality: "oncology",
    hospital: nanavati,
    experience: "More than 30 years, since 1994",
    qualifications: [
      "MBBS, University of Bombay (1987)",
      "D. Ortho, College of Physicians and Surgeons (1991)",
      "MS (Ortho), University of Bombay (1992)",
      "DNB (Ortho), National Board of Examinations (1993)",
      "Diploma in Tissue Banking, National University of Singapore (2005)",
    ],
    languages: [],
    expertise: [
      "Bone and soft tissue tumours",
      "Limb salvage surgery",
      "Complex reconstruction",
      "Indian implants of international quality",
    ],
    treatments: ["bone-cancer-surgery", "cancer-surgery"],
    profile:
      "A pioneer of bone cancer surgery in India, focused on saving limbs that would once have been amputated. He was Orthopaedic Oncologist and Associate Professor at Tata Memorial Hospital for 10 years and at Hinduja Hospital for 11, is a founding member of the Indian Musculoskeletal Oncology Society, and has over 100 publications.",
    picture: portrait("manish-agarwal", "Dr Manish Agarwal"),
  },
  {
    slug: "aniruddha-kulkarni",
    name: "Dr Aniruddha Kulkarni",
    role: "Director, Interventional Radiology, Nanavati Max Institute of Cancer Care",
    speciality: "oncology",
    hospital: nanavati,
    experience: "More than 20 years, since 2003",
    qualifications: [
      "MD (Radiodiagnosis), B.J. Medical College and Sassoon General Hospitals, Pune",
      "Fellowship in Vascular and Interventional Radiology, KEM and Lilavati Hospital",
    ],
    languages: [],
    expertise: [
      "Liver tumour treatment",
      "Chemoembolisation and radioembolisation",
      "Ablation therapies",
      "Varicose veins and deep vein thrombosis",
      "Peripheral arterial disease",
    ],
    treatments: ["liver-tumour-embolisation", "tumour-ablation", "varicose-veins", "peripheral-artery-disease"],
    profile:
      "An interventional radiologist who treats tumours and blood vessel disease through a pinhole, using imaging to guide fine tubes and needles instead of open surgery. He was previously at Hinduja Hospital (2010 to 2021) and Tata Memorial Hospital (2005 to 2010).",
    picture: portrait("aniruddha-kulkarni", "Dr Aniruddha Kulkarni"),
  },

  // Haematology and bone marrow transplant
  {
    slug: "sameer-tulpule",
    name: "Dr Sameer Tulpule",
    role: "Senior Director, Haematology and Bone Marrow Transplant (Adult)",
    speciality: "haematology-bmt",
    hospital: nanavati,
    experience: "Consultant haematologist since 2012, in the UK and India",
    qualifications: [
      "MBBS, Seth G.S. Medical College and KEM Hospital, Mumbai (1993)",
      "MD (Medicine), Rajiv Gandhi University of Health Sciences (1999)",
      "MRCP, Royal College of Physicians, UK (2004)",
      "FRCPath, Royal College of Pathologists, UK (2011)",
      "Fellowship in Bone Marrow Transplant, Nottingham University Hospitals, UK (2013)",
    ],
    languages: [],
    expertise: [
      "Bone marrow transplant: autologous, allogeneic and haploidentical",
      "CAR-T cell therapy",
      "Acute and chronic leukaemias",
      "Multiple myeloma",
      "Lymphomas, including targeted therapies",
      "Anaemia, including thalassaemia",
      "Bleeding and clotting disorders",
    ],
    treatments: ["bone-marrow-transplant", "car-t-cell-therapy"],
    profile:
      "A haematologist and transplant physician who trained and worked in the UK's NHS and at the Anthony Nolan stem cell registry in London before ten years at Kokilaben Dhirubhai Ambani Hospital, Mumbai. He treats blood cancers and blood disorders in adults, including with bone marrow transplant and CAR-T cell therapy.",
    picture: portrait("sameer-tulpule", "Dr Sameer Tulpule"),
  },
  {
    slug: "nidhi-dhariwal",
    name: "Dr Nidhi Dhariwal",
    role: "Consultant, Paediatric Haemato-Oncology and Bone Marrow Transplant",
    speciality: "haematology-bmt",
    hospital: nanavati,
    experience: "More than 9 years",
    qualifications: ["MBBS", "MD (Paediatrics)", "DM (Paediatric Oncology)"],
    languages: [],
    expertise: [
      "Solid tumours in children",
      "Blood and lymph cancers in children",
      "Bone marrow transplant",
      "Non-cancerous blood disorders",
    ],
    treatments: ["childhood-cancer-treatment", "bone-marrow-transplant", "chemotherapy"],
    profile:
      "A specialist in blood disorders and cancers in children, including bone marrow transplant. Her awards include the Young Investigator Award of the International Society of Paediatric Oncology (SIOP, 2020).",
    picture: portrait("nidhi-dhariwal", "Dr Nidhi Dhariwal"),
  },

  // Organ transplant
  {
    slug: "jatin-kothari",
    name: "Dr Jatin Kothari",
    role: "Director of Nephrology and Chief Consultant, Renal Transplant Medicine",
    speciality: "organ-transplant",
    hospital: nanavati,
    experience: "Consultant nephrologist since 2003; 27 years of teaching",
    qualifications: [
      "MBBS, MD (Medicine) and DM (Nephrology), Bombay University",
      "Clinical fellowship in nephrology and transplantation, University of Toronto (2000 to 2003)",
      "Preceptorship in kidney transplantation, University of Alabama, Birmingham (2006)",
      "Preceptorship in kidney transplantation, University of Toulouse (2014)",
      "PhD, Tata Institute of Social Sciences, Mumbai",
    ],
    languages: [],
    expertise: [
      "Living donor kidney transplant, including swap and domino transplants",
      "Deceased donor kidney transplant",
      "Prevention of kidney disease",
      "Haemodiafiltration and nocturnal dialysis",
    ],
    treatments: ["kidney-transplant", "dialysis"],
    profile:
      "A kidney specialist and transplant physician, trained in Toronto, who was consultant nephrologist and transplant physician at P.D. Hinduja Hospital from 2003 to 2021. He is a founding trustee of the Apex Kidney Foundation and a member of the International Society of Nephrology and the Indian Society of Organ Transplantation.",
    picture: portrait("jatin-kothari", "Dr Jatin Kothari"),
  },

  // Cardiology and heart surgery
  {
    slug: "gulshan-rohra",
    name: "Dr Gulshan Rohra",
    role: "Associate Director, Cardiothoracic and Vascular Surgery",
    speciality: "cardiology",
    hospital: nanavati,
    experience: "Cardiac surgeon since 2017, in India and the UK",
    qualifications: [
      "MBBS, Dr Balasaheb Vikhe Patil Rural Medical College (2008)",
      "DNB (Cardiothoracic Surgery), Sir Ganga Ram Hospital, New Delhi (2016)",
      "Clinical fellowship in cardiothoracic surgery, James Cook University Hospital, UK (2021)",
    ],
    languages: [],
    expertise: [
      "Complex cardiac surgery",
      "Minimally invasive cardiac surgery",
      "Extracorporeal membrane oxygenation (ECMO)",
    ],
    treatments: ["heart-bypass-surgery", "heart-valve-replacement", "minimally-invasive-heart-surgery", "ecmo"],
    profile:
      "A heart surgeon who worked as an international training fellow in the UK's NHS before leading cardiac surgery departments in Thane and at Wockhardt Hospitals, Mumbai.",
    picture: portrait("gulshan-rohra", "Dr Gulshan Rohra"),
  },
  {
    slug: "abhishek-bhargav",
    name: "Dr Abhishek Bhargav",
    role: "Consulting Physician, Cardiologist and Diabetologist",
    speciality: "cardiology",
    hospital: nanavati,
    // From precisionmedicalclinic.com, his own clinic's website.
    otherPractice:
      "Precision Medical Clinic, Bharatiya Arogya Nidhi Hospital, Juhu Scheme, Mumbai 400 049",
    experience: "More than 20 years",
    qualifications: ["DNB (Medicine)", "FRSH (UK)", "FEAC", "MNAMS", "PG Diabetology (Boston)"],
    languages: [],
    expertise: ["Heart care", "Diabetes", "Preventive health and wellness"],
    treatments: ["heart-diabetes-care"],
    profile:
      "A physician who looks after heart disease and diabetes together, with an evidence-based approach planned around each patient.",
    picture: portrait("abhishek-bhargav", "Dr Abhishek Bhargav"),
  },

  // Orthopaedics and spine
  {
    slug: "amandeep-gujral",
    name: "Dr Amandeep Gujral",
    role: "Consultant, Minimally Invasive Spine Surgery",
    speciality: "orthopaedics",
    hospital: nanavati,
    experience: "More than 10 years; over 2,000 spine operations",
    qualifications: [
      "Board-certified orthopaedic surgeon",
      "Spine surgery training, Kokilaben Dhirubhai Ambani Hospital, Mumbai",
      "Minimally invasive spine surgery training, Seoul National University and Yonsei University, South Korea",
      "IGASS Fellowship, London Bridge Hospital, UK",
    ],
    languages: [],
    expertise: [
      "Minimally invasive lumbar fixation",
      "Endoscopic and navigation-assisted spine surgery",
      "Cervical disc replacement",
      "Spine deformity correction",
      "Spine trauma and tumour surgery",
      "Revision spine surgery",
      "Sciatica and pain management",
    ],
    treatments: ["spinal-fusion", "acdf", "microdiscectomy", "endoscopic-spine-surgery", "cervical-disc-replacement", "scoliosis-surgery"],
    profile:
      "A spine surgeon who uses keyhole, endoscopic and navigated techniques wherever they suit the case, which usually means smaller cuts and a quicker return home. He trained in South Korea and in London, where he specialised in navigated spine surgery and disc replacement.",
    picture: portrait("amandeep-gujral", "Dr Amandeep Gujral"),
  },

  // Plastic and reconstructive surgery
  {
    slug: "nilesh-satbhai",
    name: "Dr Nilesh G. Satbhai",
    role: "Director, Plastic, Reconstructive Microsurgery and Hand Transplantation",
    speciality: "cosmetic-plastic-surgery",
    hospital: nanavati,
    experience: "19 years",
    qualifications: [
      "MBBS, Dr Vasantrao Pawar Medical College, Nashik (2000)",
      "MS (General Surgery), Lokmanya Tilak Municipal General Hospital, Mumbai (2007)",
      "MCh (Plastic Surgery), Seth G.S. Medical College and KEM Hospital, Mumbai (2010)",
      "Fellowships in hand and reconstructive microsurgery in India, Japan and Taiwan (2012 to 2014)",
      "Fellowships at Mayo Clinic and Penn Medicine, USA (2022)",
    ],
    languages: [],
    expertise: [
      "Hand transplantation",
      "Hand surgery",
      "Reconstructive microsurgery",
      "Brachial plexus and nerve surgery",
      "Restoring arm and hand function",
      "Saving and rebuilding injured legs",
      "Plastic surgery for children and birth defects",
      "Lymphatic microsurgery",
    ],
    treatments: ["hand-transplant", "hand-surgery", "brachial-plexus-surgery", "reconstructive-microsurgery", "lymphoedema-surgery", "childrens-plastic-surgery"],
    profile:
      "A hand and reconstructive microsurgeon who led the hand transplant programme at Gleneagles Hospital, Mumbai. He has performed more than 24 hand transplants in 13 patients, including India's first unilateral hand transplant, Asia's first partial hand transplant and Asia's first bilateral arm transplant at shoulder level. In January 2026 he led the first bilateral hand transplant at Nanavati Max.",
    picture: portrait("nilesh-satbhai", "Dr Nilesh G. Satbhai"),
  },
  // Kenia Eye Hospital. Taken from the doctors' pages on keniaeyehospital.com
  // and Practo.
  {
    slug: "vaishal-kenia",
    name: "Dr Vaishal Kenia",
    role: "Chairman and Medical Director",
    speciality: "ophthalmology",
    hospital: "kenia-eye",
    experience: "32 years, 26 of them as a specialist",
    qualifications: [
      "MBBS, Topiwala National Medical College and BYL Nair Hospital, Mumbai (1994)",
      "MS (Ophthalmology), Mumbai (1997)",
      "DNB (1998)",
      "DOMS, Diploma in Ophthalmic Medicine and Surgery (1996)",
      "FCPS, Fellow of the College of Physicians and Surgeons (1997)",
      "International Council of Ophthalmology, Cambridge, UK (1997)",
      "Trained under Prof. H. R. Koch in Bonn, Germany",
      "Assisted Dr. Jack Dodick at the New York Eye and Ear Infirmary",
    ],
    languages: [],
    expertise: [
      "Cataract surgery and premium lens implants",
      "LASIK and femtosecond laser surgery",
      "Cornea and keratoconus",
      "Glaucoma",
      "Corneal biomechanics",
    ],
    treatments: ["cataract-surgery", "lasik", "icl", "keratoconus-treatment", "corneal-transplant", "glaucoma-treatment"],
    profile:
      "A cataract, cornea, glaucoma and refractive surgeon who founded Kenia Eye Hospital more than 28 years ago. He was the youngest ophthalmologist in India to perform customised femtosecond laser LASIK, the first in Maharashtra to introduce the femtosecond laser, and the first in India to implant the Envista and Lucidis Toric lenses. He once operated on 50 patients with only one seeing eye for cataract in a single day. He sits on the executive board of the Bombay Ophthalmologists Association and is a member of ASCRS, ESCRS and AIOS.",
    picture: portrait("vaishal-kenia", "Dr Vaishal Kenia"),
  },
  {
    slug: "pallavi-kenia",
    name: "Dr Pallavi Kenia",
    role: "Managing Director, Kenia Eye Hospital and Kenia Dental Clinic",
    speciality: "dentistry",
    hospital: "kenia-eye",
    otherPractice: "Kenia Dental Clinic, Santacruz (West), Mumbai",
    experience: "28 years",
    qualifications: ["BDS, Nagpur University (1997)"],
    languages: [],
    expertise: [
      "Dental implants",
      "Root canal treatment",
      "Crowns, bridges and restorative dentistry",
      "Smile design and teeth whitening",
      "Mercury-free dentistry",
    ],
    treatments: ["dental-implants", "root-canal-treatment", "smile-design", "full-mouth-rehabilitation"],
    profile:
      "A dentist and the Managing Director of Kenia Eye Hospital. She began at Jain Health Centre, a charitable trust in Dadar, Mumbai, where she treated patients for eight years, and founded Kenia Dental Clinic in Santacruz in 2001 to give modern dental care at a fair cost. The clinic offers implants, root canal treatment, braces and aligners, and cosmetic dentistry under one roof.",
    picture: portrait("pallavi-kenia", "Dr Pallavi Kenia"),
  },
];
