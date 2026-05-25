---
title: "The Cardinal Publishing Pipeline — A Reference Guide"
slug: "publishing-pipeline-reference"
venture: "cardinal"
mode: "self"
type: "reading-guide"
language: "EN"
tags: ["pipeline", "publishing", "automation"]
summary: "Complete mental model of how Cardinal Conseils artifacts move from raw idea to live published guide using automated Sunday cron or manual Claude Code"
created: "2026-05-25"
brief_gate_passed: true
---

# The Cardinal Publishing Pipeline — A Reference Guide

A complete mental model of how artifacts move from idea to deployment. Designed for team members who want to submit briefs without manual build steps.

## Coverage

- Four deterministic stages: WRITE → BRIEF → BUILD → SHIP
- Manual vs automated delivery modes
- Sunday cron step-by-step process
- Failure modes and recovery patterns

## Key insight

The pipeline is not magic — it's four stages with clear handoffs. Understanding these boundaries prevents the most common failure: submitting briefs before editorial gate completion.

## Usage

Drop a brief in queue/ by Sunday 8am EST. Watch Monday morning PR open with linkage without manual intervention. Recoverable at any point via manual CLI commands.