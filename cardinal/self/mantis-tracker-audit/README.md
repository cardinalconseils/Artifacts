---
title: MANTIS — Web Tracker Audit Workflow
modes: [self]
primary_mode: self
venture: cardinal
topic: mantis-tracker-audit
source: internal
format: [md, interactive-html]
branded: true
published: true
github_url: https://github.com/cardinalconseils/Artifacts/tree/master/cardinal/self/mantis-tracker-audit
live_url: null
created: 2026-05-21
tags: [implementation-guide, self, privacy, security, tracker-audit, loi25, ciso, web-audit]
status: published
---

# MANTIS — Web Tracker Audit Workflow

## 1. The Promise

After running this workflow, you'll have a complete, documented third-party tracker inventory for any target website — vendors identified, execution flows mapped, privacy risk scored, and a findings file you can act on or hand to a client. You'll know exactly what fires, what it calls downstream, and whether it creates a Loi 25 / PIPEDA / GDPR exposure.

**Total time per site: under 30 minutes from cold start.**

---

## 2. The Core Framework — SCAN → CLASSIFY → TRACE → DECIDE

**SCAN** — Record live browser traffic on the target page.  
**CLASSIFY** — Let MANTIS cross-reference every request against the DuckDuckGo Tracker Radar dataset for vendor, product, role, and legal classification.  
**TRACE** — Follow execution flows upstream (who loaded it?) and downstream (what does it call next?).  
**DECIDE** — For each vendor: Keep / Flag / Remove / Consent-gate. Don't leave the session without a decision per tracker.

---

## 3. Who This Is For / Who It's Not For

**This workflow applies when:**
- You need to audit a website's tracker footprint for Loi 25, PIPEDA, or GDPR compliance
- A client asks you to validate their consent management setup
- You're doing a Personal CISO web-layer audit on a Cardinal Conseils or PayFacto property
- You want to know what marketing stack a competitor is running

**This workflow does NOT apply when:**
- You need a full server-side or API security audit (use a different methodology)
- The target site requires authentication to reach key flows (MANTIS sees what the browser sees)
- You need to audit mobile apps or native clients (browser-only tool)

---

## 4. The Implementation Path

### Step 1 — Install MANTIS and Prep the Target

**What you do:** Install the MANTIS browser extension (Chrome). Open the target website in a clean browser profile — no cookies, no extensions interfering. MANTIS works via a recording session: it intercepts network requests live as the page loads and as you interact.

**What you produce:** An empty MANTIS session ready to record.  
**How long:** 5 minutes (first install); 2 minutes per subsequent audit.

> **Clean profile matters.** If you run MANTIS in your daily browser, your existing cookies/sessions distort what gets fired — consent banners may not appear, tracker consent states may be cached. Use a fresh Chrome profile or Guest mode. What you don't see in your session, a real visitor will still experience.

---

### Step 2 — Load the Target and Record

**What you do:** Open MANTIS, enter the target URL as the active tab. Click **Recording** to start the session. Let the page fully load — don't click anything yet. Watch the total request counter climb. After initial load stabilizes, interact with key flows: accept/decline the cookie banner, navigate to 2–3 key pages, trigger any cart/signup/contact action if relevant.

**What you produce:** A session with N total requests captured.  
**How long:** 5–10 minutes of recording per site.

> **Record at least two states:** (1) before any consent interaction, (2) after explicit consent accept. This shows what fires without consent — the legally critical window under Loi 25 and GDPR.

---

### Step 3 — Navigate the Vendor Graph

**What you do:** In the MANTIS graph view:

- **Left anchor** = the target page (First Party)
- **Middle clusters** = vendor groups (Unclassified, First Party, Vendors)
- **Right nodes** = specific tracker endpoints

Click each vendor cluster to expand. For each one:
- Check **Classification** (Tracker Radar category — tag_manager, analytics, advertising, etc.)
- Check **Privacy Risk** badge (Low / Medium / High)
- Check **Execution Flow** — how many downstream requests it initiates and how many total endpoints it touches
- Use the **Upstream / Downstream** toggle to trace the call chain

**What you produce:** A mental (or written) map of the full tracker ecosystem.  
**How long:** 10–15 minutes.

---

### Step 4 — Export and Document Findings

**What you do:** Use the **Export** button to pull the full request log. Paste into the findings file template (Section 7). Categorize each vendor by: role, risk, consent status, and recommended action.

**What you produce:** A completed `tracker-audit-[domain]-[date].md` findings file.  
**How long:** 5–10 minutes.

---

### Step 5 — Apply DECIDE Logic

**What you do:** For each vendor in your findings file, make one of four decisions:

| Decision | When | Action |
|----------|------|--------|
| **Keep** | Core functionality, low risk, consent-gated | Document and move on |
| **Flag** | High downstream requests, unclear legal basis | Flag for legal/DPO review |
| **Remove** | No consent, no legitimate interest, high risk | Tag for GTM/developer removal |
| **Consent-gate** | Useful but needs explicit consent before firing | Ensure CMP blocks it pre-consent |

**What you produce:** A DECIDE column in your findings file. The site owner or developer gets a clear action list.  
**How long:** 5 minutes once the data is in front of you.

---

## 5. The Tools & Stack

| Tool | Purpose | Cost |
|------|---------|------|
| **MANTIS** | Live request interception + vendor classification | Free (Chrome extension) |
| **DuckDuckGo Tracker Radar** | Classification database underlying MANTIS | Free (open dataset) |
| **OneTrust / CMP** | Consent management on the target site | Varies — usually already in place |
| **Google Tag Manager** | Most common vector for tracker injection — check this first | Free |
| **Chrome Guest Profile** | Clean recording environment | Free (built-in) |

> MANTIS uses DuckDuckGo's Tracker Radar as its classification backend — the same dataset that powers the DDG browser. It classifies vendors by: vendor name, product, role, legal category, and confidence score. **95%+ confidence = treat as confirmed.**

---

## 6. MANTIS Reading Cheat Sheet

```
GRAPH VIEW LEGEND
──────────────────────────────────────────────────────
Left node         Target page (First Party anchor)
Middle clusters   Vendor groups:
  Unclassified      Unknown / not in Tracker Radar DB
  First Party       Same-domain requests
  Vendors           Confirmed third parties
Right nodes       Specific tracker endpoints (products)

DETAIL PANEL  (click any node)
──────────────────────────────────────────────────────
Privacy Risk      LOW / MEDIUM / HIGH
                  Based on signal types detected in session

Classification    Tracker Radar category badge:
  tag_manager       Loads other trackers (GTM, etc.)
  analytics         Behavioral / session tracking
  advertising       Ad networks, retargeting, pixels
  functionality_pref  UX tools, consent widgets, chat

Confidence        % match to Tracker Radar DB
                  95%+ = treat as confirmed

Execution Flow
  Initiates N downstream   How many requests this vendor triggers
  Total endpoints N        Total touch points in its full chain

CONTROLS
──────────────────────────────────────────────────────
Upstream     Show what loaded this vendor
Downstream   Show what this vendor loads next
Filter       Isolate by vendor or classification
Export       Full request log as CSV / JSON
```

---

## 7. Templates & Scripts

### Findings File Template

```markdown
# Tracker Audit — [domain] — [YYYY-MM-DD]

**Auditor:** PMC  
**Method:** MANTIS live recording  
**Total Requests Captured:** [N]  
**Recording States:** Pre-consent / Post-consent

---

## Vendor Inventory

| Vendor | Product | Role | Legal Category | Privacy Risk | Downstream Requests | Total Endpoints | DECIDE |
|--------|---------|------|----------------|-------------|---------------------|----------------|--------|
| Google | Google Tag Manager | tag_manager | functionality_preference | LOW | 14 | 24 | Keep — consent-gated |
| Google | GA4 | analytics | tracking | LOW | — | — | Consent-gate |
| Google | DoubleClick | advertising | advertising | MEDIUM | — | — | Flag / Remove |
| LinkedIn | Insight Tag | analytics | tracking | MEDIUM | — | — | Consent-gate |
| Meta | Pixel | advertising | tracking | MEDIUM | — | — | Consent-gate |
| TikTok | Pixel | advertising | tracking | MEDIUM | — | — | Consent-gate |
| Microsoft | Clarity / UET | analytics | tracking | LOW | — | — | Consent-gate |
| Zendesk | Widget | functionality | non-tracking | LOW | — | — | Keep |
| OneTrust | CMP | consent | functionality_preference | LOW | — | — | Keep |

---

## Key Findings

- **Fires before consent:** [list vendors]
- **High downstream impact:** [vendors with >5 downstream requests]
- **Unclassified requests:** [count] — [domains]
- **Loi 25 / GDPR exposure:** YES / NO — [detail]

---

## Recommended Actions

1. [Action 1 — owner — timeline]
2. [Action 2 — owner — timeline]
3. [Action 3 — owner — timeline]
```

### Loi 25 / GDPR Exposure Scoring Columns (add to findings table)

```
Requires Consent     YES / NO  — based on role and legal category
Currently Gated      YES / NO  — observed in pre-consent recording
Gap                  YES / NO  — requires consent but not gated = exposure
```

The **Gap column** is your exposure. Every YES in that column is a Loi 25 / GDPR finding.

---

## 8. Pitfalls & Failure Modes

**Recording in your main browser profile.**  
Cached consent states and existing session cookies suppress tracker fires that would hit a real new visitor. Always use Guest mode or a fresh profile.

**Stopping the recording before interaction.**  
Many trackers don't fire on page load — they fire on scroll, click, or form fill. Record at least one full user journey.

**Ignoring the Unclassified cluster.**  
Unclassified doesn't mean harmless. It means MANTIS has no Tracker Radar entry for that domain. These warrant manual investigation — they could be custom pixels, obscure analytics, or first-party subdomains proxying third-party data.

**Treating `tag_manager` as "just infrastructure."**  
GTM is the master loader. If GTM fires before consent, everything it loads also fires before consent. GTM consent triggering is where most Loi 25 violations actually live.

**Confusing Privacy Risk LOW with "no problem."**  
LOW risk means no active privacy signals detected in the current session — not that the vendor is inherently safe or compliant. A DoubleClick tag showing LOW in your session can still be a consent violation if it fires pre-consent.

**One-state recording.**  
Recording only post-consent-accept gives a false picture. The legally dangerous window is the pre-consent state. Always document both.

---

## 9. Proof of Implementation

You've done this right when:

- [ ] Findings table complete — DECIDE column filled for every vendor
- [ ] Both pre-consent and post-consent states recorded
- [ ] At least one pre-consent vendor identified (or confirmed zero)
- [ ] Unclassified cluster is empty or each entry is explained
- [ ] GTM's full downstream chain traced — which tags it loads, under what conditions
- [ ] Written action list with owner and timeline attached

---

## 10. Next Level

**Automate the audit trigger.** Set a calendar reminder to re-run MANTIS on key sites quarterly. Tracker inventories drift — marketing adds pixels, developers add scripts, agencies get GTM access.

**Layer in Loi 25 / GDPR exposure scoring.** Add the three compliance columns to every findings table. The Gap column is your exposure report.

**Wire it to Personal CISO workflow.** When you run a CISO audit for a client or for PayFacto/Cardinal Conseils properties, MANTIS is the web-layer input. The findings file feeds directly into your Threat Model and Compliance mode outputs.

**Use on competitors.** MANTIS works on any public URL. Running it on a competitor tells you what marketing stack they're running, what ad networks they're buying through, and whether they have any obviously non-compliant tracker setup.

**Export + n8n.** The CSV export from MANTIS can be piped into an n8n workflow that auto-generates a formatted audit report, logs findings to Supabase, and triggers a Brain MCP save — full audit-to-memory pipeline in one pass.

---

## Sprint Plan

**Sprint 1 (30 min) — Install + First Audit**
- Install MANTIS, create a clean Chrome Guest profile
- Pick a target (your own site, a client site, or gouvernement.qc.ca as practice)
- Run a full recording: page load + cookie banner interaction + 2 page navigations
- Export the request log

**Sprint 2 (30 min) — Build Your Findings File**
- Open the template above
- Fill vendor inventory from the MANTIS graph
- Classify each vendor using the cheat sheet
- Apply DECIDE logic to each row

**Sprint 3 (30 min) — Loi 25 Exposure Check**
- Re-run recording in pre-consent state specifically
- Note every vendor that fires before the consent banner is interacted with
- These are your exposure items — they go to the Flag or Remove column
- Draft your action list with owner and timeline

**Ongoing — 15 min/quarter per site**
- Re-run Steps 2–5 on any site that had changes in the prior quarter
- Check for new Unclassified entries (new pixels added without your knowledge)
