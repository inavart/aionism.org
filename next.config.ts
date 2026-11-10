import type { NextConfig } from "next";

// Static export for GitHub Pages: plain files in out/, no server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
