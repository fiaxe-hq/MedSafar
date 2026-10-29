import { env } from "./cloudflare";

/**
 * Photos uploaded in /admin, kept in the R2 bucket MEDIA and served at
 * /media/<key> (app/media/[...key]/route.ts). The browser shrinks each photo
 * before it is sent (components/admin/editor/PictureField.tsx), so they are
 * shown as they are, without Next's image resizing, which only reads the
 * site's own files.
 */

export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const PHOTO_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function savePhoto(folder: string, file: File): Promise<string> {
  const key = `${folder}/${crypto.randomUUID()}.${PHOTO_TYPES[file.type]}`;
  await env().MEDIA.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" },
  });
  return `/media/${key}`;
}

export async function getPhoto(key: string) {
  if (!/^[a-z-]+\/[0-9a-f-]{36}\.(jpg|png|webp)$/.test(key)) return null;
  return env().MEDIA.get(key);
}
