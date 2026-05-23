# Vercel Static Site Deployment

**Researched:** 2026-05-22
**Topic:** Vercel static site deployment — no build step, GitHub Actions CI

---

## Key Concepts

Vercel can deploy a static site with zero build configuration. When `buildCommand` is empty and `outputDirectory` is `.`, Vercel serves files directly from the repo root.

---

## vercel.json Configuration

```json
{
  "buildCommand": "",
  "outputDirectory": ".",
  "installCommand": ""
}
```

- `buildCommand: ""` — skips build entirely
- `outputDirectory: "."` — serves repo root as webroot
- No `framework` key needed for pure static

---

## GitHub Actions Deploy Pattern

```yaml
# .github/workflows/vercel-deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        run: |
          npx vercel --token ${{ secrets.VERCEL_TOKEN }} \
            --prod \
            --yes \
            --scope ${{ secrets.VERCEL_ORG_ID }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

Required GitHub Actions secrets:
- `VERCEL_TOKEN` — Vercel API token
- `VERCEL_ORG_ID` — Vercel organization/team ID
- `VERCEL_PROJECT_ID` — Vercel project ID

---

## Local Preview

```bash
# Install Vercel CLI globally
npm i -g vercel

# Run dev server locally (serves from current dir)
vercel dev
```

Or just open `index.html` directly in a browser — no server needed for static HTML.

---

## Deployment Behavior

- Every push to `master` triggers a production deploy
- Vercel assigns a unique preview URL per deploy
- Production URL is the custom domain (or `*.vercel.app`)
- Rollback via Vercel dashboard or `vercel rollback`

---

## Gotchas

- `vercel.json` must be at repo root (not inside a subdirectory)
- `outputDirectory: "."` means ALL files in root are publicly accessible — don't commit secrets
- Vercel caches aggressively — use query strings or cache-busting if needed for JS/CSS
- `_index.json` is served as a static asset — no special handling needed; just keep it valid JSON
- File paths are case-sensitive on Vercel (Linux), even if your local Mac filesystem is case-insensitive

---

## Useful Commands

```bash
# Deploy to production manually
vercel --prod --token $VERCEL_TOKEN

# List recent deployments
vercel ls

# Inspect a deployment
vercel inspect <deployment-url>

# Pull project env vars locally (if any)
vercel env pull
```

---

## Official Docs

- https://vercel.com/docs/deployments/overview
- https://vercel.com/docs/projects/project-configuration (vercel.json reference)
- https://vercel.com/docs/cli (CLI reference)
