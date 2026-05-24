# Artifact Queue

Drop completed briefs here as `{slug}.md` files. Every Sunday at 8am EST, GitHub Actions picks them up, calls the Claude API, builds each artifact, and opens a PR.

## How to add a brief

1. Copy `BRIEF-TEMPLATE.md` to `{slug}.md` (e.g. `ai-readiness-scorecard.md`)
2. Fill in all 7 sections — the quality check at the bottom must pass
3. Commit and push to master — the Sunday cron will find it automatically
4. To build immediately: go to GitHub Actions → "Process Artifact Queue" → "Run workflow"

## What happens automatically

For each brief in this folder (excluding README.md and BRIEF-TEMPLATE.md):

1. Brief is validated — required frontmatter fields checked
2. `ARTIFACT-BUILD-INSTRUCTIONS.md` is read as the Claude system prompt
3. Claude API (`claude-sonnet-4-6`) builds the complete `index.html` + `meta.json`
4. Files are created at `cardinal/{mode}/{slug}/`
5. `_index.json`, `llms.txt`, and root `README.md` are updated
6. Brief is moved to `queue/processed/`
7. PR is opened: `artifact/{slug}` → `master`

## What you review Monday

For each PR, open the Vercel preview URL and check:

- [ ] Logo present and correct
- [ ] Title matches the brief
- [ ] No placeholder content
- [ ] Cardinal Red used sparingly
- [ ] Font is correct (Source Serif 4 headlines, Geist body)
- [ ] Voice is clean — no banned words
- [ ] Tool states work: empty, in-progress, result
- [ ] Mobile layout holds
- [ ] Download works (if applicable)
- [ ] Position taken matches the brief

Approve → merge → ships in ~60 seconds.

## Files in this folder

- `README.md` — this file (never processed)
- `BRIEF-TEMPLATE.md` — copy this to start a brief (never processed)
- `processed/` — briefs move here automatically after processing
- `{slug}.md` — drop your completed briefs here
