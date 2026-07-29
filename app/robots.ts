import type { MetadataRoute } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.foniolabs.xyz"
).replace(/\/+$/, "");

// Served at /robots.txt. Points crawlers at the sitemap; blocks Studio,
// API, and draft-mode paths from indexing.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio",
          "/studio/",
          "/api/",
          "/api/draft-mode/",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL.replace(/^https?:\/\//, ""),
  };
}
