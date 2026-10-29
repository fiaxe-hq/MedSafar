"use server";

import { redirect } from "next/navigation";
import {
  MIN_PASSWORD_LENGTH,
  checkOwnPassword,
  logActivity,
  renewOwnSession,
  requireAdmin,
  setPassword,
  updateUser,
} from "@/lib/admin/auth";

const PAGE = "/admin/account";

export async function changeNameAction(formData: FormData) {
  const me = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) redirect(`${PAGE}?error=name`);
  await updateUser(me.id, { name, email: me.email, role: me.role });
  redirect(`${PAGE}?done=name`);
}

export async function changePasswordAction(formData: FormData) {
  const me = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!(await checkOwnPassword(me.id, current))) redirect(`${PAGE}?error=current`);
  if (password.length < MIN_PASSWORD_LENGTH) redirect(`${PAGE}?error=password`);
  if (password !== String(formData.get("confirm") ?? "")) redirect(`${PAGE}?error=confirm`);

  // Signs every other device out; this one gets a fresh session.
  await setPassword(me.id, password);
  await renewOwnSession(me.id);
  await logActivity(me, "changed their password");
  redirect(`${PAGE}?done=password`);
}
