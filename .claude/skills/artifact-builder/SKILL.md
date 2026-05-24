---
name: artifact-builder
description: Build a Cardinal Conseils artifact from a brief or raw content — runs the Cardinal Brief gate, builds index.html + README.md + meta.json, updates catalogs, commits, opens PR.
triggers:
  - "build artifact"
  - "new artifact"
  - "create artifact"
  - "publish artifact"
  - content pasted from Obsidian or New/ folder
---

# Cardinal Artifact Builder

Build a complete, branded, publication-ready Cardinal Conseils artifact from a brief or raw content.

## When this skill activates

- User pastes content and says "build this" or "make an artifact"
- User references a file in `New/` or `/Users/pmc/Documents/CardinalConseils/013 - Ideas and guides/`
- User says "new artifact", "create artifact", "publish"
- A completed brief is dropped in `queue/` and the user wants it built immediately

## Pre-flight: read the build spec

Before doing anything else, read `/Users/pmc/Documents/DEV/Artifacts/ARTIFACT-BUILD-INSTRUCTIONS.md`. This is the authoritative build specification — design tokens, artifact anatomy, type rules, validation checklist, and meta.json schema.

## Step 1: Source the content

Check in this order:

1. **Inline content** — if the user pasted content directly, use it
2. **New/ folder** — scan `/Users/pmc/Documents/DEV/Artifacts/New/` for `.html`, `.md`, or `.txt` files not yet published
3. **Obsidian** — scan `/Users/pmc/Documents/CardinalConseils/013 - Ideas and guides/` for `.md` files that have `brief_gate_passed: false` or no frontmatter
4. **queue/** — check `/Users/pmc/Documents/DEV/Artifacts/queue/` for `.md` files (not README.md or BRIEF-TEMPLATE.md)

If multiple sources exist, ask: "I found [N] potential briefs. Which would you like to build?"

## Step 2: Run the Cardinal Brief gate

The gate must complete before any content is written.

Work through the 7 sections interactively — one at a time. Push back on vague answers.

### Section 1: Identity

Ask or confirm:
- Title (must pass the swap test — could only be a Cardinal Conseils guide)
- Slug (kebab-case, URL-safe: `[a-z0-9-]+`)
- Type: reading-guide / interactive-tool / implementation-guide / integration-framework / workflow-builder
- Mode: framework / self / client / product
- Language: EN / FR / EN/FR

**Workflow-builder auto-detect:** If 2+ of these appear in the content, flag type as workflow-builder and ask which variant: `workflow builder`, `node editor`, `React Flow`, `xyflow`, `drag and drop nodes`, `visual automation`, `Zapier-like`, `n8n-like`, `agent orchestration UI`, `pipeline editor`

### Section 2: The one job

One sentence only. Must be falsifiable.

Reject: "Help leaders feel more confident about AI"
Accept: "Give the visitor a prioritized list of their AI initiatives ranked by strategic alignment — something they couldn't produce in under 10 minutes before"

Push back until it's specific and testable.

### Section 3: The visitor

- Who (specific role + context — not "business leader")
- Starting belief (what they believe when they arrive)
- Ending belief (what they believe when they leave — Cardinal takes positions)

### Section 4: The content

- Core argument (the position taken, not just a summary)
- Section list with enough detail to write from — not just headings
- Claims that need sources (or "hypothesis — based on [X]")

### Section 5: Interactivity (tools only)

Skip for reading-guide and integration-framework.

- Inputs (field names, types, validation, edge cases)
- Outputs (format, how it changes per input)
- Empty state (what shows before input)
- Edge cases (extreme values, missing inputs)

### Section 6: Download

Yes or no. If yes, what filename?

### Section 7: Notes for Claude

Technical constraints, special data, language quirks, anything that would surprise the builder.

### Quality check

All 8 must pass before building:

- [ ] One job is falsifiable
- [ ] Starting and ending beliefs are clearly different
- [ ] Every claim sourced or labeled "hypothesis — based on [basis]"
- [ ] Content section has detail to write from (not just headings)
- [ ] Tool inputs/outputs/edge cases defined (tools only)
- [ ] Title passes the swap test
- [ ] No generic aspirational jobs
- [ ] Real position taken

If any fails, return it with specific feedback. Do not build a brief that hasn't passed.

## Step 3: Build the artifact

Following `ARTIFACT-BUILD-INSTRUCTIONS.md` exactly:

1. Determine artifact type and variant (workflow-builder only)
2. Write `index.html` — complete, branded, no placeholders
   - Metadata comment block at top
   - Cardinal Conseils logo + back-to-hub nav
   - Source Serif 4 headlines, Geist body, Geist Mono labels
   - Hub hex tokens (--cream, --cardinal, --bronze, etc.)
   - Grain texture overlay
   - Cardinal Red: one use per surface maximum
   - Footer: "Cardinal Conseils" + "guides.cardinalconseils.com"
3. Write `README.md` with YAML frontmatter
4. Write `meta.json` per the schema in ARTIFACT-BUILD-INSTRUCTIONS.md

## Step 4: Validate before committing

Run the full validation checklist from `ARTIFACT-BUILD-INSTRUCTIONS.md`:

- [ ] Metadata comment block present
- [ ] meta.json complete
- [ ] Logo/nav present
- [ ] No hardcoded hex outside :root
- [ ] Source Serif 4 + Geist loaded correctly
- [ ] Cardinal Red at most once per surface
- [ ] Background is var(--cream)
- [ ] Grain texture overlay present
- [ ] All states designed (tools only)
- [ ] No placeholder content
- [ ] Download works (if applicable)
- [ ] Mobile layout single column below 768px
- [ ] Voice: no banned words, no exclamation marks
- [ ] Footer present

## Step 5: Create files and update catalogs

1. Create `cardinal/{mode}/{slug}/` with `index.html`, `README.md`, `meta.json`, `brief.md`
2. Add entry to `_index.json` matching existing entry schema
3. Add entry to `llms.txt` under correct venture section
4. Update root `README.md` catalog table

Validate `_index.json`: `python3 -m json.tool _index.json`

## Step 6: Commit and open PR

Commit message: `publish: cardinal/{mode}/{slug} — {Title}`

Stage only:
- `cardinal/{mode}/{slug}/` (new artifact files)
- `_index.json`
- `llms.txt`
- `README.md`

Open PR via GitHub MCP or `gh pr create`. Branch: `artifact/{slug}` → `master`.

## Workflow-builder variant notes

When type is workflow-builder, select the variant based on brief content:

| Variant | When |
|---------|------|
| `generic` | General workflow automation |
| `ai-agent` | LLM steps, tool calls, RAG, human approval gates |
| `payfacto-veloce` | PayFacto, Veloce, Maître'D, restaurant POS |

Load React Flow via CDN — no build step needed:
```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@xyflow/react@12/dist/umd/index.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@xyflow/react@12/dist/style.css">
```

See `.claude/skills/workflow-builder/SKILL.md` for the full React Flow template.

## What not to do

- Never build before the brief gate passes
- Never use OKLCH tokens — the hex palette in ARTIFACT-BUILD-INSTRUCTIONS.md is canonical
- Never use placeholder content or "Lorem ipsum"
- Never add a "how to use" section — the artifact must explain itself
- Never commit to master directly — always open a PR
- Never touch `vercel.json`, `.github/workflows/vercel-deploy.yml`
