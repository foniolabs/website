import { sanityFetch } from "@/lib/sanity/fetch";

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
  skoolbox: "#fb923c",
  "rabit-wallet": "#6366f1",
};

const TAG_BY_SLUG: Record<string, string> = {
  skoolbox: "EdTech",
  "rabit-wallet": "Web3 Wallet",
};

// Status isn't a schema field yet (see MIGRATION.md §3) — map it by slug.
const STATUS_BY_SLUG: Record<string, string> = {
  skoolbox: "In Development",
  "rabit-wallet": "In Development",
};

const FALLBACK: ProductView[] = [
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
  {
    slug: null,
    name: "Rabit Wallet",
    tag: "Web3 Wallet",
    color: "#6366f1",
    description:
      "An embedded wallet SDK that gives users a non-custodial wallet from a simple email or Google sign-in — no seed phrases, no browser extensions. It supports both EVM chains and Solana from a single login, with a built-in fiat on-ramp.",
    features: [
      "Web2 Sign-In",
      "Non-Custodial Security",
      "EVM + Solana",
      "Built-In Fiat On-Ramp",
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
  status: STATUS_BY_SLUG[p.slug] ?? "Active",
});

export default async function ProductsPage() {
  const docs = await sanityFetch<ListingDoc[]>({
    query: productListingDetailQuery,
    tags: ["type:product"],
  });
  const products = docs?.length ? docs.map(toView) : FALLBACK;
  return <ProductsPageContent products={products} />;
}
