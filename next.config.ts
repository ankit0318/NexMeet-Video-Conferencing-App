import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  // Your existing config
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Fix path resolution issues with Tailwind
      "tailwindcss/lib/corePlugins": require.resolve(
        "tailwindcss/lib/corePlugins"
      ),
    };
    return config;
  },
  // Updated Turbopack configuration (now stable)
  turbopack: {
    // Configure Turbopack here
    resolveAlias: {
      "tailwindcss/lib/corePlugins": require.resolve(
        "tailwindcss/lib/corePlugins"
      ),
    },
  },
};

export default nextConfig;
