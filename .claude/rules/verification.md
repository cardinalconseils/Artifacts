# Verification Before Completion Rules

## Mandatory Behavior

Claude MUST NOT declare work "done", "complete", "shipped", "ready", or run any
`git commit` without first running the maturity-appropriate verification set
and showing the evidence inline.

## Trigger Points

The rule fires before any of these:

- Saying "done", "complete", "shipped", "ready", "finished", "all set", "good to go"
- Any `git commit` invocation
- Opening a pull request
- Closing a `/cks:*` phase or task
- Reporting a feature as implemented in a status update

## Minimum Verification Set

This project is **Pilot** stage (static site, no automated tests configured).

### Pilot Stage — Required

- `_index.json` is valid JSON (run `python3 -m json.tool _index.json` or equivalent)
- New artifact directory exists with all three required files (`README.md`, `index.html`, `meta.json`)
- Hub renders the new artifact card correctly (open `index.html` in browser or `vercel dev`)
- `llms.txt` updated and `README.md` catalog table updated

**Evidence:** Show the json.tool output confirming valid JSON; confirm file paths exist.

## What Counts as Evidence

Evidence MUST be shown inline in the response that claims "done". Acceptable forms:

- **JSON validation:** exact command and its output
- **File existence:** `ls cardinal/{mode}/{slug}/` output
- **Manual check:** one-line description of what was visually verified

Insufficient evidence (never accept):

- "Looks good"
- "Should work"
- "Tested mentally"

## If No Verification Is Possible

State explicitly:

> "No tests configured and no observable behavior to check manually.
>  Maturity: Pilot. Proceeding without runtime verification — flagging
>  this gap as a candidate learning."

This is the ONLY acceptable path past the rule without evidence.
