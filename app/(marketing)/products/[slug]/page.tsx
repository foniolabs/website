import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableText } from "@/app/components/sanity/PortableText";
import { BreadcrumbJsonLd } from "@/app/components/seo/JsonLd";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  allProductSlugsQuery,
  productBySlugQuery,
} from "@/lib/sanity/queries";

// Live product sites, keyed by slug (until a "website" field is added to the
// product schema).
const WEBSITE_BY_SLUG: Record<string, string> = {
  skoolbox: "https://skoolbox.xyz",
  "rabit-wallet": "https://rabitwallet.xyz",
};

type ProductDoc = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: unknown;
  heroImage?: {
    asset?: {
      url?: string;
      metadata?: { dimensions?: { width?: number; height?: number }; lqip?: string };
    };
    alt?: string;
  };
  features?: Array<{ icon?: string; title?: string; body?: string; href?: string }>;
  ctaLabel?: string;
  ctaUrl?: string;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    noIndex?: boolean;
    ogImage?: { asset?: { url?: string } };
  };
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allProductSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await sanityFetch<ProductDoc | null>({
    query: productBySlugQuery,
    params: { slug },
    tags: [`product:${slug}`],
  });
  if (!doc) return {};
  const seoTitle = doc.seo?.title ?? doc.name;
  const seoDescription = doc.seo?.description ?? doc.tagline ?? undefined;
  const ogImageUrl =
    doc.seo?.ogImage?.asset?.url ??
    doc.heroImage?.asset?.url ??
    `/api/og?title=${encodeURIComponent(seoTitle)}${
      seoDescription ? `&subtitle=${encodeURIComponent(seoDescription)}` : ""
    }&eyebrow=${encodeURIComponent("foniolabs.xyz / Products")}`;
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
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await sanityFetch<ProductDoc | null>({
    query: productBySlugQuery,
    params: { slug },
    tags: [`product:${slug}`],
  });
  if (!doc) notFound();

  const website = WEBSITE_BY_SLUG[doc.slug];
  const heroSrc = doc.heroImage?.asset
    ? urlFor(doc.heroImage as never).width(1600).url()
    : null;
  const dims = doc.heroImage?.asset?.metadata?.dimensions;

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: doc.name, href: `/products/${doc.slug}` },
        ]}
      />
      <header className="px-6 md:px-12 pt-32 pb-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/products"
            className="text-sm font-mono hover:underline underline-offset-4"
            style={{ color: "#0a6cff" }}
          >
            ← All products
          </Link>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight" style={{ color: "#001842" }}>
            {doc.name}
          </h1>
          {doc.tagline && (
            <p className="mt-4 text-xl text-gray-500 max-w-3xl">
              {doc.tagline}
            </p>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-base transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#0a6cff" }}
            >
              Visit website
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </header>

      {heroSrc && (
        <div className="px-6 md:px-12 mb-16">
          <div className="max-w-5xl mx-auto">
            <Image
              src={heroSrc}
              alt={doc.heroImage?.alt ?? doc.name}
              width={dims?.width ?? 1600}
              height={dims?.height ?? 900}
              placeholder={doc.heroImage?.asset?.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={doc.heroImage?.asset?.metadata?.lqip}
              className="w-full h-auto rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
            />
          </div>
        </div>
      )}

      {doc.description ? (
        <section className="px-6 md:px-12 pb-16 bg-white">
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:tracking-tight prose-headings:text-[#001842] prose-p:text-gray-600 prose-a:text-[#0a6cff]">
            <PortableText value={doc.description as never} />
          </div>
        </section>
      ) : null}

      {doc.features && doc.features.length > 0 && (
        <section className="px-6 md:px-12 pb-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#001842" }}>Features</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {doc.features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ border: "1px solid rgba(0,24,66,0.1)", boxShadow: "0 8px 24px rgba(0,24,66,0.05)" }}
                >
                  {f.icon && (
                    <div className="font-mono text-xs mb-2" style={{ color: "#0a6cff" }}>
                      {f.icon}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#001842" }}>{f.title}</h3>
                  {f.body && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {f.body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {doc.ctaUrl && (
        <section className="px-6 md:px-12 pb-24 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href={doc.ctaUrl}
              className="inline-block text-white font-semibold px-8 py-4 rounded-lg transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#0a6cff" }}
            >
              {doc.ctaLabel ?? "Learn more"}
            </Link>
          </div>
        </section>
      )}
    </article>
  );
}
