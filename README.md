# Cardinal Conseils — Artifacts

Deployable frameworks, guides, and methodologies from Cardinal Conseils. Each artifact is structured using the BUILD framework and served via Vercel.

The live site root (`/`) is the **Artifact Hub** — a browsable, searchable catalog generated from [`_index.json`](./_index.json). Adding an artifact to that index automatically surfaces it in the hub.

## Catalog

### Cardinal — Framework

| Guide | Summary | Formats |
|-------|---------|--------|
| [The AI–Strategy Alignment Framework](./cardinal/framework/ai-strategy-alignment/) | Link every AI initiative to corporate strategy — the five AI roles, OKRs + Scrum, and the Define→Build→Measure→Adapt loop, plus an interactive Alignment Canvas that scores any project on strategic, operational, and financial value. | MD · HTML |
| [The Five H Framework](./cardinal/framework/five-h-framework/) | Human · Horizon · Habits · Handoff · Harvest — a leadership philosophy for real AI adoption, delivered as a 90-day single-leader coaching engagement. | MD · HTML |
| [Implementation Guide Builder](./cardinal/framework/implementation-guide-builder/) | The BUILD framework for turning any input into a deployable, sellable, teachable guide in one Claude Code session. | MD · HTML |

### Cardinal — Self

| Guide | Summary | Formats |
|-------|---------|--------|
| [The Cardinal Publishing Pipeline — A Reference Guide](https://github.com/cardinalconseils/Artifacts/tree/master/cardinal/self/publishing-pipeline-reference) | self | Complete mental model of how Cardinal Conseils artifacts move from raw idea to l... |
| [MANTIS — Web Tracker Audit Workflow](./cardinal/self/mantis-tracker-audit/) | SCAN → CLASSIFY → TRACE → DECIDE — a 30-minute workflow producing a complete third-party tracker inventory with privacy risk scoring and Loi 25 / GDPR exposure findings. | MD · HTML |
| [Agent Self-Learning — Skill Creation Architecture](./cardinal/self/agent-skill-learning/) | Four-layer architecture for controlled agent self-improvement: deterministic routing, probabilistic reasoning, memory curation, and quarantine-gated skill creation. | MD · HTML |

---

## Pipeline

Artifacts are built via two paths:

- **Manual (Claude Code):** paste content in a session → Cardinal Brief gate → build → PR. Uses the `artifact-builder` skill.
- **Automated (Sunday batch):** drop a completed brief in `queue/` → GitHub Actions cron calls Claude API every Sunday at 8am EST → artifact files created → PR opened.

See [ARTIFACT-PIPELINE.md](./ARTIFACT-PIPELINE.md) for the full workflow, editorial gate, and review checklist.

---

*Browsable hub: [/](./index.html)*  
*Machine-readable catalog: [_index.json](./_index.json)*  
*AI agent index: [llms.txt](./llms.txt)*  
*Deployed via Vercel on push to master.*
