import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, readToken } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

// Server-only client that can read drafts. Use inside route handlers / RSCs
// when draftMode().isEnabled is true.
export const draftClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "drafts",
  token: readToken,
  stega: { studioUrl: "/studio" },
});
