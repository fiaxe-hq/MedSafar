"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/admin/auth";
import { adminSections } from "@/lib/admin/sections";

export async function signInAction(formData: FormData) {
  const ok = await signIn(String(formData.get("password") ?? ""));
  redirect(ok ? adminSections[0].href : "/admin/login?error=1");
}

export async function signOutAction() {
  await signOut();
  redirect("/admin/login");
}
