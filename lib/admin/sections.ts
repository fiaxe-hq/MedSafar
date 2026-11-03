/**
 * The admin's sections, in nav order and grouped as the sidebar shows them.
 * Content sections (hospitals, doctors, treatments, blog) share one editor,
 * driven by lib/admin/schema.ts; the team page is for owners only.
 */
export const adminSections = [
  { href: "/admin", label: "Overview", group: "", exact: true },
  { href: "/admin/enquiries", label: "Enquiries", group: "" },
  { href: "/admin/hospitals", label: "Hospitals", group: "Content" },
  { href: "/admin/doctors", label: "Doctors", group: "Content" },
  { href: "/admin/treatments", label: "Treatments", group: "Content" },
  { href: "/admin/blog", label: "Blog", group: "Content" },
  { href: "/admin/translations", label: "Translations", group: "Site" },
  { href: "/admin/contact", label: "Contact details", group: "Site" },
  { href: "/admin/stats", label: "Trust figures", group: "Site" },
  { href: "/admin/team", label: "Team", group: "Settings", ownerOnly: true },
] as const;
