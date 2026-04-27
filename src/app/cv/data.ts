// Content for the CV / Resume page.
// Resume uses `lede` + `built` (top 4) + `outcomes`.
// CV uses `lede` + diagram + `narrative` (problem/why/approach/result).

export type Lang = "en" | "kr";
export type DocType = "cv" | "resume";
export type DiagSlug = "act2" | "funnel" | "batch" | "extractor" | "timeline";
export type ProjectSlug =
  | "act-2"
  | "agentos-matching"
  | "title-extractor"
  | "batch-orchestrator"
  | "seeso-sdk"
  | "jaksam";

export interface Contact {
  name: string;
  altName: string;
  headline: string;
  summary: string;
  email: string;
  phone: string;
  loc: string;
  web: string;
  gh: string;
  li: string;
}

export interface Narrative {
  problem: string;
  why: string;
  approach: string;
  result: string;
}

export interface Project {
  slug: ProjectSlug;
  name: string;
  period: string;
  co: string;
  role: string;
  lede: string;
  built: string[];
  outcomes: [string, string][];
  stack: string[];
  diag: DiagSlug | null;
  narrative: Narrative;
}

export interface Labels {
  profile: string;
  work: string;
  exp: string;
  edu: string;
  skills: string;
  pubs: string;
  langs: string;
  built: string;
  outcomes: string;
  stack: string;
  cv: string;
  resume: string;
  present: string;
  problem: string;
  why: string;
  approach: string;
  result: string;
}

export const CONTACT: Record<Lang, Contact> = {
  en: {
    name: "Gabe Shin",
    altName: "신태섭",
    headline: "AI Engineer · Product-minded IC",
    summary:
      "AI engineer with 7+ years building production AI systems, distributed backend services, and developer-facing products. Strong at translating customer domain knowledge into production software in startup environments. Recent work centers on agentic systems, enterprise automation, reusable AI frameworks, and production-scale data pipelines.",
    email: "gabeshin.ts@gmail.com",
    phone: "+82 10-3382-0650",
    loc: "Seoul, South Korea",
    web: "iamgabeshin.com",
    gh: "github.com/gabeshin",
    li: "linkedin.com/in/gabeshin0929",
  },
  kr: {
    name: "신태섭",
    altName: "Gabe Shin",
    headline: "AI 엔지니어 · 프로덕트 중심 IC",
    summary:
      "7년 이상 프로덕션 AI 시스템, 분산 백엔드 서비스, 개발자 대상 제품을 구축해온 AI 엔지니어. 스타트업 환경에서 고객 도메인 지식을 프로덕션 소프트웨어로 번역하는 데 강점. 최근에는 에이전트형 시스템, 엔터프라이즈 자동화, 재사용 가능한 AI 프레임워크, 대규모 데이터 파이프라인 작업에 집중.",
    email: "gabeshin.ts@gmail.com",
    phone: "+82 10-3382-0650",
    loc: "서울, 대한민국",
    web: "iamgabeshin.com",
    gh: "github.com/gabeshin",
    li: "linkedin.com/in/gabeshin0929",
  },
};

export const LABELS: Record<Lang, Labels> = {
  en: {
    profile: "Profile",
    work: "Selected Work",
    exp: "Experience",
    edu: "Education",
    skills: "Skills",
    pubs: "Publications & Awards",
    langs: "Languages",
    built: "Role · scope",
    outcomes: "Outcomes",
    stack: "Stack",
    cv: "Curriculum Vitae",
    resume: "Resume",
    present: "Present",
    problem: "Problem",
    why: "Why",
    approach: "Approach",
    result: "Result",
  },
  kr: {
    profile: "프로필",
    work: "주요 작업",
    exp: "경력",
    edu: "학력",
    skills: "기술",
    pubs: "출판물 · 수상",
    langs: "언어",
    built: "역할 · 범위",
    outcomes: "성과",
    stack: "스택",
    cv: "이력서 (CV)",
    resume: "이력서",
    present: "현재",
    problem: "문제",
    why: "동기",
    approach: "접근",
    result: "결과",
  },
};

export const PROJECTS: Record<Lang, Project[]> = {
  en: [
    {
      slug: "act-2",
      name: "ACT-2 — Browser Agent Platform",
      period: "2025.12 → Present",
      co: "Enhans",
      role: "AI Engineer · Architect",
      lede: "Three-tier browser automation platform combining AI-driven agents with deterministic, self-healing replay scripts. Same task is cheap and reliable when it runs millions of times.",
      built: [
        "Architected end-to-end as SDK → Runtime → Brain. Owned the workflow + healing subsystem design.",
        "Multi-turn orchestration loop in Runtime: snapshot → action → loop, behind a single high-level act() call.",
        "YAML replay system: successful agent runs compile to deterministic scripts; broken steps fall back to Brain with full context.",
        "Healing Server design (state machine: healthy→healing→degraded; lock modes; delegation to Building Agent, not in-line patching).",
        "Multi-language SDK (Node, Python, Kotlin) and installable Agent Skill for Claude Code, Cursor, OpenClaw.",
      ],
      outcomes: [
        ["~10×", "Brain token reduction"],
        ["~10×", "cost / latency on workflow path"],
        ["#3", "Mind2Web web-agent benchmark (peaked #2)"],
      ],
      stack: [
        "TypeScript",
        "Python",
        "Kotlin",
        "Playwright",
        "CDP",
        "AWS ECS",
        "FastAPI",
        "OpenAI",
        "Anthropic",
      ],
      diag: "act2",
      narrative: {
        problem:
          "Enterprises rely on browser-based workflows that are too narrow to justify dedicated integrations but too costly to leave to people. Pure LLM-driven browser agents work but don't scale economically — every run pays for inference, and runs are non-deterministic. Hand-coded scrapers are cheap but break the moment the site changes.",
        why: "The interesting space was the middle: a system where the AI agent solves novel tasks, repeatable tasks compile down to deterministic playbacks, and the playbacks self-recover when the underlying site shifts. That's the only shape where the cost math works at scale, and it's the only design that makes the same task cheap and reliable when it runs millions of times.",
        approach:
          "I architected the platform as three tiers: SDKs in multiple languages (Node / Python / JVM), a Playwright/CDP runtime that captures successful agent runs as YAML replay scripts, and an LLM-backed Brain. I designed the Workflow Healing Server as a thin coordination layer — state machine plus delegation pattern — that detects when scripts break, locks the affected workflow, and delegates patching to an external Building Agent rather than trying to be the patcher itself. The healing system stays small, observable, and testable because it doesn't try to do too much. ACT-2 also ships as an installable Agent Skill so other AI agents (Claude Code, Cursor, OpenClaw) can drive it as a tool.",
        result:
          "In production for internal workflow automation. Reached as high as 2nd place on the Mind2Web web-agent benchmark; currently 3rd. ~10× token reduction on Brain calls via DOM metadata extraction, and ~10× cost / latency savings on the workflow path versus pure agentic execution. The Healing Server design makes the cost savings durable — workflows recover from drift instead of degrading silently.",
      },
    },
    {
      slug: "agentos-matching",
      name: "AgentOS Product Matching Pipeline",
      period: "2025.04 — 2025.12",
      co: "Enhans",
      role: "AI Engineer · v1 Architect",
      lede: "SKU-to-product matching for Korean e-commerce dynamic pricing. Three-stage funnel — reuse → deterministic rules → selective LLM. Production scale, hundreds of thousands of decisions per day across multiple Korean enterprise clients.",
      built: [
        "Architected the v1 funnel: ~67% cache hit, ~6% deterministic rules, ~33% selective LLM fallback.",
        "Async streaming pipeline. POST returns 202; per-source Kafka topics so multiple consumers do not contend.",
        "Burst architecture: sharded async LLM consumers (N×M concurrency) with per-task sliding-window RPM/TPM limiter.",
        "Hexagonal layering so the matching service runs the same path under FastAPI, Kafka consumer, or sync dev endpoint.",
      ],
      outcomes: [
        ["+7.5pp", "accuracy (71.9 → 79.4 on 11.9K pairs)"],
        ["~95%", "per-unit cost reduction vs prior"],
        [">5×", "throughput · 120K+ SKUs / hour"],
      ],
      stack: [
        "Python",
        "FastAPI",
        "SQLAlchemy",
        "PostgreSQL",
        "Kafka",
        "AWS ECS",
        "Kubernetes",
      ],
      diag: "funnel",
      narrative: {
        problem:
          "Korean e-commerce dynamic pricing requires SKU-to-product matching at production volume across multiple platforms. The prior implementation ran every match through an LLM — accurate, but cost was prohibitive, latency scaled linearly with traffic, and past decisions weren't reused. The triggering event was a customer promotion contract: ~15,000 target products per day for three weeks. The original pipeline couldn't absorb that economically.",
        why: "The core insight was that most matching decisions don't need an LLM at all. Exact matches and obvious non-matches can be handled deterministically; pay LLM cost only on the genuinely ambiguous middle. Building this as a funnel rather than a flat pipeline meant we could move 95% of decisions to cheaper layers while preserving accuracy where it actually mattered — which made the promotion economically viable, and the architecture durable for whatever came next.",
        approach:
          "I architected the v1 funnel — cache reuse of prior matches (~67% of traffic, free), deterministic hard rules (~6%, ~93% precision), then selective LLM fallback (~33%). The full pipeline is async streaming via Kafka with per-source result topics so consumers don't contend. For burst handling I designed a sharded LLM consumer pool (N tasks × M concurrency) with a per-task in-memory sliding-window RPM/TPM rate limiter — the system can saturate available LLM throughput without exceeding upstream limits. v2 generalization (multi-client, multi-source) and ongoing refinement was collaborative with the team.",
        result:
          "+7.5pp accuracy improvement (71.9% → 79.4% on an 11,893-pair labeled set). Sustains 120K+ SKUs/hour and 300K+ requests/day at peak. Per-unit matching cost reduced ~95%, throughput improved >5×. The system shipped before the promotion started, ran the contract, and has stayed in production at higher daily volume since.",
      },
    },
    {
      slug: "title-extractor",
      name: "Rule-based Extractor — Korean E-Commerce",
      period: "2025",
      co: "Enhans",
      role: "AI Engineer · Architect",
      lede: "Production deterministic extraction service for Korean e-commerce listings, plus a domain-specific agent harness that grows its rulebook autonomously. LLM-free at inference — all the AI lives in the build loop.",
      built: [
        "FastAPI service: 3-pass convergence pipeline (alias → category → brand → product → attribute → normalize → conflict).",
        "6,400+ regex rules across ~120 category files / ~370 brand files; ~11,000 tests against the production rulebook.",
        "Designed the agent harness — DB-backed job queue with three job types (ingestion / feedback / discovery via ACT-2 scraping); concurrent agent pool runs a multi-step pipeline that turns inputs into committed Python rule files.",
        "Powers the deterministic matching layer of AgentOS matching: SKUs canonicalizing to the same form match without an LLM call.",
      ],
      outcomes: [
        ["~98%", "deterministic accuracy on matched portion"],
        ["6,400+", "regex rules · 11,000+ tests"],
        ["LLM-free", "at inference · agents only at build"],
      ],
      stack: [
        "Python",
        "FastAPI",
        "regex",
        "Claude Code",
        "AWS ECS Fargate",
        "PostgreSQL",
        "React",
      ],
      diag: "extractor",
      narrative: {
        problem:
          "Korean e-commerce listing titles are noisy: encoding variants, vendor-specific suffixes, normalization gaps, category-specific conventions across Coupang, Naver, Ohouse, and others. Routing every match through an LLM is expensive and slow when most decisions are deterministic. But hand-authoring 6,000+ rules across hundreds of brands and categories doesn't scale either — the long tail keeps growing as new products appear.",
        why: "I wanted a deterministic, auditable rulebook that runs at request time without any LLM, paired with a self-improving build pipeline that uses LLM agents during build to grow and maintain it. The interesting design question wasn't 'can an LLM extract this'; it was 'can an LLM agent author the rules another system uses, with humans in a review-and-merge loop?' That's a different shape from chat-style assistance — it's agent-as-rule-author, working on a deterministic system that runs in production.",
        approach:
          "Two coupled systems shipped as one product. The extractor is a FastAPI service with a 3-pass convergence pipeline backed by 6,400+ regex rules, ~11,000 tests, and full evidence trails on every response. The agent harness around it has a DB-backed job queue (ingestion / feedback / discovery), a job loop that dispatches to a concurrent agent pool, and a multi-step ingestion pipeline that turns a structured product list into catalog files, generates real-world test cases, drafts and reviews the rules, and produces attribute coverage. Discovery uses ACT-2 to scrape brand sites for new products to ingest — three of my Enhans projects (rule-based extractor, AFK harness pattern, ACT-2) compose into a single self-improving rulebook system.",
        result:
          "~98% deterministic accuracy on the matched portion at production scale. No LLM at inference — orders-of-magnitude faster and cheaper than the prior full-LLM pipeline; this is the deterministic layer that lets AgentOS matching route only ~33% of decisions to LLM. The rulebook keeps growing through the harness: humans review and merge, but the agent does the volume. One of the most concrete production applications of agent-harness tooling I've built.",
      },
    },
    {
      slug: "batch-orchestrator",
      name: "LLM Batch Orchestrator",
      period: "2025",
      co: "Enhans",
      role: "AI Engineer · Architect + Builder",
      lede: "Production batch-LLM service letting internal teams compose multi-step LLM workloads via provider batch APIs (OpenAI Batch, AWS Bedrock) with DB lookups and business logic between inference steps.",
      built: [
        "REST API + FastAPI server, Redis task / job state, S3 JSONL staging, Kafka result delivery.",
        "Batch Consumer accumulates by provider:model so batches stay large enough for the cost math.",
        "Poller polls every 30s; Reporter parses provider-specific JSONL, publishes per-task results.",
        "Multi-step composition: results return on Kafka; caller can re-enter with derived requests for the next step.",
        "Provider abstraction — adding a new provider = JSONL adapter + result parser.",
      ],
      outcomes: [
        ["~50%", "inference cost reduction vs sync API"],
        ["Multi", "internal services migrated where applicable"],
        ["3", "production providers (OpenAI · Bedrock · Azure)"],
      ],
      stack: [
        "Python",
        "FastAPI",
        "Kafka",
        "Redis",
        "S3",
        "AWS ECS",
        "OpenAI Batch",
        "Bedrock",
        "Azure",
      ],
      diag: "batch",
      narrative: {
        problem:
          "Multiple Enhans services run high-volume LLM workloads. Synchronous APIs make the math punishing at scale — per-call inference cost dominates the budget for any team that doesn't need real-time. Provider batch APIs are ~50% cheaper but only support single-step tasks out of the box. Most real workloads aren't single-step: classify, fetch related records, generate plans, persist — three inference steps with database access between them.",
        why: "Either every team rebuilds the same async-batch plumbing (input JSONL packing, S3 staging, polling, error handling), or they keep paying full sync-API cost for tasks that didn't need real-time. Both options waste effort. A shared platform service that makes batch + multi-step a first-class capability solves it once for the whole company instead of N times badly.",
        approach:
          "I built a managed batch service with three core components — a FastAPI Server that authenticates, validates, and mints task IDs; a Batch Consumer that accumulates by provider:model and submits to the provider's batch API; and a Poller + Reporter that checks every 30s and publishes per-task results to Kafka. Multi-step composition emerges naturally: caller services consume results, run their own DB queries and business logic, then re-enter with derived requests. Provider abstraction (validator + reporter per-provider) makes adding a new provider contained — currently OpenAI Batch and AWS Bedrock; Azure OpenAI and Gemini planned.",
        result:
          "Production batch service consumed by multiple internal services. ~50% cost reduction per inference vs. sync API for callers who can tolerate batch latency. Multi-step batch workflows are now a normal pattern internally — teams compose two- or three-step batches against this single orchestrator instead of rebuilding plumbing. Removes a class of work that every LLM-using team would otherwise have to redo.",
      },
    },
    {
      slug: "seeso-sdk",
      name: "SeeSo SDK — Mobile Gaze Tracking",
      period: "2020.03 — 2024.05",
      co: "VisualCamp",
      role: "Tech Lead → Backend Engineer",
      lede: "Owned the SeeSo SDK product through the platform-expansion phase. Mobile gaze-tracking SDK used by developers worldwide; six-platform support; 5M+ monthly authentications in production.",
      built: [
        "Built the C++ core pipeline; integrated TensorFlow models for cross-platform inference.",
        "Refactored monolithic auth server into microservices; deployed CDN-fronted global SDK auth.",
        "Introduced AWS CDK as the team's IaC standard. Operated Kubernetes services with Fluentd / Grafana.",
        "Earlier (ML Researcher, 2018–20): improved gaze-tracking accuracy +25%, reaching mobile SOTA.",
      ],
      outcomes: [
        ["5M+", "monthly authentications"],
        ["~70%", "server-cost reduction post-refactor"],
        ["6", "platforms supported"],
        ["CES '22 / '23", "Innovation Awards · MWC GLOMO 2021"],
      ],
      stack: [
        "C++",
        "TensorFlow",
        "Node.js",
        "AWS CDK",
        "Kubernetes",
        "Java/Kotlin",
        "Swift",
      ],
      diag: null,
      narrative: {
        problem:
          "Gaze tracking from a standard mobile camera requires both research-grade accuracy and SDK-grade reliability across heterogeneous devices, OSes, and host applications. State-of-the-art models from research papers don't survive the trip to production — they fail on real device variability, real network conditions, and real integration paths. The SDK had to be both accurate enough to be useful and stable enough to embed in customers' apps at scale.",
        why: "VisualCamp's core thesis was that gaze tracking on consumer mobile cameras was viable as a developer-facing product, not just a research demo. That meant the engineering had to be production-grade end-to-end — not 'ML model in a notebook' but 'C++ pipeline + cross-platform inference + global auth + monitoring + observability' — and it had to scale with developer adoption.",
        approach:
          "I owned the SeeSo SDK product through platform expansion and into stable scale. Built the C++ core pipeline and integrated TensorFlow models for cross-platform inference. Owned the platform roadmap, expanding SDK support to six platforms. Designed and deployed global SDK authentication backed by CDN. Introduced AWS CDK as the team's IaC standard. Later, as Backend Engineer, ran the Kubernetes services with Fluentd / Grafana monitoring and event-driven workflows behind the SDK auth and telemetry pipelines. Earlier (as ML Researcher) reproduced state-of-the-art gaze-tracking models and contributed the +25% accuracy improvement that reached mobile SOTA.",
        result:
          "Sustained 5M+ monthly authentications in production across six platforms. CES 2022 + 2023 Innovation Awards. MWC 2021 GLOMO Award, Best Mobile Innovation. The SDK became VisualCamp's flagship product and the foundation of its developer ecosystem.",
      },
    },
    {
      slug: "jaksam",
      name: "Jaksam (작샘) — AI Practice Coach",
      period: "2025 → Present",
      co: "Side project",
      role: "Product · Engineering",
      lede: "Cross-platform music-lesson app for aspiring classical musicians. Records lesson → structured plan → bounded agentic AI coach for the week between lessons. Live on App Store and Google Play.",
      built: [
        "React Native (Expo) app with role-based workflows for student / teacher / parent.",
        "Lesson recording → Whisper transcription → LangChain orchestrator → timestamped practice plan.",
        "Jaksam coach v2: bounded reasoning + tools loop (YouTube music-edu search, methodology KB retrieval).",
        "Cost-tiered model selection; graceful degradation on tool failure.",
        "Multi-tenant Supabase with row-level security; Korean-first i18n.",
      ],
      outcomes: [
        ["Live", "on App Store + Google Play (early stage)"],
        ["Real", "students of my wife as test audience"],
        ["Bounded", "agentic loop holds per-message cost low"],
      ],
      stack: [
        "TypeScript",
        "React Native",
        "Expo",
        "Supabase",
        "LangChain",
        "Whisper",
        "PostgreSQL",
        "PostHog",
      ],
      diag: null,
      narrative: {
        problem:
          "The hardest moment for an aspiring classical musician isn't the lesson — it's the week between lessons. Students leave the studio with notes and good intentions, then sit at the instrument the next day without a clear plan: what to practice, how to practice it, what 'good' sounds like. My wife is a professional pianist and classical-piano teacher; she sees this every week. Even motivated students plateau when their practice loops drift from what the teacher actually said.",
        why: "My wife's students are all aspiring classical musicians on a professional path — elementary-age performers in specialized programs through college and masters performers. The stakes are real: drifting practice quality compounds over months and years. We wanted to capture each lesson, extract a structured plan, and put a coach in the student's pocket that knows the lesson, the methodology, and the student's history — so practice can stay on the line the teacher set.",
        approach:
          "A React Native (Expo) app with role-based workflows for students, teachers, and parents — multi-tenant Supabase with row-level security. Lesson recording is foreground chunked audio (or video) with resilient upload for weak networks. The orchestrator pipes recordings through Whisper transcription, then through LangChain steps that produce a summary with timestamped key points and a practice plan. Practice sessions get LLM-generated feedback questions. The Jaksam coach itself runs a bounded reasoning + tools loop — capped iterations, two tools (YouTube music-edu search and a methodology KB retrieval), cost-tiered model selection, graceful degradation on tool failure.",
        result:
          "Live on App Store and Google Play. Early stage, growing user base, iterating with my wife's actual students as the test audience. The core loop is working end-to-end. The open problem — making the coach's recommendations specific enough to high-level classical repertoire that they meaningfully change practice quality — is what we're now instrumenting toward.",
      },
    },
  ],
  kr: [
    {
      slug: "act-2",
      name: "ACT-2 — 브라우저 에이전트 플랫폼",
      period: "2025.12 → 현재",
      co: "Enhans",
      role: "AI 엔지니어 · 아키텍트",
      lede: "AI 기반 에이전트와 결정론적 자가복구 및 리플레이 스크립트를 결합한 3계층 브라우저 자동화 플랫폼. 동일 작업이 수백만 번 반복될 때 저렴하고 안정적으로 실행됨.",
      built: [
        "SDK → Runtime → Brain의 3계층 구조를 처음부터 끝까지 설계. 리플레이 워크플로우 + Healing 서브시스템 설계 주도.",
        "런타임 다중 턴 오케스트레이션 루프: 스냅샷 → 행동 → 반복, 단일 act() 호출 뒤에서 자동 동작.",
        "YAML 리플레이 시스템: 성공한 에이전트 실행을 결정론적 스크립트로 컴파일, 실패 시 Brain으로 Graceful Fallback.",
        "Healing Server 설계 (상태 머신 healthy→healing→degraded, 락 모드, Building Agent에 위임).",
        "다중 언어 SDK (Node · Python · Kotlin); Claude Code · Cursor · OpenClaw용 Agent Skill 패키징.",
      ],
      outcomes: [
        ["~10×", "Brain 토큰 절감"],
        ["~10×", "워크플로 경로 비용 / 지연 절감"],
        ["#3", "Mind2Web 웹 에이전트 벤치마크 (최고 #2)"],
      ],
      stack: [
        "TypeScript",
        "Python",
        "Kotlin",
        "Playwright",
        "CDP",
        "AWS ECS",
        "FastAPI",
        "OpenAI",
        "Anthropic",
      ],
      diag: "act2",
      narrative: {
        problem:
          "엔터프라이즈는 전용 통합을 정당화하기엔 너무 좁고, 사람이 직접 처리하기엔 너무 비싼 브라우저 기반 워크플로우에 의존합니다. 순수 LLM 기반 브라우저 에이전트는 동작할수도 있지만 경제적이지는 않습니다 — 모든 실행이 추론 비용을 지불하고, 실행은 비결정적입니다. 손으로 짠 스크래퍼는 저렴하지만 사이트가 바뀌는 즉시 깨집니다.",
        why: "AI 에이전트가 새로운 작업을 풀고, 반복 가능한 작업은 결정론적 재생 스크립트로 컴파일되며, 재생 스크립트가 실패하였을 경우 자가 복구하는 시스템을 개발했습니다. 대규모로 스케일링이 가능한 형태이고, 동일 작업이 수백만 번 반복될 때 저렴하고 안정적이게 만드는 시스템을 설계/개발했습니다.",
        approach:
          "플랫폼을 3계층으로 설계했습니다 — 다중 언어 SDK (Node / Python / JVM), 성공한 에이전트 실행을 YAML 재생 스크립트로 캡처하는 런타임, LLM 기반 Brain. Workflow Healing Server는 thin coordination layer로 설계했습니다 — state machine + 위임 패턴 — 스크립트가 깨지면 감지하고, 해당 워크플로를 잠그고, 패칭 자체는 외부 Building Agent에 위임. Healing 시스템이 너무 많은 일을 하려 하지 않기 때문에 작고, 관찰 가능하고, 테스트 가능하게 유지됩니다. ACT-2는 또한 설치 가능한 Agent Skill로 배포되어 다른 AI 에이전트 (Claude Code · Cursor · OpenClaw)가 도구로 구동할 수 있습니다.",
        result:
          "사내 워크플로우 자동화에 프로덕션 사용 중. Mind2Web 웹 에이전트 벤치마크 최고 2위, 현재 3위. DOM 메타데이터 추출로 Brain 호출 토큰 ~10배 절감, 워크플로 경로에서 순수 에이전틱 실행 대비 ~10배 비용/지연 절감. Healing Server 설계로 비용 절감이 지속됩니다 — 워크플로우가 drift에서 자동 복구되며 소리 없이 degrade하지 않음.",
      },
    },
    {
      slug: "agentos-matching",
      name: "AgentOS 상품 매칭 파이프라인",
      period: "2025.04 — 2025.12",
      co: "Enhans",
      role: "AI 엔지니어 · v1 아키텍트",
      lede: "한국 이커머스 다이내믹 프라이싱을 위한 SKU-to-product 매칭. 3단계 퍼널 — 재사용 → 결정론적 규칙 → 선택적 LLM. 일일 수십만-수백만 건의 요청을 처리하는 프로덕션 규모.",
      built: [
        "v1 퍼널 설계: ~67% 캐시 히트, ~6% 결정론적 규칙, ~33% 선택적 LLM 폴백.",
        "비동기 스트리밍 파이프라인. POST는 즉시 202 반환; 소스별 Kafka 토픽으로 컨슈머 간 경합 제거.",
        "버스트 구조: 샤드 비동기 LLM 컨슈머 (N×M 동시성), 태스크별 슬라이딩 윈도우 RPM/TPM 리미터.",
        "헥사고날 계층화로 FastAPI · Kafka · 동기 dev 엔드포인트 모두 동일한 매칭 코드 경로.",
      ],
      outcomes: [
        ["+7.5%p", "정확도 (71.9 → 79.4, 11,893쌍)"],
        ["~95%", "단위 비용 절감"],
        [">5×", "처리량 · 시간당 120K+ SKU"],
      ],
      stack: [
        "Python",
        "FastAPI",
        "SQLAlchemy",
        "PostgreSQL",
        "Kafka",
        "AWS ECS",
        "Kubernetes",
      ],
      diag: "funnel",
      narrative: {
        problem:
          "한국 이커머스 다이내믹 프라이싱은 다수 플랫폼에 걸쳐 프로덕션 규모로 SKU-to-product 매칭을 요구합니다. 그러나 기존 구현은 모든 매칭을 LLM으로 처리했습니다 — 정확하지만 비용이 감당 불가였고, 지연시간은 트래픽에 선형 증가, 과거 결정도 재사용되지 않았습니다. 결정적 계기는 고객 프로모션 계약: 일 ~15,000 target 상품, 3주간. 기존 파이프라인은 비용·시간 모두 감당이 안 됐습니다.",
        why: "핵심 통찰은 대부분의 매칭 결정이 LLM이 필요 없다는 것이었습니다. 명확한 매칭과 명확한 비매칭은 결정론적으로 처리 가능; LLM 비용은 진짜로 모호한 중간만 지불. 평면 파이프라인이 아닌 funnel로 짜면 95% 결정을 더 저렴한 계층으로 옮기면서 중요한 곳에서는 정확도를 보존할 수 있었습니다 — 이것이 프로모션을 경제적으로 viable하게 만들었고, 이후에 올 어떤 일에도 견디는 아키텍처가 되었습니다.",
        approach:
          "v1 funnel을 architected — 과거 매칭 캐시 재사용 (~67%, 무료), 결정론적 hard rule (~6%, 정밀도 ~93%), 선택적 LLM 폴백 (~33%). 전체 파이프라인은 Kafka 기반 async streaming, source별 결과 토픽으로 컨슈머 간 경합 없음. Burst 처리를 위해 sharded LLM consumer pool (N tasks × M concurrency)을 설계했고, per-task in-memory sliding-window RPM/TPM rate limiter로 upstream 한도를 넘지 않으면서 가용 LLM 처리량을 saturate. v2 일반화 (multi-client, multi-source)와 지속 개선은 팀과 함께 진행했습니다.",
        result:
          "정확도 +7.5%p 개선 (71.9% → 79.4%, 11,893쌍 라벨 셋). 시간당 120K+ SKU, 일 300K+ 요청 피크 안정 처리. 단위 매칭 비용 ~95% 절감, 처리량 >5× 향상. 시스템은 프로모션 시작 전에 출시되어 계약을 운영했고, 이후 더 높은 일일 볼륨으로 프로덕션에 잔류 중입니다.",
      },
    },
    {
      slug: "title-extractor",
      name: "Rule-based Extractor — 한국 이커머스",
      period: "2025",
      co: "Enhans",
      role: "AI 엔지니어 · 아키텍트",
      lede: "한국 이커머스 listing을 위한 프로덕션 결정론적 추출 서비스와 자율적으로 룰북을 성장시키는 도메인 특화 에이전트 하네스. 인퍼런스에서는 LLM-free — 모든 AI 작업은 빌드 루프에 위치.",
      built: [
        "FastAPI 서비스: 3-pass 수렴 파이프라인 (alias → category → brand → product → attribute → normalize → conflict).",
        "6,400+ 정규식 룰 (~120 카테고리 파일 / ~370 브랜드 파일); 프로덕션 룰북 대상 ~11,000 테스트.",
        "에이전트 하네스 설계 — DB 기반 작업 큐 3종 (ingestion / feedback / discovery via ACT-2 스크래핑); 동시 에이전트 풀이 다단계 파이프라인 실행, 결과물을 커밋 가능한 Python 룰 파일로 변환.",
        "AgentOS 매칭의 결정론적 매칭 레이어로 사용 — 동일 canonical 형태로 정규화되는 SKU는 LLM 호출 없이 매칭.",
      ],
      outcomes: [
        ["~98%", "매칭된 부분 결정론적 정확도"],
        ["6,400+", "정규식 룰 · 11,000+ 테스트"],
        ["LLM-free", "인퍼런스 LLM 미사용 · 빌드 시에만 에이전트"],
      ],
      stack: [
        "Python",
        "FastAPI",
        "regex",
        "Claude Code",
        "AWS ECS Fargate",
        "PostgreSQL",
        "React",
      ],
      diag: "extractor",
      narrative: {
        problem:
          "한국 이커머스 listing 타이틀은 noisy합니다: 인코딩 변형, 벤더별 접미사, 정규화 갭, 쿠팡 / 네이버 / 오늘의집 등 플랫폼별 카테고리 컨벤션. 결정론적으로 처리할 수 있는 대부분의 결정에 LLM을 routing하는 것은 비싸고 느립니다. 하지만 수백 개 브랜드와 카테고리에 걸쳐 6,000+ 룰을 손으로 작성하는 것도 scale하지 않습니다 — long-tail이 새 상품 등장과 함께 계속 자랍니다.",
        why: "리퀘스트 타임에 LLM 없이 동작하는 결정론적·감사 가능한 룰북과, 빌드 타임에 LLM 에이전트가 피드백과 디스커버리로부터 룰북을 키우고 유지하는 셀프-임프루빙 빌드 파이프라인을 만들고 싶었습니다. 흥미로운 설계 질문은 'LLM이 이걸 추출할 수 있는가'가 아니라 'LLM 에이전트가 다른 시스템이 사용할 룰을 작성하고, 사람은 review-and-merge 루프에 들어갈 수 있는가'였습니다. 채팅 스타일 어시스턴스와는 다른 형태 — 프로덕션에서 동작하는 결정론적 시스템 위에서 에이전트가 룰 작성자 역할을 합니다.",
        approach:
          "두 개의 결합된 시스템을 하나의 제품으로 출시. 추출기는 6,400+ 정규식 룰과 ~11,000 테스트, 모든 응답에 evidence trail이 붙는 3-pass 수렴 파이프라인의 FastAPI 서비스. 그 주변의 에이전트 하네스는 DB 기반 작업 큐 (ingestion / feedback / discovery), 동시 에이전트 풀로 dispatch하는 job loop, 그리고 구조화된 상품 리스트를 catalog 파일로 변환하고, 실세계 테스트 케이스를 생성하고, 룰을 작성·검토하고, attribute 커버리지를 produce하는 다단계 ingestion 파이프라인을 가집니다. Discovery는 ACT-2를 사용해 브랜드 사이트를 스크래핑하여 새 상품을 ingest — Enhans 프로젝트 3개 (rule-based extractor, AFK 하네스 패턴, ACT-2)가 단일 셀프-임프루빙 룰북 시스템으로 합쳐집니다.",
        result:
          "프로덕션 규모에서 매칭된 부분 ~98% 결정론적 정확도. 인퍼런스에서 LLM 미사용 — 기존 full-LLM 파이프라인 대비 orders-of-magnitude 빠르고 저렴; AgentOS 매칭이 결정의 ~33%만 LLM으로 routing하게 만드는 결정론적 레이어. 룰북은 하네스가 지속 성장시키며, 사람은 review-and-merge하지만 volume은 에이전트가 처리. 가장 구체적인 에이전트 하네스 프로덕션 응용 중 하나.",
      },
    },
    {
      slug: "batch-orchestrator",
      name: "LLM 배치 오케스트레이터",
      period: "2025",
      co: "Enhans",
      role: "AI 엔지니어 · 아키텍트 · 구현",
      lede: "내부 팀이 OpenAI Batch · AWS Bedrock 등 프로바이더 배치 API를 통해 다단계 LLM 워크로드를 구성할 수 있게 하는 프로덕션 배치-LLM 서비스. 단계 사이 DB 조회와 비즈니스 로직 가능.",
      built: [
        "FastAPI REST 서버, Redis 태스크 / 잡 상태, S3 JSONL 스테이징, Kafka 결과 전달.",
        "Batch Consumer가 provider:model 단위로 누적해 비용 효율 유지.",
        "30초 폴러; Reporter가 프로바이더별 JSONL 파싱 후 태스크별 결과 게시.",
        "다단계 구성: Kafka로 결과가 돌아와 호출자가 다음 단계 요청을 파생 가능.",
        "프로바이더 추상화 — 신규 추가 = JSONL 어댑터 + 결과 파서.",
      ],
      outcomes: [
        ["~50%", "동기 API 대비 추론 비용 절감"],
        ["다수", "내부 서비스가 배치로 이전"],
        ["3", "프로덕션 프로바이더 (OpenAI · Bedrock · Azure)"],
      ],
      stack: [
        "Python",
        "FastAPI",
        "Kafka",
        "Redis",
        "S3",
        "AWS ECS",
        "OpenAI Batch",
        "Bedrock",
        "Azure",
      ],
      diag: "batch",
      narrative: {
        problem:
          "Enhans 전반에서 다수 서비스가 high-volume LLM 워크로드를 실행합니다. 동기 API는 scale에서 비용이 punishing — real-time이 필요 없는 팀에게도 per-call 추론 비용이 예산을 잠식합니다. Provider batch API는 ~50% 저렴하지만 out-of-the-box로는 single-step만 지원. 실제 워크로드 대부분은 single-step이 아닙니다: 분류 → 관련 레코드 조회 → 계획 생성 → persist — 단계 사이에 DB 접근이 있는 3단계 추론.",
        why: "모든 팀이 같은 async-batch 플러밍 (input JSONL 패킹, S3 staging, polling, error handling)을 다시 만들거나, real-time이 필요 없는 작업에 full sync-API 비용을 지불해야 했습니다. 둘 다 노력 낭비. 배치 + multi-step을 1급 시민으로 만드는 공유 플랫폼 서비스가 회사 전체를 위해 N번 어설프게가 아니라 한 번에 해결합니다.",
        approach:
          "매니지드 배치 서비스를 3개 핵심 컴포넌트로 구축 — auth / validation / task ID 발급의 FastAPI Server, `provider:model` 단위로 누적해 provider의 batch API에 제출하는 Batch Consumer, 30초마다 확인하고 Kafka에 task별 결과를 게시하는 Poller + Reporter. Multi-step composition은 자연스럽게 emerge: caller 서비스가 결과를 consume하고, 자체 DB 쿼리와 비즈니스 로직을 실행한 뒤, 파생된 요청으로 재진입. Provider 추상화 (per-provider validator + reporter)로 새 provider 추가가 contained — 현재 OpenAI Batch와 AWS Bedrock; Azure OpenAI와 Gemini 추가 예정.",
        result:
          "사내 다수 서비스가 사용하는 프로덕션 배치 서비스. 배치 지연을 감수할 수 있는 caller에게 동기 API 대비 ~50% 추론 비용 절감. Multi-step 배치 워크플로우가 사내 normal pattern이 됨 — 팀들이 플러밍을 다시 만드는 대신 이 단일 orchestrator에 2-3단계 배치를 구성. LLM을 사용하는 모든 팀이 다시 만들어야 했을 작업의 한 부류를 제거.",
      },
    },
    {
      slug: "seeso-sdk",
      name: "SeeSo SDK — 모바일 시선 추적",
      period: "2020.03 — 2024.05",
      co: "VisualCamp",
      role: "테크 리드 → 백엔드 엔지니어",
      lede: "플랫폼 확장 단계 SeeSo SDK 제품 오너. 전 세계 개발자가 사용하는 모바일 시선 추적 SDK; 6개 플랫폼 지원; 월 500만+ 인증 처리.",
      built: [
        "C++ 코어 파이프라인 구축; TensorFlow 모델을 크로스 플랫폼 추론에 통합.",
        "모놀리식 인증 서버를 마이크로서비스로 리팩터링; 글로벌 CDN 기반 SDK 인증 배포.",
        "팀 표준 IaC로 AWS CDK 도입. Fluentd / Grafana 기반 Kubernetes 운영.",
        "이전 (ML 연구자, 2018–20): 정확도 +25% 향상, 모바일 시선 추적 SOTA 도달.",
      ],
      outcomes: [
        ["500만+", "월간 인증"],
        ["~70%", "리팩터링 후 서버 비용 절감"],
        ["6", "플랫폼 지원"],
        ["CES '22 / '23", "혁신상 · MWC GLOMO 2021"],
      ],
      stack: [
        "C++",
        "TensorFlow",
        "Node.js",
        "AWS CDK",
        "Kubernetes",
        "Java/Kotlin",
        "Swift",
      ],
      diag: null,
      narrative: {
        problem:
          "표준 모바일 카메라로부터의 시선 추적은 연구 수준의 정확도와 이질적 디바이스 / OS / 호스트 앱에 걸친 SDK 수준의 안정성을 모두 요구합니다. 연구 논문의 최첨단 모델은 프로덕션으로의 여정을 살아남지 못합니다 — 실제 디바이스 다양성, 실제 네트워크 조건, 실제 통합 경로에서 실패합니다. SDK는 유용하기에 충분히 정확하면서도 고객 앱에 embed될 만큼 안정적이어야 했습니다.",
        why: "VisualCamp의 핵심 thesis는 소비자 모바일 카메라의 시선 추적이 연구 데모가 아닌 개발자 대상 제품으로서 viable하다는 것이었습니다. 그러려면 엔지니어링이 end-to-end 프로덕션 수준이어야 했습니다 — '노트북 속 ML 모델'이 아닌 'C++ 파이프라인 + 크로스 플랫폼 추론 + 글로벌 auth + 모니터링 + 관찰가능성' — 그리고 개발자 채택과 함께 scale해야 했습니다.",
        approach:
          "플랫폼 확장 단계부터 안정적 규모까지 SeeSo SDK 제품을 owned. C++ 코어 파이프라인 구축 및 TensorFlow 모델을 cross-platform 추론에 통합. 플랫폼 로드맵을 owning하여 SDK 지원을 6개 플랫폼으로 확장. CDN 기반 글로벌 SDK 인증 설계 및 배포. AWS CDK를 팀의 IaC 표준으로 도입. 이후 Backend Engineer로서 Fluentd / Grafana 모니터링과 event-driven 워크플로우 기반 Kubernetes 서비스 운영. 더 이전에 (ML Researcher로서) 최첨단 시선 추적 모델 재현 및 +25% 정확도 개선으로 모바일 SOTA 도달에 기여.",
        result:
          "6개 플랫폼에 걸쳐 매월 500만+ 인증을 프로덕션에서 안정 처리. CES 2022 + 2023 Innovation Award. MWC 2021 GLOMO Award, Best Mobile Innovation. SDK는 VisualCamp의 flagship 제품이자 개발자 생태계의 기반이 되었습니다.",
      },
    },
    {
      slug: "jaksam",
      name: "작샘 (Jaksam) — AI 연습 코치",
      period: "2025 → 현재",
      co: "사이드 프로젝트",
      role: "기획 및 개발",
      lede: "클래식 전공생을 위한 크로스 플랫폼 레슨 앱. 레슨 녹음 → 구조화된 연습 계획 → 레슨 사이 한 주를 위한 제한된 에이전트형 AI 코치. App Store · Google Play 정식 출시.",
      built: [
        "React Native (Expo) 앱; 학생 / 선생님 / 학부모 역할별 워크플로.",
        "레슨 녹음 → Whisper 전사 → LangChain 오케스트레이터 → 타임스탬프 연습 계획.",
        "Jaksam 코치 v2: 제한된 reasoning + tools 루프 (음악교육 필터드 YouTube · 방법론 KB 검색).",
        "비용 계층 모델 선택; 도구 실패 시 우아한 다운그레이드.",
        "멀티 테넌트 Supabase + Row-Level Security; 한국어 우선 i18n.",
      ],
      outcomes: [
        ["출시", "App Store + Google Play (초기 단계)"],
        ["실제", "아내의 학생을 테스트 사용자로"],
        ["제한된", "에이전트 루프로 메시지당 비용 통제"],
      ],
      stack: [
        "TypeScript",
        "React Native",
        "Expo",
        "Supabase",
        "LangChain",
        "Whisper",
        "PostgreSQL",
        "PostHog",
      ],
      diag: null,
      narrative: {
        problem:
          "클래식 전공생에게 가장 어려운 순간은 레슨 자체가 아니라 레슨과 레슨 사이의 한 주입니다. 학생은 노트와 좋은 의도와 함께 스튜디오를 떠나고, 다음 날 악기 앞에 앉으면 명확한 계획이 없습니다 — 무엇을 연습할지, 어떻게 연습할지, '잘한다'는 것이 어떤 소리인지. 제 아내는 전문 피아니스트이자 클래식 피아노 강사로, 매주 이를 봅니다. 동기 부여된 학생들조차 연습 루프가 선생님의 실제 말과 drift할 때 plateau합니다.",
        why: "아내의 학생들은 모두 전문 연주자의 길을 걷는 클래식 전공생들입니다 — 전문 프로그램의 초등학생 연주자부터 대학생·대학원생 연주자까지. 위험 부담은 진짜입니다: drift된 연습 품질은 개월과 년 단위로 누적됩니다. 우리는 각 레슨을 캡처하고, 구조화된 계획을 추출하고, 학생의 주머니에 레슨·방법론·학생 히스토리를 아는 코치를 넣어 — 연습이 선생님이 그린 line 위에 머물 수 있도록 하고 싶었습니다.",
        approach:
          "학생 / 선생님 / 학부모 역할별 워크플로의 React Native (Expo) 앱 — Row-Level Security 기반 멀티 테넌트 Supabase. 레슨 녹음은 약한 네트워크 견디는 chunked foreground audio (또는 video). 오케스트레이터가 녹음을 Whisper transcription → LangChain 단계로 보내 timestamped key points 요약과 연습 계획을 produce. 연습 세션에는 LLM 생성 피드백 질문이 따라옵니다. Jaksam 코치 자체는 bounded reasoning + tools 루프 — 제한된 반복, 두 도구 (음악교육 필터드 YouTube 검색과 방법론 KB retrieval), 비용 계층 모델 선택, 도구 실패 시 graceful degradation.",
        result:
          "App Store와 Google Play에 출시. 초기 단계, 사용자 기반 증가 중, 아내의 실제 학생들이 테스트 사용자. 핵심 루프는 end-to-end 작동. 열린 문제 — 코치의 추천을 high-level 클래식 레퍼토리에 충분히 구체적이게 만들어 연습 품질을 의미 있게 바꾸는 것 — 이 우리가 이제 instrument하는 방향입니다.",
      },
    },
  ],
};

export const RESUME_HEADLINES: Record<
  Lang,
  Record<ProjectSlug, [string, string]>
> = {
  en: {
    "act-2": ["~10×", "tokens & cost saved · #3 Mind2Web"],
    "agentos-matching": ["+7.5pp", "accuracy · ~95% cost ↓ · 120K SKU/h"],
    "title-extractor": [
      "~98%",
      "deterministic accuracy · LLM-free at inference",
    ],
    "batch-orchestrator": ["~50%", "inference cost ↓ vs sync API"],
    "seeso-sdk": ["5M+", "monthly auths · 70% cost ↓ · 6 platforms"],
    jaksam: ["Live", "App Store + Google Play"],
  },
  kr: {
    "act-2": ["~10×", "토큰 / 비용 절감 · #3 Mind2Web"],
    "agentos-matching": ["+7.5%p", "정확도 · ~95% 비용 절감 · 120K SKU/h"],
    "title-extractor": ["~98%", "결정론적 정확도 · 인퍼런스 LLM-free"],
    "batch-orchestrator": ["~50%", "동기 API 대비 추론 비용 절감"],
    "seeso-sdk": ["500만+", "월간 인증 · 70% 비용 절감 · 6 플랫폼"],
    jaksam: ["출시", "App Store + Google Play"],
  },
};

// [year, top-line (company), bottom-line (role)].
// Empty top means "no role at this point" — render the bottom line centered as a single label.
export const TIMELINE_POINTS: Record<Lang, [string, string, string][]> = {
  en: [
    ["2018", "VisualCamp", "ML Researcher"],
    ["2020", "VisualCamp", "Tech Lead"],
    ["2022", "VisualCamp", "Backend Engineer"],
    ["2024", "", "—"],
    ["2025", "Enhans", "AI Engineer"],
    ["2026", "Enhans", "ACT-2"],
  ],
  kr: [
    ["2018", "VisualCamp", "ML 연구자"],
    ["2020", "VisualCamp", "테크 리드"],
    ["2022", "VisualCamp", "백엔드 엔지니어"],
    ["2024", "", "—"],
    ["2025", "Enhans", "AI 엔지니어"],
    ["2026", "Enhans", "ACT-2"],
  ],
};
