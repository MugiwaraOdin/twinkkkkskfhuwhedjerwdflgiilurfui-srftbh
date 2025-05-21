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
  // Handle Reown AppKit and other problematic modules
  webpack: (config, { isServer }) => {
    // Create an alias for @reown modules to use our mock implementations
    config.resolve.alias = {
      ...config.resolve.alias,
      '@reown/appkit': require.resolve('./src/lib/reown-mock.ts'),
      '@reown/appkit-ui': require.resolve('./src/lib/reown-mock.ts'),
      '@reown/appkit-wallet': require.resolve('./src/lib/reown-mock.ts'),
      '@reown/appkit-controllers': require.resolve('./src/lib/reown-mock.ts'),
    };
    
    // Prevent errors from missing modules
    config.module.rules.push({
      test: /node_modules\/@reown/,
      use: 'null-loader',
    });
    
    return config;
  },
  // Disable React strict mode to prevent double rendering issues with Reown
  reactStrictMode: false,
};

module.exports = nextConfig;
