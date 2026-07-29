# foniolabs.xyz

[![CI](https://github.com/foniolabs/website/actions/workflows/ci.yml/badge.svg)](https://github.com/foniolabs/website/actions/workflows/ci.yml)

Marketing site for [Fonio Labs](https://foniolabs.xyz) — a multi-industry product studio building across Web3 gaming, EdTech, and fintech.

The site runs **Next.js on Vercel** with **Sanity CMS** owning content. The embedded Sanity Studio at `/studio` lets the marketing team edit pages, posts, products, and team members without touching code. A Claude Code + Sanity MCP integration extends that to natural-language edits — see [OPERATING.md](./OPERATING.md).

---

## Quick start

Requires Node ≥ 20.9.0 (the `engines.node` field enforces this; `nvm use 22.20.0` if you have nvm).

```bash
git clone https://github.com/foniolabs/website
cd website
npm ci
cp .env.local.example .env.local
# Paste the values from your Sanity project + secrets — see DEPLOY.md §2
npm run dev
```

Open `http://localhost:3000` for the site, `http://localhost:3000/studio` for the embedded CMS.

---

## What runs where

| Surface | URL | What it is |
|---|---|---|
| Public site | https://foniolabs.xyz | Next 16 RSC, ISR-cached pages, build-time redirects, light-theme design |
| Sanity Studio | https://foniolabs.xyz/studio | Embedded Studio v5, custom slug + variant + SEO + OG components (Day 4) |
| Sanity MCP | https://mcp.sanity.io (per-project `.mcp.json` registers it) | Lets Claude Code edit content via OAuth-scoped roles |
| Content APIs | Sanity Cloud (`8smu0dlv` / `production` dataset) | Single source of truth for page, post, product, teamMember, author, navigation, siteSettings, redirect |
| Deploy | Vercel + GitHub git integration | Preview per PR, prod on `main` merge |

---

## Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, RSC, Turbopack dev, ISR with cache tags)
- **CMS:** [Sanity v5](https://www.sanity.io/) — embedded Studio, GROQ queries, draft mode + presentation tool, image CDN
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (client components)
- **Email:** [Resend](https://resend.com/) (the `/api/contact` route; production uses HubSpot Forms via `contactFormBlock`)
- **Forms:** [HubSpot Forms](https://www.hubspot.com/) embed, region-aware (na1 / eu1 / etc.)
- **Analytics:** GA4 via `@next/third-parties`
- **Fonts:** Space Grotesk + JetBrains Mono
- **Hosting:** [Vercel](https://vercel.com/), region `iad1`
- **CI:** GitHub Actions — lint + `tsc --noEmit` + `next build` on every PR

---

## Routes

```
/                     Homepage (still hardcoded — see DEFERRED.md)
/about                Sanity-driven sections (Our Story, Vision, Values, CTA, Live stats)
/team                 Sanity teamMember docs, light-theme card grid
/news                 Sanity post listing
/news/[slug]          SSG'd post detail, JSON-LD, Article OG
/products             Sanity product listing
/products/[slug]      SSG'd product detail
/contact              HubSpot embed, region-aware
/p/[slug]             Universal Sanity page renderer for any `page` doc
/studio               Embedded Sanity Studio (custom desk + Presentation tool)
/api/og               Edge-runtime OG image (1200×630, ?title + ?subtitle + ?eyebrow)
/api/revalidate       Sanity webhook target — tag-based ISR invalidation
/api/draft-mode/...   Sanity preview-URL signing + draft mode toggle
/api/contact          Resend-backed contact form (legacy path)
/sitemap.xml          Pulls page/post/product slugs from Sanity (excludes noIndex)
/robots.txt           Allows all, disallows /studio + /api/; points at sitemap
/llms.txt             Plain-text site index for AI agents (llmstxt.org)
/llm.txt              301 → /llms.txt
```

---

## Project docs

Read in this order if you're new to the repo:

| Doc | Audience | What it covers |
|---|---|---|
| [HANDOFF.md](./HANDOFF.md) | Engineering | Sprint state — every day's deliverable, dead-ends, what's queued |
| [MIGRATION.md](./MIGRATION.md) | Engineering / hiring panel | The Sanity migration writeup — content model, redirects, rollback, acceptance |
| [SCHEMA.md](./SCHEMA.md) | Engineering + marketing | Every doc type, block, and reusable object with field shapes |
| [OPERATING.md](./OPERATING.md) | Marketing team | First-30-minutes playbook for editing content via Claude Code + Sanity MCP |
| [DEPLOY.md](./DEPLOY.md) | Operators | Vercel project setup, env-var matrix, webhook wiring, rollback, DNS cutover |
| [DEFERRED.md](./DEFERRED.md) | Engineering | Decisions about what stays hardcoded (`/`, `/about`, `/contact`) and why |
| [SETUP_EMAIL.md](./SETUP_EMAIL.md) | Operators | Resend setup for the legacy `/api/contact` route |
| [migration/URL_INVENTORY.md](./migration/URL_INVENTORY.md) | Engineering | Pre-migration URL inventory + redirect map |
| [migration/loom-script.md](./migration/loom-script.md) | Marketing / hiring panel | 2:30 demo outline for the Claude Code + MCP video |

---

## Scripts

```bash
npm run dev              # Next dev (Turbopack)
npm run build            # Production build
npm start                # Serve the production build
npm run lint             # ESLint (CI gate — 0 errors enforced)
npm run migrate          # One-shot ETL into Sanity (idempotent — see MIGRATION.md)
npm run migrate:dry      # Same, but logs operations without writing
```

CI runs lint + `npx tsc --noEmit` + `npm run build`. Both must be clean for a PR to merge.

---

## Environment

`.env.local.example` lists the variables. The full matrix lives in [DEPLOY.md §2](./DEPLOY.md). Short version:

| Variable | What | Where |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `8smu0dlv` | All envs |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | All envs |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-05-31` | All envs |
| `NEXT_PUBLIC_SITE_URL` | `https://foniolabs.xyz` | Production only |
| `SANITY_API_READ_TOKEN` | Viewer-role token | Draft mode preview |
| `SANITY_API_WRITE_TOKEN` | Editor-role token | Local migrate script (do not ship to Vercel) |
| `SANITY_REVALIDATE_SECRET` | `openssl rand -hex 32` | Matches the Sanity webhook secret |
| `RESEND_API_KEY` | Resend dashboard | Only if `/api/contact` is in use |

Secrets never live in the repo. Vercel project settings own them in production; `.env.local` owns them locally.

---

## Deploys

Vercel handles preview + production via its git integration. Every PR gets a preview URL. Merging to `main` triggers a production deploy.

To wire a new Vercel environment from scratch, follow [DEPLOY.md](./DEPLOY.md) end to end (≈ 15 minutes). DNS cutover from the legacy Hostinger setup is documented at [DEPLOY.md §"Custom domain cutover"](./DEPLOY.md).

---

## Architecture in one paragraph

The public site is a Next.js 16 App Router app deployed to Vercel. Content lives in Sanity Cloud (`8smu0dlv` / `production` dataset); the embedded Studio runs at `/studio` and supports draft mode + visual preview via Sanity's Presentation tool. Public reads hit Sanity's CDN through a small wrapper in [lib/sanity/fetch.ts](./lib/sanity/fetch.ts) that tags each query for ISR. On publish, a Sanity webhook calls [/api/revalidate](./app/api/revalidate/route.ts) with an HMAC-signed body; the handler computes cache tags from `_type` + `slug` and calls `revalidateTag()` so the affected pages re-render within seconds. Build-time redirects are pulled from Sanity `redirect` docs in [next.config.ts](./next.config.ts). A per-project [.mcp.json](./.mcp.json) registers the hosted Sanity MCP server at `https://mcp.sanity.io` so Claude Code can edit content via the OAuth identity's Sanity role.

---

## License

Private and proprietary to Fonio Labs.

---

## Contact

- **Site:** https://foniolabs.xyz
- **Email:** admin@foniolabs.xyz
- **Founder:** [Emmanuel Doji](https://github.com/web3normad) ([X](https://x.com/emmanueldoji) · [LinkedIn](https://ng.linkedin.com/in/emmanuel-doji))
