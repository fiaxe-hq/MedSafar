import type { SiteContent } from "./types";

/**
 * Text that is the same on every page, in every country.
 * Header, footer, buttons and the enquiry form all read from here.
 */
export const site: SiteContent = {
  brand: {
    name: "Medsafar",
    country: "India",
    legal: "Medsafar India, a division of Travgrub Private Limited",
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
        all: "All treatments",
        finder: {
          title: "Not sure what it is called?",
          text: "Search in your own words, or tap the part of the body that troubles you.",
          href: "/treatments#body",
        },
      },
      { label: "Hospitals", href: "/hospitals", menu: "hospitals", all: "All hospitals" },
      { label: "Doctors", href: "/doctors", menu: "doctors", all: "All doctors" },
      { label: "Blog", href: "/blog" },
    ],
    menuLabel: "Menu",
    contact: { label: "Contact us", href: "/contact" },
  },

  languages: {
    label: "Language",
    country: "Your country",
    countryNote: "Changes the photos on the home page. The language stays as you set it.",
    global: "Another country",
  },

  cta: {
    primary: "Get a free treatment plan",
    secondary: "Free consultation",
    whatsapp: "WhatsApp",
  },

  contact: {
    whatsapp: {
      number: "919820322088",
      display: "+91 98203 22088",
      message: "Hello Medsafar, I would like help with treatment in India.",
    },
    phone: {
      number: "+919820322088",
      display: "+91 98203 22088",
    },
    email: "care@medsafar.com",
    // Replace with the real profile links.
    social: [
      { network: "instagram", label: "Instagram", href: "https://www.instagram.com/medsafar" },
      { network: "facebook", label: "Facebook", href: "https://www.facebook.com/medsafar" },
      { network: "youtube", label: "YouTube", href: "https://www.youtube.com/@medsafar" },
    ],
  },

  company: {
    // The footer shows each one while it is filled in; set it to null to hide it.
    registeredAddress:
      "Office No. 222, 2nd Floor, NEO Corporate Plaza, Ramchandra Lane, Mumbai, Maharashtra 400064, India",
    gstin: "27AAHCT0016D1ZU",
  },

  mobileBar: {
    plan: "Get plan",
  },

  /** The round WhatsApp button fixed to the corner on computers. */
  whatsappFloat: "Chat with us on WhatsApp",

  consultation: {
    eyebrow: "Free consultation",
    heading: "Get a free treatment plan",
    intro: "Leave your mobile number. A case manager comes back to you on WhatsApp or by call.",
    promises: [
      "No cost and no obligation",
      "A doctor at a partner hospital reads your reports",
      "A written estimate, prepared by the hospital for your case",
    ],
    note: "Medsafar is a medical travel facilitator, not a hospital. Treatment is given by independent hospitals and doctors in India.",
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
      submit: "Get a free consultation",
      reassurance: "One number is enough to start. Details can follow.",
    },
    step2: {
      heading: "A few more details",
      intro: "This helps us put the right doctor and cost estimate in front of you.",
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
          "I agree that Medsafar may share my details and reports with partner hospitals and doctors in India to prepare my treatment plan.",
        privacy: "Read the privacy policy",
      },
      submit: "Send my details",
    },
    privacyNote: "Your medical details stay private. We use them only to plan your care.",
    saved: {
      heading: "Number saved",
      body: "We can already reach you. A few details make the plan faster and more exact.",
    },
    done: {
      heading: "Thank you. We have your details.",
      body: "A Medsafar case manager will contact you with a doctor's opinion and a written cost estimate.",
      again: "Send another enquiry",
    },
    errors: {
      phone: "Please enter a valid mobile number for the country you selected.",
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      consent: "Please tick the box so we can share your case with a doctor.",
      file: "That file is too large or not a supported type. Use a PDF or photo under 8 MB.",
      limit:
        "We already have your enquiries from today. A case manager will contact you. For anything urgent, message us on WhatsApp.",
      generic: "Something went wrong. Please try again, or reach us on WhatsApp.",
    },
    sending: "Sending",
  },

  footer: {
    legalName: "Medsafar India, a division of Travgrub Private Limited",
    lines: [
      "Medsafar is a medical travel facilitator. It is not a hospital and does not provide medical treatment.",
      "Doctors and hospitals are independent. Every treatment plan and cost estimate comes from the treating hospital.",
    ],
    payment: "You pay the hospital directly for treatment, against its written estimate.",
    columns: [
      {
        heading: "Find care",
        items: [
          { label: "Specialities", href: "/specialities" },
          { label: "Treatments", href: "/treatments" },
          { label: "Hospitals", href: "/hospitals" },
          { label: "Doctors", href: "/doctors" },
        ],
      },
      {
        heading: "How we work",
        items: [
          { label: "Visa and travel", href: "/#visa" },
          { label: "Questions", href: "#faq" },
          { label: "Surgery questionnaires", href: "/questionnaires" },
        ],
      },
      {
        heading: "Medsafar",
        items: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        heading: "Legal",
        items: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "Cancellations and refunds", href: "/cancellations" },
          { label: "Medical disclaimer", href: "/disclaimer" },
          { label: "Editorial policy", href: "/editorial-policy" },
        ],
      },
    ],
    contact: {
      heading: "Talk to us",
      whatsapp: "WhatsApp",
      phone: "Call",
      email: "Email",
    },
    company: {
      registeredAddress: "Registered office",
      gstin: "GSTIN",
    },
    parentLogoAlt: "Travgrub Private Limited",
    follow: "Follow us",
    copyright: "All rights reserved.",
  },

  notFound: {
    heading: "Page not found",
    body: "The page you were looking for is not here. You can still start a free treatment plan from the home page.",
  },

  pendingLabel: "Placeholder",
  photoLabel: "Photo to be supplied",
  carousel: { previous: "Previous", next: "Next" },
};
