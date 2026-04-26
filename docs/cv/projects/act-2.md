---
slug: act-2
name: ACT-2
company: enhans
role: AI Engineer (architect)
status: production
start: 2025-12
end: null
focus_period: 2025-12 → present
stack: [TypeScript, Python, Kotlin, Playwright, CDP, AWS ECS, OpenAI, Anthropic]
tags: [browser-agents, agentic, sdk, runtime, llm-orchestration, web-agent]
links:
  internal: /
  external: [https://act-2.enhans.ai/ko]
website_cell: act2-cell
last_updated: 2026-04-26
---

# ACT-2

## Problem

Enterprises rely on browser-based workflows that span legacy dashboards, repetitive lookups, and routine processes. Each workflow is too narrow to justify a dedicated integration but too costly to leave to people. Pure LLM-driven browser agents work but don't scale economically when the same task runs millions of times.

## What I built

Architected ACT-2 end-to-end — owned the SDK → Runtime → Brain design.

- **SDK** (Node, Python, JVM) — developer-facing entry points so the platform can be embedded in customer applications.
- **Runtime** — Playwright/CDP-based browser execution with deterministic replay, so repeatable agent runs become reusable non-LLM automations.
- **Brain** — AWS ECS-hosted server with OpenAI and Anthropic backends, swappable based on task profile.

Built deterministic replay and workflow capabilities that convert repeatable AI-driven browser tasks into reusable non-LLM automations, improving scale and cost-efficiency for large-scale web crawling and browser-based enterprise workflows. Partnered with enterprise customers to gather requirements, translate domain knowledge into automation logic, and deliver proof-of-concept integrations for legacy internal dashboards.

## Outcomes

- In production. Currently used for internal workflow automation; integration into AgentOS (CommerceOS) is in progress.
- Reached as high as **2nd place on the Mind2Web web-agent benchmark**, currently 3rd. (Resumes/CVs keep this abstract — full benchmark details belong on the website.)
- Public landing page: [act-2.enhans.ai/ko](https://act-2.enhans.ai/ko).
- Reusable agentic workflows promoted into deterministic playbacks improve cost and throughput for high-volume browser tasks.
- Multi-language SDK surface gives customer teams flexibility on integration language.

## Notes

- See `agentos-matching.md` for one of the production use cases this platform enables once AgentOS integration completes.
- Benchmark is **Mind2Web**. Per Q44, full benchmark details belong on the website (e.g., dedicated ACT-2 page or grid cell), not on resumes/CVs — those keep "a public web-agent benchmark" phrasing for future-proofing against ranking changes.
