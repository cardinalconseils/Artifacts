---
title: ""
slug: ""
type: ""
mode: ""
venture: "cardinal"
language: "EN"
brief_gate_passed: false
workflow_builder_variant: null
---

# Cardinal Conseils — Artifact Brief

> Complete all 7 sections before any content is written. The quality check at the bottom must pass in full. A brief that doesn't pass the gate gets returned for revision — not built.

---

## 1. Identity

**Title:** (specific, passes the swap test — could only be a Cardinal Conseils guide)

**Slug:** (kebab-case, URL-safe, e.g. `ai-readiness-scorecard`)

**Type:** (one of: reading-guide / interactive-tool / implementation-guide / integration-framework / workflow-builder)

**Mode:** (one of: framework / self / client / product)

**Language:** (EN / FR / EN/FR)

---

## 2. The one job

One sentence. What does the visitor have after finishing this that they didn't have before?

> "After completing this [tool/guide], the visitor will be able to [concrete action or decision] — which they could not do before without [X]."

The one job must be falsifiable. "Feel more confident" is not a job. "Know which of their 12 AI initiatives to kill first" is a job.

**One job:**

---

## 3. The visitor

**Who:** (role, context, company stage — be specific. Not "business leader". Try "VP of Operations at a 50–200 person Quebec manufacturer considering their first AI deployment.")

**Starting belief:** (what they believe when they arrive — this is often wrong or incomplete)

**Ending belief:** (what they believe when they leave — Cardinal takes a position, not a neutral summary)

---

## 4. The content

**Core argument:** (the position this artifact takes. Not "AI is important." Something like "Most AI strategies fail because they optimize for outputs, not outcomes — here's how to tell the difference before you build.")

**Sections / structure:**
(List each section with enough detail to write from — not just headings. For each section: what claim it makes, what evidence or example supports it, what the reader does or decides at the end.)

1.
2.
3.
...

**Claims requiring sources:**
(List every outcome claim, statistic, or benchmark. Either provide the source, or flag it: "hypothesis — based on [observable pattern/first principles].")

---

## 5. Interactivity

*(Skip this section if type is reading-guide or integration-framework.)*

**Inputs:** (what the visitor enters — field names, types, validation rules, edge cases)

**Outputs:** (what they receive — format, level of personalization, how it changes based on inputs)

**Empty state:** (what the tool looks like before any input — must not show broken or blank output areas)

**Edge cases:** (what happens with extreme values, missing inputs, or unexpected combinations)

---

## 6. Download

**Download:** yes / no

*(If yes: the downloaded file must be a complete, self-contained HTML file that works offline. Specify the filename.)*

**Filename:** (if yes)

---

## 7. Notes for Claude Code

*(Technical constraints, special data, external references, language quirks, specific formatting requirements. Anything that would surprise the builder.)*

---

## Quality check

All 8 must be true before this brief is built. Check each one:

- [ ] The one job is falsifiable — a real outcome, not an aspiration
- [ ] Starting and ending beliefs are clearly different — a position is taken
- [ ] Every claim is sourced or labeled "hypothesis — based on [basis]"
- [ ] The content section has enough detail to write from — not just topic headings
- [ ] Tool inputs, outputs, and edge cases are defined (tools only)
- [ ] The title passes the swap test — it could only be a Cardinal Conseils artifact
- [ ] No generic aspirational jobs ("feel more confident", "understand AI better")
- [ ] A real position is taken — not just information presented neutrally

**If any box is unchecked, the brief is not ready. Revise before submitting.**
