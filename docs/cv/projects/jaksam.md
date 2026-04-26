---
slug: jaksam
name: Jaksam (작샘)
name_full_ko: 작은선생님
name_meaning: "small teacher"
company: independent
role: Co-founder / Independent Product Developer
status: production
start: 2025
end: null
stack: [TypeScript, React Native, Expo, Supabase, PostgreSQL, OpenAI, Maestro]
tags: [mobile-app, ai-coach, education, music, multi-role, subscriptions]
links:
  internal: /jaksam
  external: []
website_cell: jaksam-cell
last_updated: 2026-04-26
---

# Jaksam (작샘)

"Jaksam" is short for **작은선생님** ("small teacher"). It's the product name and the name of the AI coach inside the app.

## Problem

Music students, teachers, and parents lack a shared workflow for tracking progress across lessons. Recordings get lost, teachers repeat instructions, and parents have no visibility into practice quality. Most existing tools serve one role at a time and miss the multi-stakeholder flow.

## What I built

A cross-platform music-lesson application with role-based workflows for students, teachers, and parents. Built as a side project with a partner.

- **TypeScript orchestration layer** turning lesson recordings into transcripts, summaries, practice plans, weekly reviews, parent digests, and coach messages. Concurrent workers with idempotent jobs, retries, and stale-job recovery.
- **Bounded tool-using AI coach (Jaksam)** that combines methodology search and YouTube retrieval with cost and latency guardrails, structured outputs, and graceful fallback behavior.
- **Mobile recording with chunked upload** and teacher/parent linking flows.
- **Maestro-based end-to-end test coverage** on core user journeys.
- Supabase/PostgreSQL backend with subscription billing and push notifications.

## Outcomes

- **In production** on both Apple App Store and Google Play Store.
- Active user base growing.
- Landing page and details on the portfolio site at [/jaksam](/jaksam).

## Notes

- Side project with a partner — not solo. Be specific in interviews about the split of responsibility (TBD by Gabe if/when relevant).
- The portfolio site has a `/jaksam` route and a grid cell for this project — keep them aligned with this file.
