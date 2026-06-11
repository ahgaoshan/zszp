import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
