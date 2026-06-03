# Deferred — pages that intentionally stay hardcoded

This file is a deliberate record of pages we **chose not to migrate to Sanity** during the Day-7 migration, so future-us (and anyone joining the project) can find the reasoning without dredging through commit messages or [`MIGRATION.md`](MIGRATION.md) §6.

## What's still hardcoded

| Route | Why it's hardcoded |
|---|---|
| `/` (home) | Composed from `Hero`, `Mission`, `Solutions`, `WhyFonioLabs` sections under [`app/components/ui/sections/`](app/components/ui/sections/) — each is a one-off narrative piece, not a reusable block. |
| `/about` | Multi-section storytelling with ASCII art panels, gradient backgrounds, and animation choreography that's specific to the page narrative, not a generic content shape. |
| `/contact` | Form + page chrome — gets a real HubSpot embed in Day 8, but the page itself stays as a custom layout, not a Sanity-driven `page` doc. |

The listing pages (`/team`, `/news`, `/products`) **were** rewired to fetch from Sanity in Day 7. The detail pages (`/news/[slug]`, `/products/[slug]`) **were** built fresh as Sanity-driven routes in Day 5. The five top-level marketing pages above are the explicit exceptions.

## Why we didn't migrate them

1. **The existing components don't generalize.** [`app/components/ui/sections/CTA.tsx`](app/components/ui/sections/CTA.tsx) is a Liqtra-launch hero with hardcoded coin asset positioning. [`app/components/ui/sections/Hero.tsx`](app/components/ui/sections/Hero.tsx), `Mission.tsx`, `Solutions.tsx`, `WhyFonioLabs.tsx` are similar — single-use compositions, not reusable building blocks. Decomposing them into the 8 generic Day-3 section blocks (`heroBlock`, `featureGridBlock`, `richTextBlock`, `ctaBlock`, `testimonialBlock`, `logoCloudBlock`, `embedHtmlBlock`, `contactFormBlock`) would mean rewriting them from scratch — a separate project from the migration.

2. **Page-level chrome is page-specific.** The "Culture" + "Join our team" sections of `/team`, the "Coming Soon" panel of `/news`, and the per-page hero variations on `/` and `/about` are narrative chrome unique to each page. They aren't patterns that repeat, so making them schema-driven would gain nothing.

3. **The sprint goal is the migration *infrastructure*.** The OZ "led a CMS migration end-to-end" bullet rests on the schema design (Day 2–3), the custom Studio components (Day 4), the data layer + dynamic routes (Day 5), the draft/ISR plumbing (Day 6), and the migration script + MIGRATION.md (Day 7). Migrating *every* page wasn't required to demonstrate that capability.

## When to revisit

The right time to migrate these pages is when **marketing wants to change them** without asking engineering. At that point:

1. Open Studio → create a `page` doc with the appropriate slug (`home`, `about`, `contact`).
2. Compose the page from the 8 reusable block types now available in `page.sections`.
3. If a block they need doesn't exist yet, add it as a new schema under [`sanity/schemaTypes/blocks/`](sanity/schemaTypes/blocks/) and a renderer branch in [`app/components/sanity/SectionRenderer.tsx`](app/components/sanity/SectionRenderer.tsx).
4. Once the Sanity version is at parity, swap the hardcoded route to fetch via `sanityFetch` (the pattern is already wired up — `app/(marketing)/team/page.tsx` is the template).
5. Delete the corresponding hardcoded component once the Sanity version ships.

## What this is *not*

This is not a TODO list. None of these migrations are blocked or overdue. They are deferred by design because the content is stable and the existing components work. Treat this file as a decision log, not a backlog.
