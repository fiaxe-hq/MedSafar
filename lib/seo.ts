import { site } from "@/content/site";

/**
 * The public address of the site. Used for canonical links, the sitemap and
 * social previews. Change it here when the site moves to its own domain.
 */
export const siteUrl = "https://medsafar.xaif.workers.dev";

/** Describes Medsafar to search engines (schema.org, rendered as JSON-LD). */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Medsafar India",
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
          streetAddress: "Office No. 222, 2nd Floor, NEO Corporate Plaza, Ramchandra Lane",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400064",
          addressCountry: "IN",
        },
      }
    : {}),
  parentOrganization: { "@type": "Organization", name: "Travgrub Private Limited" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: site.contact.phone.number,
    email: site.contact.email,
    availableLanguage: ["English"],
  },
};

/** A JSON-LD payload, made safe to place inside a <script> tag. */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}
