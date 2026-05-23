# Phase Context — Publish Next Artifact

| Field | Value |
|-------|-------|
| Phase ID | 01-publish-next-artifact |
| Status | Sprint |
| phase_status | designed |
| Adoption state | Bootstrapped from existing codebase (2026-05-22) |

## Goal

Publish the next Cardinal artifact (framework, guide, or methodology) following the established `cardinal/{mode}/{slug}/` convention.

## Acceptance Criteria

- [ ] `cardinal/{mode}/{slug}/README.md` exists with full artifact content
- [ ] `cardinal/{mode}/{slug}/index.html` exists as interactive HTML version
- [ ] `cardinal/{mode}/{slug}/meta.json` exists with correct schema
- [ ] `_index.json` updated with new artifact entry (valid JSON, matching schema)
- [ ] `llms.txt` updated under correct venture section
- [ ] `README.md` catalog table updated
- [ ] Commit message follows convention: `publish: cardinal/{mode}/{slug} — {Title}`
- [ ] PR created and merged to master
- [ ] Vercel auto-deploy confirms production update

## Established Pattern (from prior artifacts)

```
cardinal/framework/ai-strategy-alignment/
  README.md       ← full artifact content (markdown)
  index.html      ← interactive HTML (BUILD framework structure)
  meta.json       ← artifact metadata
```

`meta.json` schema mirrors `_index.json` entries: title, topic_slug, venture, modes, primary_mode, format, branded, source, created, published_at, version, path, github_url, live_url, tags, summary.

## Notes

Artifact mode and slug TBD — user will specify at sprint start. All infrastructure is in place; this is a content authoring + publishing task.
