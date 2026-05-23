# Design — Publish Next Artifact

## Adoption Note

This phase was created during bootstrap adoption (2026-05-22). The publishing pattern is already established and proven across 4 prior artifacts. No new design decisions are needed for the workflow itself.

## Artifact Structure (established)

```
cardinal/{mode}/{slug}/
  README.md       ← Markdown source (primary content)
  index.html      ← Interactive HTML (self-contained, no external dependencies)
  meta.json       ← Metadata matching _index.json schema
```

## index.html Conventions (from existing artifacts)

- Self-contained single file — all CSS and JS inline
- No external CDN dependencies
- BUILD framework structure: Brief, Unpack, Install, Layer, Deploy
- Cardinal brand colors and typography (matches hub palette)
- Interactive elements (tabs, toggles, canvas inputs) where appropriate
- Mobile-responsive

## _index.json Schema

```json
{
  "title": "string",
  "topic_slug": "string (kebab-case)",
  "venture": "cardinal",
  "modes": ["framework|self|guide|product"],
  "primary_mode": "string",
  "format": ["md", "interactive-html"],
  "branded": true,
  "source": "internal",
  "created": "YYYY-MM-DD",
  "published_at": "YYYY-MM-DDT00:00:00Z",
  "version": 1,
  "path": "cardinal/{mode}/{slug}",
  "github_url": "https://github.com/cardinalconseils/Artifacts/tree/master/cardinal/{mode}/{slug}",
  "live_url": null,
  "tags": ["array", "of", "strings"],
  "summary": "string (1-3 sentences)"
}
```

## Open Questions at Sprint Start

1. What is the artifact title and slug?
2. Which mode: `framework`, `self`, `guide`, or `product`?
3. Is source content already drafted, or does the session include authoring?
