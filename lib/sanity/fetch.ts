import { draftMode } from "next/headers";

import { client, draftClient } from "./client";

// Centralised server-side GROQ fetch. Routes call this instead of touching
// the client directly so the published-vs-draft branch lives in one place.
// Day 6 wires `/api/draft-mode/enable` which flips draftMode(); until then
// this always returns published content.
// Hard ceiling on any single Sanity read. If the dataset is slow or
// unreachable (flaky network, CDN hiccup) we must never let the RSC render
// hang — a hung fetch here blocks the whole layout and every page with it.
// On timeout/error we log and resolve `null`; every caller already treats
// missing data as a fallback (hardcoded content, empty state, or null render).
const SANITY_FETCH_TIMEOUT_MS = 8000;

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

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error("sanityFetch: timed out")),
      SANITY_FETCH_TIMEOUT_MS,
    );
  });

  const request = c.fetch<T>(query, params, {
    next: { revalidate: isDraftMode ? 0 : 60, tags },
  });
  // If the timeout wins the race, `request` may still reject later; swallow it
  // here so it can't bubble up as an unhandled rejection.
  request.catch(() => {});

  try {
    return await Promise.race([request, timeout]);
  } catch (err) {
    console.error(
      `[sanityFetch] returning null — ${(err as Error).message}`,
    );
    // Callers are null-tolerant; returning null keeps the page responsive.
    return null as T;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
