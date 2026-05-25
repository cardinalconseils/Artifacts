#!/usr/bin/env node
/**
 * Cardinal Conseils — Artifact Queue Processor
 *
 * Called by GitHub Actions every Sunday at 8am EST, and on manual workflow_dispatch.
 * For each .md brief in queue/ (excluding README.md and BRIEF-TEMPLATE.md):
 *   1. Validates required frontmatter fields
 *   2. Calls Kimi K2 via OpenRouter with ARTIFACT-BUILD-INSTRUCTIONS.md as system prompt
 *   3. Creates cardinal/{mode}/{slug}/ with index.html, README.md, meta.json
 *   4. Updates _index.json, llms.txt, root README.md
 *   5. Moves brief to queue/processed/
 *   6. Opens a PR: artifact/{slug} → master
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const ROOT = process.cwd();
const QUEUE_DIR = path.join(ROOT, 'queue');
const PROCESSED_DIR = path.join(QUEUE_DIR, 'processed');
const BUILD_INSTRUCTIONS = path.join(ROOT, 'ARTIFACT-BUILD-INSTRUCTIONS.md');
const INDEX_JSON = path.join(ROOT, '_index.json');
const LLMS_TXT = path.join(ROOT, 'llms.txt');
const README_MD = path.join(ROOT, 'README.md');

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: { 'HTTP-Referer': 'https://guides.cardinalconseils.com' },
});

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatter = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      const value = rest.join(':').trim().replace(/^"(.*)"$/, '$1');
      frontmatter[key.trim()] = value === 'true' ? true : value === 'false' ? false : value === 'null' ? null : value;
    }
  }
  return { frontmatter, body: content.slice(match[0].length).trim() };
}

function validateBrief(frontmatter, slug) {
  const required = ['title', 'slug', 'type', 'mode', 'venture', 'language'];
  const missing = required.filter(k => !frontmatter[k]);
  if (missing.length) throw new Error(`Brief ${slug}: missing frontmatter fields: ${missing.join(', ')}`);

  const validTypes = ['reading-guide', 'interactive-tool', 'implementation-guide', 'integration-framework', 'workflow-builder'];
  if (!validTypes.includes(frontmatter.type)) throw new Error(`Brief ${slug}: invalid type "${frontmatter.type}"`);

  const validModes = ['framework', 'self', 'client', 'product'];
  if (!validModes.includes(frontmatter.mode)) throw new Error(`Brief ${slug}: invalid mode "${frontmatter.mode}"`);

  // Validate slug is safe for filesystem and git branch names
  if (!/^[a-z0-9-]+$/.test(frontmatter.slug || slug)) {
    throw new Error(`Brief ${slug}: slug must be lowercase alphanumeric and hyphens only`);
  }
}

function detectWorkflowBuilderVariant(briefContent, frontmatter) {
  if (frontmatter.workflow_builder_variant) return frontmatter.workflow_builder_variant;

  const keywords = ['workflow builder', 'node editor', 'react flow', 'xyflow', 'drag and drop nodes',
    'visual automation', 'zapier-like', 'n8n-like', 'agent orchestration ui', 'pipeline editor'];
  const lower = briefContent.toLowerCase();
  const matches = keywords.filter(k => lower.includes(k));

  if (matches.length >= 2 || frontmatter.type === 'workflow-builder') {
    if (lower.includes('payfacto') || lower.includes('veloce') || lower.includes('maitre')) {
      return 'payfacto-veloce';
    }
    if (lower.includes('ai agent') || lower.includes('llm') || lower.includes('rag') || lower.includes('tool call')) {
      return 'ai-agent';
    }
    return 'generic';
  }
  return null;
}

async function buildArtifact(briefContent, frontmatter, systemPrompt) {
  const today = new Date().toISOString().split('T')[0];
  const variantNote = frontmatter.workflow_builder_variant
    ? `\n\nThis is a workflow-builder artifact. Use the "${frontmatter.workflow_builder_variant}" variant.`
    : '';

  const userMessage = `Build a complete Cardinal Conseils artifact from this brief.

Return a JSON object with exactly these keys:
- "index_html": the complete index.html file content (string)
- "readme_md": the complete README.md file content with YAML frontmatter (string)
- "meta": the complete meta.json object

Brief:
---
${briefContent}
---

Today's date: ${today}${variantNote}

Return only valid JSON. No explanation, no markdown fences around the JSON.`;

  const response = await client.chat.completions.create({
    model: 'moonshotai/kimi-k2',
    max_tokens: 16000,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
  });

  const text = response.choices[0].message.content.trim();
  const jsonText = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(jsonText);
}

function updateIndexJson(metaEntry) {
  const index = JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8'));
  const existing = index.findIndex(e => e.topic_slug === metaEntry.topic_slug);
  if (existing >= 0) {
    index[existing] = metaEntry;
  } else {
    index.push(metaEntry);
  }
  fs.writeFileSync(INDEX_JSON, JSON.stringify(index, null, 2) + '\n');
}

function updateLlmsTxt(meta) {
  let content = fs.readFileSync(LLMS_TXT, 'utf8');
  const entry = `\n### ${meta.path}\nTitle: ${meta.title}\nSummary: ${meta.summary}\nTags: ${meta.tags.join(', ')}\nGitHub: ${meta.github_url}\n`;

  if (content.includes(`### ${meta.path}`)) {
    const slugPattern = new RegExp(`\\n### ${escapeRegex(meta.path)}\\n[\\s\\S]*?(?=\\n### |$)`, 'g');
    content = content.replace(slugPattern, entry);
  } else {
    content += entry;
  }

  fs.writeFileSync(LLMS_TXT, content);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateRootReadme(meta) {
  let content = fs.readFileSync(README_MD, 'utf8');
  if (!content.includes(meta.topic_slug)) {
    const row = `| [${meta.title}](${meta.github_url}) | ${meta.primary_mode} | ${meta.summary.slice(0, 80)}... |\n`;
    const tableEnd = content.lastIndexOf('|---');
    if (tableEnd > -1) {
      const nextNewline = content.indexOf('\n', tableEnd + 3);
      content = content.slice(0, nextNewline + 1) + row + content.slice(nextNewline + 1);
    } else {
      content += `\n${row}`;
    }
    fs.writeFileSync(README_MD, content);
  }
}

function git(...args) {
  execFileSync('git', args, { stdio: 'inherit', cwd: ROOT });
}

function gh(...args) {
  execFileSync('gh', args, { stdio: 'inherit', cwd: ROOT });
}

async function processBrief(briefFile) {
  const slug = path.basename(briefFile, '.md');
  console.log(`\n── Processing: ${slug}`);

  const briefContent = fs.readFileSync(briefFile, 'utf8');
  const { frontmatter } = parseFrontmatter(briefContent);

  validateBrief(frontmatter, slug);

  frontmatter.workflow_builder_variant = detectWorkflowBuilderVariant(briefContent, frontmatter);
  if (frontmatter.workflow_builder_variant && frontmatter.type !== 'workflow-builder') {
    frontmatter.type = 'workflow-builder';
    console.log(`  Auto-detected workflow-builder, variant: ${frontmatter.workflow_builder_variant}`);
  }

  const systemPrompt = fs.readFileSync(BUILD_INSTRUCTIONS, 'utf8');
  const today = new Date().toISOString().split('T')[0];

  console.log('  Calling Claude API...');
  const result = await buildArtifact(briefContent, frontmatter, systemPrompt);

  if (!result.index_html || !result.readme_md || !result.meta) {
    throw new Error(`Claude response missing required keys for ${slug}`);
  }

  const canonicalSlug = frontmatter.slug || slug;
  const venture = frontmatter.venture || 'cardinal';
  const artifactPath = `${venture}/${frontmatter.mode}/${canonicalSlug}`;

  const meta = {
    ...result.meta,
    title: frontmatter.title,
    topic_slug: canonicalSlug,
    venture,
    modes: [frontmatter.mode],
    primary_mode: frontmatter.mode,
    format: ['md', 'interactive-html'],
    branded: true,
    source: 'internal',
    created: today,
    published_at: `${today}T00:00:00Z`,
    version: 1,
    path: artifactPath,
    github_url: `https://github.com/cardinalconseils/Artifacts/tree/master/${artifactPath}`,
    live_url: null,
    tags: result.meta.tags || [],
    summary: result.meta.summary || '',
  };

  if (frontmatter.workflow_builder_variant) {
    meta.workflow_builder_variant = frontmatter.workflow_builder_variant;
  }

  const artifactDir = path.join(ROOT, artifactPath);
  fs.mkdirSync(artifactDir, { recursive: true });

  fs.writeFileSync(path.join(artifactDir, 'index.html'), result.index_html);
  fs.writeFileSync(path.join(artifactDir, 'README.md'), result.readme_md);
  fs.writeFileSync(path.join(artifactDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
  fs.writeFileSync(path.join(artifactDir, 'brief.md'), briefContent);

  console.log(`  Created: ${artifactPath}/`);

  updateIndexJson(meta);
  updateLlmsTxt(meta);
  updateRootReadme(meta);

  try {
    JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8'));
  } catch {
    throw new Error('_index.json is invalid JSON after update — aborting');
  }

  fs.renameSync(briefFile, path.join(PROCESSED_DIR, path.basename(briefFile)));

  const branch = `artifact/${canonicalSlug}`;

  git('config', 'user.name', 'Cardinal Artifacts Bot');
  git('config', 'user.email', 'artifacts@cardinalconseils.com');
  git('checkout', '-b', branch);
  git('add', artifactPath + '/');
  git('add', '_index.json', 'llms.txt', 'README.md');
  git('add', `queue/processed/${path.basename(briefFile)}`);

  // Remove from queue staging (ignore errors if not staged)
  try {
    git('rm', '--cached', `queue/${path.basename(briefFile)}`);
  } catch { /* brief may not have been staged */ }

  git('commit', '-m', `publish: ${artifactPath} — ${meta.title}`);
  git('push', 'origin', branch);

  const prBody = `## ${meta.title}

**Type:** ${frontmatter.type}
**Mode:** ${meta.primary_mode}
**Venture:** meta.venture

${meta.summary}

---

Review checklist:
- [ ] Logo present and correct
- [ ] Title matches brief
- [ ] No placeholder content
- [ ] Cardinal Red used sparingly
- [ ] Source Serif 4 headlines, Geist body
- [ ] No banned words, no exclamation marks
- [ ] Tool states: empty, in-progress, result (if interactive)
- [ ] Mobile layout holds
- [ ] Download works (if applicable)

Approve → merge → ships in ~60 seconds.`;

  gh('pr', 'create', '--title', `publish: ${meta.title}`, '--body', prBody, '--base', 'master', '--head', branch);

  console.log(`  PR opened: ${branch} → master`);

  git('checkout', 'master');
}

async function main() {
  console.log('Cardinal Conseils — Artifact Queue Processor');
  console.log(`Root: ${ROOT}`);

  if (!process.env.OPENROUTER_API_KEY) {
    console.error('ERROR: OPENROUTER_API_KEY not set');
    process.exit(1);
  }

  const files = fs.readdirSync(QUEUE_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md' && f !== 'BRIEF-TEMPLATE.md')
    .map(f => path.join(QUEUE_DIR, f));

  if (files.length === 0) {
    console.log('No briefs in queue. Done.');
    return;
  }

  console.log(`Found ${files.length} brief(s): ${files.map(f => path.basename(f)).join(', ')}`);

  const results = { success: [], failed: [] };

  for (const file of files) {
    try {
      await processBrief(file);
      results.success.push(path.basename(file, '.md'));
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      results.failed.push(path.basename(file, '.md'));
    }
  }

  console.log('\n── Summary ──');
  if (results.success.length) console.log(`Processed: ${results.success.join(', ')}`);
  if (results.failed.length) {
    console.log(`Failed: ${results.failed.join(', ')}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
