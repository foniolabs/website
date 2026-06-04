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
 *   npm run migrate:dry
 *
 *   --- live run (needs SANITY_API_WRITE_TOKEN in .env.local) ---
 *   npm run migrate
 *
 * See MIGRATION.md for the source → target mapping table and rollback plan.
 */

import { createClient, type SanityClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";

// Tiny .env.local loader. We can't use Node's --env-file because that's
// Node ≥20.6 and we want this script to run on the system default Node 18
// too. Lines like `KEY=value` and `KEY="value"` are parsed; comments and
// blanks are skipped. Existing process.env values win (so CI overrides work).
(function loadEnvLocal() {
  const path = join(process.cwd(), ".env.local");
  let raw: string;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    return; // No .env.local — that's fine for --dry-run with public values.
  }
  for (const line of raw.split("\n")) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
})();

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

// Portable Text helper — produces a single block in the Sanity Portable Text
// shape (style + array of spans). Used to compose the body of richTextBlock
// sections without writing the verbose shape inline.
const ptBlock = (
  style: "normal" | "h2" | "h3" | "h4" | "blockquote",
  text: string,
  key: string,
) => ({
  _key: key,
  _type: "block",
  style,
  markDefs: [],
  children: [{ _key: `${key}-s`, _type: "span", marks: [], text }],
});

// About page sections — these populate page.sections so /about renders via
// SectionRenderer (Sanity-first path) instead of the AboutPageContent
// fallback. Each section maps to a block schema added in Day 3.
const ABOUT_SECTIONS = [
  {
    _key: "about-story",
    _type: "richTextBlock",
    maxWidth: "narrow",
    body: [
      ptBlock("h2", "Our Story", "story-h"),
      ptBlock(
        "normal",
        "Fonio Labs was founded with a clear mission: to build technology products that solve real problems across multiple industries. From gaming to education to fintech, we saw opportunities to create meaningful impact through thoughtful product development.",
        "story-p1",
      ),
      ptBlock(
        "normal",
        "We're a product studio — not an agency. We conceive, design, build, and launch our own products. Each one is crafted to serve a specific market need, combining cutting-edge technology with user-centered design to deliver real value.",
        "story-p2",
      ),
    ],
  },
  {
    _key: "about-vision",
    _type: "richTextBlock",
    maxWidth: "narrow",
    body: [
      ptBlock("h2", "Our Vision", "vision-h"),
      ptBlock(
        "normal",
        "We envision a future where technology products built in Africa compete on the global stage. Where innovation isn't limited by geography, and where Nigerian-built platforms serve millions of users worldwide.",
        "vision-p1",
      ),
      ptBlock(
        "normal",
        "Through products like Futbol Fusion and Skoolbox, we're proving that world-class technology can come from anywhere. Each product we launch is a step toward a more connected, empowered, and innovative world.",
        "vision-p2",
      ),
    ],
  },
  {
    _key: "about-values",
    _type: "featureGridBlock",
    eyebrow: "// VALUES //",
    headline: "Our Values",
    intro: "The principles that guide everything we do",
    columns: 3,
    items: [
      {
        _key: "v1",
        _type: "feature",
        title: "Research-First",
        body: "Every decision we make is backed by thorough research and data. We don't build on assumptions—we build on evidence.",
      },
      {
        _key: "v2",
        _type: "feature",
        title: "User-Centric",
        body: "The user experience is at the heart of everything we create. Complex technology should feel simple and intuitive.",
      },
      {
        _key: "v3",
        _type: "feature",
        title: "Transparent",
        body: "We believe in building in public, sharing our learnings, and being open about our processes and decisions.",
      },
      {
        _key: "v4",
        _type: "feature",
        title: "Collaborative",
        body: "Great innovation happens when diverse minds come together. We actively seek partnerships and community input.",
      },
      {
        _key: "v5",
        _type: "feature",
        title: "Quality-Driven",
        body: "We never compromise on quality. Every line of code, every design decision is made with excellence in mind.",
      },
      {
        _key: "v6",
        _type: "feature",
        title: "Future-Focused",
        body: "We're not just solving today's problems—we're anticipating tomorrow's challenges and building solutions today.",
      },
    ],
  },
  {
    _key: "about-cta",
    _type: "ctaBlock",
    tone: "dark",
    headline: "Want to join us on this journey?",
    body: "We're always looking for talented individuals who share our vision and values.",
    buttons: [
      {
        _key: "cta-b1",
        _type: "ctaLink",
        label: "View Open Positions",
        href: "/contact",
        variant: "primary",
      },
      {
        _key: "cta-b2",
        _type: "ctaLink",
        label: "Meet the Team",
        href: "/team",
        variant: "secondary",
      },
    ],
  },
];

// Home stays a minimal stub for now — the existing hardcoded JSX renders /.
// DEFERRED.md tracks the criteria for migrating its narrative sections.
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
    sections: undefined as unknown[] | undefined,
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
    sections: ABOUT_SECTIONS,
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

// For singletons whose fields are editor-managed (siteSettings, navigation),
// seed the doc on first run but leave subsequent runs alone — re-running
// migrate must not blow away an editor's hubspotPortalId paste etc. Uses
// createIfNotExists which is a no-op if _id already exists.
async function seedOnce(doc: { _id: string; _type: string } & Record<string, unknown>) {
  if (DRY_RUN) {
    console.log(
      `  seedOnce ${doc._type} ${doc._id} (dry-run, no write)`,
    );
    return doc;
  }
  return client.createIfNotExists(doc);
}

// -----------------------------------------------------------------------
// Migrators
// -----------------------------------------------------------------------

async function migrateSiteSettings() {
  console.log("\n— Site settings —");
  // seedOnce, not upsert: editors paste hubspot/GA IDs into Studio after the
  // initial migration. Re-running migrate must not blow those away.
  await seedOnce({
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
  // seedOnce: editors customise nav structure post-migration; preserve it.
  await seedOnce({
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
  console.log("\n— Pages —");
  for (const p of PAGES) {
    await upsert({
      _id: `page-${p.slug}`,
      _type: "page",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      hero: p.hero,
      ...(p.sections ? { sections: p.sections } : {}),
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
