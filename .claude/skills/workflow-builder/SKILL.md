---
name: workflow-builder
description: React Flow workflow builder template — 3 variants (generic, ai-agent, payfacto-veloce). Used by artifact-builder skill when type is workflow-builder.
---

# Workflow Builder Template

This skill provides the React Flow CDN template and variant-specific node types for workflow-builder artifacts. It is called from `artifact-builder` — do not trigger it directly.

## CDN setup (required in every workflow-builder artifact)

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<script src="https://unpkg.com/@xyflow/react@12/dist/umd/index.js" crossorigin></script>
<link rel="stylesheet" href="https://unpkg.com/@xyflow/react@12/dist/style.css">
```

All React code goes in a `<script type="text/babel">` block with Babel standalone:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel" data-presets="react">
  const { useState, useCallback } = React;
  const { ReactFlow, addEdge, useNodesState, useEdgesState, Controls, MiniMap, Background } = ReactFlowLib;
  // ... component code
</script>
```

## Variant: `generic`

General-purpose workflow automation builder.

**Node types:**
- `trigger` — entry point (rounded rectangle, --bronze border)
- `action` — step/task node (rectangle, --ink-3 border)
- `condition` — decision node (diamond shape, --cardinal border)
- `output` — result/endpoint (rounded rectangle, --cardinal-wash background)

**Default nodes:**
```js
const initialNodes = [
  { id: '1', type: 'trigger', position: { x: 50, y: 100 }, data: { label: 'Trigger', description: 'Start condition' } },
  { id: '2', type: 'action', position: { x: 300, y: 100 }, data: { label: 'Action', description: 'Step to execute' } },
  { id: '3', type: 'output', position: { x: 550, y: 100 }, data: { label: 'Output', description: 'Result' } },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];
```

**Sidebar:** Node palette with drag-to-canvas. Node types listed with descriptions. Populated from the brief's specific workflow steps.

**Canvas controls:** React Flow built-in Controls + MiniMap. Background pattern: dots (`--linen` color).

**Export button:** Downloads the workflow as JSON (node/edge state).

## Variant: `ai-agent`

LLM and agent orchestration builder.

**Node types:**
- `user-input` — human message entry (--cream background, --bronze border)
- `llm-call` — Claude/GPT/model call (--cardinal-wash background, --cardinal border, model selector)
- `tool-call` — external tool/API call (--bone background, rounded)
- `rag-retrieval` — vector search / knowledge retrieval (--bronze-wash background)
- `human-approval` — human-in-the-loop gate (--cardinal background, white text, warning icon)
- `output` — final response (--linen background)

**Default nodes:**
```js
const initialNodes = [
  { id: '1', type: 'user-input', position: { x: 50, y: 150 }, data: { label: 'User Message' } },
  { id: '2', type: 'rag-retrieval', position: { x: 300, y: 80 }, data: { label: 'Context Retrieval', description: 'Search knowledge base' } },
  { id: '3', type: 'llm-call', position: { x: 300, y: 220 }, data: { label: 'Claude API', model: 'claude-sonnet-4-6', systemPrompt: '' } },
  { id: '4', type: 'human-approval', position: { x: 550, y: 150 }, data: { label: 'Human Review', description: 'Approve before sending' } },
  { id: '5', type: 'output', position: { x: 800, y: 150 }, data: { label: 'Response' } },
];
```

**Node detail panel:** Click a node → right panel shows editable fields (model selector for llm-call, system prompt textarea, tool name/endpoint for tool-call).

**Flow indicators:** Animate edges from llm-call nodes. Show token count estimate on llm-call nodes (static, based on model).

## Variant: `payfacto-veloce`

Restaurant POS onboarding and payment terminal configuration.

**Node types:**
- `restaurant` — restaurant profile setup (--cream background, fork/knife icon)
- `pos-config` — Maître'D / Veloce POS configuration step (--bronze-wash background)
- `terminal` — payment terminal provisioning (--cardinal-wash background)
- `menu` — menu import / configuration (--linen background)
- `staff` — staff and permissions setup (--bone background)
- `go-live` — launch checkpoint (--cardinal background, white text, checkmark icon)

**Default nodes** map to the standard Veloce onboarding sequence:
1. Restaurant profile
2. POS software install
3. Menu configuration
4. Terminal provisioning
5. Staff setup
6. Test transaction
7. Go-live

**Progress tracker:** Top bar shows onboarding completion % as nodes are marked complete. Nodes have a "Mark complete" toggle.

**Export:** Generates a printable onboarding checklist PDF (using `window.print()` with print-specific CSS).

---

## Shared UX rules (all variants)

- **Empty canvas state:** Show a "Drag nodes from the sidebar to start" placeholder — never an empty white area
- **Selected node:** 2px `--cardinal` outline, detail panel opens on the right
- **Node labels:** `var(--font-body)`, 14px. Descriptions in `var(--font-mono)`, 11px, `--ink-3`
- **Edge style:** `strokeWidth: 2`, `stroke: var(--ink-4)`. Animated edges: `stroke: var(--cardinal)`
- **Zoom:** `minZoom: 0.3`, `maxZoom: 2`
- **Snap to grid:** 16px grid

## CSS integration with Cardinal brand

```css
.react-flow__node {
  font-family: var(--font-body);
  border-radius: var(--r);
}
.react-flow__edge-path {
  stroke: var(--ink-4);
  stroke-width: 2;
}
.react-flow__controls {
  background: var(--bone);
  border: 1px solid var(--rule-strong);
  border-radius: var(--r);
}
.react-flow__minimap {
  background: var(--bone);
  border: 1px solid var(--rule);
}
```

## meta.json additions for workflow-builder

```json
{
  "workflow_builder_variant": "generic",
  "format": ["md", "interactive-html", "workflow-builder"]
}
```
