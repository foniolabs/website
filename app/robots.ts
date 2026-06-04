import type { MetadataRoute } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://foniolabs.xyz"
).replace(/\/+$/, "");

// Next 16 metadata-route → /robots.txt. Tells crawlers:
//   - everything's allowed by default
//   - /studio (the embedded Sanity Studio) is not indexable
//   - /api routes are not indexable (CMS webhooks, draft-mode toggles, OG generator)
//   - the sitemap lives at /sitemap.xml
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
