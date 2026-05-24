# Cardinal Conseils — Artifact Build Instructions

> This document is the canonical build specification for every artifact in the Cardinal Conseils library. The automated queue processor reads it as its system prompt. Claude Code reads it when building artifacts manually. Every rule here is enforced before a PR opens.

---

## What you are building

An artifact is a standalone HTML file — branded, self-contained, and deployable without a build step. It lives at `cardinal/{mode}/{slug}/index.html` and is served as a static file by Vercel.

Every artifact ships with three files:

```
cardinal/{mode}/{slug}/
├── index.html     ← The artifact — complete, branded, no placeholders
├── README.md      ← Guide summary in markdown with YAML frontmatter
└── meta.json      ← Machine-readable metadata
```

---

## Artifact types

Identify the type from the brief. Build accordingly.

| Type | When to use | Interactivity |
|------|-------------|--------------|
| `reading-guide` | Structured content the visitor reads | None |
| `interactive-tool` | Visitor inputs data, gets personalized output | Inputs → outputs, fully client-side |
| `implementation-guide` | Step-by-step walkthrough | Step progress, expandable steps |
| `integration-framework` | Maps relationships between concepts or tools | Visual-first: tables, diagrams |
| `workflow-builder` | Node-graph editors, visual automation builders | React + React Flow via CDN |

**Workflow-builder auto-detection:** If 2+ of these appear in the brief, use the workflow-builder type automatically: `workflow builder`, `node editor`, `React Flow`, `xyflow`, `drag and drop nodes`, `visual automation`, `Zapier-like`, `n8n-like`, `agent orchestration UI`, `pipeline editor`.

---

## Design system

### Color tokens (CSS variables — use these names exactly)

```css
--cream: #F4EEE2;
--bone: #ECE4D3;
--linen: #E4DAC5;
--ink: #1A1714;
--ink-2: #3B342C;
--ink-3: #6E6356;
--ink-4: #A29684;
--cardinal: #8B1F2A;
--cardinal-2: #6F1822;
--cardinal-wash: #F2DEDF;
--bronze: #A67C52;
--bronze-wash: #EFE4D1;
--rule: rgba(26,23,20,.12);
--rule-strong: rgba(26,23,20,.22);
```

**Cardinal Red rule:** `--cardinal` appears at most once per surface. Use it for one focal element — a primary button, an active state, a key heading. Never use it for body text or decorative elements.

**Background rule:** Always `var(--cream)`. Never `#fff` or `white`.

**No hardcoded hex or RGB values** outside the `:root` block. All colors reference CSS variables.

### Typography

```css
--font-display: "Source Serif 4", Georgia, serif;
--font-body: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, monospace;
```

Load from Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..900;1,8..60,300..900&family=Geist+Mono:wght@300..700&display=swap" rel="stylesheet">
```

Geist body font is served from `/assets/fonts/` (already present in repo):

```css
@font-face {
  font-family: "Geist";
  src: url("/assets/fonts/Geist-VariableFont_wght.ttf") format("truetype-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

**Font rules:**
- Headlines and titles: `var(--font-display)`, weight 400 (regular), italic for emphasis
- Body text: `var(--font-body)`
- Labels, metadata, code, tags, counts: `var(--font-mono)`
- Never use Inter, Roboto, Arial, or system-ui as primary fonts

### Grain texture

Every artifact includes a subtle grain texture overlay:

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/assets/grain.svg');
  opacity: .35;
  pointer-events: none;
  z-index: 0;
}
```

### Spacing

4pt scale only: `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`.

Border radius: `6px` base (`--r`), `12px` large (`--rl`).

Elevation: subtle only — `box-shadow: 0 1px 2px rgba(26,23,20,.04)`.

Max content width: `1120px`.

---

## Artifact anatomy

Every artifact contains these elements in order:

### 1. Metadata comment (top of file)

```html
<!--
  Cardinal Conseils — [Guide Title]
  Type: [reading-guide | interactive-tool | implementation-guide | integration-framework | workflow-builder]
  Slug: [topic-slug]
  Mode: [framework | self | client | product]
  Venture: [cardinal | payfacto | serviconnect | proposai | personal]
  Language: [EN | FR | EN/FR]
  Version: 1
-->
```

### 2. Logo / nav

Top of every artifact:

```html
<header>
  <div class="hdr">
    <a href="/" class="brand">
      <img src="/assets/logo-dark.png" alt="Cardinal Conseils" height="26">
    </a>
    <a href="/" class="nav-back">← Artifacts</a>
  </div>
</header>
```

### 3. Eyebrow + title + lead

```html
<p class="eyebrow">Cardinal Conseils — [venture/mode label]</p>
<h1>[Title — may use <em> for italic emphasis]</em></h1>
<p class="lede">[One sentence: what the reader has after finishing that they didn't before.]</p>
```

Eyebrow: `font-family: var(--font-mono)`, `font-size: 11px`, `letter-spacing: .12em`, `text-transform: uppercase`, `color: var(--ink-3)`.

### 4. Body content

Varies by type. See type-specific rules below.

### 5. Footer

```html
<footer>
  <div class="foot">
    <span>Cardinal Conseils</span>
    <span class="foot-url">guides.cardinalconseils.com</span>
  </div>
</footer>
```

---

## Type-specific build rules

### Reading guide

- Clean editorial layout: wide measure (max 680px), generous line height (1.7)
- Section headers in Source Serif 4
- Optional download button (see Download section)
- No inputs, no state management

### Interactive tool

Design three states explicitly:

1. **Empty state** — clear prompt, no blank outputs visible
2. **In-progress state** — feedback while calculating
3. **Result state** — output formatted for scanning, not reading

All logic client-side. No API calls unless the brief explicitly requires them and the user acknowledged this upfront.

### Implementation guide

- Step list with progress indicator
- Each step: expandable or sequential
- Step completion persists in `localStorage` (optional but preferred for longer guides)
- No branching unless the brief specifies it

### Integration framework

- Visual-first: use tables, definition lists, or CSS grid for relationship maps
- Prose is secondary to structure
- Consider a legend if symbols are used

### Workflow builder

Uses React + React Flow loaded via CDN:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@xyflow/react@12/dist/umd/index.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@xyflow/react@12/dist/style.css">
```

Three variants — select based on brief content:

| Variant | `workflow_builder_variant` value | Use when |
|---------|----------------------------------|----------|
| Generic SaaS editor | `generic` | General workflow automation |
| AI agent orchestration | `ai-agent` | LLM steps, tool calls, RAG nodes, human approval gates |
| PayFacto / Veloce onboarding | `payfacto-veloce` | Restaurant POS, Maître'D, payment terminals |

Record the variant in `meta.json`.

---

## Download button

When the brief specifies `download: yes`, include a download button that generates a complete, self-contained HTML file:

```js
function downloadArtifact() {
  const html = document.documentElement.outerHTML;
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '[slug].html';
  a.click();
}
```

The downloaded file must work fully offline — inline all critical CSS, use CDN fonts that degrade gracefully.

---

## Voice and copy rules

**Tone:** Direct, calm, advisor. Reads like *The Economist*, not a SaaS landing page.

**Rules:**
- No exclamation marks
- No emoji in UI labels or headings
- Prose over bullet lists — Cardinal Conseils reads like an advisor, not a feature sheet
- Every outcome claim (%, time saved, cost reduced) has a source or is labeled: `hypothesis — based on [basis]`
- Active voice throughout
- Quebec French conventions when writing in French — keep English business terms that are more natural as-is (ROI, MVP, fit, pricing)

**Banned words (EN):** revolutionize, transform, disrupt, unlock, unleash, supercharge, leverage (as a verb), synergize, game-changer, paradigm shift, next-gen, cutting-edge, best-in-class, empower, "in today's world", "now more than ever"

**Banned patterns:**
- "Great, I'll build that for you!" openers
- Multiple design options to choose from — one complete, correct artifact
- Placeholder content ("Lorem ipsum", "[Insert content here]")
- "How to use" sections — the artifact must explain itself

---

## meta.json schema

```json
{
  "title": "...",
  "topic_slug": "...",
  "venture": "cardinal",
  "modes": ["framework"],
  "primary_mode": "framework",
  "format": ["md", "interactive-html"],
  "branded": true,
  "source": "internal",
  "created": "YYYY-MM-DD",
  "published_at": "YYYY-MM-DDT00:00:00Z",
  "version": 1,
  "versions": [],
  "path": "cardinal/{mode}/{slug}",
  "github_url": "https://github.com/cardinalconseils/Artifacts/tree/master/cardinal/{mode}/{slug}",
  "live_url": null,
  "tags": [],
  "summary": "...",
  "workflow_builder_variant": null
}
```

`workflow_builder_variant` is `null` for all non-workflow-builder types. For workflow builders, set to `"generic"`, `"ai-agent"`, or `"payfacto-veloce"`.

---

## README.md frontmatter schema

```yaml
---
title: "..."
slug: "..."
venture: "cardinal"
mode: "framework"
type: "reading-guide"
language: "EN"
tags: []
summary: "..."
created: "YYYY-MM-DD"
brief_gate_passed: true
---
```

---

## _index.json entry schema

When adding to the catalog, add an entry matching this exact shape:

```json
{
  "title": "...",
  "topic_slug": "...",
  "venture": "cardinal",
  "modes": ["framework"],
  "primary_mode": "framework",
  "format": ["md", "interactive-html"],
  "branded": true,
  "source": "internal",
  "created": "YYYY-MM-DD",
  "published_at": "YYYY-MM-DDT00:00:00Z",
  "version": 1,
  "path": "cardinal/{mode}/{slug}",
  "github_url": "https://github.com/cardinalconseils/Artifacts/tree/master/cardinal/{mode}/{slug}",
  "live_url": null,
  "tags": [],
  "summary": "..."
}
```

---

## Validation checklist

Run before every commit. All must pass.

- [ ] Metadata comment block present at top of `index.html`
- [ ] `meta.json` complete — all fields present, no nulls except `live_url` and `workflow_builder_variant`
- [ ] Logo/nav present: Cardinal Conseils logo linking to `/`, back link to `/`
- [ ] No hardcoded hex or RGB outside `:root` — all colors use CSS variables
- [ ] Source Serif 4 loaded from Google Fonts; Geist loaded from `/assets/fonts/`
- [ ] Geist Mono loaded from Google Fonts
- [ ] Cardinal Red (`--cardinal`) used at most once per surface
- [ ] Background is `var(--cream)`, never `#fff` or `white`
- [ ] Grain texture overlay present (`body::before` with `/assets/grain.svg`)
- [ ] All states designed: empty, in-progress, result (interactive tools only)
- [ ] No placeholder content anywhere
- [ ] Download button works and produces a complete HTML file (if `download: yes`)
- [ ] Mobile layout: single column below 768px, comfortable touch targets
- [ ] Every outcome claim sourced or flagged as hypothesis
- [ ] Voice scan: no banned words, no exclamation marks, no emoji in labels
- [ ] Artifact explains itself — no "how to use" section needed
- [ ] Footer present: "Cardinal Conseils" + "guides.cardinalconseils.com"
- [ ] `_index.json` passes `python3 -m json.tool _index.json`
- [ ] `llms.txt` entry added under correct venture section
- [ ] Root `README.md` catalog table updated
