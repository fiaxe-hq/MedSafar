import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Medical reports are uploaded through the enquiry form's Server Action.
    // The form caps files at 8 MB; this leaves room for multipart overhead.
    serverActions: { bodySizeLimit: "9mb" },
  },
};

export default nextConfig;
