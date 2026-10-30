"use server";

import { redirect } from "next/navigation";
import { logActivity, requireAdmin } from "@/lib/admin/auth";
import { deleteLead, deleteReport, keepReport } from "@/lib/leads";

const PAGE = "/admin/enquiries";

// The activity log names no patient: a deleted enquiry must not live on there.

export async function deleteLeadAction(formData: FormData) {
  const user = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const deleted = id ? await deleteLead(id) : false;
  if (deleted) await logActivity(user, "deleted an enquiry and its report", PAGE);
  redirect(`${PAGE}?${deleted ? "done=deleted" : "error=missing"}`);
}

export async function keepReportAction(formData: FormData) {
  const user = await requireAdmin();
  await keepReport(String(formData.get("id") ?? ""));
  await logActivity(user, "kept a report past its month", PAGE);
  redirect(`${PAGE}?done=kept`);
}

export async function deleteReportAction(formData: FormData) {
  const user = await requireAdmin();
  await deleteReport(String(formData.get("id") ?? ""));
  await logActivity(user, "deleted a month-old report", PAGE);
  redirect(`${PAGE}?done=report-deleted`);
}
