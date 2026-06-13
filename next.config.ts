import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We can add config options here if needed, but defaults are fine for this project
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

