/**
 * The admin's sections, in nav order. Content sections (hospitals, doctors,
 * treatments, blog) share one editor, driven by lib/admin/schema.ts; the team
 * page is for owners only.
 */
export const adminSections = [
  { href: "/admin", label: "Home", exact: true },
  { href: "/admin/hospitals", label: "Hospitals" },
  { href: "/admin/doctors", label: "Doctors" },
  { href: "/admin/treatments", label: "Treatments" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/translations", label: "Translations" },
  { href: "/admin/contact", label: "Contact details" },
  { href: "/admin/stats", label: "Trust figures" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/team", label: "Team", ownerOnly: true },
] as const;
