# SECRETS

No secrets are stored on disk in this repository.

## GitHub Actions Secrets (repo settings only)

These variables are referenced in `.github/workflows/vercel-deploy.yml` and must be configured in GitHub → Settings → Secrets and variables → Actions.

| Secret | Purpose |
|--------|---------|
| `VERCEL_ORG_ID` | Vercel organization identifier for CI deploy |
| `VERCEL_PROJECT_ID` | Vercel project identifier for CI deploy |
| `VERCEL_TOKEN` | Vercel API token for deploy authentication |

## Rules

- Never commit any of these values to the repository
- No `.env` file should exist on disk (`.env` is gitignored)
- If a new secret is needed, add it to GitHub Actions secrets and document it here
- Do not log these values in CI output or commit messages
