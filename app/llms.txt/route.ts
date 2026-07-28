import { sanityFetch } from "@/lib/sanity/fetch";
import { postsListQuery, productsListQuery } from "@/lib/sanity/queries";

// llms.txt (https://llmstxt.org/) — a plain-text index for AI agents/LLMs,
// the same job robots.txt does for crawlers and sitemap.xml does for search
// engines. Served at /llms.txt as a route handler (not a static public/ file)
// so the Products and Blog sections stay in sync with Sanity instead of
// drifting out of date.

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://foniolabs.xyz"
).replace(/\/+$/, "");

type PostDoc = { title: string; slug: string; excerpt?: string };
type ProductDoc = { name: string; slug: string; tagline?: string };

// Longest-standing posts first isn't useful here — newest is what an agent
// answering "what has this company shipped/written recently" wants.
const MAX_POSTS = 25;

const line = (label: string, path: string, description?: string) =>
  `- [${label}](${SITE_URL}${path})${description ? `: ${description}` : ""}`;

export async function GET() {
  const [posts, products] = await Promise.all([
    sanityFetch<PostDoc[]>({ query: postsListQuery, tags: ["type:post"] }),
    sanityFetch<ProductDoc[]>({
      query: productsListQuery,
      tags: ["type:product"],
    }),
  ]);

  const productLines = (products ?? [])
    .map((p) => line(p.name, `/products/${p.slug}`, p.tagline))
    .join("\n");

  const postLines = (posts ?? [])
    .slice(0, MAX_POSTS)
    .map((p) => line(p.title, `/blog/${p.slug}`, p.excerpt))
    .join("\n");

  const body = `# Fonio Labs

> A Nigerian technology product studio building user-friendly tools and platforms across Web3, AI, gaming, education, and fintech.

Fonio Labs designs and ships its own products rather than taking client work. Flagship products include Skoolbox, an offline-first AI education platform for African schools, and Rabit Wallet, an embedded non-custodial Web3 wallet. The team is remote-first and based in Nigeria.

## Products

${productLines || line("Products", "/products", "Full product lineup")}

## Company

${line("About", "/about", "Studio story, mission, and quick facts")}
${line("Team", "/team", "The people building Fonio Labs")}
${line("Contact", "/contact", "Get in touch")}

## Blog

${postLines || line("Blog", "/blog", "News, product updates, and engineering notes")}

## Optional

${line("Full page list (XML sitemap)", "/sitemap.xml")}
${line("All blog posts", "/blog")}
${line("All products", "/products")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
