# Loom script — Claude Code + Sanity MCP demo

**Target length:** 2 minutes 30 seconds (hard cap 3:00). Mobile-friendly framing.

**Audience:** OZ hiring panel + marketing-team stakeholders. They want to see the workflow, not the engineering. Keep terminology plain.

**Recording surface:** screen-share, 1080p. Three windows pre-arranged on a single desktop, alt-tab between them:

1. Terminal with `claude` open in the repo root
2. Browser tab 1 → Studio at `localhost:3000/studio` (logged in, on the News list view)
3. Browser tab 2 → live site at `localhost:3000/news`

Quit Slack, hide the dock, kill notifications. Voice over a calm narration — no music.

---

## Beats

### 00:00 — 00:15 · Open and frame the problem (15s)

*Camera on Claude Code terminal.*

> "This is the foniolabs.xyz repo. Sanity is the CMS, Next.js is the frontend. What I want to show is how the marketing team edits content from here — Claude Code, talking to Sanity through MCP — instead of clicking through Studio for every change."

Mention: `.mcp.json` lives at the repo root, anyone who clones gets the integration for free.

### 00:15 — 00:45 · Create a news post end-to-end (30s)

Type into Claude verbatim:

> Create a news post titled **"Foniolabs partners with Acme"**, body **"We're delighted to announce a new collaboration to bring real-time match data into Futbol Fusion."**, publishedAt today, author Emmanuel Doji, tags Partnership, Product.

Narrate as Claude works:

> "Claude is calling the Sanity MCP — creating a post draft, resolving the author by reference, setting the date. No copy-paste from a brief into Studio."

When the result lands, alt-tab to Studio → News. The new post is at the top of the list as a draft (yellow dot).

### 00:45 — 01:15 · Click into the draft, publish (30s)

Open the post in Studio. Show the populated fields side-by-side with what you said.

> "Same draft, every field where I expected it. I publish from here — that's the safety net: Claude fills the form, a human approves the publish."

Click **Publish**. Status changes to green.

Alt-tab to the live site `localhost:3000/news`. Refresh.

> "Live. The revalidate webhook fired, the cache cleared, and the listing has the new post."

Click into the post on the site to show the body rendered.

### 01:15 — 01:45 · Edit existing content from Claude (30s)

Alt-tab back to Claude:

> Update that post's excerpt to **"A new collaboration to bring real-time match data into Futbol Fusion."**

Narrate while it patches:

> "It found the doc, generated a patch, sent it back as a draft. Same story — review in Studio, then publish."

Alt-tab to Studio, show the new excerpt in the draft, publish, refresh `/news`, show the updated card.

### 01:45 — 02:15 · A workflow you can't do in Studio (30s)

This is the "wow" beat — pick **one** of:

- **Cross-doc search & replace.** Prompt: *"Find every document that links to `/old-launch` and update those links to `/launch-v2`. Show me the list first."* Show Claude listing matches, you saying "yes", Claude patching all of them as drafts.
- **Add a section to an existing page.** Prompt: *"Add a CTA section to the bottom of the About page: tone primary, headline 'Talk to us', button label 'Contact sales', button href /contact."* Alt-tab to `/about`, refresh, scroll to the new section.

Whichever you pick, narrate why it's faster than Studio: dozens of Studio clicks vs one sentence.

### 02:15 — 02:30 · Why this matters (15s)

Back to a clean Claude terminal.

> "This is the marketing operating model now. Editors describe what they want in English, Claude writes the patches, Studio stays the safety net for visual QA and publish. It's `.mcp.json` plus role-based Sanity permissions — that's the whole integration."

End card: the GitHub repo URL + foniolabs.xyz, on screen for 2 seconds.

---

## Things to NOT do on camera

- Don't show the OAuth flow. It's a one-time thing; demoing it eats 20s for nothing. Authenticate before you start recording.
- Don't show the `.env.local`. The OAuth config doesn't need it, and flashing a token even briefly is a bad signal.
- Don't talk over Claude's tool calls while they're streaming — pause, let the result land, then narrate what just happened. Quiet beats sell competence.
- Don't apologise for latency. If Claude takes 8 seconds, that's the real workflow — narrate over it ("…calling Sanity's mutate API now…") instead of cutting it out.

---

## Pre-flight checklist (run once before recording)

- [ ] `npm run dev` running on Node 22 (see HANDOFF §10), serving on `localhost:3000`
- [ ] Logged into Studio at `localhost:3000/studio`
- [ ] Author **Emmanuel Doji** exists in Studio → Authors
- [ ] Browser tab 2 cached on `/news` so the first load is instant
- [ ] OAuth already done in Claude (`claude` in the repo, run any "list document types" query, complete OAuth, quit)
- [ ] Mic level checked. Sample your room tone for 3s before the take so you can drop it under the intro if needed.
- [ ] Take 1 is a throwaway — record it, throw it out, do take 2 cold.

---

## Where the recording lives

Upload to Loom. Paste the public link into [OPERATING.md](../OPERATING.md) (the "Loom: see it in action" section) and the GitHub repo README. Keep it unlisted until Day 14 sign-off.
