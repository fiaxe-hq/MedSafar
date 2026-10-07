import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { countrySlugs } from "./content/countries";

/**
 * Client preview: the home page, doctors and hospitals are open. Every other
 * page sends the visitor to /coming-soon. The pages themselves are untouched.
 * Set to false to open the full site again.
 */
const clientPreview = true;

const hiddenPages = [
  "/treatments/:path*",
  "/blog/:path*",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  ...countrySlugs.map((slug) => `/${slug}`),
];

const nextConfig: NextConfig = {
  experimental: {
    // Medical reports are uploaded through the enquiry form's Server Action.
    // The form caps files at 8 MB; this leaves room for multipart overhead.
    serverActions: { bodySizeLimit: "9mb" },
  },
  async redirects() {
    if (!clientPreview) return [];
    return [
      ...hiddenPages.map((source) => ({ source, destination: "/coming-soon", permanent: false })),
    ];
  },
};

export default nextConfig;

// Gives `next dev` access to the Cloudflare bindings (D1, R2) through local emulators.
initOpenNextCloudflareForDev();
