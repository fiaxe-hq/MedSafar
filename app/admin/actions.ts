"use server";

import { redirect } from "next/navigation";
import {
  MIN_PASSWORD_LENGTH,
  createFirstOwner,
  logActivity,
  signIn,
  signOut,
} from "@/lib/admin/auth";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const result = await signIn(email, String(formData.get("password") ?? ""));
  if (result === "ok") redirect("/admin");
  redirect(`/admin/login?error=${result}&email=${encodeURIComponent(email.trim())}`);
}

export async function signOutAction() {
  await signOut();
  redirect("/admin/login");
}

/** The first account, made with the setup key while there are no accounts. */
export async function setupAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const back = (error: string) =>
    redirect(`/admin/setup?error=${error}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);

  if (name.length < 2) back("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) back("email");
  if (password.length < MIN_PASSWORD_LENGTH) back("password");
  if (password !== String(formData.get("confirm") ?? "")) back("confirm");

  const result = await createFirstOwner(String(formData.get("key") ?? ""), { name, email, password });
  if (result === "exists") redirect("/admin/login");
  if (result === "key") return back("key");
  await logActivity(result, "created the first admin account");
  redirect("/admin?welcome=1");
}
