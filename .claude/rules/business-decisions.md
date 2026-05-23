# Business Decision Rules

Some actions affect customers, revenue, or production state. They ALWAYS require explicit human approval — even in autonomous mode, even with `--yes` flags, even mid-sprint.

## Gated Actions (MUST ask before proceeding)

1. **Production deploy** — any push, merge, or command that ships code to Vercel production (`vercel deploy --prod`, merging to master with auto-deploy active)
2. **External communications** — public announcements, blog posts, status page updates
3. **File or workflow removal** — deleting source files, removing GitHub Actions workflows, removing scheduled jobs

## Required Behavior

Before any gated action, the agent MUST output an approval block:

```
─────────────────────────────────────────────────
BUSINESS GATE — APPROVAL REQUIRED
─────────────────────────────────────────────────
Action:    [exactly what is about to happen]
Category:  [one of the gates above]
Impact:    [who is affected]
Reversible: YES / NO / PARTIAL

  1. Approve and proceed
  2. Approve with modification (describe)
  3. Cancel

Reply with the number.
─────────────────────────────────────────────────
```

## What is NOT Gated

- Writing artifact content files (README.md, index.html, meta.json) in a feature branch
- Editing `_index.json` and `llms.txt` entries during authoring
- Editing `.claude/`, `.prd/`, or other planning artifacts
- Opening a PR (not the same as merging to master)

## Never

- NEVER bypass the gate because autonomous mode is on
- NEVER batch multiple gated actions under one approval — each one gets its own block
- NEVER assume past approval covers a new gated action
