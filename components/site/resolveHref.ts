import { localPath } from "@/lib/i18n/languages";

/**
 * Header and footer links come from content/site.ts. One that starts with "#"
 * points at a section of the home page, so it still works from a hospital,
 * doctor or treatment page. `lang` keeps plain <a> links in the page's language;
 * <Link> from components/ui/Link does that itself.
 */
export function resolveHref(href: string, home = "/", lang?: string) {
  const to = href.startsWith("#") ? `${home}${href}` : href;
  return lang ? localPath(lang, to) : to;
}
