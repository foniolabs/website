import { sanityFetch } from "@/lib/sanity/fetch";
import { productsListQuery } from "@/lib/sanity/queries";

import { ProductsPageContent, type ProductView } from "./ProductsPageContent";

type ProductDoc = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  heroImage?: { asset?: { url?: string } };
  order?: number;
};

// Stable name → accent color so the visual continuity holds when marketing
// adds a new product. Unknown products fall back to indigo.
const COLOR_BY_SLUG: Record<string, string> = {
  "futbol-fusion": "#34d399",
  skoolbox: "#fb923c",
  stacka: "#60a5fa",
};

const TAG_BY_SLUG: Record<string, string> = {
  "futbol-fusion": "Web3 Gaming",
  skoolbox: "EdTech",
  stacka: "Fintech",
};

const FALLBACK: ProductView[] = [
  {
    slug: null,
    name: "Futbol Fusion",
    tag: "Web3 Gaming",
    color: "#34d399",
    description:
      "A Web3-powered football gaming platform that merges the excitement of fantasy sports with blockchain ownership. Players collect, trade, and compete with digital assets in a decentralized gaming ecosystem.",
    features: [
      "NFT Player Cards",
      "Play-to-Earn Mechanics",
      "Live Match Integration",
      "Community Tournaments",
    ],
    status: "In Development",
  },
  {
    slug: null,
    name: "Skoolbox",
    tag: "EdTech",
    color: "#fb923c",
    description:
      "A comprehensive education platform designed for African schools and institutions. Skoolbox streamlines learning management, student tracking, and communication between teachers, students, and parents.",
    features: [
      "Learning Management System",
      "Student Progress Tracking",
      "Parent-Teacher Communication",
      "Offline-First Design",
    ],
    status: "In Development",
  },
];

// Pull the list listing only — for the rich per-product detail, the listing
// re-fetches the description+features from the corresponding product doc.
// On a static listing page this is one batched query so it's cheap.
const productListingDetailQuery = `*[_type == "product" && defined(slug.current)] | order(coalesce(order, 100) asc){
  _id,
  name,
  "slug": slug.current,
  tagline,
  description,
  "features": features[]{ title },
  order
}`;

type ListingDoc = ProductDoc & {
  description?: unknown;
  features?: Array<{ title?: string }>;
};

const portableTextToPlain = (blocks: unknown): string => {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter(
      (b): b is { _type: string; children?: Array<{ text?: string }> } =>
        typeof b === "object" && b !== null && (b as { _type?: unknown })._type === "block",
    )
    .map((b) =>
      (b.children ?? [])
        .map((c) => c.text ?? "")
        .join(""),
    )
    .join("\n\n");
};

const toView = (p: ListingDoc): ProductView => ({
  slug: p.slug,
  name: p.name,
  tag: TAG_BY_SLUG[p.slug] ?? "Product",
  color: COLOR_BY_SLUG[p.slug] ?? "#818cf8",
  description:
    portableTextToPlain(p.description) || p.tagline || "",
  features: (p.features ?? [])
    .map((f) => f.title)
    .filter((t): t is string => !!t),
  // Status isn't migrated as a schema field (see MIGRATION.md §3) — show a
  // generic "Active" until we add it back to the schema.
  status: "Active",
});

export default async function ProductsPage() {
  const docs = await sanityFetch<ListingDoc[]>({
    query: productListingDetailQuery,
    tags: ["type:product"],
  });
  const products = docs?.length ? docs.map(toView) : FALLBACK;
  return <ProductsPageContent products={products} />;
}
