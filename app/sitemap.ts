import type { MetadataRoute } from "next";

import { client } from "@/lib/sanity/client";
import {
  sitemapPagesQuery,
  sitemapPostsQuery,
  sitemapProductsQuery,
} from "@/lib/sanity/queries";

// Served at /sitemap.xml. Rebuilds on demand (ISR) so new Sanity slugs
// appear without a full redeploy. noIndex docs are excluded in the GROQ
// queries so they never get submitted to search engines.

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.foniolabs.xyz"
).replace(/\/+$/, "");

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];
type SlugDoc = { slug: string; updatedAt: string };

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

const top: Entry[] = [
  u("/", "daily", 1.0),
  u("/about", "weekly", 0.8),
  u("/team", "weekly", 0.6),
  u("/products", "weekly", 0.8),
  u("/blog", "daily", 0.8),
  u("/contact", "monthly", 0.5),
  u("/case-studies/sanity-migration", "monthly", 0.4),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let pageDocs: SlugDoc[] = [];
  let postDocs: SlugDoc[] = [];
  let productDocs: SlugDoc[] = [];

  try {
    [pageDocs, postDocs, productDocs] = await Promise.all([
      client.fetch<SlugDoc[]>(sitemapPagesQuery),
      client.fetch<SlugDoc[]>(sitemapPostsQuery),
      client.fetch<SlugDoc[]>(sitemapProductsQuery),
    ]);
  } catch (err) {
    console.warn(
      "[sitemap] Sanity fetch failed — serving static routes only:",
      (err as Error).message,
    );
  }

  // Page docs at /p/<slug>. Skip "home" and "about" — those already appear
  // at the canonical top-level paths.
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
