# Cardinal Conseils — Artifact Pipeline

This document explains how artifacts are created, built, and published to the Cardinal Conseils guide library. It covers the tools, the workflow, the editorial gate, and the automated queue system.

---

## What the pipeline does

An artifact is a standalone guide, tool, framework, or workflow editor published at `guides.cardinalconseils.com/cardinal/{mode}/{slug}/`. Every artifact is a complete HTML file — branded, self-contained, mobile-ready, and deployable without a build step.

The pipeline moves raw ideas into published artifacts in four stages:

```
WRITE   →  BRIEF   →   BUILD   →   SHIP
Write a    Pass the   Claude Code  Merge PR
brief in   editorial  (or Sunday   → Vercel
Obsidian   gate       cron) builds  deploys
```

Two delivery modes exist: **manual** (Claude Code, anytime) and **automated** (GitHub Actions, every Sunday at 8am EST).

---

## Repository structure

```
/
├── ARTIFACT-PIPELINE.md              ← This document
├── ARTIFACT-BUILD-INSTRUCTIONS.md    ← Brand spec and build rules (read by Claude API)
├── CARDINAL-BRIEF-TEMPLATE.md        ← Editorial gate template
├── _index.json                       ← Machine-readable artifact catalog
├── llms.txt                          ← AI agent discovery index
├── README.md                         ← Human-readable catalog
├── index.html                        ← Artifact Hub (renders _index.json)
├── package.json                      ← Queue processor dependencies (GitHub Actions only)
├── vercel.json                       ← Static deploy config — DO NOT TOUCH
│
├── cardinal/
│   ├── framework/{slug}/             ← Teachable IP and frameworks
│   └── self/{slug}/                  ← Personal tactical playbooks
│       ├── index.html                ← The artifact
│       ├── brief.md                  ← The approved brief
│       ├── README.md                 ← Guide summary
│       └── meta.json                 ← Artifact metadata
│
├── queue/
│   ├── README.md                     ← Instructions for adding briefs
│   ├── BRIEF-TEMPLATE.md             ← Copy to create a new brief
│   ├── processed/                    ← Processed briefs move here automatically
│   └── {slug}.md                     ← Drop completed briefs here
│
├── scripts/
│   └── process-queue.js              ← Queue processor (called by GitHub Actions)
│
└── .github/workflows/
    ├── vercel-deploy.yml             ← Push to master → Vercel production
    └── process-queue.yml             ← Sunday cron → build artifacts from queue
```

---

## Artifact types

| Type | Format | Interactivity | When to use |
|------|--------|--------------|-------------|
| `reading-guide` | HTML | None | Structured content the visitor reads. Clean typography, optional download. |
| `interactive-tool` | HTML + vanilla JS or React CDN | Visitor inputs data, gets output | Calculators, scorecards, assessors. Fully client-side. |
| `implementation-guide` | HTML + vanilla JS | Step progress, expandable steps | Step-by-step walkthroughs. Linear or branching. |
| `integration-framework` | HTML | None | Visual relationship maps, tables, diagrams. |
| `workflow-builder` | HTML + React + React Flow | Full canvas editor | Node-graph editors, visual automation builders, Zapier/n8n-like UIs. |

**Workflow Builder auto-detection:** When 2+ of these keywords appear in a brief, the React Flow template fires automatically: `workflow builder`, `node editor`, `React Flow`, `xyflow`, `drag and drop nodes`, `visual automation`, `Zapier-like`, `n8n-like`, `agent orchestration UI`, `pipeline editor`.

---

## Brand system

All artifacts use the Cardinal Conseils brand system defined in `ARTIFACT-BUILD-INSTRUCTIONS.md`. Key rules:

- **Colors:** hub hex palette — no hardcoded values outside `:root`, no OKLCH
- **Cardinal Red (`--cardinal`):** one use per surface maximum
- **Background:** always `var(--cream)` — warm off-white, never `#ffffff`
- **Fonts:** Source Serif 4 (headlines), Geist (body), Geist Mono (labels/code)
- **Grain texture:** `assets/grain.svg` at 35% opacity via `body::before` fixed overlay
- **Spacing:** 4pt scale only (8, 12, 16, 24, 32, 48, 64, 96px)
- **Footer:** Cardinal Conseils wordmark + `guides.cardinalconseils.com` on every artifact

---

## The Cardinal Brief (editorial gate)

Every Cardinal Conseils artifact must pass the brief before any content gets written. The brief forces a position, a sourced claim, and a falsifiable promise.

The brief has 7 sections plus a quality check:

1. **Identity** — title, slug, type, language
2. **The one job** — one sentence: what the visitor has after finishing that they didn't before
3. **The visitor** — who, starting belief, ending belief (Cardinal takes positions)
4. **The content** — core argument, sections, claims with sources
5. **Interactivity** — inputs, outputs, empty state, edge cases (tools only)
6. **Download** — yes or no
7. **Notes for Claude Code** — technical constraints, special data

**Quality check — all 8 must pass:**
- [ ] One job is falsifiable (not aspirational)
- [ ] Starting and ending beliefs are clearly different
- [ ] Every claim is sourced or labeled "hypothesis — based on [basis]"
- [ ] Content section has detail to write from, not just topic headings
- [ ] Tool inputs/outputs/edge cases defined (tools only)
- [ ] Title passes the swap test (specific to Cardinal Conseils)
- [ ] No generic aspirational jobs ("feel more confident")
- [ ] A real position is taken (not just information presented)

Copy `CARDINAL-BRIEF-TEMPLATE.md` to start a new brief. In the manual flow (Claude Code), the brief is completed interactively — one section at a time, with pushback on vague answers.

---

## Writing a brief (your weekly workflow)

### Option A — Obsidian (recommended)

1. Open `/Users/pmc/Documents/CardinalConseils/013 - Ideas and guides/BRIEF-TEMPLATE.md`
2. Duplicate it as `{slug}.md`
3. Fill in all sections — source material can be pasted directly
4. When ready: copy to `queue/{slug}.md` in the repo, commit and push
5. The Sunday cron picks it up automatically

### Option B — Claude Code session (immediate)

1. Open a Claude Code session in `/Users/pmc/Documents/DEV/Artifacts`
2. Paste content or describe what you want to build
3. Claude Code runs the brief gate interactively, then builds and PRs the artifact

### Option C — Manual trigger

Go to GitHub Actions → "Process Artifact Queue" → "Run workflow" to trigger the queue outside of Sunday.

---

## The automated queue (Sunday batch)

Every Sunday at 8am EST, GitHub Actions:

1. Checks `queue/` for `.md` files (skips `README.md` and `BRIEF-TEMPLATE.md`)
2. For each brief:
   - Validates required frontmatter fields
   - Reads `ARTIFACT-BUILD-INSTRUCTIONS.md` as the system prompt
   - Detects workflow-builder type from frontmatter or keywords
   - Calls Claude API (`claude-sonnet-4-6`) → gets complete `index.html` + `meta` object
   - Creates `cardinal/{mode}/{slug}/` with all required files
   - Updates `_index.json`, `llms.txt`, root `README.md`
   - Moves brief to `queue/processed/`
   - Opens a PR: `artifact/{slug}` → `master`
3. Each PR gets a Vercel preview URL

### What you review on Monday

For each PR, open the Vercel preview URL and check:

- [ ] Logo is present and correct
- [ ] Title matches the brief
- [ ] No placeholder content
- [ ] Cardinal Red used sparingly (once per surface)
- [ ] Source Serif 4 headlines, Geist body, warm `--cream` background
- [ ] Voice is clean — no banned words, no exclamation marks
- [ ] Tool states work: empty, in-progress, complete
- [ ] Mobile layout holds
- [ ] Download button works (if applicable)
- [ ] Content takes the position specified in the brief

**Approve → merge → ships to the live library in ~60 seconds.**

---

## Manual Claude Code flow (artifact-builder skill)

The `artifact-builder` skill is available in every Claude Code session. Trigger it by pasting content or referencing a `New/` file.

**The skill does:**
1. Scans source locations for content (inline, New/, Obsidian, queue/)
2. Runs the Cardinal Brief gate interactively
3. Detects artifact type (including workflow-builder auto-detection)
4. Builds the artifact following `ARTIFACT-BUILD-INSTRUCTIONS.md`
5. Runs the validation checklist
6. Creates all files, updates catalogs, commits, opens PR

---

## React Workflow Builder

When the artifact type is `workflow-builder`, Claude uses the React Flow template (`.claude/skills/workflow-builder/SKILL.md`). Three variants:

| Variant | Use when |
|---------|----------|
| `generic` | General-purpose workflow automation |
| `ai-agent` | LLM steps, tool calls, RAG nodes, human approval |
| `payfacto-veloce` | Restaurant POS onboarding, Maître'D, payment terminals |

The variant is selected based on the brief content and recorded in `meta.json` as `workflow_builder_variant`. React Flow is delivered via CDN — no build step required.

---

## Required GitHub secret

| Secret | Where |
|--------|-------|
| `ANTHROPIC_API_KEY` | GitHub repo → Settings → Secrets → Actions |

Already present: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

---

## Voice rules

- Direct, calm, advisor tone — reads like *The Economist*, not a SaaS landing page
- No exclamation marks, no emoji in labels or headings
- Prose over bullet lists
- Every outcome claim (%, time saved, cost reduced) has a source or is labeled "hypothesis — based on [basis]"
- **Banned words (EN):** revolutionize, transform, disrupt, unlock, unleash, supercharge, leverage (verb), synergize, game-changer, paradigm shift, next-gen, cutting-edge, best-in-class, empower, "in today's world", "now more than ever"

---

## Files that must never be touched

- `vercel.json` — `buildCommand` and `outputDirectory` control static deploy; wrong values break production
- `.github/workflows/vercel-deploy.yml` — production deploy pipeline
- Any secret value (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `ANTHROPIC_API_KEY`) must never be committed

---

## Validation checklist (runs before every commit)

- [ ] Metadata comment block present at top of `index.html`
- [ ] `meta.json` complete and valid
- [ ] Logo/nav present (back link to hub)
- [ ] No hardcoded hex values outside `:root`
- [ ] Source Serif 4 + Geist loaded correctly
- [ ] Cardinal Red used at most once per surface
- [ ] Background is `var(--cream)`, not white
- [ ] Grain texture overlay present
- [ ] All states designed: empty, in-progress, complete (tools only)
- [ ] No placeholder content anywhere
- [ ] Download button works (if applicable)
- [ ] Mobile layout: single column below 768px
- [ ] Every outcome claim sourced or flagged as hypothesis
- [ ] Voice scan: no banned words, no exclamation marks
- [ ] Footer present with Cardinal Conseils wordmark
- [ ] `_index.json` passes `python3 -m json.tool _index.json`
