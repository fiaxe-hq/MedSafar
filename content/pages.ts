import type { AboutContent, ContactContent, LegalContent } from "./types";
import { site } from "./site";
import { contactLinks } from "@/lib/contact";

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
const links = contactLinks(site.contact);

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
      src: "/photos/about/vicky-prabhu-headroom.jpg",
      alt: "Vicky Prabhu, founder and CEO of Medsafar",
      pending: false,
      focus: "50% 0%",
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
      { label: "WhatsApp", value: site.contact.whatsapp.display, href: links.whatsapp, hint: "Quickest reply" },
      { label: "Phone", value: phone, href: links.phone, hint: "Call us any time" },
      { label: "Email", value: email, href: links.email, hint: "Good for sending reports" },
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

const privacyUpdated = { label: "Last updated", value: "12 November 2026" };
const privacyEffective = { label: "Effective date", value: "12 November 2026" };
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
        "Med Safar India (“Med Safar”, “we”, “our” or “us”) is committed to protecting the privacy, confidentiality and security of the personal information of individuals who visit our website, submit enquiries, register with us, or use our medical tourism facilitation and patient coordination services.",
        "This Privacy Policy explains how we collect, use, store, process, disclose and protect personal information, including sensitive medical information, in connection with our website and services.",
        "Med Safar India facilitates access to healthcare services by coordinating with hospitals, doctors, diagnostic centres and other relevant service providers. We understand the confidential nature of medical information and are committed to handling it responsibly and transparently.",
        "This Privacy Policy applies to website visitors, prospective patients, registered patients, their attendants or authorised representatives, and other individuals who interact with our services.",
        "Our handling of personal information is subject to applicable Indian laws, including the Digital Personal Data Protection Act, 2023, to the extent applicable and in force, the Information Technology Act, 2000, and applicable rules and regulations.",
      ],
    },
    {
      heading: "2. Information We Collect",
      body: [
        "Depending on the services requested and your interaction with us, we may collect the following categories of information.",
        "A. Personal and Contact Information",
        "• Full name and title",
        "• Email address",
        "• Mobile and WhatsApp number",
        "• Country of residence and nationality, where required",
        "• Age or date of birth",
        "• Gender, where relevant to the services requested",
        "• Residential or correspondence address",
        "• Preferred language and communication preferences",
        "B. Medical and Health Information",
        "To facilitate appropriate medical consultations and treatment coordination, we may collect information such as:",
        "• Medical history and details of existing health conditions",
        "• Symptoms and treatment requirements",
        "• Medical reports, laboratory results and diagnostic scans",
        "• Prescriptions and doctors’ notes",
        "• Details of previous consultations, surgeries or treatments",
        "• Photographs or other medical records, where relevant and voluntarily provided",
        "• Information required by a hospital or treating doctor to evaluate a treatment request",
        "We request medical information only when reasonably necessary for the services being sought and handle it with appropriate confidentiality safeguards.",
        "C. Travel and Accommodation Information",
        "Where travel assistance is requested, we may collect:",
        "• Passport details and other travel documents, where necessary",
        "• Travel dates and itinerary preferences",
        "• Flight and accommodation preferences",
        "• Details of accompanying family members or attendants",
        "• Visa-related information, where required for travel coordination",
        "• Special assistance or accessibility requirements relevant to the journey",
        "D. Website and Technical Information",
        "When you visit our website, certain technical information may be collected automatically, including:",
        "• Internet Protocol (IP) address",
        "• Browser type and operating system",
        "• Device and technical identifiers",
        "• Pages visited and time spent on the website",
        "• Referring website or source",
        "• Website usage patterns and diagnostic information",
        "• Cookie identifiers and similar tracking information, where enabled",
        "E. Communication and Enquiry Information",
        "We may maintain records of enquiries and communications made through our website, email, telephone, WhatsApp or other communication channels. These may include messages, appointment requests, service preferences and related correspondence.",
        "Calls may be recorded for quality assurance, training, security or documentation purposes, where applicable and with appropriate notice or consent.",
        "F. Information About Attendants or Representatives",
        "Where a patient provides details of an attendant, family member or authorised representative, we may process that person’s contact information to coordinate appointments, travel or other requested services. The person providing such information should have the appropriate authority to share it.",
      ],
    },
    {
      heading: "3. How We Collect Information",
      body: [
        "We may collect information:",
        "• Directly from you through website forms, registration forms, telephone calls, emails or messaging platforms.",
        "• When you voluntarily share medical records or travel documents with us.",
        "• From your authorised representative or attendant.",
        "• From hospitals, doctors or other service providers involved in coordinating your requested services, where lawfully permitted.",
        "• Automatically through cookies, analytics tools and website technologies.",
        "• From other lawful sources where necessary to provide the requested services or meet legal obligations.",
        "Where consent is required, we will seek it in the applicable manner before processing the relevant information.",
      ],
    },
    {
      heading: "4. Purposes for Which We Use Your Information",
      body: [
        "Med Safar India may use your information for the following purposes:",
        "1. To respond to enquiries and understand your healthcare requirements.",
        "2. To coordinate consultations, treatment evaluations, appointments and related services.",
        "3. To share relevant medical information with hospitals, doctors, diagnostic centres and other healthcare providers selected for your treatment coordination.",
        "4. To facilitate travel, accommodation, airport transfers and attendant arrangements, where requested.",
        "5. To communicate appointment confirmations, treatment updates, service information and travel arrangements.",
        "6. To provide customer support and respond to complaints or requests.",
        "7. To maintain internal records, improve service quality and administer our website.",
        "8. To prevent fraud, protect security and investigate misuse of our services.",
        "9. To comply with applicable legal, regulatory, accounting or reporting requirements.",
        "10. To send promotional communications, newsletters or educational content where the required consent has been obtained.",
        "11. To conduct aggregated or de-identified analysis to understand service usage and improve our offerings.",
        "We will not use your medical information for unrelated marketing purposes without the appropriate lawful basis and consent, where required.",
      ],
    },
    {
      heading: "5. Consent and Lawful Processing",
      body: [
        "We process personal information on applicable lawful grounds, which may include:",
        "• Your consent, where required by law.",
        "• Processing necessary to provide services that you have requested or agreed to receive, where legally permitted.",
        "• Compliance with applicable legal obligations.",
        "• Other lawful grounds available under applicable legislation.",
        "Where we rely on consent, you may withdraw it subject to applicable law. Withdrawal of consent will not affect the lawfulness of processing undertaken before withdrawal.",
        "If you choose not to provide information necessary for a requested service, we may be unable to coordinate certain consultations, treatment evaluations or travel arrangements.",
      ],
    },
    {
      heading: "6. Sharing and Disclosure of Information",
      body: [
        "We do not sell your personal or medical information.",
        "We may share relevant information, on a need-to-know basis and subject to applicable law, with:",
        "A. Hospitals and Healthcare Professionals",
        "Hospitals, treating doctors, specialists, diagnostic laboratories and other healthcare providers involved in evaluating or coordinating your requested treatment.",
        "B. Travel and Hospitality Partners",
        "Airlines, travel agencies, visa assistance providers, hotels, transport operators and other relevant service providers, where required to arrange travel or accommodation.",
        "C. Technology and Service Providers",
        "Website hosting providers, information technology vendors, CRM platforms, cloud storage providers, communication services and other vendors who support our operations.",
        "D. Legal and Regulatory Authorities",
        "Government authorities, courts, regulators or law enforcement agencies where disclosure is required or permitted under applicable law.",
        "E. Other Authorised Parties",
        "Your authorised attendant, family member, representative or another person where you have authorised disclosure or where disclosure is otherwise lawful.",
        "We seek to limit disclosures to information reasonably necessary for the relevant purpose. Third-party service providers may process information under their own privacy policies and contractual obligations, as applicable.",
      ],
    },
    {
      heading: "7. International Transfers of Information",
      body: [
        "Med Safar India may coordinate treatment for patients residing in India or other countries. Accordingly, relevant personal or medical information may need to be shared with healthcare providers or service partners located in India or abroad.",
        "Any cross-border transfer or processing of personal information will be undertaken subject to applicable Indian law, including any restrictions or conditions imposed by the relevant authorities, and other applicable legal requirements.",
        "We take reasonable steps to ensure that information is shared only with appropriate recipients for legitimate service-related purposes.",
      ],
    },
    {
      heading: "8. Cookies and Similar Technologies",
      body: [
        "Our website may use cookies and similar technologies to:",
        "• Ensure proper website functionality.",
        "• Remember preferences and improve user experience.",
        "• Understand website traffic and usage patterns.",
        "• Identify technical issues and improve performance.",
        "• Support analytics and, where applicable, consent-based marketing activities.",
        "You may manage or disable cookies through your browser settings. Some website features may not function properly if certain cookies are disabled.",
        "Where required, we will obtain consent before using non-essential cookies or similar technologies.",
      ],
    },
    {
      heading: "9. Data Security",
      body: [
        "We implement reasonable technical, organisational and administrative safeguards designed to protect personal information against unauthorised access, disclosure, alteration, loss or misuse.",
        "Depending on the nature of the information and the systems used, safeguards may include:",
        "• Access restrictions and role-based permissions.",
        "• Secure data transmission and encryption where appropriate.",
        "• Password protection and account security controls.",
        "• Confidentiality requirements for employees and relevant service providers.",
        "• Security monitoring, backups and incident response procedures.",
        "• Periodic review of data-handling practices.",
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
        "Subject to applicable law, you may have the right to:",
        "• Request information about the personal data we process about you.",
        "• Request correction or updating of inaccurate or incomplete information.",
        "• Request erasure of personal information where legally permissible.",
        "• Withdraw consent for processing where processing is based on consent.",
        "• Raise a grievance regarding the handling of your personal information.",
        "• Nominate another individual to exercise applicable rights in the event of death or incapacity, where provided by law.",
        "• Exercise any other rights available under applicable data protection legislation.",
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
      body: [
        "Our website may contain links to external websites, hospital websites, booking platforms or other third-party services.",
        "These websites and services may operate under their own privacy policies and terms. Med Safar India does not control the privacy practices of independent third parties and encourages you to review their policies before sharing personal information.",
      ],
    },
    {
      heading: "14. Medical Disclaimer and Role of Med Safar India",
      body: [
        "Med Safar India acts as a medical tourism facilitator and patient coordination service. Unless expressly stated otherwise in a separate written agreement, we do not independently diagnose medical conditions, prescribe medication or provide medical treatment.",
        "Medical assessments, diagnoses, treatment recommendations and clinical decisions are the responsibility of the relevant qualified healthcare professionals and healthcare institutions.",
        "Sharing medical information with us does not by itself establish a doctor-patient relationship with Med Safar India.",
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
        "Med Safar India",
        `Email: ${email}`,
        `Website: ${website}`,
        `Registered Office: ${office}`,
        "Privacy and Grievance Contact: please write to vickyprabhu@medsafar.com only, for every privacy request or grievance.",
        "We will review and respond to privacy-related requests or grievances within the timelines prescribed by applicable law.",
      ],
    },
    {
      heading: "Our Commitment to Patients",
      body: "At Med Safar India, we recognise that medical information is deeply personal. We are committed to treating patient information with care, confidentiality and respect, and to using it responsibly for healthcare facilitation and related services.",
    },
  ],
};

export const terms: LegalContent = {
  meta: {
    title: "Terms and conditions. Medsafar India.",
    description: "The terms and conditions of website use and medical facilitation services of Med Safar India.",
  },
  heading: "Terms and conditions of website use and medical facilitation services",
  intro:
    "These Terms and Conditions (“Terms”) govern access to and use of the Med Safar India website, digital platforms, communication channels and medical facilitation services.",
  // The client's document, word for word, until a lawyer has reviewed it.
  updated: { label: "Last updated", value: "12 November 2026" },
  preamble: [
    "Med Safar India is the medical facilitation brand operated by TravGrub Private Limited, a company registered in India (“Company”, “Med Safar India”, “we”, “us” or “our”).",
    "By accessing our website, submitting an enquiry, requesting medical assistance, engaging our services or making a booking through us, you acknowledge that you have read and understood these Terms and agree to be bound by the provisions applicable to your use of our services.",
    "If you do not agree with these Terms, you should refrain from using our website or engaging our services.",
  ],
  sections: [
    {
      heading: "1. Definitions and interpretation",
      body: [
        "For the purposes of these Terms:",
        "“Patient” means an individual seeking medical consultation, investigation, treatment, surgery, rehabilitation or other healthcare services in India.",
        "“User” or “you” means a Patient or any person accessing our website or acting on behalf of a Patient, including an authorized representative, family member, companion, guardian or person making an enquiry, booking or payment.",
        "“Healthcare Provider” means an independent hospital, clinic, doctor, surgeon, diagnostic centre, laboratory, rehabilitation centre or other healthcare professional or institution.",
        "“Third-Party Service Provider” means an independent provider of services such as accommodation, transportation, airlines, interpreters, travel assistance, insurance or other services arranged in connection with a Patient's visit.",
        "“Medical Facilitation Services” means the non-clinical coordination and assistance services offered by Med Safar India, as described in these Terms and in the applicable service proposal or written confirmation.",
        "“Website” means the Med Safar India website and any digital platform operated by or on behalf of the Company.",
      ],
    },
    {
      heading: "2. About Med Safar India",
      body: [
        "Med Safar India assists domestic and international Patients in exploring and coordinating access to healthcare services in India.",
        "Depending on the Patient's requirements and the scope agreed in writing, our services may include:",
        "a. Receiving and coordinating medical enquiries;",
        "b. Facilitating the secure transmission of medical records to relevant Healthcare Providers, subject to appropriate authorization and applicable law;",
        "c. Requesting preliminary medical assessments, treatment opinions or indicative cost estimates from Healthcare Providers;",
        "d. Coordinating appointments, consultations, hospital visits and treatment schedules;",
        "e. Facilitating communication between Patients and Healthcare Providers;",
        "f. Assisting with treatment-related documentation and hospital coordination;",
        "g. Providing reasonable assistance with medical visa invitation documentation where available from the relevant Healthcare Provider, without guaranteeing visa approval;",
        "h. Coordinating accommodation, airport transfers, local transportation, interpretation and other travel-related arrangements where specifically requested and agreed;",
        "i. Assisting with discharge coordination, follow-up appointments and communication with Healthcare Providers; and",
        "j. Providing other administrative and patient-support services expressly agreed with the Patient.",
        "The exact scope, fees, inclusions and exclusions of the services will be communicated through the applicable quotation, service proposal, invoice or written confirmation.",
        "Med Safar India does not undertake to provide every service listed above in every case.",
      ],
    },
    {
      heading: "3. Nature and limitations of our services",
      body: [
        "Med Safar India operates as a medical facilitation and coordination service provider. Our role is to assist Patients in accessing and coordinating services provided by independent Healthcare Providers and other service providers.",
        "Unless expressly agreed otherwise in a separate written agreement, Med Safar India does not itself operate a hospital, clinic, diagnostic laboratory or medical facility and does not provide clinical diagnosis, prescribe medicines, perform medical procedures or undertake surgical treatment.",
        "All clinical decisions, including the suitability of a treatment, choice of procedure, prescription of medication, interpretation of diagnostic results and determination of medical fitness, remain matters for appropriately qualified Healthcare Providers.",
        "Med Safar India does not direct or control a Healthcare Provider's independent clinical judgment.",
        "Our administrative coordination, communication and patient-support services must not be interpreted as a substitute for professional medical consultation or emergency medical care.",
      ],
    },
    {
      heading: "4. Medical information and treatment decisions",
      body: [
        "Information displayed on our Website or communicated through our representatives is intended primarily to explain our services and facilitate access to relevant Healthcare Providers.",
        "Any treatment information, medical opinion, proposed treatment plan or estimate obtained from a Healthcare Provider is subject to that provider's professional assessment and applicable terms.",
        "Preliminary opinions based on medical records, photographs, reports or online consultations may differ from the conclusions reached following a physical examination, diagnostic investigation or in-person consultation in India.",
        "Med Safar India does not guarantee that a preliminary assessment will remain unchanged after further evaluation.",
        "Patients are encouraged to discuss the nature of the proposed treatment, alternative options, expected benefits, potential risks, recovery requirements and anticipated costs directly with their treating Healthcare Provider before making a treatment decision.",
        "The Patient retains the right to make an informed decision regarding whether to proceed with treatment, subject to applicable medical and legal requirements.",
      ],
    },
    {
      heading: "5. No guarantee of treatment outcomes",
      body: [
        "Every medical procedure, including surgery, carries potential risks and uncertainties. Treatment outcomes may vary according to the Patient's medical history, existing conditions, age, response to treatment, complications and other factors.",
        "Med Safar India makes no representation or guarantee regarding:",
        "a. The suitability of a particular treatment for a Patient;",
        "b. The availability or eligibility of a Patient for a specific procedure;",
        "c. The outcome, success rate or duration of recovery from treatment;",
        "d. The absence of complications, side effects or adverse reactions; or",
        "e. The exact duration of hospitalization or the date on which a Patient will be fit to travel.",
        "All treatment-related expectations should be discussed with the relevant Healthcare Provider. No information on the Website or provided by our representatives should be interpreted as a promise of a particular clinical result.",
      ],
    },
    {
      heading: "6. Patient responsibilities and disclosure",
      body: [
        "The Patient and, where applicable, their authorized representative are responsible for providing accurate, complete and up-to-date information relevant to the requested services.",
        "This includes, where applicable:",
        "a. Medical history, existing illnesses and known allergies;",
        "b. Current medication, previous surgeries and ongoing treatment;",
        "c. Diagnostic reports, investigations and medical records;",
        "d. Passport, identity, visa and travel documentation; and",
        "e. Information reasonably required for appointment coordination, treatment planning and travel arrangements.",
        "The Patient must promptly notify the treating Healthcare Provider of any material change in their medical condition.",
        "Failure to provide relevant information may affect medical assessment, treatment eligibility, cost estimates, scheduling or travel arrangements.",
        "Med Safar India shall not be responsible for consequences attributable to materially inaccurate, incomplete or misleading information supplied by the Patient or their representative, to the extent permitted by applicable law.",
        "Patients must follow the instructions of their treating Healthcare Providers and must not rely on Med Safar India for emergency medical advice.",
      ],
    },
    {
      heading: "7. Medical records, privacy and authorisation",
      body: [
        "The Patient authorizes Med Safar India, to the extent necessary for the requested services and subject to applicable law, to coordinate the sharing of relevant medical records and personal information with identified Healthcare Providers and other authorized service partners.",
        "Such information may be used for medical enquiries, preliminary assessments, appointment scheduling, quotations, treatment coordination, administrative support and related services requested by the Patient.",
        "Where information relates to another individual, the person submitting it must have the necessary authority and permissions to do so.",
        "Med Safar India will handle personal information in accordance with applicable data protection and privacy laws and its Privacy Policy.",
        "The Patient should review the Privacy Policy for further information about the collection, use, disclosure, retention and protection of personal information.",
        "Consent to receive service-related communications does not automatically constitute consent to receive promotional communications. Marketing communications, where applicable, will be handled in accordance with applicable law.",
      ],
    },
    {
      heading: "8. Healthcare providers and independent service providers",
      body: [
        "Med Safar India may introduce Patients to or coordinate bookings with independent Healthcare Providers and Third-Party Service Providers.",
        "Each provider is responsible for the services it independently delivers, including its professional qualifications, clinical decisions, facilities, personnel, service standards, charges, contractual obligations and applicable regulatory compliance.",
        "Med Safar India may undertake reasonable administrative checks or rely on information provided by relevant providers when coordinating services. However, such activities do not constitute a guarantee of a provider's performance, availability, suitability or clinical outcomes.",
        "Healthcare Providers may require Patients to sign separate consent forms, admission documents, treatment agreements or other contractual documents.",
        "Similarly, airlines, hotels, transport operators and other service providers may impose their own booking conditions, payment requirements and cancellation policies.",
        "The Patient is responsible for reviewing and complying with the applicable terms of each provider.",
        "Nothing in this clause excludes or limits any responsibility that applicable law imposes directly on Med Safar India.",
      ],
    },
    {
      heading: "9. Medical assessments and quotations",
      body: [
        "Any preliminary assessment, treatment proposal or cost estimate communicated before the Patient's in-person evaluation is indicative unless expressly confirmed otherwise in writing by the relevant provider.",
        "The final treatment plan and charges may change following clinical examination, diagnostic investigations, review of medical history or identification of additional medical requirements.",
        "A quotation will, where practicable, specify the services included, exclusions, payment arrangements and validity period.",
        "Unless expressly stated in writing, a quotation should not be treated as an unconditional or fixed-price commitment by a Healthcare Provider.",
        "The Patient should seek written clarification of any additional charges, including expenses relating to extended hospitalization, additional procedures, medicines, consumables, intensive care, specialist consultations, rehabilitation or unforeseen complications.",
        "Med Safar India will communicate material changes to estimates that are notified to it by the relevant provider, subject to the information available to us.",
      ],
    },
    {
      heading: "10. Pre-existing conditions and additional medical requirements",
      body: [
        "Patients must disclose known pre-existing conditions, allergies, medication and relevant medical history to their treating Healthcare Provider.",
        "Following examination or investigation, a Healthcare Provider may determine that additional tests, specialist assessments, medical supervision or treatment modifications are required.",
        "Such requirements may result in additional costs or changes to the proposed treatment schedule.",
        "Where additional deposits or payments are required by a Healthcare Provider, the applicable amount, purpose and refund conditions should be confirmed with the relevant provider before payment, wherever reasonably practicable.",
        "Med Safar India does not independently determine clinical eligibility and does not guarantee that a Patient will be accepted for a proposed procedure.",
        "If treatment is postponed, modified or declined for medical reasons, the applicable refund and cancellation terms will depend on the services already provided, the relevant provider's policies and applicable law.",
      ],
    },
    {
      heading: "11. Medical complications and extended hospitalisation",
      body: [
        "If complications arise or additional medical intervention becomes necessary, the treating Healthcare Provider will determine the appropriate clinical response.",
        "Additional treatment, investigations, medicines, hospitalization or other services may result in expenses beyond the original estimate.",
        "The Patient or the person responsible for payment must settle applicable additional charges in accordance with the relevant provider's payment terms.",
        "Med Safar India may assist with administrative coordination and communication where requested, but it does not assume responsibility for making clinical decisions or guaranteeing the availability of additional treatment.",
        "Nothing in these Terms prevents a Patient from seeking emergency care or limits any rights or remedies available under applicable law.",
      ],
    },
    {
      heading: "12. Fees, payments and invoicing",
      body: [
        "The fees payable for Med Safar India's services will be communicated through a written quotation, service proposal, invoice or other written confirmation.",
        "Healthcare Provider charges and Third-Party Service Provider charges may be separate from Med Safar India's facilitation fees.",
        "The applicable documents will identify, to the extent relevant, the recipient of each payment, the services covered, applicable taxes, payment deadlines and any deposit or advance requirements.",
        "Unless expressly agreed otherwise in writing:",
        "a. Payments to Med Safar India must be made through the payment methods and to the accounts specified in an official Company invoice or written payment instruction;",
        "b. Payments owed directly to a Healthcare Provider or another service provider must be made in accordance with that provider's instructions;",
        "c. Any applicable taxes, including GST, will be charged as required by law and as specified in the relevant invoice; and",
        "d. The Patient is responsible for bank charges, foreign-exchange conversion charges or payment-provider fees applicable to their transaction, where lawfully chargeable and disclosed.",
        "Med Safar India will not be responsible for payment made to an unauthorized person or account where the Patient has failed to verify the authenticity of the payment instructions, subject to applicable law and any responsibility attributable to the Company.",
        "Bookings may remain unconfirmed until the required payments and documentation have been received and the relevant provider has confirmed availability.",
      ],
    },
    {
      heading: "13. Cancellations, refunds and withdrawal from services",
      body: [
        "Cancellation and refund rights depend on the nature of the service, the stage at which cancellation occurs, the services already performed and the terms applicable to the relevant provider.",
        "Where a cancellation or refund policy applies, Med Safar India will communicate the relevant conditions through the quotation, booking confirmation, invoice or other written document.",
        "13.1 Cancellation before travel",
        "If a Patient cancels before travelling to India, the Patient should notify Med Safar India in writing as soon as reasonably possible.",
        "Refunds for amounts paid to Med Safar India will be assessed in accordance with the agreed service terms, services already delivered, applicable cancellation charges and applicable law.",
        "Amounts already paid to hospitals, doctors, hotels, airlines or other independent providers will be subject to the relevant provider's refund and cancellation policies.",
        "Med Safar India cannot guarantee recovery of a payment made to an independent provider where that provider's applicable terms do not permit a refund.",
        "13.2 Cancellation after arrival",
        "If a Patient decides not to proceed with a proposed treatment after arrival or consultation, charges already incurred for consultations, investigations, accommodation, transportation, administrative services or other bookings may remain payable.",
        "Any refund of hospital or treatment deposits will be governed by the relevant provider's terms, subject to applicable law.",
        "13.3 Cancellation by a provider",
        "If a Healthcare Provider cancels, postpones or declines a procedure, Med Safar India will, where reasonably practicable, assist with communication and coordination of available alternatives.",
        "Any refund of the provider's charges will be determined under the provider's applicable terms and law.",
        "13.4 Refund processing",
        "Where Med Safar India approves a refund of an amount received by it, the refund will ordinarily be processed through the original payment method, subject to payment-provider requirements and applicable law.",
        "Any permitted deductions must be disclosed, justified and consistent with the agreed terms and applicable law.",
        "Nothing in this clause excludes a refund or remedy that is mandatory under applicable law.",
      ],
    },
    {
      heading: "14. Changes to bookings and itineraries",
      body: [
        "Requests to change consultation dates, treatment schedules, accommodation, transportation or travel arrangements are subject to availability and the applicable provider's policies.",
        "Changes may result in additional charges, revised estimates or cancellation fees.",
        "Medical schedules may change due to clinical requirements, the availability of medical personnel, hospital capacity, investigations or other circumstances beyond Med Safar India's reasonable control.",
        "Med Safar India will make reasonable efforts to communicate changes brought to its attention and assist with coordination where included in the agreed services.",
        "Patients should avoid making non-refundable travel or leisure bookings that depend on an unconfirmed medical schedule.",
      ],
    },
    {
      heading: "15. Travel, accommodation, visa and immigration matters",
      body: [
        "Where specifically requested, Med Safar India may assist with coordination of accommodation, transport, flights or other travel-related services through relevant providers.",
        "Unless expressly agreed in writing, Med Safar India does not itself operate airlines, hotels, transport services or immigration authorities.",
        "Patients are responsible for obtaining and maintaining valid passports, visas, medical travel permissions and other documents required for entry into, stay in and departure from India.",
        "Med Safar India may facilitate the obtaining of supporting medical documentation from a relevant Healthcare Provider where available. It cannot guarantee the grant, renewal or timely processing of a visa or other travel authorisation.",
        "Travel dates should be planned in consultation with the treating Healthcare Provider, particularly where recovery time or fitness to fly is relevant.",
        "The Patient must comply with medical advice concerning travel and recovery. Any change to return travel arrangements will be subject to the applicable airline, accommodation or travel provider's terms.",
      ],
    },
    {
      heading: "16. Insurance",
      body: [
        "Unless expressly included in a written service proposal, Med Safar India's facilitation fees do not include travel insurance, medical insurance or insurance covering treatment complications.",
        "Patients are encouraged to review appropriate insurance options before travelling, including cover for trip cancellation, emergency medical expenses, repatriation, travel disruption and other relevant risks.",
        "Patients should confirm directly with the insurer whether elective treatment in India, complications arising from treatment, medical evacuation and associated expenses are covered.",
        "Med Safar India does not guarantee insurance eligibility, acceptance of a claim or payment of any insurance benefit.",
      ],
    },
    {
      heading: "17. Website content and intellectual property",
      body: [
        "All original content on the Website, including text, graphics, branding, logos, design elements and other materials owned or lawfully used by the Company, is protected by applicable intellectual property laws.",
        "You may access and use Website content for personal, non-commercial informational purposes.",
        "You must not reproduce, distribute, modify, commercially exploit or republish Website content without prior written permission, except where permitted by applicable law.",
        "The names, logos and materials of hospitals, doctors and other third parties remain the property of their respective owners and may be used only with appropriate authorisation.",
        "The Company may update, modify or remove Website content from time to time.",
      ],
    },
    {
      heading: "18. Website availability and acceptable use",
      body: [
        "We aim to maintain a reliable and accessible Website but do not guarantee uninterrupted availability or freedom from every technical error.",
        "The Website may be temporarily unavailable due to maintenance, upgrades, security measures or circumstances beyond our reasonable control.",
        "You agree not to misuse the Website, interfere with its operation, attempt unauthorised access, submit knowingly false information or use it for unlawful purposes.",
        "We reserve the right to restrict or suspend access where reasonably necessary to protect the Website, its users or the Company's lawful interests, subject to applicable law.",
      ],
    },
    {
      heading: "19. Limitation of liability",
      body: [
        "Med Safar India will exercise reasonable care in performing the facilitation services expressly agreed with the Patient.",
        "To the extent permitted by applicable law, the Company will not be responsible for losses arising solely from the independent clinical decisions, acts or omissions of a Healthcare Provider or from the independent performance of another service provider, where such matters are outside the Company's responsibility.",
        "The Company does not guarantee the conduct, availability, performance or outcome of services supplied independently by third parties.",
        "To the extent permitted by law, Med Safar India will not be liable for indirect or consequential losses that were not reasonably foreseeable, including loss of anticipated business opportunities or costs arising from personal travel plans unrelated to the agreed facilitation services.",
        "The Company will not be responsible for delays or failures caused by events beyond its reasonable control, provided it has complied with any applicable legal obligations.",
        "Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by law, including liability that cannot lawfully be excluded for fraud, wilful misconduct, negligence or breach of a mandatory statutory duty.",
        "Nothing in these Terms is intended to remove any non-waivable consumer rights or other protections available to a Patient under applicable law.",
      ],
    },
    {
      heading: "20. Indemnity",
      body: [
        "To the extent permitted by applicable law, you agree to compensate Med Safar India for direct losses and reasonable costs arising from your unlawful use of the Website, deliberate misrepresentation, fraudulent conduct or material breach of these Terms.",
        "This provision applies only to losses legally attributable to your conduct and does not require you to indemnify the Company for losses caused by its own negligence, breach of law or other conduct for which it is legally responsible.",
      ],
    },
    {
      heading: "21. Confidentiality and communications",
      body: [
        "Med Safar India will take reasonable measures to safeguard confidential information received in connection with its services, subject to applicable law and the requirements of providing those services.",
        "Information may be disclosed to relevant Healthcare Providers, service partners or authorised representatives where reasonably necessary to deliver the requested services and where permitted by law.",
        "You agree to provide accurate contact details and to review communications concerning appointments, payments, documentation and travel arrangements.",
        "Electronic communications may be used for administrative coordination, subject to applicable law and appropriate safeguards. However, ordinary email or messaging platforms may not provide the same level of security as dedicated medical information systems.",
      ],
    },
    {
      heading: "22. Third-party websites and resources",
      body: [
        "The Website may contain links to external websites, resources or service providers for convenience or informational purposes.",
        "Med Safar India does not control all external websites and is not responsible for their content, security, privacy practices or availability.",
        "Access to third-party websites is at your discretion and subject to their applicable terms and privacy policies.",
      ],
    },
    {
      heading: "23. Suspension or termination of services",
      body: [
        "Med Safar India may suspend or discontinue facilitation services where reasonably necessary because of non-payment, materially inaccurate information, unlawful conduct, a provider's unavailability or other legitimate operational or legal reasons.",
        "Where reasonably practicable, the Company will communicate the reason for suspension or termination and any available next steps.",
        "Termination will not automatically extinguish payment obligations already incurred or contractual rights and refund entitlements that have accrued.",
        "Any refund due following termination will be determined under the applicable service agreement, cancellation terms and law.",
      ],
    },
    {
      heading: "24. Changes to these terms",
      body: [
        "Med Safar India may revise these Terms from time to time to reflect changes in its services, operational practices or applicable law.",
        "The revised version will be published on the Website with an updated effective date.",
        "Changes will apply prospectively, subject to applicable law and any existing contractual rights. Where a change materially affects an existing booking or service arrangement, the applicable agreed terms and mandatory legal requirements will govern.",
        "You should review these Terms periodically when using the Website or requesting services.",
      ],
    },
    {
      heading: "25. Governing law and jurisdiction",
      body: [
        "These Terms will be governed by the laws of India.",
        "Subject to applicable law, the courts of competent jurisdiction in Mumbai, Maharashtra, India, will have jurisdiction over disputes arising from these Terms.",
        "Nothing in this clause prevents a Patient from exercising a right to approach a consumer commission, regulatory authority or other forum where such a right is available under applicable law.",
        "The parties are encouraged to attempt to resolve concerns through good-faith communication before commencing formal proceedings, without limiting any applicable statutory rights or limitation periods.",
      ],
    },
    {
      heading: "26. Severability",
      body: [
        "If any provision of these Terms is found to be invalid, unlawful or unenforceable by a competent authority, that provision will be limited or severed to the extent necessary.",
        "The remaining provisions will continue to apply to the extent they remain valid and enforceable under applicable law.",
      ],
    },
    {
      heading: "27. Entire agreement and order of precedence",
      body: [
        "These Terms, together with the applicable quotation, service proposal, booking confirmation, Privacy Policy and any separately executed agreement, constitute the terms governing the relevant services.",
        "If a specific written service agreement expressly varies a provision of these Terms, that agreement will prevail to the extent of the inconsistency for the services it covers.",
        "Nothing in these Terms overrides a mandatory provision of applicable law.",
      ],
    },
    {
      heading: "28. Contact information",
      body: [
        "For enquiries, clarification of these Terms or assistance concerning Med Safar India's services, please contact:",
        "TravGrub Private Limited",
        "Operating under the brand Med Safar India",
        "Office No. 222, 2nd Floor, Neo Corporate Plaza, Malad West, Mumbai, Maharashtra – 400064, India.",
        "Email: care@medsafar.com",
        "Telephone/WhatsApp: +919820322088",
        "Website: www.medsafar.com",
        "By accessing the Website or engaging Med Safar India's services, you acknowledge that you have had an opportunity to review these Terms and that your use of the relevant services is subject to the applicable provisions set out above and under applicable law.",
      ],
    },
  ],
};

// The client's Disclaimer (Med_Safar_India_Disclaimer.docx), word for word,
// until a lawyer has reviewed it. Left out: the drafting notes, a note to the
// drafter in clause 19, the footer version and the publishing checklist. The
// blanks in clause 20 are filled in from the Terms.
export const disclaimer: LegalContent = {
  meta: {
    title: "Disclaimer. Medsafar India.",
    description: "What the information on this website is, and what it is not.",
  },
  heading: "Website disclaimer",
  intro: "Medical information, healthcare facilitation and medical travel.",
  updated: { label: "Last updated", value: "12 November 2026" },
  sections: [
    {
      heading: "1. General disclaimer",
      body: [
        "The information provided on this website, including text, articles, images, videos, downloadable material, social media content and other communications issued by Med Safar India (“Med Safar”, “we”, “us” or “our”), is intended for general informational and educational purposes only.",
        "Although we take reasonable care to keep information accurate and current, healthcare information, hospital services, doctor affiliations, prices, availability, travel requirements and regulatory conditions may change. We do not warrant that all information is complete, current, error-free or suitable for every individual circumstance.",
        "Your use of this website does not create a doctor-patient relationship, a hospital-patient relationship, a fiduciary relationship or any professional medical relationship between you and Med Safar India.",
      ],
    },
    {
      heading: "2. Not medical advice, diagnosis or treatment",
      body: [
        "Med Safar India is a healthcare facilitation and medical-travel coordination service. We are not a hospital, clinic, diagnostic laboratory, pharmacy, emergency medical service or medical practitioner. Unless expressly stated otherwise, we do not provide medical diagnosis, prescribe medicines, interpret medical investigations as a treating clinician, or deliver clinical treatment.",
        "Website content must not be relied upon as a substitute for consultation, diagnosis or treatment from a qualified healthcare professional who has assessed your individual medical condition.",
        "Do not disregard, delay or discontinue professional medical advice or prescribed treatment because of information on this website.",
        "Do not start, stop or change any medicine, therapy, diet or treatment based solely on website content or communications from a facilitator.",
        "Treatment suitability, alternatives, benefits, risks, complications, recovery expectations and prognosis must be discussed directly with the treating doctor and hospital.",
        "Medical circumstances differ from person to person. Information about a condition or procedure may not apply to you.",
      ],
    },
    {
      heading: "3. Medical emergencies",
      body: [
        "This website and Med Safar India's communication channels are not designed for emergencies and are not monitored as emergency response services. If you believe you or another person may be experiencing a medical emergency, contact your local emergency number or go to the nearest emergency department immediately. Do not wait for a response from Med Safar India.",
      ],
    },
    {
      heading: "4. Independent clinical decisions and patient responsibility",
      body: [
        "Patients are responsible for making healthcare decisions in consultation with their treating medical professionals. Med Safar India may help coordinate communication, appointments, medical-record sharing, travel and other non-clinical arrangements, but it does not determine whether a treatment is clinically appropriate for a particular patient.",
        "Before proceeding with any treatment, patients should independently discuss and understand the proposed treatment plan, alternatives, expected benefits, material risks, possible complications, recovery requirements, follow-up care and likely costs. Patients should provide complete and accurate medical history and disclose relevant allergies, medicines, prior procedures and other information to their treating clinicians.",
      ],
    },
    {
      heading: "5. No guarantee of treatment outcomes",
      body: [
        "Med Safar India does not guarantee a cure, successful procedure, complication-free treatment, recovery time, clinical outcome, survival rate, improvement in health, or any particular result. Any outcome figures, testimonials, case examples or statements attributed to a healthcare provider must be read in their stated context and are not a promise that another patient will experience the same result.",
        "Medical outcomes depend on multiple factors, including the patient's condition, clinical judgement, treatment choice, individual response, complications and post-treatment care.",
      ],
    },
    {
      heading: "6. Hospitals, doctors and third-party healthcare providers",
      body: [
        "Hospitals, doctors, surgeons, diagnostic centres, laboratories, pharmacies and other healthcare providers are independent third parties unless a specific written agreement states otherwise. They are responsible for their own professional services, clinical decisions, facilities, staff, treatment, patient records, consent processes, billing and patient care.",
        "Any hospital or doctor information displayed on our website is provided to help users explore possible options. A listing, profile, introduction, appointment arrangement or referral must not be interpreted as a clinical endorsement, guarantee, certification, ranking or assurance by Med Safar India.",
        "Credentials, affiliations, accreditations, facilities, treatment availability and service details may change and should be confirmed directly with the relevant provider before making a decision.",
        "Accreditations or certifications, where mentioned, apply only within their stated scope and validity period.",
        "Med Safar India does not control the independent professional judgement or conduct of healthcare providers.",
        "Patients should raise clinical questions, obtain second opinions where appropriate and confirm all treatment details directly with their chosen provider.",
      ],
    },
    {
      heading: "7. Facilitation role and commercial relationships",
      body: [
        "Med Safar India may receive facilitation fees, referral fees, commissions or other commercial consideration from certain healthcare providers or service partners, where permitted by applicable law and contract. Where such a relationship is relevant to a particular listing, placement or communication, it should be disclosed clearly.",
        "A commercial relationship does not constitute a clinical endorsement and must not replace independent assessment of medical suitability. Patients are encouraged to ask questions about any facilitation charges, inclusions, exclusions and payment arrangements before proceeding.",
        "Unless expressly confirmed in writing, Med Safar India does not represent that it can secure a particular doctor, appointment, hospital bed, procedure date, price, discount, insurance approval or treatment outcome.",
      ],
    },
    {
      heading: "8. Estimates, fees, packages and payments",
      body: [
        "Any treatment cost, package price, travel estimate, accommodation quote, hospital charge, discount, facilitation fee or other amount displayed or communicated by Med Safar India is indicative unless expressly stated as a confirmed written quotation.",
        "Final costs may depend on the treating doctor's assessment, investigations, procedure selected, length of stay, complications, medicines, consumables, room category, taxes, currency movements and other circumstances.",
        "A hospital or service provider may revise its rates, availability, inclusions or terms. Confirm the final quotation directly with the relevant provider before payment.",
        "Unless expressly stated in writing, estimates may exclude additional tests, medicines, implants, extended stays, complications, follow-up care, travel changes, visa costs, insurance, taxes or personal expenses.",
        "Payment recipients, payment deadlines, refund conditions, cancellation terms and applicable taxes should be confirmed in writing before a transaction.",
        "Med Safar India is not responsible for a third-party provider's billing error, refund decision, payment dispute or failure to honour its own quotation, except to the extent responsibility is imposed on Med Safar India by applicable law or contract.",
      ],
    },
    {
      heading: "9. Travel, visa, accommodation and immigration",
      body: [
        "Travel and medical-travel information is general and may change without notice. Visa issuance, entry permission, immigration clearance, airline schedules, travel restrictions, accommodation availability and local transport are controlled by the relevant government authorities and independent service providers.",
        "Med Safar India does not guarantee visa approval, entry into any country, flight operation, baggage handling, accommodation availability or the performance of third-party travel suppliers. Travellers must verify current requirements with official authorities and relevant providers, obtain appropriate travel documents and insurance, and allow sufficient time for travel arrangements.",
        "Patients should obtain medical clearance for travel where appropriate and discuss fitness to fly, post-procedure travel timing, mobility requirements and the need for an accompanying person with their treating doctor.",
      ],
    },
    {
      heading: "10. International treatment and continuity of care",
      body: [
        "Patients travelling across borders should discuss continuity of care with their treating doctor before travel. This may include discharge summaries, prescriptions, medical records, wound care, rehabilitation, follow-up consultations, medication availability and a plan for complications after returning home.",
        "Med Safar India cannot guarantee that a doctor or hospital in the patient's home country will accept, continue or provide follow-up care for treatment undertaken elsewhere. Patients should identify suitable local follow-up arrangements before travelling.",
      ],
    },
    {
      heading: "11. Testimonials, patient stories and case studies",
      body: [
        "Patient testimonials and case studies reflect individual experiences and are not typical-result claims or guarantees. Experiences and outcomes vary. Where patient stories, photographs, videos or quotations are published, they should be used only with appropriate permission and in accordance with applicable privacy and advertising requirements.",
        "A testimonial should not be treated as medical evidence or as a substitute for independent clinical advice. Any material connection or incentive associated with a testimonial should be disclosed where required.",
      ],
    },
    {
      heading: "12. External websites and third-party content",
      body: [
        "Our website may contain links to third-party websites, social media pages, maps, payment gateways, hospital portals, research sources or other online services. These links are provided for convenience. Med Safar India does not control and is not responsible for the content, availability, security, privacy practices, accuracy or terms of third-party websites.",
        "Accessing a third-party website or using a third-party service is at your discretion and subject to that provider's terms and privacy policy. A link does not necessarily imply endorsement or partnership.",
      ],
    },
    {
      heading: "13. Website availability, security and technical information",
      body: [
        "We aim to keep the website accessible and secure, but we do not guarantee uninterrupted, error-free or virus-free operation. Access may be suspended, restricted or interrupted for maintenance, updates, security reasons, technical issues or circumstances beyond our control.",
        "Users should take appropriate precautions to protect their devices, accounts and information. Do not send sensitive medical records or identity documents through an unapproved or insecure channel. Please use the contact or submission method specifically designated by Med Safar India for such information.",
      ],
    },
    {
      heading: "14. Limitation of responsibility",
      body: [
        "To the maximum extent permitted by applicable law, Med Safar India will not be responsible for losses arising from a user's reliance on general website information, decisions made without appropriate professional advice, acts or omissions of independent healthcare or travel providers, changes in third-party services, or events outside Med Safar India's reasonable control.",
        "Nothing in this disclaimer excludes or limits any liability that cannot lawfully be excluded or limited under applicable law, including any non-waivable consumer rights, statutory protections, or liability for fraud, wilful misconduct or other liability that the law does not permit us to exclude.",
        "Any limitation of liability must be read subject to applicable Indian law and the specific services and contractual arrangements involved. This clause is not intended to remove rights that a patient or consumer has under law.",
      ],
    },
    {
      heading: "15. Privacy and personal information",
      body: [
        "Personal information and health-related information submitted to Med Safar India will be handled in accordance with our Privacy Policy and applicable data-protection laws. Please read the Privacy Policy to understand what information may be collected, why it is used, when it may be shared and how to contact us about privacy matters.",
        "Do not submit another person's personal or medical information unless you are authorised to do so and any required consent has been obtained.",
      ],
    },
    {
      heading: "16. Intellectual property",
      body: [
        "Unless stated otherwise, website text, design, graphics, logos, videos, photographs and other content owned by Med Safar India are protected by applicable intellectual-property laws. You may view the website for personal, non-commercial use. You must not copy, reproduce, republish, distribute, modify or commercially exploit protected content without prior written permission, except where permitted by law.",
        "Third-party names, logos, trademarks and materials remain the property of their respective owners. Their appearance on the website does not imply ownership by or an endorsement from Med Safar India.",
      ],
    },
    {
      heading: "17. Children and use by representatives",
      body: [
        "The website is not intended to invite children to independently submit personal or medical information or make healthcare arrangements. Where services involve a minor, a parent or lawful guardian must act on the minor's behalf and provide any legally required authorisation and consent. Applicable child-protection and data-protection requirements must be followed.",
      ],
    },
    {
      heading: "18. Changes to this disclaimer",
      body: [
        "We may update this disclaimer from time to time to reflect changes in our services, website, partner arrangements, technology or applicable law. The revised version will be published on this page with an updated effective or revision date. Your continued use of the website after publication of changes will be subject to the revised disclaimer, to the extent permitted by law.",
      ],
    },
    {
      heading: "19. Governing law and jurisdiction",
      body: [
        "This disclaimer is intended to be interpreted in accordance with the laws of India, subject to any mandatory legal protections and jurisdictional rights available to users under applicable law. Any governing-law or jurisdiction clause in the website's Terms and Conditions or a separately signed agreement should be reviewed by Indian counsel for consistency and enforceability.",
      ],
    },
    {
      heading: "20. Contact details",
      body: [
        "For questions about this disclaimer or the information on this website, please contact:",
        "Legal entity: TravGrub Private Limited, which operates the Med Safar India brand.",
        "Brand: Med Safar India.",
        "Office: Office No. 222, 2nd Floor, Neo Corporate Plaza, Malad West, Mumbai, Maharashtra – 400064, India.",
        `Email: ${email}`,
        "Website: www.medsafar.com",
      ],
    },
  ],
};

// The client's Editorial Policy (Med_Safar_India_Editorial_Policy.docx),
// clauses 1 to 18 word for word, and clause 20 with the details the client
// sent. Left out: clause 19 (a disclaimer, which has its
// own page) and the internal checklist.
export const editorialPolicy: LegalContent = {
  meta: {
    title: "Editorial policy. Medsafar India.",
    description: "How Medsafar writes, checks and updates the information on this website.",
  },
  heading: "Editorial policy",
  intro: "Medical content standards, ethical publishing and public communication.",
  updated: { label: "Last updated", value: "12 November 2026" },
  sections: [
    {
      heading: "1. Our editorial philosophy",
      body: [
        "Healthcare information is a responsibility. Every patient deserves access to information that is accurate, transparent, understandable and trustworthy.",
        "Med Safar India is committed to helping patients and families understand healthcare options and navigate medical travel with dignity and care. Our editorial content is intended to inform, educate and support informed conversations with qualified healthcare professionals. It must never pressure a person into a treatment, hospital, doctor or travel decision.",
        "We put patient welfare, factual accuracy, transparency, privacy and ethical communication ahead of promotional interests.",
      ],
    },
    {
      heading: "2. Purpose and scope",
      body: [
        "This policy establishes the standards for creating, reviewing, approving, publishing, promoting, updating and correcting content issued by or on behalf of Med Safar India.",
        "It applies to all content and communications under our control, including:",
        "Website pages, service descriptions, blogs, articles, FAQs and downloadable material.",
        "Social media posts, reels, videos, podcasts, webinars, newsletters and email campaigns.",
        "Patient information packs, destination guides, treatment explainers and pre-arrival material.",
        "Hospital, doctor, specialty and treatment listings, profiles, comparisons and interviews.",
        "Press releases, advertisements, brochures, presentations and partner-facing content.",
        "Content prepared by employees, consultants, agencies, freelancers, influencers or other representatives for Med Safar India.",
        "Where content is created or controlled by a hospital, doctor or other partner, the relevant partner remains responsible for its own professional and clinical statements. Med Safar India will not knowingly publish partner content that conflicts with this policy or applicable law.",
      ],
    },
    {
      heading: "3. Our role and editorial boundaries",
      body: [
        "Med Safar India operates as a healthcare facilitation and medical-travel coordination service. Unless expressly stated otherwise, it is not a hospital, clinic, diagnostic centre, medical practitioner, emergency service or provider of clinical care.",
        "Our content may explain healthcare processes and facilitate access to information, appointments, records transfer, travel coordination and related non-clinical support. We do not independently diagnose conditions, prescribe medicines, recommend a clinical treatment as a substitute for a doctor, interpret test results as a treating professional, or guarantee medical outcomes.",
        "Clinical decisions must be made by the patient in consultation with appropriately qualified and registered healthcare professionals. A facilitator's role must not be presented as a doctor's independent medical judgement.",
      ],
    },
    {
      heading: "4. Accuracy, evidence and responsible claims",
      body: [
        "All material factual and clinical claims must be accurate, current, capable of verification and presented in context. Content must distinguish established evidence from emerging research, expert opinion, anecdote and promotional statements.",
        "Use reliable primary or authoritative sources wherever reasonably available, such as peer-reviewed research, recognised medical associations, government health authorities and official hospital documentation.",
        "Check publication dates, study limitations, sample sizes, population relevance and whether findings are preliminary or widely accepted.",
        "Do not convert a single study, testimonial or isolated outcome into a general promise or guarantee.",
        "Avoid sensational headlines, fear-based language, misleading before-and-after presentations and claims that exploit a patient's vulnerability.",
        "Do not publish fabricated statistics, invented case studies, unsupported success rates or unverifiable rankings.",
        "Where a statistic is used, state its source, date, relevant population and limitations. Do not imply that a hospital's or doctor's results are independently audited unless that is demonstrably true.",
        "Prohibited or high-risk wording includes claims such as “100% cure”, “guaranteed success”, “risk-free surgery”, “permanent solution”, “best doctor in India”, “No. 1 hospital” or “assured results” unless a precise, lawful and independently supportable basis exists and legal review approves the exact claim. In medical contexts, such absolute claims should ordinarily not be used.",
      ],
    },
    {
      heading: "5. Medical review and clinical content",
      body: [
        "Content that discusses symptoms, diseases, diagnosis, treatment options, procedures, medicines, recovery, complications, clinical outcomes or medical research must receive review by a suitably qualified medical professional before publication.",
        "The reviewer should have relevant expertise for the subject matter. Their name, qualification, specialty and review date may be displayed where appropriate and with their permission. A reviewer must not be described as an independent medical reviewer if they have a material commercial relationship that has not been disclosed.",
        "If Med Safar India does not have an appropriately qualified reviewer available, the content must be limited to non-clinical process information, sourced carefully, or held back until suitable review is obtained.",
        "Medical review does not replace the need for legal, privacy, advertising or editorial review.",
      ],
    },
    {
      heading: "6. Doctors, hospitals and healthcare partner information",
      body: [
        "Profiles and listings must be factual, fair, current and supported by reliable records or confirmation from the relevant institution or professional.",
        "Verify a doctor's name, qualifications, specialty, registration details and current professional affiliation using appropriate official or institutional sources, where available.",
        "Verify hospital names, locations, facilities, accreditations, certifications and specialty services with the institution or the relevant accrediting body. State the scope and validity period of any accreditation where material.",
        "Do not imply that Med Safar India has clinically assessed, ranked, certified or endorsed a doctor or hospital unless a documented and defensible process supports that statement.",
        "Do not imply that a listing is exhaustive or that an unlisted provider is inferior.",
        "Obtain permission before using a hospital's or doctor's logo, photographs, brand assets, quotations or other proprietary materials.",
        "Provide a route for partners to request correction of factual errors, without giving them an automatic right to suppress fair and accurate editorial content.",
        "If information cannot be verified, qualify it clearly or do not publish it.",
      ],
    },
    {
      heading: "7. Commercial transparency, referral relationships and conflicts",
      body: [
        "Med Safar India may have commercial arrangements, facilitation agreements, referral arrangements, sponsorships or other business relationships with hospitals, doctors, accommodation providers, transport providers or other service partners. These relationships must not be concealed where they could reasonably affect how a reader understands a recommendation, listing, comparison or endorsement.",
        "Disclose paid placements, sponsorships, commissions, referral arrangements or other material commercial relationships in clear, prominent language close to the relevant content.",
        "Do not describe a paid or commercially influenced placement as an independent ranking, award, review or clinical recommendation.",
        "Do not sell or imply a clinical endorsement. Commercial arrangements must not determine clinical suitability for an individual patient.",
        "Where comparisons are published, explain the criteria, information sources, date checked and any material limitations.",
        "Staff, writers, reviewers and contributors must disclose personal, financial or professional interests that could influence their content.",
        "Do not promise that a doctor or hospital will provide a particular discount, treatment result or level of care unless confirmed in writing and presented with appropriate qualifications.",
        "A disclosure should be plain and understandable—for example: “Med Safar India may receive a facilitation fee from certain healthcare partners. This relationship does not constitute a clinical endorsement. Patients should discuss treatment suitability directly with their treating doctor.” The wording must be adapted to the actual arrangement and reviewed by counsel.",
      ],
    },
    {
      heading: "8. Patient stories, testimonials, photographs and case studies",
      body: [
        "Patient experiences are sensitive and must be handled with particular care. A testimonial is an individual's account, not proof that another patient will have the same experience or outcome.",
        "Obtain prior, specific, informed and documented consent before using a patient's name, image, voice, video, medical history, diagnosis, treatment details or identifiable story.",
        "Explain the intended channels, audience, purpose, duration and whether the material may be used in paid promotion or shared with partners.",
        "Make clear that refusing consent will not affect access to facilitation services or healthcare coordination.",
        "Do not edit a testimonial in a way that changes its meaning or creates a misleading impression.",
        "Do not fabricate, purchase, selectively misrepresent or incentivise testimonials in a way that is undisclosed or deceptive.",
        "Where an incentive, gift, discount or other benefit is provided, disclose it clearly and ensure the arrangement is lawful.",
        "Use anonymised or de-identified case studies wherever possible. Remove indirect identifiers as well as names and faces.",
        "Do not publish graphic, humiliating or distressing material merely to attract attention.",
        "Consent for treatment, hospital record sharing and marketing publication are separate matters. Consent to one must not be treated as consent to the others.",
      ],
    },
    {
      heading: "9. Privacy, confidentiality and sensitive health information",
      body: [
        "We will treat patient and prospective-patient information with strict confidentiality. Medical information, identity documents, contact details, travel documents, photographs and patient communications must be accessed and used only for authorised purposes.",
        "Do not include identifiable patient details in editorial drafts, screenshots, presentations or public posts unless the required consent and approvals are in place.",
        "Collect and use only the personal information reasonably required for the stated purpose, and follow the applicable privacy notice and consent process.",
        "Share patient information with hospitals, doctors, travel partners or service providers only where authorised, necessary and covered by the relevant privacy arrangements and lawful basis.",
        "Use secure, approved systems for storage and transfer. Do not circulate medical records through personal accounts or informal groups unless expressly authorised and appropriately protected.",
        "Restrict access to patient information on a need-to-know basis and follow retention, deletion, incident reporting and access-control procedures.",
        "Do not use patient data for marketing, profiling, testimonials, AI tools or unrelated editorial purposes without a valid and separately documented basis.",
        "The organisation's Privacy Policy, consent forms, vendor contracts and actual data-handling practices must be consistent with this section and applicable data-protection law.",
      ],
    },
    {
      heading: "10. Advertising, promotions and public communications",
      body: [
        "All promotional content must be truthful, substantiated, transparent and distinguishable from independent editorial or educational material. The overall impression of a communication matters, including its headline, images, disclaimers, layout and omissions.",
        "Clearly label advertisements, sponsored content, paid partnerships and promotional placements.",
        "Do not make misleading claims about treatment outcomes, affordability, speed, safety, hospital facilities, doctor credentials or patient eligibility.",
        "Do not create artificial urgency, exploit fear or imply that a patient must act immediately to avoid harm unless a qualified clinician has confirmed a genuine clinical urgency.",
        "Present prices, inclusions, exclusions, taxes, estimates, cancellation terms and possible additional costs accurately and with appropriate qualifications.",
        "Do not compare hospitals or doctors using selective, outdated or unverifiable information.",
        "Do not use a doctor's name, image, quote or apparent endorsement in a way that could breach professional rules or mislead the public.",
        "Before publication, legal review should consider the Consumer Protection Act, 2019, applicable CCPA advertising and endorsement guidelines, the ASCI Code where applicable, and medical-professional advertising restrictions.",
      ],
    },
    {
      heading: "11. Indian legal and regulatory framework",
      body: [
        "This policy is intended to support responsible publishing in India. It is not an exhaustive statement of law and does not replace legal advice. The laws and rules that apply depend on the content, service, audience, contractual role and actual processing activity.",
        "Consumer Protection Act, 2019 and CCPA guidelines — Avoid misleading advertisements, unfair trade practices, false claims, deceptive endorsements and material omissions. Review the CCPA Guidelines for Prevention of Misleading Advertisements and Endorsements for Misleading Advertisements, 2022, as amended or supplemented.",
        "Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025 — Handle digital personal data transparently and lawfully, with appropriate notices, consent or other permitted grounds, safeguards, rights-handling and breach processes as and when the relevant provisions commence and apply. The commencement is phased; verify the provisions in force at the time of each activity.",
        "Information Technology Act, 2000 and applicable rules — Assess applicable obligations for online services, cybersecurity, electronic records, intermediary functions and digital communications. Do not assume that every intermediary or digital-media rule applies to Med Safar India; obtain role-specific advice.",
        "Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 — Do not publish prohibited advertisements or claims relating to specified diseases, conditions, drugs or remedies. Obtain legal review before publishing medicine-related or disease-cure promotional content.",
        "Medical-professional laws and NMC requirements — Respect the National Medical Commission Act, 2019 and applicable professional-conduct requirements governing registered medical practitioners. The NMC issued Guidelines on Ethical Advertising and Public Communication by Hospitals/Medical Institutions and Registered Medical Practitioners dated 6 October 2026. Their direct application to a facilitator, and any obligations where Med Safar acts for or on behalf of a hospital or doctor, must be assessed by Indian counsel.",
        "Copyright Act, 1957 and Trade Marks Act, 1999 — Use text, photographs, videos, illustrations, music, research figures, logos and trademarks only with permission, a valid licence, a legal exception or another lawful basis. Credit alone does not replace permission.",
        "Other applicable laws and sector rules — Depending on the service and content, assess the Clinical Establishments Act and relevant State legislation, telemedicine rules, advertising standards, professional rules, e-commerce requirements, tax and consumer contract requirements, and other applicable laws.",
        "Med Safar India must not state or imply that this policy guarantees legal compliance. Management must maintain a current legal register and obtain advice on the laws applicable to its precise business model, partner arrangements and target markets.",
      ],
    },
    {
      heading: "12. International patients and cross-border content",
      body: [
        "Because Med Safar India may communicate with patients and families outside India, content and data practices must be assessed for the laws of the countries or regions being targeted and the places where individuals are located.",
        "Depending on the circumstances, this may include privacy, consumer-protection, advertising, medical-professional, electronic-commerce and health-information requirements in countries such as the United Kingdom, European Union member states, Kenya, Nigeria, Bangladesh, Gulf countries and CIS markets. Applicability is fact-specific; this policy does not assert that every foreign law applies to every interaction.",
        "Before launching a country-specific campaign, local legal advice should be obtained where required. Avoid claims that a treatment is approved, available, reimbursable or legally permissible in another country unless verified for that market.",
      ],
    },
    {
      heading: "13. Copyright, sources, images and permissions",
      body: [
        "Use original material, properly licensed material, public-domain material or material used under a clearly applicable legal exception.",
        "Maintain a record of source URLs, publication details, licences, permissions and attribution requirements.",
        "Do not copy articles, hospital brochures, medical diagrams, photographs, videos or social media content without permission merely because they are publicly accessible.",
        "Use authentic images that accurately represent the subject. Do not use stock imagery in a way that falsely suggests it depicts a named patient, doctor, hospital or procedure.",
        "Do not alter medical images or clinical photographs in a way that distorts clinical meaning.",
        "Obtain written permission for partner logos and branded assets, and follow any usage conditions.",
      ],
    },
    {
      heading: "14. Artificial intelligence and automated tools",
      body: [
        "AI tools may be used to assist with drafting, language improvement, translation, formatting, summarisation or ideation. They must not be treated as authoritative medical, legal or regulatory sources.",
        "A human editor must verify factual claims, references, names, credentials, statistics, translations and links before publication.",
        "Clinical claims must undergo qualified medical review regardless of whether they were written by a person or generated with AI.",
        "Do not enter identifiable patient information, medical records, identity documents or confidential partner information into an AI tool unless the tool and use have been specifically approved and appropriate privacy and security safeguards are in place.",
        "Do not create fake patient testimonials, fabricated doctors, synthetic clinical evidence or misleading images of medical outcomes.",
        "Disclose AI-generated or materially AI-altered content where disclosure is required by law, platform rules or the context, or where omission could mislead readers.",
      ],
    },
    {
      heading: "15. Editorial workflow and approval",
      body: [
        "The following workflow should be followed before publication. The organisation must assign named individuals to each role and must not claim a review process exists until it is operational.",
        "Brief and classification — identify the audience, purpose, content type, clinical risk, commercial interest, privacy impact and target countries.",
        "Drafting — prepare content using reliable sources and approved brand language.",
        "Fact-check — verify names, dates, figures, claims, credentials, links, prices and partner information.",
        "Medical review — obtain qualified review for clinical content and record the reviewer and date.",
        "Legal, privacy and advertising review — escalate higher-risk content, testimonials, claims, paid promotions, patient data and cross-border campaigns.",
        "Editorial approval — an authorised editor checks clarity, balance, tone, disclosures and compliance with this policy.",
        "Publication and recordkeeping — publish the approved version and retain the source, approvals, consent records and publication date.",
        "Monitoring and review — monitor for changed facts, complaints, new evidence, expired credentials, regulatory changes and partner updates.",
        "Suggested risk levels: routine non-clinical content may receive editorial and factual review; clinical, comparative, testimonial, paid, patient-identifiable or cross-border content requires additional specialist review.",
      ],
    },
    {
      heading: "16. Corrections, updates and complaints",
      body: [
        "We will take reasonable steps to correct material errors promptly and transparently.",
        "Readers, patients, healthcare professionals and partners may report suspected errors, outdated information, privacy concerns or misleading content through the contact channel published on our website.",
        "Acknowledge complaints within a reasonable period and assess their urgency, especially where patient safety or privacy may be affected.",
        "Correct or remove content where a material error, legal concern, consent issue or safety risk is established.",
        "Where an error materially affects a reader's understanding, add a correction note or update date rather than silently changing the content, where appropriate.",
        "Keep an internal record of the complaint, investigation, decision, correction and date.",
        "For urgent safety or privacy concerns, content should be temporarily unpublished or restricted while the issue is assessed.",
      ],
    },
    {
      heading: "17. Accessibility, language and respectful communication",
      body: [
        "Content should be written in plain, respectful language and designed to be understandable to patients and families from different backgrounds. Explain medical terms where they are necessary. Avoid stigma, discrimination, stereotypes, shame-based messaging and assumptions about a person's age, disability, nationality, income, religion or health status.",
        "Translations must preserve the meaning, qualifications and safety information of the original. Important patient-facing translations should be checked by a competent human reviewer.",
      ],
    },
    {
      heading: "18. Accountability and policy review",
      body: [
        "The management of Med Safar India is responsible for implementing this policy, assigning editorial and review responsibilities, maintaining approval records and ensuring that contractors and agencies working on its behalf are informed of the standards.",
        "All employees, contributors and agencies must promptly escalate content that may be inaccurate, misleading, unlawful, privacy-invasive or inconsistent with patient-first principles.",
        "This policy will be reviewed at least annually and whenever there is a material change in applicable law, NMC or other regulatory guidance, Med Safar India's services, commercial arrangements, technology or target markets.",
      ],
    },
    {
      heading: "20. Policy administration",
      body: [
        "Legal entity and registered office: TravGrub Private Limited, which operates the Med Safar India brand. Office No. 222, 2nd Floor, Neo Corporate Plaza, Ramchandra Lane Extension, Kanchpada, Malad West, Mumbai, Maharashtra – 400064, India.",
        "Editorial contact email: vickyprabhu@medsafar.com",
        "Privacy and grievance contact: vickyprabhu@medsafar.com",
        "Person responsible for editorial approval: Vicky Prabhu, Founder.",
        "Medical reviewer: Dr Jagruti Kamdar.",
        "Legal reviewer: Adv. Sanjay Israni.",
        "Last reviewed: 1 November 2026. Effective date: 12 November 2026.",
        "Website: www.medsafar.com",
      ],
    },
  ],
};

// Clauses 13 and 14 of the client's Terms, word for word. The text we wrote
// earlier is gone.
export const cancellations: LegalContent = {
  meta: {
    title: "Cancellations and refunds. Medsafar India.",
    description: "What happens if you change or cancel your plans.",
  },
  heading: "Cancellations and refunds",
  intro: "Clauses 13 and 14 of our Terms and conditions.",
  updated: terms.updated,
  sections: terms.sections.slice(12, 14),
};
