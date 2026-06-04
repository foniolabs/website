import type { MetadataRoute } from "next";

import { client } from "@/lib/sanity/client";
import {
  allPageSlugsQuery,
  allPostSlugsQuery,
  allProductSlugsQuery,
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

const u = (
  path: string,
  changeFrequency: Entry["changeFrequency"] = "weekly",
  priority = 0.7,
): Entry => ({
  url: `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pageSlugs, postSlugs, productSlugs] = await Promise.all([
    client.fetch<string[]>(allPageSlugsQuery),
    client.fetch<string[]>(allPostSlugsQuery),
    client.fetch<string[]>(allProductSlugsQuery),
  ]);

  const top: Entry[] = [
    u("/", "daily", 1.0),
    u("/about", "weekly", 0.8),
    u("/team", "weekly", 0.6),
    u("/products", "weekly", 0.8),
    u("/news", "daily", 0.8),
    u("/contact", "monthly", 0.5),
  ];

  // Page docs at /p/<slug> (preview + Sanity-driven). Skip "home" and
  // "about" since they already appear at the canonical top-level paths.
  const pages: Entry[] = pageSlugs
    .filter((slug) => slug !== "home" && slug !== "about")
    .map((slug) => u(`/p/${slug}`, "weekly", 0.5));

  const posts: Entry[] = postSlugs.map((slug) =>
    u(`/news/${slug}`, "weekly", 0.7),
  );

  const products: Entry[] = productSlugs.map((slug) =>
    u(`/products/${slug}`, "weekly", 0.8),
  );

  return [...top, ...pages, ...posts, ...products];
}
