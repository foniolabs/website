# POSTMORTEM — foniolabs.xyz Sanity migration

**Sprint window:** 2026-05-21 → 2026-06-04 (14 calendar days, ≈ 45 working hours).
**Outcome:** site migrated end-to-end; live at https://www.foniolabs.xyz on Vercel; Sanity Cloud owns content; Claude Code + Sanity MCP wired for marketing-team natural-language edits.

Audience: future-me, or the next engineer who picks up the repo and asks "what bit me last time."

---

## What we set out to do

Two hard requirements driving the sprint, both from the OpenZeppelin Senior Web Developer (Contractor) JD:

1. **Proven Sanity expertise** — schema design, custom Studio components, GROQ queries
2. **Complex CMS migration end-to-end** — content modeling, redirects, SEO preservation

Bonus differentiator: a real **Claude Code + Sanity MCP** integration with a Loom demo, since the JD specifically calls out that combo.

Constraint: don't break the live site during the migration. Both stayed up until the Day 13 DNS cutover (Hostinger static → Vercel).

## What we shipped

| Surface | What |
|---|---|
| **Content model** | 3 reusable objects (`seo`, `socialLinks`, `ctaLink`), 9 section blocks (`hero`, `featureGrid`, `richText`, `cta`, `testimonial`, `logoCloud`, `embedHtml`, `contactForm`, `liveStats`), 8 documents (`siteSettings`, `navigation`, `page`, `post`, `author`, `product`, `teamMember`, `redirect`). All composable via `page.sections[]`. |
| **Custom Studio components** | `SlugInput` (collision check + auto-301 redirect), `VariantChipInput` (chip picker for hero/cta variants), `SEOPreview` (Google SERP snippet), `OGImagePreview` (live OG card via `/api/og`). |
| **Editor experience** | Presentation tool wired to draft mode, draft-mode banner, per-doc preview URLs, document desk grouping by type with date / order orderings. |
| **Data layer** | `lib/sanity/{client,fetch,queries,image}.ts` — published vs draft clients, GROQ projections, ISR-tagged fetch wrapper, `urlFor()` with AVIF/WebP auto-format. |
| **Routing** | `/`, `/about`, `/team`, `/news`, `/news/[slug]`, `/products`, `/products/[slug]`, `/contact`, `/p/[slug]` (universal page renderer), `/studio` (embedded). Existing top-level pages kept their visual designs; Sanity feeds them. |
| **Integrations** | HubSpot Forms (region-aware embed, EU/AP/AU/CA/JP CDN hosts), GA4 via `@next/third-parties`, Resend (legacy `/api/contact`). |
| **SEO continuity** | Sitemap from Sanity slugs, robots.txt, JSON-LD (Organization / Article / BreadcrumbList), `metadataBase` + OG/Twitter defaults at layout level, build-time `redirects()` from Sanity `redirect` docs. |
| **Perf** | LCP candidates `priority` + `sizes`, AVIF/WebP via Sanity CDN, server-component-first rendering, ISR with tag-based revalidation. |
| **Day 11 interactive element** | `liveStatsBlock` — async server component pulling real GitHub stars / npm downloads with per-metric fallback. Verified live on `/about`. |
| **Claude Code + Sanity MCP** | Per-project `.mcp.json` at repo root, hosted MCP at `https://mcp.sanity.io`, OAuth-scoped roles. `OPERATING.md` walks marketing through first-30-minutes. |
| **CI/CD** | GitHub Actions: lint + tsc + build on every PR. Vercel git integration: preview per PR, prod on `main`. `DEPLOY.md` covers env wiring + webhook + branch protection + rollback. |
| **DNS cutover** | foniolabs.xyz + www → Vercel via Hostinger DNS panel. Old Hostinger A record replaced; AAAA removed; `www` CNAME added. |
| **Documentation** | `HANDOFF.md`, `MIGRATION.md`, `SCHEMA.md`, `OPERATING.md`, `DEPLOY.md`, `DEFERRED.md`, `README.md` rewrite, `migration/URL_INVENTORY.md`, `migration/loom-script.md`, this POSTMORTEM. |

## What broke (and what we learned)

### Founder photo asset deref bug — Day 13

**Symptom:** `/team` rendered the letter-avatar fallback ("E") instead of the founder's photo.

**Root cause:** the GROQ projection in `queries.ts` dereferences the image asset (`asset->{ _id, url, metadata }`), so the consumer gets `photo.asset = { _id, url }`. But [team/page.tsx:43](../app/(marketing)/team/page.tsx#L43) was still checking the *pre-deref* shape `photo.asset._ref` — always falsy after dereference. `urlFor()` was never called, `imageUrl` was always `null`, fallback always rendered.

**Why it slipped:** the Day 5 type definition was written before the GROQ projection switched to `asset->`, and the check wasn't revisited when the projection changed. TypeScript didn't catch it because the type was hand-written `_ref?: string` instead of derived from the GROQ result.

**Lesson:** if you change a GROQ projection that dereferences references, audit every consumer that destructures the result on the same commit. Better: derive types from GROQ (`@sanity/codegen` or `groqd`) so the compiler catches a missing field.

### Day-5 placeholder section renderers shipped as production — Day 13

**Symptom:** the Sanity-rendered `/about` page had dark-theme cards (`bg-neutral-900/50`, `text-orange-500`) while the rest of the site used a light theme (`bg-white border border-gray-200`, `text-blue-600`). Looked like two different sites stitched together.

**Root cause:** Day 5's `SectionRenderer.tsx` carried an explicit comment: *"Day 5 ships visually-rough placeholders so editors can see each section type render … Day 6 swaps each branch out for the production components."* Day 6 ended up doing draft mode + revalidation work; the styling swap got deferred and never picked up. Not a "bug" — a deferred TODO that aged badly because there was no compiler or test to flag it.

**Why it slipped:** the placeholder code was functional. Pages rendered. Tests would have passed. Only a human eyeball comparing pages catches this kind of drift.

**Lesson:** TODOs with "next day" markers need either (a) an actual issue/calendar entry that survives a sprint, or (b) an explicit acceptance criterion on the *original* day's commit ("Day 5 done only when SectionRenderer matches the existing AboutPageContent design tokens"). Comments rot silently.

### Next.js CVE block from Vercel security scanner — Day 12

**Symptom:** first Vercel deploy refused to build: *"Vulnerable version of Next.js detected, please update immediately."*

**Root cause:** the repo was on `next@16.0.1`, which had CVEs disclosed between release and our deploy date. Vercel's pre-build security scanner blocks deploys on known-vulnerable Next versions.

**What happened in parallel:** Vercel's bot auto-opened PR #1 (`vercel/react-server-components-cve-vu-ehjgw3`) with the minimal CVE fix (`next: 16.0.10`). The PR got merged on GitHub while I was also locally bumping to `next: 16.2.7` (latest stable) plus removing the orphaned `@privy-io/react-auth` dependency (which I'd noticed was dragging 40+ transitive vulns from `@reown/*` and `@walletconnect/*`).

The merge landed remotely between my `git push -u` and my next `git push`, causing a non-fast-forward rejection. Recovered by rebasing my commit onto Vercel's, resolving the one-line conflict in `package.json` (took my `^16.2.7`), regenerating `package-lock.json` from the resolved package.json (because hand-merging a 10K-line lockfile is suicide).

**Lesson:** if a third-party automation (Vercel bot, Dependabot, Renovate) has commit access to your branch, expect that during a window when you're also editing the same files. The right reflex is `git pull --rebase` before assuming your push will go through. Also: don't carry deprecated dependencies "just in case" — `@privy-io/react-auth` was kept around because the orphaned `signin.tsx` (PaySlab leftover) had imported it; both got deleted on Day 12.

### Sanity schema not deployed before MCP setup — Day 10

**Symptom:** `mcp__sanity__list_workspace_schemas` returned "No Sanity schemas have been deployed" even after OAuth completed successfully. The MCP was authenticated and could see the project, but `get_schema` would return empty — meaning every Claude prompt that referenced a field name was unmoored.

**Root cause:** the Sanity *Studio* (the local `sanity/schemaTypes/`) defines the schema, but the *deployed manifest* on Sanity Cloud is what MCP and webhooks read. Day 1–9 had built the schema locally but never run `npx sanity@latest schema deploy`. Without that, MCP had nothing to ground on.

**Compounding factor:** the Editor-scoped write token in `.env.local` (used by the migrate script) doesn't carry the `sanity.project/deployStudio` grant. So the obvious shortcut (`SANITY_AUTH_TOKEN=$SANITY_API_WRITE_TOKEN npx sanity schema deploy`) failed with "Unauthorized." The right path was `npx sanity login` for the CLI's own browser-based auth.

**Lesson:** "MCP can edit content" is a chain that breaks at any link — OAuth identity, project membership, role permissions, **AND a deployed manifest**. Document the schema-deploy as a setup step in OPERATING.md, not as a "you'll figure it out later" implicit. Done — OPERATING.md "For developers: how this is wired" now spells it out.

### Hostinger DNS conflict — Day 13

**Symptom:** Hostinger DNS panel warned *"Add Additional A Record — Having more than one record may cause your website to become inaccessible online"* when we tried to add the Vercel A record.

**Root cause:** the existing apex `@` A record pointed at Hostinger's IP (`145.14.153.30`). Adding a second `@` record without removing the first would have load-balanced traffic between Hostinger (serving the old static export) and Vercel (serving the new Sanity-driven site) — perfect recipe for "the site works for some visitors and not others, and I can't reproduce."

**Compounding factor:** Hostinger had also auto-created an IPv6 AAAA record (`2a02:4780:a:1403:0:3472:58d2:2`) pointing at its own server. IPv6-capable browsers would have followed that AAAA over Vercel's IPv4. Vercel correctly refused to validate the domain until the AAAA was deleted.

**Lesson:** for any DNS cutover, list every record on the apex before changing anything. Same for `www`. AAAA records are easy to miss because the registrar's UI sometimes hides them under an "advanced" tab.

## What we'd do differently with another 14 days

1. **Codegen types from GROQ.** `groqd` or `@sanity/codegen` would have caught the `asset._ref` vs `asset._id` bug at compile time. Worth a Day 0 setup cost.
2. **Visual regression testing.** Even a single Playwright screenshot test of `/about` rendered through the section renderer would have caught the dark-theme drift on the Day 5 commit. The whole point of these tests is catching what your eye doesn't.
3. **Sanity Webhook URL parameterised.** Right now there's a manual webhook update on DNS cutover (`.vercel.app` → `foniolabs.xyz`). If we'd shipped a single endpoint that respects `x-forwarded-host`, we could have left the webhook URL alone forever. Minor, but real.
4. **/case-studies as a Sanity content type instead of a hardcoded route.** The Day 14 case-study page is hardcoded for speed. In a longer sprint it'd be a `caseStudy` document with sections, so marketing could ship the next one without engineering.
5. **Lighthouse-after captured in CI.** Day 9 set up the baseline JSONs but the "after" capture is still a user action. A `lighthouse-ci` step on the production URL would give us a regression alarm for free.
6. **Live stats: a manual `revalidateTag("live-stats")` admin route.** Right now upstream API refreshes are time-based (`revalidateSeconds`). Editors who want a forced refresh have to wait or re-deploy. A protected admin endpoint would close that.

## Honest framing

This was a 14-day learning sprint disguised as a portfolio piece. The site is real and runs in production; the content model is real and editor-tested via MCP; the migration is end-to-end (content, redirects, SEO, perf, CI/CD, DNS). Nothing in HANDOFF or this POSTMORTEM is dressed up.

What I'd say at interview: I shipped a complete Sanity + Next.js migration on a working deadline, including the non-glamorous parts (lint debt triage, DNS conflicts, CVE rebases, deferred-TODO drift). I have a Loom of the marketing workflow because the OZ JD asked for it and because it's the right operating model for a small team. The migration deck is the [case study](https://www.foniolabs.xyz/case-studies/sanity-migration), the engineering notes are this POSTMORTEM, the workflow doc is OPERATING.md.

Every artifact is grepable from the [public repo](https://github.com/foniolabs/website).
