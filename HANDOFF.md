# HANDOFF — Sanity Migration Sprint

**Purpose of this doc:** snapshot of the in-flight Sanity migration so work can resume cleanly from inside this repo (`/home/emmanuel/Documents/work_projects/foniolabs-website/`) in a fresh session or context window.

**Last updated:** Day 11 complete (liveStatsBlock end-to-end, verified rendering real GitHub API numbers on /about). Mid-sprint.

---

## 1. Goal

14-day sprint to migrate **foniolabs.xyz** from static-exported Next.js (Hostinger) to **Sanity CMS + Next.js + Vercel**, building real artifacts that close two hard skill gaps for the **OpenZeppelin Senior Web Developer (Contractor)** application:

- "Proven Sanity expertise (schema design, custom Studio components, GROQ queries)"
- "Experience leading at least one complex CMS migration end-to-end (content modeling, redirects, SEO preservation)"

Bonus differentiator: a real **Claude Code + Sanity MCP** integration with a Loom demo, since the OpenZeppelin role specifically wants that combo.

Full 14-day plan: [`../OPENZEPPELIN_PREP_PLAN.md`](../OPENZEPPELIN_PREP_PLAN.md)

End-state on Day 14: live foniolabs.xyz on Sanity + Next.js, public GitHub repo, Loom video, tailored CV + cover letter.

---

## 2. Current State

**Branch:** `sanity-migration` (off `main`) on `github.com/foniolabs/website`.

**Commits landed:**
- `ee5ccb8` — Day 0: baseline audit (URL inventory, Lighthouse JSONs, HTML snapshots, expanded env examples)
- `9fb5b9e` — Day 1: embedded Sanity Studio + `(marketing)` route group + dropped `output:'export'`
- `d9ef379` — Day 2: 8 document types + 2 reusable objects (siteSettings, navigation, page, post, author, product, teamMember, redirect, seo, socialLinks)
- `e725959` — docs: HANDOFF refresh, Day 2 done / Day 3 queued
- `9495deb` — Day 3: 8 composable section blocks + custom desk structure
- `ea502e7` — Day 4: 4 custom Studio components (SlugInput with auto-redirect, VariantChipInput chips, SEOPreview Google snippet, OGImagePreview live OG card) + Presentation tool + /api/og edge route
- `d9abe0a` — docs: HANDOFF refresh, Days 3–4 done / Day 5 queued
- `0bf3f71` — Day 5: GROQ queries + fetch wrapper + PortableText + SectionRenderer + `/products/[slug]` + `/news/[slug]` dynamic routes (existing top-level pages deferred to Day 7 content migration)
- `5c0f1c4` — docs: HANDOFF refresh, Day 5 done / Day 6 queued
- `163d0bd` — Day 6: draft-mode enable/disable + revalidate webhook + presentationTool previewMode wiring + VisualEditing overlay + draft-mode banner
- `9ceb7f7` — docs: HANDOFF refresh, Day 6 done / Day 7 queued
- `8bac7e5` — Day 7: idempotent migration script + MIGRATION.md + /team, /news, /products rewired (async server + client content split, with hardcoded fallback)
- `776e371` — docs: HANDOFF refresh, Day 7 done / Day 8 queued
- `acfdd49` — fix: migrate script runs on any Node ≥18 (tsx + inline .env loader) + DEFERRED.md decision log
- `39dc088` — Day 8: HubspotForm + GoogleAnalytics + SectionRenderer contactFormBlock wired through siteSettings
- `07b6520` — fix: HubSpot region-aware embed (EU/AP/AU/CA/JP CDN hosts)
- `977662f` — `/p/[slug]` preview route + /about Sanity-first fallback
- `eda1235` — /contact rewired: HubSpot embed in the existing design, controlled via siteSettings
- `d6599ba` — CSS: hide HubSpot free-tier branding banner
- `fcc1b60` — Option A for /about: editable Our Story / Our Vision / Our Values / CTA in Studio + matching .btn-primary on HubSpot submit + `seedOnce` so re-running migrate no longer wipes editor-set siteSettings fields
- `9b56ab1` — Day 9 foundation: app/sitemap.ts + app/robots.ts (Next 16 metadata routes), build-time redirects() reading Sanity, JsonLd component (Organization/Article/BreadcrumbList) mounted on key routes, layout-wide Metadata + OG/Twitter defaults
- `a2b141c` — Day 9 perf pass: urlFor() now `auto('format')` → AVIF/WebP, priority + sizes on LCP-candidate images, @sanity/image-url moved off deprecated default export
- Day 10 (pending commit) — `.mcp.json` at repo root registering hosted Sanity MCP (`https://mcp.sanity.io` over HTTP, OAuth — no token in repo) + OPERATING.md (marketing first-30-min playbook, prompt cheat-sheet, roles, when-NOT-to-use, troubleshooting) + migration/loom-script.md (2:30 demo outline, pre-flight, what not to do on camera)
- Day 11 (pending commit) — `liveStatsBlock` schema with conditional source config (github | npm | static), `LiveStatsBlock.tsx` async server component (parallel upstream fetches, ISR via `next.revalidate` + `live-stats` tag, fallback string on upstream failure, hide-if-no-fallback), wired into SectionRenderer + page.sections + sectionProjection; schema re-deployed; verified rendering 6,154 Sanity stars + 139.7K Next.js stars + 2024 Founded on /about

**Migration run:** ✓ 10 docs in Sanity. `/team`, `/news/introducing-futbol-fusion`, `/products/futbol-fusion` etc. all serve real Sanity content. /about now Sanity-driven via 4 migrated sections.

**Working tree:** clean (except this HANDOFF.md update).

**Dev server:** not running. Start with `npm run dev` (port 3000 — bumps to 3001 if 3000 is taken). **Node ≥20.9.0 required for the dev server** — system default is 18, and `npm run dev` exits 0 silently on Node 18 without serving anything. See §10. (The migrate script does NOT need Node 20+ — see `acfdd49`.)

**Production build:** `npm run build` succeeds. 22 static routes prerendered including /, /about, /team, /news, /products, /contact, /studio, /sitemap.xml, /robots.txt, plus SSG'd dynamic routes /news/[slug] (3), /products/[slug] (2), /p/[slug] (2).

**Sanity project:** `8smu0dlv`, dataset `production` (free tier, owned by you).

**Days complete:** 0–11 of 14 (code side). Day 10 still has two user-action acceptance items: record the Loom from `migration/loom-script.md` and create the `marketing-editor` role in Sanity Manage. Day 12 (CI/CD + Vercel) is the next code task.

---

## 3. Files Created / Touched

### New files (Day 9)
```
app/sitemap.ts                          MetadataRoute.Sitemap — pulls page/post/product slugs from Sanity in parallel, merges with top-level routes; NEXT_PUBLIC_SITE_URL drives origin
app/robots.ts                           MetadataRoute.Robots — allow all, disallow /studio and /api/, point at /sitemap.xml, set canonical host
app/components/seo/JsonLd.tsx           OrganizationJsonLd / ArticleJsonLd / BreadcrumbJsonLd server components. serialize() strips undefined + escapes < to prevent </script> injection
```
Plus: `next.config.ts` adds async `redirects()` that fetches Sanity redirect docs at build (Day 4 SlugInput auto-redirects + manual editor entries flow through); `app/layout.tsx` gains full `metadata` (metadataBase, title template, OG/Twitter defaults pointing at /api/og fallback) and mounts `<OrganizationJsonLd />`; news + product detail routes emit Article + Breadcrumb JSON-LD; `public/robots.txt` deleted (was empty, conflicted with dynamic route).

Perf pass (`a2b141c`): `lib/sanity/image.ts` urlFor() now `auto('format')` for AVIF/WebP via Sanity CDN; LCP-candidate images get `priority` + `sizes` (team founder photo, news cover, product hero, about/p hero backgrounds); SectionRenderer + PortableText image rendering both gain `sizes`; `@sanity/image-url` moved off deprecated default export site-wide.

Editor-driven page changes since Day 8:
- `app/(marketing)/p/[slug]/page.tsx` (`977662f`) — universal Sanity page renderer, hit /p/<slug> to preview any page doc; generateStaticParams + generateMetadata included
- `app/(marketing)/about/page.tsx` (`977662f`) — async server with Sanity-first / hardcoded-fallback pattern. `fcc1b60` populates Sanity sections so it renders the Sanity path
- `app/(marketing)/contact/{page,ContactPageContent}.tsx` (`eda1235`) — async server fetching siteSettings.{hubspotPortalId, hubspotContactFormId, hubspotRegion} and threading them into the existing two-column design's right-column HubspotForm
- `sanity/schemaTypes/documents/siteSettings.ts` — added `hubspotContactFormId` (`eda1235`) and `hubspotRegion` (`07b6520`) fields
- `scripts/migrate.ts` (`fcc1b60`) — about page seeded with richTextBlock + featureGridBlock + ctaBlock sections; siteSettings and navigation switched to `seedOnce` (createIfNotExists) so editor-set fields survive re-runs

### New files (Day 8)
```
app/components/sanity/HubspotForm.tsx                Client component — lazy-loads //js.hsforms.net/forms/embed/v2.js, mounts hbspt.forms.create per-instance
app/components/analytics/GoogleAnalytics.tsx         Server component — fetches siteSettings.ga4MeasurementId, mounts @next/third-parties GoogleAnalytics
DEFERRED.md                                          (landed in acfdd49) Decision log — why /, /about, /contact stay hardcoded
```
Plus: `app/components/sanity/SectionRenderer.tsx` adds `RenderGlobals` threading + replaces the `contactFormBlock` placeholder with the real HubspotForm; `app/layout.tsx` mounts `<GoogleAnalytics />` (returns null until `ga4MeasurementId` is set in Studio); `@next/third-parties` added as a dep.

Pending user actions to make HubSpot/GA actually fire:
- HubSpot Developer account at https://developers.hubspot.com → Portal ID + Form ID. Paste Portal ID into Studio → Site Settings → HubSpot Portal ID. To embed a form on any page, drop a `contactFormBlock` into `page.sections` with the form GUID.
- GA4 property at https://analytics.google.com → Measurement ID `G-XXXXXXXXXX`. Paste into Studio → Site Settings → GA4 Measurement ID.

### New files (Day 7)
```
MIGRATION.md                                       OZ-facing migration writeup — goals, inventory, per-doc field mapping, asset strategy, redirect map, rollback paths, acceptance checklist
scripts/migrate.ts                                 Idempotent ETL — reads inline source const, uploads /images/team/Founder.jpg to Sanity assets, writes 10 docs with deterministic _ids. --dry-run flag.
app/(marketing)/team/TeamPageContent.tsx           Client component holding all the framer-motion JSX, takes team[] as prop
app/(marketing)/team/page.tsx                      Async server — fetches teamMembersQuery + falls back to hardcoded founder
app/(marketing)/news/NewsPageContent.tsx           Same shape — posts grid + chrome
app/(marketing)/news/page.tsx                      Async server — fetches postsListQuery + tag→color map + date formatting
app/(marketing)/products/ProductsPageContent.tsx   Same shape — products grid + chrome
app/(marketing)/products/page.tsx                  Async server — fetches products with PortableText→plaintext for description
```
Plus `package.json` adds `npm run migrate` and `npm run migrate:dry` (both use Node 22 `--env-file` + `--experimental-strip-types`, no new deps).

Pending env: `SANITY_API_WRITE_TOKEN` — Editor token from https://www.sanity.io/manage/project/8smu0dlv/api → Tokens, paste into `.env.local`, then `npm run migrate` to populate the dataset.

### New files (Day 6)
```
app/api/draft-mode/enable/route.ts        Wraps defineEnableDraftMode from next-sanity/draft-mode; validates preview-URL signature against readToken
app/api/draft-mode/disable/route.ts       Calls draftMode().disable(), redirects to referrer
app/api/revalidate/route.ts               Sanity webhook target — parseBody validates SANITY_REVALIDATE_SECRET, then revalidateTag(t, { expire: 0 }) for each computed tag
app/components/sanity/DraftModeBanner.tsx Bottom-center "Draft mode" pill with Exit preview link, server-rendered only when draftMode is on
```
Plus: `sanity.config.ts` adds `previewUrl.previewMode.enable/disable` paths; `app/layout.tsx` becomes async + conditionally mounts `<DraftModeBanner />` + `<VisualEditing />` at the body level.

Pending env: `SANITY_REVALIDATE_SECRET` — `openssl rand -hex 32` and paste into `.env.local`. Without it the revalidate route refuses all requests with HTTP 500.

### New files (Day 5)
```
lib/sanity/queries.ts                          GROQ for every page type + shared projections (image/seo/section)
lib/sanity/fetch.ts                            Server-side wrapper picking published/draft client based on draftMode()
app/components/sanity/PortableText.tsx         Renderer for richText body — code/callout/codeBlock/image/internalLink marks
app/components/sanity/SectionRenderer.tsx      Maps each of the 8 block _types → placeholder React section (Day 6 swaps real components)
app/(marketing)/products/[slug]/page.tsx       Sanity-driven product page + generateStaticParams + generateMetadata (auto-OG via /api/og fallback)
app/(marketing)/news/[slug]/page.tsx           Sanity-driven post page + generateStaticParams + generateMetadata (article OG)
```
Also: `lib/sanity/image.ts` Day 1 type-import fixed (`@sanity/image-url` exports `SanityImageSource` directly).

Scope note: existing top-level marketing pages (/, /about, /team, /products, /news) intentionally stay on hardcoded content. They become Sanity-driven during Day 7 content migration, once real docs exist.

### New files (Day 4)
```
sanity/components/SlugInput.tsx              Custom slug input — collision check + auto 301-redirect button
sanity/components/VariantChipInput.tsx       Visual chip picker (hero variants + CTA tones)
sanity/components/SEOPreview.tsx             Google SERP snippet preview wrapping SEO object input
sanity/components/OGImagePreview.tsx         Live OG card preview wrapping seo.ogImage (renders /api/og fallback)
sanity/components/helpers/useImageUrl.ts     Asset _ref → CDN URL hook for inline previews
app/api/og/route.tsx                         Edge-runtime next/og — 1200×630 PNG from ?title/?subtitle/?eyebrow
```
Plus schema wire-ups: `slugInputComponents` on page/post/product slugs, `variantChipInputComponents` on hero.variant + cta.tone, `seoInputComponents` + `ogImageInputComponents` on the seo type definition (auto-applies wherever `type: "seo"` is referenced). `sanity.config.ts` adds `presentationTool` with document location resolvers for page/post/product/siteSettings/navigation. `@sanity/ui@^3.2.0` added as a top-level dep so Studio components can import its primitives directly.

### New files (Day 3)
```
sanity/schemaTypes/blocks/_shared.ts         ctaLink reusable object (label, href, variant, external)
sanity/schemaTypes/blocks/hero.ts            variant (split / centered / videoBg) + media + ctas
sanity/schemaTypes/blocks/featureGrid.ts     columns (2/3/4) + items[]
sanity/schemaTypes/blocks/richText.ts        PortableText + code/callout/internalLink marks + image
sanity/schemaTypes/blocks/cta.ts             tone + headline + body + buttons
sanity/schemaTypes/blocks/testimonial.ts     items[] (quote, author, role, avatar, logo)
sanity/schemaTypes/blocks/logoCloud.ts       title + logos[] (image + href) + grayscale toggle
sanity/schemaTypes/blocks/embedHtml.ts       label + html + aspectRatio (raw HTML escape hatch)
sanity/schemaTypes/blocks/contactForm.ts     hubspotFormId + portalIdOverride + redirectOnSuccess
```
`page.sections` now accepts all 8 inline (drag-reorderable). `sanity/structure.ts` pins Site Settings + Navigation, default-orders News by publishedAt desc, Products + Team by `order`.

### New files (Day 2)
```
sanity/schemaTypes/objects/seo.ts            Reusable SEO (title, description, ogImage, canonical, noIndex)
sanity/schemaTypes/objects/socialLinks.ts    Reusable social URLs (x, linkedin, github, youtube, telegram, discord, website)
sanity/schemaTypes/documents/siteSettings.ts  Singleton — siteName, logo, favicon, defaultOgImage, defaultSeo, ga4MeasurementId, hubspotPortalId, contactEmail, social
sanity/schemaTypes/documents/navigation.ts    Singleton — headerLinks, headerCta, footerColumns, footerBottomNote
sanity/schemaTypes/documents/page.ts          title, slug, hero (object), sections[] (block placeholder — Day 3), seo
sanity/schemaTypes/documents/post.ts          News article — title, slug, excerpt, coverImage, body, author→ref, publishedAt, tags, seo
sanity/schemaTypes/documents/author.ts        name, slug, role, avatar, bio, social
sanity/schemaTypes/documents/product.ts       name, slug, tagline, description, heroImage, features[], ctaLabel, ctaUrl, order, seo
sanity/schemaTypes/documents/teamMember.ts    name, slug, role, photo, bio, social, order
sanity/schemaTypes/documents/redirect.ts      from, to, statusCode (301/302), note
```
`sanity/schemaTypes/index.ts` populated with all 10 types (objects first so doc fields can reference them).

### New files (Day 1)
```
sanity.config.ts                 Studio config (name, basePath /studio, plugins)
sanity.cli.ts                    CLI config for Sanity CLI commands
sanity/env.ts                    Env var loader with assertValue() guard
sanity/schemaTypes/index.ts      Empty array — Day 2 fills this in
sanity/structure.ts              Default desk — Day 3 customizes
lib/sanity/client.ts             createClient() for published + draft clients
lib/sanity/image.ts              urlFor() image builder
app/studio/layout.tsx            Re-exports metadata/viewport from next-sanity/studio
app/studio/[[...tool]]/page.tsx  Client component wrapping <NextStudio />
```

### New files (Day 0)
```
migration/URL_INVENTORY.md
migration/lighthouse-baseline/SUMMARY.md
migration/lighthouse-baseline/{home,about,products,team,news,contact}-mobile.json
migration/html-baseline/{home,about,products,team,news,contact}.html
.env.local.example  (expanded with Sanity/HubSpot/GA4 vars)
.env.production.example  (now tracked — previously untracked)
.gitignore  (added allowlist for .env.*.example)
```

### Modified files (Day 1)
```
app/layout.tsx          Slimmed to thin html/body shell (Header/Footer removed)
next.config.ts          Removed output:'export', added cdn.sanity.io to images.remotePatterns
package.json            +6 Sanity packages, React bumped 19.2.0 → 19.2.3
.env.local              Added Sanity vars (projectId 8smu0dlv, dataset production, token placeholders)
```

### Routing refactor (Day 1)
All public routes moved into a `(marketing)` route group so Header/Footer wrap only the public site, not the Studio. URLs unchanged (route groups are parens, don't appear in URLs):

```
app/page.tsx                 → app/(marketing)/page.tsx           (and fix ./components → ../components)
app/about/page.tsx           → app/(marketing)/about/page.tsx
app/contact/page.tsx         → app/(marketing)/contact/page.tsx
app/news/page.tsx            → app/(marketing)/news/page.tsx
app/products/page.tsx        → app/(marketing)/products/page.tsx
app/team/page.tsx            → app/(marketing)/team/page.tsx
app/not-found.tsx            → app/(marketing)/not-found.tsx
                             + new app/(marketing)/layout.tsx     (Header + Footer wrap)
```

---

## 4. Failed Attempts — what didn't work, why, and how it was fixed

These are the dead-ends from Day 1. Knowing why each failed should prevent re-deriving the same fixes in a fresh session.

### 4.1 `npm install sanity next-sanity ...` — peer dep conflict
**Error:** `next-sanity@13.0.9` requires `react@^19.2.3` but project had `react@19.2.0`.

**Fix:** Bumped `react` and `react-dom` to `19.2.3` (minor patch — safe). Then Sanity install succeeded. Don't use `--legacy-peer-deps`; the peer dep here is a real version requirement.

### 4.2 First `npm run dev` orphaned and held the lock
**What I did wrong:** combined `&` (shell background) with the `run_in_background: true` Bash tool flag. The shell exited immediately after backgrounding npm, SIGHUP killed the npm process but left `.next/dev/lock` and a zombie process holding port 3000.

**Symptom:** next attempt to start dev server reported *"Unable to acquire lock at .next/dev/lock"* and bumped to port 3001.

**Fix:** kill the lingering processes, `rm -f .next/dev/lock`, restart with `npm run dev` using `run_in_background: true` alone (no `&` in the command).

**Lesson for next time:** Bash `run_in_background` is the harness's way to background — never combine with shell `&`.

### 4.3 Studio route returned 500: `createContext only works in Client Components`
**Symptom:** `GET /studio 500` — stack trace through Sanity UI → styled-components → `createContext`.

**Root cause:** I'd put `"use client"` implicit (via `NextStudio`) **and** server exports (`export { metadata, viewport } from "next-sanity/studio"`, `export const dynamic = "force-static"`) in the same `page.tsx`. Next.js treated the file as a server component because of the metadata exports, then choked when Sanity UI tried to call `createContext` during SSR.

**Fix:** split into two files —
- `app/studio/layout.tsx` (server component): exports `metadata`, `viewport`, `dynamic`
- `app/studio/[[...tool]]/page.tsx` (client component, `"use client"` at top): renders `<NextStudio />`

### 4.4 Studio route then returned 500: missing `generateStaticParams()`
**Symptom:** `Page "/studio/[[...tool]]/page" is missing exported function "generateStaticParams()", which is required with "output: export" config.`

**Root cause:** `next.config.ts` had `output: 'export'` from the static-Hostinger deploy pipeline. Static export can't handle dynamic catch-all routes without pre-generating all params, which is impossible for Studio.

**Fix:** removed `output: 'export'` (sanity-migration branch only — `main` still has it for Hostinger). Also dropped `images: { unoptimized: true }` and added `cdn.sanity.io` to `images.remotePatterns` instead. Day 13 cuts foniolabs.xyz DNS from Hostinger to Vercel.

### 4.5 `/` returned 500 after moving page.tsx into `(marketing)/`
**Symptom:** `Module not found: Can't resolve './components/ui/sections/WhyFonioLabs'`.

**Root cause:** `app/page.tsx` used `import ... from "./components/..."` (relative path from `app/`). After moving to `app/(marketing)/page.tsx`, `./components/` now resolves to `app/(marketing)/components/` (doesn't exist).

**Fix:** changed those 4 imports from `./components/...` to `../components/...`. Only `(marketing)/page.tsx` had this — the other moved page files had no relative-to-app imports.

---

## 5. Verified Working

```
Route       Status   Notes
/           200      6.6s first compile, sub-second after
/about      200      
/contact    200      
/products   200      
/team       200      Note: production baseline perf 59 / LCP 5.6s — Day 9 target
/news       200      
/studio     200      16.9s first compile (Sanity UI bundle), instant after
```

Lighthouse mobile baseline (pre-migration, from `migration/lighthouse-baseline/SUMMARY.md`):
- Perf: 89–93 most routes; **/team is 59** ← biggest before/after target
- A11y: 90–96
- Best Practices: 93–96
- **SEO: 100 across the board** ← must preserve

---

## 5a. Pending Lighthouse verification (Day 9 acceptance)

The perf code changes are landed (`a2b141c`), but capturing real numbers needs a user-driven step. Build production, run Lighthouse mobile against the migrated routes, drop screenshots / JSON exports next to the baseline:

```bash
npm run build && npm start
# In Chrome DevTools → Lighthouse tab, Mobile, all four categories:
#  - /
#  - /about
#  - /team
#  - /news
#  - /news/introducing-futbol-fusion
#  - /products/futbol-fusion
# Save each as migration/lighthouse-baseline/<route>-mobile-after.json
```

Baseline numbers in `migration/lighthouse-baseline/SUMMARY.md` (Perf 89–93 most routes, **/team 59 with LCP 5.6s** — the headline number to beat). Day 9 acceptance is ≥ 95 across all four categories on the migrated routes.

---

## 6. Pending User Actions (do these in browser/Sanity dashboard)

These are blocking various later days. None block Day 2.

| Action | Where | When it blocks |
|---|---|---|
| Sign in to Studio at `localhost:3000/studio` | Browser | Now (to verify project is reachable) |
| Add `http://localhost:3000` to CORS Origins (with credentials) | https://www.sanity.io/manage/project/8smu0dlv/api → CORS Origins | Day 1 verification (if Studio shows CORS error on login) |
| Generate read token (Viewer role) → paste into `SANITY_API_READ_TOKEN` | https://www.sanity.io/manage/project/8smu0dlv/api → Tokens | Day 6 (draft mode preview) |
| Generate write token (Editor role) → paste into `SANITY_API_WRITE_TOKEN` | same | Day 7 (migration script), Day 10 (MCP) |
| Generate long random string → paste into `SANITY_REVALIDATE_SECRET` | `openssl rand -hex 32` | Day 6 (revalidate webhook) |
| Free HubSpot Developer account → Portal ID + one Form ID | https://developers.hubspot.com | Day 8 |
| GA4 property for foniolabs.xyz → Measurement ID `G-XXXX` | https://analytics.google.com | Day 8 |

---

## 7. Day 10 — Claude Code + Sanity MCP integration ⭐ (code side done)

**Files landed:**

```
.mcp.json                            Per-project MCP config at repo ROOT (not .claude/mcp.json
                                     as HANDOFF previously guessed — Claude Code's canonical
                                     per-project location is `.mcp.json`). Registers hosted
                                     Sanity MCP server: type "http", url https://mcp.sanity.io.
                                     OAuth-first by design — no token committed; static-token
                                     fallback documented in OPERATING.md §"For developers".

OPERATING.md                         Marketing-team playbook. First-30-minutes setup (install
                                     Claude → clone → approve MCP on launch → OAuth → verify),
                                     daily prompt cheat-sheet (post / team / page section /
                                     cross-doc search-and-replace / redirect), roles table,
                                     "when NOT to use MCP", troubleshooting matrix.

migration/loom-script.md             2:30 demo outline. Beats (open & frame → create post →
                                     publish in Studio → patch from Claude → cross-doc edit →
                                     close), pre-flight checklist, things to NOT do on camera.
```

**Why hosted MCP, not the npm package:** the local `@sanity/mcp-server` npm package is deprecated. Sanity now ships a hosted remote MCP at `https://mcp.sanity.io` that does the discovery (projects, datasets, roles) from the OAuth identity — `SANITY_PROJECT_ID` / `SANITY_DATASET` / `MCP_USER_ROLE` env vars are no longer needed in the client config. Source: https://www.sanity.io/docs/ai/mcp-server.

**Why OAuth, not the Bearer-token config:** committing a `${SANITY_API_WRITE_TOKEN}` placeholder in the per-project `.mcp.json` works, but (a) it implies the token is required to use MCP, which isn't true for OAuth users, and (b) it loses the per-user role granularity — every operator would inherit the write-token's permissions. OAuth gives each teammate exactly their Sanity role. The static-token path is still there for CI / non-interactive contexts.

**Day 10 acceptance — remaining user actions:**

| Action | Where | Status |
|---|---|---|
| Approve the Sanity MCP server when Claude prompts on launch | Local Claude Code | ✓ Done |
| First OAuth flow with Sanity (MCP — `mcp__sanity__authenticate`) | Browser, auto-opened by Claude on first MCP call | ✓ Done (`dojiemma@gmail.com`, OAuth) |
| `npx sanity login` + `npx sanity schema deploy` — push the manifest to Sanity Cloud so MCP has field-level grounding. The Editor write token can't do this — needs project-member auth or Admin token. | Local terminal | ✓ Done — deployed 1/1, verified via `get_schema post` (all 9 fields + validation visible to MCP) |
| Run the four example prompts (create post, add team member, find/update internal links, add CTA section) and confirm they end-to-end | Claude Code → Studio → live site | Pending — happens during Loom recording, after schema deploy |
| Record the 2:30 Loom from migration/loom-script.md, paste link into OPERATING.md "Loom: see it in action" + repo README | Loom | Pending |
| Create the `marketing-editor` custom role in Sanity Manage (GROQ-filter-based: allow content docs, deny schema docs and `siteSettings.*Token` fields) | https://www.sanity.io/manage/project/8smu0dlv/members → Roles | Pending |

**Commit message used:** `feat(day 10): Claude Code + Sanity MCP integration + OPERATING.md`

---

## 7a. Day 11 — live stats interactive block (done)

**Files landed:**

```
sanity/schemaTypes/blocks/liveStats.ts          New `liveStatsBlock` object type. Fields:
                                                eyebrow, headline, intro, layout (grid-2|3|4),
                                                metrics[] (each: label, source [github|npm|
                                                static], conditional config — githubRepo/Metric,
                                                npmPackage/Metric, staticValue, suffix, fallback),
                                                revalidateSeconds (60–86400, default 3600),
                                                showAsOf. Source-specific fields are
                                                `hidden: ({parent}) => parent.source !== "X"`
                                                with conditional `validation.custom` so the
                                                Studio asks the editor for the right config
                                                without cluttering every metric form.

app/components/sanity/blocks/LiveStatsBlock.tsx Async server component. fetchGithubMetric +
                                                fetchNpmMetric do `fetch(url, { next: {
                                                revalidate, tags: ["live-stats"] } })`. Per-metric
                                                Promise.all — one failing source doesn't poison
                                                the others. Each failure falls back to the
                                                editor-set `fallback` string (rendered with
                                                "Cached values · …" label) or hides the metric
                                                if no fallback is set. Whole section hides if
                                                every metric resolves to nothing. Numbers
                                                format via Intl.NumberFormat compact notation
                                                for ≥10k (12.3k, 1.5M), comma-separated below.

sanity/schemaTypes/index.ts                     Registers liveStatsBlock alongside the other
                                                section blocks.

sanity/schemaTypes/documents/page.ts            `page.sections` array gains
                                                `defineArrayMember({ type: "liveStatsBlock" })`.

lib/sanity/queries.ts                           sectionProjection gains the
                                                `_type == "liveStatsBlock" => { … }` branch,
                                                pulling every metric field for the renderer.

app/components/sanity/SectionRenderer.tsx       SectionComponent type widened to allow async
                                                `Promise<React.ReactNode>` returns; map gains
                                                `liveStatsBlock: ({ s }) => <LiveStatsBlock …/>`.
                                                React 19 RSC handles the async child.
```

**Verified live:**
- Schema re-deployed (`npx sanity@latest schema deploy` — 1/1)
- Via Sanity MCP, appended a real `liveStatsBlock` section to `page-about` (3 metrics: `sanity-io/sanity` stars, `vercel/next.js` stars, static 2024) and published the doc
- `npm run build` clean, 22 routes prerendered, no type errors
- `npm run dev` (port 3001 — port 3000 was occupied) + `curl /about` rendered the section with **6,154** Sanity stars + **139.7K** Next.js stars + **2024** Founded, plus the "As of" timestamp; markers grep'd at expected counts
- Caching: each `fetch()` call carries `next: { revalidate: 3600, tags: ["live-stats"] }`. The page-level `sanityFetch` already revalidates on Sanity webhook hits via `page:about` / `type:page` tags. Upstream APIs honor the per-fetch revalidate window. A `revalidateTag("live-stats")` call (from a future scheduled cron / manual API hit) would force a fresh upstream pull without redeploying.

**Skipped vs the original plan:**
- `scripts/migrate.ts` not modified to seed a liveStats block. The MCP-based insert into the existing `page-about` doc is a stronger demo (it doubles as Day 10's MCP end-to-end proof) and avoids tangling `seedOnce` semantics with the existing 4 about sections. If a teammate wants reproducible seeding later, add a fresh page doc rather than reaching into about.

**Commit message used:** `feat(day 11): live stats interactive block`

---

## 7b. Next Step — Day 12: CI/CD + Vercel

JD wants production rigor — preview deploys per PR, content-driven revalidation, secrets not in the repo. Sketch:

```
.github/workflows/ci.yml                  Lint + type-check + build on PR. Cache .next.
.github/workflows/deploy.yml              On push to main: Vercel CLI deploy --prod.
                                          (Alternative: Vercel's git integration — pick one,
                                          don't run both.)

vercel.json                               Build/output config, env passthrough hints.
                                          (Most settings stay in Vercel's UI; this file pins
                                          the few that benefit from being in the repo.)

DEPLOY.md                                 Step-by-step: Vercel project creation, env vars to
                                          paste, GitHub OAuth, Sanity webhook → /api/revalidate
                                          with SANITY_REVALIDATE_SECRET, custom domain plan
                                          (Day 13 cuts DNS).

.vercelignore                             Keep migration/, *.test.*, etc. out of the deploy.
```

**Acceptance for Day 12:**
- PR opened against `main` produces a Vercel preview URL with the migrated Sanity content
- Editing a Sanity doc and publishing fires the revalidate webhook → preview / prod cache invalidates the right tags → live site updates within seconds
- CI fails the PR if `npm run build` or `tsc` fails (no green builds on broken code)
- Secrets: all in Vercel env / GitHub Actions secrets, none in the repo
- Commit message: `feat(day 12): CI/CD + Vercel preview deploys`

---

## 7c. What's queued after Day 12

| Day | Theme | Key files |
|---|---|---|
| 13 | Docs + DNS cutover | `README`, `SCHEMA.md`, `DEPLOY.md`, point foniolabs.xyz at Vercel |
| 14 | Application package | resume, cover letter, /case-studies/sanity-migration writeup |

---

## 8. Background Processes & Cleanup

Nothing running right now — dev server was killed when the Day 1 verification finished. If you see a stale `next dev` process anywhere:

```bash
pgrep -af "next dev\|next-server"
# kill <PIDs> if needed
rm -f .next/dev/lock
```

---

## 9. How to resume in a new Claude Code session

Open a new session inside `/home/emmanuel/Documents/work_projects/foniolabs-website/` and prompt with something like:

> Read HANDOFF.md and ../OPENZEPPELIN_PREP_PLAN.md. Day 11 is landed; we're on Day 12: CI/CD + Vercel. Stand up `.github/workflows/ci.yml` (lint/type-check/build on PR), `.github/workflows/deploy.yml` OR Vercel git integration (pick one, not both), `vercel.json` for the few settings that benefit from being in the repo, `.vercelignore`, and `DEPLOY.md` walking a teammate through Vercel project creation, env vars, GitHub OAuth, and the Sanity webhook → /api/revalidate wiring. Acceptance in §7b. Stop before DNS cutover — that's Day 13.

Claude should be able to pick up the work from this doc + the plan file without re-deriving any of the Day 0–9 context.

---

## 10. Node version gotcha

Next.js 16 requires Node ≥ 20.9.0. The system `/usr/bin/node` is 18.20.8. When invoked under Node 18, `npm run dev` prints an error and **exits 0** in <1s — so a backgrounded dev server "completes" successfully without serving anything. If you see exit 0 in a couple of seconds, this is the cause.

```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use 22.20.0
```

Available nvm versions: 20.19.5, 20.20.0, 22.20.0. Each fresh shell needs the source line above — there is no `.nvmrc` in the repo yet (adding one is a candidate cleanup but out of scope for the migration sprint).
