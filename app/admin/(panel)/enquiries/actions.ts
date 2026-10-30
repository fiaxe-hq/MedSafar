"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteLead, deleteReport, keepReport } from "@/lib/leads";

const PAGE = "/admin/enquiries";

export async function deleteLeadAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const deleted = id ? await deleteLead(id) : false;
  redirect(`${PAGE}?${deleted ? "done=deleted" : "error=missing"}`);
}

export async function keepReportAction(formData: FormData) {
  await requireAdmin();
  await keepReport(String(formData.get("id") ?? ""));
  redirect(`${PAGE}?done=kept`);
}

export async function deleteReportAction(formData: FormData) {
  await requireAdmin();
  await deleteReport(String(formData.get("id") ?? ""));
  redirect(`${PAGE}?done=report-deleted`);
}
