# OPERATING — Marketing team workflow

This is the day-to-day playbook for editing **foniolabs.xyz** content through Claude Code + Sanity MCP. Read it once, then keep it open next to your editor.

> **Who this is for:** marketing-editor role (content edits only — no code, no schema). Developers should read [HANDOFF.md](./HANDOFF.md) first.

---

## What this gives you

Instead of clicking through Studio, you describe the change in plain English and Claude edits the content for you. Studio still owns the UI for visual previews and final QA — MCP just removes the data-entry tax for routine work.

Examples that work today:

- "Create a news post titled '…' with body '…', publish date today, author Emmanuel Doji."
- "Add a new team member Jane Smith, role Head of Design, with this photo URL."
- "Find every page that links to `/old-launch` and update those links to `/launch-v2`."
- "Add a CTA section at the bottom of the About page: headline 'Talk to us', button to /contact, tone primary."

---

## First 30 minutes — one-time setup

### 1. Install Claude Code (5 min)

Follow the install instructions at https://docs.claude.com/en/docs/claude-code. On macOS/Linux the short version is `npm install -g @anthropic-ai/claude-code` and then `claude` to launch.

### 2. Clone the repo and start Claude inside it (5 min)

```bash
git clone https://github.com/foniolabs/website
cd website
claude
```

The repo ships with `.mcp.json` at the root, so Claude Code detects the Sanity MCP server automatically on launch and asks you to approve it. **Approve it.**

### 3. Authenticate with Sanity (5 min)

The first time you call any Sanity tool from Claude, you'll be redirected to `sanity.io` for OAuth. Sign in with your Sanity account and grant access. The token is stored locally — no secret lives in the repo.

Your Sanity account's role determines what you can do — see [Roles & permissions](#roles--permissions) below.

### 4. Verify the wiring (5 min)

In Claude, run:

> List the document types available in the foniolabs Sanity project.

You should see: `page`, `post`, `author`, `product`, `teamMember`, `siteSettings`, `navigation`, `redirect`. If you do, you're done — skip to [Daily prompts](#daily-prompts-cheat-sheet).

### 5. Sanity-side: where edits land (10 min)

Open Studio at https://foniolabs.xyz/studio (or `localhost:3000/studio` locally). Every change Claude makes lands as a **draft** on the target document — you publish it in Studio after a quick visual check. This is the right safety net: AI fills the data, you approve the publish.

---

## Daily prompts — cheat sheet

Copy-paste these into Claude and edit the bracketed bits.

### News post

> Create a news post:
> - title: **[Foniolabs partners with X]**
> - excerpt: **[1–2 sentence summary]**
> - body: **[a paragraph or two of plain text]**
> - publishedAt: today
> - author: **[author name as it appears in Studio → Authors]**
> - tags: **[Partnership, Product]**

Claude creates a `post` draft and links the author by reference. Open Studio → News, review, hit **Publish**.

### Team member

> Add a team member:
> - name: **[Jane Smith]**
> - role: **[Head of Design]**
> - bio: **[short bio]**
> - photo: **[https://… or "I'll upload in Studio"]**
> - order: **[number, lower shows first]**

If you pass a URL, Claude uploads it to Sanity assets. If you say "I'll upload in Studio", Claude creates the draft without a photo and you attach it manually.

### Edit a page section

> On the About page, add a CTA section at the bottom:
> - tone: **primary**
> - headline: **[Talk to us]**
> - body: **[one short sentence]**
> - button label: **[Contact sales]**
> - button href: **/contact**

Section blocks Claude knows about: `hero`, `featureGrid`, `richText`, `cta`, `testimonial`, `logoCloud`, `embedHtml`, `contactForm`. Anything else is a schema change — see [When NOT to use MCP](#when-not-to-use-mcp).

### Site-wide search & replace

> Find every document that links to `/old-launch` and update those links to point to `/launch-v2` instead. Show me the list before changing anything.

Claude runs a GROQ query, shows you the matches, waits for your "yes", then patches each doc as a draft. Publish the drafts in Studio when you're ready.

### Add a redirect

> Add a 301 redirect from /old-pricing to /pricing.

Goes into the `redirect` collection. Build-time `next.config.ts` reads this on the next deploy — no code change needed.

---

## Roles & permissions

Set in Sanity Manage → https://www.sanity.io/manage/project/8smu0dlv/members → Roles.

| Role | Can edit | Cannot |
|---|---|---|
| **administrator** | Everything, including schema | — |
| **developer** | Everything, including schema | — |
| **marketing-editor** *(custom)* | `page`, `post`, `product`, `teamMember`, `author`, `redirect`, `navigation`, `siteSettings` (content fields) | Schema definitions; raw token / GA / HubSpot ID fields on `siteSettings` |
| **viewer** | Read only | Any writes |

**Default for marketing teammates:** request the `marketing-editor` role from a developer before your first OAuth. The MCP server respects the role assigned to your Sanity account — there's no separate config.

---

## When NOT to use MCP

Use Studio (or open a ticket for the dev team) instead of Claude for:

- **New section types.** Adding a "video hero" or "pricing table" block means a schema change — that's code, not content.
- **New document types.** Anything beyond the 8 we have today.
- **`siteSettings` IDs / tokens.** GA4 Measurement ID, HubSpot Portal/Form IDs, the revalidate secret. Wrong values here break the live site silently — paste those in Studio yourself.
- **Bulk publishes you can't visually QA.** Claude can create 50 draft posts in a row; publishing 50 unread drafts is how typos go live.
- **Anything in `/contact`, `/about` body copy that has legal review.** Draft in Claude, but get sign-off in Studio before publish.

Rule of thumb: **content goes through Claude, structure goes through a developer.**

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Claude says "no Sanity MCP server registered" | You're not inside the repo. `cd` into the website repo and re-run `claude`. |
| OAuth loop / "unauthorized" | Your Sanity account isn't a project member. Ask a developer to invite you to project `8smu0dlv`. |
| "Document type X not found" | You typed the schema name wrong. Use the names from the cheat sheet exactly — `post` not `news`, `teamMember` not `team`. |
| Edit went through but I don't see it on the site | It's a draft. Open Studio → find the doc → **Publish**. Live site updates within seconds via the revalidate webhook. |
| "Permission denied" on a field | Your role is `viewer` or `marketing-editor` trying to edit a restricted field (e.g. `siteSettings.sanityRevalidateSecret`). That's intentional — escalate to a developer. |
| Claude is hallucinating field names | Ask: "Show me the schema for the `post` document type" — that grounds it in the real fields. |

---

## Loom: see it in action

A 2-minute walkthrough lives at **[link goes here once recorded]**. The script is in [migration/loom-script.md](./migration/loom-script.md) if you want to read the flow first.

---

## For developers: how this is wired

- `.mcp.json` at the repo root registers `https://mcp.sanity.io` over HTTP. Claude Code auto-loads it.
- OAuth is the default (no secret in the repo). Static-token fallback is documented at https://www.sanity.io/docs/ai/mcp-server for CI / non-interactive contexts.
- Per-user permissions come from each operator's Sanity role — no per-prompt role override.
- Schema source of truth is [sanity/schemaTypes/](./sanity/schemaTypes/). MCP responses about types/fields read from the **deployed manifest**, not the local files. You MUST deploy the schema once before MCP has any field-level grounding, and again after every schema change:

  ```bash
  nvm use 22.20.0           # CLI needs Node ≥ 20
  npx sanity login          # one-time, opens a browser
  npx sanity schema deploy  # pushes the manifest to Sanity Cloud
  ```

  Without this, Claude will "see" the project but treat every type as unknown — symptom is "no schemas have been deployed" from `list_workspace_schemas`. The Editor write token in `.env.local` cannot do this deploy; it lacks the `sanity.project/deployStudio` grant. Use `sanity login` (project member auth) or an Administrator-scoped token in `SANITY_AUTH_TOKEN`.
