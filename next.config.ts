import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: 'export',  // This creates HTML files!
  images: { unoptimized: true }
};

export default nextConfig;
