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
      <header className="px-6 md:px-12 pt-32 pb-12">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/products"
            className="text-sm font-mono text-orange-500 hover:underline underline-offset-4"
          >
            ← All products
          </Link>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
            {doc.name}
          </h1>
          {doc.tagline && (
            <p className="mt-4 text-xl text-neutral-400 max-w-3xl">
              {doc.tagline}
            </p>
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
        <section className="px-6 md:px-12 pb-16">
          <div className="max-w-3xl mx-auto prose prose-invert prose-headings:tracking-tight">
            <PortableText value={doc.description as never} />
          </div>
        </section>
      ) : null}

      {doc.features && doc.features.length > 0 && (
        <section className="px-6 md:px-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {doc.features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
                >
                  {f.icon && (
                    <div className="font-mono text-xs text-orange-500 mb-2">
                      {f.icon}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  {f.body && (
                    <p className="text-sm text-neutral-400 leading-relaxed">
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
        <section className="px-6 md:px-12 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href={doc.ctaUrl}
              className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-md"
            >
              {doc.ctaLabel ?? "Learn more"}
            </Link>
          </div>
        </section>
      )}
    </article>
  );
}
