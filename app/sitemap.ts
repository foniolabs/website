import type { MetadataRoute } from "next";

import { client } from "@/lib/sanity/client";
import {
  sitemapPagesQuery,
  sitemapPostsQuery,
  sitemapProductsQuery,
} from "@/lib/sanity/queries";

// Next 16 metadata-route. Hit at /sitemap.xml at runtime; statically
// generated at build. Pulls every Sanity slug we render under a public URL,
// plus the always-on top-level marketing routes.
//
// Set NEXT_PUBLIC_SITE_URL in .env.local / Vercel env to your canonical
// origin (https://foniolabs.xyz). Falls back so dev works.

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://foniolabs.xyz"
).replace(/\/+$/, "");

type Entry = MetadataRoute.Sitemap[number];
type SlugDoc = { slug: string; updatedAt: string };

// Build timestamp — used only for the handful of static, hardcoded routes
// that have no Sanity doc (and thus no real _updatedAt) to report.
const BUILD_TIME = new Date();

const u = (
  path: string,
  changeFrequency: Entry["changeFrequency"] = "weekly",
  priority = 0.7,
  lastModified: Date = BUILD_TIME,
): Entry => ({
  url: `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`,
  lastModified,
  changeFrequency,
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pageDocs, postDocs, productDocs] = await Promise.all([
    client.fetch<SlugDoc[]>(sitemapPagesQuery),
    client.fetch<SlugDoc[]>(sitemapPostsQuery),
    client.fetch<SlugDoc[]>(sitemapProductsQuery),
  ]);

  const top: Entry[] = [
    u("/", "daily", 1.0),
    u("/about", "weekly", 0.8),
    u("/team", "weekly", 0.6),
    u("/products", "weekly", 0.8),
    u("/blog", "daily", 0.8),
    u("/contact", "monthly", 0.5),
    u("/case-studies/sanity-migration", "monthly", 0.4),
  ];

  // Page docs at /p/<slug> (preview + Sanity-driven). Skip "home" and
  // "about" since they already appear at the canonical top-level paths.
  const pages: Entry[] = pageDocs
    .filter((doc) => doc.slug !== "home" && doc.slug !== "about")
    .map((doc) =>
      u(`/p/${doc.slug}`, "weekly", 0.5, new Date(doc.updatedAt)),
    );

  const posts: Entry[] = postDocs.map((doc) =>
    u(`/blog/${doc.slug}`, "weekly", 0.7, new Date(doc.updatedAt)),
  );

  const products: Entry[] = productDocs.map((doc) =>
    u(`/products/${doc.slug}`, "weekly", 0.8, new Date(doc.updatedAt)),
  );

  return [...top, ...pages, ...posts, ...products];
}
