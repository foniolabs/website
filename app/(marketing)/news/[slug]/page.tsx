import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableText } from "@/app/components/sanity/PortableText";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  allPostSlugsQuery,
  postBySlugQuery,
} from "@/lib/sanity/queries";

type PostDoc = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  tags?: string[];
  coverImage?: {
    asset?: {
      url?: string;
      metadata?: { dimensions?: { width?: number; height?: number }; lqip?: string };
    };
    alt?: string;
  };
  body?: unknown;
  author?: {
    name?: string;
    role?: string;
    bio?: string;
    slug?: string;
    avatar?: { asset?: { url?: string }; alt?: string };
  };
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    noIndex?: boolean;
    ogImage?: { asset?: { url?: string } };
  };
};

const formatDate = (iso?: string) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await sanityFetch<PostDoc | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`],
  });
  if (!doc) return {};
  const seoTitle = doc.seo?.title ?? doc.title;
  const seoDescription = doc.seo?.description ?? doc.excerpt ?? undefined;
  const ogImageUrl =
    doc.seo?.ogImage?.asset?.url ??
    doc.coverImage?.asset?.url ??
    `/api/og?title=${encodeURIComponent(seoTitle)}${
      seoDescription ? `&subtitle=${encodeURIComponent(seoDescription)}` : ""
    }&eyebrow=${encodeURIComponent("foniolabs.xyz / News")}`;
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: doc.seo?.canonical ? { canonical: doc.seo.canonical } : undefined,
    robots: doc.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
      type: "article",
      publishedTime: doc.publishedAt,
      authors: doc.author?.name ? [doc.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await sanityFetch<PostDoc | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`],
  });
  if (!doc) notFound();

  const coverSrc = doc.coverImage?.asset
    ? urlFor(doc.coverImage as never).width(1600).url()
    : null;
  const coverDims = doc.coverImage?.asset?.metadata?.dimensions;
  const avatarSrc = doc.author?.avatar?.asset
    ? urlFor(doc.author.avatar as never).width(80).height(80).url()
    : null;

  return (
    <article>
      <header className="px-6 md:px-12 pt-32 pb-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/news"
            className="text-sm font-mono text-orange-500 hover:underline underline-offset-4"
          >
            ← All news
          </Link>
          {doc.tags && doc.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {doc.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono uppercase tracking-wider text-orange-400 border border-orange-400/40 rounded-full px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            {doc.title}
          </h1>
          {doc.excerpt && (
            <p className="mt-4 text-xl text-neutral-400">{doc.excerpt}</p>
          )}
          <div className="mt-6 flex items-center gap-4 text-sm text-neutral-400">
            {avatarSrc && doc.author && (
              <div className="flex items-center gap-2">
                <Image
                  src={avatarSrc}
                  alt={doc.author.avatar?.alt ?? doc.author.name ?? "Author"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-neutral-300">{doc.author.name}</span>
              </div>
            )}
            <time dateTime={doc.publishedAt}>{formatDate(doc.publishedAt)}</time>
          </div>
        </div>
      </header>

      {coverSrc && (
        <div className="px-6 md:px-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <Image
              src={coverSrc}
              alt={doc.coverImage?.alt ?? doc.title}
              width={coverDims?.width ?? 1600}
              height={coverDims?.height ?? 900}
              placeholder={doc.coverImage?.asset?.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={doc.coverImage?.asset?.metadata?.lqip}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>
        </div>
      )}

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto prose prose-invert prose-headings:tracking-tight">
          {doc.body ? (
            <PortableText value={doc.body as never} />
          ) : (
            <p className="text-neutral-500">No body content yet.</p>
          )}
        </div>
      </section>

      {doc.author?.bio && (
        <section className="px-6 md:px-12 pb-24">
          <div className="max-w-3xl mx-auto border-t border-neutral-800 pt-8 flex gap-4 items-start">
            {avatarSrc && (
              <Image
                src={avatarSrc}
                alt={doc.author.avatar?.alt ?? doc.author.name ?? "Author"}
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div>
              <div className="font-semibold">{doc.author.name}</div>
              {doc.author.role && (
                <div className="text-sm text-neutral-400">{doc.author.role}</div>
              )}
              <p className="mt-2 text-sm text-neutral-300">{doc.author.bio}</p>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
