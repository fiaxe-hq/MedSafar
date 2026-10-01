import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  experimental: {
    // Medical reports are uploaded through the enquiry form's Server Action.
    // The form caps files at 8 MB; this leaves room for multipart overhead.
    serverActions: { bodySizeLimit: "9mb" },
  },
};

export default nextConfig;

// Gives `next dev` access to the Cloudflare bindings (D1, R2) through local emulators.
initOpenNextCloudflareForDev();
