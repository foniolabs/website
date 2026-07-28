import type { Metadata } from "next";

import { AboutPageContent } from "./AboutPageContent";

const TITLE = "About";
const DESCRIPTION =
  "Fonio Labs is a Nigerian technology product studio building tools that change industries — starting with education, powered by AI.";
const OG_IMAGE = `/api/og?title=${encodeURIComponent(TITLE)}&subtitle=${encodeURIComponent(DESCRIPTION)}&eyebrow=${encodeURIComponent("foniolabs.xyz")}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${TITLE} · Fonio Labs`,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · Fonio Labs`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// /about renders the studio-authored narrative directly. (Previously this was
// Sanity-page-builder-first; we render the hardcoded, brand-themed content so
// the page stays fast and fully on-theme without depending on CMS composition.)
export default function AboutPage() {
  return <AboutPageContent />;
}
