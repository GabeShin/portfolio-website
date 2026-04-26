---
slug: agentos-matching
name: AgentOS product matching
name_prior: CommerceOS product matching
company: enhans
role: AI Engineer
status: production
start: 2025-04
end: null
focus_period: 2025-04 → 2025-12
stack: [Python, FastAPI, Kafka, PostgreSQL, OpenAI, Anthropic]
tags: [entity-resolution, retrieval, llm-routing, e-commerce, dynamic-pricing]
links:
  internal: ""
  external: []
website_cell: null
last_updated: 2026-04-26
---

# AgentOS product matching

> Enhans is renaming this product line from CommerceOS to AgentOS. New copy uses AgentOS.

## Problem

Korean e-commerce dynamic pricing requires matching SKUs across catalogs at production volume. The original LLM-only matching pipeline was accurate but expensive and slow, and traffic is highly peaked rather than steady — so the system has to absorb spikes without melting cost or latency. The gap is a routing problem: which decisions need an LLM, and which don't.

## What I built

A three-stage product-matching system for AgentOS dynamic pricing that funnels traffic through layers, escalating only what needs escalation:

1. **Cache of prior matches** — high-volume traffic short-circuits without inference.
2. **Rule-based extractor** (LLM-free, extremely fast) — rules out deterministic matches and deterministic non-matches before any LLM is invoked. The rulebook is grown via an AI agent harness rather than authored from scratch by hand (see `title-extractor.md` and `afk-harness.md`). Achieves approximately 98% deterministic accuracy on the matched portion.
3. **Selective LLM fallback** — routes only ambiguous residuals to an LLM judge.

Designed to absorb peak traffic, since production demand arrives in spikes rather than at a steady rate.

## Outcomes

- Improved matching accuracy by 7.5 percentage points over the prior LLM-only pipeline. Current production confusion matrix is approximately 98% true negative and 60% true positive.
- Sustains 120K+ SKUs/hour and 300K+ requests/day in production at peak.
- Reduced per-unit matching cost by approximately 95% and improved throughput by over 5x compared to the prior LLM-only baseline, by shifting high-volume traffic toward cached and deterministic decisions.

## Notes

- File renamed from `commerceos-matching.md` 2026-04-26 per Q52 (Enhans rename in progress).
- Title-extractor and matching pipeline ship as one product.
