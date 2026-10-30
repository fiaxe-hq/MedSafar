"use server";

import { parsePhoneNumberFromString } from "libphonenumber-js";
import { redirect } from "next/navigation";
import { logActivity, requireAdmin } from "@/lib/admin/auth";
import { refreshSite } from "@/lib/admin/records";
import { CONTACT, applyEntries, deleteEntry, getEntries, same, saveEntry } from "@/lib/content";
import { source } from "@/lib/i18n/source";

const PAGE = "/admin/contact";
const networks = ["instagram", "facebook", "youtube"] as const;
const labels = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube" };
/** Each profile must be on its own network's site. */
const hosts = { instagram: /(^|\.)instagram\.com$/, facebook: /(^|\.)facebook\.com$/, youtube: /(^|\.)youtube\.com$/ };

function phone(formData: FormData, name: string) {
  const parsed = parsePhoneNumberFromString(String(formData.get(name) ?? "").trim(), "IN");
  return parsed?.isValid() ? parsed : null;
}

export async function saveContactAction(formData: FormData) {
  const user = await requireAdmin();
  const whatsapp = phone(formData, "whatsapp");
  const call = phone(formData, "phone");
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!whatsapp) redirect(`${PAGE}?error=whatsapp`);
  if (!call) redirect(`${PAGE}?error=phone`);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) redirect(`${PAGE}?error=email`);
  if (message.length < 2 || message.length > 300) redirect(`${PAGE}?error=message`);

  const social = [];
  for (const network of networks) {
    const href = String(formData.get(network) ?? "").trim();
    if (!href) continue;
    let url: URL;
    try {
      url = new URL(href);
    } catch {
      redirect(`${PAGE}?error=${network}`);
    }
    if (url.protocol !== "https:" || !hosts[network].test(url.hostname)) redirect(`${PAGE}?error=${network}`);
    social.push({ network, label: labels[network], href: url.toString() });
  }

  const current = applyEntries(source, source, await getEntries()).site.contact;
  const contact = {
    ...current,
    whatsapp: { number: whatsapp.number.replace(/\D/g, ""), display: whatsapp.formatInternational(), message },
    phone: { number: call.number, display: call.formatInternational() },
    email,
    social,
  };

  if (same(contact, source.site.contact)) await deleteEntry("settings", CONTACT);
  else await saveEntry("settings", CONTACT, contact, user.name);
  refreshSite();
  await logActivity(user, "updated the contact details", PAGE);
  redirect(`${PAGE}?done=saved`);
}
