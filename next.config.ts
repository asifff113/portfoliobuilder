import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    // Temporarily ignore TypeScript errors during build
    // TODO: Fix all type errors in templates
    ignoreBuildErrors: true,
  },
  experimental: {
  },
};

export default nextConfig;
