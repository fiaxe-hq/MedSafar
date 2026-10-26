import type { Faq, Treatment } from "@/content/types";

/**
 * Placeholder records. The admin panel manages these later.
 * Read them through lib/catalog.ts, never directly.
 *
 * The list follows what the partner doctors actually do: each treatment is
 * either named on a doctor's profile card (docs/client-content/) or is one of
 * the common treatments the client leads with. Every text is a plain-English
 * draft written from those profiles and general medical knowledge, and stays
 * marked as a draft until a doctor has checked it. Nothing here is medical
 * advice, a promise of an outcome or a price.
 *
 * Slugs are referenced from data/hospitals.ts, data/doctors.ts,
 * data/posts.ts and data/bodyMap.ts; change them there too.
 *
 * A stay given with `atNanavati` comes from the package sheet Nanavati Max
 * Super Speciality Hospital supplied. The sheet's prices are not used: every
 * patient gets an individual quote. Other stays are typical ranges.
 */

const atNanavati = (days: string) =>
  `${days} at Nanavati Max Super Speciality Hospital. Your hospital confirms it for your case.`;

const usually = (text: string) => `${text}. Your hospital confirms it for your case.`;

type Text = Pick<Treatment, "what" | "who" | "stay" | "recovery" | "faq">;

/** Every record stays pending until a doctor has checked it; pages then add catalog.draft after the summary. */
function treatment(slug: string, name: string, speciality: string, summary: string, text: Text): Treatment {
  return { slug, name, speciality, summary, pending: true, ...text };
}

const q = (question: string, answer: string): Faq => ({ question, answer });

export const treatments: Treatment[] = [
  // Organ transplant
  treatment(
    "kidney-transplant",
    "Kidney transplant",
    "organ-transplant",
    "An operation that places a healthy kidney from a donor into a person whose own kidneys have stopped working.",
    {
      what: "A healthy kidney from a donor is placed in the lower belly and joined to the blood vessels and the bladder. The person's own kidneys are usually left where they are. The donor is most often a living family member; where the blood groups do not match, a swap (paired) transplant with another family can sometimes make it possible. Afterwards the patient takes medicines every day so the body does not reject the new kidney.",
      who: "People whose kidneys have failed (end-stage kidney disease), whether or not they have started dialysis, who are fit enough for an operation and have a suitable donor.",
      stay: atNanavati("About 8 days: 3 in intensive care and 5 on the ward"),
      recovery: "Most people return to light daily life in 4 to 6 weeks. Plan to stay in India for about 4 to 6 weeks after the operation for close checks and blood tests.",
      faq: [
        q(
          "Can a family member from my country be the donor?",
          "Yes. Indian law allows living donation by close relatives, and the hospital's authorisation committee reviews every donor's documents before the transplant. We help you prepare these papers before you travel.",
        ),
        q(
          "What if my donor's blood group does not match?",
          "A swap (paired) transplant with another family, or a transplant across blood groups with extra treatment beforehand, may be possible. The transplant team decides after testing.",
        ),
      ],
    },
  ),
  treatment(
    "dialysis",
    "Dialysis (haemodialysis and haemodiafiltration)",
    "organ-transplant",
    "A machine cleans the blood when the kidneys can no longer do it, usually in sessions of about four hours, three times a week.",
    {
      what: "Blood is passed through a filter outside the body that removes waste and extra fluid, then returned. Haemodiafiltration is a more thorough form of the same treatment. Sessions can also be done overnight (nocturnal dialysis) for some patients.",
      who: "People whose kidneys have failed, including those waiting for a transplant, and patients already on dialysis who need it while they are in India for treatment.",
      stay: "Usually done as a day patient: you come in for each session and go home the same day.",
      recovery: "Most people feel tired for a few hours after a session. Dialysis continues for as long as the kidneys do not work, or until a transplant.",
      faq: [
        q(
          "I am already on dialysis. Can I continue it in India?",
          "Yes. Send us your current dialysis details and we book your sessions at the hospital for the whole of your stay.",
        ),
        q(
          "Does dialysis replace a transplant?",
          "No. Dialysis does part of the kidneys' work. A transplant, where suitable, usually gives a better quality of life. The nephrologist advises which suits you.",
        ),
      ],
    },
  ),
  treatment(
    "liver-transplant",
    "Liver transplant",
    "organ-transplant",
    "An operation that replaces a failing liver with all or part of a healthy liver from a donor.",
    {
      what: "The diseased liver is removed and replaced with a healthy one. In a living donor transplant, a family member gives part of their liver; both parts grow back to near full size within weeks. In a deceased donor transplant, a whole liver is used.",
      who: "People with liver failure from cirrhosis, hepatitis, alcohol or fatty liver disease, some liver cancers, or some rare inherited conditions, in adults and in children.",
      stay: atNanavati("About 21 days"),
      recovery: "Plan to stay in India for about 2 to 3 months in total. Most people return to normal daily life within 3 to 6 months, and take anti-rejection medicines for life.",
      faq: [
        q(
          "How long does the living donor stay in hospital?",
          "Usually about 7 to 10 days, and most donors return to normal life within 6 to 8 weeks.",
        ),
        q(
          "What tests are needed before we travel?",
          "Send us recent reports, scans and blood tests for the patient, and the blood group of possible donors. The transplant team tells you what else is needed.",
        ),
      ],
    },
  ),
  treatment(
    "pancreas-transplant",
    "Pancreas transplant",
    "organ-transplant",
    "An operation that places a healthy pancreas from a donor into a person with diabetes, so their body makes its own insulin again. It is often done together with a kidney transplant.",
    {
      what: "A pancreas from a deceased donor is placed in the lower belly and joined to the blood vessels and the bowel or bladder. The person's own pancreas stays in place. When the new pancreas works, insulin injections are no longer needed. It is often done at the same time as a kidney transplant.",
      // Indications and figures supplied by the client.
      who: "Mainly people with type 1 diabetes: those who no longer feel the warning signs of a dangerously low blood sugar (hypoglycaemia unawareness), those who develop kidney, nerve or eye damage despite insulin, and those who also have chronic kidney disease. Some people with type 2 diabetes are also suitable. Diabetes with kidney disease is serious: the risk of death is about twice that of kidney disease alone, average survival is about 4 to 5 years, and around 16 years of life are lost.",
      stay: usually("Usually about 2 to 3 weeks in hospital, longer when done with a kidney transplant"),
      recovery: "Plan to stay in India for about 2 to 3 months. Anti-rejection medicines are taken for life.",
      faq: [
        q(
          "Is there a waiting time?",
          "Yes. The pancreas comes from a deceased donor, so there is a waiting list. The team explains how it works for international patients.",
        ),
        q(
          "Will I still need insulin?",
          "If the new pancreas works well, no. Your doctors check your blood sugar closely in the first weeks.",
        ),
      ],
    },
  ),
  treatment(
    "intestine-transplant",
    "Intestine transplant",
    "organ-transplant",
    "An operation that replaces a small intestine that has failed or been lost with a healthy intestine from a donor.",
    {
      what: "A small intestine from a donor is joined to the patient's blood vessels and bowel, so they can absorb food again and stop drip feeding. It is one of the most complex transplants and needs long, close follow-up.",
      // Indications supplied by the client.
      who: "In children, intestinal failure after necrotising enterocolitis (NEC), gastroschisis or a motility disorder. In adults, loss of the intestine from mesenteric ischaemia (a blocked blood supply), midgut volvulus (a twisted gut) or tumours of the mesentery.",
      stay: usually("Usually 4 to 8 weeks in hospital"),
      recovery: "Plan to stay in India for about 3 months or more. Eating is brought back slowly, and anti-rejection medicines are taken for life.",
      faq: [
        q(
          "Who is it for if I am fed through a drip at home?",
          "People who depend on drip feeding (parenteral nutrition) and develop problems with it, such as liver damage or repeated line infections, are usually assessed for a transplant.",
        ),
        q(
          "Can children have it?",
          "Yes. Many intestine transplants are done in children. The team assesses each child separately.",
        ),
      ],
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
      stay: usually("Usually about 3 to 4 weeks in hospital"),
      recovery: "Plan to stay in India for about 3 to 6 months for daily hand therapy. Movement and feeling keep improving for one to two years as the nerves grow.",
      faq: [
        q(
          "How soon can I use the new hand?",
          "Simple movements usually start within weeks. Feeling and finer control come back slowly over months, with daily therapy.",
        ),
        q(
          "Will I need medicines for life?",
          "Yes. Like any transplant, it needs anti-rejection medicines every day, and regular checks.",
        ),
      ],
    },
  ),

  // Haematology and bone marrow transplant
  treatment(
    "bone-marrow-transplant",
    "Bone marrow transplant (stem cell transplant)",
    "haematology-bmt",
    "A treatment that replaces damaged or diseased bone marrow with healthy blood-forming stem cells, used for some blood cancers and blood disorders.",
    {
      what: "First, strong chemotherapy, sometimes with radiation, clears the diseased marrow. Then healthy stem cells are given through a drip, much like a blood transfusion, and settle in the bones to make new blood. The cells come from the patient (autologous), from a matched donor (allogeneic), or from a half-matched family member (haploidentical), which means most patients can find a donor.",
      who: "People with some blood cancers, such as leukaemia, lymphoma and myeloma, and some blood disorders, such as thalassaemia, sickle cell disease and aplastic anaemia, in adults and in children.",
      stay: atNanavati("About 30 days"),
      recovery: "Plan to stay in India for about 2 to 3 months after the transplant for close follow-up. The immune system takes 6 to 12 months to recover fully.",
      faq: [
        q(
          "Who can be my donor?",
          "A brother or sister is checked first. If none is a full match, a half-matched parent, child or sibling can often donate. Testing is done before you travel or soon after you arrive.",
        ),
        q(
          "Does the donor need surgery?",
          "Usually not. Most stem cells today are collected from the donor's blood through a drip, over a few hours.",
        ),
      ],
    },
  ),
  treatment(
    "car-t-cell-therapy",
    "CAR-T cell therapy",
    "haematology-bmt",
    "The patient's own immune cells are collected, changed in a laboratory to recognise their cancer, and given back by drip. Used for some leukaemias, lymphomas and myeloma.",
    {
      what: "White blood cells called T cells are collected from the patient's blood. In a laboratory they are given a new receptor (CAR) that helps them find and attack the cancer. After a short course of chemotherapy, the cells are given back through a drip, where they multiply and fight the cancer.",
      who: "Adults and some children with certain leukaemias, lymphomas or multiple myeloma that have come back or not responded to other treatment.",
      stay: usually("Usually about 2 weeks in hospital after the cells are given"),
      recovery: "Plan to stay near the hospital for about 4 weeks after the infusion, as side effects such as fever can appear in this time. Most people go home within 1 to 2 months.",
      faq: [
        q(
          "How long does it take to make the cells?",
          "Usually a few weeks from collection to infusion. Your doctor may give other treatment while you wait.",
        ),
        q(
          "What are the main side effects?",
          "Fever, low blood pressure and, sometimes, confusion in the first weeks. The team watches closely and treats them early.",
        ),
      ],
    },
  ),
  treatment(
    "childhood-cancer-treatment",
    "Treatment for children's cancers and blood disorders",
    "haematology-bmt",
    "Care for children with leukaemia, lymphoma, solid tumours and non-cancerous blood disorders, planned by doctors who treat only children.",
    {
      what: "A paediatric haemato-oncologist plans the whole treatment, which may combine chemotherapy, surgery, radiotherapy and bone marrow transplant. Doses and care are suited to a growing child, with support for the family throughout.",
      who: "Children with blood cancers such as leukaemia and lymphoma, solid tumours, or blood disorders such as thalassaemia and aplastic anaemia.",
      stay: "Depends on the treatment plan. Many chemotherapy sessions are day care; a bone marrow transplant needs about a month in hospital.",
      recovery: "Treatment often lasts several months. The doctor explains which parts must be done in India and which can continue at home.",
      faq: [
        q(
          "Can one parent stay with the child?",
          "Yes. A parent can stay with the child in hospital. We help with nearby accommodation for the rest of the family.",
        ),
        q(
          "Can part of the treatment continue at home?",
          "Often, yes. The doctor can share the plan with your local doctor for the parts that can safely be done at home.",
        ),
      ],
    },
  ),

  // Oncology
  treatment(
    "chemotherapy",
    "Chemotherapy",
    "oncology",
    "Medicines that kill cancer cells or stop them growing, given by drip, injection or tablet over a series of sessions.",
    {
      what: "A medical oncologist chooses the medicines, dose and timing for the type and stage of cancer. Treatment is usually given in cycles, with rest weeks in between so the body can recover. It can be given before surgery to shrink a tumour, after surgery to lower the chance of it coming back, or on its own.",
      who: "People with many kinds of cancer, including breast, lung, bowel, ovarian, head and neck, blood and bone cancers. Your oncologist decides whether it suits your case.",
      stay: "Most sessions are day care: you come in, have the drip and go home the same day.",
      recovery: "Tiredness and other side effects usually ease within days to weeks of each cycle. A full course often takes 3 to 6 months.",
      faq: [
        q(
          "Do I need to stay in India for the whole course?",
          "Not always. Often the first cycles are given in India and the rest can continue at home, with the plan shared with your local oncologist.",
        ),
        q(
          "Will I lose my hair?",
          "With some medicines, yes, and it usually grows back after treatment. Many modern medicines do not cause hair loss.",
        ),
      ],
    },
  ),
  treatment(
    "targeted-therapy-immunotherapy",
    "Targeted therapy and immunotherapy",
    "oncology",
    "Newer cancer medicines that attack a specific weakness in the cancer, or help the body's own immune system fight it.",
    {
      what: "Tests on the tumour look for changes in its genes or proteins. Targeted medicines block those changes, so they act mainly on cancer cells. Immunotherapy helps the immune system recognise and attack the cancer. These are often called precision or molecular oncology, and are given by drip or as tablets.",
      who: "People whose cancer shows a matching change on testing, or whose cancer type is known to respond, such as some lung, breast, kidney, bowel, skin and head and neck cancers.",
      stay: "Usually day care, or tablets taken at home.",
      recovery: "Most people continue their normal daily life during treatment, with regular checks and scans.",
      faq: [
        q(
          "How do I know if it suits me?",
          "Your oncologist looks at your tumour test results. If testing has not been done, it can often be done on the biopsy you already have.",
        ),
        q(
          "Is it the same as chemotherapy?",
          "No. It works in a different way and usually has different, often milder, side effects. Sometimes it is given together with chemotherapy.",
        ),
      ],
    },
  ),
  treatment(
    "radiation-therapy",
    "Radiation therapy (radiotherapy)",
    "oncology",
    "Treatment that uses carefully aimed high-energy beams to destroy cancer cells in one part of the body.",
    {
      what: "A planning scan maps the tumour, and a machine then aims beams at it from several angles, sparing the healthy tissue around it as much as possible. Each session takes minutes and is painless. Treatment is usually given on weekdays for one to several weeks.",
      who: "People with many kinds of cancer, on its own or with surgery and chemotherapy, and sometimes to ease pain from cancer that has spread.",
      stay: "Usually no hospital stay: you come in for each short session.",
      recovery: "Tiredness and skin soreness in the treated area are common and usually settle within a few weeks after the course.",
      faq: [
        q(
          "Will I be radioactive?",
          "No. With external beam radiotherapy you are not radioactive, and it is safe to be with family.",
        ),
        q(
          "How long will I need to stay in India?",
          "As long as the course lasts, usually 1 to 7 weeks, plus a few days for planning. Your doctor tells you the exact length.",
        ),
      ],
    },
  ),
  treatment(
    "cancer-surgery",
    "Cancer surgery (surgical oncology)",
    "oncology",
    "An operation to remove a tumour and, where needed, nearby tissue or lymph nodes.",
    {
      what: "A surgical oncologist removes the tumour with a margin of healthy tissue, and often the nearby lymph nodes to check for spread. Where it suits the case, it is done by keyhole (laparoscopic) or robotic surgery, which usually means smaller cuts and a quicker recovery. The removed tissue is examined to plan any further treatment.",
      who: "People with solid tumours, such as head and neck, breast, stomach, bowel, liver, pancreas, kidney, bladder, prostate, womb, ovary, bone and soft tissue cancers.",
      stay: usually("Usually 2 to 10 days in hospital, depending on the operation"),
      recovery: "From 2 weeks for smaller operations to 6 to 8 weeks for major ones. Plan to stay in India until the stitches are checked and the report is discussed.",
      faq: [
        q(
          "Will I need other treatment after surgery?",
          "Sometimes. The report on the removed tissue shows whether chemotherapy or radiotherapy would help. The team discusses this with you before you go home.",
        ),
        q(
          "Can it be done by robotic surgery?",
          "For many cancers, yes. The surgeon decides based on the tumour and your scans.",
        ),
      ],
    },
  ),
  treatment(
    "head-neck-cancer-surgery",
    "Head and neck cancer surgery",
    "oncology",
    "Surgery for cancers of the mouth, tongue, throat, voice box, salivary glands and sinuses, saving speech and swallowing wherever possible.",
    {
      what: "The tumour is removed, often with the lymph nodes in the neck. Where it suits the case, it is done through the mouth with a laser or a robot (transoral surgery), avoiding large cuts. When the voice box is involved, voice-preserving surgery is chosen where possible, and voice rehabilitation is offered when it is not. Reconstruction can rebuild the area in the same operation.",
      who: "People with cancer of the mouth, tongue, cheek, throat, voice box (larynx), salivary glands, nose or sinuses.",
      stay: usually("Usually 3 to 10 days in hospital, longer if reconstruction is needed"),
      recovery: "Usually 3 to 6 weeks. Speech and swallowing therapy may be needed. Radiotherapy is sometimes given afterwards.",
      faq: [
        q(
          "Will I be able to speak and eat normally?",
          "The surgeon aims to keep speech and swallowing wherever possible, and therapists help you recover them after surgery.",
        ),
        q(
          "What is transoral robotic surgery?",
          "Surgery done through the open mouth using robotic arms or a laser, so there is no cut on the face or neck for the tumour itself.",
        ),
      ],
    },
  ),
  treatment(
    "thyroid-surgery",
    "Thyroid and parathyroid surgery",
    "oncology",
    "An operation to remove part or all of the thyroid or a parathyroid gland in the neck, for cancer, large lumps or overactive glands.",
    {
      what: "Through a small cut in the front of the neck, the surgeon removes half or all of the thyroid gland, or an overactive parathyroid gland, taking care to protect the nerves to the voice box. If the whole thyroid is removed, a daily tablet replaces its hormone.",
      who: "People with thyroid cancer, thyroid lumps that are large or suspicious, an overactive thyroid that does not settle with medicine, or an overactive parathyroid gland.",
      stay: usually("Usually 1 to 3 days in hospital"),
      recovery: "Most people return to normal activity in 1 to 2 weeks.",
      faq: [
        q(
          "Will it change my voice?",
          "Rarely. The surgeon protects the voice nerves, and any hoarseness after surgery usually settles within weeks.",
        ),
        q(
          "Will I need tablets afterwards?",
          "If all the thyroid is removed, yes, a daily thyroid hormone tablet for life. If half is removed, often not.",
        ),
      ],
    },
  ),
  treatment(
    "breast-cancer-surgery",
    "Breast cancer surgery",
    "oncology",
    "An operation to remove breast cancer, with the breast kept or rebuilt wherever possible.",
    {
      what: "Where it is safe, only the tumour and a margin around it are removed (breast-conserving surgery), and the breast is reshaped in the same operation (oncoplastic surgery). Where the whole breast must be removed (mastectomy), it can often be rebuilt. The lymph nodes in the armpit are checked, usually with a small sampling operation. A vacuum-assisted biopsy can be used to diagnose or remove small lumps without open surgery.",
      who: "Women, and occasionally men, with breast cancer, and people with a strong family history who may benefit from genetic testing.",
      stay: usually("Usually 1 to 3 days in hospital, longer with reconstruction"),
      recovery: "Usually 2 to 4 weeks. Chemotherapy, radiotherapy or hormone tablets may follow, depending on the report.",
      faq: [
        q(
          "Can I keep my breast?",
          "Often, yes, especially when the tumour is small compared with the breast, or after chemotherapy shrinks it. The surgeon advises after reviewing your scans.",
        ),
        q(
          "Should I have genetic testing?",
          "If you were diagnosed young or have close relatives with breast or ovarian cancer, testing may help plan your treatment. The doctor advises.",
        ),
      ],
    },
  ),
  treatment(
    "hpb-cancer-surgery",
    "Liver, pancreas and bile duct cancer surgery (including Whipple)",
    "oncology",
    "Surgery to remove cancers of the liver, pancreas, bile duct and gall bladder, including the Whipple operation for the pancreas.",
    {
      what: "Part of the liver can be removed safely, and what remains grows back. For cancer at the head of the pancreas, the Whipple operation (pancreaticoduodenectomy) removes it with part of the bowel and bile duct, then reconnects them. Where tumours involve major blood vessels, these can be removed and rebuilt in the same operation. Many of these operations can be done by keyhole or robotic surgery.",
      who: "People with cancers of the liver, bile duct, gall bladder or pancreas, and cancers that have spread to the liver from the bowel, after scans show the tumour can be removed.",
      stay: usually("Usually 7 to 14 days in hospital"),
      recovery: "Usually 6 to 8 weeks. Plan to stay in India for about 3 to 4 weeks after surgery.",
      faq: [
        q(
          "Can I live a normal life after part of my liver is removed?",
          "Yes. The liver grows back to near full size within weeks, as long as the remaining part is healthy.",
        ),
        q(
          "What is the Whipple operation?",
          "An operation that removes the head of the pancreas, part of the small bowel, the gall bladder and part of the bile duct, then reconnects them. It is the main operation for cancer in that area.",
        ),
      ],
    },
  ),
  treatment(
    "gi-cancer-surgery",
    "Stomach, bowel and food pipe cancer surgery",
    "oncology",
    "Surgery to remove cancers of the food pipe (oesophagus), stomach, small bowel, colon and rectum.",
    {
      what: "The part of the gut with the cancer is removed with its lymph nodes, and the ends are joined again. Most of these operations can be done by keyhole or robotic surgery. For rectal cancer, the surgeon aims to keep normal bowel control wherever possible.",
      who: "People with cancer of the oesophagus, stomach, small intestine, colon or rectum, and some abdominal tumours such as sarcomas.",
      stay: usually("Usually 5 to 10 days in hospital"),
      recovery: "Usually 4 to 8 weeks. Eating returns slowly, with advice from a dietitian.",
      faq: [
        q(
          "Will I need a bag (stoma)?",
          "Not always. Sometimes a temporary stoma protects the join while it heals, and is closed a few months later. The surgeon tells you before the operation.",
        ),
        q(
          "Will I need chemotherapy too?",
          "Often, before or after surgery, depending on the stage. The team plans it together.",
        ),
      ],
    },
  ),
  treatment(
    "hipec",
    "Cytoreductive surgery and HIPEC",
    "oncology",
    "Surgery that removes all visible cancer from inside the belly, followed by heated chemotherapy washed through the belly during the same operation.",
    {
      what: "The surgeon removes every visible tumour from the lining of the belly (cytoreductive surgery). Then, while still in theatre, heated chemotherapy is circulated through the belly for about an hour (HIPEC) to treat cancer cells too small to see. Heat helps the medicine work better, and little of it reaches the rest of the body.",
      who: "Selected people with cancer that has spread to the lining of the belly (peritoneum) from the ovary, bowel, appendix or stomach, and people with peritoneal mesothelioma or pseudomyxoma.",
      stay: usually("Usually 10 to 14 days in hospital, with a few days in intensive care"),
      recovery: "Usually 6 to 12 weeks. Plan to stay in India for about 4 weeks after surgery.",
      faq: [
        q(
          "Is everyone with spread to the belly suitable?",
          "No. The team reviews your scans and health to see whether all the visible cancer can be removed, which is when HIPEC helps most.",
        ),
        q(
          "Is it a long operation?",
          "Yes, often 8 to 12 hours. It is done only in specialised centres with experienced teams.",
        ),
      ],
    },
  ),
  treatment(
    "urologic-cancer-surgery",
    "Kidney, bladder and prostate cancer surgery",
    "oncology",
    "Surgery for cancers of the kidney, bladder, prostate, testis and adrenal gland, often done robotically.",
    {
      what: "Depending on the cancer, the surgeon removes the tumour with part of the kidney (keeping the rest working) or the whole kidney, the prostate, or the bladder. When the bladder is removed, a new way to pass urine is made, sometimes a new bladder from bowel. Robotic surgery is used where it suits, and the surgeon aims to keep bladder control and sexual function wherever possible.",
      who: "People with cancer of the kidney, bladder, prostate, testis, penis or adrenal gland.",
      stay: usually("Usually 3 to 10 days in hospital, depending on the operation"),
      recovery: "Usually 3 to 6 weeks.",
      faq: [
        q(
          "Can part of my kidney be kept?",
          "Often, for small tumours. Removing only the tumour (partial nephrectomy) keeps more kidney function.",
        ),
        q(
          "Will prostate surgery affect bladder control?",
          "Some leakage is common at first and usually improves over weeks to months, with exercises. The surgeon explains your own risk.",
        ),
      ],
    },
  ),
  treatment(
    "gynaecologic-cancer-surgery",
    "Ovarian, womb and cervical cancer surgery",
    "oncology",
    "Surgery for cancers of the ovary, womb (uterus), cervix and vulva, keeping fertility where it is safe.",
    {
      what: "The surgeon removes the cancer and, where needed, the womb, ovaries and nearby lymph nodes. For advanced ovarian cancer, extensive (ultra-radical) surgery aims to remove all visible disease. In young women with early cancer, fertility-sparing surgery may keep the womb or an ovary. Keyhole and robotic surgery are used where they suit.",
      who: "Women with cancer of the ovary, womb, cervix or vulva, and some gynaecological sarcomas.",
      stay: usually("Usually 3 to 10 days in hospital"),
      recovery: "Usually 4 to 6 weeks. Chemotherapy or radiotherapy may follow.",
      faq: [
        q(
          "Can I still have children?",
          "Sometimes, for early cancers in young women. Tell the doctor if this matters to you, so it is part of the plan from the start.",
        ),
        q(
          "Is chemotherapy given before surgery?",
          "For some advanced ovarian cancers, yes, to shrink the disease first. The team decides from your scans.",
        ),
      ],
    },
  ),
  treatment(
    "bone-cancer-surgery",
    "Bone cancer surgery (limb salvage)",
    "oncology",
    "Surgery that removes a bone or soft tissue tumour while saving the arm or leg, instead of amputating it.",
    {
      what: "The tumour is removed with a margin of healthy tissue, and the missing bone is rebuilt with a metal implant (endoprosthesis), bone from a bone bank, or the patient's own bone. Most people with bone cancer today keep their limb. Chemotherapy is often given before and after surgery.",
      who: "Children and adults with bone cancers such as osteosarcoma and Ewing's sarcoma, soft tissue sarcomas, some non-cancerous but aggressive bone tumours, and cancer that has spread to bone.",
      stay: usually("Usually 5 to 10 days in hospital"),
      recovery: "Usually 6 to 12 weeks, with physiotherapy to walk or use the arm again.",
      faq: [
        q(
          "Will I lose my leg?",
          "In most cases, no. Limb salvage is possible for most bone tumours. The surgeon tells you after reviewing your scans.",
        ),
        q(
          "How long does the implant last?",
          "Many last many years. Some may need replacing later, especially in children who are still growing.",
        ),
      ],
    },
  ),
  treatment(
    "liver-tumour-embolisation",
    "Liver tumour embolisation (TACE and TARE)",
    "oncology",
    "Through a pinhole in the groin or wrist, a fine tube is guided to the artery feeding a liver tumour, and chemotherapy (TACE) or tiny radioactive beads (TARE) are delivered straight into it.",
    {
      what: "An interventional radiologist guides a fine tube through an artery to the liver using X-ray imaging. In TACE (chemoembolisation), chemotherapy is delivered into the tumour and its blood supply is blocked. In TARE (radioembolisation), tiny beads carrying radiation are delivered instead. There is no open surgery, only a pinhole.",
      who: "People with liver cancer, or cancer that has spread to the liver, that cannot be removed by surgery, or as a bridge to surgery or a transplant.",
      stay: usually("Usually 1 to 2 days in hospital"),
      recovery: "Most people feel tired, with some pain or fever, for about a week, then return to normal life.",
      faq: [
        q(
          "Is it painful?",
          "It is done under local anaesthetic and sedation. Some pain and fever afterwards is common and is treated with medicines.",
        ),
        q(
          "Will I need more than one session?",
          "Sometimes. A scan after about 4 to 6 weeks shows how the tumour has responded.",
        ),
      ],
    },
  ),
  treatment(
    "tumour-ablation",
    "Tumour ablation (radiofrequency and microwave)",
    "oncology",
    "A needle guided by a scan destroys a small tumour with heat, without open surgery.",
    {
      what: "Using ultrasound or CT, an interventional radiologist places a thin needle into the tumour through the skin. The needle heats the tumour with radio waves or microwaves until it is destroyed. It takes about an hour, leaves only a pinhole, and can be repeated.",
      who: "People with small tumours in the liver, kidney, lung or bone, especially those not suited to surgery.",
      stay: usually("Usually 1 day in hospital"),
      recovery: "Most people return to normal activity within a few days.",
      faq: [
        q(
          "Is it as good as surgery?",
          "For some small tumours the results are close to surgery. The team advises which suits your tumour.",
        ),
        q(
          "How will I know it worked?",
          "A scan, usually about a month later, checks that the whole tumour has been treated.",
        ),
      ],
    },
  ),

  // Neurology, neurosurgery and spine
  treatment(
    "brain-tumour-surgery",
    "Brain tumour surgery (craniotomy)",
    "neurology-neurosurgery",
    "An operation in which the surgeon opens a small part of the skull to remove or reduce a tumour in the brain.",
    {
      what: "A small window of skull is lifted, the tumour is removed as fully as is safe, and the bone is put back. Navigation and a surgical microscope guide the surgeon, and some operations are done with the patient awake to protect speech and movement. The tissue is examined to plan further treatment.",
      who: "People with brain tumours, whether cancerous or not, such as gliomas, meningiomas, pituitary tumours and tumours that have spread to the brain.",
      stay: atNanavati("About 5 days: 1 in intensive care and 4 on the ward"),
      recovery: "Usually 4 to 8 weeks. Plan to stay in India for about 2 weeks after surgery.",
      faq: [
        q(
          "Will my head be shaved?",
          "Usually only a small strip, and hair grows back over the scar.",
        ),
        q(
          "Will I need radiotherapy afterwards?",
          "It depends on the type of tumour. The report on the removed tissue guides this.",
        ),
      ],
    },
  ),
  treatment(
    "deep-brain-stimulation",
    "Deep brain stimulation (DBS)",
    "neurology-neurosurgery",
    "A small device placed under the skin sends mild electrical signals to part of the brain, used for some movement disorders such as Parkinson's disease.",
    {
      what: "Thin wires are placed in a precise spot deep in the brain and connected to a small battery under the skin of the chest, like a pacemaker. The signals calm the faulty brain activity that causes shaking and stiffness. Settings are adjusted over the following weeks.",
      who: "People with Parkinson's disease whose medicines no longer control their symptoms well, and some people with tremor or dystonia.",
      stay: usually("Usually 3 to 5 days in hospital"),
      recovery: "Usually 2 to 4 weeks, with settings tuned over a few visits.",
      faq: [
        q(
          "Does it cure Parkinson's?",
          "No, but it can greatly reduce shaking, stiffness and the swings of medicine, and often lets people take less medicine.",
        ),
        q(
          "Can the settings be changed after I go home?",
          "Yes. Settings can be adjusted at later visits, and many devices can be checked by a neurologist at home.",
        ),
      ],
    },
  ),
  treatment(
    "spinal-fusion",
    "Spinal fusion",
    "neurology-neurosurgery",
    "An operation that joins two or more bones of the spine so they heal into one, to steady a painful or unstable part of the back or neck.",
    {
      what: "Screws and rods hold the bones still while bone graft helps them grow together. Where it suits the case, it is done by minimally invasive surgery through small cuts, with navigation to place the screws precisely, which usually means less pain and a quicker return home.",
      who: "People with an unstable or slipped spine (spondylolisthesis), severe disc wear, fractures, deformity, or tumours of the spine, when other treatment has not helped.",
      stay: atNanavati("About 5 days for up to two levels: 1 in intensive care and 4 on the ward"),
      recovery: "Walking starts the day after surgery. Most people return to light work in 4 to 6 weeks, and the bones fuse over 3 to 6 months.",
      faq: [
        q(
          "Will I lose movement in my back?",
          "Fusing one or two levels makes little difference to everyday movement.",
        ),
        q(
          "When can I fly home?",
          "Usually about 2 weeks after surgery, once the wound is checked.",
        ),
      ],
    },
  ),
  treatment(
    "acdf",
    "Anterior cervical discectomy and fusion (ACDF)",
    "neurology-neurosurgery",
    "Through a small cut at the front of the neck, a damaged disc pressing on the nerves or spinal cord is removed and the bones either side are joined.",
    {
      what: "The surgeon reaches the spine from the front of the neck, removes the worn or slipped disc and any bone spurs pressing on the nerves, and places a small spacer so the two bones grow together.",
      who: "People with arm pain, numbness or weakness, or problems with balance and hand use, from a slipped or worn disc in the neck.",
      stay: atNanavati("About 4 days: 1 in intensive care and 3 on the ward"),
      recovery: "Most people return to light activity in 2 to 4 weeks.",
      faq: [
        q(
          "Is a disc replacement better?",
          "For some people, a disc replacement keeps movement in the neck instead of joining the bones. The surgeon advises which suits you.",
        ),
        q(
          "Will I have trouble swallowing?",
          "A mild sore throat or difficulty swallowing for a few days is common and usually settles quickly.",
        ),
      ],
    },
  ),
  treatment(
    "cervical-disc-replacement",
    "Cervical disc replacement",
    "neurology-neurosurgery",
    "A worn or slipped disc in the neck is replaced with an artificial disc that keeps the neck moving.",
    {
      what: "Through a small cut at the front of the neck, the damaged disc is removed and an artificial disc is put in its place. Unlike fusion, the joint keeps moving, which may protect the discs above and below.",
      who: "Younger, active people with arm pain or numbness from one or two worn or slipped discs in the neck, without major arthritis in the joints.",
      stay: usually("Usually 2 to 3 days in hospital"),
      recovery: "Most people return to light activity in 2 to 3 weeks.",
      faq: [
        q(
          "Who is not suitable?",
          "People with severe arthritis of the neck joints, an unstable spine or weak bones are usually better suited to fusion.",
        ),
        q(
          "How long does the artificial disc last?",
          "Modern artificial discs are designed to last many years. The surgeon explains the type used.",
        ),
      ],
    },
  ),
  treatment(
    "microdiscectomy",
    "Microdiscectomy and laminectomy",
    "neurology-neurosurgery",
    "Keyhole surgery on the lower back that removes the part of a slipped disc, or of the bone, that is pressing on a nerve, to relieve sciatica and leg pain.",
    {
      what: "Through a small cut, using a microscope, the surgeon removes the piece of disc pressing on the nerve (microdiscectomy) or widens a narrowed spinal canal by removing a little bone (laminectomy).",
      who: "People with sciatica or leg pain, numbness or weakness from a slipped disc or a narrowed spinal canal, when medicines and physiotherapy have not helped.",
      stay: atNanavati("About 3 days on the ward"),
      recovery: "Leg pain often eases straight away. Most people return to light work in 2 to 4 weeks.",
      faq: [
        q(
          "Can the disc slip again?",
          "Sometimes. Physiotherapy and core exercises help lower the chance.",
        ),
        q(
          "Can it be done endoscopically?",
          "Often, yes. Endoscopic surgery uses an even smaller cut. The surgeon advises which suits your disc.",
        ),
      ],
    },
  ),
  treatment(
    "endoscopic-spine-surgery",
    "Endoscopic spine surgery",
    "neurology-neurosurgery",
    "Spine surgery through a cut of about one centimetre, using a thin camera, to free a trapped nerve.",
    {
      what: "A thin tube with a camera (endoscope) is passed to the spine through a very small cut. The surgeon removes the slipped disc or bone pressing on the nerve while watching on a screen. Muscles are moved aside rather than cut.",
      who: "People with sciatica or arm pain from a slipped disc, or a narrowed spinal canal at one or two levels.",
      stay: usually("Often the same day or 1 night in hospital"),
      recovery: "Most people walk within hours and return to light work in 1 to 2 weeks.",
      faq: [
        q(
          "Is it done under general anaesthetic?",
          "Sometimes under local anaesthetic with sedation, sometimes general. The team decides with you.",
        ),
        q(
          "Is it suitable for every spine problem?",
          "No. It suits trapped nerves at one or two levels. Instability or deformity usually needs fixation.",
        ),
      ],
    },
  ),
  treatment(
    "scoliosis-surgery",
    "Spine deformity correction (scoliosis)",
    "neurology-neurosurgery",
    "Surgery that straightens and steadies a curved spine, in teenagers and adults.",
    {
      what: "Screws and rods are fixed to the spine to straighten the curve and hold it while the bones fuse. Navigation and nerve monitoring during surgery help keep it safe.",
      who: "Teenagers and adults with a spine curve (scoliosis or kyphosis) that is large, getting worse, or causing pain or breathing problems.",
      stay: usually("Usually 5 to 7 days in hospital"),
      recovery: "Walking starts within a day or two. School or desk work usually resumes in 4 to 6 weeks, and sport in 6 to 12 months.",
      faq: [
        q(
          "Will my child grow normally after surgery?",
          "Surgery is usually timed near the end of growth. The surgeon explains the best timing for your child.",
        ),
        q(
          "How straight will the spine be?",
          "Most curves are greatly reduced, though not always made fully straight. Balance and comfort are the main aims.",
        ),
      ],
    },
  ),

  // Weight loss (bariatric) surgery
  treatment(
    "gastric-sleeve",
    "Sleeve gastrectomy (gastric sleeve)",
    "bariatric-surgery",
    "Keyhole surgery that removes a large part of the stomach, leaving a narrow sleeve, so a person feels full sooner.",
    {
      what: "About three quarters of the stomach is removed by keyhole surgery, leaving a narrow tube. The smaller stomach holds less food and makes less of the hormone that causes hunger.",
      who: "Adults with a body mass index (BMI) of about 35 or more, or 30 or more with diabetes, high blood pressure or sleep apnoea, after diet and exercise have not worked. Thresholds can be lower for people of Asian origin.",
      stay: usually("Usually 2 to 3 days in hospital"),
      recovery: "Most people return to desk work in 1 to 2 weeks, moving from liquids to normal food over about 6 weeks.",
      faq: [
        q(
          "How much weight will I lose?",
          "Many people lose about 60 to 70 percent of their excess weight within one to two years, with diet and exercise.",
        ),
        q(
          "Will I need vitamins afterwards?",
          "Yes, usually daily vitamins and regular blood tests.",
        ),
      ],
    },
  ),
  treatment(
    "gastric-bypass",
    "Roux-en-Y gastric bypass",
    "bariatric-surgery",
    "Surgery that makes a small stomach pouch and connects it further down the small intestine, so less food is eaten and absorbed.",
    {
      what: "By keyhole surgery, a small pouch is made at the top of the stomach and joined directly to a lower part of the small intestine, bypassing the rest of the stomach. Less food fits, and fewer calories are absorbed.",
      who: "Adults with severe obesity, especially those with type 2 diabetes or bad acid reflux, after other methods have not worked.",
      stay: usually("Usually 2 to 4 days in hospital"),
      recovery: "Most people return to desk work in 2 weeks, with a staged diet over about 6 weeks.",
      faq: [
        q(
          "Will it help my diabetes?",
          "Often, yes. Many people need less diabetes medicine, and some stop it, after a bypass.",
        ),
        q(
          "Sleeve or bypass: which is right for me?",
          "It depends on your weight, reflux, diabetes and other health. The surgeon advises after assessment.",
        ),
      ],
    },
  ),

  // Fertility and IVF
  treatment(
    "ivf",
    "In vitro fertilisation (IVF)",
    "fertility-ivf",
    "Eggs are collected and fertilised with sperm in a laboratory, and an embryo is then placed in the womb.",
    {
      what: "Hormone injections help the ovaries produce several eggs, which are collected in a short procedure under sedation. They are mixed with sperm in the laboratory, and after a few days one embryo is placed in the womb through a thin tube. Spare embryos can be frozen.",
      who: "Couples who have not conceived after trying, including with blocked tubes, low egg reserve, endometriosis, or unexplained infertility.",
      stay: "No hospital stay: egg collection and embryo transfer are day procedures.",
      recovery: "Most women return to normal activity the day after each procedure. One cycle takes about 3 to 4 weeks in India; a pregnancy test follows about 2 weeks after transfer.",
      faq: [
        q(
          "How long do we need to be in India?",
          "Usually about 3 to 4 weeks for one cycle. Some early tests and injections can be started at home.",
        ),
        q(
          "What are the chances of success?",
          "They depend mostly on the woman's age and the cause of infertility. The doctor gives you an estimate after tests.",
        ),
      ],
    },
  ),
  treatment(
    "icsi",
    "Intracytoplasmic sperm injection (ICSI)",
    "fertility-ivf",
    "A form of IVF in which a single sperm is injected directly into each egg, often used when there are problems with sperm.",
    {
      what: "It follows the same steps as IVF, but instead of mixing eggs and sperm, an embryologist injects one sperm into each egg under a microscope. Sperm can also be collected directly from the testis when there is none in the semen.",
      who: "Couples where the man has a low sperm count, poorly moving sperm or no sperm in the semen, or where IVF has not led to fertilisation before.",
      stay: "No hospital stay: all steps are day procedures.",
      recovery: "As for IVF: about 3 to 4 weeks in India for one cycle.",
      faq: [
        q(
          "What if there is no sperm in the semen?",
          "Sperm can often be taken from the testis in a minor procedure and used for ICSI.",
        ),
        q(
          "Is ICSI more successful than IVF?",
          "Not in general. It helps mainly when the problem is with the sperm.",
        ),
      ],
    },
  ),

  // Orthopaedics
  treatment(
    "knee-replacement",
    "Total knee replacement",
    "orthopaedics",
    "An operation that replaces the worn surfaces of the knee joint with metal and plastic parts.",
    {
      what: "The worn surfaces of the thigh and shin bones are removed and capped with metal parts, with a plastic insert between them so the joint moves smoothly. Computer navigation or a robot may be used to position the parts precisely.",
      who: "People with severe knee pain and stiffness from arthritis that limits walking and sleep, when medicines, injections and physiotherapy no longer help.",
      stay: atNanavati(
        "About 6 days for one knee (1 in intensive care, 5 on the ward), or 8 days for both (2 and 6)",
      ),
      recovery: "Walking with support starts the day after surgery. Most people walk on their own in 4 to 6 weeks and fly home after about 2 to 3 weeks.",
      faq: [
        q(
          "Can both knees be done together?",
          "Often, yes, if your health allows. It means one stay and one recovery.",
        ),
        q(
          "How long does a knee replacement last?",
          "Most last 15 to 20 years or more.",
        ),
      ],
    },
  ),
  treatment(
    "hip-replacement",
    "Total hip replacement",
    "orthopaedics",
    "An operation that replaces a damaged hip joint with an artificial ball and socket.",
    {
      what: "The worn ball at the top of the thigh bone and the socket in the pelvis are replaced with artificial parts made of metal, ceramic or plastic.",
      who: "People with severe hip pain and stiffness from arthritis, a hip fracture, or loss of blood supply to the hip bone (avascular necrosis).",
      stay: atNanavati(
        "About 6 days for one hip (1 in intensive care, 5 on the ward), or 8 days for both (2 and 6)",
      ),
      recovery: "Walking with support starts the day after surgery. Most people walk on their own in 4 to 6 weeks and fly home after about 2 weeks.",
      faq: [
        q(
          "How long does a hip replacement last?",
          "Most last 15 to 20 years or more.",
        ),
        q(
          "Are there movements I must avoid?",
          "For the first weeks, yes. The physiotherapist shows you how to sit, bend and climb stairs safely.",
        ),
      ],
    },
  ),
  treatment(
    "acl-reconstruction",
    "ACL reconstruction",
    "orthopaedics",
    "Keyhole surgery that rebuilds a torn anterior cruciate ligament, one of the main ligaments inside the knee.",
    {
      what: "Through small cuts, the surgeon replaces the torn ligament with a piece of tendon, usually from the patient's own leg, fixed into the bones above and below the knee.",
      who: "Active people with a torn ACL whose knee gives way, especially those who play sport or do physical work.",
      stay: usually("Usually 1 to 2 days in hospital"),
      recovery: "Walking with support starts within days. Return to sport usually takes 6 to 9 months of physiotherapy.",
      faq: [
        q(
          "Can I fly home soon after?",
          "Usually after about 1 to 2 weeks, once the wound is checked and physiotherapy is under way.",
        ),
        q(
          "Can other knee damage be fixed at the same time?",
          "Yes. Torn cartilage (meniscus) is often repaired in the same operation.",
        ),
      ],
    },
  ),

  // Cardiology and heart surgery
  treatment(
    "heart-bypass-surgery",
    "Coronary artery bypass grafting (CABG)",
    "cardiology",
    "Heart bypass surgery: a blood vessel from elsewhere in the body is used to route blood around a narrowed or blocked artery of the heart.",
    {
      what: "A healthy blood vessel is taken from the chest, arm or leg and joined to the heart artery beyond the blockage, so blood flows around it. It can be done with the heart beating (off-pump) or with a heart-lung machine, and in some patients through smaller cuts.",
      who: "People with several blocked heart arteries, a blocked main artery, or diabetes with heart artery disease, and those for whom stenting is not suitable.",
      stay: atNanavati(
        "About 7 to 9 days: 3 to 5 in intensive care, depending on risk, and 4 on the ward",
      ),
      recovery: "Most people return to light activity in 4 to 6 weeks and full activity in about 3 months. Plan to stay in India for about 2 to 3 weeks after surgery.",
      faq: [
        q(
          "Bypass or stent: which is better for me?",
          "It depends on how many arteries are blocked and where. The heart team reviews your angiogram and advises.",
        ),
        q(
          "When can I fly home?",
          "Usually about 2 to 3 weeks after surgery, after a check-up.",
        ),
      ],
    },
  ),
  treatment(
    "minimally-invasive-heart-surgery",
    "Minimally invasive heart surgery",
    "cardiology",
    "Heart surgery through small cuts between the ribs instead of opening the breastbone.",
    {
      what: "The surgeon reaches the heart through a small cut in the side of the chest, using special instruments and sometimes a camera. It can be used for valve repair or replacement, some bypass operations and closing holes in the heart.",
      who: "Selected people needing valve, bypass or other heart surgery, depending on their heart and general health.",
      stay: usually("Usually 4 to 6 days in hospital"),
      recovery: "Often quicker than standard heart surgery: many return to light activity in 2 to 4 weeks.",
      faq: [
        q(
          "Is everyone suitable?",
          "No. It depends on the operation and your heart. The surgeon advises after reviewing your tests.",
        ),
        q(
          "Is the result the same as standard surgery?",
          "For suitable patients, yes, with a smaller scar and usually a faster recovery.",
        ),
      ],
    },
  ),
  treatment(
    "heart-valve-replacement",
    "Heart valve replacement",
    "cardiology",
    "An operation or catheter procedure that replaces a heart valve that is too narrow or leaks, with a mechanical or tissue valve.",
    {
      what: "The faulty valve is repaired where possible, or replaced with a mechanical valve (which lasts very long but needs blood thinners for life) or a tissue valve. Some patients can have a new valve placed through a tube in the leg (TAVI) instead of open surgery.",
      who: "People with a narrowed or leaking heart valve causing breathlessness, chest pain, tiredness or fainting, often after rheumatic fever or from age.",
      stay: atNanavati("About 7 days for one valve: 3 in intensive care and 4 on the ward"),
      recovery: "Usually 6 to 8 weeks for open surgery, less with minimally invasive or catheter methods. Plan to stay in India for about 2 to 3 weeks.",
      faq: [
        q(
          "Mechanical or tissue valve?",
          "Mechanical valves last longer but need daily blood thinners. Tissue valves avoid this but may wear out after 10 to 20 years. The surgeon helps you choose.",
        ),
        q(
          "Can my valve be repaired instead?",
          "Often, especially leaking mitral valves. Repair is preferred where possible.",
        ),
      ],
    },
  ),
  treatment(
    "angioplasty",
    "Coronary angioplasty and stenting",
    "cardiology",
    "A thin tube is passed to a narrowed heart artery, a small balloon widens it, and a mesh tube called a stent is usually left to hold it open.",
    {
      what: "Through a pinhole in the wrist or groin, a thin tube is guided to the heart. An angiogram shows the blockage, a balloon opens it, and a stent coated with medicine is left in place to keep it open.",
      who: "People with chest pain or a heart attack caused by one or a few narrowed heart arteries.",
      stay: atNanavati("About 2 days: 1 in intensive care and 1 on the ward"),
      recovery: "Most people return to normal activity in about a week, and can usually fly home after a few days.",
      faq: [
        q(
          "Is it done under general anaesthetic?",
          "No. It is done under local anaesthetic, and you are awake but comfortable.",
        ),
        q(
          "Will I need medicines afterwards?",
          "Yes, blood thinners for some months to protect the stent, and medicines to protect the heart.",
        ),
      ],
    },
  ),
  treatment(
    "ecmo",
    "ECMO (heart and lung support)",
    "cardiology",
    "A machine takes over the work of the heart and lungs for days or weeks, to give them time to recover.",
    {
      what: "Blood is drawn through a tube, passed through an artificial lung that adds oxygen and removes carbon dioxide, and pumped back. It is used in intensive care for the most serious heart or lung failure, or to support complex heart surgery.",
      who: "Critically ill people with severe heart or lung failure that does not respond to other treatment, for example after a heart attack, severe pneumonia or heart surgery.",
      stay: "In intensive care, for as long as support is needed, usually days to weeks.",
      recovery: "Depends on the illness that needed ECMO. The team explains each step to the family.",
      faq: [
        q(
          "Can a patient be moved to India on ECMO?",
          "In some cases, with an air ambulance team. Contact us urgently and we check with the hospital.",
        ),
        q(
          "Is ECMO a treatment in itself?",
          "It supports the body while the heart or lungs recover, or until another treatment, such as surgery, is possible.",
        ),
      ],
    },
  ),
  treatment(
    "heart-diabetes-care",
    "Heart and diabetes care",
    "cardiology",
    "A specialist check and treatment plan for heart disease and diabetes together, aimed at preventing heart attacks and strokes.",
    {
      what: "A physician who treats both conditions reviews your history, tests and medicines, and plans treatment for blood sugar, blood pressure and cholesterol together. Tests may include an ECG, echo, stress test and blood tests.",
      who: "People with diabetes, high blood pressure, high cholesterol or a family history of heart disease, and those who want a full heart check during their visit.",
      stay: "No hospital stay: tests and consultations are done as an outpatient, usually over 1 to 2 days.",
      recovery: "No recovery time. The plan can continue with your doctor at home.",
      faq: [
        q(
          "Can I have a heart check while I am in India for something else?",
          "Yes. We can book it alongside your other appointments.",
        ),
        q(
          "Will I need to change my medicines?",
          "Possibly. The doctor explains any change and shares the plan with your home doctor.",
        ),
      ],
    },
  ),
  treatment(
    "varicose-veins",
    "Varicose vein treatment",
    "cardiology",
    "Bulging, painful leg veins closed from the inside with heat or medicine, through a pinhole, without open surgery.",
    {
      what: "Guided by ultrasound, a thin tube is passed into the faulty vein and heat (laser or radiofrequency) or a medical glue closes it. Blood then flows through healthy veins. Smaller veins can be treated with injections. Deep vein clots (DVT) can also be treated through a catheter.",
      who: "People with varicose veins causing pain, swelling, skin changes or ulcers, and some people with deep vein thrombosis.",
      stay: usually("Usually a day procedure, or 1 night in hospital"),
      recovery: "Most people walk straight away and return to normal activity in a few days, wearing a support stocking for a week or two.",
      faq: [
        q(
          "Is it painful?",
          "It is done under local anaesthetic. Mild aching for a few days is common.",
        ),
        q(
          "Can the veins come back?",
          "New varicose veins can form over the years, and can be treated again.",
        ),
      ],
    },
  ),
  treatment(
    "peripheral-artery-disease",
    "Treatment for blocked leg arteries",
    "cardiology",
    "Narrowed or blocked arteries in the legs opened with a balloon or stent through a pinhole, to ease pain on walking and save the leg.",
    {
      what: "Through a pinhole, an interventional radiologist guides a thin tube to the blocked artery, opens it with a balloon, and may place a stent. Where this is not possible, a bypass operation may be advised.",
      who: "People with leg pain on walking, pain at rest, or wounds that do not heal because of poor blood flow, often with diabetes or a history of smoking.",
      stay: usually("Usually 1 to 2 days in hospital"),
      recovery: "Most people walk the same or next day and return to normal activity within a week.",
      faq: [
        q(
          "Can it prevent an amputation?",
          "Restoring blood flow can help wounds heal and often saves the leg. The earlier it is treated, the better.",
        ),
        q(
          "Will I need medicines afterwards?",
          "Yes, usually blood thinners and cholesterol medicines, and help to stop smoking.",
        ),
      ],
    },
  ),

  // Plastic, reconstructive and cosmetic surgery
  treatment(
    "hand-surgery",
    "Hand surgery and reconstruction",
    "cosmetic-plastic-surgery",
    "Surgery to repair injured or damaged hands and restore their use, from cut tendons and nerves to reattaching fingers.",
    {
      what: "A hand surgeon repairs tendons, nerves, blood vessels and bones under a microscope, reattaches severed fingers, frees stiff or contracted fingers, and rebuilds missing parts with tissue moved from elsewhere. Hand therapy afterwards is a key part of recovery.",
      who: "People with hand injuries, nerve compression such as carpal tunnel syndrome, stiff or bent fingers, birth differences of the hand, or poor hand function after an old injury.",
      stay: usually("Usually a day procedure to 3 days in hospital, depending on the operation"),
      recovery: "From 2 weeks for minor surgery to several months with hand therapy for complex repairs.",
      faq: [
        q(
          "Can an old injury still be improved?",
          "Often, yes. Tendon and nerve transfers can bring back movement years after an injury.",
        ),
        q(
          "Do I need hand therapy?",
          "Yes. Therapy is as important as the operation for getting movement back.",
        ),
      ],
    },
  ),
  treatment(
    "brachial-plexus-surgery",
    "Brachial plexus and nerve surgery",
    "cosmetic-plastic-surgery",
    "Surgery to repair the nerves from the neck to the arm, after injury or at birth, to bring back movement to the shoulder, arm and hand.",
    {
      what: "The brachial plexus is the bundle of nerves that controls the arm. Under a microscope, the surgeon repairs damaged nerves, uses nerve grafts, or moves working nerves or muscles to restore movement. Timing matters: nerves recover best when repaired within months of the injury.",
      who: "Adults with arm weakness or paralysis after a road accident or fall, and babies with arm weakness from a difficult birth (birth brachial plexus palsy).",
      stay: usually("Usually 3 to 5 days in hospital"),
      recovery: "Nerves grow slowly, so movement returns over 6 months to 2 years, with long-term physiotherapy.",
      faq: [
        q(
          "Is it too late if the injury was a year ago?",
          "Not always. Even when nerve repair is no longer possible, nerve or muscle transfers can still help.",
        ),
        q(
          "When should a baby be seen?",
          "As early as possible, ideally within the first few months, so the surgeon can follow recovery and operate at the right time.",
        ),
      ],
    },
  ),
  treatment(
    "reconstructive-microsurgery",
    "Reconstructive microsurgery",
    "cosmetic-plastic-surgery",
    "Rebuilding parts of the body after injury or cancer surgery by moving tissue, with its blood supply, from elsewhere in the body.",
    {
      what: "Skin, muscle or bone is moved from one part of the body to another, and its tiny blood vessels are joined under a microscope so it survives. It is used to cover wounds, rebuild the face, breast or jaw after cancer surgery, and save severely injured legs that might otherwise be amputated.",
      who: "People with large wounds or missing tissue after accidents, burns, infections or cancer surgery, including severe leg injuries.",
      stay: usually("Usually 5 to 10 days in hospital"),
      recovery: "Usually 4 to 8 weeks, longer for leg reconstruction, with physiotherapy.",
      faq: [
        q(
          "Can my leg be saved after a bad injury?",
          "Often, even after severe injuries. The team assesses the bone, skin and blood supply to decide.",
        ),
        q(
          "Will there be a scar where the tissue is taken from?",
          "Yes, but the surgeon chooses a place where it is least noticed and least affects function.",
        ),
      ],
    },
  ),
  treatment(
    "lymphoedema-surgery",
    "Lymphoedema surgery (lymphatic microsurgery)",
    "cosmetic-plastic-surgery",
    "Microsurgery that helps fluid drain from a swollen arm or leg, often after cancer treatment.",
    {
      what: "Lymphoedema is swelling caused when lymph fluid cannot drain. Under a microscope, the surgeon joins tiny lymph vessels to small veins so fluid can drain (lymphovenous bypass), or moves healthy lymph nodes to the swollen limb.",
      who: "People with arm or leg swelling from lymphoedema, often after breast or gynaecological cancer surgery or radiotherapy, when compression and therapy are not enough.",
      stay: usually("Usually 1 to 3 days in hospital"),
      recovery: "Most people return to normal activity in 2 to 3 weeks. Swelling improves gradually over months, with continued compression.",
      faq: [
        q(
          "Will the swelling go away completely?",
          "It usually improves, often a great deal, but may not disappear fully. Early treatment gives the best results.",
        ),
        q(
          "Do I still need compression garments?",
          "Usually yes for a while after surgery. Many people can wear them less over time.",
        ),
      ],
    },
  ),
  treatment(
    "childrens-plastic-surgery",
    "Plastic surgery for children and birth differences",
    "cosmetic-plastic-surgery",
    "Surgery for children born with differences such as cleft lip and palate, hand differences and birthmarks, or with scars from injuries and burns.",
    {
      what: "A plastic surgeon who operates on children repairs cleft lip and palate, separates joined fingers, corrects other hand and face differences, and releases tight burn scars, timed to suit the child's growth.",
      who: "Babies and children with cleft lip or palate, hand or face differences from birth, birthmarks, or scars after injuries and burns.",
      stay: usually("Usually 1 to 3 days in hospital"),
      recovery: "Usually 1 to 3 weeks. Some conditions need more than one operation as the child grows.",
      faq: [
        q(
          "What is the best age for surgery?",
          "It depends on the condition. A cleft lip is often repaired at around 3 to 6 months, a cleft palate before about 18 months.",
        ),
        q(
          "Can a parent stay with the child?",
          "Yes. A parent stays with the child in hospital throughout.",
        ),
      ],
    },
  ),
  treatment(
    "rhinoplasty",
    "Rhinoplasty (nose reshaping)",
    "cosmetic-plastic-surgery",
    "Surgery to change the shape or size of the nose, for appearance, for breathing, or both.",
    {
      what: "The surgeon reshapes the bone and cartilage of the nose, usually through cuts inside the nose or a small cut between the nostrils. A bent septum can be straightened in the same operation to help breathing.",
      who: "Adults who want to change the shape of their nose, or who have breathing problems from a bent septum or past injury.",
      stay: usually("Usually a day procedure or 1 night in hospital"),
      recovery: "A splint stays on for about a week. Most swelling and bruising settles in 2 weeks, and the final shape shows over months.",
      faq: [
        q(
          "When can I fly home?",
          "Usually after about 7 to 10 days, once the splint is removed.",
        ),
        q(
          "Will it fix my breathing too?",
          "If the problem is a bent septum, it can be corrected in the same operation.",
        ),
      ],
    },
  ),
  treatment(
    "liposuction",
    "Liposuction",
    "cosmetic-plastic-surgery",
    "Surgery that removes fat from chosen areas of the body through small cuts. It reshapes the body; it is not a weight-loss treatment.",
    {
      what: "Fat is loosened and removed through thin tubes inserted through small cuts, from areas such as the belly, thighs, arms or neck. A compression garment is worn afterwards to help the skin settle.",
      who: "Adults near a healthy weight with areas of fat that do not go with diet and exercise.",
      stay: usually("Usually a day procedure or 1 night in hospital"),
      recovery: "Most people return to desk work in a week. Swelling settles over weeks to months.",
      faq: [
        q(
          "Is it a way to lose weight?",
          "No. It reshapes the body. For large amounts of weight, weight loss surgery may be more suitable.",
        ),
        q(
          "Will the fat come back?",
          "The removed fat cells do not return, but weight gain can add fat elsewhere.",
        ),
      ],
    },
  ),
  treatment(
    "hair-transplant",
    "Hair transplant (FUE)",
    "cosmetic-plastic-surgery",
    "Hair follicles are moved one by one from the back or sides of the head to thinning or bald areas.",
    {
      what: "Under local anaesthetic, healthy follicles are taken one by one from the back or sides of the head (follicular unit extraction) and placed in thinning areas. It takes most of a day.",
      who: "Men and women with pattern hair loss or thinning, who have enough healthy hair at the back and sides of the head.",
      stay: "No hospital stay: it is a day procedure.",
      recovery: "Most people return to normal activity in a few days. The new hair falls out at first and regrows over 3 to 12 months.",
      faq: [
        q(
          "When will I see results?",
          "New hair starts to grow in about 3 to 4 months, with the full result at about a year.",
        ),
        q(
          "Can I fly home the next day?",
          "Usually yes, after a check of the treated areas.",
        ),
      ],
    },
  ),

  // Eye care
  treatment(
    "cataract-surgery",
    "Cataract surgery with premium lens (IOL)",
    "ophthalmology",
    "The cloudy natural lens of the eye is removed and replaced with a clear artificial lens.",
    {
      what: "Through a tiny cut, the cloudy lens is broken up with ultrasound (phacoemulsification) or with help from a femtosecond laser, and a folded artificial lens (IOL) is put in its place. Premium lenses can also correct astigmatism or give clear sight at more than one distance. Each eye takes about 15 to 30 minutes, under numbing drops.",
      who: "People whose cataract makes their sight cloudy, dim or glary enough to get in the way of daily life.",
      stay: usually("No hospital stay: it is a day procedure"),
      recovery: "Most people see well within a few days and return to light daily life within a week. Plan to stay in India for about a week after the first eye; the second eye is often done a few days later.",
      faq: [
        q(
          "Can both eyes be done on one trip?",
          "Usually yes. The second eye is often done a few days to a week after the first, once the first eye has been checked.",
        ),
        q(
          "Will I still need glasses?",
          "It depends on the lens you choose. Premium lenses can reduce the need for glasses; the surgeon explains the options after measuring your eyes.",
        ),
      ],
    },
  ),
  treatment(
    "lasik",
    "LASIK, Femto-LASIK and CLEAR laser vision correction",
    "ophthalmology",
    "A laser reshapes the clear front of the eye (the cornea) so that glasses or contact lenses are no longer needed.",
    {
      what: "The cornea is reshaped with a laser so light focuses correctly on the retina. In LASIK and bladeless Femto-LASIK a thin flap is lifted before the laser works; in CLEAR, a small piece of tissue is removed through a tiny keyhole without a flap. Both eyes are usually treated in the same session, which takes about 15 to 30 minutes, under numbing drops.",
      who: "Adults over 18 whose glasses power has been stable for at least a year, with healthy eyes and a cornea thick enough for the treatment. Detailed scans decide which method suits you.",
      stay: usually("No hospital stay: it is a day procedure"),
      recovery: "Most people see clearly within a day or two and return to work in a few days. Plan to stay in India for about a week for the follow-up checks.",
      faq: [
        q(
          "Is it painful?",
          "No. Numbing drops are used, and most people feel only light pressure. The eyes may feel gritty for a day or so afterwards.",
        ),
        q(
          "How do I know which laser method is right for me?",
          "The surgeon decides after scans of your cornea. Your reports from home help us give you a first opinion before you travel.",
        ),
      ],
    },
  ),
  treatment(
    "icl",
    "Implantable Collamer Lens (ICL)",
    "ophthalmology",
    "A thin lens is placed inside the eye to correct high glasses power, for people who cannot have laser treatment.",
    {
      what: "Through a tiny cut, a soft, thin lens is placed inside the eye in front of the natural lens. The natural lens is kept, and the ICL can be removed later if needed. Each eye takes about 20 to 30 minutes, under numbing drops.",
      who: "Adults with high short-sight or astigmatism, or a cornea that is too thin for LASIK.",
      stay: usually("No hospital stay: it is a day procedure"),
      recovery: "Sight usually improves within a day or two. Plan to stay in India for about a week for checks.",
      faq: [
        q(
          "Can I feel the lens in my eye?",
          "No. The lens sits inside the eye and cannot be felt once it is in place.",
        ),
      ],
    },
  ),
  treatment(
    "keratoconus-treatment",
    "Keratoconus treatment (corneal cross-linking)",
    "ophthalmology",
    "Treatment that stops a thinning, cone-shaped cornea from getting worse, and helps sight with special lenses.",
    {
      what: "In corneal cross-linking, vitamin B2 (riboflavin) drops are put on the eye and then a measured ultraviolet light is shone on it. This strengthens the cornea and stops the cone from getting steeper. Special contact lenses or a lens implant may then improve sight.",
      who: "Children and adults whose keratoconus is getting worse, seen on repeat corneal scans.",
      stay: usually("No hospital stay: it is a day procedure"),
      recovery: "The eye is sore for a few days while the surface heals. Plan to stay in India for about a week for checks.",
      faq: [
        q(
          "Will cross-linking bring back my sight?",
          "Its main aim is to stop keratoconus from getting worse. Sight is then helped with lenses; the doctor explains what to expect for your eye.",
        ),
      ],
    },
  ),
  treatment(
    "corneal-transplant",
    "Corneal transplant (keratoplasty)",
    "ophthalmology",
    "A damaged or scarred cornea is replaced, in full or in layers, with healthy donor tissue.",
    {
      what: "The damaged part of the cornea is removed and replaced with clear tissue from a donor eye. Depending on the problem, the whole thickness is replaced or only the front or back layers. Donor tissue comes from an approved eye bank.",
      who: "People with a scarred, cloudy or badly misshapen cornea, for example from infection, injury or advanced keratoconus.",
      stay: usually("Usually a day procedure or one night in hospital"),
      recovery: "Sight improves slowly over months. Plan to stay in India for about 2 to 3 weeks for close checks, and to use eye drops for a long time afterwards.",
      faq: [
        q(
          "Where does the donor cornea come from?",
          "From an eye bank. Corneal transplants in India can only be done at hospitals approved for them under Indian law.",
        ),
      ],
    },
  ),
  treatment(
    "glaucoma-treatment",
    "Glaucoma treatment",
    "ophthalmology",
    "Drops, laser or surgery to lower the pressure inside the eye and protect sight from glaucoma.",
    {
      what: "Glaucoma slowly damages the nerve at the back of the eye, usually because the pressure inside the eye is too high. Treatment lowers the pressure: first with eye drops, then with laser, and if needed with surgery that makes a new drainage path for the fluid in the eye.",
      who: "People diagnosed with glaucoma, or with high eye pressure that puts their sight at risk.",
      stay: usually("No hospital stay for laser; a day procedure or one night for surgery"),
      recovery: "Laser needs only a short rest. After surgery, plan to stay in India for about 2 weeks for checks.",
      faq: [
        q(
          "Can glaucoma damage be reversed?",
          "No. Sight already lost cannot be brought back, which is why treatment aims to protect the sight that remains.",
        ),
      ],
    },
  ),
  treatment(
    "vitreoretinal-surgery",
    "Retina and vitreo-retinal surgery",
    "ophthalmology",
    "Laser, injections or surgery for problems at the back of the eye, such as retinal detachment or diabetic eye disease.",
    {
      what: "Depending on the problem, the retina is treated with laser, with injections into the eye, or with vitrectomy: the gel inside the eye is removed so the surgeon can repair the retina. A detached retina is put back in place and held with gas or oil.",
      who: "People with a detached or torn retina, bleeding inside the eye, diabetic eye disease, a macular hole or age-related macular degeneration.",
      stay: usually("Usually a day procedure; sometimes one night in hospital"),
      recovery: "Recovery depends on the operation. After vitrectomy you may need to hold your head in one position for some days, and you cannot fly while there is gas in the eye. Plan to stay in India for about 2 to 3 weeks.",
      faq: [
        q(
          "When can I fly home?",
          "Not while a gas bubble is in the eye, which can take a few weeks. The surgeon tells you when it is safe.",
        ),
      ],
    },
  ),
  treatment(
    "squint-surgery",
    "Squint surgery and children's eye care",
    "ophthalmology",
    "Surgery on the eye muscles to straighten eyes that turn in, out, up or down, for children and adults.",
    {
      what: "The muscles that move the eye are tightened or loosened so the eyes line up. Children also have their sight checked for lazy eye and glasses before any surgery is planned.",
      who: "Children and adults with a squint that glasses or exercises have not corrected.",
      stay: usually("No hospital stay: it is a day procedure"),
      recovery: "The eye is red and sore for a week or two. Plan to stay in India for about a week.",
      faq: [
        q(
          "Is the operation done under general anaesthetic?",
          "For children, usually yes. Adults can sometimes have it under local anaesthetic.",
        ),
      ],
    },
  ),
  treatment(
    "oculoplastic-surgery",
    "Oculoplastic surgery",
    "ophthalmology",
    "Surgery for the eyelids, tear ducts and the bones around the eye.",
    {
      what: "Operations on the eyelids (such as a droopy lid or an eyelid that turns in or out), the tear drainage system (such as a blocked tear duct) and the eye socket, including removal of growths and reconstruction after injury.",
      who: "People with eyelid, tear duct or eye socket problems, for medical or cosmetic reasons.",
      stay: usually("Usually a day procedure"),
      recovery: "Swelling and bruising settle over 1 to 2 weeks. Plan to stay in India for about a week to 10 days, until stitches are removed.",
      faq: [
        q(
          "Will there be a visible scar?",
          "Cuts are usually hidden in the natural creases of the eyelid, so scars are hard to see once healed.",
        ),
      ],
    },
  ),

  // Dentistry
  treatment(
    "dental-implants",
    "Dental implants",
    "dentistry",
    "A titanium post is placed in the jaw to hold a new tooth where one is missing.",
    {
      what: "A small titanium post is placed in the jawbone under local anaesthetic. Once the bone has grown around it, a crown, bridge or denture is fixed on top. Some cases allow a temporary tooth on the same day.",
      who: "Adults with one or more missing teeth and enough healthy jawbone, or who can have a bone graft first.",
      stay: usually("No hospital stay: each visit is a clinic appointment"),
      recovery: "Most people return to normal life the next day. The bone takes about 3 to 6 months to heal around the implant, so treatment is often split over two trips, unless the dentist can fit the final tooth sooner.",
      faq: [
        q(
          "Can it be done in one trip?",
          "Sometimes. It depends on your bone and the type of implant. The dentist tells you after seeing your X-rays.",
        ),
      ],
    },
  ),
  treatment(
    "root-canal-treatment",
    "Root canal treatment",
    "dentistry",
    "The infected inside of a tooth is cleaned and sealed, so the tooth can be kept instead of pulled out.",
    {
      what: "Under local anaesthetic, the infected or damaged pulp inside the tooth is removed, the canals are cleaned and shaped, and then filled and sealed. A crown is often placed afterwards to protect the tooth.",
      who: "People with a badly decayed, cracked or infected tooth that causes pain or swelling.",
      stay: usually("No hospital stay: usually 1 to 3 clinic visits"),
      recovery: "The tooth may be tender for a few days. Most people go back to normal eating within a week.",
      faq: [
        q(
          "Is it painful?",
          "It is done under local anaesthetic, so it should feel much like a normal filling.",
        ),
      ],
    },
  ),
  treatment(
    "smile-design",
    "Smile design and cosmetic dentistry",
    "dentistry",
    "Veneers, whitening and tooth-coloured fillings to improve the look of your smile.",
    {
      what: "The dentist plans the shape, size and colour of your teeth, then uses veneers or laminates, whitening, tooth-coloured fillings or crowns to reach that look.",
      who: "People who want to change stained, chipped, uneven or gapped teeth.",
      stay: usually("No hospital stay: usually a few clinic visits over 1 to 2 weeks"),
      recovery: "No recovery time for most treatments. Teeth may feel sensitive for a few days.",
      faq: [
        q(
          "How long do veneers last?",
          "Porcelain veneers usually last 10 years or more with good care.",
        ),
      ],
    },
  ),
  treatment(
    "full-mouth-rehabilitation",
    "Full mouth rehabilitation",
    "dentistry",
    "A planned set of treatments that rebuilds all the teeth when many are worn, broken or missing.",
    {
      what: "A mix of crowns, bridges, implants, root canal treatment and gum care is planned together to rebuild the bite and the look of the teeth.",
      who: "People with many damaged or missing teeth, a worn-down bite, or problems from several old treatments.",
      stay: usually("No hospital stay: a series of clinic visits"),
      recovery: "It depends on the plan. Some work can be done in one trip of 1 to 2 weeks; plans with implants may need a second trip.",
      faq: [
        q(
          "How many trips will I need?",
          "The dentist sets the plan after seeing your X-rays and tells you how many visits are needed.",
        ),
      ],
    },
  ),
  treatment(
    "braces-aligners",
    "Braces and clear aligners",
    "dentistry",
    "Braces or clear aligners that slowly move teeth into a straighter position.",
    {
      what: "Fixed braces or removable clear aligners apply gentle pressure to move teeth over months. The dentist takes scans or moulds and plans each step.",
      who: "Children and adults with crooked, crowded or gapped teeth, or a bite that does not meet properly.",
      stay: usually("No hospital stay: clinic visits"),
      recovery: "Treatment usually takes 6 to 24 months. With aligners, most checks can be done from home after the first visit.",
      faq: [
        q(
          "Can I be treated if I live abroad?",
          "Often yes with clear aligners: the first visit is in person, and later sets of aligners can be sent to you.",
        ),
      ],
    },
  ),
];
