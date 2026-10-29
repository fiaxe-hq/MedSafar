/**
 * True for a photo uploaded in /admin (lib/media.ts). Such photos are already
 * shrunk in the browser before upload and are shown as they are: Next's image
 * resizing on the Worker only reads the site's own files. Safe in the browser.
 */
export function isUploaded(src: string | null | undefined): boolean {
  return typeof src === "string" && src.startsWith("/media/");
}
