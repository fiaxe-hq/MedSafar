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
    title: "Terms and conditions. Medsafar India.",
    description: "The terms and conditions of website use and medical facilitation services of Med Safar India.",
  },
  heading: "Terms and conditions of website use and medical facilitation services",
  intro:
    "These Terms and Conditions (“Terms”) govern access to and use of the Med Safar India website, digital platforms, communication channels and medical facilitation services.",
  // The client's document, word for word, until a lawyer has reviewed it.
  draft: "Draft. This text is under legal review and may change.",
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
      body: "Anything medical, such as what a treatment is, who needs it and how long recovery takes, is checked by a doctor before it is published. Until then it is marked \"Pending doctor check\" on the page.",
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
