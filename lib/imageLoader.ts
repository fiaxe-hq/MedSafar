/**
 * Next's own image address, plus the photos' version on anything from
 * public/photos. Browsers keep a photo for a year (public/_headers), so a
 * replaced photo must come under a new address; the version changes whenever
 * any file in public/photos does (next.config.ts).
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const url = src.startsWith("/photos/") ? `${src}?v=${process.env.PHOTOS_VERSION}` : src;
  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=${quality || 75}`;
}
