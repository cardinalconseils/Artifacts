---
title: Agent Self-Learning — Skill Creation Architecture
modes: [self]
primary_mode: self
venture: cardinal
topic: agent-skill-learning
source: internal
format: [md, interactive-html]
branded: true
published: true
github_url: https://github.com/cardinalconseils/Artifacts/tree/master/cardinal/self/agent-skill-learning
live_url: null
created: 2026-05-23
tags: [self, cardinal, agents, skill-creation, self-learning, quarantine, gatekeeper, hermes, claude-code, memory]
status: published
---

# Agent Self-Learning — Skill Creation Architecture

## Overview

Four-layer architecture for controlled AI agent self-improvement. Most implementations only build two of the four layers — and that's where skill drift and garbage accumulation begin.

## The Four Layers

1. **Config & routing** (Deterministic) — YAML rules and routing logic. Same input → same decision. Your control surface.
2. **LLM reasoning** (Probabilistic) — Constrain the input; accept that output varies. Don't try to fix this layer with prompts.
3. **Memory & context** — Short-term, long-term, and skill memory. Where learning actually lives. Requires active curation.
4. **Skill creation & improvement** — New procedures written, tested, Gatekeeper-approved, and added to the library. Quarantine before validation — no exceptions.

## Three Learning Paths

- **Curriculum ingestion** — Feed vetted sources; agent derives skills from what you control
- **Feedback correction** — Reviewer catches mistakes; fixes get encoded as skill rules
- **Post-task reflection** — Novel task completed; agent extracts the procedure before moving on

## Guardrails

Six gates prevent skill drift: format check, conflict check, scope check, source check, human review for new domains, and version-controlled rollback.

## Platform Comparison

Hermes v2 vs Claude Code: same architecture, different execution. Both wire to the same Supabase skills table and Brain MCP for a shared learning corpus across two execution modes.
