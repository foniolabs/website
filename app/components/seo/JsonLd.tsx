import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery } from "@/lib/sanity/queries";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://foniolabs.xyz"
).replace(/\/+$/, "");

// JSON-LD helpers. Each component renders a single <script type="application/
// ld+json"> tag. They're server components so the JSON is pre-serialised —
// zero runtime cost. Schema.org types used:
//   - Organization (site-wide, in root layout)
//   - Article (per blog post, on /blog/[slug])
//   - Product (per product, on /products/[slug])
//   - BreadcrumbList (per deep route)

type SiteSettings = {
  siteName?: string;
  contactEmail?: string;
  defaultOgImage?: { asset?: { url?: string } };
  logo?: { asset?: { url?: string } };
  social?: {
    x?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
};

function serialize(obj: Record<string, unknown>) {
  // Strip undefined keys, escape forward slashes in <script> contexts to
  // prevent </script> injection from any user-provided string.
  const json = JSON.stringify(obj, (_k, v) =>
    v === undefined ? undefined : v,
  ).replace(/</g, "\\u003c");
  return json;
}

export async function OrganizationJsonLd() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["site"],
  });

  const sameAs = [
    settings?.social?.x,
    settings?.social?.linkedin,
    settings?.social?.github,
    settings?.social?.youtube,
  ].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.siteName ?? "Fonio Labs",
    url: SITE_URL,
    logo: settings?.logo?.asset?.url,
    image: settings?.defaultOgImage?.asset?.url,
    email: settings?.contactEmail,
    sameAs: sameAs.length ? sameAs : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

type ArticleProps = {
  headline: string;
  description?: string;
  publishedAt?: string;
  authorName?: string;
  imageUrl?: string;
  slug: string;
};

export function ArticleJsonLd({
  headline,
  description,
  publishedAt,
  authorName,
  imageUrl,
  slug,
}: ArticleProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: authorName
      ? { "@type": "Person", name: authorName }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Fonio Labs",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

type BreadcrumbItem = { name: string; href: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.href}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
