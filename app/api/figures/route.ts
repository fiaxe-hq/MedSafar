import { getPublishedStats } from "@/lib/stats";

/** The figures published in /admin/stats, for the strip on the home page. */
export async function GET() {
  const figures = await getPublishedStats(null);
  return Response.json(figures, { headers: { "Cache-Control": "public, max-age=60" } });
}
