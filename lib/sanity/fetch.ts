import { draftMode } from "next/headers";

import { client, draftClient } from "./client";

// Centralised server-side GROQ fetch. Routes call this instead of touching
// the client directly so the published-vs-draft branch lives in one place.
// Day 6 wires `/api/draft-mode/enable` which flips draftMode(); until then
// this always returns published content.
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  // Next 16 cache tags — revalidation routes hit these when content changes.
  tags?: string[];
}): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode();
  const c = isDraftMode ? draftClient : client;
  return c.fetch<T>(query, params, {
    next: {
      revalidate: isDraftMode ? 0 : 60,
      tags,
    },
  });
}
