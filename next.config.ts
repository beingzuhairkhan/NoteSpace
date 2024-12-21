import type { NextConfig } from "next";
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React strict mode
  swcMinify: true,       // Use SWC for minification
  webpack: (config, { isServer }) => {
    // Ensure `yjs` is only imported once
    if (!isServer) {
      config.resolve.alias['yjs'] = require.resolve('yjs');
    }
    return config;
  },
  eslint: {
   
    ignoreDuringBuilds: true, // Ignore ESLint during builds
  },
};

export default nextConfig;
