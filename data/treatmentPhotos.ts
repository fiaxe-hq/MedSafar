import type { Picture } from "@/content/types";

/**
 * Photos for treatment and speciality cards, so a patient can recognise
 * what a treatment is about before reading. Stock photos from Unsplash
 * (Unsplash Licence: free for commercial use, no credit needed), chosen
 * to be bright and plain, with the treatment clear at a glance. They illustrate the kind of
 * treatment only, never a specific hospital, doctor or patient.
 */

const photo = (file: string, alt: string): Picture => ({
  src: `/photos/care/${file}.jpg`,
  alt,
  pending: false,
});

const photos = {
  // unsplash.com/photos/kidney-scale-model-in-hand-sRXCFkJahGk
  "kidney": photo("kidney", "A model of a human kidney held in a hand"),
  // unsplash.com/photos/a-man-laying-in-a-hospital-bed-next-to-a-monitor-ZjVb97Pq0Ls
  "dialysis": photo("dialysis", "A patient resting in bed beside a monitor"),
  // unsplash.com/photos/surgeons-perform-operation-under-bright-lights-_Ja9A239xTo
  "surgery": photo("surgery", "Surgeons operating under bright theatre lights"),
  // unsplash.com/photos/doctor-checks-patients-blood-pressure-with-stethoscope-NDOYHZ_98Rw
  "heart": photo("heart", "A doctor listening to a patient's heart and checking blood pressure"),
  // unsplash.com/photos/surgeons-performing-procedure-in-operating-room--f5lWIvMkHQ
  "heart-surgery": photo("heart-surgery", "A heart surgery team at work in the operating theatre"),
  // unsplash.com/photos/surgeons-in-blue-scrubs-operate-on-a-patient-with-monitors-displaying-medical-data-P9w9U_VyshQ
  "cath-lab": photo("cath-lab", "Doctors in a cardiac catheter lab, watching the heart on screens"),
  // unsplash.com/photos/man-in-white-button-up-shirt-fQDn3X4BAl0
  "heart-check": photo("heart-check", "A doctor placing heart tracing (ECG) pads on a patient's chest"),
  // unsplash.com/photos/doctor-shows-patient-brain-scans-on-tablet-X_tBkG0U9yM
  "brain": photo("brain", "A doctor showing a patient brain scans on a tablet"),
  // unsplash.com/photos/doctor-shows-patient-brain-scans-on-tablet-X_tBkG0U9yM
  "brain-model": photo("brain-model", "A doctor showing a patient brain scans on a tablet"),
  // unsplash.com/photos/surgeons-operating-with-a-microscope-XHQOoJ-4-eI
  "neurosurgery": photo("neurosurgery", "Surgeons operating with a microscope"),
  // unsplash.com/photos/a-man-getting-his-leg-examined-by-a-doctor-pbUWW-CBoqY
  "knee": photo("knee", "A doctor examining a man's knee"),
  // unsplash.com/photos/doctor-shows-x-ray-scan-to-an-elderly-patient-Tn0fjekZemA
  "hip": photo("hip", "A doctor explaining an X-ray to an older patient"),
  // unsplash.com/photos/woman-holding-her-sore-lower-back-bNdiJ1FEbV4
  "back": photo("back", "A woman holding her painful lower back"),
  // unsplash.com/photos/a-woman-getting-her-hair-done-by-a-man-sBc5xhVbHXA
  "neck": photo("neck", "A nurse examining a patient's neck and shoulder"),
  // unsplash.com/photos/man-wearing-white-polo-shirt-qIR77o5woJ8
  "shoulder": photo("shoulder", "A doctor examining a patient's shoulder"),
  // unsplash.com/photos/person-in-white-coat-holding-silver-and-blue-ring-CfdzNybONzc
  "elbow": photo("elbow", "A doctor examining a patient's arm"),
  // unsplash.com/photos/person-in-white-coat-holding-silver-and-blue-ring-CfdzNybONzc
  "hand": photo("hand", "A doctor examining a patient's wrist"),
  // unsplash.com/photos/a-healthcare-worker-examines-a-patients-feet-w0MNOldQXjo
  "ankle": photo("ankle", "A clinician examining a patient's feet and ankles"),
  // unsplash.com/photos/a-woman-getting-a-back-massage-from-a-man-uLWW09LLG04
  "physio": photo("physio", "A physiotherapist treating a patient's back"),
  // unsplash.com/photos/surgeons-operate-while-viewing-the-procedure-on-a-large-screen-7Vh3sDKvb64
  "robot": photo("robot", "Surgeons working with a robotic system, watching a large screen"),
  // unsplash.com/photos/patient-undergoing-radiation-therapy-with-custom-mask-UkUz15Rzkic
  "radiation": photo("radiation", "A patient lying still for radiation therapy, wearing a fitted mask"),
  // unsplash.com/photos/a-woman-laying-in-a-hospital-bed-with-an-iv-in-her-hand-GwgFPDXiSIs
  "chemo": photo("chemo", "A patient in bed receiving treatment through a drip"),
  // unsplash.com/photos/healthcare-worker-drawing-blood-2rNHliX6XHk
  "blood": photo("blood", "A nurse taking a blood sample"),
  // unsplash.com/photos/scientist-using-laptop-in-laboratory-8yS04veb1TQ
  "lab": photo("lab", "A scientist working in a bright laboratory"),
  // unsplash.com/photos/a-young-child-is-being-examined-by-a-doctor-fx9RJgZYRUE
  "child": photo("child", "A doctor examining a baby on its mother's lap"),
  // unsplash.com/photos/smiling-woman-standing-near-another-woman-beside-mammogram-machine-0izFVmwJ5pw
  "breast": photo("breast", "A woman having a mammogram with a radiographer"),
  // unsplash.com/photos/woman-holds-pink-ribbon-for-breast-cancer-awareness-c8H6ZIDqgE8
  "ribbon": photo("ribbon", "A woman holding a pink breast cancer ribbon"),
  // unsplash.com/photos/doctor-examines-childs-chest-with-stethoscope-oCqGFVUpgm4
  "lung": photo("lung", "A doctor listening to a patient's chest with a stethoscope"),
  // unsplash.com/photos/doctor-consulting-with-an-elderly-patient-in-an-office-Ey-IxmbZ5TQ
  "urology": photo("urology", "A doctor talking with an older man in a clinic"),
  // unsplash.com/photos/abdomen-treatment-with-a-device-and-cream-FIkfmwPTKqM
  "ultrasound": photo("ultrasound", "An ultrasound scan of the belly"),
  // unsplash.com/photos/a-woman-sitting-at-a-table-with-a-model-of-a-stomach-7tpjP8daPMc
  "gyn": photo("gyn", "A gynaecologist explaining with a model of the womb"),
  // unsplash.com/photos/woman-measuring-her-waist-with-a-tape-measure-Q1ZSEibNTJs
  "weight": photo("weight", "A woman measuring her waist with a tape measure"),
  // unsplash.com/photos/person-holding-medical-endoscope-in-surgery-82GMjgM7qjA
  "endoscopy": photo("endoscopy", "A doctor holding an endoscope beside a screen"),
  // unsplash.com/photos/surgeons-performing-surgery-in-a-modern-operating-room-vfy71fExF7g
  "keyhole": photo("keyhole", "A surgical team in a bright, modern operating theatre"),
  // unsplash.com/photos/doctor-suctioning-on-mans-nose-4tQoqoY7iYA
  "sinus": photo("sinus", "A man with a blocked nose and sinus pain"),
  // unsplash.com/photos/doctor-suctioning-on-mans-nose-4tQoqoY7iYA
  "nose": photo("nose", "A doctor examining a man's nose"),
  // unsplash.com/photos/dentist-examining-teeth-in-dental-office-BiknMFl7iOw
  "mouth": photo("mouth", "A dentist examining a man's mouth"),
  // unsplash.com/photos/dentist-examining-teeth-in-dental-office-BiknMFl7iOw
  "dentist": photo("dentist", "A dentist examining a man's teeth"),
  // unsplash.com/photos/a-close-up-of-a-person-looking-through-a-magnifying-glass-PNdOpC-6q-I
  "skin": photo("skin", "A doctor checking skin through a magnifier"),
  // unsplash.com/photos/woman-with-teal-hospital-head-gown-rYardnw9lno
  "face": photo("face", "A woman with clear, smooth skin, eyes closed, ready for treatment"),
  // unsplash.com/photos/an-optometrist-examines-a-patients-eyes-with-a-phoropter-OmCH8sh_UcM
  "eye": photo("eye", "An optometrist checking a patient's eyes"),
  // unsplash.com/photos/man-points-to-an-eye-chart-during-an-exam-QSqphOrPako
  "eye-chart": photo("eye-chart", "An eye test with a letter chart"),
  // unsplash.com/photos/person-showing-green-and-black-eyelid-closeup-photography-7H41oiADqqg
  "eye-close": photo("eye-close", "A close-up of a healthy eye"),
  // unsplash.com/photos/a-woman-getting-her-teeth-checked-by-a-dentist-z8BIWPwV3zo
  "implant": photo("implant", "A dentist treating a patient in a modern clinic"),
  // unsplash.com/photos/close-up-of-a-persons-mouth-YKqYvUYzw0w
  "braces": photo("braces", "A smile with braces"),
  // unsplash.com/photos/close-up-of-a-womans-smiling-mouth-with-red-lipstick-KzmhiJJ041M
  "smile": photo("smile", "A bright, even smile"),
  // unsplash.com/photos/a-woman-talking-on-a-cell-phone-next-to-a-man-SgHwUZPqgPQ
  "ear": photo("ear", "A doctor looking into a woman's ear"),
  // unsplash.com/photos/man-holding-his-black-hair-Q--oPI42ArQ
  "hair": photo("hair", "A man touching his thinning hair"),
  // unsplash.com/photos/woman-measuring-her-chest-with-a-tape-measure-T7HwkGByU6k
  "body": photo("body", "A woman measuring her body with a tape measure"),
  // unsplash.com/photos/surgeons-operating-with-microscope-in-sterile-environment-y4xSoEMczrI
  "microsurgery": photo("microsurgery", "Surgeons operating with a microscope"),
  // unsplash.com/photos/a-person-blood-glucose-testing-using-gluco-meter-SBtNby0IiG0
  "diabetes": photo("diabetes", "A blood sugar test with a glucose meter"),
  // unsplash.com/photos/doctor-talking-to-hospital-patient-DK--4VWK1tw
  "icu": photo("icu", "A doctor talking with a patient in a hospital bed"),
  // unsplash.com/photos/doctor-talking-to-hospital-patient-gO-iULv-qbU
  "bedside": photo("bedside", "A doctor talking with a patient in a hospital bed"),
  // unsplash.com/photos/a-doctor-talking-to-a-pregnant-woman-in-a-waiting-room-c8fnD1rKGCk
  "pregnancy": photo("pregnancy", "A doctor talking with a pregnant woman"),
  // unsplash.com/photos/abdomen-treatment-with-a-device-and-cream-FIkfmwPTKqM
  "liver": photo("liver", "An ultrasound scan of the belly"),
  // unsplash.com/photos/a-man-holding-his-stomach-with-his-hands-J6g_szOtMF4
  "stomach": photo("stomach", "A person holding their painful stomach"),
  // unsplash.com/photos/medical-radiation-therapy-machine-in-clinic-QTP8UKW_PgI
  "scan": photo("scan", "A modern CT scanner in a bright room"),
  // unsplash.com/photos/doctor-shows-patient-brain-scans-on-tablet-X_tBkG0U9yM
  "mri": photo("mri", "A doctor showing a patient scans on a tablet"),
  // unsplash.com/photos/a-woman-holding-up-an-x-ray-of-her-stomach-fXSJIpKQ0sI
  "ivf": photo("ivf", "Hands holding a baby's ultrasound picture"),
  // unsplash.com/photos/hands-using-tweezers-with-petri-dish-OYlhHhzksuk
  "icsi": photo("icsi", "Delicate work on a dish in a fertility laboratory"),
  // unsplash.com/photos/doctor-talking-to-patient-in-an-office-IDM3n0LfNCY
  "consult": photo("consult", "A doctor talking with a patient in a clinic"),
  // unsplash.com/photos/doctor-consults-with-an-elderly-patient-on-a-couch-7M5YI0RM3uA
  "elderly-hands": photo("elderly-hands", "A doctor talking with an older man"),
  // unsplash.com/photos/a-nurse-is-performing-physical-therapy-f7EQyJe2Tr8
  "legs": photo("legs", "A clinician examining a patient's legs"),
};

type Topic = keyof typeof photos;

const byTreatment: Record<string, Topic> = {
  "kidney-transplant": "kidney",
  "dialysis": "dialysis",
  "liver-transplant": "liver",
  "pancreas-transplant": "diabetes",
  "intestine-transplant": "stomach",
  "hand-transplant": "microsurgery",
  "bone-marrow-transplant": "blood",
  "car-t-cell-therapy": "lab",
  "childhood-cancer-treatment": "child",
  "chemotherapy": "chemo",
  "targeted-therapy-immunotherapy": "lab",
  "radiation-therapy": "radiation",
  "cancer-surgery": "surgery",
  "head-neck-cancer-surgery": "mouth",
  "thyroid-surgery": "neck",
  "breast-cancer-surgery": "ribbon",
  "hpb-cancer-surgery": "liver",
  "gi-cancer-surgery": "stomach",
  "hipec": "surgery",
  "urologic-cancer-surgery": "urology",
  "gynaecologic-cancer-surgery": "gyn",
  "bone-cancer-surgery": "legs",
  "liver-tumour-embolisation": "cath-lab",
  "tumour-ablation": "scan",
  "brain-tumour-surgery": "brain",
  "deep-brain-stimulation": "elderly-hands",
  "spinal-fusion": "back",
  "acdf": "neck",
  "cervical-disc-replacement": "neck",
  "microdiscectomy": "back",
  "endoscopic-spine-surgery": "back",
  "scoliosis-surgery": "back",
  "gastric-sleeve": "weight",
  "gastric-bypass": "weight",
  "ivf": "ivf",
  "icsi": "icsi",
  "knee-replacement": "knee",
  "hip-replacement": "hip",
  "acl-reconstruction": "knee",
  "heart-bypass-surgery": "heart-surgery",
  "minimally-invasive-heart-surgery": "heart-surgery",
  "heart-valve-replacement": "heart",
  "angioplasty": "cath-lab",
  "ecmo": "icu",
  "heart-diabetes-care": "diabetes",
  "varicose-veins": "legs",
  "peripheral-artery-disease": "legs",
  "hand-surgery": "hand",
  "brachial-plexus-surgery": "microsurgery",
  "reconstructive-microsurgery": "microsurgery",
  "lymphoedema-surgery": "microsurgery",
  "childrens-plastic-surgery": "child",
  "rhinoplasty": "nose",
  "liposuction": "body",
  "hair-transplant": "hair",
  "cataract-surgery": "eye-close",
  "lasik": "eye-chart",
  "icl": "eye-chart",
  "keratoconus-treatment": "eye",
  "corneal-transplant": "eye-close",
  "glaucoma-treatment": "eye",
  "vitreoretinal-surgery": "eye",
  "squint-surgery": "eye-chart",
  "oculoplastic-surgery": "eye-close",
  "dental-implants": "implant",
  "root-canal-treatment": "dentist",
  "smile-design": "smile",
  "full-mouth-rehabilitation": "dentist",
  "braces-aligners": "braces",
  "heart-transplant": "heart",
  "robotic-cancer-surgery": "robot",
  "robotic-prostatectomy": "robot",
  "radical-nephrectomy": "kidney",
  "partial-nephrectomy": "kidney",
  "cystectomy": "urology",
  "orchiectomy": "urology",
  "lumpectomy": "breast",
  "mastectomy": "ribbon",
  "hemicolectomy": "stomach",
  "hepatectomy": "liver",
  "whipple-surgery": "scan",
  "pancreatectomy": "scan",
  "laryngectomy": "neck",
  "neck-dissection": "neck",
  "glossectomy": "mouth",
  "maxillectomy": "mouth",
  "mandibulectomy": "mouth",
  "lymph-node-removal": "surgery",
  "omentectomy": "surgery",
  "radical-hysterectomy": "gyn",
  "mohs-surgery": "skin",
  "adjuvant-neoadjuvant-chemotherapy": "chemo",
  "hormone-therapy": "consult",
  "photodynamic-therapy": "skin",
  "brachytherapy": "radiation",
  "stereotactic-radiosurgery": "radiation",
  "tomotherapy": "radiation",
  "radiation-therapy-brain-tumour": "brain",
  "radiation-therapy-breast-cancer": "breast",
  "radiation-therapy-lung-cancer": "lung",
  "radiation-therapy-prostate-cancer": "radiation",
  "allogeneic-transplant": "blood",
  "autologous-transplant": "blood",
  "plasmapheresis": "lab",
  "epilepsy-surgery": "brain",
  "aneurysm-treatment": "mri",
  "stroke-treatment": "bedside",
  "cranioplasty": "brain-model",
  "neuro-endoscopy": "neurosurgery",
  "robotic-joint-replacement": "robot",
  "partial-knee-replacement": "knee",
  "shoulder-replacement": "shoulder",
  "elbow-replacement": "elbow",
  "knee-arthroscopy": "knee",
  "meniscus-repair": "knee",
  "shoulder-arthroscopy": "shoulder",
  "elbow-arthroscopy": "elbow",
  "wrist-arthroscopy": "hand",
  "wrist-surgery": "hand",
  "hip-arthroscopy": "hip",
  "ankle-arthroscopy": "ankle",
  "cartilage-surgery": "knee",
  "physiotherapy": "physio",
  "paediatric-heart-surgery": "child",
  "icd-implantation": "heart-check",
  "arrhythmia-ablation": "heart-check",
  "heart-tumour-treatment": "heart",
  "gastric-balloon": "weight",
  "gallbladder-surgery": "keyhole",
  "hernia-surgery": "stomach",
  "appendectomy": "keyhole",
  "robotic-surgery": "robot",
  "hepatobiliary-surgery": "liver",
  "endoscopy": "endoscopy",
  "ercp-eus": "endoscopy",
  "fatty-liver-treatment": "liver",
  "liver-cirrhosis-treatment": "liver",
  "kidney-stone-treatment": "ultrasound",
  "robotic-urology-surgery": "robot",
  "circumcision": "urology",
  "hysterectomy": "gyn",
  "ovarian-cystectomy": "gyn",
  "salpingo-oophorectomy": "gyn",
  "robotic-gynaecology-surgery": "robot",
  "sinus-surgery": "sinus",
  "robotic-thyroidectomy": "neck",
  "breast-reconstruction": "ribbon",
  "body-contouring": "body",
  "facial-plastic-surgery": "face",
  "gender-affirming-surgery": "consult",
  "male-genital-aesthetic-surgery": "urology",
  "regenerative-plastic-surgery": "face",
  "reconstructive-surgery": "microsurgery",
  "oral-maxillofacial-surgery": "dentist",
  "back-pain-management": "back",
  "spinal-cord-stimulation": "back",
  "spinal-tumour-trauma-surgery": "back",
  "hydrocephalus-treatment": "brain-model",
  "botulinum-toxin-injections": "brain",
  "foot-ankle-surgery": "ankle",
  "diabetic-foot-care": "diabetes",
  "limb-lengthening": "legs",
  "tendon-repair": "hand",
  "revision-joint-replacement": "knee",
  "fracture-surgery": "hip",
  "nerve-decompression": "hand",
  "tavi": "cath-lab",
  "balloon-valvuloplasty": "cath-lab",
  "vascular-surgery": "legs",
  "lung-surgery": "lung",
  "lung-transplant": "lung",
  "poem": "endoscopy",
  "capsule-endoscopy": "endoscopy",
  "endoscopic-sleeve-gastroplasty": "weight",
  "splenectomy": "keyhole",
  "paediatric-surgery": "child",
  "myomectomy": "gyn",
  "hysteroscopy": "gyn",
  "prolapse-repair": "gyn",
  "vaginal-reconstruction": "gyn",
  "high-risk-pregnancy-care": "pregnancy",
  "vulvar-cancer-surgery": "gyn",
  "reconstructive-urology": "urology",
  "urinary-incontinence-surgery": "urology",
  "paediatric-urology": "child",
  "burn-reconstruction": "microsurgery",
  "facial-palsy-reconstruction": "face",
  "skin-laser-treatments": "skin",
};

const bySpeciality: Record<string, Topic> = {
  "organ-transplant": "kidney",
  "oncology": "radiation",
  "haematology-bmt": "blood",
  "neurology-neurosurgery": "brain",
  "bariatric-surgery": "weight",
  "fertility-ivf": "pregnancy",
  "orthopaedics": "knee",
  "cardiology": "heart",
  "general-surgery": "keyhole",
  "gastroenterology": "endoscopy",
  "urology": "ultrasound",
  "gynaecology": "gyn",
  "ent": "ear",
  "cosmetic-plastic-surgery": "face",
  "ophthalmology": "eye",
  "dentistry": "dentist",
};

/** The photo for a treatment, falling back to its speciality's. */
export function treatmentPhoto(slug: string, speciality: string): Picture | undefined {
  const topic = byTreatment[slug] ?? bySpeciality[speciality];
  return topic ? photos[topic] : undefined;
}

export function specialityPhoto(slug: string): Picture | undefined {
  const topic = bySpeciality[slug];
  return topic ? photos[topic] : undefined;
}
