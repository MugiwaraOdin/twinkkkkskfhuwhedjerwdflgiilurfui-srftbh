/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  // Allow development origins for iframe access
  allowedDevOrigins: ["work-1-dwfajxuoiycpzfnc.prod-runtime.all-hands.dev", "work-2-dwfajxuoiycpzfnc.prod-runtime.all-hands.dev"],
  // Disable Reown AppKit
  webpack: (config, { isServer }) => {
    // Add a rule to ignore @reown modules
    config.module.rules.push({
      test: /node_modules\/@reown/,
      use: 'null-loader',
    });
    
    return config;
  },
};

module.exports = nextConfig;
