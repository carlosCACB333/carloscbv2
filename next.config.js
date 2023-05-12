/** @type {import('next').NextConfig} */
const nextConfig = {
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
