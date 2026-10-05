import type { MetadataRoute } from "next";
import { countrySlugs } from "@/content/countries";
import { getDoctors, getHospitals, getPosts, getTreatments } from "@/lib/catalog";
import { siteUrl } from "@/lib/seo";

/**
 * Pages worth finding in search. Hospital, doctor and blog detail pages are
 * left out while they are placeholders.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [treatments, hospitals, doctors, posts] = await Promise.all([
    getTreatments(),
    getHospitals(),
    getDoctors(),
    getPosts(),
  ]);
  const real = <T extends { pending?: boolean }>(records: T[]) => records.filter((r) => !r.pending);
  const paths = [
    { path: "", priority: 1 },
    ...countrySlugs.map((slug) => ({ path: `/${slug}`, priority: 0.9 })),
    { path: "/treatments", priority: 0.8 },
    ...treatments.map((t) => ({ path: `/treatments/${t.slug}`, priority: 0.7 })),
    { path: "/hospitals", priority: 0.8 },
    ...real(hospitals).map((h) => ({ path: `/hospitals/${h.slug}`, priority: 0.7 })),
    { path: "/doctors", priority: 0.7 },
    ...real(doctors).map((d) => ({ path: `/doctors/${d.slug}`, priority: 0.6 })),
    { path: "/blog", priority: 0.6 },
    ...real(posts).map((p) => ({ path: `/blog/${p.slug}`, priority: 0.5 })),
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  return paths.map(({ path, priority }) => ({ url: `${siteUrl}${path}`, priority }));
}
