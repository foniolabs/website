# Deferred — pages that intentionally stay hardcoded

This file is a deliberate record of pages we **chose not to migrate to Sanity** during the Day-7 migration, so future-us (and anyone joining the project) can find the reasoning without dredging through commit messages or [`MIGRATION.md`](MIGRATION.md) §6.

## What's still hardcoded

| Route | Status | Why |
|---|---|---|
| `/` (home) | **hardcoded** | Composed from `Hero`, `Mission`, `Solutions`, `WhyFonioLabs` sections under [`app/components/ui/sections/`](app/components/ui/sections/) — each is a one-off narrative piece, not a reusable block. |
| `/about` | **Sanity-driven** (migrate seeds Our Story, Our Vision, Our Values, CTA as block sections) | All text editable in Studio → Pages → About → Page sections. Visual is the SectionRenderer's generic rendering, not the prior gradient/ASCII-art composition. To restore the prior visual fidelity, build per-section custom blocks (the "Option B" path from the original DEFERRED entry). |
| `/contact` | **Sanity-driven** (HubSpot form embed) | Hero + left-column info hardcoded in `ContactPageContent.tsx` (page-specific chrome). Right column is HubspotForm reading siteSettings.hubspotContactFormId — marketing changes the form via Studio. |
| `/team` chrome (hero copy, Culture, Join us) | **hardcoded** | Team member list is Sanity. The page-level narrative chrome stays in `TeamPageContent.tsx` until marketing wants it editable — same migration path as /about applies (extract narrative to a Sanity page doc, wire /team/page.tsx to fetch and render its sections alongside the team grid). |

### New as of this update

- **`/p/[slug]`** — universal Sanity page renderer. Hit `/p/about`, `/p/home`, or any page doc's slug to see the Sanity-driven version *only*, regardless of what the top-level route does. Useful for previewing Sanity-composed pages while the real route still has hardcoded JSX in front of it.

The listing pages (`/team`, `/news`, `/products`) **were** rewired to fetch from Sanity in Day 7. The detail pages (`/news/[slug]`, `/products/[slug]`) **were** built fresh as Sanity-driven routes in Day 5.

## Why we didn't migrate them

1. **The existing components don't generalize.** [`app/components/ui/sections/CTA.tsx`](app/components/ui/sections/CTA.tsx) is a Liqtra-launch hero with hardcoded coin asset positioning. [`app/components/ui/sections/Hero.tsx`](app/components/ui/sections/Hero.tsx), `Mission.tsx`, `Solutions.tsx`, `WhyFonioLabs.tsx` are similar — single-use compositions, not reusable building blocks. Decomposing them into the 8 generic Day-3 section blocks (`heroBlock`, `featureGridBlock`, `richTextBlock`, `ctaBlock`, `testimonialBlock`, `logoCloudBlock`, `embedHtmlBlock`, `contactFormBlock`) would mean rewriting them from scratch — a separate project from the migration.

2. **Page-level chrome is page-specific.** The "Culture" + "Join our team" sections of `/team`, the "Coming Soon" panel of `/news`, and the per-page hero variations on `/` and `/about` are narrative chrome unique to each page. They aren't patterns that repeat, so making them schema-driven would gain nothing.

3. **The sprint goal is the migration *infrastructure*.** The OZ "led a CMS migration end-to-end" bullet rests on the schema design (Day 2–3), the custom Studio components (Day 4), the data layer + dynamic routes (Day 5), the draft/ISR plumbing (Day 6), and the migration script + MIGRATION.md (Day 7). Migrating *every* page wasn't required to demonstrate that capability.

## When to revisit

The right time to migrate these pages is when **marketing wants to change them** without asking engineering. For `/about` the wiring is already done — just compose sections in Studio and Sanity takes over automatically.

For `/` and `/contact`:

1. Open Studio → create a `page` doc with the appropriate slug (`home`, `contact`).
2. Compose the page from the 8 reusable block types now available in `page.sections`.
3. If a block they need doesn't exist yet, add it as a new schema under [`sanity/schemaTypes/blocks/`](sanity/schemaTypes/blocks/) and a renderer branch in [`app/components/sanity/SectionRenderer.tsx`](app/components/sanity/SectionRenderer.tsx).
4. Apply the same Sanity-first-fallback pattern that [`app/(marketing)/about/page.tsx`](app/(marketing)/about/page.tsx) uses: extract the hardcoded JSX into a `*PageContent.tsx` client component, make `page.tsx` an async server that fetches the doc and renders sections when present.
5. Delete the corresponding `*PageContent.tsx` once the Sanity version is canonical.

## What this is *not*

This is not a TODO list. None of these migrations are blocked or overdue. They are deferred by design because the content is stable and the existing components work. Treat this file as a decision log, not a backlog.
