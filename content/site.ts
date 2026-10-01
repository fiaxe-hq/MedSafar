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
      { label: "Treatments", href: "/treatments" },
      { label: "Hospitals", href: "/hospitals" },
      { label: "Doctors", href: "/doctors" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
    ],
    menuLabel: "Menu",
  },

  languages: {
    label: "Language",
    current: "English",
    options: [{ code: "en", label: "English" }],
    note: "More languages coming",
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
  },

  company: {
    // Supplied later. The footer shows each one as soon as it is filled in.
    registeredAddress: null,
    gstin: null,
  },

  mobileBar: {
    plan: "Get plan",
  },

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
    step1: {
      label: "Your mobile number",
      hint: "We reply on WhatsApp or by call. No cost, no obligation.",
      countryLabel: "Country code",
      submit: "Get a free treatment plan",
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
          "Neurology and neurosurgery",
          "Weight loss surgery",
          "Fertility and IVF",
          "Orthopaedics",
          "Cardiology and heart surgery",
          "Cosmetic and plastic surgery",
          "Something else",
          "Not sure yet",
        ],
      },
      timeline: {
        label: "When do you want to travel?",
        options: ["As soon as possible", "Within a month", "In 1 to 3 months", "Still deciding"],
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
    columns: [
      {
        heading: "Find care",
        items: [
          { label: "Treatments", href: "/treatments" },
          { label: "Hospitals", href: "/hospitals" },
          { label: "Doctors", href: "/doctors" },
        ],
      },
      {
        heading: "How we work",
        items: [
          { label: "How it works", href: "#how-it-works" },
          { label: "What we handle", href: "#what-we-handle" },
          { label: "Questions", href: "#faq" },
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
    copyright: "All rights reserved.",
  },

  notFound: {
    heading: "Page not found",
    body: "The page you were looking for is not here. You can still start a free treatment plan from the home page.",
  },

  pendingLabel: "Placeholder",
  photoLabel: "Photo to be supplied",
};
