import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    minimumCacheTTL: 31536000,
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      {
        source: "/catering",
        destination: "/",
        permanent: false,
      },
      {
        source: "/team",
        destination: "/",
        permanent: false,
      },
      {
        source: "/kursleiter-werden",
        destination: "/",
        permanent: false,
      },
      {
        source: "/gutscheine",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
