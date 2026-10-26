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
const privacyUpdated = { label: "Last updated", value: "26 October 2026" };
const privacyEffective = { label: "Effective date", value: "1 October 2026" };
const website = "https://medsafar.com";

export const privacy: LegalContent = {
  meta: {
    title: "Privacy policy. Medsafar India.",
    description: "How Medsafar India collects, uses and protects personal and medical information.",
  },
  heading: "Privacy policy",
  intro:
    "This policy explains how Medsafar India collects, uses, stores, shares and protects personal information, including medical information, when you use our website or services.",
  effective: privacyEffective,
  updated: privacyUpdated,
  sections: [
    {
      heading: "1. Introduction",
      body: [
        "Medsafar India (\"Medsafar\", \"we\", \"our\" or \"us\") is committed to protecting the privacy, confidentiality and security of the personal information of individuals who visit our website, submit enquiries, register with us, or use our medical tourism facilitation and patient coordination services.",
        "This Privacy Policy explains how we collect, use, store, process, disclose and protect personal information, including sensitive medical information, in connection with our website and services.",
        "Medsafar India facilitates access to healthcare services by coordinating with hospitals, doctors, diagnostic centres and other relevant service providers. We understand the confidential nature of medical information and are committed to handling it responsibly and transparently.",
        "This Privacy Policy applies to website visitors, prospective patients, registered patients, their attendants or authorised representatives, and other individuals who interact with our services.",
        "Our handling of personal information is subject to applicable Indian laws, including the Digital Personal Data Protection Act, 2023, to the extent applicable and in force, the Information Technology Act, 2000, and applicable rules and regulations.",
      ],
    },
    {
      heading: "2. Information We Collect",
      body: [
        "Personal and Contact Information: Full name and title; email address; mobile and WhatsApp number; country of residence and nationality, where required; age or date of birth; gender, where relevant to the services requested; residential or correspondence address; and preferred language and communication preferences.",
        "Medical and Health Information: Medical history and details of existing health conditions; symptoms and treatment requirements; medical reports, laboratory results and diagnostic scans; prescriptions and doctors’ notes; details of previous consultations, surgeries or treatments; photographs or other medical records, where relevant and voluntarily provided; and information required by a hospital or treating doctor to evaluate a treatment request.",
        "We request medical information only when reasonably necessary for the services being sought and handle it with appropriate confidentiality safeguards.",
        "Travel and Accommodation Information: Passport details and other travel documents, where necessary; travel dates and itinerary preferences; flight and accommodation preferences; details of accompanying family members or attendants; visa-related information; and special assistance or accessibility requirements relevant to the journey.",
        "Website and Technical Information: Internet Protocol (IP) address; browser type and operating system; device and technical identifiers; pages visited and time spent on the website; referring website or source; website usage patterns and diagnostic information; and cookie identifiers and similar tracking information, where enabled.",
        "Communication and Enquiry Information: Records of enquiries and communications made through our website, email, telephone, WhatsApp or other communication channels, including messages, appointment requests, service preferences and related correspondence. Calls may be recorded for quality assurance, training, security or documentation purposes, where applicable and with appropriate notice or consent.",
        "Information About Attendants or Representatives: Where a patient provides details of an attendant, family member or authorised representative, we may process that person’s contact information to coordinate appointments, travel or other requested services. The person providing such information should have the appropriate authority to share it.",
      ],
    },
    {
      heading: "3. How We Collect Information",
      body: [
        "We may collect information directly from you through website forms, registration forms, telephone calls, emails or messaging platforms.",
        "We may collect information when you voluntarily share medical records or travel documents with us, from your authorised representative or attendant, or from hospitals, doctors or other service providers involved in coordinating your requested services, where lawfully permitted.",
        "We may also collect information automatically through cookies, analytics tools and website technologies, or from other lawful sources where necessary to provide the requested services or meet legal obligations.",
        "Where consent is required, we will seek it in the applicable manner before processing the relevant information.",
      ],
    },
    {
      heading: "4. Purposes for Which We Use Your Information",
      body: [
        "To respond to enquiries and understand your healthcare requirements.",
        "To coordinate consultations, treatment evaluations, appointments and related services.",
        "To share relevant medical information with hospitals, doctors, diagnostic centres and other healthcare providers selected for your treatment coordination.",
        "To facilitate travel, accommodation, airport transfers and attendant arrangements, where requested.",
        "To communicate appointment confirmations, treatment updates, service information and travel arrangements.",
        "To provide customer support and respond to complaints or requests.",
        "To maintain internal records, improve service quality and administer our website.",
        "To prevent fraud, protect security and investigate misuse of our services.",
        "To comply with applicable legal, regulatory, accounting or reporting requirements.",
        "To send promotional communications, newsletters or educational content where the required consent has been obtained.",
        "To conduct aggregated or de-identified analysis to understand service usage and improve our offerings.",
        "We will not use your medical information for unrelated marketing purposes without the appropriate lawful basis and consent, where required.",
      ],
    },
    {
      heading: "5. Consent and Lawful Processing",
      body: [
        "We process personal information on applicable lawful grounds, which may include your consent, where required by law; processing necessary to provide services that you have requested or agreed to receive, where legally permitted; compliance with applicable legal obligations; and other lawful grounds available under applicable legislation.",
        "Where we rely on consent, you may withdraw it subject to applicable law. Withdrawal of consent will not affect the lawfulness of processing undertaken before withdrawal.",
        "If you choose not to provide information necessary for a requested service, we may be unable to coordinate certain consultations, treatment evaluations or travel arrangements.",
      ],
    },
    {
      heading: "6. Sharing and Disclosure of Information",
      body: [
        "We do not sell your personal or medical information.",
        "Hospitals, treating doctors, specialists, diagnostic laboratories and other healthcare providers involved in evaluating or coordinating your requested treatment.",
        "Airlines, travel agencies, visa assistance providers, hotels, transport operators and other relevant service providers, where required to arrange travel or accommodation.",
        "Website hosting providers, information technology vendors, CRM platforms, cloud storage providers, communication services and other vendors who support our operations.",
        "Government authorities, courts, regulators or law enforcement agencies where disclosure is required or permitted under applicable law.",
        "Your authorised attendant, family member, representative or another person where you have authorised disclosure or where disclosure is otherwise lawful.",
        "We seek to limit disclosures to information reasonably necessary for the relevant purpose. Third-party service providers may process information under their own privacy policies and contractual obligations, as applicable.",
      ],
    },
    {
      heading: "7. International Transfers of Information",
      body: [
        "Medsafar India may coordinate treatment for patients residing in India or other countries. Accordingly, relevant personal or medical information may need to be shared with healthcare providers or service partners located in India or abroad.",
        "Any cross-border transfer or processing of personal information will be undertaken subject to applicable Indian law, including any restrictions or conditions imposed by the relevant authorities, and other applicable legal requirements.",
        "We take reasonable steps to ensure that information is shared only with appropriate recipients for legitimate service-related purposes.",
      ],
    },
    {
      heading: "8. Cookies and Similar Technologies",
      body: [
        "Our website may use cookies and similar technologies to ensure proper website functionality; remember preferences and improve user experience; understand website traffic and usage patterns; identify technical issues and improve performance; and support analytics and, where applicable, consent-based marketing activities.",
        "You may manage or disable cookies through your browser settings. Some website features may not function properly if certain cookies are disabled.",
        "Where required, we will obtain consent before using non-essential cookies or similar technologies.",
      ],
    },
    {
      heading: "9. Data Security",
      body: [
        "We implement reasonable technical, organisational and administrative safeguards designed to protect personal information against unauthorised access, disclosure, alteration, loss or misuse.",
        "Depending on the nature of the information and the systems used, safeguards may include access restrictions and role-based permissions; secure data transmission and encryption where appropriate; password protection and account security controls; confidentiality requirements for employees and relevant service providers; security monitoring, backups and incident response procedures; and periodic review of data-handling practices.",
        "However, no website, electronic transmission or storage system can be guaranteed to be completely secure. We cannot guarantee absolute security, but we will take appropriate steps to address security incidents in accordance with applicable law.",
      ],
    },
    {
      heading: "10. Data Retention and Deletion",
      body: [
        "We retain personal information only for as long as reasonably necessary to fulfil the purposes described in this Policy, provide requested services, maintain required records, resolve disputes, protect legitimate interests or comply with applicable legal obligations.",
        "Retention periods may vary depending on the type of information and the nature of the services provided.",
        "When information is no longer required, we will take appropriate steps to delete it or anonymise it, subject to applicable legal requirements and any legitimate need to retain it.",
        "You may request deletion of your personal information, subject to applicable law. Certain information may need to be retained where required by law or for the establishment, exercise or defence of legal claims.",
      ],
    },
    {
      heading: "11. Your Privacy Rights",
      body: [
        "Subject to applicable law, you may have the right to request information about the personal data we process about you; request correction or updating of inaccurate or incomplete information; request erasure of personal information where legally permissible; withdraw consent for processing where processing is based on consent; raise a grievance regarding the handling of your personal information; nominate another individual to exercise applicable rights in the event of death or incapacity, where provided by law; and exercise any other rights available under applicable data protection legislation.",
        "To exercise your rights, please contact us using the details provided in the Contact Us section below. We may need to verify your identity before acting on your request.",
      ],
    },
    {
      heading: "12. Marketing Communications",
      body: [
        "We may send information about our services, healthcare programmes, patient assistance services, events or educational content where permitted by applicable law and where the necessary consent has been obtained.",
        "You may opt out of promotional communications at any time by following the unsubscribe instructions in the communication or contacting us directly.",
        "Even if you opt out of marketing, we may continue to send essential service-related communications, such as appointment information or updates concerning a request you have made.",
      ],
    },
    {
      heading: "13. Third-Party Websites and Services",
      body: "Our website may contain links to external websites, hospital websites, booking platforms or other third-party services. These websites and services may operate under their own privacy policies and terms. Medsafar India does not control the privacy practices of independent third parties and encourages you to review their policies before sharing personal information.",
    },
    {
      heading: "14. Medical Disclaimer and Role of Medsafar India",
      body: [
        "Medsafar India acts as a medical tourism facilitator and patient coordination service. Unless expressly stated otherwise in a separate written agreement, we do not independently diagnose medical conditions, prescribe medication or provide medical treatment.",
        "Medical assessments, diagnoses, treatment recommendations and clinical decisions are the responsibility of the relevant qualified healthcare professionals and healthcare institutions.",
        "Sharing medical information with us does not by itself establish a doctor-patient relationship with Medsafar India.",
      ],
    },
    {
      heading: "15. Children’s Privacy",
      body: [
        "Our services may occasionally involve medical or travel coordination for individuals under the age of 18.",
        "Where personal information relates to a child, we will handle it in accordance with applicable law and obtain verifiable parental or lawful guardian consent where required.",
        "We do not knowingly collect children’s personal information for unrelated purposes or use it for targeted advertising where prohibited by law.",
      ],
    },
    {
      heading: "16. Changes to This Privacy Policy",
      body: [
        "We may update this Privacy Policy from time to time to reflect changes in our services, technology, business practices or applicable legal requirements.",
        "The revised version will be published on our website with an updated “Last Updated” date. Where required by law, we will provide additional notice or obtain consent for material changes.",
        "We encourage you to review this page periodically.",
      ],
    },
    {
      heading: "17. Contact Us and Grievance Redressal",
      body: [
        "If you have any questions, concerns or requests regarding this Privacy Policy or the handling of your personal information, please contact us:",
        "Medsafar India",
        `Email: ${email}`,
        `Website: ${website}`,
        `Registered Office: ${office}`,
        "Privacy and Grievance Contact: Medsafar India Privacy Team",
        "We will review and respond to privacy-related requests or grievances within the timelines prescribed by applicable law.",
      ],
    },
    {
      heading: "Our Commitment to Patients",
      body: "At Medsafar India, we recognise that medical information is deeply personal. We are committed to treating patient information with care, confidentiality and respect, and to using it responsibly for healthcare facilitation and related services.",
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
