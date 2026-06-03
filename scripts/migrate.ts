/**
 * Foniolabs → Sanity content migration.
 *
 * Reads the source content (siteSettings, navigation, the founder/author,
 * the team list, the products list, and the news posts that were previously
 * hardcoded in app/(marketing)/{about,team,products,news,…}.tsx) and writes
 * matching documents into the Sanity dataset.
 *
 * Idempotent: every document uses a deterministic _id derived from its slug
 * (or, for singletons, a fixed value), so re-running the script updates the
 * existing doc instead of creating a duplicate.
 *
 * Run:
 *   --- dry run (no writes, no token needed) ---
 *   nvm use 22.20.0
 *   node --env-file=.env.local --experimental-strip-types \
 *        scripts/migrate.ts --dry-run
 *
 *   --- live run (needs SANITY_API_WRITE_TOKEN in .env.local) ---
 *   node --env-file=.env.local --experimental-strip-types \
 *        scripts/migrate.ts
 *
 * See MIGRATION.md for the source → target mapping table and rollback plan.
 */

import { createClient, type SanityClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";

const DRY_RUN =
  process.argv.includes("--dry-run") || process.argv.includes("-n");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-05-31";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local.",
  );
  process.exit(1);
}
if (!DRY_RUN && !token) {
  console.error(
    "SANITY_API_WRITE_TOKEN is not set. Generate one with Editor permissions at https://www.sanity.io/manage/project/" +
      projectId +
      "/api → Tokens, paste into .env.local, and re-run. (Or pass --dry-run to preview without writing.)",
  );
  process.exit(1);
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const PUBLIC_DIR = join(process.cwd(), "public");

// -----------------------------------------------------------------------
// Source data (lifted from the pre-migration hardcoded pages).
// -----------------------------------------------------------------------

const SITE = {
  siteName: "Fonio Labs",
  tagline: "Building the future of Web3 & AI",
  contactEmail: "info@foniolabs.xyz",
  social: {
    x: "https://x.com/foniolabs",
    linkedin: "https://www.linkedin.com/company/foniolabs",
    github: "https://github.com/foniolabs",
  },
};

const NAV = {
  headerLinks: [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Team", href: "/team" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
  headerCta: { label: "Get in touch", href: "/contact" },
  footerColumns: [
    {
      title: "Studio",
      links: [
        { label: "About", href: "/about" },
        { label: "Team", href: "/team" },
        { label: "News", href: "/news" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Futbol Fusion", href: "/products/futbol-fusion" },
        { label: "Skoolbox", href: "/products/skoolbox" },
      ],
    },
    {
      title: "Get in touch",
      links: [{ label: "Contact", href: "/contact" }],
    },
  ],
  footerBottomNote: "Fonio Labs — building products that change industries.",
};

const FOUNDER = {
  slug: "emmanuel-doji",
  name: "Emmanuel Doji",
  role: "Founder & CEO",
  bio: "Software Engineer and Systems Analyst with a degree in MIS. Passionate about making Web3 and AI accessible to everyone through user-friendly tools and innovative solutions.",
  photoPath: "/images/team/Founder.jpg",
  social: {
    github: "https://github.com/web3normad",
    linkedin: "https://ng.linkedin.com/in/emmanuel-doji",
    x: "https://x.com/emmanueldoji",
  },
};

const PRODUCTS = [
  {
    slug: "futbol-fusion",
    name: "Futbol Fusion",
    tagline: "Web3 meets fantasy football.",
    description:
      "A Web3-powered football gaming platform that merges the excitement of fantasy sports with blockchain ownership. Players collect, trade, and compete with digital assets in a decentralized gaming ecosystem.",
    features: [
      { title: "NFT Player Cards", body: "Own and trade unique player cards as on-chain assets." },
      { title: "Play-to-Earn Mechanics", body: "Win rewards for skill-based gameplay and tournament wins." },
      { title: "Live Match Integration", body: "Performance updates tied to real-world match data." },
      { title: "Community Tournaments", body: "Compete in community-run tournaments with prize pools." },
    ],
    order: 10,
  },
  {
    slug: "skoolbox",
    name: "Skoolbox",
    tagline: "Education tech built for African classrooms.",
    description:
      "A comprehensive education platform designed for African schools and institutions. Skoolbox streamlines learning management, student tracking, and communication between teachers, students, and parents.",
    features: [
      { title: "Learning Management", body: "Course content, assignments, and grading in one place." },
      { title: "Student Progress Tracking", body: "Real-time visibility into student outcomes for teachers and parents." },
      { title: "Parent-Teacher Communication", body: "Direct messaging and progress reports across roles." },
      { title: "Offline-First Design", body: "Built for low-connectivity classrooms — works without the internet." },
    ],
    order: 20,
  },
];

const POSTS = [
  {
    slug: "introducing-futbol-fusion",
    title: "Introducing Futbol Fusion — Web3 Meets Fantasy Sports",
    excerpt:
      "We're building a new kind of football gaming experience powered by blockchain. Here's what we're working on and why it matters.",
    tags: ["Product", "Futbol Fusion"],
    publishedAt: "2025-09-01T09:00:00.000Z",
  },
  {
    slug: "why-skoolbox-for-african-schools",
    title: "Why We're Building Skoolbox for African Schools",
    excerpt:
      "Education technology in Africa needs a different approach. Skoolbox is designed from the ground up for the realities of African classrooms.",
    tags: ["Product", "Skoolbox"],
    publishedAt: "2025-10-01T09:00:00.000Z",
  },
  {
    slug: "fonio-labs-story",
    title: "The Fonio Labs Story — From Idea to Product Studio",
    excerpt:
      "How a passion for building technology products grew into a multi-industry studio tackling gaming, education, and fintech.",
    tags: ["Company"],
    publishedAt: "2025-11-01T09:00:00.000Z",
  },
];

// Pages are minimal at this stage — just a title + slug + hero. The richer
// content lives in the hardcoded React components for now and will move
// into sections[] as marketing populates the Studio.
const PAGES = [
  {
    slug: "home",
    title: "Home",
    hero: {
      eyebrow: "// FONIO LABS //",
      headline: "Building the future of Web3 & AI.",
      subheadline:
        "A research-driven studio building user-friendly tools and platforms across Web3, AI, gaming, education, and fintech.",
    },
  },
  {
    slug: "about",
    title: "About",
    hero: {
      eyebrow: "// ABOUT //",
      headline: "Building the future, one tool at a time.",
      subheadline:
        "Fonio Labs is a multi-industry studio. We research, design, and ship products that solve real problems with technology that respects the user.",
    },
  },
];

// -----------------------------------------------------------------------
// Upload + transaction helpers
// -----------------------------------------------------------------------

const uploaded = new Map<string, string>();

async function uploadAsset(
  relativePath: string,
): Promise<string | undefined> {
  if (uploaded.has(relativePath)) return uploaded.get(relativePath);
  const absolute = join(PUBLIC_DIR, relativePath.replace(/^\//, ""));
  if (DRY_RUN) {
    console.log(`  asset (skipped, dry-run): ${relativePath}`);
    return "image-DRYRUN";
  }
  try {
    const buffer = await readFile(absolute);
    const asset = await client.assets.upload("image", buffer, {
      filename: basename(absolute),
    });
    uploaded.set(relativePath, asset._id);
    console.log(`  asset uploaded: ${relativePath} → ${asset._id}`);
    return asset._id;
  } catch (err) {
    console.warn(
      `  asset skipped (read failed): ${relativePath} — ${(err as Error).message}`,
    );
    return undefined;
  }
}

const imageRef = (assetId?: string, alt?: string) =>
  assetId
    ? {
        _type: "image" as const,
        asset: { _type: "reference" as const, _ref: assetId },
        ...(alt ? { alt } : {}),
      }
    : undefined;

async function upsert(doc: { _id: string; _type: string } & Record<string, unknown>) {
  if (DRY_RUN) {
    console.log(
      `  upsert ${doc._type} ${doc._id} (dry-run, no write)`,
    );
    return doc;
  }
  return client.createOrReplace(doc);
}

// -----------------------------------------------------------------------
// Migrators
// -----------------------------------------------------------------------

async function migrateSiteSettings() {
  console.log("\n— Site settings —");
  await upsert({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: SITE.siteName,
    tagline: SITE.tagline,
    contactEmail: SITE.contactEmail,
    social: SITE.social,
  });
}

async function migrateNavigation() {
  console.log("\n— Navigation —");
  await upsert({
    _id: "navigation",
    _type: "navigation",
    headerLinks: NAV.headerLinks.map((l, i) => ({
      _key: `hl-${i}`,
      _type: "link",
      ...l,
    })),
    headerCta: NAV.headerCta,
    footerColumns: NAV.footerColumns.map((col, i) => ({
      _key: `fc-${i}`,
      _type: "column",
      title: col.title,
      links: col.links.map((l, j) => ({
        _key: `fl-${i}-${j}`,
        _type: "link",
        ...l,
      })),
    })),
    footerBottomNote: NAV.footerBottomNote,
  });
}

async function migrateAuthorAndFounder() {
  console.log("\n— Founder (author + teamMember) —");
  const photoAsset = await uploadAsset(FOUNDER.photoPath);

  const authorId = `author-${FOUNDER.slug}`;
  await upsert({
    _id: authorId,
    _type: "author",
    name: FOUNDER.name,
    slug: { _type: "slug", current: FOUNDER.slug },
    role: FOUNDER.role,
    bio: FOUNDER.bio,
    avatar: imageRef(photoAsset, FOUNDER.name),
    social: FOUNDER.social,
  });

  // Same person also has a teamMember card on /team.
  await upsert({
    _id: `teamMember-${FOUNDER.slug}`,
    _type: "teamMember",
    name: FOUNDER.name,
    slug: { _type: "slug", current: FOUNDER.slug },
    role: FOUNDER.role,
    bio: FOUNDER.bio,
    photo: imageRef(photoAsset, FOUNDER.name),
    social: FOUNDER.social,
    order: 10,
  });

  return authorId;
}

async function migrateProducts() {
  console.log("\n— Products —");
  for (const p of PRODUCTS) {
    await upsert({
      _id: `product-${p.slug}`,
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      tagline: p.tagline,
      // PortableText body for a single descriptive paragraph.
      description: [
        {
          _key: `desc-${p.slug}`,
          _type: "block",
          style: "normal",
          children: [
            { _key: `desc-${p.slug}-s`, _type: "span", marks: [], text: p.description },
          ],
        },
      ],
      features: p.features.map((f, i) => ({
        _key: `feat-${p.slug}-${i}`,
        _type: "feature",
        title: f.title,
        body: f.body,
      })),
      order: p.order,
    });
  }
}

async function migratePosts(authorId: string) {
  console.log("\n— News posts —");
  for (const p of POSTS) {
    await upsert({
      _id: `post-${p.slug}`,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.excerpt,
      publishedAt: p.publishedAt,
      tags: p.tags,
      author: { _type: "reference", _ref: authorId },
      // Body intentionally left empty — content team writes the real body
      // in the Studio once the post becomes more than an announcement.
    });
  }
}

async function migratePages() {
  console.log("\n— Pages (minimal stubs) —");
  for (const p of PAGES) {
    await upsert({
      _id: `page-${p.slug}`,
      _type: "page",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      hero: p.hero,
    });
  }
}

// -----------------------------------------------------------------------
// Entry point
// -----------------------------------------------------------------------

async function main() {
  console.log(
    `Foniolabs → Sanity migration${
      DRY_RUN ? " (DRY RUN — no writes)" : ""
    }\n` +
      `  project: ${projectId}\n` +
      `  dataset: ${dataset}\n` +
      `  apiVersion: ${apiVersion}\n`,
  );

  await migrateSiteSettings();
  await migrateNavigation();
  const authorId = await migrateAuthorAndFounder();
  await migrateProducts();
  await migratePosts(authorId);
  await migratePages();

  console.log(
    `\n✓ Migration ${DRY_RUN ? "preview" : "complete"}: ${
      [SITE, NAV, FOUNDER, ...PRODUCTS, ...POSTS, ...PAGES].length
    } documents ${DRY_RUN ? "would be" : "were"} written.`,
  );
}

main().catch((err) => {
  console.error("\nMigration failed:", err);
  process.exit(1);
});
