import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/app/components/seo/JsonLd";

const TITLE = "Migrating foniolabs.xyz to Sanity + Next.js in 14 days";
const DESCRIPTION =
  "How I rebuilt a static-export marketing site as a Sanity-driven Next.js 16 app on Vercel, with custom Studio components, GROQ-driven ISR, and a Claude Code + Sanity MCP integration the marketing team actually uses.";
const URL = "https://www.foniolabs.xyz/case-studies/sanity-migration";
const PUBLISHED_AT = "2026-06-04";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    publishedTime: PUBLISHED_AT,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const BADGES = [
  "Sanity v5",
  "Next.js 16",
  "Vercel",
  "GROQ",
  "Claude Code + MCP",
  "14 days",
];

const STACK = [
  { label: "CMS", value: "Sanity v5 (embedded Studio at /studio)" },
  { label: "Framework", value: "Next.js 16 App Router · RSC · Turbopack" },
  { label: "Language", value: "TypeScript" },
  { label: "Styling", value: "Tailwind CSS v4" },
  { label: "Hosting", value: "Vercel · region iad1 · git integration" },
  { label: "Email / forms", value: "HubSpot Forms (region-aware) · Resend" },
  { label: "Analytics", value: "GA4 via @next/third-parties" },
  { label: "AI integration", value: "Sanity MCP at mcp.sanity.io · OAuth-scoped roles" },
];

const NUMBERS = [
  { value: "20", label: "Schema types deployed" },
  { value: "22", label: "Routes prerendered" },
  { value: "4", label: "Custom Studio components" },
  { value: "100", label: "SEO score preserved" },
];

const BUILT = [
  {
    title: "Composable content model",
    body:
      "3 reusable objects (seo, socialLinks, ctaLink), 9 section blocks (hero, featureGrid, richText, cta, testimonial, logoCloud, embedHtml, contactForm, liveStats), 8 documents. Every page composes from blocks — marketing drops a section in Studio, the renderer picks it up automatically.",
  },
  {
    title: "Custom Studio components",
    body:
      "SlugInput auto-creates a 301 redirect when a published slug is renamed (so editor mistakes never break SEO). VariantChipInput swaps dropdowns for visual chips. SEOPreview renders a live Google SERP snippet. OGImagePreview renders the /api/og card inline.",
  },
  {
    title: "GROQ + ISR data layer",
    body:
      "Single fetch wrapper picks published vs draft client based on draftMode(). Every query carries a cache tag; on Sanity publish, a signed webhook hits /api/revalidate and invalidates the right tags via revalidateTag(). Pages re-render in seconds without a redeploy.",
  },
  {
    title: "Draft mode + Presentation tool",
    body:
      "Editors hit \"Preview\" in Studio and land on the live site with their unpublished changes rendering inline. A draft-mode banner makes the state visible. Per-doc preview URLs are signed against a read token.",
  },
  {
    title: "SEO continuity",
    body:
      "Sitemap pulled from Sanity slugs at request time. JSON-LD (Organization, Article, Breadcrumb) on every relevant route. Build-time Next.js redirects() reads Sanity redirect docs so the auto-redirects from SlugInput actually fire in production.",
  },
  {
    title: "Performance pass",
    body:
      "urlFor() emits AVIF/WebP via Sanity's CDN. LCP candidates get priority + sizes. Server-component-first rendering keeps the client bundle small. ISR with tag-based revalidation means published content is fresh without serving every request from origin.",
  },
];

const DIFFERENTIATOR_BULLETS = [
  "Per-project .mcp.json at the repo root registers the hosted Sanity MCP server (mcp.sanity.io). Anyone who clones gets the integration for free — no per-machine setup.",
  "OAuth-based — no token committed to the repo. Each operator's Sanity role gates what they can edit.",
  "OPERATING.md walks a non-technical marketer through their first 30 minutes: install, OAuth, prompt cheat-sheet, when NOT to use MCP, troubleshooting.",
  "The four canonical prompts (create post · add team member · cross-doc search-and-replace · drop a section onto a page) all work end-to-end. Verified by appending a real liveStatsBlock to the /about page via MCP and watching it render.",
];

const LEARNED = [
  {
    title: "TODO comments rot silently",
    body:
      "Day 5 shipped \"visually-rough placeholder\" section renderers with a comment promising Day 6 would replace them. Day 6 ended up doing draft mode work; the styling swap was deferred and shipped to prod looking like two different sites. Lesson: a sprint-spanning TODO needs an issue or an acceptance criterion on the original commit, not a comment.",
  },
  {
    title: "GROQ projection changes need consumer audits",
    body:
      "Day 5 added asset-> dereference to the image GROQ projection. The shape changed from { asset: { _ref } } to { asset: { _id, url } }. The team page still checked the old _ref, returning null forever. Hand-written types didn't catch it. Lesson: codegen types from GROQ — groqd or @sanity/codegen — so the compiler enforces the contract.",
  },
  {
    title: "Schema must be deployed for MCP to ground",
    body:
      "Setting up MCP felt complete after OAuth, but list_workspace_schemas returned \"No schemas deployed.\" Claude was unmoored on every prompt referencing field names. The local sanity/schemaTypes/ files don't matter to MCP — only the deployed manifest does. Lesson: npx sanity schema deploy is the silent prerequisite — documented in OPERATING.md so the next person doesn't repeat it.",
  },
  {
    title: "DNS cutovers: list everything before changing anything",
    body:
      "Cutover hit two snags. (1) Adding the Vercel A record without removing the Hostinger one would have load-balanced traffic between two completely different sites. (2) An auto-created IPv6 AAAA record on the apex meant IPv6 clients would have followed Hostinger anyway. Vercel correctly refused to validate until both were resolved. Lesson: dump all records on the apex + www first.",
  },
];

const RESOURCES = [
  { label: "Live site", href: "https://www.foniolabs.xyz" },
  { label: "GitHub repo", href: "https://github.com/foniolabs/website" },
  {
    label: "Marketing operating doc (OPERATING.md)",
    href: "https://github.com/foniolabs/website/blob/main/OPERATING.md",
  },
  {
    label: "Deploy + DNS runbook (DEPLOY.md)",
    href: "https://github.com/foniolabs/website/blob/main/DEPLOY.md",
  },
  {
    label: "Schema reference (SCHEMA.md)",
    href: "https://github.com/foniolabs/website/blob/main/SCHEMA.md",
  },
  {
    label: "Migration writeup (MIGRATION.md)",
    href: "https://github.com/foniolabs/website/blob/main/MIGRATION.md",
  },
  {
    label: "Engineering postmortem",
    href: "https://github.com/foniolabs/website/blob/main/migration/POSTMORTEM.md",
  },
  {
    label: "Loom — Claude Code + Sanity MCP demo (2:30)",
    href: "#",
    pending: true,
  },
];

export default function SanityMigrationCaseStudy() {
  return (
    <article className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Case studies", href: "/case-studies" },
          { name: "Sanity migration", href: "/case-studies/sanity-migration" },
        ]}
      />

      <header
        className="relative pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden"
        style={{ background: "#0b0f1a" }}
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 backdrop-blur-sm rounded-full mb-8 border border-blue-500/30">
            <span className="font-mono text-sm font-semibold tracking-wider text-blue-300">
              {"// CASE STUDY //"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
            {TITLE}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            {DESCRIPTION}
          </p>
          <div className="flex flex-wrap gap-2 mt-10">
            {BADGES.map((b) => (
              <span
                key={b}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-mono font-semibold"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">The brief</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              foniolabs.xyz was a static-exported Next.js site on Hostinger. Every content change required a developer to edit JSX, build, and rsync the output over SSH. The marketing team was effectively locked out.
            </p>
            <p>
              The brief was twofold. Operationally: migrate to a CMS the marketing team can actually use, without breaking the live site or losing SEO ranking. Strategically: produce a portfolio-grade artifact for an OpenZeppelin Senior Web Developer (Contractor) application — the JD explicitly asked for proven Sanity expertise, a complex CMS migration end-to-end, and interactive elements like live stats. Sprint window: 14 calendar days, ~45 working hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">By the numbers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From the deployed Sanity manifest + the production Vercel build.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {NUMBERS.map((n) => (
              <div
                key={n.label}
                className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold tracking-tight text-blue-600 mb-3">
                  {n.value}
                </div>
                <div className="text-sm uppercase tracking-widest text-gray-600 font-semibold">
                  {n.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">What I built</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Surface-by-surface. Each item is grep-jumpable in the public repo.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {BUILT.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Stack</h3>
            <dl className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-200">
              {STACK.map((s) => (
                <div key={s.label} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 px-6 py-4">
                  <dt className="text-sm font-mono uppercase tracking-widest text-blue-600 font-semibold">
                    {s.label}
                  </dt>
                  <dd className="text-gray-700">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        className="py-32 px-6 md:px-12 lg:px-20"
        style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-white">
          <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-sm rounded-full mb-8 border border-white/20 bg-white/10">
            <span className="font-mono text-sm font-semibold tracking-wider text-blue-100">
              {"// DIFFERENTIATOR //"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Claude Code + Sanity MCP</h2>
          <p className="text-xl text-blue-50 mb-10 leading-relaxed">
            The OpenZeppelin JD specifically asks for AI-native fluency. I shipped a real Claude Code + Sanity MCP integration the marketing team uses to edit content from natural-language prompts.
          </p>
          <ul className="space-y-4">
            {DIFFERENTIATOR_BULLETS.map((b, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="mt-2 h-2 w-2 rounded-full bg-blue-200 shrink-0" aria-hidden />
                <span className="text-lg text-blue-50 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">What broke (and what I learned)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Full notes in{" "}
              <a
                href="https://github.com/foniolabs/website/blob/main/migration/POSTMORTEM.md"
                className="text-blue-600 font-semibold hover:underline underline-offset-4"
              >
                POSTMORTEM.md
              </a>
              . The TL;DR:
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {LEARNED.map((l) => (
              <div
                key={l.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">{l.title}</h3>
                <p className="text-gray-600 leading-relaxed">{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Resources</h2>
          <p className="text-lg text-gray-600 mb-10">
            Everything is in the public repo — including this case study&apos;s source under{" "}
            <code className="px-2 py-1 bg-white border border-gray-200 rounded text-sm font-mono">
              app/(marketing)/case-studies/sanity-migration/page.tsx
            </code>
            .
          </p>
          <ul className="space-y-3">
            {RESOURCES.map((r) => (
              <li key={r.label}>
                {r.pending ? (
                  <span className="inline-flex items-center gap-3 text-gray-500">
                    <span className="font-mono text-xs uppercase tracking-widest bg-gray-200 px-2 py-1 rounded">
                      Pending
                    </span>
                    {r.label}
                  </span>
                ) : (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline underline-offset-4 text-lg"
                  >
                    {r.label} →
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="py-32 px-6 md:px-12 lg:px-20"
        style={{ background: "#0b0f1a" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Open to Senior Web Developer roles
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Especially when the brief involves headless CMS, content modeling, perf work, or AI-native developer workflows. Let&apos;s talk.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <button className="btn-primary text-lg" type="button">
                Get in touch
              </button>
            </Link>
            <a
              href="https://github.com/foniolabs/website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-outline text-lg" type="button">
                Read the code
              </button>
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
