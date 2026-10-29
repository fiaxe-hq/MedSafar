import { isAdmin } from "@/lib/admin/auth";
import { toCsv } from "@/lib/admin/csv";
import { exportRows, templateRows } from "@/lib/admin/translationCsv";

/**
 * The translations CSV. ?type=template gives the headings and how to fill
 * them in; otherwise every sentence, with what each language shows now
 * (?section= one section only, ?missing=1 only rows with a gap).
 */
export async function GET(request: Request) {
  if (!(await isAdmin())) return Response.redirect(new URL("/admin/login", request.url), 303);
  const params = new URL(request.url).searchParams;
  const template = params.get("type") === "template";
  const section = params.get("section") ?? undefined;
  const rows = template ? templateRows() : await exportRows(section, params.get("missing") === "1");
  const day = new Date().toISOString().slice(0, 10);
  const name = template ? "medsafar-translations-template.csv" : `medsafar-translations-${section ?? "all"}-${day}.csv`;
  return new Response(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
