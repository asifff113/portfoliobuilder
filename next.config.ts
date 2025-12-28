import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ypjvnblbqbnecdodiwew.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Add cache control headers for public portfolio pages
  async headers() {
    return [
      {
        source: '/p/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
