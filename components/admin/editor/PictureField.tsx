"use client";

import { useRef, useState } from "react";
import { ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr/UploadSimple";
import { uploadPhotoAction } from "@/app/admin/(panel)/[section]/actions";
import { adminButton, adminInput, adminLabel } from "../ui";

export type PictureValue = { src: string | null; alt: string; pending: boolean; focus?: string };

const MAX_SIDE = 1800;

/**
 * Shrinks a photo in the browser to at most 1800 pixels on its long side and
 * saves it as WebP, so even a phone photo uploads quickly and loads fast.
 */
async function shrink(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
    return blob && blob.type === "image/webp" ? new File([blob], "photo.webp", { type: "image/webp" }) : file;
  } catch {
    return file;
  }
}

/** Uploads one photo and returns where it is, or an error sentence. */
export async function uploadPhoto(section: string, file: File): Promise<{ src: string } | { error: string }> {
  if (!file.type.startsWith("image/")) return { error: "That file is not a photo." };
  const data = new FormData();
  data.set("section", section);
  data.set("file", await shrink(file));
  try {
    return await uploadPhotoAction(data);
  } catch {
    return { error: "The upload did not go through. Check the connection and try again." };
  }
}

/** One photo: a preview, a button to choose or replace it, and its description. */
export function PictureField({
  id,
  section,
  value,
  onChange,
  compact = false,
}: {
  id: string;
  section: string;
  value: PictureValue | undefined;
  onChange: (value: PictureValue) => void;
  compact?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const picture = value ?? { src: null, alt: "", pending: true };

  async function choose(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    const result = await uploadPhoto(section, file);
    setBusy(false);
    if (input.current) input.current.value = "";
    if ("error" in result) setError(result.error);
    else onChange({ src: result.src, alt: picture.alt, pending: false });
  }

  return (
    <div className={`flex flex-col gap-4 ${compact ? "" : "sm:flex-row"}`}>
      <div className={`relative shrink-0 overflow-hidden rounded-md border border-line bg-surface-2 ${compact ? "aspect-[4/3] w-full" : "aspect-[4/3] w-full sm:w-56"}`}>
        {picture.src ? (
          // Shown as uploaded; a plain img keeps the preview simple.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={picture.src} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-ink-3">
            <span className="flex flex-col items-center gap-1 text-sm">
              <ImageIcon size={28} aria-hidden />
              No photo
            </span>
          </span>
        )}
        {busy ? (
          <span className="absolute inset-0 grid place-items-center bg-surface/80 text-sm font-medium text-ink">Uploading…</span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button type="button" className={adminButton.quiet} onClick={() => input.current?.click()} disabled={busy}>
            <UploadSimpleIcon size={17} aria-hidden />
            {picture.src ? "Replace photo" : "Choose photo"}
          </button>
          {picture.src ? (
            <button
              type="button"
              className={adminButton.quiet}
              onClick={() => onChange({ src: null, alt: "", pending: true })}
              disabled={busy}
            >
              <TrashIcon size={17} aria-hidden />
              Remove
            </button>
          ) : null}
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => choose(e.target.files?.[0])}
          />
        </div>
        {error ? (
          <p role="alert" className="text-sm font-medium text-danger">
            {error}
          </p>
        ) : null}
        <div>
          <label htmlFor={`${id}-alt`} className={adminLabel}>
            What the photo shows
          </label>
          <input
            id={`${id}-alt`}
            value={picture.alt}
            onChange={(e) => onChange({ ...picture, alt: e.target.value })}
            placeholder="For example: The hospital's main entrance"
            className={`${adminInput} mt-1.5`}
          />
          <p className="mt-1.5 text-sm text-ink-3">Read out to people who cannot see the photo, and used by Google.</p>
        </div>
      </div>
    </div>
  );
}
