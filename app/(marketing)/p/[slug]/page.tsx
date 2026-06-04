import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { SectionRenderer } from "@/app/components/sanity/SectionRenderer";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  allPageSlugsQuery,
  pageBySlugQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";

// Renders any Sanity `page` doc at /p/<slug>. Sits alongside the existing
// top-level pages (/, /about, /contact, …) so editors can build pages in
// Studio and preview them without fighting routes that still render
// hardcoded JSX. As marketing replaces hardcoded routes with Sanity-driven
// versions (see DEFERRED.md), they migrate over from /p/<slug> to the real
// route.

type PageDoc = {
  _id: string;
  title: string;
  slug: string;
  hero?: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    backgroundImage?: {
      asset?: {
        _ref?: string;
        url?: string;
        metadata?: { dimensions?: { width?: number; height?: number }; lqip?: string };
      };
      alt?: string;
    };
  };
  sections?: Array<{ _type?: string; _key?: string } & Record<string, unknown>>;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    noIndex?: boolean;
    ogImage?: { asset?: { url?: string } };
  };
};

type SiteSettings = {
  hubspotPortalId?: string;
  hubspotRegion?: string;
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allPageSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await sanityFetch<PageDoc | null>({
    query: pageBySlugQuery,
    params: { slug },
    tags: [`page:${slug}`],
  });
  if (!doc) return {};
  const seoTitle = doc.seo?.title ?? doc.title;
  const seoDescription = doc.seo?.description ?? doc.hero?.subheadline;
  const ogImageUrl =
    doc.seo?.ogImage?.asset?.url ??
    `/api/og?title=${encodeURIComponent(seoTitle)}${
      seoDescription ? `&subtitle=${encodeURIComponent(seoDescription)}` : ""
    }`;
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: doc.seo?.canonical ? { canonical: doc.seo.canonical } : undefined,
    robots: doc.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
      type: "website",
    },
  };
}

export default async function SanityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [doc, settings] = await Promise.all([
    sanityFetch<PageDoc | null>({
      query: pageBySlugQuery,
      params: { slug },
      tags: [`page:${slug}`],
    }),
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["site"],
    }),
  ]);

  if (!doc) notFound();

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
              sizes="100vw"
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

      {!hero?.headline && (!doc.sections || doc.sections.length === 0) && (
        <div className="py-40 px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">{doc.title}</h1>
          <p className="text-neutral-400">
            This Sanity page has no hero or sections yet. Add some in{" "}
            <a href="/studio" className="text-orange-400 underline">
              Studio
            </a>
            .
          </p>
        </div>
      )}
    </article>
  );
}
