---
slug: title-extractor
name: Product Rulebook Extractor (Korean e-commerce)
company: enhans
role: AI Engineer
status: production
start: 2025
end: null
stack: [Python, FastAPI, regex, AWS ECS Fargate, PostgreSQL]
tags: [domain-knowledge-externalization, deterministic-systems, korean-nlp, agent-harness-application]
links:
  internal: ""
  external: []
website_cell: null
last_updated: 2026-04-26
---

# Product Rulebook Extractor

A deterministic, rule-based extraction service for Korean e-commerce product listings. Given a raw listing title (e.g., `CJ 비비고/왕교자350G_6EA/냉동`), the extractor returns structured fields: **category**, **brand**, **product**, **manufacturer**, and **attributes** (weight, flavor, storage method, etc.). It serves as the LLM-free fast filter inside AgentOS matching.

## Problem

Korean product titles in e-commerce are noisy: encoding variants, vendor-specific suffixes, normalization gaps, and category-specific conventions across Coupang, Naver, and other platforms. LLM-only matching pays repeatedly for what is fundamentally a deterministic preprocessing step. Externalizing the domain knowledge as a rulebook is cheaper and more auditable than relearning it on every inference — but writing 6,000+ rules by hand doesn't scale on a startup timeline.

## What I built

A FastAPI extraction service plus the **AI agent harness that grew its rulebook**. Two halves of the same project:

### The extractor (production runtime)

- **3-pass convergence pipeline** per listing: `alias → category → brand → product → attribute → normalize`, looped until no changes; then a single `conflict` pass to disambiguate.
- **6,400+ regex rules** spread across ~120 category files (e.g., `dumpling`, `instant_rice`, `sofa`), ~370 brand files (e.g., `비비고`, `MUJI`, `IKEA`), per-brand product rules, per-category attribute rules, and normalization/conflict layers.
- **Bundle segmentation** for `+`-joined listings — splits and extracts each segment, then composes results.
- **Constraint-gated rules** so attribute rules only fire when the relevant category/brand context exists.
- **Evidence trail** in every response: each extracted field carries the rule IDs and matched spans that produced it, so matches can be audited.
- ~11,000 tests, covering full pipeline runs against the production rulebook (no mocking).
- Deployed on AWS ECS Fargate with a React/Vite client for rule browsing and hot-reloading.

### The agent harness that built it

The 6,400 rules aren't authored from scratch by hand. The AFK Research Test Harness (see `afk-harness.md`) was applied to the rulebook as a target: define the goal (improve extraction precision against a held-out set), constraints (budget, off-limits files), and evaluation method, then let an LLM agent draft new rules in iteration loops, with the harness keeping wins, force-reverting losses, and tracking ledger trajectory. Humans review and merge the agent's commits.

This is one of the most concrete production applications of agent-harness tooling I've built — the agent isn't just doing chat assistance, it's iterating on a deterministic system that runs in production at scale.

## Outcomes

- Approximately **98% deterministic accuracy** on the matched portion at production scale.
- Cuts the volume that reaches the LLM judge — directly responsible for the cost and throughput gains in `agentos-matching.md`.
- Test corpus large enough to enable safe, regression-checked rule changes by domain experts and by the agent loop.
- Rulebook serves as institutional memory for what we've learned about Korean e-commerce title conventions.

## Notes

- Source code at `~/agent-pipeline/rule-based-extractor/`. The accompanying agent harness used to grow it is at `~/agent-pipeline/ai-afk-research-rulebook/`.
- Counts (6,400 rules, 11,000 tests, 120 categories, 370 brands) are accurate as of the last README sync; will drift as the agent loop adds more.
