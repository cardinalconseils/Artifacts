# Assessment Report

Run: 2026-05-23T00:16:29Z · Mode: full · Project: Cardinal Conseils Artifacts (static catalog, vanilla HTML/CSS/JS, Vercel)

## Executive Summary

- **Overall risk: LOW–MEDIUM.** Tiny attack surface (no backend, no deps, no user data). Real exposure is operational, not exploitable: one bad hand-edit to `_index.json` takes the whole hub down, and there's no CI gate to stop it.
- **Findings by severity:** critical 1 · medium 1 · low 3 · warning 8 · info 14.
- **Top 3 urgent:**
  1. `_index.json` is a single point of failure with no validation — malformed JSON blanks the entire catalog and auto-deploys to prod (Debug, critical).
  2. No security headers (CSP / HSTS / X-Frame-Options) in `vercel.json` — clickjackable (Security, medium).
  3. `llms.txt` already out of sync with `_index.json` (3 vs 4 artifacts) — manual 4-place metadata duplication is drifting (Code Review / Debug, warning).

## Findings by Phase

- Health: 8 (critical 0, warning 2, info 6)
- Code Review: 11 (critical 0, warning 5, info 6)
- Security: 7 (medium 1, low 3, info 3)
- Debug Triage: 6 (critical 1, warning 2, info 3)

## Critical Issues (action required)

1. **Malformed `_index.json` blanks the entire hub** — index.html:273-279.
   - The hub fetches `_index.json` at runtime; any JSON error or fetch failure hits `.catch` and renders zero artifacts. The file is hand-edited on every publish (CLAUDE.md step 2) with no validation, and push to master auto-deploys (vercel-deploy.yml).
   - Fix: add a CI validation step before deploy: `python3 -c "import json; json.load(open('_index.json'))"` (ideally a schema check too). Fail the workflow on error.

## High Priority Improvements

**Data integrity / drift (warning)**
- `llms.txt` documents 3 artifacts, `_index.json` has 4 — missing `cardinal/self/mantis-tracker-audit` (llms.txt vs _index.json:38-55).
- `meta.json` ↔ `_index.json` schema drift: `meta.json` has `versions`, `_index.json` has `path`, neither is a superset — violates CLAUDE.md:67 "schema must match exactly" (all cardinal/*/*/meta.json vs _index.json).
- Root cause for both: metadata duplicated across 4 hand-edited stores (_index.json, meta.json, README table, llms.txt). Generate llms.txt + README table + _index.json from the per-artifact meta.json files.

**Security hardening (medium/low)**
- Add CSP, HSTS, X-Frame-Options (or frame-ancestors), Referrer-Policy to vercel.json headers (vercel.json:6-13).
- Pin Vercel CLI version in CI instead of `@latest` (vercel-deploy.yml:24).
- Self-host Google Fonts to remove third-party IP/UA leak (index.html:8-10 + all artifacts) — aligns with the brand's own privacy guide.

**Accessibility (warning)**
- Add label/aria-label to search input (index.html:113).
- Add aria-pressed to filter chips; active state is color-only (index.html:44).
- Make artifact tab/accordion onclick <div>s keyboard-operable: role=button + tabindex + aria-expanded (implementation-guide-builder:130-134, mantis-tracker-audit:158-161).

## Quick Wins (< 1 hour)

- [ ] Add `_index.json` JSON-validity step to vercel-deploy.yml (closes the critical issue). ~15 min.
- [ ] Add the missing mantis-tracker-audit entry (+ a Self section) to llms.txt. ~5 min.
- [ ] Commit CLAUDE.md + SECRETS.md so conventions/secret-policy enter repo history. ~5 min.
- [ ] Add `aria-label="Search artifacts"` to the search input (index.html:113). ~2 min.
- [ ] Add security headers block to vercel.json. ~15 min.
- [ ] Pin Vercel CLI version in CI. ~2 min.

## Recommended Action Plan

1. **CI validation gate** for `_index.json` (critical — stops the prod-breaking failure mode).
2. **Security headers** in vercel.json (medium — clickjacking + transport hardening).
3. **Single-source metadata**: derive `_index.json` / `README` table / `llms.txt` from `meta.json`; fix current llms.txt + schema drift.
4. **Pin Vercel CLI** + **self-host fonts** (supply-chain + privacy).
5. **Accessibility pass**: labels, aria-pressed, keyboard-operable accordions/tabs.
6. **Polish**: branded 404.html, populate live_url, refresh PRD "Secrets Tracking" field.
