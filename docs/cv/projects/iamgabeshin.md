---
slug: iamgabeshin
name: iamgabeshin.com — personal portfolio
company: independent
role: Designer / Developer
status: ongoing
start: 2024
end: null
stack: [Next.js, React, TypeScript, Tailwind, Framer Motion, MongoDB, Sentry]
tags: [portfolio, design, web]
links:
  internal: /
  external: [https://www.iamgabeshin.com]
website_cell: null
include_on_resume: true
last_updated: 2026-04-26
---

# iamgabeshin.com

## What it is

Personal portfolio site with a bento-grid homepage of project cells and dedicated routes for selected initiatives (`/jaksam`, `/hansol`, `/wedding`). Acts as the public hub for current work and the canonical CV surface — no public PDF is hosted.

## What I built

- Bento-grid layout with `react-grid-layout` and Framer Motion transitions.
- One grid cell per public project, route per featured project.
- Dark/light theming via `next-themes`, observability via Sentry.

## Outcomes

- Single public surface for the CV — replaces the need for hosted resume PDFs.
- Living showcase that updates as `docs/cv/` updates.
