import { sanityFetch } from "@/lib/sanity/fetch";
import { postsListQuery } from "@/lib/sanity/queries";

import { NewsPageContent, type NewsPostView } from "./NewsPageContent";

type PostDoc = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  tags?: string[];
};

// Stable tag-name → accent color. Lets the design team add new tags in Studio
// without losing the colored badge UX. Unknown tags fall back to indigo.
const TAG_COLOR: Record<string, string> = {
  Product: "#34d399",
  Company: "#818cf8",
  Engineering: "#60a5fa",
  Design: "#f472b6",
  "Futbol Fusion": "#34d399",
  Skoolbox: "#fb923c",
  Stacka: "#60a5fa",
};

const formatDate = (iso?: string) => {
  if (!iso) return "Coming Soon";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
};

const FALLBACK: NewsPostView[] = [
  {
    slug: null,
    title: "Introducing Futbol Fusion — Web3 Meets Fantasy Sports",
    excerpt:
      "We're building a new kind of football gaming experience powered by blockchain. Here's what we're working on and why it matters.",
    date: "Coming Soon",
    tag: "Product",
    color: "#34d399",
  },
  {
    slug: null,
    title: "Why We're Building Skoolbox for African Schools",
    excerpt:
      "Education technology in Africa needs a different approach. Skoolbox is designed from the ground up for the realities of African classrooms.",
    date: "Coming Soon",
    tag: "Product",
    color: "#fb923c",
  },
  {
    slug: null,
    title: "The Fonio Labs Story — From Idea to Product Studio",
    excerpt:
      "How a passion for building technology products grew into a multi-industry studio tackling gaming, education, and fintech.",
    date: "Coming Soon",
    tag: "Company",
    color: "#818cf8",
  },
];

const toView = (p: PostDoc): NewsPostView => {
  const tag = p.tags?.[0] ?? "News";
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: formatDate(p.publishedAt),
    tag,
    color: TAG_COLOR[tag] ?? "#818cf8",
  };
};

export default async function NewsPage() {
  const docs = await sanityFetch<PostDoc[]>({
    query: postsListQuery,
    tags: ["type:post"],
  });
  const posts = docs?.length ? docs.map(toView) : FALLBACK;
  return <NewsPageContent posts={posts} />;
}
