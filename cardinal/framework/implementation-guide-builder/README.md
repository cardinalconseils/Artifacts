---
title: Implementation Guide Builder — The BUILD Framework
modes: [framework]
primary_mode: framework
venture: cardinal
topic: implementation-guide-builder
source: internal
format: [md, interactive-html]
branded: true
published: true
github_url: https://github.com/cardinalconseils/Artifacts/tree/master/cardinal/framework/implementation-guide-builder
live_url: null
created: 2026-05-22
tags: [implementation-guide, framework, cardinal, methodology, ai-tools, claude-code, knowledge-packaging]
status: published
---

# Implementation Guide Builder — The BUILD Framework

## 1. The Promise

After working through this framework, you have a repeatable system for turning any raw input — a video, article, framework, product idea, or raw notes — into a structured guide that is ready to act on, sell, or teach. In one Claude Code session, you go from unstructured input to a published artifact with a live Vercel URL, indexed in your knowledge base. The framework runs via the `implementation-guide-builder` skill.

## 2. The Strategy

**Where we play:** Knowledge workers and solo operators at Cardinal Conseils who produce expertise (audits, frameworks, methodologies, playbooks) faster than they can package it. Specifically: PMC and anyone he trains or licenses this to.

**How we win:** The bottleneck is not knowledge — it's packaging cost. Most expertise dies in chat threads or Notion docs that never leave the creator's hard drive. The BUILD framework removes packaging cost by providing a fixed ten-part structure that works across four modes. Mode-aware sections do the switching automatically — the same skeleton handles a personal playbook, a client deliverable, a productized framework, and a teachable IP asset without re-extraction.

**What we do better:** Fixed structure + mode-aware output + auto-save to vault + auto-publish to GitHub/Vercel in a single session. No competing tool combines structured knowledge extraction, multi-format rendering, vault indexing, and CI/CD deployment in one workflow.

**Strategic principle:** A framework that only works in one mode is fragile. BUILD is durable because mechanism extraction is separated from packaging — the same source material renders into four modes without re-doing the thinking.

## 3. Who This Is For / Who It's Not For

**This framework applies when:**
- You have source material worth structuring (internal or external)
- The output needs to be acted on, sold, taught, or handed to someone else
- You want the packaging done in one session
- You are working inside Claude Code with the `implementation-guide-builder` skill loaded

**This framework does NOT apply when:**
- The input is just a lookup or question (use `search_brain` or web search)
- You want repurposed social content (different skill)
- You need market research or competitive analysis (different skill)
- The input is so vague there is nothing to extract yet

## 4. The Core Framework — BUILD

Five stages, sequential. Do not skip or reorder.

**B — Brief:** Lock five decisions before writing: Mode, Venture, Format, Branding, Publish. These change what gets produced — a `self` guide and a `product` guide from the same source are different documents.

**U — Unpack:** Extract the mechanism, not just the summary. Pull: promise, cause-and-effect mechanism, required inputs, sequence, failure modes, hidden assumptions. Done silently — not shown to you.

**I — Install the Structure:** Write the ten-part guide: Promise → Strategy → Who It's For → Core Framework → Implementation Path → Tools → Templates → Pitfalls → Proof → Next Level. Every guide uses this skeleton. Headers don't change; content does.

**L — Layer the Mode:** Append mode-specific section(s) after the ten-part structure. Self → Sprint Plan. Client → Delivery Kit. Product → Commercialization Pack. Framework → Teaching Kit. Multiple modes: append all in that order.

**D — Deploy:** Save `.md` to Obsidian vault → index in Brain MCP → produce additional format(s) → push to GitHub → Vercel deploys via GitHub Actions. Fully automated inside the skill.

## 5. The Implementation Path

**Step 1 — Invoke the skill**
Type any trigger phrase in Claude Code: "build me a guide", "turn this into a guide", "make this sellable", "package this", "push to GitHub". The skill fires automatically.
*Produces:* Skill activation · *Time:* Instant

**Step 2 — Complete pre-flight**
Answer five tappable questions: Mode (multi-select), Venture, Format, Branding, Publish. Already specified in your message? Skipped automatically.
*Produces:* Locked decisions object · *Time:* 30–60 seconds

**Step 3 — Source extraction (automatic)**
Skill silently accesses source via web fetch, Brain search, or pasted content. Extracts mechanism, sequence, failure modes. If inaccessible, asks you to paste.
*Produces:* Internal extraction (not shown) · *Time:* 30–90 seconds

**Step 4 — Guide generation**
Full ten-part guide plus mode-specific sections. Strategy uses Playing to Win cascade. Core Framework gets a named model. Templates section has at least one copy-paste asset.
*Produces:* Full `.md` guide with frontmatter · *Time:* 2–5 minutes

**Step 5 — Additional format production**
If interactive-html, simple-html, json, or docx was picked, the additional artifact is produced alongside the `.md`.
*Produces:* `index.html` / `artifact.json` / `.docx` · *Time:* 1–3 minutes

**Step 6 — Save and index**
`.md` saves to Obsidian vault at `013 - Ideas and guides/[venture]/[mode]/[topic-slug].md`. Brain MCP indexes with title, mode, venture, topic, path, and 2–3 sentence summary.
*Produces:* Vault file + Brain index entry · *Time:* 10–20 seconds

**Step 7 — GitHub push + Vercel deploy** *(publish only)*
Single commit to `cardinalconseils/Artifacts` master via GitHub MCP. GitHub Actions triggers Vercel deploy automatically on push to master.
*Produces:* GitHub commit + live Vercel URL · *Time:* 60–90s push + 30–90s build

## 6. The Tools & Stack

| Tool | Purpose | Cost |
|------|---------|------|
| Claude Code | Runs the skill, generates the guide | Paid |
| `implementation-guide-builder` skill | Loaded from `.claude/skills/` | Free (in-repo) |
| Brain MCP | Indexes guides for `search_brain` retrieval | Configured per session |
| GitHub MCP | Pushes files to `cardinalconseils/Artifacts` | Free |
| Vercel | Hosts and serves HTML artifacts | Free tier sufficient |
| GitHub Actions | Triggers Vercel deploy on push to master | Free (public repo) |
| Obsidian | Local vault for `.md` storage | Free |

**Required setup:** GitHub MCP authenticated. Vercel project linked to repo with `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` set as GitHub Actions secrets.

## 7. Templates & Scripts

### Trigger phrases
```
Build me a guide on [topic]
Turn this into a sellable framework: [paste content]
Package this for a client: [paste notes]
Make this teachable: [paste methodology]
Push this to GitHub as a deployable artifact: [paste content]
```

### Pre-flight checklist
```
[ ] Source material accessible (URL, paste, or Brain entry)
[ ] Mode: self / client / product / framework
[ ] Venture: cardinal / payfacto / serviconnect / proposai / personal
[ ] Format: md + interactive-html / simple-html / json / docx
[ ] Branding: cardinal-brand / unbranded
[ ] Publish: publish (GitHub + Vercel) / private (vault only)
[ ] GitHub MCP authenticated
[ ] Vercel secrets set in GitHub Actions
```

### GitHub Actions workflow (vercel-deploy.yml)
```yaml
name: Vercel Production Deployment
on:
  push:
    branches: [master]
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install --global vercel@latest
      - run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### vercel.json
```json
{
  "buildCommand": "",
  "outputDirectory": ".",
  "cleanUrls": true,
  "trailingSlash": false
}
```

### meta.json schema
```json
{
  "title": "...",
  "topic_slug": "...",
  "venture": "cardinal | payfacto | serviconnect | proposai | personal",
  "modes": ["self | client | product | framework"],
  "primary_mode": "...",
  "format": ["md", "interactive-html"],
  "branded": true,
  "source": "URL or internal",
  "created": "YYYY-MM-DD",
  "published_at": "YYYY-MM-DDTHH:MM:SSZ",
  "version": 1,
  "versions": [],
  "github_url": "https://github.com/cardinalconseils/Artifacts/tree/master/[path]",
  "live_url": "https://[vercel-domain]/[path]/",
  "tags": []
}
```

## 8. Pitfalls & Failure Modes

**Skipping pre-flight.** The five decisions change document structure. A `client` guide has a Delivery Kit and fit-criteria language. A `product` guide has a Commercialization Pack and buyer-disqualifier framing. Generate without locking these and you'll rewrite half the document.

**Vague source material.** The skill extracts mechanism and sequence. "AI is transforming business" is not source material — it has no mechanism to extract. The skill will ask you to clarify or paste.

**Vercel secrets not set.** The GitHub Actions push lands, but the deployment step errors. Check that `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are set in repo Settings → Secrets → Actions before the first push.

**GitHub MCP session expired.** Push fails with an auth error. The Obsidian save is already done — not lost. Reconnect the GitHub MCP and re-run the deploy step only.

**Folder collision.** Same slug, different guide. Skill appends `-v2` automatically. If updating the same guide, say "update this" explicitly — skill overwrites in place and increments `version` in `meta.json`.

## 9. Proof of Implementation

You know it worked when:
- `.md` exists in Obsidian vault at `013 - Ideas and guides/[venture]/[mode]/[slug].md` with valid frontmatter
- `search_brain "[topic]"` returns the vault path and summary
- GitHub commit shows in `cardinalconseils/Artifacts/master` with the guide folder
- Vercel deployment shows `✓ Production` in the Actions tab
- Live URL returns a rendered page, not a 404
- Section 7 has at least one copy-paste asset
- Section 2 names a specific arena and disqualifies someone

**Not done if:**
- Guide exists in vault but Brain has no record (indexing step was skipped)
- Push landed on non-master branch (Vercel won't deploy)
- `index.html` missing from guide folder (Vercel serves a directory listing, not the page)

## 10. Next Level

1. **Multi-mode the same source.** The same methodology in `self` mode (sprint plan) and `framework` mode (teachable IP) are two different products from one extraction pass.
2. **Wire `_index.json` to a feed.** The machine catalog in the repo root can power a guide browser, a Proposai product page, or a client portal via n8n or Supabase.
3. **Build the Brain index as a weekly digest.** Every indexed guide is retrievable by `search_brain`. Route into a "what has PMC shipped" endpoint.
4. **License the framework.** BUILD as a workshop: "Turn your expertise into deployable artifacts in 90 minutes." The Teaching Kit from framework mode produces everything you need.
5. **Productize the skill.** Skill + this guide + Vercel landing page + Stripe checkout = standalone product.

---

## Teaching Kit

### The BUILD Flow

```
INPUT (any source material)
    │
    ▼
┌─────────────────────────────────────────────────────┐
│  B — BRIEF     Lock 5 decisions in pre-flight       │
│  U — UNPACK    Extract mechanism + failure modes    │
│  I — INSTALL   Write the ten-part structure         │
│  L — LAYER     Add mode-specific section(s)         │
│  D — DEPLOY    Save → Index → Publish → Serve       │
└─────────────────────────────────────────────────────┘
    │
    ▼
OUTPUT: .md in vault + HTML on Vercel + Brain index entry
```

### Worked Example 1 — Self Mode: Stripe Webhook Sync

**Input:** Raw notes on setting up Stripe webhooks with Supabase.
**Pre-flight:** Mode = self, Venture = proposai, Format = md, Branded = false, Publish = private.
**Output:** Tactical playbook with Stripe event table, Edge Function template, signature verification snippet, 30-minute sprint plan. No "who is this for". No Cardinal branding.
**Vault path:** `013 - Ideas and guides/proposai/self/stripe-webhook-supabase-sync.md`

### Worked Example 2 — Framework Mode: AI Readiness Audit

**Input:** Cardinal's internal AI adoption checklist.
**Pre-flight:** Mode = framework, Venture = cardinal, Format = md + interactive-html, Branded = true, Publish = publish.
**Output:** Named framework ("The READY Audit"), five-stage model, worked examples, Teaching Kit with diagram and IP defense note, interactive HTML deployed to Vercel.
**Repo path:** `cardinal/framework/ai-readiness-audit/`

### Worked Example 3 — Product Mode: The Guide Builder as a Product

**Input:** This guide.
**Pre-flight:** Mode = product, Venture = cardinal, Format = md + interactive-html, Branded = true, Publish = publish.
**Output:** Same ten-part structure + Commercialization Pack: positioning statement, three sales-page hooks, pricing tiers (free = self mode, paid = client + product + framework + publish), upsell path to live workshop.

### How to Defend the IP

**Proprietary:** The BUILD acronym and stage definitions. The pre-flight five-decision model. The rule that Strategy must disqualify someone. Mechanism extraction before structure.

**Commodity:** Multi-section guides generally. GitHub + Vercel infrastructure. Individual templates.

**Defense:** BUILD is defensible as methodology because the mechanism-first extraction + mode-switching logic is specific and teachable. Protect it by publishing dated artifacts (this page is the timestamp) and teaching it publicly under the Cardinal brand.
