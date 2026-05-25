---
title: "The Cardinal Publishing Pipeline — A Reference Guide"
slug: "publishing-pipeline-reference"
type: "reading-guide"
mode: "self"
venture: "cardinal"
language: "EN"
brief_gate_passed: true
workflow_builder_variant: null
---

# Cardinal Conseils — Artifact Brief

## 1. Identity

**Title:** The Cardinal Publishing Pipeline — A Reference Guide

**Slug:** publishing-pipeline-reference

**Type:** reading-guide

**Mode:** self

**Language:** EN

---

## 2. The one job

Give the visitor a complete mental model of how Cardinal Conseils artifacts move from raw idea to live published guide — so they can drop a brief in the queue on Sunday and know exactly what happens next.

---

## 3. The visitor

**Who:** A Cardinal Conseils team member who has written a brief in Obsidian and wants to publish it without manual build steps.

**Starting belief:** Publishing an artifact requires opening Claude Code, running the artifact-builder skill, and babysitting the build process.

**Ending belief:** The Sunday cron handles everything — validation, API call, file creation, catalog updates, and PR opening — with a human review step on Monday morning.

---

## 4. The content

**Core argument:** The pipeline is not magic. It is four deterministic stages (WRITE → BRIEF → BUILD → SHIP) with two delivery modes (manual Claude Code vs automated Sunday cron). Understanding the boundaries between stages prevents the most common failure: submitting a brief that has not passed the editorial gate.

**Sections / structure:**

1. **The four stages** — WRITE (Obsidian), BRIEF (editorial gate), BUILD (Claude API or Kimi K2 via OpenRouter), SHIP (PR → merge → Vercel). Each stage's output and handoff criteria.

2. **Delivery modes compared** — Manual (Claude Code, immediate, interactive gate) vs Automated (Sunday cron, batch, frontmatter validation only). When to use each.

3. **What the cron actually does** — Step-by-step: reads queue/, validates frontmatter, detects workflow-builder variants, calls the API with ARTIFACT-BUILD-INSTRUCTIONS.md as system prompt, writes files, updates _index.json + llms.txt + README.md, git mv brief to processed/, opens PR.

4. **Failure modes and recovery** — Invalid frontmatter (job dies, brief stays in queue), API error (retry via manual trigger), malformed JSON response (logged, job fails), bad PR merge (deploy CI validates _index.json before Vercel build).

**Claims requiring sources:**

- "Deploys to Vercel in ~60 seconds after merge" — hypothesis, based on observed Vercel build times for static sites under 50 files.
- "Sunday cron runs at 8am EST" — documented in .github/workflows/process-queue.yml.

---

## 5. Interactivity

Skipped — reading-guide type.

---

## 6. Download

**Download:** no

---

## 7. Notes for Claude Code

- This is a pipeline test brief. Keep the artifact short (under 800 lines of HTML) to validate the end-to-end flow without excessive token consumption.
- Use the standard Cardinal brand system: cream background, Geist font, grain texture, Cardinal Red once per surface.
- No interactive elements needed.
- Include a metadata comment block at the top of index.html.

---

## Quality check

- [x] One job is falsifiable
- [x] Starting and ending beliefs are clearly different
- [x] Every claim sourced or labeled hypothesis
- [x] Content section has detail to write from
- [x] Title passes the swap test
- [x] No generic aspirational jobs
- [x] Real position taken
