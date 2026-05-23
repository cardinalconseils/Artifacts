# Features Catalog

**Cataloged:** 2026-05-22

## Features

| ID | Name | Status | Description |
|----|------|--------|-------------|
| F-01 | Artifact Hub Landing Page | shipped | Root index.html landing page rendering a card-based catalog of all artifacts grouped into venture sections with mode badges, format tags, and Open/Source actions. |
| F-02 | Search & Filter | shipped | Client-side debounced search over title/summary/tags plus venture and mode chip filters; clickable tags drive search, all rendered live in the hub. |
| F-03 | Machine Index (_index.json) | shipped | Flat JSON array of every artifact's metadata (title, venture, modes, format, tags, summary, paths, urls) fetched at runtime by the hub and exposed for programmatic discovery. |
| F-04 | LLM Discovery (llms.txt) | shipped | Structured llms.txt describing repo structure, ventures, modes, and available guides for AI agent and LLM consumption. |
| F-05 | Artifact Content Structure | shipped | Per-artifact convention at {venture}/{mode}/{slug}/ bundling README.md, interactive index.html, and meta.json, published via PRs using the "publish: cardinal/{mode}/{slug} — {Title}" pattern. |
| F-06 | Vercel Auto-Deploy CI | shipped | GitHub Actions workflow (vercel-deploy.yml) that builds and deploys the site to Vercel production on every push to master. |
