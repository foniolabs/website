"use client";

/**
 * Embedded Sanity Studio route — client component (Sanity UI relies on
 * styled-components / React context, which can only run on the client).
 *
 * Metadata + viewport are exported from the sibling layout.tsx instead, since
 * a client component can't export them.
 */
import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
