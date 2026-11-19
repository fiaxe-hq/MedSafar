import type { SiteContent } from "./types";

/**
 * Text that is the same on every page, in every country.
 * Header, footer, buttons and the enquiry form all read from here.
 */
export const site: SiteContent = {
  brand: {
    name: "Med Safar",
    country: "India",
    legal: "Med Safar India, a division of Travgrub Private Limited",
    tagline: "Treatment in India, arranged end to end.",
  },

  nav: {
    // A link that starts with "#" points at a section of the home page, or
    // of the country page the visitor is on.
    items: [
      { label: "About", href: "/about" },
      {
        label: "Treatments",
        href: "/treatments",
        menu: "treatments",
        all: "All Treatments",
        finder: {
          title: "Not Sure What It Is Called?",
          text: "Search in your own words, or tap the part of the body that troubles you.",
          href: "/treatments#body",
        },
      },
      { label: "Hospitals", href: "/hospitals", menu: "hospitals", all: "All Hospitals" },
      { label: "Doctors", href: "/doctors", menu: "doctors", all: "All Doctors" },
      { label: "Blogs", href: "/blog" },
    ],
    menuLabel: "Menu",
    bySpeciality: "By Speciality",
    /** Under the doctors menu, so the order is not read as a ranking. */
    doctorsOrder: "Doctors are listed in alphabetical order.",
    contact: { label: "Contact Us", href: "/contact" },
    top: {
      call: "Call Us",
      whatsapp: "WhatsApp",
      email: "Email",
      free: "The medical opinion and the estimate are free",
    },
  },

  languages: {
    label: "Language",
    country: "Your country",
    countryNote: "Changes the photos on the home page. The language stays as you set it.",
    global: "Select Country",
  },

  cta: {
    primary: "Get a Free Treatment Plan",
    secondary: "Free Consultation",
    whatsapp: "WhatsApp",
    reports: "Upload Your Reports",
  },

  contact: {
    whatsapp: {
      number: "919820322088",
      display: "+91 98203 22088",
      message: "Hello Med Safar, I would like help with treatment in India.",
    },
    phone: {
      number: "+919820322088",
      display: "+91 98203 22088",
    },
    email: "care@medsafar.com",
    social: [
      { network: "instagram", label: "Instagram", href: "https://www.instagram.com/medsafarindia" },
      { network: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61596375772898" },
    ],
  },

  company: {
    // The footer shows each one while it is filled in; set it to null to hide it.
    registeredAddress:
      "Neo Corporate Plaza, Office no.222, 2nd Floor, Ramchandra lane Extn., Kanchpada, Malad-West, Mumbai-400064, Maharashtra, India",
    gstin: "27AAHCT0016D1ZU",
  },

  mobileBar: {
    plan: "Get Plan",
  },

  /** The cookie notice (components/site/CookieBanner.tsx). */
  cookies: {
    text: "We use cookies to remember your language and country and, if you agree, to see how the site is used.",
    privacy: "Privacy Policy",
    accept: "Accept",
    decline: "Only Necessary",
  },

  /** The round WhatsApp button fixed to the corner on computers. */
  whatsappFloat: "Chat with Us on WhatsApp",

  consultation: {
    eyebrow: "Free Consultation",
    heading: "Get a Free Treatment Plan",
    intro: "Leave your mobile number. A case manager comes back to you on WhatsApp or by call.",
    promises: [
      "No cost and no obligation",
      "A doctor at a partner hospital reads your reports",
      "A written estimate, prepared by the hospital for your case",
    ],
    note: "Med Safar is a medical travel facilitator, not a hospital. Treatment is given by independent hospitals and doctors in India.",
    close: "Close",
  },

  form: {
    issue: { about: "Your question is about", advise: "a doctor will advise", remove: "Remove" },
    step1: {
      label: "Your mobile number",
      hint: "We reply on WhatsApp or by call. No cost, no obligation.",
      countryLabel: "Country code",
      countrySearch: "Search country",
      countryNone: "No match",
      submit: "Get a Free Consultation",
      reportsFirst: "Add your number first. Then you can upload your reports.",
      emergency: "Not for emergencies. In a medical emergency, call your local emergency number.",
      // {terms} and {privacy} become links.
      consent: "I agree to Med Safar's {terms} and {privacy}. This consent overrides any DNC/NDNC registrations.",
      terms: "T&C",
      privacy: "Privacy Policy",
    },
    step2: {
      heading: "A Few More Details",
      intro: "This helps us put the right doctor and cost estimate in front of you.",
      more: "Add More Details (Optional)",
      less: "Back to the Short Form",
      name: { label: "Full name", placeholder: "First and last name" },
      email: {
        label: "Email",
        placeholder: "you@example.com",
        hint: "We send the written plan here.",
      },
      country: { label: "Country you are travelling from", placeholder: "Select a country" },
      treatment: {
        label: "Treatment needed",
        placeholder: "Select or describe below",
        options: [
          "Organ transplant (all types)",
          "Cancer care (oncology)",
          "Blood disorders and bone marrow transplant",
          "Neurology and neurosurgery",
          "Weight loss surgery",
          "Fertility and IVF",
          "Orthopaedics",
          "Cardiology and heart surgery",
          "General and keyhole surgery",
          "Stomach, liver and gut",
          "Urology (kidney, bladder, prostate)",
          "Gynaecology",
          "Ear, nose and throat",
          "Plastic, reconstructive and cosmetic surgery",
          "Eye care (ophthalmology)",
          "Dental care",
          "Something else",
          "Not sure yet",
        ],
      },
      timeline: {
        label: "When do you want to travel?",
        options: ["As soon as possible", "Within a month", "In 1 to 3 months", "Still deciding"],
      },
      budget: {
        label: "What matters most to you?",
        options: [
          "Keeping the cost as low as possible",
          "Good care at a fair cost",
          "The best care, whatever the cost",
        ],
      },
      preference: {
        label: "A city or hospital you prefer (optional)",
        placeholder: "For example: Mumbai, or a hospital you have heard of",
      },
      notes: {
        label: "Anything you want the doctor to know (optional)",
        placeholder: "Symptoms, diagnosis, treatment already taken",
      },
      reports: {
        label: "Medical reports (optional)",
        hint: "PDF or photo, up to 8 MB. Reports let the doctor give a firm plan.",
      },
      consent: {
        label:
          "I agree that Med Safar may share my details and reports with partner hospitals and doctors in India to prepare my treatment plan.",
        privacy: "Read the Privacy Policy",
      },
      // Our wording, not a lawyer's: replace when Med Safar sends its consent text.
      marketing: "Optional: send me news, offers and health information from Med Safar. I can unsubscribe at any time.",
      submit: "Send My Details",
    },
    privacyNote: "Your medical details stay private. We use them only to plan your care.",
    saved: {
      heading: "Number Saved",
      body: "We can already reach you. A few details make the plan faster and more exact.",
    },
    done: {
      heading: "Thank You. We Have Your Details.",
      body: "A Med Safar case manager will contact you with a doctor's opinion and a written cost estimate.",
      again: "Send Another Enquiry",
    },
    errors: {
      phone: "Please enter a valid mobile number for the country you selected.",
      country: "Please choose your country code, or type your number starting with + and the country code.",
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      consent: "Please tick the box so we can share your case with a doctor.",
      file: "That file is too large or not a supported type. Use a PDF or photo under 8 MB.",
      limit:
        "We already have your enquiries from today. A case manager will contact you. For anything urgent, message us on WhatsApp.",
      generic: "Something went wrong. Please try again, or reach us on WhatsApp.",
      bot: "We could not confirm you are not a robot. Please wait a moment and try again, or reach us on WhatsApp.",
    },
    sending: "Sending",
  },

  footer: {
    legalName: "Med Safar India, a division of Travgrub Private Limited",
    lines: [
      "Med Safar is a medical travel facilitator. It is not a hospital and does not provide medical treatment.",
      "Doctors and hospitals are independent. Every treatment plan and cost estimate comes from the treating hospital.",
    ],
    payment: "You pay the hospital directly for treatment, against its written estimate.",
    disclaimer:
      "Everything on this website is general information, not medical advice. Every patient is different, and results vary. Talk to your own doctor before deciding on any treatment.",
    disclaimerLink: "Read Our Full Disclaimer",
    columns: [
      {
        heading: "Find Care",
        items: [
          { label: "Specialities", href: "/specialities" },
          { label: "Treatments", href: "/treatments" },
          { label: "Hospitals", href: "/hospitals" },
          { label: "Doctors", href: "/doctors" },
        ],
      },
      {
        heading: "How We Work",
        items: [
          { label: "Visa and Travel", href: "/#visa" },
          { label: "Questions", href: "#faq" },
          { label: "Surgery Questionnaires", href: "/questionnaires" },
        ],
      },
      {
        heading: "Med Safar",
        items: [
          { label: "About", href: "/about" },
          { label: "Blogs", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        heading: "Legal",
        items: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "Cancellations and Refunds", href: "/cancellations" },
          { label: "Medical Disclaimer", href: "/disclaimer" },
          { label: "Editorial Policy", href: "/editorial-policy" },
        ],
      },
    ],
    contact: {
      heading: "Talk to Us",
      whatsapp: "WhatsApp",
      phone: "Call",
      email: "Email",
    },
    company: {
      registeredAddress: "Registered office",
      gstin: "GSTIN",
    },
    parentLogoAlt: "Travgrub Private Limited",
    follow: "Follow Us",
    copyright: "All rights reserved.",
  },

  notFound: {
    heading: "Page Not Found",
    body: "The page you were looking for is not here. You can still start a free treatment plan from the home page.",
  },

  pendingLabel: "Placeholder",
  photoLabel: "Photo to be supplied",
  carousel: { previous: "Previous", next: "Next" },
};
