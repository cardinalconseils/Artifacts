# Cardinal Conseils — Artifacts

## What This Project Is

Static artifact catalog for Cardinal Conseils. Deployable frameworks, guides, and methodologies — each structured with the BUILD framework. Root `/` is the Artifact Hub: a browsable, searchable catalog rendered from `_index.json`. No backend, no build step, no package manager. Pure HTML/CSS/JS deployed to Vercel on push to master.

Current state: 5 artifacts published, hub live, CI/CD operational. Workflow is "author new artifact → publish PR → merge to master → auto-deploy." Artifact pipeline added: queue-based Sunday batch builder + manual Claude Code flow.

## Stack

- **Language:** Vanilla HTML / CSS / JavaScript (no transpiler, no bundler)
- **Content store:** `_index.json` (machine catalog) + per-artifact `meta.json`
- **Deploy:** Vercel via GitHub Actions (`vercel-deploy.yml`) on push to master
- **CI:** GitHub Actions — deploy only, no build step (`vercel.json` outputDirectory: `.`)
- **Dev preview:** `vercel dev` or open `index.html` directly in browser

## Project Structure

```
/
├── index.html                  ← Artifact Hub (catalog UI, reads _index.json at runtime)
├── _index.json                 ← Machine-readable artifact catalog (all metadata)
├── llms.txt                    ← AI agent / LLM discovery index
├── README.md                   ← Human-readable catalog + project overview
├── vercel.json                 ← Static deploy config (no build, outputDir: .)
├── .github/workflows/          ← vercel-deploy.yml (push to master → prod) + process-queue.yml (Sunday cron)
├── .claude/skills/             ← artifact-builder + workflow-builder skills
├── ARTIFACT-BUILD-INSTRUCTIONS.md  ← canonical brand spec (read by Claude API + Claude Code)
├── CARDINAL-BRIEF-TEMPLATE.md ← editorial gate template
├── ARTIFACT-PIPELINE.md        ← pipeline documentation
├── package.json                ← queue processor dep (@anthropic-ai/sdk) — Vercel never runs npm
├── scripts/process-queue.js   ← Sunday batch builder
├── queue/                      ← drop completed briefs here for Sunday processing
└── cardinal/
    ├── framework/{slug}/       ← framework artifacts (README.md, index.html, meta.json)
    └── self/{slug}/            ← self-use methodology artifacts
```

## Key Workflows

### Running the Project

- Dev: open `index.html` in browser, or run `vercel dev`
- Build: none (static, no compilation)
- Test: none configured
- Deploy: push to master → GitHub Actions → Vercel production (automatic)

### Publishing a New Artifact

**Manual (Claude Code):** paste content or reference `New/` file → `artifact-builder` skill runs the brief gate, builds, commits, opens PR.

**Automated (queue):** drop a brief `.md` in `queue/` → push → Sunday cron builds and PRs automatically.

Manual file steps:
1. Create `cardinal/{mode}/{slug}/` containing `README.md`, `index.html`, `meta.json`, `brief.md`
2. Add entry to root `_index.json` (matches schema of existing entries)
3. Add entry to `llms.txt` under the correct venture section
4. Update `README.md` catalog table
5. PR + merge to master → auto-deploys

Commit convention: `publish: cardinal/{mode}/{slug} — {Title}`

## Commands

- `/cks:sprint-start` — load context at session start
- `/cks:go` — build + commit + push + PR
- `/cks:new` — plan a new artifact
- `/cks:status` — project dashboard
- `/cks:sprint` — run sprint from designed phase
- `/cks:help` — all commands

## Critical Constraints

- Never commit secrets — `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_TOKEN` live in GitHub repo settings only
- No `.env` file should ever be committed; `.env` is gitignored
- Never touch `vercel.json` buildCommand or outputDirectory — static deploy depends on empty build
- Every new artifact must have an entry in `_index.json` and `llms.txt` before the PR merges
- `_index.json` schema must match existing entries exactly (same keys, same types)
- `package.json` exists for the queue processor only (`@anthropic-ai/sdk`) — Vercel ignores it (`buildCommand: ""`). Do not add further npm dependencies without explicit discussion.

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `VERCEL_ORG_ID` | Vercel org identifier for CI deploy | GitHub Actions secret |
| `VERCEL_PROJECT_ID` | Vercel project identifier for CI deploy | GitHub Actions secret |
| `VERCEL_TOKEN` | Vercel API token for CI deploy auth | GitHub Actions secret |

## Do Not

- Introduce a build step, bundler, or new npm dependency without explicit discussion
- Commit any value for `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_TOKEN`, or `OPENROUTER_API_KEY`
- Deploy without verifying `_index.json` is valid JSON and the hub renders the new artifact
- Rename or restructure the `cardinal/{mode}/{slug}/` convention — existing URLs depend on it
- Add inline styles or `<style>` blocks to artifact `index.html` files when a shared pattern exists
