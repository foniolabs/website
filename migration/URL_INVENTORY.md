# Foniolabs URL Inventory

**Live production domain:** https://foniolabs.xyz (verified live 2026-05-31, all routes return 200 except 404 handler)

Source of truth: `app/` directory in the existing Next.js codebase as of the sanity-migration branch checkout.

## Public routes (current site)

| Old URL    | Source file                  | Content type      | Sanity target              | Redirect needed? |
|------------|------------------------------|-------------------|----------------------------|------------------|
| `/`        | `app/page.tsx`               | Home              | `siteSettings` + `page:home` sections | No (same path) |
| `/about`   | `app/about/page.tsx`         | About             | `page:about`               | No (same path)   |
| `/products`| `app/products/page.tsx`      | Products listing  | `page:products` + `product[]` | No (same path) |
| `/team`    | `app/team/page.tsx`          | Team listing      | `page:team` + `teamMember[]` | No (same path) |
| `/news`    | `app/news/page.tsx`          | News listing      | `page:news` + `post[]`     | No (same path)   |
| `/contact` | `app/contact/page.tsx`       | Contact + form    | `page:contact` + `contactForm` block | No (same path) |
| `/404`     | `app/not-found.tsx`          | 404               | N/A (Next.js handles)      | N/A              |

## API routes (must preserve behavior)

| Route             | Source                          | Action                                                        |
|-------------------|---------------------------------|---------------------------------------------------------------|
| `POST /api/contact` | `app/api/contact/route.ts`    | Currently sends via Resend. **Decision (Day 8):** keep this OR swap to HubSpot Forms submission. Recommend **keep Resend for direct mail** + add HubSpot embed for lead capture — dual capture. |

## Routes to add (Sanity-backed dynamic)

| New URL                | Sanity source        | Notes                                  |
|------------------------|----------------------|----------------------------------------|
| `/news/[slug]`         | `post`               | Detail view, ISR                       |
| `/products/[slug]`     | `product`            | Detail view, ISR                       |
| `/team/[slug]`         | `teamMember` (optional) | Detail view if individual bios warrant their own page; otherwise modal/section on `/team` |
| `/studio/[[...tool]]`  | n/a (Sanity Studio) | Embedded Studio at `/studio`            |
| `/api/revalidate`      | n/a                  | Sanity webhook target                  |
| `/api/draft`           | n/a                  | Enter draft mode                       |
| `/api/disable-draft`   | n/a                  | Exit draft mode                        |
| `/api/og`              | n/a                  | Dynamic OG images                      |
| `/sitemap.xml`         | generated            | From Sanity at build                   |
| `/robots.txt`          | static               |                                        |

## Redirect map

**Same-domain rebuild:** all current public URLs (`/`, `/about`, `/products`, `/team`, `/news`, `/contact`) keep their paths, so no 301 redirects are required for the URL structure itself.

**However**, these redirects are still worth setting up:
- `/blog`, `/blog/*` → `/news`, `/news/*` (in case of historical inbound links)
- Any external press / backlink URLs we discover during baseline audit — collected here as we find them.

Once the live production URL is confirmed and crawled, this section will be filled in. Until then it's intentionally empty.

## Baseline assets to capture (Day 0)

- [ ] Lighthouse mobile + desktop on every public route — saved to `migration/lighthouse-baseline/`
- [ ] Screenshot of every public route — saved to `migration/screenshots-baseline/`
- [ ] Full HTML of every public route — saved to `migration/html-baseline/` (for content extraction in Day 7 migration script)

These are blocked on the live production URL.
