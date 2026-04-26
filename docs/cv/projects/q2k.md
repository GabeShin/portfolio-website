---
slug: q2k
name: "Question-to-Knowledge (Q2K): Multi-Agent Generation of Inspectable Facts for Product Mapping"
company: enhans
role: Co-first author
status: shipped
start: 2025
end: 2025
stack: [Python, multi-agent-systems, LLM]
tags: [research, publication, multi-agent, sku-mapping, interpretability, entity-resolution]
publications:
  - venue: IEEE BigData 2025
    title: "Question-to-Knowledge (Q2K): Multi-Agent Generation of Inspectable Facts for Product Mapping"
    arxiv: https://arxiv.org/abs/2509.01182
links:
  internal: ""
  external: [https://arxiv.org/abs/2509.01182]
website_cell: null
last_updated: 2026-04-26
---

# Question-to-Knowledge (Q2K)

## Problem

Product mapping (matching SKUs across e-commerce catalogs) is a high-stakes entity-resolution task. Black-box LLM matchers are accurate but unauditable, which blocks adoption in regulated or business-critical workflows where every match must be explainable.

## What I built

Co-first-author of Q2K — an interpretable multi-agent framework that generates inspectable intermediate facts during the matching process so each match decision can be explained, audited, and corrected.

## Outcomes

- Achieved 95.62% accuracy on the evaluation set.
- Accepted at **IEEE BigData 2025** (IEEE 2025 Big Data Conference) as a co-first-authored paper.
- Public preprint: [arxiv.org/abs/2509.01182](https://arxiv.org/abs/2509.01182).
- Demonstrated a path to interpretable product-mapping systems suitable for production audit requirements.

## Notes

- The Q2K methodology is related to but separate from the production AgentOS matching system — the paper's contribution is the interpretable multi-agent framework.
