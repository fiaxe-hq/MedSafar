"use server";

import { redirect } from "next/navigation";
import { logActivity, requireAdmin } from "@/lib/admin/auth";
import {
  createStat,
  deleteStat,
  listStats,
  moveStat,
  setStatPublished,
  updateStat,
} from "@/lib/stats";

const PAGE = "/admin/stats";

type Fields = { label: string; value: string };

/** Trimmed label and value, or the name of the field that is wrong. */
function readFields(formData: FormData): Fields | "label" | "value" {
  const label = String(formData.get("label") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  if (label.length < 2 || label.length > 60) return "label";
  if (value.length < 1 || value.length > 24) return "value";
  return { label, value };
}

function readId(formData: FormData): string {
  const id = String(formData.get("id") ?? "");
  if (!id) redirect(`${PAGE}?error=missing`);
  return id;
}

function keyFor(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

export async function addStatAction(formData: FormData) {
  const user = await requireAdmin();
  const fields = readFields(formData);
  if (typeof fields === "string") redirect(`${PAGE}?error=${fields}`);

  const key = keyFor(fields.label);
  if (!key) redirect(`${PAGE}?error=label`);
  if ((await listStats()).some((s) => s.key === key)) redirect(`${PAGE}?error=duplicate`);

  await createStat({ key, ...fields });
  await logActivity(user, `added the trust figure "${fields.label}"`, PAGE);
  redirect(`${PAGE}?done=added`);
}

export async function saveStatAction(formData: FormData) {
  const user = await requireAdmin();
  const id = readId(formData);
  const fields = readFields(formData);
  if (typeof fields === "string") redirect(`${PAGE}?error=${fields}`);
  await updateStat(id, fields);
  await logActivity(user, `edited the trust figure "${fields.label}"`, PAGE);
  redirect(`${PAGE}?done=saved`);
}

export async function publishStatAction(formData: FormData) {
  const user = await requireAdmin();
  await setStatPublished(readId(formData), true);
  await logActivity(user, "published a trust figure", PAGE);
  redirect(`${PAGE}?done=published`);
}

export async function unpublishStatAction(formData: FormData) {
  const user = await requireAdmin();
  await setStatPublished(readId(formData), false);
  await logActivity(user, "hid a trust figure", PAGE);
  redirect(`${PAGE}?done=unpublished`);
}

export async function moveStatUpAction(formData: FormData) {
  await requireAdmin();
  await moveStat(readId(formData), "up");
  redirect(PAGE);
}

export async function moveStatDownAction(formData: FormData) {
  await requireAdmin();
  await moveStat(readId(formData), "down");
  redirect(PAGE);
}

export async function deleteStatAction(formData: FormData) {
  const user = await requireAdmin();
  await deleteStat(readId(formData));
  await logActivity(user, "deleted a trust figure", PAGE);
  redirect(`${PAGE}?done=deleted`);
}
