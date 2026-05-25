# PRD-STATE

| Field | Value |
|-------|-------|
| Status | idle |
| Phase ID | 01-publish-next-artifact |
| Phase Title | Publish Next Artifact |
| phase_status | shipped |
| Iteration Count | 1 |
| Iteration Reason | — |
| Secrets Tracking | ⚠ rotate GitHub PAT (exposed in chat — see notes) |
| Last Updated | 2026-05-23 |
| Active Branch | master |

## Notes

Adopted from existing codebase. All 6 site features shipped. Sprint phase is "Publish Next Artifact" — ready for `/cks:sprint` to pick up directly.

DESIGN.html generated at project root (2026-05-23): full Cardinal Conseils design system reference — color palette, Geist typography (display + body, no serif), spacing, components, do's & don'ts, agent prompts. Dark logo from `/assets/logo-dark.png`. Committed to master, deployed.

**Artifact #5 published (2026-05-23):** `cardinal/self/agent-skill-learning` — "Agent Self-Learning — Skill Creation Architecture". Four-layer architecture for controlled AI agent self-improvement. Pushed directly to master via GitHub plugin (two commits). Vercel auto-deployed. `_index.json` now has 5 entries. `llms.txt` + root `README.md` updated.

⚠ **Action required:** GitHub PAT `[REDACTED]` was exposed in chat. Rotate it: GitHub → cardinalconseils account → Settings → Developer settings → PATs → generate new classic token with `repo` scope → update n8n "GitHub account" credential.

## Working Notes

_Auto-captured by CKS session hooks. Persists context across sessions._

| Date | Branch | Files Changed | Key Activity |
|------|--------|---------------|-------------|
| 2026-05-22 | master | — | c82b69d Merge PR #5 — Cardinal Conseils Design System applied to hub |
| 2026-05-22 | master | — | 1aa8917 publish: cardinal/framework/ai-strategy-alignment (#4) |
| 2026-05-23 | master | — | c40d5f5 chore: CKS scaffolding (CLAUDE.md, rules, PRD lifecycle) |
| 2026-05-23 | master | — | d41e567 style(design): DESIGN.html — Geist font, dark logo |
| 2026-05-23 | master | — | 6177671 publish(artifact): cardinal/self/agent-skill-learning |
| 2026-05-23 | master | — | bae1d4a publish(catalog): _index.json + llms.txt + README.md for artifact #5 |
| 2026-05-23 | master | 8 files | d41e567 style(design): remove serif font, use Geist throughout |
| 2026-05-23 | style/artifact-design-unification | 3 files | 9beac14 style: unify artifact design system — Cardinal palette, KB sidebar, breadcrumb nav |
| 2026-05-24 | style/artifact-design-unification | 3 files | no commits |
| 2026-05-24 | master | 3 files | 7f3ed50 style: unify artifact design system — Cardinal palette, KB sidebar, breadcrumb nav |
| 2026-05-24 | master | 9 files | 88ccfeb feat: artifact pipeline + design system alignment |
| 2026-05-24 | master | 9 files | cc7c613 docs: artifact pipeline documentation + CLAUDE.md update |
| 2026-05-24 | master | 9 files | 669e5e0 refactor: switch queue processor to Kimi K2 via OpenRouter |
