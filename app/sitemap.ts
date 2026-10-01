import type { MetadataRoute } from "next";
import { countrySlugs } from "@/content/countries";
import { getTreatments } from "@/lib/catalog";
import { siteUrl } from "@/lib/seo";

/**
 * Pages worth finding in search. Hospital, doctor and blog detail pages are
 * left out while they hold placeholders; add them once the real records exist.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const treatments = await getTreatments();
  const paths = [
    { path: "", priority: 1 },
    ...countrySlugs.map((slug) => ({ path: `/${slug}`, priority: 0.9 })),
    { path: "/treatments", priority: 0.8 },
    ...treatments.map((t) => ({ path: `/treatments/${t.slug}`, priority: 0.7 })),
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  return paths.map(({ path, priority }) => ({ url: `${siteUrl}${path}`, priority }));
}
