"use client";

import {
  CONTACT,
  DiagSlug,
  DocType,
  Lang,
  LABELS,
  PROJECTS,
  RESUME_HEADLINES,
  TIMELINE_POINTS,
} from "./data";
import { JetBrains_Mono } from "next/font/google";
import { useState } from "react";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// ─────────────────────────────────────────────────────────────────
// Inline SVG diagrams.
// ─────────────────────────────────────────────────────────────────

function ArrowMarker({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 6 6"
        refX="5"
        refY="3"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M0 0 L6 3 L0 6 z" fill="#111" />
      </marker>
    </defs>
  );
}

function DiagAct2({ lang }: { lang: Lang }) {
  const t =
    lang === "kr"
      ? {
          sdk: "SDK",
          runtime: "런타임",
          brain: "Brain",
          wf: "WF DB",
          heal: "Healing",
        }
      : {
          sdk: "SDK",
          runtime: "Runtime",
          brain: "Brain",
          wf: "WF DB",
          heal: "Healing",
        };
  return (
    <svg viewBox="0 0 480 140" style={{ width: "100%", height: "auto" }}>
      <rect x="6" y="50" width="76" height="40" className="dbox" />
      <text x="44" y="68" textAnchor="middle" className="dlbl">
        {t.sdk}
      </text>
      <text x="44" y="80" textAnchor="middle" className="dlbl dlbl-m">
        Node·Py·JVM
      </text>
      <rect x="118" y="26" width="130" height="88" className="dbox dbox-fill" />
      <text x="183" y="42" textAnchor="middle" className="dlbl dlbl-b">
        {t.runtime}
      </text>
      <rect x="130" y="50" width="106" height="22" className="dsub" />
      <text x="183" y="64" textAnchor="middle" className="dlbl">
        multi-turn loop
      </text>
      <rect x="130" y="80" width="106" height="22" className="dsub" />
      <text x="183" y="94" textAnchor="middle" className="dlbl">
        YAML replay
      </text>
      <rect x="288" y="26" width="130" height="88" className="dbox" />
      <text x="353" y="42" textAnchor="middle" className="dlbl dlbl-b">
        {t.brain}
      </text>
      <rect x="300" y="50" width="106" height="22" className="dsub" />
      <text x="353" y="64" textAnchor="middle" className="dlbl">
        LLM agent
      </text>
      <rect x="300" y="80" width="106" height="22" className="dsub" />
      <text x="353" y="94" textAnchor="middle" className="dlbl">
        {t.heal}
      </text>
      <rect x="438" y="50" width="36" height="40" rx="18" className="dbox" />
      <text x="456" y="74" textAnchor="middle" className="dlbl">
        {t.wf}
      </text>
      <path d="M82 70 L116 70" className="darr" markerEnd="url(#m1)" />
      <path d="M250 70 L286 70" className="darr" markerEnd="url(#m1)" />
      <path d="M418 70 L438 70" className="darr darr-d" />
      <ArrowMarker id="m1" />
    </svg>
  );
}

function DiagFunnel({ lang }: { lang: Lang }) {
  const t =
    lang === "kr"
      ? {
          reuse: "재사용 · 캐시",
          rules: "규칙",
          llm: "LLM",
          api: "API",
          kafka: "Kafka",
          client: "클라이언트",
          res: "결과 · 소스별",
        }
      : {
          reuse: "Reuse · cache",
          rules: "Rules",
          llm: "LLM",
          api: "API",
          kafka: "Kafka",
          client: "Client",
          res: "Results · per-source",
        };
  return (
    <svg viewBox="0 0 480 160" style={{ width: "100%", height: "auto" }}>
      <rect x="6" y="60" width="56" height="36" className="dbox" />
      <text x="34" y="82" textAnchor="middle" className="dlbl">
        {t.client}
      </text>
      <rect x="76" y="60" width="56" height="36" className="dbox" />
      <text x="104" y="82" textAnchor="middle" className="dlbl">
        {t.api}
      </text>
      <rect x="146" y="60" width="56" height="36" rx="18" className="dbox" />
      <text x="174" y="82" textAnchor="middle" className="dlbl">
        {t.kafka}
      </text>
      <rect x="216" y="14" width="124" height="32" className="dbox dbox-fill" />
      <text x="278" y="30" textAnchor="middle" className="dlbl dlbl-b">
        {t.reuse}
      </text>
      <text x="278" y="40" textAnchor="middle" className="dlbl">
        ~67%
      </text>
      <rect x="216" y="60" width="124" height="36" className="dbox" />
      <text x="278" y="76" textAnchor="middle" className="dlbl dlbl-b">
        {t.rules}
      </text>
      <text x="278" y="88" textAnchor="middle" className="dlbl">
        ~6% · 93% precision
      </text>
      <rect x="216" y="110" width="124" height="32" className="dbox" />
      <text x="278" y="126" textAnchor="middle" className="dlbl dlbl-b">
        {t.llm}
      </text>
      <text x="278" y="136" textAnchor="middle" className="dlbl">
        ~33%
      </text>
      <rect x="356" y="60" width="118" height="36" className="dbox" />
      <text x="415" y="82" textAnchor="middle" className="dlbl">
        {t.res}
      </text>
      <path d="M62 78 L76 78" className="darr" markerEnd="url(#m2)" />
      <path d="M132 78 L146 78" className="darr" markerEnd="url(#m2)" />
      <path d="M202 78 Q210 78 216 30" className="darr" markerEnd="url(#m2)" />
      <path d="M202 78 L216 78" className="darr" markerEnd="url(#m2)" />
      <path d="M202 78 Q210 78 216 126" className="darr" markerEnd="url(#m2)" />
      <path d="M340 30 Q350 30 356 76" className="darr" markerEnd="url(#m2)" />
      <path d="M340 78 L356 78" className="darr" markerEnd="url(#m2)" />
      <path
        d="M340 126 Q350 126 356 80"
        className="darr"
        markerEnd="url(#m2)"
      />
      <ArrowMarker id="m2" />
    </svg>
  );
}

function DiagBatch({ lang }: { lang: Lang }) {
  const t =
    lang === "kr"
      ? {
          app: "내부 서비스",
          srv: "Server",
          acc: "Batch consumer",
          poll: "Poller (30s)",
          s3: "S3 JSONL",
          redis: "Redis",
          oai: "OpenAI Batch",
          br: "Bedrock",
        }
      : {
          app: "Caller app",
          srv: "Server",
          acc: "Batch consumer",
          poll: "Poller (30s)",
          s3: "S3 JSONL",
          redis: "Redis",
          oai: "OpenAI Batch",
          br: "Bedrock",
        };
  return (
    <svg viewBox="0 0 480 170" style={{ width: "100%", height: "auto" }}>
      <rect x="6" y="74" width="68" height="32" className="dbox" />
      <text x="40" y="94" textAnchor="middle" className="dlbl">
        {t.app}
      </text>
      <rect x="92" y="36" width="220" height="106" className="dbox-dash" />
      <text x="202" y="30" textAnchor="middle" className="dlbl dlbl-b">
        Orchestrator
      </text>
      <rect x="100" y="46" width="80" height="22" className="dbox" />
      <text x="140" y="60" textAnchor="middle" className="dlbl">
        {t.srv}
      </text>
      <rect x="100" y="78" width="80" height="22" className="dbox" />
      <text x="140" y="92" textAnchor="middle" className="dlbl">
        {t.acc}
      </text>
      <rect x="100" y="110" width="80" height="22" className="dbox" />
      <text x="140" y="124" textAnchor="middle" className="dlbl">
        {t.poll}
      </text>
      <rect x="218" y="46" width="80" height="22" className="dbox" />
      <text x="258" y="60" textAnchor="middle" className="dlbl">
        Reporter
      </text>
      <rect x="218" y="78" width="80" height="22" className="dbox" />
      <text x="258" y="92" textAnchor="middle" className="dlbl">
        {t.s3}
      </text>
      <rect x="218" y="110" width="80" height="22" className="dbox" />
      <text x="258" y="124" textAnchor="middle" className="dlbl">
        {t.redis}
      </text>
      <rect x="338" y="58" width="74" height="22" className="dbox dbox-fill" />
      <text x="375" y="72" textAnchor="middle" className="dlbl">
        {t.oai}
      </text>
      <rect x="338" y="100" width="74" height="22" className="dbox dbox-fill" />
      <text x="375" y="114" textAnchor="middle" className="dlbl">
        {t.br}
      </text>
      <path d="M74 90 L100 56" className="darr" markerEnd="url(#m3)" />
      <path d="M74 90 L100 90" className="darr" markerEnd="url(#m3)" />
      <path d="M180 90 L218 90" className="darr" markerEnd="url(#m3)" />
      <path d="M298 60 L338 68" className="darr" markerEnd="url(#m3)" />
      <path d="M298 70 L338 110" className="darr" markerEnd="url(#m3)" />
      <ArrowMarker id="m3" />
    </svg>
  );
}

function DiagExtractor({ lang }: { lang: Lang }) {
  const t =
    lang === "kr"
      ? {
          ing: "Ingestion",
          fb: "Feedback",
          disc: "Discovery",
          via: "via ACT-2",
          queue: "큐",
          agents: "에이전트 풀",
          pipeline: "파이프라인",
          rules: "룰북 (git)",
          extractor: "Extractor",
          extractorSub: "LLM-free 추론",
        }
      : {
          ing: "Ingestion",
          fb: "Feedback",
          disc: "Discovery",
          via: "via ACT-2",
          queue: "Queue",
          agents: "Agent pool",
          pipeline: "Pipeline",
          rules: "Rulebook (git)",
          extractor: "Extractor",
          extractorSub: "LLM-free at inference",
        };
  return (
    <svg viewBox="0 0 480 158" style={{ width: "100%", height: "auto" }}>
      {/* Sources stacked left */}
      <rect x="6" y="14" width="76" height="22" className="dbox" />
      <text x="44" y="28" textAnchor="middle" className="dlbl">
        {t.ing}
      </text>
      <rect x="6" y="46" width="76" height="22" className="dbox" />
      <text x="44" y="60" textAnchor="middle" className="dlbl">
        {t.fb}
      </text>
      <rect x="6" y="78" width="76" height="22" className="dbox" />
      <text x="44" y="92" textAnchor="middle" className="dlbl">
        {t.disc}
      </text>
      <text x="44" y="108" textAnchor="middle" className="dlbl dlbl-m">
        {t.via}
      </text>

      {/* Mid row: Queue → Agent pool → Pipeline → Rulebook */}
      <rect x="106" y="46" width="60" height="22" rx="11" className="dbox" />
      <text x="136" y="60" textAnchor="middle" className="dlbl">
        {t.queue}
      </text>

      <rect x="190" y="46" width="64" height="22" className="dbox dbox-fill" />
      <text x="222" y="60" textAnchor="middle" className="dlbl dlbl-b">
        {t.agents}
      </text>

      <rect x="278" y="46" width="84" height="22" className="dbox" />
      <text x="320" y="60" textAnchor="middle" className="dlbl">
        {t.pipeline}
      </text>

      <rect x="386" y="46" width="84" height="22" className="dbox" />
      <text x="428" y="60" textAnchor="middle" className="dlbl">
        {t.rules}
      </text>

      {/* Extractor (bottom) */}
      <rect
        x="180"
        y="118"
        width="220"
        height="32"
        className="dbox dbox-fill"
      />
      <text x="290" y="131" textAnchor="middle" className="dlbl dlbl-b">
        {t.extractor}
      </text>
      <text x="290" y="143" textAnchor="middle" className="dlbl dlbl-m">
        {t.extractorSub}
      </text>

      {/* Arrows: sources fan-in to queue */}
      <path d="M82 24 Q92 24 106 52" className="darr" markerEnd="url(#m4)" />
      <path d="M82 56 L106 56" className="darr" markerEnd="url(#m4)" />
      <path d="M82 88 Q92 88 106 60" className="darr" markerEnd="url(#m4)" />

      {/* Mid-row chain */}
      <path d="M166 56 L190 56" className="darr" markerEnd="url(#m4)" />
      <path d="M254 56 L278 56" className="darr" markerEnd="url(#m4)" />
      <path d="M362 56 L386 56" className="darr" markerEnd="url(#m4)" />

      {/* Rulebook → Extractor (dotted feed line) */}
      <path
        d="M428 68 Q428 100 400 130"
        className="darr darr-d"
        markerEnd="url(#m4)"
      />

      <ArrowMarker id="m4" />
    </svg>
  );
}

function DiagTimeline({ lang }: { lang: Lang }) {
  const pts = TIMELINE_POINTS[lang];
  // Pad dots inside x=60..420 so center-anchored labels (e.g. "ML Researcher",
  // "Backend Engineer") have ~60px overflow budget on each side without
  // clipping at the SVG edges.
  const PAD = 60;
  const VIEW_W = 480;
  const span = VIEW_W - PAD * 2;
  return (
    <svg viewBox={`0 0 ${VIEW_W} 76`} style={{ width: "100%", height: "auto" }}>
      <line
        x1={PAD}
        y1="34"
        x2={VIEW_W - PAD}
        y2="34"
        stroke="#111"
        strokeWidth="1"
      />
      {pts.map((p, i) => {
        const x = PAD + (span / (pts.length - 1)) * i;
        const [year, top, bottom] = p;
        const hasTop = top.length > 0;
        return (
          <g key={i}>
            <circle cx={x} cy="34" r="3.5" fill="#111" />
            <text x={x} y="20" textAnchor="middle" className="dlbl dlbl-b">
              {year}
            </text>
            {hasTop ? (
              <>
                <text x={x} y="50" textAnchor="middle" className="dlbl">
                  {top}
                </text>
                <text x={x} y="62" textAnchor="middle" className="dlbl dlbl-m">
                  {bottom}
                </text>
              </>
            ) : (
              <text x={x} y="56" textAnchor="middle" className="dlbl dlbl-m">
                {bottom}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Diagram({ slug, lang }: { slug: DiagSlug; lang: Lang }) {
  switch (slug) {
    case "act2":
      return <DiagAct2 lang={lang} />;
    case "funnel":
      return <DiagFunnel lang={lang} />;
    case "batch":
      return <DiagBatch lang={lang} />;
    case "extractor":
      return <DiagExtractor lang={lang} />;
    case "timeline":
      return <DiagTimeline lang={lang} />;
  }
}

// ─────────────────────────────────────────────────────────────────
// CV (Cv-A, narrative) — editorial mono, story-telling per project.
// ─────────────────────────────────────────────────────────────────

function CVDocument({ lang }: { lang: Lang }) {
  const c = CONTACT[lang];
  const l = LABELS[lang];
  const projects = PROJECTS[lang];

  return (
    <article className={`doc ${lang}`}>
      <header className="doc-head">
        <div className="row-bw">
          <div>
            <h1 className="name">{c.name}</h1>
            <div className="alt">{c.altName}</div>
          </div>
          <div className="head-meta">
            <div className="meta">{l.cv} · 2026</div>
            <div className="meta">{c.email}</div>
            <div className="meta">
              {c.phone} · {c.loc}
            </div>
            <div className="meta">
              {c.web} · {c.gh}
            </div>
          </div>
        </div>
        <div className="tagline">{c.headline}</div>
        <div className="rule" />
      </header>

      <section>
        <h2 className="sect">{l.profile}</h2>
        <p className="body">{c.summary}</p>
        <div className="diag-wrap">
          <DiagTimeline lang={lang} />
        </div>
      </section>

      <section>
        <h2 className="sect">{l.work}</h2>
        {projects.map((p, i) => (
          <article className="proj" key={p.slug}>
            <div className="proj-meta">
              <div className="proj-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="meta">{p.period}</div>
              <div className="meta">{p.co}</div>
              <div className="meta meta-em">{p.role}</div>
              <div className="meta meta-stack">{p.stack.join(" · ")}</div>
            </div>
            <div className="proj-body">
              <h3 className="proj-name">{p.name}</h3>
              <p className="body lede">{p.lede}</p>
              {p.diag && (
                <div className="diag-wrap">
                  <Diagram slug={p.diag} lang={lang} />
                </div>
              )}
              <div className="narrative">
                <div className="narr-block">
                  <div className="lbl">{l.problem}</div>
                  <p className="body">{p.narrative.problem}</p>
                </div>
                <div className="narr-block">
                  <div className="lbl">{l.why}</div>
                  <p className="body">{p.narrative.why}</p>
                </div>
                <div className="narr-block">
                  <div className="lbl">{l.approach}</div>
                  <p className="body">{p.narrative.approach}</p>
                </div>
                <div className="narr-block">
                  <div className="lbl">{l.result}</div>
                  <p className="body">{p.narrative.result}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="grid-3">
        <div>
          <h2 className="sect">{l.edu}</h2>
          <div className="body">Washington University in St. Louis</div>
          <div className="meta">BSBA · 2009.09 — 2016.05</div>
          <div className="meta">Missouri, USA</div>
        </div>
        <div>
          <h2 className="sect">{l.pubs}</h2>
          <div className="body">Question-to-Knowledge (Q2K)</div>
          <div className="meta">IEEE BigData 2025 · co-first author</div>
          <div className="body" style={{ marginTop: 6 }}>
            CES Innovation Awards · 2022, 2023
          </div>
          <div className="body">MWC GLOMO 2021 · Best Mobile Innovation</div>
        </div>
        <div>
          <h2 className="sect">{l.skills}</h2>
          <div className="body">
            {lang === "kr"
              ? "에이전트 시스템 · LLM 오케스트레이션 · 브라우저 에이전트 · FastAPI · Kafka · PostgreSQL · AWS · Kubernetes"
              : "Agentic systems · LLM orchestration · browser agents · FastAPI · Kafka · PostgreSQL · AWS · Kubernetes"}
          </div>
          <div className="meta meta-em" style={{ marginTop: 6 }}>
            {lang === "kr" ? "언어" : "Languages"}
          </div>
          <div className="body">Python · TypeScript · Kotlin · C++</div>
          <div className="meta meta-em" style={{ marginTop: 6 }}>
            {l.langs}
          </div>
          <div className="body">
            {lang === "kr"
              ? "한국어 · 영어 (둘 다 능통)"
              : "English · Korean (fluent)"}
          </div>
        </div>
      </section>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────
// Resume (Re-B) — per-role left-gutter metric.
// ─────────────────────────────────────────────────────────────────

function ResumeDocument({ lang }: { lang: Lang }) {
  const c = CONTACT[lang];
  const l = LABELS[lang];
  const projects = PROJECTS[lang];
  const headline = RESUME_HEADLINES[lang];

  return (
    <article className={`doc ${lang}`}>
      <header className="doc-head">
        <div className="row-bw">
          <div>
            <h1 className="name">{c.name}</h1>
            <div className="alt">{c.altName}</div>
          </div>
          <div className="head-meta">
            <div className="meta">{l.resume} · 2026</div>
            <div className="meta">
              {c.email} · {c.phone}
            </div>
            <div className="meta">{c.web}</div>
            <div className="meta">
              {c.gh} · {c.li}
            </div>
          </div>
        </div>
        <div className="tagline">{c.headline}</div>
        <div className="rule" />
        <p className="body" style={{ marginTop: 8 }}>
          {c.summary}
        </p>
      </header>

      <section>
        <h2 className="sect">{l.exp}</h2>
        {projects.map((p) => (
          <article className="role" key={p.slug}>
            <aside className="role-gutter">
              <div className="g-num">{headline[p.slug][0]}</div>
              <div className="g-lbl">{headline[p.slug][1]}</div>
              <div className="meta" style={{ marginTop: 6 }}>
                {p.period}
              </div>
            </aside>
            <div className="role-body">
              <h3 className="proj-name">{p.name}</h3>
              <div className="meta meta-em">
                {p.co} · {p.role}
              </div>
              <ul className="bullets">
                {p.built.slice(0, 4).map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="grid-3">
        <div>
          <h2 className="sect">{l.edu}</h2>
          <div className="body">
            Washington University in St. Louis · BSBA · 2016
          </div>
        </div>
        <div>
          <h2 className="sect">{l.pubs}</h2>
          <div className="body">Q2K · IEEE BigData 2025 (co-first)</div>
          <div className="body">
            CES &apos;22 / &apos;23 Innovation · MWC &apos;21 GLOMO
          </div>
        </div>
        <div>
          <h2 className="sect">{l.langs}</h2>
          <div className="body">
            {lang === "kr"
              ? "한국어 · 영어 (둘 다 능통)"
              : "English · Korean (fluent)"}
          </div>
        </div>
      </section>

      <footer>
        <div className="meta">
          {lang === "kr"
            ? "스택 — Python · TypeScript · Kotlin · FastAPI · Node.js · Kafka · PostgreSQL · Redis · AWS ECS · CDK · Kubernetes · Docker · Playwright · OpenAI · Anthropic · LangChain · TensorFlow · React / RN"
            : "Stack — Python · TypeScript · Kotlin · FastAPI · Node.js · Kafka · PostgreSQL · Redis · AWS ECS · CDK · Kubernetes · Docker · Playwright · OpenAI · Anthropic · LangChain · TensorFlow · React / RN"}
        </div>
      </footer>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────
// Picker bar — sticky horizontal control row beneath the app bar.
// ─────────────────────────────────────────────────────────────────

function PickerBar({
  doc,
  setDoc,
  lang,
  setLang,
}: {
  doc: DocType;
  setDoc: (d: DocType) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="picker-bar">
      <div className="picker-group">
        <span className="picker-label">Doc</span>
        {(["cv", "resume"] as const).map((d) => (
          <button
            key={d}
            className={`picker-btn ${doc === d ? "active" : ""}`}
            onClick={() => setDoc(d)}
          >
            {d === "cv" ? "CV" : "Resume"}
          </button>
        ))}
      </div>
      <div className="picker-group">
        <span className="picker-label">Lang</span>
        {(["en", "kr"] as const).map((lg) => (
          <button
            key={lg}
            className={`picker-btn ${lang === lg ? "active" : ""}`}
            onClick={() => setLang(lg)}
          >
            {lg.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="picker-spacer" />
      <button
        className="picker-btn picker-print"
        onClick={() => window.print()}
      >
        Print / Save as PDF
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────

export default function CVResumePage() {
  const [doc, setDoc] = useState<DocType>("resume");
  const [lang, setLang] = useState<Lang>("en");

  const Doc = doc === "cv" ? CVDocument : ResumeDocument;

  return (
    <>
      <style>{styles}</style>
      <div className={`cv-page ${mono.className}`}>
        <header className="app-bar">
          <span className="crumb">
            <b>Gabe Shin</b>
          </span>
          <span className="crumb">CV &amp; Résumé · 2026</span>
          <span className="spacer" />
          <span className="crumb">
            {doc.toUpperCase()} · {lang.toUpperCase()}
          </span>
        </header>

        <PickerBar doc={doc} setDoc={setDoc} lang={lang} setLang={setLang} />

        <main className="root">
          <div className="stack">
            <div className="col">
              <div className="sheet">
                <Doc lang={lang} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────

const styles = `
.cv-page {
  --t-h: 16px;
  --t-body: 10.5px;
  --t-meta: 9px;
  --lh-body: 1.55;
  --ink: #111;
  --ink-2: #444;
  --ink-3: #888;
  --rule: #111;
  --paper: #fbfaf6;
  --tint: #f1efe6;
  --accent: #c44a1a;
  background: #d8d4c4;
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  padding-bottom: 64px;
}

.cv-page .app-bar {
  position: sticky; top: 0; z-index: 6;
  background: #111; color: #f5f3ec;
  padding: 10px 24px;
  display: flex; align-items: baseline; gap: 18px;
  font-size: var(--t-meta); letter-spacing: .14em; text-transform: uppercase;
}
.cv-page .app-bar .crumb { opacity: .6; }
.cv-page .app-bar .crumb b { opacity: 1; color: #fff; font-weight: 500; }
.cv-page .app-bar .spacer { flex: 1; }

.cv-page .picker-bar {
  position: sticky;
  top: 38px;
  z-index: 5;
  background: #1a1a1a;
  color: #f5f3ec;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  border-top: 1px solid #2a2a2a;
  border-bottom: 1px solid #000;
  font-size: var(--t-meta);
  letter-spacing: .12em;
  text-transform: uppercase;
}
.cv-page .picker-group { display: flex; align-items: center; gap: 6px; }
.cv-page .picker-label { color: #888; margin-right: 2px; }
.cv-page .picker-spacer { flex: 1; }
.cv-page .picker-btn {
  background: transparent; color: #f5f3ec;
  border: 1px solid #333;
  padding: 4px 10px; border-radius: 3px;
  font: inherit; font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
  cursor: pointer;
  transition: background-color .12s ease, border-color .12s ease;
}
.cv-page .picker-btn:hover { border-color: #555; }
.cv-page .picker-btn.active {
  background: var(--accent); border-color: var(--accent); color: #fff;
}
.cv-page .picker-btn.picker-print {
  background: var(--accent); border-color: var(--accent); color: #fff;
}
.cv-page .picker-btn.picker-print:hover { filter: brightness(1.08); }

.cv-page .stack {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 28px;
  padding: 28px;
  align-items: start;
}
.cv-page .col { display: flex; flex-direction: column; gap: 28px; min-width: 0; }

.cv-page .sheet {
  background: var(--paper);
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 56px 56px 64px;
  box-shadow: 0 1px 0 rgba(0,0,0,.06), 0 30px 60px -28px rgba(0,0,0,.35);
  box-sizing: border-box;
  min-width: 0;
}
.cv-page .sheet + .sheet { margin-top: 28px; }

.cv-page .doc { font-size: var(--t-body); line-height: var(--lh-body); }
.cv-page .doc * { box-sizing: border-box; }
.cv-page .doc .name {
  font-family: inherit; font-weight: 700; font-size: var(--t-h);
  letter-spacing: -.01em; margin: 0 0 2px;
  white-space: nowrap;
}
.cv-page .doc .alt { font-size: var(--t-meta); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); }
.cv-page .doc .meta {
  font-size: var(--t-meta); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2);
}
.cv-page .doc .meta-em { color: var(--ink); }
.cv-page .doc .meta-stack { text-transform: none; letter-spacing: 0; color: var(--ink-3); font-size: var(--t-meta); }

.cv-page .doc .head-meta { text-align: right; display: flex; flex-direction: column; gap: 2px; flex: 0 1 auto; min-width: 0; }
.cv-page .doc .row-bw { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
.cv-page .doc .row-bw > div:first-child { flex: 1 1 auto; min-width: 0; }
.cv-page .doc .tagline { margin-top: 14px; color: var(--ink); font-size: var(--t-body); }
.cv-page .doc .rule { height: 1px; background: var(--rule); margin: 16px 0 22px; }

.cv-page .doc h2.sect {
  font-family: inherit; font-weight: 700;
  font-size: var(--t-meta); letter-spacing: .22em; text-transform: uppercase;
  margin: 0 0 12px;
  border-top: 1px solid var(--rule);
  padding-top: 10px;
  display: flex; align-items: center; gap: 8px;
}
.cv-page .doc h2.sect::before {
  content: ""; width: 8px; height: 8px; background: var(--accent); display: inline-block;
}

.cv-page .doc .body { font-size: var(--t-body); line-height: var(--lh-body); margin: 0; color: var(--ink); }
.cv-page .doc .lede { color: var(--ink); }
.cv-page .doc .lbl { font-size: var(--t-meta); letter-spacing: .18em; text-transform: uppercase; color: var(--ink-2); margin: 0 0 6px; }
.cv-page .doc ul.bullets { list-style: none; padding: 0; margin: 0; }
.cv-page .doc ul.bullets li {
  font-size: var(--t-body); line-height: var(--lh-body);
  padding-left: 14px; position: relative; margin-bottom: 4px;
}
.cv-page .doc ul.bullets li::before {
  content: "›"; position: absolute; left: 0; top: 0; color: var(--accent); font-weight: 700;
}

.cv-page .doc ul.metrics {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: row; flex-wrap: wrap; gap: 6px 14px;
}
.cv-page .doc ul.metrics li {
  display: inline-flex; align-items: baseline; gap: 8px;
  font-size: var(--t-body);
}
.cv-page .doc ul.metrics .m-num {
  font-weight: 700; font-size: var(--t-body); letter-spacing: -.01em;
  color: var(--ink);
  border-right: 1px solid var(--ink); padding-right: 8px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.cv-page .doc ul.metrics .m-lbl { color: var(--ink-2); font-size: var(--t-meta); letter-spacing: .1em; text-transform: uppercase; }

.cv-page .doc section { margin-bottom: 22px; }
.cv-page .doc .grid-3 {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px;
}

.cv-page .doc .proj { display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 20px; padding: 20px 0; border-top: 1px dotted #cdc8b6; }
.cv-page .doc .proj:first-of-type { border-top: 0; padding-top: 6px; }
.cv-page .doc .proj-meta { display: flex; flex-direction: column; gap: 4px; }
.cv-page .doc .proj-num {
  font-weight: 700; font-size: var(--t-body); color: var(--accent);
  letter-spacing: .04em;
}
.cv-page .doc .proj-name { font-family: inherit; font-weight: 700; font-size: var(--t-body); margin: 0 0 4px; letter-spacing: -.005em; }
.cv-page .doc .proj-body .lede { margin-bottom: 8px; }

/* Narrative blocks (CV) */
.cv-page .doc .narrative {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}
.cv-page .doc .narr-block .lbl { margin-bottom: 4px; }
.cv-page .doc .narr-block .body { color: var(--ink); }

.cv-page .diag-wrap {
  background: var(--tint);
  padding: 12px 14px;
  margin: 8px 0 12px;
  border: 1px solid #e3dfd1;
}
.cv-page .dbox { fill: var(--paper); stroke: var(--ink); stroke-width: 1; }
.cv-page .dbox-fill { fill: #efece0; }
.cv-page .dbox-dash { fill: none; stroke: var(--ink); stroke-width: 1; stroke-dasharray: 3 3; }
.cv-page .dsub { fill: #fff; stroke: #444; stroke-width: .75; }
.cv-page .dlbl { font-family: inherit; font-size: 7.5px; fill: var(--ink); letter-spacing: .04em; }
.cv-page .dlbl-b { font-weight: 700; }
.cv-page .dlbl-m { fill: var(--ink-3); }
.cv-page .darr { stroke: var(--ink); stroke-width: 1; fill: none; }
.cv-page .darr-d { stroke-dasharray: 3 2; }

.cv-page .doc .role { display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 20px; padding: 14px 0; border-top: 1px dotted #cdc8b6; }
.cv-page .doc .role:first-of-type { border-top: 0; padding-top: 6px; }
.cv-page .doc .role-gutter { border-left: 2px solid var(--accent); padding-left: 12px; }
.cv-page .doc .role-gutter .g-num {
  font-weight: 700; font-size: var(--t-body);
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.cv-page .doc .role-gutter .g-lbl {
  font-size: var(--t-meta); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-2);
  margin-top: 2px;
}

.cv-page .doc footer { margin-top: 18px; border-top: 1px solid var(--ink); padding-top: 10px; }

.cv-page .doc.kr { line-height: 1.65; }
.cv-page .doc.kr h2.sect { letter-spacing: .04em; }
.cv-page .doc.kr .meta { letter-spacing: .04em; }
.cv-page .doc.kr .alt { letter-spacing: .04em; }

/* Mobile — collapse multi-column sheet layout, drop fixed gutters,
   shrink edge padding so content fits on phone screens (~375px wide). */
@media (max-width: 720px) {
  .cv-page {
    --t-body: 12.5px;
    --t-meta: 9.5px;
    --t-h: 18px;
    padding-bottom: 32px;
  }

  .cv-page .app-bar {
    padding: 8px 14px;
    gap: 12px;
    flex-wrap: wrap;
    letter-spacing: .1em;
  }
  .cv-page .app-bar .spacer { display: none; }

  .cv-page .picker-bar {
    position: static;
    padding: 8px 14px;
    gap: 12px;
    flex-wrap: wrap;
    letter-spacing: .08em;
  }
  .cv-page .picker-spacer { display: none; }
  .cv-page .picker-btn.picker-print {
    margin-left: auto;
    padding: 4px 8px;
  }

  .cv-page .stack {
    padding: 16px 12px;
    gap: 16px;
  }

  .cv-page .sheet {
    padding: 24px 20px 32px;
    max-width: none;
    box-shadow: 0 1px 0 rgba(0,0,0,.06), 0 12px 28px -16px rgba(0,0,0,.3);
  }

  .cv-page .doc .row-bw {
    flex-direction: column;
    gap: 12px;
  }
  .cv-page .doc .head-meta {
    text-align: left;
    align-items: flex-start;
  }
  .cv-page .doc .name {
    white-space: normal;
    overflow-wrap: break-word;
  }
  .cv-page .doc .rule { margin: 14px 0 18px; }

  .cv-page .doc .proj {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    padding: 16px 0;
  }
  .cv-page .doc .proj-meta {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px 12px;
    align-items: baseline;
  }
  .cv-page .doc .proj-meta .meta-stack {
    flex-basis: 100%;
    overflow-wrap: anywhere;
  }

  .cv-page .doc .role {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
    padding: 14px 0;
  }
  .cv-page .doc .role-gutter {
    border-left: 0;
    border-top: 2px solid var(--accent);
    padding-left: 0;
    padding-top: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 12px;
  }
  .cv-page .doc .role-gutter .meta { margin-top: 0 !important; }

  .cv-page .doc .grid-3 {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
  }

  .cv-page .doc section { margin-bottom: 18px; }

  .cv-page .diag-wrap { padding: 10px 8px; }
}

/* Print */
@media print {
  /* Per-page margins live on @page so every page (not just first/last) gets
     breathing room top/bottom. Sheet padding is zeroed below to avoid
     doubling. Trade-off: non-zero @page margin lets Chromium render its
     default header/footer (URL, date, page #) in that band — users can
     turn it off via the print dialog's "Headers and footers" toggle. */
  @page {
    size: letter;
    margin: 0.5in 0.6in;
  }
  /* Cream paper looks nice on screen but wastes toner / looks dingy in PDFs.
     Force pure white in print, including the diagram tint band. */
  .cv-page {
    --paper: #fff;
    --tint: #fff;
  }
  html, body {
    background: var(--paper) !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .cv-page {
    background: var(--paper) !important;
    padding: 0 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .cv-page .app-bar,
  .cv-page .picker-bar { display: none !important; }
  .cv-page .stack {
    display: block !important;
    padding: 0 !important;
    gap: 0 !important;
    margin: 0 !important;
  }
  .cv-page .col { gap: 0 !important; margin: 0 !important; }
  .cv-page .sheet {
    box-shadow: none !important;
    max-width: none !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: var(--paper) !important;
  }
  .cv-page .sheet + .sheet { margin-top: 0 !important; page-break-before: always; }

  /* Tighten vertical rhythm for print — desktop spacing wastes paper. */
  .cv-page .doc section { margin-bottom: 14px; }
  .cv-page .doc .proj { padding: 14px 0; }
  .cv-page .doc .role { padding: 10px 0; }
  .cv-page .doc .narrative { gap: 8px; }

  /* Keep short blocks intact, but let .proj (CV entries) split across pages —
     projects are taller than a page region, so avoiding breaks inside them
     leaves large gaps at the bottom of the prior page. */
  .cv-page .doc .narr-block,
  .cv-page .doc .role,
  .cv-page .doc .diag-wrap { page-break-inside: avoid; }

  /* Don't strand headings or project names at the bottom of a page. */
  .cv-page .doc h2.sect,
  .cv-page .doc .proj-name { page-break-after: avoid; }
}
`;
