import { isAdmin } from "@/lib/admin/auth";
import { getReport } from "@/lib/leads";

/**
 * Downloads one uploaded medical report from R2. Admin session required, and
 * only files that belong to an enquiry are served.
 */
export async function GET(request: Request, { params }: RouteContext<"/admin/reports/[file]">) {
  if (!(await isAdmin())) {
    return Response.redirect(new URL("/admin/login", request.url), 303);
  }

  const { file } = await params;
  const report = await getReport(file);
  if (!report) return new Response("Not found", { status: 404 });

  const safeName = file.replace(/[^a-zA-Z0-9._-]/g, "_");
  return new Response(report.body, {
    headers: {
      "Content-Type": report.httpMetadata?.contentType ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
