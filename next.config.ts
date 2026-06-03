import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: output:'export' removed on the sanity-migration branch.
  // Sanity Studio, draft mode, ISR, and the Day-10 MCP integration all
  // require a Node runtime. Day-13 DNS cutover moves foniolabs.xyz from
  // Hostinger static hosting to Vercel.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
