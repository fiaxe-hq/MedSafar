/**
 * Header and footer links come from content/site.ts. One that starts with "#"
 * points at a section of the home page, or of the country page the visitor is
 * on, so it still works from a hospital, doctor or treatment page.
 */
export function resolveHref(href: string, home: string) {
  return href.startsWith("#") ? `${home}${href}` : href;
}
