import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// Origin the Presentation tool opens in its preview iframe. In production this
// becomes the deployed Vercel/foniolabs.xyz URL; for local dev we keep it on
// the same port as the Studio so editors don't need to flip between tabs.
const PREVIEW_ORIGIN =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ?? "http://localhost:3000";

export default defineConfig({
  name: "foniolabs",
  title: "Foniolabs",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: PREVIEW_ORIGIN,
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: {
        // Map a Studio document → the URL its content renders at on the site.
        // The Presentation tool uses this both to pre-open the iframe at the
        // right URL and to highlight matching docs as editors navigate.
        locations: {
          page: {
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title ?? "Untitled page",
                  href: `/${doc?.slug ?? ""}`.replace(/\/+/g, "/"),
                },
              ],
            }),
          },
          post: {
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title ?? "Untitled blog post",
                  href: `/blog/${doc?.slug ?? ""}`,
                },
                { title: "All blog posts", href: "/blog" },
              ],
            }),
          },
          product: {
            select: { name: "name", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name ?? "Untitled product",
                  href: `/products/${doc?.slug ?? ""}`,
                },
                { title: "All products", href: "/products" },
              ],
            }),
          },
          siteSettings: {
            select: { siteName: "siteName" },
            resolve: () => ({
              locations: [{ title: "Homepage", href: "/" }],
            }),
          },
          navigation: {
            select: { _id: "_id" },
            resolve: () => ({
              locations: [{ title: "Homepage", href: "/" }],
            }),
          },
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
