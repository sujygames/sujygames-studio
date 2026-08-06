import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // Ensure trailing slashes work properly with Vercel
  trailingSlash: false,
};

export default nextConfig;
