---
slug: auth-microservices
name: Authentication microservices refactor
company: visualcamp
role: Tech Lead
status: shipped
start: 2020
end: 2022
stack: [Node.js, AWS, AWS CDK, CDN]
tags: [microservices, refactor, cost-optimization, infra, authentication]
links:
  internal: ""
  external: []
website_cell: null
last_updated: 2026-04-26
---

# Authentication microservices refactor

## Problem

VisualCamp's legacy monolithic authentication server was becoming both a scaling bottleneck for SDK growth and a sustained cost burden as traffic grew.

## What I built

Led the refactor from monolith to microservices and stood up global CDN-backed authentication.

- Decomposed the monolith into discrete auth services with clearer ownership and independent deploy paths.
- Designed CDN-fronted authentication so SDK clients could authenticate close to their region.
- Introduced AWS CDK as the team's IaC standard during this rebuild.

## Outcomes

- Approximately 70% reduction in server cost.
- Global SDK authentication infrastructure that backed the SeeSo SDK's expansion to six platforms.
- Standardized cloud deployment across the team via AWS CDK.
