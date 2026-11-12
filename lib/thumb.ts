/**
 * The small copy of a menu photo (scripts/thumbs.mjs), served as a plain file
 * so opening a header menu needs no work from the Worker. Photos from other
 * folders, or uploaded in /admin, are returned as they are.
 */
const folders = /^\/photos\/(care|doctors|hospitals)\/(.+)\.(jpe?g|png|webp)$/i;

export function menuThumb(src: string | null | undefined): string | undefined {
  const match = src?.match(folders);
  return match ? `/thumbs/${match[1]}/${match[2]}.webp?v=${process.env.PHOTOS_VERSION}` : (src ?? undefined);
}

/** True for a photo that must be shown as it is, not resized by Next. */
export const isPlainFile = (src: string) => src.startsWith("/thumbs/") || src.startsWith("/media/");
