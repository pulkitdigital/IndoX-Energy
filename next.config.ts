import type { NextConfig } from "next";

// Static export for Hostinger shared hosting (no Node runtime). See docs/TRD.md §1a.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
