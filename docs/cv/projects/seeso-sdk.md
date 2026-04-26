---
slug: seeso-sdk
name: SeeSo SDK
company: visualcamp
role: Tech Lead / Backend Engineer
status: shipped
start: 2020-03
end: 2024-05
stack: [C++, TensorFlow, Python, Java/Kotlin, Swift, JavaScript, AWS CDK, Kubernetes, CDN]
tags: [sdk, mobile, gaze-tracking, multi-platform, computer-vision]
awards:
  - CES 2023 Innovation Award
  - CES 2022 Innovation Award
  - MWC 2021 GLOMO Award, Best Mobile Innovation
links:
  internal: ""
  external: [https://www.visual.camp]
website_cell: seesosdk-cell
last_updated: 2026-04-26
---

# SeeSo SDK

## Problem

Gaze tracking from a standard mobile camera requires both research-grade accuracy and SDK-grade reliability across heterogeneous devices, OSes, and host applications. Most academic models don't survive the trip to production.

## What I built

Owned the SeeSo SDK product through the platform-expansion phase and into stable scale.

- Built the C++ core pipeline and integrated TensorFlow models for cross-platform inference.
- Owned the platform roadmap, expanding SDK support to six platforms.
- Designed and deployed global SDK authentication backed by CDN.
- Introduced infrastructure-as-code with AWS CDK as the team's deployment standard.
- Later, as Backend Engineer, ran the Kubernetes services with Fluentd / Grafana monitoring and event-driven workflows behind the SDK auth and telemetry pipelines.

## Outcomes

- Sustained 5M+ monthly authentications in production.
- Six platforms supported.
- CES 2022 and CES 2023 Innovation Awards.
- MWC 2021 GLOMO Award, Best Mobile Innovation.

## Notes

- Pending Q32: whether the 5M+ figure should be expressed as a "scaled from X to Y" statement, since it grew during Gabe's tenure.
- Earlier ML research that fed this SDK is captured separately in `gaze-tracking-ml.md`.
