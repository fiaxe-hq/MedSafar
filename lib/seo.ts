import type { Text } from "@/lib/i18n/source";
import { languages, localPath } from "@/lib/i18n/languages";
import type { Doctor, Faq, Hospital, Post, Speciality, Treatment } from "@/content/types";

/**
 * The public address of the site. Used for canonical links, the sitemap and
 * social previews. Change it here when the site moves to its own domain.
 */
export const siteUrl = "https://medsafar.com";

/** Describes Med Safar to search engines (schema.org, rendered as JSON-LD). */
export const organizationJsonLd = (site: Text["site"]) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Med Safar India",
  legalName: site.footer.legalName,
  url: siteUrl,
  logo: `${siteUrl}/brand/medsafar-logo.png`,
  description: site.brand.tagline,
  email: site.contact.email,
  telephone: site.contact.phone.number,
  ...(site.company.registeredAddress
    ? {
        address: {
          "@type": "PostalAddress",
          streetAddress: "Neo Corporate Plaza, Office no.222, 2nd Floor, Ramchandra lane Extn., Kanchpada, Malad-West",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400064",
          addressCountry: "IN",
        },
      }
    : {}),
  "@id": `${siteUrl}/#organization`,
  alternateName: ["Med Safar", "MedSafar", "Medsafar India"],
  sameAs: site.contact.social.map((s) => s.href),
  // Where patients come from: the countries and regions the site is written for.
  areaServed: ["Africa", "Middle East", "Central Asia", "South Asia", "Worldwide"],
  knowsAbout: [
    "Medical tourism in India",
    "Affordable medical treatment in India",
    "Treatment abroad for international patients",
    "Medical visa to India",
    "Hospital cost estimates in India",
  ],
  slogan: site.brand.tagline,
  parentOrganization: { "@type": "Organization", name: "Travgrub Private Limited" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: site.contact.phone.number,
    email: site.contact.email,
    availableLanguage: languages.map((l) => l.english),
  },
});

const org = { "@id": `${siteUrl}/#organization` };
const abs = (lang: string, path: string) => `${siteUrl}${localPath(lang, path) === "/" ? "" : localPath(lang, path)}`;
const image = (src?: string | null) => (src ? (src.startsWith("http") ? src : `${siteUrl}${src}`) : undefined);

/** The site itself, so search engines and AI assistants tie every page to Med Safar. */
export const websiteJsonLd = (lang: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Med Safar India",
  url: siteUrl,
  description,
  inLanguage: languages.map((l) => l.code),
  publisher: org,
});

/** Questions and answers shown on the page, word for word. */
export const faqJsonLd = (items: Faq[]) =>
  items.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        })),
      }
    : null;

/** The trail from the home page, as shown in search results. */
export const breadcrumbJsonLd = (lang: string, trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((step, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: step.name,
    item: abs(lang, step.path),
  })),
});

/** A treatment page: the procedure, who it is for, the stay and recovery. */
export const treatmentJsonLd = (lang: string, t: Treatment, speciality: string, hospitals: Hospital[]) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  url: abs(lang, `/treatments/${t.slug}`),
  name: `${t.name} in India`,
  description: t.summary,
  inLanguage: lang,
  publisher: org,
  specialty: speciality,
  audience: { "@type": "Patient", geographicArea: "Worldwide" },
  about: {
    "@type": "MedicalProcedure",
    name: t.name,
    description: t.what,
    procedureType: speciality,
    preparation: t.who,
    followup: t.recovery,
  },
  mentions: hospitals.map((h) => ({ "@type": "Hospital", name: h.name, url: abs(lang, `/hospitals/${h.slug}`) })),
});

/** A speciality page. */
export const specialityJsonLd = (lang: string, s: Speciality) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  url: abs(lang, `/specialities/${s.slug}`),
  name: `${s.name} in India`,
  description: s.summary,
  inLanguage: lang,
  publisher: org,
  specialty: s.name,
});

/** A partner hospital, with its package prices as offers. */
export const hospitalJsonLd = (lang: string, h: Hospital, specialities: string[], treatments: string[]) => ({
  "@context": "https://schema.org",
  "@type": "Hospital",
  url: abs(lang, `/hospitals/${h.slug}`),
  name: h.name,
  description: h.overview,
  image: image(h.picture.pending ? null : h.picture.src),
  address: {
    "@type": "PostalAddress",
    ...(h.address ? { streetAddress: h.address } : {}),
    addressLocality: h.city,
    addressCountry: "IN",
  },
  ...(h.accreditation ? { hasCredential: h.accreditation } : {}),
  medicalSpecialty: specialities,
  availableService: treatments.map((name) => ({ "@type": "MedicalProcedure", name })),
  ...(h.packages?.length
    ? {
        makesOffer: h.packages.flatMap((group) =>
          group.items.map((item) => ({
            "@type": "Offer",
            name: item.name,
            category: group.category,
            price: item.priceUsd,
            priceCurrency: "USD",
          })),
        ),
      }
    : {}),
});

/** A doctor at a partner hospital. */
export const doctorJsonLd = (lang: string, d: Doctor, speciality: string, hospital: Hospital | null) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  url: abs(lang, `/doctors/${d.slug}`),
  name: d.name,
  jobTitle: d.role,
  description: d.profile,
  image: image(d.picture.pending ? null : d.picture.src),
  medicalSpecialty: speciality,
  knowsAbout: d.expertise,
  knowsLanguage: d.languages,
  ...(hospital
    ? {
        hospitalAffiliation: { "@type": "Hospital", name: hospital.name, url: abs(lang, `/hospitals/${hospital.slug}`) },
        address: { "@type": "PostalAddress", addressLocality: hospital.city, addressCountry: "IN" },
      }
    : {}),
});

/** A blog article. */
export const postJsonLd = (lang: string, p: Post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  url: abs(lang, `/blog/${p.slug}`),
  headline: p.title,
  description: p.summary,
  inLanguage: lang,
  ...(p.date ? { datePublished: p.date } : {}),
  image: image(p.picture && !p.picture.pending ? p.picture.src : null),
  author: { "@type": "Organization", name: p.author },
  publisher: org,
  ...(p.sources?.length ? { citation: p.sources.map((s) => s.href) } : {}),
});

/** A JSON-LD payload, made safe to place inside a <script> tag. */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
