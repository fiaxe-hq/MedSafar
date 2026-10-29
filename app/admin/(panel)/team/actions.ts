"use server";

import { redirect } from "next/navigation";
import {
  MIN_PASSWORD_LENGTH,
  emailTaken,
  getUser,
  insertUser,
  logActivity,
  ownerCount,
  requireOwner,
  setPassword,
  setUserActive,
  updateUser,
  type Role,
} from "@/lib/admin/auth";

const PAGE = "/admin/team";

const field = (formData: FormData, name: string) => String(formData.get(name) ?? "").trim();
const role = (formData: FormData): Role => (formData.get("role") === "owner" ? "owner" : "editor");
const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

export async function addMemberAction(formData: FormData) {
  const owner = await requireOwner();
  const name = field(formData, "name");
  const email = field(formData, "email");
  const password = String(formData.get("password") ?? "");
  if (name.length < 2) redirect(`${PAGE}?error=name`);
  if (!validEmail(email)) redirect(`${PAGE}?error=email`);
  if (password.length < MIN_PASSWORD_LENGTH) redirect(`${PAGE}?error=password`);
  if (await emailTaken(email)) redirect(`${PAGE}?error=taken`);

  await insertUser({ name, email, password, role: role(formData) });
  await logActivity(owner, `added ${name} to the team`, PAGE);
  redirect(`${PAGE}?done=added`);
}

export async function updateMemberAction(formData: FormData) {
  const owner = await requireOwner();
  const member = await getUser(field(formData, "id"));
  if (!member) redirect(`${PAGE}?error=missing`);
  const name = field(formData, "name");
  const email = field(formData, "email");
  const newRole = role(formData);
  if (name.length < 2) redirect(`${PAGE}?error=name`);
  if (!validEmail(email)) redirect(`${PAGE}?error=email`);
  if (await emailTaken(email, member.id)) redirect(`${PAGE}?error=taken`);
  if (member.role === "owner" && newRole !== "owner" && (await ownerCount()) <= 1) redirect(`${PAGE}?error=last-owner`);

  await updateUser(member.id, { name, email, role: newRole });
  await logActivity(owner, `updated ${name}'s account`, PAGE);
  redirect(`${PAGE}?done=saved`);
}

export async function resetPasswordAction(formData: FormData) {
  const owner = await requireOwner();
  const member = await getUser(field(formData, "id"));
  if (!member) redirect(`${PAGE}?error=missing`);
  const password = String(formData.get("password") ?? "");
  if (password.length < MIN_PASSWORD_LENGTH) redirect(`${PAGE}?error=password`);
  await setPassword(member.id, password);
  await logActivity(owner, `set a new password for ${member.name}`, PAGE);
  redirect(member.id === owner.id ? "/admin/login" : `${PAGE}?done=password`);
}

export async function setAccessAction(formData: FormData) {
  const owner = await requireOwner();
  const member = await getUser(field(formData, "id"));
  if (!member) redirect(`${PAGE}?error=missing`);
  const active = formData.get("active") === "yes";
  if (!active && member.id === owner.id) redirect(`${PAGE}?error=self`);
  if (!active && member.role === "owner" && (await ownerCount()) <= 1) redirect(`${PAGE}?error=last-owner`);

  await setUserActive(member.id, active);
  await logActivity(owner, active ? `gave ${member.name} access again` : `removed ${member.name}'s access`, PAGE);
  redirect(`${PAGE}?done=${active ? "on" : "off"}`);
}
