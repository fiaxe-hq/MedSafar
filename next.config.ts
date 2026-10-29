import type { NextConfig } from "next";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** A short fingerprint of every file in public/photos: it changes when any
 *  photo is added, replaced or removed (see lib/imageLoader.ts). */
function photosVersion() {
  const hash = createHash("sha1");
  const dir = join(process.cwd(), "public", "photos");
  for (const file of readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((f) => f.isFile())
    .map((f) => join(f.parentPath, f.name))
    .sort()) {
    hash.update(file.slice(dir.length)).update(readFileSync(file));
  }
  return hash.digest("hex").slice(0, 10);
}
const photos = photosVersion();

const nextConfig: NextConfig = {
  // About 8,000 pages are built ahead (every language times every treatment,
  // doctor and hospital); on a busy machine some take longer than the
  // default 60 seconds.
  staticPageGenerationTimeout: 300,
  env: { PHOTOS_VERSION: photos },
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    // Photos only under their current version; everything else without a query.
    localPatterns: [
      { pathname: "/photos/**", search: `?v=${photos}` },
      { pathname: "/**", search: "" },
    ],
  },
  experimental: {
    // Medical reports are uploaded through the enquiry form's Server Action.
    // The form caps files at 8 MB; this leaves room for multipart overhead.
    serverActions: { bodySizeLimit: "9mb" },
  },
};

export default nextConfig;

// Gives `next dev` access to the Cloudflare bindings (D1, R2) through local emulators.
initOpenNextCloudflareForDev();
