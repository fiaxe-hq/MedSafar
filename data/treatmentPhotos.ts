import type { Picture } from "@/content/types";

/**
 * Photos for treatment and speciality cards, so a patient can recognise
 * what a treatment is about before reading. Stock photos from Unsplash
 * (Unsplash Licence: free for commercial use, no credit needed); the
 * photo page is noted beside each one. They illustrate the kind of
 * treatment only, never a specific hospital, doctor or patient.
 */

const photo = (file: string, alt: string): Picture => ({
  src: `/photos/treatments/${file}.jpg`,
  alt,
  pending: false,
});

const photos = {
  // unsplash.com/photos/kidney-scale-model-in-hand-sRXCFkJahGk
  "kidney": photo("kidney", "A model of a human kidney held in a hand"),
  // unsplash.com/photos/dialysis-machine-in-a-medical-setting-su-Lv2OJuY0
  "dialysis": photo("dialysis", "A dialysis machine beside a hospital bed"),
  // unsplash.com/photos/surgeons-performing-surgery-in-operating-room-KrsoedfRAf4
  "surgery": photo("surgery", "A surgical team operating in a bright operating theatre"),
  // unsplash.com/photos/anatomical-human-heart-model-MEbT27ZrtdE
  "heart": photo("heart", "A model of the human heart"),
  // unsplash.com/photos/surgeons-performing-surgery-in-a-modern-operating-room-vfy71fExF7g
  "heart-surgery": photo("heart-surgery", "Surgeons operating in a modern operating theatre"),
  // unsplash.com/photos/surgeons-in-blue-scrubs-operate-on-a-patient-with-monitors-displaying-medical-data-P9w9U_VyshQ
  "cath-lab": photo("cath-lab", "Doctors in a cardiac catheter lab, watching the heart on screens"),
  // unsplash.com/photos/person-writing-on-white-paper-QsBfOwMoPNY
  "heart-check": photo("heart-check", "A doctor reading a heart tracing (ECG)"),
  // unsplash.com/photos/two-doctors-examining-a-brain-mri-scan-together-AB0r9z7eRYg
  "brain": photo("brain", "Two doctors looking at a brain MRI scan"),
  // unsplash.com/photos/brown-brain-decor-in-selective-focus-photography-3KGF9R_0oHs
  "brain-model": photo("brain-model", "A model of the human brain"),
  // unsplash.com/photos/a-group-of-doctors-performing-surgery-on-a-patient-brbF5FSnSgI
  "neurosurgery": photo("neurosurgery", "Surgeons operating under theatre lights"),
  // unsplash.com/photos/a-man-getting-his-leg-examined-by-a-doctor-pbUWW-CBoqY
  "knee": photo("knee", "A doctor examining a man's knee"),
  // unsplash.com/photos/x-ray-of-a-human-pelvis-and-hips-RQuiTjveVIg
  "hip": photo("hip", "An X-ray of the pelvis and hip joints"),
  // unsplash.com/photos/woman-holding-her-sore-lower-back-bNdiJ1FEbV4
  "back": photo("back", "A woman holding her painful lower back"),
  // unsplash.com/photos/womans-neck-with-highlighted-pain-area-4nubFj6-wAo
  "neck": photo("neck", "A woman's neck with the painful area highlighted"),
  // unsplash.com/photos/x-ray-of-a-human-shoulder-and-upper-arm-cbdRcyFsCwI
  "shoulder": photo("shoulder", "An X-ray of the shoulder and upper arm"),
  // unsplash.com/photos/woman-holding-her-elbow-in-pain-OABoVice0bU
  "elbow": photo("elbow", "A woman holding her painful elbow"),
  // unsplash.com/photos/woman-holding-her-hand-with-pain-S52_QspnHYI
  "hand": photo("hand", "A woman holding her painful hand and wrist"),
  // unsplash.com/photos/young-woman-with-bandaged-ankle-sitting-on-a-bench-6gn17EJNrac
  "ankle": photo("ankle", "A young woman with a bandaged ankle"),
  // unsplash.com/photos/a-woman-getting-a-back-massage-from-a-man-uLWW09LLG04
  "physio": photo("physio", "A physiotherapist treating a patient's back"),
  // unsplash.com/photos/surgeon-in-mask-operating-robotic-surgical-equipment-in-operating-room-L2R8hKBXFak
  "robot": photo("robot", "A surgeon working with a surgical robot"),
  // unsplash.com/photos/a-person-lying-on-a-bed-ibdJjGbrgxI
  "radiation": photo("radiation", "A radiation therapy machine"),
  // unsplash.com/photos/person-lying-on-bed-and-another-person-standing-98__MsKaUsI
  "chemo": photo("chemo", "A patient receiving treatment through a drip"),
  // unsplash.com/photos/blood-bag-in-clinical-setting-0ZZo5o00o80
  "blood": photo("blood", "A blood bag on a drip stand"),
  // unsplash.com/photos/blood-collection-tubes-in-laboratory-rack-0jE8ynV4mis
  "lab": photo("lab", "Blood sample tubes in a laboratory rack"),
  // unsplash.com/photos/a-child-sits-on-a-medical-bed-with-adults-around-fSmq40dt2Ig
  "child": photo("child", "A child on a hospital bed with family and a doctor"),
  // unsplash.com/photos/smiling-woman-standing-near-another-woman-beside-mammogram-machine-0izFVmwJ5pw
  "breast": photo("breast", "A woman having a mammogram with a radiographer"),
  // unsplash.com/photos/woman-holds-pink-ribbon-for-breast-cancer-awareness-fs3nkKgQ69c
  "ribbon": photo("ribbon", "A woman holding a pink breast cancer ribbon"),
  // unsplash.com/photos/chest-x-ray-of-rib-cage-tHS9j3HWT1s
  "lung": photo("lung", "A chest X-ray showing the lungs"),
  // unsplash.com/photos/doctor-talking-to-patient-in-an-office-IDM3n0LfNCY
  "urology": photo("urology", "A doctor talking with a male patient"),
  // unsplash.com/photos/abdomen-treatment-with-a-device-and-cream-FIkfmwPTKqM
  "ultrasound": photo("ultrasound", "An ultrasound scan of the belly"),
  // unsplash.com/photos/a-woman-sitting-at-a-desk-with-a-model-of-a-stomach-l9gmNv3q7Z4
  "gyn": photo("gyn", "A gynaecologist explaining with a model of the womb"),
  // unsplash.com/photos/person-standing-on-white-digital-bathroom-scale-5jctAMjz21A
  "weight": photo("weight", "A person standing on a bathroom scale"),
  // unsplash.com/photos/person-holding-medical-endoscope-in-surgery-82GMjgM7qjA
  "endoscopy": photo("endoscopy", "A doctor holding an endoscope beside a screen"),
  // unsplash.com/photos/surgeons-performing-procedure-in-operating-room-E285pJbC4uE
  "keyhole": photo("keyhole", "Two surgeons performing keyhole surgery"),
  // unsplash.com/photos/sick-man-blowing-nose-into-tissue--CDN2nTKfrA
  "sinus": photo("sinus", "A man with a blocked nose and sinus pain"),
  // unsplash.com/photos/womans-face-tSX6E9UextA
  "nose": photo("nose", "A woman's face in profile"),
  // unsplash.com/photos/dental-exam-with-mirror-and-tool-8BkF0sTC6Uo
  "mouth": photo("mouth", "A doctor examining inside a patient's mouth"),
  // unsplash.com/photos/dentist-examining-teeth-in-dental-office-BiknMFl7iOw
  "dentist": photo("dentist", "A dentist examining a man's teeth"),
  // unsplash.com/photos/a-close-up-of-a-person-looking-through-a-magnifying-glass-PNdOpC-6q-I
  "skin": photo("skin", "A doctor checking skin through a magnifier"),
  // unsplash.com/photos/a-woman-getting-a-facial-peel-from-a-doctor-HtXyytr9304
  "face": photo("face", "A doctor treating a woman's face"),
  // unsplash.com/photos/patient-looking-through-an-eye-examination-machine-Y0D5L-qKUcw
  "eye": photo("eye", "A patient having an eye examination"),
  // unsplash.com/photos/man-points-to-an-eye-chart-during-an-exam-QSqphOrPako
  "eye-chart": photo("eye-chart", "An eye test with a letter chart"),
  // unsplash.com/photos/blue-eye-photo-QRawWgV6gmo
  "eye-close": photo("eye-close", "A close-up of a human eye"),
  // unsplash.com/photos/dental-implant-model-in-jaw-iW6UZIPTFxU
  "implant": photo("implant", "A model of a dental implant in the jaw"),
  // unsplash.com/photos/a-close-up-of-a-tooth-with-braces-on-it-P8ernb_Ht-M
  "braces": photo("braces", "Teeth with braces"),
  // unsplash.com/photos/a-close-up-of-a-womans-mouth-with-white-teeth-glPVwPr1FKo
  "smile": photo("smile", "A smile with white, even teeth"),
  // unsplash.com/photos/a-hand-holding-a-tool-near-a-teddy-bears-ear-nlj0xvTlk0s
  "ear": photo("ear", "An ear being examined with an otoscope"),
  // unsplash.com/photos/a-man-is-combing-his-hair-with-his-hands-FGqEuM0wuKk
  "hair": photo("hair", "A man running his hands through thinning hair"),
  // unsplash.com/photos/a-close-up-of-a-persons-abdomen-m5NOVgX_hqQ
  "body": photo("body", "A close-up of a person's belly"),
  // unsplash.com/photos/surgeons-operating-with-a-microscope-XHQOoJ-4-eI
  "microsurgery": photo("microsurgery", "Surgeons operating with a microscope"),
  // unsplash.com/photos/a-person-blood-glucose-testing-using-gluco-meter-SBtNby0IiG0
  "diabetes": photo("diabetes", "A blood sugar test with a glucose meter"),
  // unsplash.com/photos/a-man-in-scrubs-and-a-stethoscope-looking-at-a-monitor-0Fv4M2hSZJU
  "icu": photo("icu", "A doctor watching a patient monitor in intensive care"),
  // unsplash.com/photos/doctor-talking-to-hospital-patient-gO-iULv-qbU
  "bedside": photo("bedside", "A doctor talking with a patient in a hospital bed"),
  // unsplash.com/photos/pregnant-woman-cradling-her-belly-ux53SGpRAHU
  "pregnancy": photo("pregnancy", "A pregnant woman holding her belly"),
  // unsplash.com/photos/a-person-holding-their-stomach-in-pain-_cJT-w00-VE
  "liver": photo("liver", "A person holding the upper right of their belly"),
  // unsplash.com/photos/a-man-holding-his-stomach-with-his-hands-J6g_szOtMF4
  "stomach": photo("stomach", "A man holding his painful stomach"),
  // unsplash.com/photos/technician-positions-patient-in-ct-scanner-8HkEfVdZdbA
  "scan": photo("scan", "A patient going into a CT scanner"),
  // unsplash.com/photos/doctor-examining-mri-scans-on-a-tablet-screen-Wz4Mx3JbnzE
  "mri": photo("mri", "A doctor looking at scans on a tablet"),
  // unsplash.com/photos/microscope-with-petri-dish-in-laboratory-bcqDxjddPGk
  "ivf": photo("ivf", "An embryologist placing a dish under a microscope"),
  // unsplash.com/photos/hands-using-tweezers-with-petri-dish-OYlhHhzksuk
  "icsi": photo("icsi", "Delicate work on a dish in a fertility laboratory"),
  // unsplash.com/photos/doctor-talking-to-patient-in-clinic-tl447mekwuQ
  "consult": photo("consult", "A doctor talking with a patient in a clinic"),
  // unsplash.com/photos/close-up-of-elderly-hands-clasped-together-EljMmcGmeGA
  "elderly-hands": photo("elderly-hands", "An older person's hands clasped together"),
  // unsplash.com/photos/a-woman-sitting-on-a-bed-with-her-legs-crossed-dzhlKUgyI3M
  "legs": photo("legs", "A woman's legs"),
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
