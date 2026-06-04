# SCHEMA — Sanity content model

Reference for every type the foniolabs site reads and writes. Pairs with [OPERATING.md](./OPERATING.md) for the editor workflow and [MIGRATION.md](./MIGRATION.md) for the content-modelling decisions.

> **Source of truth:** the TypeScript files under [sanity/schemaTypes/](./sanity/schemaTypes/). The deployed Sanity manifest matches them after `npx sanity@latest schema deploy` (see [OPERATING.md](./OPERATING.md#for-developers-how-this-is-wired)). MCP and the Studio both read the deployed manifest — re-deploy after every schema change.

**Project:** `8smu0dlv` · **Dataset:** `production` · **Workspace:** `foniolabs` · **Total types:** 20.

---

## At a glance

```
Reusable objects (3)   →   Section blocks (9)   →   Documents (8)
─────────────────────      ───────────────────       ───────────────────────────────
seo                        heroBlock                  page         (composed from blocks)
socialLinks                featureGridBlock           post         (news article)
ctaLink                    richTextBlock              product
                           ctaBlock                   teamMember
                           testimonialBlock           author
                           logoCloudBlock             redirect
                           embedHtmlBlock             siteSettings (singleton)
                           contactFormBlock           navigation   (singleton)
                           liveStatsBlock
```

Layering rule (enforced by [schemaTypes/index.ts](./sanity/schemaTypes/index.ts) ordering): **objects → blocks → documents**. A type can only reference types declared above it.

---

## Reusable objects

### `seo`

Embedded into any document that needs custom social/search metadata. Falls back to `siteSettings.defaultSeo` when omitted.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | – | Overrides `<title>` and `og:title`. Aim 50–60 chars; max 70 enforced. |
| `description` | text (3 rows) | – | Meta description + `og:description`. Aim 140–160 chars; max 200 enforced. |
| `ogImage` | image (hotspot) + `alt` | – | 1200×630 recommended. Custom Studio input renders a live OG card preview. |
| `canonical` | url | – | Set only if the same content exists at another canonical URL. |
| `noIndex` | boolean | – | Emits `<meta name="robots" content="noindex">`. Defaults `false`. |

**Custom Studio components:** [SEOPreview.tsx](./sanity/components/SEOPreview.tsx) wraps the whole object with a Google SERP snippet preview. [OGImagePreview.tsx](./sanity/components/OGImagePreview.tsx) wraps `ogImage` with a live 1200×630 OG card.

### `socialLinks`

Used by `author`, `teamMember`, and `siteSettings`. All URL fields validate `https://` and are optional.

| Field | Type | Required | Notes |
|---|---|---|---|
| `x` | url | – | X / Twitter profile. |
| `linkedin` | url | – | |
| `github` | url | – | |
| `youtube` | url | – | |
| `telegram` | url | – | |
| `discord` | url | – | |
| `website` | url | – | Personal site. |

### `ctaLink`

Used inside `heroBlock.ctas` and `ctaBlock.buttons`. Renders as a button or text link depending on variant.

| Field | Type | Required | Notes |
|---|---|---|---|
| `label` | string | ✓ | Button text. |
| `href` | string | ✓ | Absolute URL (`https://…`) or site path (`/about`). Custom validator enforces the prefix. |
| `variant` | string | – | `primary` (default) · `secondary` · `ghost`. Drives `renderCtaLinks()` styling in [SectionRenderer.tsx](./app/components/sanity/SectionRenderer.tsx). |
| `external` | boolean | – | Open in new tab. Defaults `false`. |

---

## Section blocks

Every block is an object type designed to be dropped into `page.sections[]`. Site-side rendering happens in [SectionRenderer.tsx](./app/components/sanity/SectionRenderer.tsx); GROQ projections live in [lib/sanity/queries.ts](./lib/sanity/queries.ts) under `sectionProjection`.

### `heroBlock`

| Field | Type | Required | Notes |
|---|---|---|---|
| `variant` | string | ✓ | `split` (text + media side-by-side) · `centered` (default) · `videoBg` (full-bleed). Custom chip Studio input. |
| `eyebrow` | string | – | Small label above headline. |
| `headline` | string | ✓ | |
| `subheadline` | text (3 rows) | – | |
| `media.image` | image (hotspot) + `alt` | – | Used by `split` + `centered`. |
| `media.videoUrl` | url | – | Required for `videoBg`. MP4 or HLS. |
| `media.posterImage` | image | – | Shown while video loads. |
| `ctas` | array of `ctaLink` | – | Max 3. |

### `featureGridBlock`

The grid that renders the "Our Values" section on /about.

| Field | Type | Required | Notes |
|---|---|---|---|
| `eyebrow` | string | – | |
| `headline` | string | – | |
| `intro` | text (2 rows) | – | |
| `columns` | number | ✓ | `2` · `3` (default) · `4`. Radio input. |
| `items[].icon` | string | – | react-icons name (e.g. `FiShield`). Optional. |
| `items[].title` | string | ✓ | |
| `items[].body` | text (3 rows) | – | |
| `items[].href` | string | – | Absolute or site path; turns the whole card into a link. |

### `richTextBlock`

Portable Text body with the full mark/decorator set.

| Field | Type | Required | Notes |
|---|---|---|---|
| `maxWidth` | string | – | `narrow` (default) · `wide`. Radio input. |
| `body` | Portable Text array | – | See **Portable Text capabilities** below. |

**Portable Text capabilities** (defined inside `richTextBlock.body[].block`):
- **Styles:** Normal, H2, H3, H4, Quote.
- **Lists:** Bulleted, Numbered.
- **Decorators:** Strong, Emphasis, Code, Underline, Strike.
- **Annotations:**
  - `link` — external URL (`http | https | mailto | tel`) + `openInNewTab` boolean.
  - `internalLink` — reference to a `page`, `post`, `product`, or `teamMember` doc.
- **Inline objects:**
  - `image` with `alt` + `caption`.
  - `callout` — `tone` (info / success / warning / danger) + `title` + `body`.
  - `codeBlock` — `language` (Prism hint) + `code`.

### `ctaBlock`

| Field | Type | Required | Notes |
|---|---|---|---|
| `tone` | string | – | `default` (light gray strip) · `accent` (blue gradient) · `dark` (#0b0f1a). Custom chip input. |
| `eyebrow` | string | – | |
| `headline` | string | ✓ | |
| `body` | text (3 rows) | – | |
| `buttons` | array of `ctaLink` | – | Min 1, max 2. |

### `testimonialBlock`

| Field | Type | Required | Notes |
|---|---|---|---|
| `eyebrow` | string | – | |
| `items[].quote` | text (4 rows) | ✓ | Max 500 chars. |
| `items[].authorName` | string | ✓ | |
| `items[].authorRole` | string | – | e.g. "Founder, Acme Corp". |
| `items[].authorAvatar` | image (hotspot) + `alt` | – | |
| `items[].companyLogo` | image + `alt` | – | |

One item → single featured quote. Multiple → carousel.

### `logoCloudBlock`

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | – | e.g. "Trusted by" or "Powered by". |
| `logos[].image` | image + required `alt` | ✓ | SVG or transparent PNG preferred. |
| `logos[].href` | url | – | Optional link wrapping the logo. |
| `grayscale` | boolean | – | Defaults `true` — colours on hover. |

### `embedHtmlBlock`

Escape hatch for one-off iframes / third-party widgets. Sanitised at render time. Should be locked to the `editor`/`developer` role via Sanity Manage (the schema doesn't enforce this; the role definition does).

| Field | Type | Required | Notes |
|---|---|---|---|
| `label` | string | ✓ | Studio-only — describes what this embed is. |
| `html` | text (10 rows) | ✓ | Raw markup or `<iframe>`. |
| `aspectRatio` | string | – | `16/9` (default) · `4/3` · `1/1` · `auto`. |

### `contactFormBlock`

Embeds a HubSpot form. Portal ID falls back to `siteSettings.hubspotPortalId`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `headline` | string | – | |
| `body` | text (3 rows) | – | |
| `hubspotFormId` | string | ✓ | HubSpot form GUID. Regex-validated as warning. |
| `portalIdOverride` | string | – | Only if this form is in a different HubSpot portal than the site default. |
| `redirectOnSuccess` | string | – | Path/URL to send the visitor to after submit. |

### `liveStatsBlock`

Real-time numbers (GitHub stars/forks/issues, npm downloads, custom static). Server-renders with ISR. See [LiveStatsBlock.tsx](./app/components/sanity/blocks/LiveStatsBlock.tsx) for the upstream-fetch logic.

| Field | Type | Required | Notes |
|---|---|---|---|
| `eyebrow` | string | – | |
| `headline` | string | – | |
| `intro` | text (2 rows) | – | |
| `layout` | string | ✓ | `grid-2` · `grid-3` (default) · `grid-4`. Radio input. |
| `metrics[].label` | string | ✓ | e.g. "GitHub stars", "Founded". |
| `metrics[].source` | string | ✓ | `github` · `npm` · `static`. Radio input. |
| `metrics[].githubRepo` | string | conditional | Required if `source=github`. Format `owner/name`. |
| `metrics[].githubMetric` | string | – | `stars` (default) · `forks` · `openIssues` · `watchers`. |
| `metrics[].npmPackage` | string | conditional | Required if `source=npm`. |
| `metrics[].npmMetric` | string | – | `weekly` (default) · `monthly`. |
| `metrics[].staticValue` | string | conditional | Required if `source=static`. Used verbatim. |
| `metrics[].suffix` | string | – | Appended to the rendered number (e.g. `+`, `%`, `k`). |
| `metrics[].fallback` | string | – | Shown if upstream API fails. Empty → metric is hidden on failure. |
| `revalidateSeconds` | number | – | Upstream re-fetch window. Default 3600. Bounded [60, 86400]. |
| `showAsOf` | boolean | – | Render the "as of …" timestamp. Defaults `true`. |

Conditional Studio behaviour: source-specific fields auto-hide via `hidden: ({ parent }) => parent?.source !== "X"`, and `validation.custom` enforces required fields per-source.

---

## Documents

### `siteSettings` (singleton)

Singleton — only one instance is allowed per dataset. Pinned to the top of the desk structure.

| Field | Group | Type | Required | Notes |
|---|---|---|---|---|
| `siteName` | general | string | ✓ | Initial value `Foniolabs`. |
| `tagline` | general | string | – | Used in `<title>` templates and OG fallback. |
| `logo` | general | image | – | |
| `favicon` | general | image | – | Square, browser tab icon. |
| `contactEmail` | general | string (email) | – | |
| `defaultOgImage` | seo | image | – | 1200×630 fallback for pages without a custom `seo.ogImage`. |
| `defaultSeo` | seo | `seo` | – | Fallback for pages with no SEO of their own. |
| `ga4MeasurementId` | integrations | string | – | Format `G-XXXXXXXXXX`. Regex-warned. Drives `<GoogleAnalytics>` in layout. |
| `hubspotPortalId` | integrations | string | – | Numeric portal ID. Visible in HubSpot URLs. |
| `hubspotContactFormId` | integrations | string | – | HubSpot form GUID for `/contact`. |
| `hubspotRegion` | integrations | string | – | `na1` (default) · `eu1` · `ap1` · `au1` · `ca1` · `jp1`. Must match HubSpot portal region. |
| `social` | social | `socialLinks` | – | |

### `navigation` (singleton)

Singleton — header + footer link structure.

| Field | Group | Type | Required | Notes |
|---|---|---|---|---|
| `headerLinks[]` | header | array of inline `link` objects (`label`, `href`, `external`) | – | Max 8. |
| `headerCta` | header | object: `label` + `href` | – | Optional primary header CTA. |
| `footerColumns[].title` | footer | string | ✓ | |
| `footerColumns[].links[]` | footer | array of inline `link` objects | – | |
| `footerBottomNote` | footer | string | – | Copyright etc. Year appended automatically by the layout. |

### `page`

Composable marketing page. URL = `/p/<slug>` via the universal renderer at [app/(marketing)/p/[slug]/page.tsx](./app/(marketing)/p/[slug]/page.tsx). Specific routes like `/about` may also fetch a `page` doc and render its sections.

| Field | Group | Type | Required | Notes |
|---|---|---|---|---|
| `title` | content | string | ✓ | |
| `slug` | content | slug | ✓ | Sourced from `title`. Max 96. Custom slug input runs collision check + auto-creates a 301 redirect on rename. Use slug `home` for the homepage. |
| `hero.eyebrow` | content | string | – | Page-level hero (light). Optional — pages can also lead with a `heroBlock` section. |
| `hero.headline` | content | string | – | |
| `hero.subheadline` | content | text (3 rows) | – | |
| `hero.backgroundImage` | content | image (hotspot) + `alt` | – | |
| `sections[]` | content | array of section blocks | – | Members: every `*Block` declared above. Drag to reorder. |
| `seo` | seo | `seo` | – | |

### `post` (News post)

| Field | Group | Type | Required | Notes |
|---|---|---|---|---|
| `title` | content | string | ✓ | |
| `slug` | content | slug | ✓ | Sourced from `title`. Max 96. Custom slug input. |
| `excerpt` | content | text (3 rows) | – | Max 280. Used on listings + as fallback meta description. |
| `coverImage` | content | image (hotspot) + `alt` | – | |
| `body` | content | Portable Text array | – | Default block + image (hotspot) with `alt` + `caption`. |
| `author` | meta | reference → `author` | – | |
| `publishedAt` | meta | datetime | ✓ | Defaults to "now" on first save. |
| `tags` | meta | array of strings | – | Layout `tags`. |
| `seo` | seo | `seo` | – | |

**Orderings:** `publishedAt` desc (default in desk) and asc.

### `author`

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✓ | |
| `slug` | slug (source `name`, max 96) | ✓ | |
| `role` | string | – | e.g. "Founder", "Engineering Lead". |
| `avatar` | image (hotspot) + `alt` | – | |
| `bio` | text (4 rows) | – | |
| `social` | `socialLinks` | – | |

### `product`

| Field | Group | Type | Required | Notes |
|---|---|---|---|---|
| `name` | content | string | ✓ | |
| `slug` | content | slug | ✓ | Sourced from `name`. Max 96. Custom slug input. |
| `tagline` | content | string | – | One-line positioning. |
| `description` | content | Portable Text array | – | Default block only. The listing renderer flattens this with `portableTextToPlain()`. |
| `heroImage` | content | image (hotspot) + `alt` | – | |
| `features[].title` | content | string | ✓ | |
| `features[].body` | content | text (3 rows) | – | |
| `features[].icon` | content | string | – | react-icons name. |
| `ctaLabel` | content | string | – | Button on the product page hero. |
| `ctaUrl` | content | string | – | Absolute URL or site path. |
| `order` | content | number | – | Display order on listings. Lower first. Default 100. |
| `seo` | seo | `seo` | – | |

**Orderings:** `order` asc.

### `teamMember`

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✓ | |
| `slug` | slug (source `name`, max 96) | – | |
| `role` | string | ✓ | |
| `photo` | image (hotspot) + `alt` | – | Renders inside a 4:3-ish card; the GROQ projection dereferences `asset->` so the consumer gets `{ _id, url, metadata }`. |
| `bio` | text (4 rows) | – | |
| `social` | `socialLinks` | – | |
| `order` | number | – | Lower first. Default 100. |

**Orderings:** `order` asc.

### `redirect`

Read at build time by [next.config.ts](./next.config.ts) to populate Next.js' `redirects()`. The Day 4 SlugInput auto-creates one whenever an editor changes a published slug.

| Field | Type | Required | Notes |
|---|---|---|---|
| `from` | string | ✓ | Old path, must start with `/`. |
| `to` | string | ✓ | New path (`/…`) or absolute URL (`https://…`). |
| `statusCode` | number | ✓ | `301` (default) preserves SEO ranking; `302` is temporary. Radio input. |
| `note` | string | – | Internal reminder of why the redirect exists. |

---

## Custom Studio components

These wrap specific fields with richer Studio inputs. They live under [sanity/components/](./sanity/components/) and are attached via `components: { input: … }` on each schema field.

| Component | Attached to | What it does |
|---|---|---|
| [`SlugInput`](./sanity/components/SlugInput.tsx) | `page.slug` · `post.slug` · `product.slug` | Collision check against existing docs + auto-creates a 301 redirect when a published slug is renamed. |
| [`VariantChipInput`](./sanity/components/VariantChipInput.tsx) | `heroBlock.variant` · `ctaBlock.tone` | Visual chip picker instead of dropdown. |
| [`SEOPreview`](./sanity/components/SEOPreview.tsx) | the whole `seo` object | Wraps the SEO field group with a Google SERP snippet preview. |
| [`OGImagePreview`](./sanity/components/OGImagePreview.tsx) | `seo.ogImage` | Live 1200×630 OG card preview rendered against `/api/og` as fallback. |

---

## Where each type is consumed

Quick map from schema → route/component for grep-jumping. Source: [lib/sanity/queries.ts](./lib/sanity/queries.ts) for GROQ, [app/](./app/) for the routes.

| Type | GROQ | Route(s) | Renderer |
|---|---|---|---|
| `siteSettings` | `siteSettingsQuery` | layout-wide | [GoogleAnalytics](./app/components/analytics/GoogleAnalytics.tsx), HubSpot embed defaults |
| `navigation` | `navigationQuery` | layout-wide | Header + Footer components |
| `page` | `pageBySlugQuery` · `allPageSlugsQuery` | `/p/[slug]` · `/about` | [SectionRenderer](./app/components/sanity/SectionRenderer.tsx) |
| `post` | `postsListQuery` · `postBySlugQuery` · `allPostSlugsQuery` | `/news` · `/news/[slug]` | NewsPageContent · post detail page |
| `author` | dereferenced via `post.author->` | post detail | inline |
| `product` | `productsListQuery` · `productBySlugQuery` · `allProductSlugsQuery` | `/products` · `/products/[slug]` | ProductsPageContent · product detail page |
| `teamMember` | `teamMembersQuery` | `/team` | TeamPageContent |
| `redirect` | `allRedirectsQuery` | build-time `next.config.ts` | Next.js native redirect |

---

## How to extend the schema

1. **Add the type file** under `sanity/schemaTypes/` (`blocks/`, `documents/`, or `objects/`).
2. **Register** it in [sanity/schemaTypes/index.ts](./sanity/schemaTypes/index.ts) in the correct layer (objects → blocks → documents).
3. **For block types:** add `defineArrayMember({ type: "<name>" })` to `page.sections` in [documents/page.ts](./sanity/schemaTypes/documents/page.ts).
4. **For renderer-bound block types:** add the `_type == "<name>" => { … }` branch to `sectionProjection` in [lib/sanity/queries.ts](./lib/sanity/queries.ts) and a case in `SECTION_RENDERERS` in [SectionRenderer.tsx](./app/components/sanity/SectionRenderer.tsx).
5. **Deploy the manifest** so MCP + the Studio pick it up:
   ```bash
   nvm use 22.20.0
   npx sanity@latest schema deploy
   ```
6. **Re-run `migrate.ts`** if the new type needs seed content (idempotent — see [MIGRATION.md](./MIGRATION.md)).
