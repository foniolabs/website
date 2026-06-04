"use client";

import { createImageUrlBuilder } from "@sanity/image-url";
import { useMemo } from "react";
import { useClient } from "sanity";

import { apiVersion } from "../../env";

// Turns a Sanity asset _ref ("image-abc123-1200x630-jpg") into a CDN URL
// the Studio can display inline.
export function useImageUrl(assetRef?: string | null): string | null {
  const client = useClient({ apiVersion });
  return useMemo(() => {
    if (!assetRef) return null;
    try {
      return createImageUrlBuilder(client).image(assetRef).width(1200).url();
    } catch {
      return null;
    }
  }, [assetRef, client]);
}
