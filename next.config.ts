import type { NextConfig } from "next";
import { createClient } from "next-sanity";

// Pull redirect docs from Sanity at build time so the SlugInput auto-redirect
// flow (Day 4) actually produces production 301s, and manual redirect entries
// editors add in Studio are emitted as next.config redirects. Errors here
// are non-fatal — if Sanity is unreachable at build, we ship without
// CMS-driven redirects rather than failing the build.

type SanityRedirect = {
  from: string;
  to: string;
  statusCode?: number;
};

async function fetchSanityRedirects(): Promise<SanityRedirect[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) return [];
  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-05-31",
      useCdn: false,
    });
    return await client.fetch<SanityRedirect[]>(
      `*[_type == "redirect" && defined(from) && defined(to)]{ from, to, statusCode }`,
    );
  } catch (err) {
    console.warn(
      "[next.config] Failed to load Sanity redirects:",
      (err as Error).message,
    );
    return [];
  }
}

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
  async redirects() {
    const docs = await fetchSanityRedirects();
    return [
      // News → Blog rename: preserve old indexed URLs with permanent redirects.
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/news/:slug", destination: "/blog/:slug", permanent: true },
      ...docs.map((r) => ({
        source: r.from,
        destination: r.to,
        permanent: (r.statusCode ?? 301) === 301,
      })),
    ];
  },
};

export default nextConfig;
