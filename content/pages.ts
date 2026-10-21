import type { AboutContent, ContactContent, LegalContent } from "./types";
import { site } from "./site";
import { emailHref, phoneHref, whatsappHref } from "@/lib/contact";

/**
 * Text for About, Contact, Privacy and Terms. Shared pages: one copy for
 * every country.
 *
 * About is written from Medsafar's own brochure. Privacy and Terms are drafts
 * for Medsafar to review; a lawyer has not signed them off yet.
 */

const { registeredAddress, gstin } = site.company;
const office = registeredAddress ?? "Mumbai, India";
const email = site.contact.email;
const phone = site.contact.phone.display;

export const about: AboutContent = {
  meta: {
    title: "About Medsafar India.",
    description:
      "Medsafar connects patients outside India with experienced doctors and multi-speciality hospitals in India, and arranges the travel around their treatment.",
  },
  eyebrow: "About",
  heading: "Good treatment in India, without the hassle.",
  intro:
    "Medsafar is a medical travel facilitator. It is not a hospital and does not provide medical treatment.",
  who: {
    heading: "Who we are",
    body: [
      "Medsafar helps people who live outside India get high-quality medical care in India at a fair price. We connect each patient with experienced doctors, surgeons and multi-speciality hospitals, and we take care of everything around the treatment so the patient and their family can focus on getting better.",
      "Medsafar India is a division of Travgrub Private Limited, a travel company based in Mumbai. That is why we handle the travel side ourselves: the visa invitation, flights, airport pickup and a place to stay.",
    ],
  },
  stats: {
    hospitals: "Partner hospitals",
    treatments: "Treatments",
    specialities: "Specialities",
  },
  glance: {
    heading: "At a glance",
    items: [
      { label: "Founded", value: "2026" },
      { label: "Based in", value: "Mumbai, India" },
      { label: "Part of", value: "Travgrub Private Limited" },
      { label: "Your main contact", value: "Vicky Prabhu, founder and CEO" },
    ],
  },
  founder: {
    eyebrow: "Meet the founder",
    name: "Vicky Prabhu",
    role: "Founder and CEO, Medsafar India",
    picture: {
      src: "/photos/about/vicky-prabhu.jpg",
      alt: "Vicky Prabhu, founder and CEO of Medsafar",
      pending: false,
      focus: "50% 15%",
    },
    quote: {
      text: "Medsafar exists to turn my lifelong desire to serve humanity into action: helping patients find the care they need, and bringing hope to families in their most difficult moments.",
    },
    story: {
      heading: "Why I started Medsafar",
      body: [
        "I have always wanted to do something meaningful for people. My years with Rotary showed me that even a small act of kindness can make a real difference in someone's life.",
        "Running Travgrub taught me that travel is about people, not tickets. Visa help, an airport pickup, a place to stay, someone to call when you need help: small details that bring real peace of mind in a country you do not know.",
        "When someone falls seriously ill, the whole family carries the fear. Medsafar puts my travel experience to its most meaningful use: standing beside patients and their families, so they never feel alone.",
      ],
    },
    contact: {
      body: "Medsafar is small on purpose. Vicky looks after every patient himself, from the first message to the follow-up at home.",
      label: "Message Vicky on WhatsApp",
    },
  },
  mission: {
    heading: "What we are here for",
    items: [
      {
        title: "Our mission",
        body: "Help patients find the right care in India, and bring hope to their families, one patient at a time.",
      },
      {
        title: "Our vision",
        body: "To be a trusted name for patients from Africa, the Middle East, the CIS region and South Asia, without losing the personal touch.",
      },
      {
        title: "Giving back",
        body: "As Medsafar grows, a set part of its income will help patients who cannot afford the treatment they need, with clear rules on who qualifies.",
      },
    ],
  },
  values: {
    heading: "Our promise to every family",
    intro: "Sending someone you love abroad for treatment is frightening. Here is what you can count on.",
    items: [
      {
        title: "You are not a case",
        body: "You are a family trusting us at one of the hardest moments of your life. We take that trust seriously.",
      },
      {
        title: "Honest, always",
        body: "No one can promise a medical result. We promise honesty, care and clear information, so you can decide with confidence.",
      },
      {
        title: "You are never alone",
        body: "Hospitals, specialists, travel and a place to stay, arranged for you, with someone to turn to at every step.",
      },
    ],
  },
  does: {
    heading: "What Medsafar does",
    items: [
      "Sends your reports to an experienced doctor at a partner hospital",
      "Brings back a treatment plan made for your case, with a written estimate from the hospital",
      "Gives you a local coordinator in India, reachable at any hour",
      "Arranges the visa invitation, flights, airport pickup and a place to stay",
      "Deals with your insurer if your treatment is covered",
      "Keeps your details and reports confidential",
      "Explains every cost before you agree to it",
    ],
  },
  doesNot: {
    heading: "What Medsafar does not do",
    items: [
      "Give medical treatment or medical advice",
      "Decide your treatment. That is between you and the doctor",
      "Set the cost of treatment. The estimate comes from the treating hospital",
    ],
  },
  selection: {
    heading: "How doctors and hospitals are chosen",
    body: "We work only with doctors and surgeons who have more than 15 years of experience, at multi-speciality hospitals in India. Your case goes to a specialist in your condition, who reads your reports before anything is planned.",
  },
  legal: {
    heading: "Legal name",
    name: site.footer.legalName,
    body: `Registered office: ${office}. GSTIN ${gstin}.`,
  },
};

export const contact: ContactContent = {
  meta: {
    title: "Contact Medsafar India.",
    description:
      "Start a free treatment plan, or reach Medsafar on WhatsApp, by phone or by email.",
  },
  eyebrow: "Contact",
  heading: "Tell us what you need.",
  intro:
    "Send us your details and reports. A case manager replies on WhatsApp or by call, and a specialist in India reviews your case for free.",
  details: {
    heading: "Talk to us directly",
    intro: "Every message reaches a real case manager, not a call centre.",
    items: [
      { label: "WhatsApp", value: site.contact.whatsapp.display, href: whatsappHref, hint: "Quickest reply" },
      { label: "Phone", value: phone, href: phoneHref, hint: "Call us any time" },
      { label: "Email", value: email, href: emailHref, hint: "Good for sending reports" },
      {
        label: "Office",
        value: office,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("NEO Corporate Plaza, Ramchandra Lane, Mumbai 400064")}`,
        hint: "Visits by appointment",
      },
    ],
  },
  follow: "Follow Medsafar",
  form: {
    heading: "Get your free treatment plan",
    intro: "It takes a minute. No cost and no obligation.",
  },
  steps: {
    heading: "What happens next",
    items: [
      {
        title: "We call you back",
        body: "A case manager gets in touch, listens to what you need and asks for any reports you have.",
      },
      {
        title: "A specialist reviews your case",
        body: "An experienced doctor at a partner hospital reads your reports and suggests a plan, with a written cost estimate.",
      },
      {
        title: "We arrange the trip",
        body: "Once you decide, we sort out the visa invitation, flights, airport pickup, stay and a coordinator in India.",
      },
    ],
  },
  why: {
    heading: "Why patients choose Medsafar",
    items: [
      {
        title: "Senior doctors only",
        body: "Your case goes to a specialist with more than 15 years of experience, at a multi-speciality hospital.",
      },
      {
        title: "Clear costs, up front",
        body: "The estimate comes in writing from the hospital. You see every cost before you agree to anything.",
      },
      {
        title: "One team, start to finish",
        body: "From the first message to your follow-up at home, one case manager looks after you and your family.",
      },
    ],
  },
  faq: {
    heading: "Before you get in touch",
    items: [
      {
        question: "Do I pay anything to get a treatment plan?",
        answer:
          "No. The doctor's opinion, the treatment plan and the cost estimate are free, and you are under no obligation to go ahead.",
      },
      {
        question: "How long will I need to stay in India?",
        answer:
          "It depends on the treatment. Tests and small procedures can take a few days. Bigger operations, such as a joint replacement, usually mean two to three weeks, including time to recover before you fly home. Your plan gives a likely length of stay.",
      },
      {
        question: "Can someone come with me?",
        answer:
          "Yes, and we recommend it. A relative or friend can travel as your attendant. We include them in the visa invitation and find a room for them close to the hospital.",
      },
      {
        question: "How do I pay for treatment?",
        answer:
          "You pay the hospital directly, against its written estimate. Some hospitals ask for a small deposit to book your admission, with the rest settled when you arrive. Nothing is hidden, and we explain every amount first.",
      },
      {
        question: "What happens after I go home?",
        answer:
          "We stay in touch. We set up follow-up calls with your doctor, pass on your reports, and help with anything you need while you recover.",
      },
    ],
  },
};

const updated = { label: "Last updated", value: "1 October 2026" };

export const privacy: LegalContent = {
  meta: {
    title: "Privacy. Medsafar India.",
    description: "How Medsafar handles your details and medical reports.",
  },
  heading: "Privacy",
  intro:
    "This policy explains what Medsafar collects when you ask for help, why, who sees it and what you can ask us to do with it.",
  updated,
  sections: [
    {
      heading: "Who we are",
      body: `Medsafar India is a division of Travgrub Private Limited, registered office ${office}. We decide how your personal data is used, so under India's Digital Personal Data Protection Act, 2023 we are responsible for it.`,
    },
    {
      heading: "What we collect",
      body: [
        "What you give us: your mobile number, name, email, the country you live in, the treatment you need, when you want to travel, anything you write to the doctor, and any medical reports you upload or send us.",
        "If you go ahead with treatment, we also collect what the hospital and the visa need: your passport details, your travel dates, and the names of anyone travelling with you.",
        "What we collect automatically: a scrambled code made from your internet address, kept only to stop the enquiry form being misused. It cannot be turned back into the address. We also count visits to the site, without cookies and without identifying you.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        "To answer your enquiry, get a doctor's opinion and a written estimate, and arrange your treatment, visa, travel, stay and follow-up care.",
        "To contact you about your case by WhatsApp, phone or email.",
        "To keep the site working and safe, and to meet our legal duties.",
        "We do not sell your data, and we use your medical reports only for your own care.",
      ],
    },
    {
      heading: "Your consent",
      body: "When you send the enquiry form you agree that we may use your details and share your reports with partner hospitals and doctors in India to prepare your treatment plan. You can withdraw that consent at any time by writing to us. It does not undo what is already done, but we stop from then on.",
    },
    {
      heading: "Medical reports",
      body: "Health information is the most sensitive data you give us. Only the people working on your case see it: our case managers and the doctors and hospitals asked to plan your treatment. We store reports with our hosting provider, Cloudflare, under strict access control.",
    },
    {
      heading: "Who we share it with",
      body: [
        "Partner hospitals and doctors in India, to plan and give your treatment.",
        "Airlines, hotels and visa services, only what they need to book your travel and stay. Travel may be booked through Travgrub Private Limited, our parent company.",
        "Your insurer, if you ask us to deal with them for you.",
        "Companies that run services for us, such as hosting (Cloudflare), messaging (WhatsApp) and email, under their own privacy duties.",
        "Government authorities, when the law requires it.",
      ],
    },
    {
      heading: "Data outside India",
      body: "Our hosting and messaging providers may store data on servers outside India. We use only providers that protect it to the standard Indian law requires.",
    },
    {
      heading: "How long we keep it",
      body: "If your enquiry does not go ahead, we delete your details and reports 24 months after your last contact with us. If you are treated, we keep your records for as long as the law requires, and then delete them.",
    },
    {
      heading: "Your rights",
      body: [
        "You can ask us for a summary of the data we hold about you and who we have shared it with, ask us to correct or complete it, ask us to delete it, and withdraw your consent.",
        "You can name someone to use these rights for you if you die or cannot act yourself.",
        "To use any of these rights, write to us at the address below. We reply within 30 days.",
      ],
    },
    {
      heading: "Children",
      body: "If the patient is under 18, a parent or legal guardian must send the enquiry and give consent for them.",
    },
    {
      heading: "Complaints",
      body: `Write first to our Grievance Officer at ${email}, with "Privacy" in the subject line. If you are not satisfied with our answer, you can complain to the Data Protection Board of India.`,
    },
    {
      heading: "Changes to this policy",
      body: "If we change this policy, we put the new version on this page and change the date at the top. If a change affects how we use data you have already given us, we tell you first.",
    },
    {
      heading: "Contact",
      body: `Medsafar India, ${office}. Email ${email}. Phone or WhatsApp ${phone}.`,
    },
  ],
};

export const terms: LegalContent = {
  meta: {
    title: "Terms. Medsafar India.",
    description: "The terms for using Medsafar and this website.",
  },
  heading: "Terms",
  intro:
    "These terms apply when you use this website or ask Medsafar to arrange treatment. Please read them before you travel.",
  updated,
  sections: [
    {
      heading: "What Medsafar is",
      body: `Medsafar India is a division of Travgrub Private Limited, registered office ${office}, GSTIN ${gstin}. We are a medical travel facilitator. We connect you with hospitals and doctors in India and arrange the travel around your treatment. We are not a hospital, we do not give medical treatment, and nothing we say is medical advice.`,
    },
    {
      heading: "Treatment plans and estimates",
      body: [
        "The treatment plan and the cost estimate come from the hospital, after its doctor has read your reports. They are not final. The doctor may change the plan after examining you in person, and the cost can change with it.",
        "The treatment plan and estimate are free, and asking for them does not commit you to anything.",
      ],
    },
    {
      heading: "Hospitals and doctors",
      body: "Hospitals and doctors are independent of Medsafar. They alone decide on and give your treatment, and they are responsible for it. No doctor or hospital can promise a result, and neither can we.",
    },
    {
      heading: "Payments",
      body: [
        "You pay the hospital directly for treatment. Travel, stay and other services are paid as agreed with you in writing.",
        "If Medsafar charges you for its own services, we tell you the amount in writing before you agree to it. Partner hospitals may also pay us a fee; this does not change the price the hospital quotes you.",
      ],
    },
    {
      heading: "Cancellations and refunds",
      body: "Hospitals, airlines and hotels each have their own cancellation and refund rules, and these apply to what you book with them. We tell you those rules before you book. Any refund of Medsafar's own charges follows what we agreed with you in writing.",
    },
    {
      heading: "Visa and travel",
      body: "We prepare the hospital invitation letter and help with your medical visa application. The Government of India decides whether a visa is granted, and we cannot guarantee it. You are responsible for a valid passport and for following India's entry rules. We recommend travel insurance.",
    },
    {
      heading: "Insurance",
      body: "If your treatment is covered by insurance, we can deal with your insurer for you. Your insurer decides what is covered, not us or the hospital.",
    },
    {
      heading: "What we ask of you",
      body: "Give us complete and true information about your health, and send all the reports you have. A plan made from incomplete information may have to change. Follow your doctor's advice before, during and after treatment.",
    },
    {
      heading: "Using this website",
      body: "The information on this website is general. It is not medical advice and does not replace a doctor. Do not misuse the site or the enquiry form. The text, design and logo belong to Travgrub Private Limited.",
    },
    {
      heading: "Our liability",
      body: "As far as the law allows, Medsafar is not liable for the medical care given by hospitals or doctors, or for delays and losses caused by airlines, hotels, visa decisions or events outside our control. Where we are liable, our liability is limited to the amount you paid Medsafar for its own services. Nothing in these terms limits a right you have under Indian consumer law.",
    },
    {
      heading: "Governing law",
      body: "These terms are governed by the laws of India. Any dispute goes to the courts of Mumbai.",
    },
    {
      heading: "Contact",
      body: `Questions about these terms: ${email}, or phone and WhatsApp ${phone}.`,
    },
  ],
};

export const disclaimer: LegalContent = {
  meta: {
    title: "Medical disclaimer. Medsafar India.",
    description: "What the information on this website is, and what it is not.",
  },
  heading: "Medical disclaimer",
  intro:
    "The information on this website helps you understand your options. It is not medical advice and does not replace a doctor.",
  updated,
  sections: [
    {
      heading: "Not medical advice",
      body: "Everything on this website is general information. It cannot take account of your health, your reports or your history. Only a doctor who has examined you can tell you what treatment is right for you.",
    },
    {
      heading: "Medsafar is not a hospital",
      body: "Medsafar is a medical travel facilitator. We do not diagnose, treat or prescribe. Hospitals and doctors are independent of us, and they alone decide on and give your treatment.",
    },
    {
      heading: "Results differ from person to person",
      body: "Recovery times, hospital stays and results described on this website are typical, not promised. Every patient is different, and every treatment carries risks. Your doctor explains them before you agree to anything.",
    },
    {
      heading: "Doctor profiles",
      body: "Doctor profiles are taken from the profiles their hospitals supply. They describe a doctor's training and experience; they do not promise that a particular doctor will treat you. Your doctor is chosen for your case once a specialist has read your reports.",
    },
    {
      heading: "In an emergency",
      body: "If you need urgent care, go to your nearest hospital or call your local emergency number. Do not wait for a reply from us.",
    },
    {
      heading: "Questions",
      body: `If anything on this website is unclear or looks wrong, tell us at ${email}.`,
    },
  ],
};

export const editorialPolicy: LegalContent = {
  meta: {
    title: "Editorial policy. Medsafar India.",
    description: "How Medsafar writes, checks and updates the information on this website.",
  },
  heading: "Editorial policy",
  intro:
    "Patients make big decisions based on what they read. This is how we make sure what we publish is clear, fair and correct.",
  updated,
  sections: [
    {
      heading: "Plain words",
      body: "We write for patients and families, many of whom read English as a second language. We use short sentences and common words, and we explain any medical term we cannot avoid.",
    },
    {
      heading: "Checked by a doctor",
      body: "Anything medical, such as what a treatment is, who needs it and how long recovery takes, is checked by a doctor before it is published. Until then it is marked as a draft on the page.",
    },
    {
      heading: "Sources",
      body: "Articles name the sources their facts come from: medical bodies, hospitals and published research. Doctor and hospital details come from the hospitals themselves.",
    },
    {
      heading: "No promises",
      body: "We do not promise results, quote prices that are not in writing from a hospital, or say one doctor or hospital is the best. Cost estimates always come from the treating hospital, for your case.",
    },
    {
      heading: "Independence",
      body: "Partner hospitals may pay Medsafar a fee. That does not change what we write about a treatment, and it does not change the price the hospital quotes you.",
    },
    {
      heading: "Keeping it up to date",
      body: "We review our pages regularly and when medical advice changes. Each policy page shows the date it was last updated.",
    },
    {
      heading: "Corrections",
      body: `If you find a mistake, write to ${email}. We check it and correct the page as soon as we can.`,
    },
  ],
};

export const cancellations: LegalContent = {
  meta: {
    title: "Cancellations and refunds. Medsafar India.",
    description: "What happens if you change or cancel your plans.",
  },
  heading: "Cancellations and refunds",
  intro:
    "Plans change, sometimes for medical reasons. This page explains who to talk to and what happens to money already paid.",
  updated,
  sections: [
    {
      heading: "Treatment plans cost nothing",
      body: "The doctor's opinion, the treatment plan and the cost estimate are free. You can stop at any point before you travel without paying Medsafar anything.",
    },
    {
      heading: "Hospital deposits",
      body: "Some hospitals ask for a deposit to book your admission. You pay it to the hospital, and the hospital's own rules decide whether and how it is refunded. We give you those rules in writing before you pay.",
    },
    {
      heading: "Flights, hotels and visas",
      body: "Airlines and hotels each have their own cancellation rules, and these apply to what is booked with them. We tell you the rules before we book. Visa fees paid to the Government of India are not refundable.",
    },
    {
      heading: "Medsafar's own charges",
      body: "If Medsafar charges you for its own services, we agree the amount and the refund terms with you in writing before you pay. Any refund follows what we agreed.",
    },
    {
      heading: "If the doctor changes the plan",
      body: "After examining you in India, the doctor may advise a different treatment or decide that treatment is not right for you. If that happens, we help you understand your options and settle any refund with the hospital.",
    },
    {
      heading: "How to cancel",
      body: `Tell your case manager, or write to ${email} or WhatsApp ${phone}. We confirm in writing and contact the hospital, airline and hotel for you.`,
    },
  ],
};
