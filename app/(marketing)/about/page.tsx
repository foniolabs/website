import Image from "next/image";

import { SectionRenderer } from "@/app/components/sanity/SectionRenderer";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { pageBySlugQuery, siteSettingsQuery } from "@/lib/sanity/queries";

import { AboutPageContent } from "./AboutPageContent";

type PageDoc = {
  _id: string;
  title: string;
  slug: string;
  hero?: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    backgroundImage?: {
      asset?: { _ref?: string };
      alt?: string;
    };
  };
  sections?: Array<{ _type?: string; _key?: string } & Record<string, unknown>>;
};

type SiteSettings = {
  hubspotPortalId?: string;
  hubspotRegion?: string;
};

// Sanity-first with hardcoded fallback. The same pattern the Day 7 listings
// use: if the Sanity page doc has actual sections composed in Studio, that
// render takes over; otherwise the existing hardcoded narrative renders.
// Marketing migrates the page progressively by adding sections in Studio,
// at which point we can delete AboutPageContent.tsx.
export default async function AboutPage() {
  const [doc, settings] = await Promise.all([
    sanityFetch<PageDoc | null>({
      query: pageBySlugQuery,
      params: { slug: "about" },
      tags: ["page:about"],
    }),
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["site"],
    }),
  ]);

  const hasSanitySections = !!doc?.sections?.length;
  if (!hasSanitySections) return <AboutPageContent />;

  const hero = doc.hero;
  const bgSrc = hero?.backgroundImage?.asset
    ? urlFor(hero.backgroundImage as never).width(1920).url()
    : null;

  return (
    <article>
      {hero?.headline && (
        <header
          className="relative pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden"
          style={{ background: "#0b0f1a" }}
        >
          {bgSrc && (
            <Image
              src={bgSrc}
              alt={hero.backgroundImage?.alt ?? ""}
              fill
              className="object-cover opacity-20"
              priority
            />
          )}
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {hero.eyebrow && (
              <div className="font-mono text-sm font-semibold tracking-wider text-blue-300 mb-6">
                {hero.eyebrow}
              </div>
            )}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white">
              {hero.headline}
            </h1>
            {hero.subheadline && (
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                {hero.subheadline}
              </p>
            )}
          </div>
        </header>
      )}

      <SectionRenderer
        sections={doc.sections}
        globals={{
          hubspotPortalId: settings?.hubspotPortalId,
          hubspotRegion: settings?.hubspotRegion,
        }}
      />
    </article>
  );
}
