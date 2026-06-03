# Foniolabs CMS Migration

This document describes the migration of foniolabs.xyz from a static-exported Next.js site (hardcoded content in React files) to **Sanity CMS + Next.js App Router**. It covers the source content inventory, the source → target field mapping, asset handling, redirect strategy, and the rollback plan.

The script that performs the migration is at [`scripts/migrate.ts`](scripts/migrate.ts).

## 1. Goals

1. **Zero-loss content move.** Every public URL on the pre-migration site keeps the same content (or has an explicit 301 to a successor).
2. **SEO continuity.** Titles, descriptions, and slugs preserved; new SEO controls (canonical, noindex, og:image overrides) layered on top via the Sanity SEO object.
3. **Asset preservation.** Existing public images (under [`public/images/`](public/images/)) uploaded to Sanity's asset CDN with alt-text and original filenames intact.
4. **Idempotent re-runs.** The migration can be re-executed safely; documents update in place rather than duplicating.
5. **A clear rollback path.** If anything misbehaves after the cutover, we can revert in minutes by either redeploying the pre-migration branch or by re-importing the previously exported dataset.

## 2. Source inventory

The pre-migration content lived as TypeScript constants and JSX inside [`app/(marketing)/`](app/(marketing)/). Every datum below is captured in `scripts/migrate.ts` as a const so the migration is self-contained — no scraping, no parsing of source files.

| Source location | Item | Target document |
|---|---|---|
| `app/(marketing)/team/page.tsx` `const team = [...]` | 1 founder (Emmanuel Doji) with bio + photo + 3 social links | `author` + `teamMember` (same person; both flavors created so the founder can both write news posts AND appear on /team) |
| `app/(marketing)/news/page.tsx` `const posts = [...]` | 3 announcement posts (Futbol Fusion, Skoolbox, Foniolabs story) | 3 `post` docs, each authored-by → the founder |
| `app/(marketing)/products/page.tsx` `const products = [...]` | 2 products (Futbol Fusion, Skoolbox), each with name + tagline + description + 4 features | 2 `product` docs |
| Site-wide branding (footer, page titles, contact email) | Site name "Fonio Labs", tagline, contact email, social links | `siteSettings` singleton |
| Header + footer navigation arrays (currently in `app/components/ui/sections/{Header,Footer}.tsx`) | Header nav (5 links), header CTA, 3 footer columns, footer bottom note | `navigation` singleton |
| `/` and `/about` hero copy | Eyebrow + headline + subheadline for the two landing pages | 2 `page` doc stubs (richer sections to be added by editors in Studio) |

## 3. Field-mapping table

For each migrated document type, this is the mapping from the source shape to the Sanity schema (see [`sanity/schemaTypes/`](sanity/schemaTypes/)).

### `siteSettings` (singleton, `_id: siteSettings`)

| Source | Target field |
|---|---|
| Hardcoded "Fonio Labs" | `siteName` |
| Hardcoded site descriptor | `tagline` |
| Hardcoded contact mailto | `contactEmail` |
| (none yet) | `logo`, `favicon`, `defaultOgImage`, `defaultSeo`, `ga4MeasurementId`, `hubspotPortalId` — set in Studio later |
| `social.{x, linkedin, github}` | `social.{x, linkedin, github}` (the `socialLinks` object) |

### `navigation` (singleton, `_id: navigation`)

| Source | Target field |
|---|---|
| Top-bar nav links | `headerLinks[]` — `{ label, href }` |
| Top-bar CTA | `headerCta` — `{ label, href }` |
| Footer columns | `footerColumns[]` — `{ title, links[] }` |
| Footer line | `footerBottomNote` |

### `author` + `teamMember` (Emmanuel Doji)

| Source | Target field |
|---|---|
| `name` | `name` |
| `role` | `role` |
| `bio` | `bio` |
| `image` (`/images/team/Founder.jpg`) | `avatar` (author) and `photo` (teamMember) — both reference the same uploaded asset |
| `social.{github, linkedin, twitter}` | `social.{github, linkedin, x}` (renamed twitter→x to match schema) |
| n/a | `slug` — derived as `"emmanuel-doji"` |
| n/a | `order` — set to 10 on the `teamMember` so additional team members slot in without rewriting |

### `product` (Futbol Fusion, Skoolbox)

| Source | Target field |
|---|---|
| `name` | `name` |
| `tag` (badge category like "Web3 Gaming") | dropped — superseded by the per-product `tagline` |
| `description` | `description` — wrapped as a single Portable Text block so editors can expand it inline |
| `features[]` (string array) | `features[]` — each becomes an inline object `{ title, body }`. Original source had only titles; bodies were synthesized from product context and can be edited in Studio |
| `status: "In Development"` | dropped — not a stable concept across products; can be added back as a `status` field if marketing wants |
| n/a | `slug` — kebab-cased from name |
| n/a | `order` — 10 (Futbol Fusion), 20 (Skoolbox) so a third product slots between cleanly |

### `post` (3 announcements)

| Source | Target field |
|---|---|
| `title` | `title` |
| `excerpt` | `excerpt` |
| `tag` (single string like "Product") | `tags[]` — converted to an array so posts can have multiple |
| `date: "Coming Soon"` | dropped; replaced by real `publishedAt` ISO dates (2025-09-01, 2025-10-01, 2025-11-01) so the listing sorts deterministically — editors can override |
| `color` (visual accent) | dropped — visual color comes from tag-based styling, not stored content |
| n/a | `author` — reference to `author-emmanuel-doji` |
| n/a | `slug` — kebab-cased from title |
| n/a | `body` — left empty; the existing site only shows excerpts, so there's no body to migrate. Editors write full posts in Studio. |

### `page` stubs (home, about)

| Source | Target field |
|---|---|
| Hero eyebrow text ("// FONIO LABS //" etc) | `hero.eyebrow` |
| Hero headline | `hero.headline` |
| Hero subheadline | `hero.subheadline` |
| Hardcoded sections (Hero, Mission, Solutions, WhyFonioLabs on /, About-specific layout on /about) | **NOT migrated.** See §6. |

## 4. Asset handling

Assets live under [`public/images/`](public/images/) on the pre-migration site. The migration:

1. Reads each referenced file from `public/` via `node:fs/promises`.
2. Uploads the buffer to Sanity via `client.assets.upload("image", buffer, { filename })`.
3. Caches `relativePath → assetId` in-memory so multiple references to the same image only upload once.
4. References the asset by `_ref` from the document body — preserving Sanity's image transform pipeline (crops, hotspots, format conversion, CDN).
5. Sets `alt` from the most contextually relevant source (e.g., the team member's name for their photo).

If a referenced file can't be read, the migration logs a warning and continues without that asset — it's a soft failure so a missing image never blocks the whole migration.

## 5. Redirects

The migration **preserves every public URL**, so no 301s are needed for the initial cutover. URL structure:

| Old URL (Hostinger static export) | New URL (Vercel + Sanity) | Status |
|---|---|---|
| `/` | `/` | preserved |
| `/about` | `/about` | preserved |
| `/team` | `/team` | preserved |
| `/products` | `/products` | preserved |
| `/news` | `/news` | preserved |
| `/contact` | `/contact` | preserved |

Going forward, the SlugInput custom Studio component (see [Day 4 commit](sanity/components/SlugInput.tsx)) auto-creates `redirect` documents whenever an editor renames a published slug. The Day 9 build step reads all `redirect` docs at build time and emits them as `next.config.ts` redirects. Net effect: editors can safely rename URLs without thinking about 301s.

## 6. What was *not* migrated, and why

The migration intentionally creates **stub** `page` docs for `/` and `/about` rather than fully decomposing the pre-migration JSX into Sanity sections. Reasons:

- The existing `app/components/ui/sections/{Hero,Mission,Solutions,WhyFonioLabs,…}.tsx` components are heavily themed for specific product narratives (e.g., the CTA component contains hardcoded Liqtra coin imagery from a prior launch). Decomposing them into generic, marketing-editable blocks would require rewriting the components from scratch.
- The "Culture" and "Join our team" sections of /team, and the "Coming Soon" panel of /news, are page-level chrome unique to those pages — not patterns that repeat across the site. They stay hardcoded and rendered alongside the migrated listing data.
- Marketing operators can compose richer page sections via the 8 block types added in Day 3 (`heroBlock`, `featureGridBlock`, `richTextBlock`, `ctaBlock`, `testimonialBlock`, `logoCloudBlock`, `embedHtmlBlock`, `contactFormBlock`) once they're ready to replace specific hardcoded sections.

The listing pages (`/team`, `/news`, `/products`) **are** rewired to fetch from Sanity, so the count of items shown on each listing is editor-controlled even though the surrounding presentation is still in JSX.

## 7. Running the migration

```bash
# One-time setup
nvm use 22.20.0

# Preview without writing (no token needed)
npm run migrate:dry

# Actual run (needs SANITY_API_WRITE_TOKEN in .env.local)
npm run migrate
```

Generate the write token at https://www.sanity.io/manage/project/8smu0dlv/api → **Tokens** → create with **Editor** permissions, paste into `.env.local` as `SANITY_API_WRITE_TOKEN=…`.

The dry-run prints every document that would be written and every asset that would be uploaded. Run it whenever you change `scripts/migrate.ts` before the real run.

## 8. Rollback

If something goes wrong after cutover, there are three independent rollback paths, in order of fastest first:

1. **Revert the Vercel deployment.** Hostinger DNS still points at the original static site as a backup until Day 13 (DNS cutover); reverting to the previous Vercel deployment also pulls the published Sanity perspective, so a single click in Vercel restores the prior state. The `main` branch still has `output: 'export'` and works on Hostinger as a hot backup if needed.

2. **Restore the dataset.** Sanity keeps document-level history. Before any destructive Studio change, export a snapshot with `npx sanity dataset export production`. To roll back, `npx sanity dataset import <snapshot>` re-creates everything as it was. (We export a fresh snapshot the day before DNS cutover.)

3. **Re-run the migration script.** Because every document uses a deterministic `_id`, re-running `npm run migrate` overwrites the docs back to the migration baseline. Useful if an editor's experiment goes off the rails and we want to reset to "freshly migrated" state.

## 9. Acceptance check

Post-migration, the following should be true. Run the dev server (`nvm use 22.20.0 && npm run dev`) and click through:

- [ ] `/team` shows Emmanuel Doji with bio and photo, fetched from Sanity.
- [ ] `/news` lists the 3 announcement posts, newest first.
- [ ] `/products` lists Futbol Fusion + Skoolbox.
- [ ] `/news/introducing-futbol-fusion` (and the other 2 slugs) render with author + publishedAt + excerpt.
- [ ] `/products/futbol-fusion` (and `/products/skoolbox`) render with tagline + features.
- [ ] `/studio` shows the migrated docs in the rail under Pages / News / Products / Team / Authors.
- [ ] Site Settings + Navigation singletons populated.
- [ ] No 404s on any URL listed in [`migration/URL_INVENTORY.md`](migration/URL_INVENTORY.md).
