/**
 * The admin's sections, in nav order.
 *
 * Each section follows the same shape, so hospitals and doctors can join
 * later without new plumbing:
 *   1. a D1 migration in migrations/
 *   2. a repository in lib/ (like lib/stats.ts): plain async functions, the
 *      only code that writes SQL for that table
 *   3. app/admin/(panel)/<section>/page.tsx, a Server Component that reads
 *      through the repository
 *   4. app/admin/(panel)/<section>/actions.ts, Server Actions that call
 *      requireAdmin() first, then the repository, then redirect back
 *   5. an entry below
 * For hospitals and doctors, lib/catalog.ts then reads from the repository
 * instead of data/, and no public page changes.
 */
export const adminSections = [
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/stats", label: "Trust figures" },
] as const;
