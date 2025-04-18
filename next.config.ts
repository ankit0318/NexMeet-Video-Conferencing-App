import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for performance
  reactStrictMode: true,
  swcMinify: true,

  // Improve loading performance
  images: {
    domains: [
      "stream-call-recordings.s3.amazonaws.com",
      "img.clerk.com",
      "images.clerk.dev",
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Experimental features for performance
  experimental: {
    // Enable app directory features
    appDir: true,
    // Optimize server components
    serverComponents: true,
    // Improve client-side navigation
    optimizeCss: true,
    // Faster page loads
    scrollRestoration: true,
  },

  // Your existing webpack config
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

  // Updated Turbopack configuration
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
