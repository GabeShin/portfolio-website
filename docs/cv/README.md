# CV — Source of Truth

This directory is the canonical record of Gabe Shin's professional history. The portfolio website (`src/app/about/page.tsx`, grid cells in `src/components/*-cell/`) and the resume artifacts in `~/personal/resume/` are downstream — they should be updated to match what lives here.

## Policy

Everything in `docs/cv/*.md` is approved for use on the website and in private resumes. If a specific item shouldn't be included, Gabe will flag it in `questions.md` and we'll remove or revise.

There is no public-facing resume PDF. The website is the only public surface. Resume PDFs in `~/personal/resume/` are sent privately to recruiters.

## Layout

```
docs/cv/
  README.md                  # this file
  questions.md               # single feedback channel — open questions and edit requests
  profile.md
  education.md
  skills.md
  experience/
    <company>.md             # one file per employer; role history + pointers to projects
  projects/
    <slug>.md                # one file per project / product / initiative
```

Awards and publications live inside the relevant project file. No standalone `awards.md`.

## Project file schema

```yaml
---
slug: act-2                            # *  filename without .md
name: ACT-2                            # *  display name
company: enhans                        # *  matches a file in experience/, or "independent"
role: AI Engineer                      # *
status: ongoing                        # *  ongoing | shipped | archived | research
start: 2025-04                         # *  YYYY-MM
end: null                              # *  YYYY-MM or null if ongoing
stack: [TypeScript, Python, Playwright, AWS ECS]
tags: [browser-agents, agentic, sdk]
links:
  internal: /                          #    grid cell route on the website, if any
  external: []                         #    public URLs (paper, demo, blog, repo)
awards: []
publications: []
website_cell: act2-cell                #    pointer to the corresponding grid cell component
last_updated: 2026-04-26
---
```

Body sections (use what's relevant; skip what isn't):

```markdown
## Problem
What was the underlying problem this project solved.

## What I built
What I personally designed/built/owned. First-person, concrete.

## Outcomes
- Bullet, action + scope + technology + measurable result.
- Order roughly by impact.

## Notes
Open items, pending question references, links to evidence. For maintenance only —
not rendered to website or resume.
```

## Feedback channel

`questions.md` is the single place for unresolved items between Gabe and Claude. Workflow:

1. Gabe answers a question inline.
2. Claude folds the answer into the relevant `docs/cv/` file(s) and removes the question from `questions.md`.
3. New questions or edit requests go into `questions.md`. Question numbers are preserved across iterations so cross-references in `docs/cv/*.md` stay stable.

## Downstream artifacts

`docs/cv/` is the source of truth. Two downstream artifact sets:

- **Website** — `src/app/about/page.tsx`, grid cells in `src/components/*-cell/` (the homepage bento grid).
- **Resume + CV markdown sources** in `~/personal/resume/`:
  - `resume_en.md` — 2-page English resume (tight)
  - `resume_kr.md` — 2-page Korean resume
  - `cv_en.md` — long-form English CV / portfolio (each project explained in detail)
  - `cv_kr.md` — long-form Korean CV / portfolio

All four are derived from `docs/cv/`. No position-specific tailoring at the moment. The 2-page resume is a compressed extract; the CV is the comprehensive project-by-project rendering.

Old position-specific variants (Bain, AI/FDE) are deprecated. Pending Q48 on whether to archive or delete.

## Update workflow

When a project file changes:

1. Edit the relevant file(s) in `docs/cv/`.
2. The PostToolUse hook (`.claude/settings.json`) reminds to sync downstream artifacts.
3. Update the website (`/about` and affected grid cells) to match.
4. Update the four resume/CV markdown sources in `~/personal/resume/` to match.

## Conventions

- Dates: `YYYY-MM`.
- Tense: present for ongoing, past for completed.
- Voice: first-person in body ("I designed…"), third-person on website/resume.
- Numbers: use the precise figures available; the website/resume can paraphrase if needed.
