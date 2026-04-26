---
slug: afk-harness
name: AFK Research Test Harness
company: enhans
role: AI Engineer
status: shipped
start: 2025
end: null
stack: [Python, Bash, Claude Code, evaluation-frameworks]
tags: [agent-evaluation, agent-harness, auto-research, unattended-optimization, regression-testing]
links:
  internal: ""
  external: []
website_cell: null
inspirations:
  - Karpathy's autoresearch (https://github.com/karpathy/autoresearch)
  - Hyperagent paper
applications:
  - act-2 (improving the brain agent / agentic loop)
last_updated: 2026-04-26
---

# AFK Research Test Harness

## Problem

Iterating on agentic systems and other LLM-driven artifacts requires an unattended cycle of baseline measurement, controlled experiments, scoring, and reverting bad changes. Manual evaluation is slow and inconsistent; ad-hoc scripts don't preserve regression coverage. Without a harness, agent-driven improvements regress silently between releases — and there's a deeper question of whether the agent itself can drive its own improvements at all.

## What I built

The AFK Research Test Harness — a generic agent-harness framework into which any task with evaluation metrics can be plugged so an LLM agent can attempt to improve it unattended. Inspired by Karpathy's autoresearch framing and the Hyperagent paper.

### Mechanics

- **Pluggable target repo** — the harness mounts any project, reads `GOAL.md`, `CONSTRAINTS.md`, `LOOP.md` to know what's being optimized.
- **Baseline → iterate → revert loop**. Each iteration: agent reads current best score and recent ledger, formulates a hypothesis, makes a single change, commits, runs evaluation, reports a structured result. Script-side git revert force-resets the target if the experiment didn't earn a `keep` status.
- **Budget-aware** — cumulative cost is tracked from the ledger; loop stops when budget is exhausted.
- **Circuit breaker** — after N consecutive failures (default: 10), the loop stops; the agent is also nudged toward different strategies after 3+ consecutive failures.
- **Ledger + summary** — full iteration trajectory in `experiments/ledger.tsv` plus per-iteration logs; `summary.sh` analyzes score trajectory, keep/discard/crash rates, and best changes.
- **`/setup-test-harness` skill** — Claude Code skill that walks the user through configuring `GOAL.md` / `LOOP.md` / `CONSTRAINTS.md` from scratch, runs a git safety preflight and smoke test.

### Applications

- **ACT-2 brain agent / agentic loop development** — used as the eval and iteration framework for ACT-2's brain agent (see `act-2.md`).

## Outcomes

- Made agentic-loop iteration a measurable cycle rather than an ad-hoc one.
- Enabled safer iteration on agent quality without on-call human review of every experiment.
- **Research conclusion (from applying the harness to ACT-2's brain agent)**: fully automated agent self-improvement loops aren't cost- or time-effective at the current frontier. The strongest results come from **human insight + AI assistance**, where the agent compresses execution time but the human supplies hypothesis quality.

## Notes

- Source at `~/agent-pipeline/ai-afk-research-rulebook/`. README is open-source-style (MIT) — content there is safe to draw from.
- The conclusion is a substantive finding worth surfacing in interviews — it's a calibration on a much-hyped pattern, not a negative result on the harness itself.
