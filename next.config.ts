import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/aktuelle-kurse", destination: "/", permanent: false },
      { source: "/kurse/:slug*", destination: "/", permanent: false },
      { source: "/team", destination: "/", permanent: false },
      { source: "/kursleiter-werden", destination: "/", permanent: false },
    ];
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
