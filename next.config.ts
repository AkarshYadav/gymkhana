import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks during build
  },
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript errors during build
  },
};

export default nextConfig;
