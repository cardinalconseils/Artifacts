# Assessment Findings
Run: 2026-05-23T00:16:29Z
Mode: full
---

## Health
agent: cks:health-checker

- [warning] Git: CLAUDE.md, SECRETS.md, .prd/, .claude/rules/, .context/, .bootstrap/ all UNTRACKED; .gitignore modified. Conventions + secret policy absent from repo history → CI/contributors don't see them.
- [info] Branch master in sync w/ origin (1aa8917). Solo on master; publish workflow expects PR→merge.
- [info] Zero runtime deps. No package.json/node_modules by design (CLAUDE.md). Minimal supply-chain surface.
- [info] CI installs vercel@latest unpinned (vercel-deploy.yml:24) → reproducibility risk.
- [info] No .env on disk; .env gitignored (.gitignore:2). 3 secrets in GH Actions only, documented. Correct.
- [info] Zero TODO/FIXME/HACK in shipped code.
- [warning] No test suite (CLAUDE.md confirms). No JSON validation/link-check/HTML-lint in CI. Top fragility for hand-edited _index.json.
- [info] PRD: Status=sprint, phase_status=designed, phase 01-publish-next-artifact. "Secrets Tracking: not scanned" stale (SECRETS.md exists).

## Code Review
agent: cks:reviewer

- [info] index.html matches CLAUDE.md model: static page, fetch _index.json at runtime (index.html:273), render venture/mode sections.
- [warning] Schema drift meta.json vs _index.json. CLAUDE.md:67 mandates exact-match schema. meta.json has `versions` (no `path`); _index.json has `path` (no `versions`). Files: all cardinal/*/*/meta.json vs _index.json:1-74.
- [info] Fetch failure path solid: throw on non-ok + friendly catch state (index.html:276-279). Empty state handled (222-226).
- [info] IIFE well-factored, no fn >50 lines. render() (218-251) largest, readable.
- [warning] Metadata maintained in 4 places per artifact (_index.json, meta.json, README table, llms.txt). llms.txt out of sync: documents only 3 framework guides, omits cardinal/self/mantis-tracker-audit. Files: llms.txt vs _index.json:38-55.
- [warning] vercel-deploy.yml + meta.json schema duplicated as copy-paste snippets in implementation-guide-builder/index.html:272,292 → will rot.
- [warning] a11y: search input (index.html:113) placeholder-only, no label/aria-label.
- [warning] a11y: filter chips active state color-only (index.html:44), no aria-pressed → WCAG 1.4.1/4.1.2.
- [warning] a11y: artifact tabs/accordions use onclick on <div>s (implementation-guide-builder:130-134, mantis-tracker-audit:158-161) — not keyboard-focusable, no role/tabindex/aria-expanded.
- [info] lang, viewport, semantic header/main/footer present. Baseline good.

## Security
agent: cks:security-auditor

Static site, no backend, no user data. Surface = client-side + supply chain + deploy config.

- [medium] OWASP-A05 Missing security headers. vercel.json:6-13 sets only X-Content-Type-Options + Cache-Control. No CSP, HSTS, X-Frame-Options/frame-ancestors, Referrer-Policy. Site clickjackable, no CSP. Highest-impact hardening. File: vercel.json.
- [low] OWASP-A06 Unpinned CI tool. vercel-deploy.yml:24 npm install -g vercel@latest → compromised/breaking release flows into prod deploy. Pin version.
- [low] OWASP-A03/privacy Third-party font CDN. All pages load Google Fonts (index.html:8-10 + all artifacts) → visitor IP/UA shared w/ Google. Ironic: mantis-tracker-audit is a Loi 25/GDPR tracker-audit guide. Self-host fonts.
- [low] OWASP-A07 XSS DOM sinks reviewed, safe today. innerHTML build (index.html:236) but all fields via esc() (153), href fields esc()-wrapped. Data internal-only. Would become exploitable if _index.json ingests untrusted entries. Keep esc() everywhere.
- [info] No hardcoded secrets/keys/tokens in tracked code. SECRETS.md policy sound.
- [info] Copy buttons: navigator.clipboard.writeText(pre.textContent) (implementation-guide-builder:363-365) — static content, no injection.
- [info] All target=_blank have rel=noopener. No tabnabbing.

## Debug Triage
agent: cks:debugger

No runtime/build logs (static, no test run). Triage = latent failure modes.

- [critical] Single point of failure: malformed _index.json blanks entire hub. index.html:273-279 — invalid JSON or failed fetch → catch state → ZERO artifacts render. Hand-edited each publish, no CI validation. Bad commit auto-deploys (vercel-deploy.yml on push to master). Fix: CI step `python3 -c "import json;json.load(open('_index.json'))"` (or schema validator) gating deploy. Trace: PR→merge master→Actions deploy→hub broken.
- [warning] llms.txt desync present now: _index.json=4 artifacts, llms.txt:33-49 documents 3 (omits cardinal/self/mantis-tracker-audit). AI-discovery index wrong. Fix: generate llms.txt + README table from _index.json. File: llms.txt.
- [warning] meta.json <-> _index.json key drift (see Code Review). If tooling assumes one schema, breaks. Fix: one canonical schema, derive _index.json from meta.json. Files: cardinal/*/*/meta.json, _index.json.
- [info] live_url null for all 4 (_index.json). card() falls back to local path (index.html:198-199) → resolves via cleanUrls. Dead metadata until populated.
- [info] No 404.html. Vercel default 404 served. Branded 404 = quick polish.
- [info] file:// open fails fetch; catch already instructs HTTP serve. Handled.
