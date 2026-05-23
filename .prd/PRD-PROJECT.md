# PRD-PROJECT — Cardinal Conseils Artifacts

## Project Identity

| Field | Value |
|-------|-------|
| Name | Cardinal Conseils — Artifacts |
| Type | Website / Static Artifact Catalog |
| Stage | Pilot (live, publishing cadence active) |
| Repo | https://github.com/cardinalconseils/Artifacts |
| Production | Vercel (auto-deploy on push to master) |
| Owner | info@pmcardinal.com |

## Description

Deployable frameworks, guides, and methodologies from Cardinal Conseils. Each artifact is structured with the BUILD framework and published at `cardinal/{mode}/{slug}/` containing a `README.md`, an interactive `index.html`, and a `meta.json`. The site root is the Artifact Hub — a client-side searchable catalog rendered from `_index.json`.

## Stack

| Layer | Technology |
|-------|-----------|
| Language | Vanilla HTML / CSS / JavaScript |
| Framework | None — static hand-authored files |
| Data | Flat JSON (`_index.json`, per-artifact `meta.json`) |
| Auth | None |
| Database | None |
| Deploy | Vercel via GitHub Actions |
| CI trigger | Push to master branch |

## Artifact Modes

| Mode | Description |
|------|-------------|
| `framework` | Structured methodology or decision model |
| `self` | Internal operational guide / audit workflow |
| `guide` | Step-by-step practitioner guide |
| `product` | Product-level methodology or playbook |

## Commit Convention

```
publish: cardinal/{mode}/{slug} — {Title}
```

## Secrets (GitHub Actions only — never on disk)

- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VERCEL_TOKEN`

## Maturity Stage

Prototype → **Pilot** (hub live, 4 artifacts published, CI/CD operational, publishing cadence established)
