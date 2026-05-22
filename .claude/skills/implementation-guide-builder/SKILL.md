---
name: implementation-guide-builder
description: "Transforms any input — a video, article, framework, product, raw idea, or shared link — into a structured implementation guide PMC can use himself, sell to clients, package as a product, or teach as a framework. Asks up front: venture (Cardinal Conseils, PayFacto, ServiConnect, Proposai, personal), format (md, interactive HTML, simple HTML, JSON, docx), Cardinal branding yes/no, and whether to publish to the cardinalconseils/Artifacts GitHub repo with Vercel live URL and deployment monitoring. Saves to Obsidian, indexes in Brain, optionally publishes to GitHub. ALWAYS trigger when PMC says — build me a guide, turn this into a guide, make this sellable, package this, publish this, push to GitHub, deploy this artifact, implementation guide, playbook, framework, I want to teach this, I want to sell this — or when PMC shares content and asks for structure, packaging, extraction, or publishing. Also trigger when converting raw knowledge into a deployable, monetizable, shareable asset."
---

# Implementation Guide Builder

Turns any input into a **deployable, sellable, teachable** implementation guide using a fixed ten-part structure. The structure stays the same; the *mode* changes what goes inside it.

## When this skill triggers

PMC shares **input** (a video link, article URL, paste of content, framework description, product idea, raw notes) and wants **output** that is structured enough to act on, sell, or teach.

The first move is always Step 1 — Pre-flight. Don't start writing before the five decisions (mode, venture, format, branding, publish) are locked.

---

## Step 1 — Pre-flight (ask all five in one pass)

Before writing anything, lock five decisions with PMC. Use the `AskUserQuestion` tool to batch these as tappable buttons — do NOT ask them one at a time in prose. If PMC has already specified some of these in his message, skip those and only ask what's missing.

### Question 1 — Mode (multi-select)

Modes are not stylistic — they change what content lives inside the guide. PMC can pick **one or more** modes. Most guides are single-mode, but the same input often deserves multiple framings (e.g., a methodology PMC builds for himself AND wants to teach as a framework AND eventually sell as a product). When multiple modes are picked, the ten-part structure stays the same and **all selected mode-specific sections are appended** in Step 4 (Sprint Plan + Delivery Kit + Commercialization Pack + Teaching Kit — whichever apply).

| Mode | Use when | What it adds |
|------|----------|--------------|
| `self` | PMC is building it for himself | Tactical, assumes context, no onboarding, no fluff. Skips "who is this for". |
| `client` | Delivered to an SMB consulting client | Onboarding section, handoff checklist, success criteria the client can verify, RACI |
| `product` | Sold as a B2C or B2B digital product | Positioning, pricing logic, sales-page hooks, refund/guarantee logic, upsell path |
| `framework` | Taught as IP, training, or thought leadership | IP-defensible naming, diagrams, examples, teachable acronym or visual model |

If PMC picks nothing or is unsure, default to `self`. If PMC picks 3+ modes, surface a one-line check: *"That's a lot of framings in one doc — confirm or trim?"* — then proceed with whatever he confirms.

**Folder placement when multi-mode:** Use the highest-commitment mode for the path, in this priority order: `product` > `framework` > `client` > `self`. So a `self` + `framework` guide saves to `[venture]/framework/`. The frontmatter records all selected modes as an array.

### Question 2 — Venture (drives folder placement)

Which venture does this guide serve? This determines the Obsidian subfolder and helps PMC see at a glance which guides are accruing to which business asset.

| Venture | Use when |
|---------|----------|
| `cardinal` | Cardinal Conseils advisory, audits, frameworks, client deliverables, productized IP |
| `payfacto` | PayFacto / Maître'D internal playbooks, methodologies, training |
| `serviconnect` | ServiConnect / Adah builds, agentic patterns, voice agent architecture |
| `proposai` | Proposai.ca product builds, licensing logic, GTM |
| `personal` | Personal learning, exploration, half-baked ideas, anything not yet venture-aligned |
| `other` | Net-new venture or one-off — PMC will name it; use the name as the slug |

### Question 3 — Output format

What artifact does PMC want? Default to markdown unless he picks otherwise — markdown is the canonical version that gets saved to Obsidian regardless of what else gets produced.

| Format | Use when | Notes |
|--------|----------|-------|
| `md` | Default. Reference, vault storage, future re-packaging | Saved to Obsidian. Always produced even if PMC also picks another format. |
| `interactive-html` | Client deliverable, sales page, teaching asset where interaction adds value | React + Tailwind + shadcn artifact. Heavier build. Only when interaction matters. |
| `simple-html` | One-page reference, printable, shareable link | Static HTML, no JS, no framework. Fast to produce. |
| `json` | Structured data the guide will feed into another system (n8n, Supabase, prompt library) | Use when the guide is *input* to automation, not a human-readable artifact. |
| `docx` | Formal client handoff, proposal, anything that needs to land in a corporate inbox | Use the docx skill. |

**Rule:** The `.md` is always produced and saved to Obsidian. Other formats are *additional* outputs, not substitutes.

### Question 4 — Branding

Apply Cardinal Conseils brand guidelines, or keep unbranded?

| Branding | Use when |
|----------|----------|
| `cardinal-brand` | Anything client-facing, anything that represents Cardinal Conseils externally, productized assets, framework IP |
| `unbranded` | Personal use, internal PayFacto/ServiConnect work, exploration, or anything PMC wants to repackage later under a different brand |

If branded: invoke the `cardinal-conseils-brand` skill for any non-markdown format. For `md` output, branding mostly affects voice (measured anti-bullshit) and a footer line — markdown doesn't render colors or fonts.

### Question 5 — Publish to GitHub

Push to the `cardinalconseils/Artifacts` GitHub repo? This is the public/shareable layer on top of Obsidian. Obsidian is the private vault; GitHub + Vercel is the publication channel with a live URL.

| Publish | Use when |
|---------|----------|
| `publish` | Anything PMC wants a shareable URL for — client deliverables, product pages, framework teaching assets, demos, sales-page artifacts, anything that should live at a public link. |
| `private` | Self-only guides, half-baked ideas, anything PMC doesn't want indexed or linkable yet. Default for `personal` venture and most `self` mode work. |

**Sensible defaults to surface in the question:** if mode includes `client`, `product`, or `framework` → suggest `publish`. If mode is `self` only → suggest `private`. PMC overrides either way.

### How to ask

Use `AskUserQuestion` to batch the five questions as tappable choices — **not prose**. Question 1 (Mode) is multi-select. Questions 2–5 are single-select. If the source material is also unclear or missing, ask that as a sixth question, but only if genuinely ambiguous — don't pad.

---

## Step 2 — Extract the source material

Before writing the guide, extract the underlying logic of the input. Do this **silently** — don't make PMC watch you take notes.

Extract:
- **The promise** — what the source claims you'll get
- **The mechanism** — why it works (actual cause-and-effect)
- **The required inputs** — what the user needs before starting
- **The sequence** — what order things must happen in
- **The failure modes** — where this breaks
- **The hidden assumptions** — what the source takes for granted

If the source is a video or external link, use available tools to access it (`WebFetch`, `WebSearch`, `mcp__ac95485d-f4c1-4018-944b-6a34741142c9__search_brain`, `mcp__ac95485d-f4c1-4018-944b-6a34741142c9__save_video`, etc.). If you can't access it, ask PMC to paste the key content rather than hallucinating.

---

## Step 3 — Write the guide using the ten-part structure

Use this structure **every time**, in this order. Headers stay; what fills them changes by mode.

### 1. The Promise
One paragraph. What the reader has after they finish. Concrete, time-bound, measurable. No "you'll understand" — only "you'll have built X / be able to do Y / have shipped Z."

### 2. The Strategy (Where We Play / How We Win / What We Do Better)

The strategic spine of the guide. Without this, the Framework that follows is just a list of principles — not a defensible position. This is the Lafley/Martin **Playing to Win** cascade applied at the guide level.

Three required sub-parts. Keep each one tight — 2–4 sentences.

- **Where we play** — the arena. Segment, vertical, channel, geography, customer type, or use-case slice. Be specific enough that someone else could disqualify themselves. ("Quebec SMEs, 10–50 employees, services businesses" is a where. "The market" is not.)
- **How we win** — the angle that works *given the constraints* (budget, time, team size, regulation, attention, distribution access). State the constraint first, then the move that turns it from a limit into an advantage.
- **What we do better** — the capability, asset, or wedge that makes the win repeatable, not lucky.

**Failure mode to avoid:** vague strategy ("we win on quality"). If the strategy could apply to any business in any industry, it's not a strategy — it's a slogan. Rewrite until it would feel uncomfortable for a competitor to read.

**Mode calibration:**
- *Self mode:* keep it short — 3–5 lines total. PMC already lives inside the strategy; the section exists to write it down once so he stops re-deciding.
- *Client mode:* full version. The client is buying access to a strategic point of view.
- *Product mode:* full version + explicitly name the competitive set. "How we win" must beat at least one named alternative.
- *Framework mode:* full version + a one-line *strategic principle* the reader can apply elsewhere.

### 3. Who This Is For / Who It's Not For
Two short lists. Qualification filter. This section falls naturally out of Section 2: it's whoever can play where we play, with the same constraints.
- *Self mode:* skip this section.
- *Client mode:* phrase it as fit criteria.
- *Product mode:* phrase it as buyer disqualifiers — this raises conversion.
- *Framework mode:* phrase it as "this framework applies when..."

### 4. The Core Framework
The 3–7 principles or stages that drive the whole guide. Each gets a name and a one-sentence explanation. This is the **load-bearing IP** of the guide — make it memorable. If you can collapse it into an acronym or a visual model, do. The framework must operationalize the strategy from Section 2. If there's no causal link between them, one of them is wrong.

### 5. The Implementation Path
Sequenced steps. Not a checklist dump. Each step is:
- **Name** (verb-led, action-oriented)
- **What you do** (1–3 sentences)
- **What you produce** (the artifact at the end of this step)
- **How long it takes** (realistic, not aspirational)

Order matters. If two steps can run in parallel, say so explicitly.

### 6. The Tools & Stack
What the reader needs to execute. Prefer tools PMC already uses (Next.js, TypeScript, Supabase, Tailwind, n8n, Stripe, Telnyx, ElevenLabs, Deepgram, OpenAI, Gemini, Perplexity) unless the guide is for a domain that needs something else. Note free vs. paid, and flag anything that requires technical setup.

### 7. Templates & Scripts
Copy-paste assets. This is what makes the guide *deployable* instead of *theoretical*. Depending on the topic:
- Email/message templates
- Prompts (system + user)
- Config files / env vars
- SQL schemas
- n8n workflow JSON snippets
- Scripts for repetitive setup
- Checklists the reader can literally print

**No assets = no guide.** If you can't produce at least one concrete template, the guide isn't done.

### 8. Pitfalls & Failure Modes
What kills implementation. Be specific. "Don't skip step 3" is useless; "If you skip the webhook signature verification, Stripe will silently accept spoofed events and your subscription state will desync from production" is useful.

### 9. Proof of Implementation
How the reader knows it worked. Concrete signals — a metric, an artifact, a behavior change, a working endpoint. Distinguish between *built it* and *it's working*.

### 10. Next Level
What to do once it's running. Keeps momentum after launch and creates the natural upsell/upgrade path (especially in `product` and `client` modes).

---

## Step 4 — Add the mode-specific section(s)

After the ten-part structure, append the section(s) that match the mode(s) PMC picked. **If multiple modes were selected, append all corresponding sections in this order: Sprint Plan → Delivery Kit → Commercialization Pack → Teaching Kit.** Skip any that weren't picked.

### If `self` is selected
Add a **"Sprint Plan"** — break the implementation into 30-minute sprints PMC can execute. Match his ADHD work style.

### If `client` is selected
Add a **"Delivery Kit"** — RACI matrix, kickoff agenda, weekly check-in template, handoff checklist, scope-creep guardrails.

### If `product` is selected
Add a **"Commercialization Pack"**:
- Positioning statement (1 sentence: for [who], who [pain], [product] is a [category] that [outcome], unlike [alternative], we [differentiator])
- 3 sales-page hook angles
- Pricing logic (anchor, tiers, what's included at each tier)
- Refund/guarantee language
- One upsell path

### If `framework` is selected
Add a **"Teaching Kit"**:
- A diagram description (Claude builds it via the visualizer or describes it for design)
- 2–3 worked examples showing the framework applied to real scenarios
- A "how to defend the IP" note — what's proprietary, what's commodity

---

## Step 5 — Output format and saving

The `.md` file is always produced and saved to Obsidian regardless of what other format PMC picked. Other formats are **additional outputs**, not substitutes.

### Folder structure

Obsidian vault root:
```
/Users/pmc/Documents/CardinalConseils/013 - Ideas and guides/
```

Inside, guides are organized as `[venture]/[mode]/[filename].md`:
```
013 - Ideas and guides/
├── cardinal/
│   ├── self/
│   ├── client/
│   ├── product/
│   └── framework/
├── payfacto/
│   ├── self/
│   └── framework/
├── serviconnect/
│   └── self/
├── proposai/
│   └── self/
├── personal/
│   └── self/
└── [other-venture-slug]/
    └── [mode]/
```

If a venture or mode subfolder doesn't exist yet, create it. Don't ask permission — just create.

### Filename convention

Kebab-case, lead with the topic slug. Mode and venture are already encoded in the path, so don't repeat them in the filename:
```
[topic-slug].md
```

Examples:
- `cardinal/product/ai-readiness-audit.md`
- `cardinal/framework/anti-bullshit-ai-adoption.md`
- `proposai/self/stripe-webhook-supabase-sync.md`
- `payfacto/self/maitre-d-virtuo-onboarding.md`
- `serviconnect/self/agentic-patterns-v2-architecture.md`

If a file with that name already exists, append `-v2`, `-v3`, etc. — never overwrite silently.

### Frontmatter

Every `.md` file starts with YAML frontmatter:
```yaml
---
title: [Human-readable title]
modes: [array of: self, client, product, framework]
primary_mode: [the mode used for folder placement, per priority rule]
venture: [cardinal | payfacto | serviconnect | proposai | personal | other-slug]
topic: [topic slug]
source: [URL, video link, or "internal" if from a paste]
format: [md | interactive-html | simple-html | json | docx]
branded: [true | false]
published: [true | false]
github_url: [public URL if published, else null]
live_url: [Vercel URL if HTML format was published, else null]
created: [YYYY-MM-DD]
tags: [implementation-guide, [each mode], [venture], [domain tags]]
status: draft
---
```

### Format branches

After writing the markdown, branch based on what PMC picked in pre-flight:

**`md` (default):** Save to Obsidian path. Done.

**`interactive-html`:** Build a React + Tailwind + shadcn artifact alongside the .md. The .md is the source of truth — the artifact is a rendering of it. If `branded: true`, invoke the `cardinal-conseils-brand` skill for OKLCH tokens, Geist typography, and component patterns. Save the .md to Obsidian first, then create the artifact.

**`simple-html`:** Build a single static HTML file (no JS, no framework). Inline CSS or a single `<style>` block. If `branded: true`, apply the Cardinal brand tokens manually. Save the .md to Obsidian, then the `.html` to the same subfolder alongside it.

**`json`:** Produce a structured JSON representation of the guide where each of the ten sections is a key, the implementation path is an array of step objects, and templates/scripts are an array of asset objects. Save the .md to Obsidian, then `.json` next to it.

**`docx`:** Invoke the `docx` skill after the .md is saved. If `branded: true`, apply Cardinal brand styling via the `cardinal-conseils-brand` skill. Save the `.docx` to `/mnt/user-data/outputs/` and present it.

### Saving steps

1. Determine the path: `013 - Ideas and guides/[venture]/[mode]/[topic-slug].md`. Create subfolders if missing.
2. Write the `.md` file with full frontmatter.
3. If PMC picked a non-md format, produce that additional artifact per the format branches above.
4. **If PMC picked `publish` in pre-flight, run Step 6 (GitHub publish) before indexing in Brain.** This ensures Brain stores the live URL.
5. Call `mcp__ac95485d-f4c1-4018-944b-6a34741142c9__save_memory` (Brain MCP) with a pointer record:
   - **What to save:** title, mode, venture, topic, vault path, format(s) produced, branded yes/no, published yes/no, GitHub URL (if published), live URL (if HTML and published), 2–3 sentence summary of the core framework.
   - **Why:** Obsidian is the static vault; Brain is the dynamic index. `search_brain` should find this guide later by topic, mode, venture, or domain.
6. Confirm in one line: *"Saved to vault as [path] + indexed in Brain. [Additional format] also produced. [Published to GitHub: live URL]."*

---

## Step 6 — GitHub publish (only if `publish` selected)

Skip this entire step if PMC picked `private`. If `publish`, run the full sequence below. Use the **GitHub MCP** (`mcp__github__*` tools) — not raw git, not bash.

### Target repo
```
cardinalconseils/Artifacts
```

Vercel deployment is connected to this repo and triggers automatically on push to `master`. The skill assumes this is already configured. If a push lands but Vercel doesn't deploy, check that the three secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) are set in GitHub Actions secrets.

### Repo architecture (fixed — do not improvise)
```
cardinalconseils/Artifacts/
├── README.md                       ← auto-updated index of all artifacts
├── _index.json                     ← machine-readable catalog
├── llms.txt                        ← AI agent discoverability
├── vercel.json                     ← static site config
└── [venture]/
    └── [mode]/
        └── [topic-slug]/
            ├── README.md           ← the .md guide (GitHub renders this as the folder landing page)
            ├── index.html          ← if simple-html or interactive-html was produced
            ├── artifact.json       ← if json was produced
            ├── artifact.docx       ← if docx was produced
            └── meta.json           ← frontmatter + push timestamp + URLs
```

**Critical rules:**
- One folder per guide, never one loose file. Multi-format guides stay grouped.
- The `.md` file is renamed to `README.md` when committed so GitHub renders it as the folder's landing page.
- `meta.json` is the machine-readable mirror of the frontmatter, plus push metadata.
- Repo `README.md` (root) and `_index.json` (root) are regenerated on every publish so the repo always has an up-to-date catalog.

### Context awareness (read repo state before pushing)

Before writing anything to the repo, fetch current state so the skill never overwrites silently:

1. **Check if the target folder exists:** `mcp__github__get_file_contents` on `[venture]/[mode]/[topic-slug]/`.
2. **If it exists:** read the existing `meta.json`. If `created` date differs from the current run, treat this as a re-publish → append `-v2`, `-v3`, etc. to the folder slug. Never silent-overwrite a different guide's folder.
3. **If publishing a true update to the same guide** (PMC explicitly says "update this"): overwrite in place, increment a `version` field in `meta.json`, and log the prior version in a `versions[]` array.
4. **Fetch the current root `_index.json`** so the regeneration step has the full catalog.

### Files to commit (in this order)

1. `[venture]/[mode]/[topic-slug]/README.md` — the guide body (the .md with frontmatter)
2. `[venture]/[mode]/[topic-slug]/index.html` — only if HTML format was produced
3. `[venture]/[mode]/[topic-slug]/artifact.json` — only if JSON format was produced
4. `[venture]/[mode]/[topic-slug]/artifact.docx` — only if docx format was produced
5. `[venture]/[mode]/[topic-slug]/meta.json` — always
6. `README.md` (root) — regenerated catalog
7. `_index.json` (root) — regenerated machine catalog

**Use `mcp__github__push_files` to commit all files in a single commit. Push to `master` branch.**

**Commit message format:**
```
publish: [venture]/[mode]/[topic-slug] — [title]

Modes: [self, client, product, framework]
Format: [md, interactive-html, ...]
Branded: [true|false]
```

### meta.json schema
```json
{
  "title": "...",
  "topic_slug": "...",
  "venture": "...",
  "modes": ["..."],
  "primary_mode": "...",
  "format": ["md", "..."],
  "branded": true,
  "source": "...",
  "created": "YYYY-MM-DD",
  "published_at": "YYYY-MM-DDTHH:MM:SSZ",
  "version": 1,
  "versions": [],
  "github_url": "https://github.com/cardinalconseils/Artifacts/tree/master/[path]",
  "live_url": "https://[vercel-domain]/[path]/",
  "tags": ["..."]
}
```

`live_url` is the Vercel deployment URL. Only meaningful when `index.html` is in the folder. If no HTML was produced, set to null.

### Regenerating root README.md and _index.json

After committing the guide folder, regenerate both root files:

- **`README.md`:** Grouped by venture → mode → list of guides. Each entry: title (linked to folder), one-line summary from frontmatter, modes badges, branded flag, live URL if available.
- **`_index.json`:** Flat array of every guide's `meta.json` content plus the path. This is what Brain queries when PMC asks "what have I shipped lately."

The regeneration logic: pull every `meta.json` in the repo via `mcp__github__search_code` (`filename:meta.json`), merge into the new index, write back.

### Monitor the deployment

After the commit lands on master, GitHub Actions fires `vercel-deploy.yml`. Surface deployment status — not just "pushed, hope it works."

1. Wait ~10 seconds after the push, then check the Actions tab status via `mcp__github__get_commit` or note that polling GitHub Actions status requires the `mcp__github__*` Actions tools if available.
2. Three outcomes to report:
   - **Deploying:** Tell PMC the push landed and Vercel is building. Show the GitHub URL (works immediately) and the expected Vercel live URL.
   - **Live:** Tell PMC it's live. Show both URLs as clickable.
   - **Errored:** Tell PMC the push landed but Vercel failed. Direct him to the Actions tab to check secrets and build logs.
3. If Actions status polling is not available, fall back to: surface the GitHub URL and the expected Vercel URL, tell PMC "Vercel build typically completes within 60 seconds."

### Final confirmation line (when published)

> *Saved to vault as `[obsidian-path]` + indexed in Brain.*
> *Published: `https://github.com/cardinalconseils/Artifacts/tree/master/[repo-path]`*
> *Live (Vercel, ~60s): `https://[vercel-domain]/[repo-path]/`*

### Failure modes to handle

- **Push fails (auth, network):** Surface the error and ask PMC to reconnect the GitHub MCP. The Obsidian save is already done — that's not lost.
- **Folder collision with a different guide:** Append `-v2` automatically. Never overwrite silently.
- **HTML format picked but no `index.html` exists when publishing:** Block the push, return to format branches, generate the missing HTML, then retry.
- **Vercel not deploying after push:** Check that `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` are set as secrets in `cardinalconseils/Artifacts` → Settings → Secrets → Actions.

---

## Step 7 — Quality bar (check before delivering)

Before handing the guide back to PMC, verify all ten:

1. **Could a buyer actually execute this without coming back to ask questions?** If no, add detail.
2. **Is there at least one copy-paste asset in Section 7?** If no, the guide isn't done.
3. **Does the Core Framework have a name that sticks?** If it's "the 5 steps", rename it.
4. **Is the Strategy (Section 2) sharp enough to disqualify someone?** If "Where we play" could apply to any company, rewrite. A strategy that doesn't exclude isn't a strategy.
5. **Does the Core Framework operationalize the Strategy?** If Section 4 has no causal link to Section 2, one of them is decorative — fix it.
6. **Did you take a position, or did you list options?** Implementation guides take positions. Reports list options.
7. **Read it aloud test** — does it sound like AI marketing copy? If yes, rewrite. Direct voice, no hype, no hedges.
8. **Venture/mode/branding consistency** — does folder placement, mode-specific section(s), and branding match what PMC picked? A `cardinal/client/` guide must have the Delivery Kit AND Cardinal brand voice. A `personal/self/` guide must NOT have Cardinal branding.
9. **Did the .md actually save to the right path?** Confirm the path before reporting "done".
10. **If `publish` was selected, did the GitHub push land on master AND was the Vercel URL surfaced?** A publish without confirmed URLs is a half-done publish.

---

## What this skill is NOT

- Not a content-repurposing engine (no LinkedIn posts, threads, captions — different skill)
- Not a market research tool (use `opportunity-scout` or `ai-product-manager`)
- Not a sales script generator (use `sales-closer`)
- Not a positioning workshop (use `strategic-copywriter` or `elite-business-strategist`)

This skill produces **the structured guide content**. Packaging, distribution, and sales come from other skills. Routing the output through `strategic-copywriter`, `canvas-design1`, `theme-factory`, or `cardinal-conseils-brand` is PMC's call after the guide is done — not part of this skill's scope.
