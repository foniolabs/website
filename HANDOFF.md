# HANDOFF — Sanity Migration Sprint

**Purpose of this doc:** snapshot of the in-flight Sanity migration so work can resume cleanly from inside this repo (`/home/emmanuel/Documents/work_projects/foniolabs-website/`) in a fresh session or context window.

**Last updated:** Day 4 complete, mid-sprint.

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

**Working tree:** clean (except this HANDOFF.md update).

**Dev server:** not running. Start with `nvm use 22.20.0 && npm run dev` (port 3000). **Node ≥20.9.0 required** — system default is 18, and `npm run dev` exits 0 silently on Node 18 without serving anything. See §10.

**Sanity project:** `8smu0dlv`, dataset `production` (free tier, owned by you).

**Days complete:** 0–4 of 14. Day 5 (App Router pages backed by GROQ) is the next code task.

---

## 3. Files Created / Touched

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

## 7. Next Step — Day 5: GROQ + App Router rewire

Goal: stop hardcoding page content in the (marketing) routes and start reading from Sanity. Files to create:

```
lib/sanity/queries.ts            GROQ for every page type (home, /about, /team, /products, /products/[slug], /news, /news/[slug])
lib/sanity/fetch.ts              Wrapper that picks published vs draft client based on draft-mode cookie
app/(marketing)/page.tsx         Rewired to fetch the "home" page doc and render its sections
app/(marketing)/about/page.tsx   Same — fetches page where slug == "about"
app/(marketing)/team/page.tsx    Lists teamMember docs, sorted by order
app/(marketing)/products/page.tsx        Lists product docs
app/(marketing)/products/[slug]/page.tsx New dynamic route with generateStaticParams
app/(marketing)/news/page.tsx    Lists post docs
app/(marketing)/news/[slug]/page.tsx     New dynamic route with generateStaticParams
components/PortableText.tsx      Renderer with custom components for code/callout/internalLink (matches richText block marks)
components/SectionRenderer.tsx   Maps section _type → React component (placeholder — Day 6 fills it out)
```

Then fix [lib/sanity/image.ts](lib/sanity/image.ts:2) — its import of `@sanity/image-url/lib/types/types` has been broken since Day 1. Real export is `SanityImageSource` from `@sanity/image-url`. Day 5 needs it working since pages will start rendering Sanity images.

Custom Studio components from Day 4 will start showing real previews once a real page document exists in Sanity. Until content is migrated (Day 7), Day 5 pages can render placeholder copy for empty queries.

Acceptance for Day 5:
- `/`, `/about`, `/team`, `/products`, `/news` all 200 and render the (empty-for-now) Sanity data shape
- Dynamic routes `/products/[slug]`, `/news/[slug]` have `generateStaticParams` returning all slugs from Sanity
- `PortableText` renders cleanly for posts that have body content
- `lib/sanity/image.ts` typecheck error gone
- Commit message: `feat(day 5): App Router pages backed by GROQ + Portable Text`

---

## 7a. What's queued after Day 5

| Day | Theme | Key files |
|---|---|---|
| 6 | Draft mode + ISR + SectionRenderer | `app/api/draft`, `app/api/disable-draft`, `app/api/revalidate`, full block→component map |
| 7 | Content migration | `scripts/migrate.ts`, `MIGRATION.md` |
| 8 | HubSpot forms + GA4 | `components/HubspotForm.tsx`, `@next/third-parties/google` |
| 9 | SEO + redirects + Core Web Vitals | `next-sitemap`, `next.config.ts` redirect import, JSON-LD, per-route Metadata, Lighthouse 95+ |
| 10 | Claude Code + Sanity MCP | MCP server config, `OPERATING.md`, Loom |
| 11 | Live stats interactive block | new `liveStatsBlock` schema + component |
| 12 | CI/CD + Vercel | GitHub Actions, preview deploys, webhook → revalidate |
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

> Read HANDOFF.md and ../OPENZEPPELIN_PREP_PLAN.md. We're on Day 5: GROQ + App Router rewire. Build the files listed in §7 — GROQ queries, fetch wrapper, rewired marketing pages, dynamic /products/[slug] + /news/[slug] routes, PortableText renderer, SectionRenderer placeholder. Also fix the lib/sanity/image.ts type import (broken since Day 1). Stop before draft mode + ISR — those are Day 6.

Claude should be able to pick up the work from this doc + the plan file without re-deriving any of the Day 0–4 context.

---

## 10. Node version gotcha

Next.js 16 requires Node ≥ 20.9.0. The system `/usr/bin/node` is 18.20.8. When invoked under Node 18, `npm run dev` prints an error and **exits 0** in <1s — so a backgrounded dev server "completes" successfully without serving anything. If you see exit 0 in a couple of seconds, this is the cause.

```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use 22.20.0
```

Available nvm versions: 20.19.5, 20.20.0, 22.20.0. Each fresh shell needs the source line above — there is no `.nvmrc` in the repo yet (adding one is a candidate cleanup but out of scope for the migration sprint).
