import type { MetadataRoute } from "next";
import { countrySlugs } from "@/content/countries";
import { questionnaires } from "@/content/questionnaires";
import { getDoctors, getHospitals, getPosts, getSpecialities, getTreatments } from "@/lib/catalog";
import { siteUrl } from "@/lib/seo";
import { hiddenLink } from "@/lib/preview";

/**
 * Pages worth finding in search. Hospital, doctor and blog detail pages are
 * left out while they are placeholders.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [treatments, hospitals, doctors, posts, specialities] = await Promise.all([
    getTreatments(),
    getHospitals(),
    getDoctors(),
    getPosts(),
    getSpecialities(),
  ]);
  const real = <T extends { pending?: boolean }>(records: T[]) => records.filter((r) => !r.pending);
  const paths = [
    { path: "", priority: 1 },
    ...countrySlugs.map((slug) => ({ path: `/${slug}`, priority: 0.9 })),
    { path: "/specialities", priority: 0.8 },
    ...specialities.map((s) => ({ path: `/specialities/${s.slug}`, priority: 0.7 })),
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
    { path: "/cancellations", priority: 0.2 },
    { path: "/disclaimer", priority: 0.2 },
    { path: "/editorial-policy", priority: 0.2 },
    { path: "/questionnaires", priority: 0.5 },
    ...questionnaires.map((q) => ({ path: `/questionnaires/${q.slug}`, priority: 0.6 })),
  ];
  return paths.filter(({ path }) => !hiddenLink(path)).map(({ path, priority }) => ({ url: `${siteUrl}${path}`, priority }));
}
