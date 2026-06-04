# DEPLOY — Vercel + Sanity wiring

This is the operator's guide to the foniolabs.xyz production deploy. A new teammate should be able to fork, follow this doc, and have a working preview URL in under 15 minutes.

> **Pairs with:** [HANDOFF.md](./HANDOFF.md) (sprint state), [OPERATING.md](./OPERATING.md) (content workflow), [MIGRATION.md](./MIGRATION.md) (the why behind the content model).

---

## Architecture in one paragraph

Next.js 16 on Vercel renders the public site. Content lives in Sanity (`8smu0dlv` / `production` dataset). The embedded Studio runs at `/studio`. Public reads go through Sanity's CDN; draft-mode reads use a read token. On publish, a Sanity webhook hits `/api/revalidate` with a shared secret; the handler computes cache tags from the changed doc's `_type` + `slug` and calls `revalidateTag()`. ISR keeps everything else static between content changes. CI/CD: every PR triggers (a) a Vercel preview deploy via git integration and (b) the `CI` workflow in [.github/workflows/ci.yml](.github/workflows/ci.yml) which lints, type-checks, and builds. Both must pass to merge.

---

## One-time Vercel project setup

### 1. Create the project (3 min)

1. Sign in to https://vercel.com with the GitHub account that owns / has push access to `foniolabs/website`.
2. **New Project** → **Import** the `foniolabs/website` repo.
3. **Framework Preset:** Next.js (auto-detected).
4. **Root Directory:** leave as `./`.
5. **Build/Output/Install commands:** leave on the defaults — [vercel.json](./vercel.json) overrides them.
6. **Production Branch:** `main`. Preview branches: everything else.
7. **Region:** `iad1` (US East). Already pinned in [vercel.json](./vercel.json).
8. Click **Deploy**. The first build will fail because env vars aren't set yet — that's expected. Move on to step 2.

### 2. Paste environment variables (5 min)

In Vercel → your project → **Settings → Environment Variables**, add each row. Apply to **Production, Preview, and Development** unless stated otherwise.

| Variable | Where to get it | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `8smu0dlv` | Public — shipped to the client. |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Public. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-05-31` | Public. Lock to a date so server-side query shapes don't drift. |
| `NEXT_PUBLIC_SITE_URL` | `https://foniolabs.xyz` (prod) | Drives sitemap.ts + JSON-LD canonicals. For preview env, leave unset — `vercel-url`-based fallback in the code handles it. |
| `SANITY_API_READ_TOKEN` | https://www.sanity.io/manage/project/8smu0dlv/api → Tokens, role **Viewer** | Used by draft-mode preview. |
| `SANITY_API_WRITE_TOKEN` | same page, role **Editor** | Optional in deploy — the migrate script + MCP use it locally. Leave unset on Vercel unless a deploy step needs to write. |
| `SANITY_REVALIDATE_SECRET` | `openssl rand -hex 32` — generate fresh, never reuse the dev one | Must match the Sanity webhook secret in step 3. |
| `RESEND_API_KEY` | https://resend.com/api-keys | Only if `/api/contact` is in use. |

After saving: in Vercel → **Deployments**, hit **Redeploy** on the failed first deploy. It should now go green and produce a preview URL like `foniolabs-website.vercel.app`.

### 3. Wire the Sanity revalidate webhook (3 min)

This is what makes "edit in Studio → live in seconds" work. Without it, ISR happily serves stale content for up to 60s after a publish.

1. Go to https://www.sanity.io/manage/project/8smu0dlv/api → **Webhooks** → **Create webhook**.
2. **Name:** `revalidate-vercel-prod`.
3. **URL:** `https://foniolabs.xyz/api/revalidate` (post-DNS-cutover) or `https://foniolabs-website.vercel.app/api/revalidate` (pre-cutover).
4. **Dataset:** `production`.
5. **Trigger on:** Create, Update, Delete.
6. **Filter:**
   ```
   _type in ["page","post","product","teamMember","author","siteSettings","navigation","redirect"]
   ```
7. **Projection:**
   ```
   { _id, _type, "slug": slug.current }
   ```
8. **HTTP method:** POST.
9. **Secret:** paste the same value as `SANITY_REVALIDATE_SECRET` from step 2.
10. Save. Hit **Send test webhook** → expect HTTP 200 with `{ revalidated: true, tags: [...] }`.

Setup repeats per environment (preview webhook → preview URL, prod webhook → prod URL). Don't reuse secrets across environments.

### 4. CI gate via GitHub Actions (1 min)

Already wired. [.github/workflows/ci.yml](.github/workflows/ci.yml) runs `npm ci → lint → tsc --noEmit → next build` on every PR and on direct pushes to `main`. The public Sanity vars are inlined in the workflow (they ship in the client anyway), so forked PRs can run CI without secret access. No additional GitHub Secrets are required for the gate to work.

In GitHub → repo → **Settings → Branches → Branch protection rules** for `main`:
- Require status checks: `CI / verify`.
- Require Vercel's preview status: `Vercel / preview deploy`.

Merge is blocked until both pass.

---

## Day-to-day operations

### "I pushed a change and want to see it"

- Push to any non-`main` branch → Vercel publishes a preview URL within ~90s and the GitHub PR comment is updated with it. CI runs in parallel.
- Merge to `main` → Vercel triggers a production deploy. Production URL: `https://foniolabs.xyz` once DNS is cut over (Day 13); pre-cutover it's the Vercel-assigned domain.

### "I edited content in Studio and it's not on the site"

1. Did you **publish** the draft? Drafts only show with `draftMode().isEnabled` (i.e. when you visited `/api/draft-mode/enable?secret=…`).
2. Did the webhook fire? In Sanity → API → Webhooks → your webhook → **History** — expect HTTP 200. If 401, the secret doesn't match Vercel's env. If 500, check Vercel logs — usually a missing env or a typo in the projection.
3. Past those: Sanity's CDN has up to ~60s propagation lag, and `sanityFetch()` caches for 60s. Hard-refresh after ~2 min.

### "Force a full revalidate without editing a doc"

```bash
curl -X POST https://<deploy>/api/revalidate \
  -H 'Content-Type: application/json' \
  -H 'sanity-webhook-signature: …' \
  -d '{ "_type": "siteSettings" }'
```

The `siteSettings` projection invalidates the `site` tag, which `siteSettingsQuery` and `navigationQuery` both read — effectively nukes the layout cache site-wide. For specific docs, build the body to match the projection shape (`{ _id, _type, slug }`) and `tagsFor()` in [app/api/revalidate/route.ts](app/api/revalidate/route.ts) will compute the right tags.

If you don't want to deal with the signature, hit the route from the Vercel CLI with `vercel exec` or invoke `revalidateTag()` manually from a temporary script.

### "Vercel build is failing on Node version"

[package.json](./package.json) pins `engines.node: ">=20.9.0"`. Vercel reads this. If you've got a deploy on a stale build cache and it's running Node 18, hit **Settings → General → Node.js Version** and set it to 20.x or 22.x explicitly, then redeploy.

### "I want to test the production build locally"

```bash
nvm use 22.20.0
npm run build && npm start
```

Same `next start` Vercel runs. Hit `http://localhost:3000` — this is the closest local approximation of prod.

---

## Custom domain cutover (deferred to Day 13)

Day 12 stops at "Vercel-served deploys on the Vercel-assigned domain." Day 13 cuts the live foniolabs.xyz DNS off Hostinger and onto Vercel:

1. Vercel → Project → **Settings → Domains** → add `foniolabs.xyz` and `www.foniolabs.xyz`.
2. Vercel shows the A / CNAME records to add. Apply them at your DNS registrar (currently Hostinger's DNS panel).
3. Wait for propagation (5–30 min usually, up to 48hr worst case).
4. Vercel auto-provisions a TLS cert. Verify https://foniolabs.xyz hits the new Vercel deploy.
5. Update the Sanity webhook URL from the `.vercel.app` preview host to `https://foniolabs.xyz/api/revalidate`.
6. Delete the old Hostinger SSH credentials + deploy keys.

---

## Rollback

| Situation | Action |
|---|---|
| Bad production deploy | Vercel → Deployments → previous green deploy → **Promote to Production**. Instant. |
| Content bug | Republish a previous version from Studio (history panel on the doc). Webhook fires, tag invalidates. |
| Schema regression | `npx sanity@latest schema deploy` from an earlier commit. MCP picks the new manifest within seconds. |
| Webhook secret leaked | Rotate `SANITY_REVALIDATE_SECRET` in Vercel + the Sanity webhook config in the same window. Anything in between gets 401 — that's fine, ISR keeps serving last-good. |
| DNS rollback | At the registrar, swap A/CNAME records back to Hostinger's IPs. TTL-bounded. Keep the old Hostinger account active for at least 7 days post-cutover. |

---

## What's intentionally NOT here

- **A `deploy.yml` workflow that runs `vercel --prod`.** Vercel's git integration is the canonical deploy path; layering a CLI deploy on top duplicates state and creates "which deploy won?" ambiguity. Pick one.
- **Per-PR Sanity dataset cloning.** Each preview hits the `production` dataset (read-only via CDN unless the editor flips draft mode). Cloning per-PR was considered and rejected: 99% of preview content needs to match prod for QA to mean anything, and the 1% (editor-driven test content) can be drafted in Studio.
- **Cron-based revalidation.** Tags + webhook are sufficient. Adding a cron is over-engineering until we have a metric showing stale content in the wild.
