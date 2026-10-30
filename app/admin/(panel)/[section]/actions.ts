"use server";

import { redirect } from "next/navigation";
import { logActivity, requireAdmin } from "@/lib/admin/auth";
import { fileRecord, getOptions, getRecord, refreshSite, slugTaken } from "@/lib/admin/records";
import { blankRecord, kindByPath, slugFrom, type KindInfo } from "@/lib/admin/schema";
import { cleanRecord, type Errors } from "@/lib/admin/validate";
import { deleteEntry, same, saveEntry, setHidden } from "@/lib/content";
import { MAX_PHOTO_BYTES, PHOTO_TYPES, savePhoto } from "@/lib/media";

export type SaveState = { errors: Errors; message?: string } | null;

function kindFor(section: string): KindInfo {
  const info = kindByPath[section];
  if (!info) redirect("/admin");
  return info;
}

const nameOf = (info: KindInfo, record: Record<string, unknown>) => String(record[info.nameKey] ?? record.slug);

/**
 * Saves a record from the editor. `slug` is empty for a new one; its web
 * address is then made from its name and never changes after.
 */
export async function saveRecordAction(_prev: SaveState, formData: FormData): Promise<SaveState> {
  const user = await requireAdmin();
  const info = kindFor(String(formData.get("section") ?? ""));
  const slug = String(formData.get("slug") ?? "");
  const visible = formData.get("visible") === "yes";

  let input: unknown;
  try {
    input = JSON.parse(String(formData.get("record") ?? "{}"));
  } catch {
    return { errors: {}, message: "Something went wrong while sending. Please try again." };
  }

  const existing = slug ? await getRecord(info.kind, slug) : null;
  if (slug && !existing) return { errors: {}, message: `This ${info.singular} no longer exists. It may have been deleted.` };
  const base = existing?.record ?? blankRecord(info.kind);

  const { record, errors } = cleanRecord(info, input, base, await getOptions());
  if (Object.keys(errors).length > 0) {
    return { errors, message: "Some fields need attention. They are marked in red below." };
  }

  let target = slug;
  if (!target) {
    target = slugFrom(info.kind, nameOf(info, record));
    if (!target || target === "new") return { errors: { [info.nameKey]: "Use letters or numbers in the name." }, message: "Some fields need attention." };
    if (await slugTaken(info.kind, target)) {
      return {
        errors: { [info.nameKey]: `There is already a ${info.singular} with this name. Edit that one, or change the name.` },
        message: "Some fields need attention.",
      };
    }
  }
  record.slug = target;

  // Saving a record from the files unchanged and visible removes the row,
  // so it shows as the original again.
  const file = fileRecord(info.kind, target);
  if (file && visible && same(record, file)) {
    await deleteEntry(info.kind, target);
  } else {
    await saveEntry(info.kind, target, record, user.name);
    await setHidden(info.kind, target, !visible, record, user.name);
  }
  refreshSite();
  const href = `/admin/${info.path}/${target}`;
  await logActivity(user, `${slug ? "edited" : "added"} the ${info.singular} "${nameOf(info, record)}"`, href);
  redirect(`${href}?done=${slug ? "saved" : "added"}`);
}

export async function setVisibleAction(formData: FormData) {
  const user = await requireAdmin();
  const info = kindFor(String(formData.get("section") ?? ""));
  const slug = String(formData.get("slug") ?? "");
  const visible = formData.get("visible") === "yes";
  const current = await getRecord(info.kind, slug);
  if (!current) redirect(`/admin/${info.path}`);

  await setHidden(info.kind, slug, !visible, current.record, user.name);
  // A record from the files that is shown again with no changes needs no row.
  const file = fileRecord(info.kind, slug);
  if (visible && file && same(current.record, file)) await deleteEntry(info.kind, slug);
  refreshSite();
  const href = `/admin/${info.path}/${slug}`;
  await logActivity(user, `${visible ? "showed" : "hid"} the ${info.singular} "${nameOf(info, current.record)}"`, href);
  redirect(`${href}?done=${visible ? "shown" : "hidden"}`);
}

/** Back to the version in the files: every change made in /admin is dropped. */
export async function restoreAction(formData: FormData) {
  const user = await requireAdmin();
  const info = kindFor(String(formData.get("section") ?? ""));
  const slug = String(formData.get("slug") ?? "");
  const file = fileRecord(info.kind, slug);
  if (!file) redirect(`/admin/${info.path}`);
  await deleteEntry(info.kind, slug);
  refreshSite();
  const href = `/admin/${info.path}/${slug}`;
  await logActivity(user, `restored the original ${info.singular} "${nameOf(info, file)}"`, href);
  redirect(`${href}?done=restored`);
}

/** Only for records added in /admin; the ones from the files can be hidden instead. */
export async function deleteAction(formData: FormData) {
  const user = await requireAdmin();
  const info = kindFor(String(formData.get("section") ?? ""));
  const slug = String(formData.get("slug") ?? "");
  const current = await getRecord(info.kind, slug);
  if (!current || current.inFiles) redirect(`/admin/${info.path}`);
  await deleteEntry(info.kind, slug);
  refreshSite();
  await logActivity(user, `deleted the ${info.singular} "${nameOf(info, current.record)}"`);
  redirect(`/admin/${info.path}?done=deleted`);
}

export type UploadResult = { src: string } | { error: string };

/** One photo, already shrunk by the browser. Stored in R2 and served at /media/. */
export async function uploadPhotoAction(formData: FormData): Promise<UploadResult> {
  await requireAdmin();
  const section = String(formData.get("section") ?? "");
  const file = formData.get("file");
  if (!kindByPath[section] && section !== "contact") return { error: "Unknown section." };
  if (!(file instanceof File) || file.size === 0) return { error: "No photo was chosen." };
  if (!PHOTO_TYPES[file.type]) return { error: "Use a JPG, PNG or WebP photo." };
  if (file.size > MAX_PHOTO_BYTES) return { error: "That photo is too large. Use one under 5 MB." };
  try {
    return { src: await savePhoto(section, file) };
  } catch (error) {
    console.error("photo upload failed", error);
    return { error: "The photo could not be saved. Please try again." };
  }
}
