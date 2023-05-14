/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "recog-data-ia.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
