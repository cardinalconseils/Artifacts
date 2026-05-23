# Bootstrap Scan Context (ADOPT MODE)

**Generated:** 2026-05-22
**Project:** Cardinal Conseils — Artifacts
**Mode:** adopt (existing codebase, mid-development)

## Detected Stack
| Category | Detected | Confidence | User Confirmed |
|----------|----------|-----------|----------------|
| Language | HTML / CSS / vanilla JS (no build) | high | pending |
| Framework | None — static site (hand-authored HTML) | high | pending |
| Test Runner | None detected | high | pending |
| Database | None — content in flat files (`_index.json`, per-artifact `meta.json`) | high | pending |
| Auth | None | high | pending |
| API Style | None — static assets only | high | pending |
| Deploy | Vercel (GitHub Actions on push to master) | high | pending |

## Project Info
- **Name:** Cardinal Conseils — Artifacts
- **Description:** Deployable frameworks, guides, and methodologies from Cardinal Conseils. Each artifact is structured with the BUILD framework. Site root `/` is the Artifact Hub — a browsable/searchable catalog generated from `_index.json`.
- **Dev command:** none / open `index.html` (or `vercel dev`) — no package.json
- **Build command:** none (`vercel.json` buildCommand is empty, outputDirectory `.`)
- **Test command:** none detected
- **Production branch:** master

## Scan Details
- has_api_routes: false
- has_auth: false
- has_tests: false
- has_database: false (content stored as JSON/MD/HTML files on disk)
- test_framework: none
- db_client: none
- auth_method: none
- api_style: none (static)
- api_directory: none
- has_package_json: false
- has_env_files: false (no committed .env; `.env` is gitignored)
- deploy_platform: vercel
- deploy_trigger: GitHub Actions `.github/workflows/vercel-deploy.yml` on push to master
- existing_claude_md: false (no CLAUDE.md)
- existing_prd: partial — `.prd/` exists with `.cks-version` and `logs/.current_session_id` only (not yet committed; shows as untracked)
- existing_skills: `.claude/skills/implementation-guide-builder/SKILL.md`

## Adopt-Specific Fields

### branch_name
- Current checked-out branch: **master**
- No local feature branch active.
- Remote feature branches present (recent agent work, likely merged via PRs):
  - `origin/claude/ai-strategy-alignment-fb0xm`
  - `origin/claude/artifact-wiki-frontend-UEz3Y`
  - `origin/claude/five-h-framework-K0rAn`
  - `origin/claude/focused-lovelace-b1JJe`
  - `origin/claude/youthful-pasteur-MVsqC`

### current_feature
- **Unknown — NEEDS USER INPUT.** No active feature branch checked out. Most recent merged work was the AI–Strategy Alignment Framework artifact (PR #4). Repo is on a clean master at a publish boundary, suggesting either between-features or starting next artifact.
- Working tree clean except untracked `.prd/` (bootstrap scaffolding in progress).

### recent_commits (last 9 — full history)
1. `1aa8917` publish: cardinal/framework/ai-strategy-alignment — The AI–Strategy Alignment Framework (#4)
2. `dde8475` chore: add implementation-guide-builder skill to master
3. `3712103` Add Artifact Hub: searchable, categorized landing page (#3)
4. `0cfd391` publish: cardinal/framework/five-h-framework — The Five H Framework (#2)
5. `a5e0824` Add MANTIS Web Tracker Audit Workflow guide
6. `5769e9d` publish: cardinal/framework/implementation-guide-builder — add interactive HTML
7. `190e241` publish: cardinal/framework/implementation-guide-builder — The BUILD Framework
8. `78a111d` ci: add Vercel production deploy workflow on push to master
9. `882d58d` chore: initial scaffold

**Recent work pattern:** Each new artifact is published as `cardinal/{mode}/{slug}/` containing `README.md` + `index.html` + `meta.json`, then registered in root `_index.json` and `llms.txt`, with `README.md` catalog table updated. Commit convention: `publish: cardinal/{mode}/{slug} — {Title}`. Cadence ~1 artifact per PR.

### detected_secrets
Source: `.github/workflows/vercel-deploy.yml` (GitHub Actions secrets — referenced, NOT committed in repo):
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VERCEL_TOKEN`

No `.env` file present on disk. `.env` is gitignored. No hardcoded credentials found in scanned files. Vercel secrets live in GitHub repo settings, not the codebase — clean.

## Repository Layout
```
/
├── index.html          ← Artifact Hub (searchable catalog UI)
├── _index.json         ← Machine-readable artifact catalog
├── llms.txt            ← AI agent index
├── README.md           ← Human catalog + project overview
├── vercel.json         ← Static deploy config (no build, outputDir .)
├── .github/workflows/vercel-deploy.yml
├── .claude/skills/implementation-guide-builder/SKILL.md
├── .prd/               ← CKS lifecycle scaffold (untracked, in progress)
└── cardinal/
    ├── framework/
    │   ├── ai-strategy-alignment/   (README.md, index.html, meta.json)
    │   ├── five-h-framework/
    │   └── implementation-guide-builder/
    └── self/
        └── mantis-tracker-audit/
```

## Kickstart Context
No kickstart artifacts found (no `.kickstart/context.md` or `.kickstart/artifacts/ARCHITECTURE.md`).

## OPEN INTAKE QUESTIONS (AskUserQuestion unavailable in subagent — orchestrator must ask)

1. **Project profile** — Scan strongly indicates **Website** (static content catalog, HTML pages, Vercel static deploy, no app logic/API/DB). Confirm: Website vs App/Library/API.
2. **What are you currently building?** — No active feature branch; repo on clean master after publishing the AI–Strategy Alignment artifact. Need the user to state the in-flight feature so `current_feature` can be filled. Default guess based on pattern: authoring/publishing the next Cardinal artifact.
