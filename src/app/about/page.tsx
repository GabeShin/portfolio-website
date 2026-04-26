"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="w-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ translateY: [20, 0], opacity: [0, 1] }}
      >
        <div className="max-w-2xl flex-wrap">
          <h1 className="my-8">
            Hello, I am <h1 className="text-primary inline">Gabe Shin</h1>
          </h1>
          <p>
            AI engineer with 7+ years of experience building production AI
            systems, distributed backends, and developer-facing products in
            startup environments. Based in Seoul, passively looking for
            impact-focused AI engineering or forward-deployed roles.
          </p>
          <div className="grid grid-cols-3 my-8">
            <Image
              alt="Profile Image"
              src="/about-me-image.jpg"
              width={200}
              height={300}
            />
            <div className="col-start-2 col-end-4">
              <h2 className="text-primary font-semibold mb-2">Contacts</h2>
              <p>✉️ gabeshin.ts@gmail.com</p>
              <p>🇰🇷 +82 10-3382-0650</p>
              <h2 className="text-primary font-semibold my-2">Channels</h2>
              <a className="text-text" href="https://github.com/gabeshin">
                Github
              </a>
              <br />
              <a
                className="text-text"
                href="https://www.linkedin.com/in/gabeshin0929"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h1 className="text-primary my-8">Introduction</h1>
            <p>
              I work at the intersection of AI systems engineering and product.
              Recent focus is agentic systems and browser automation,
              production-scale data pipelines, and reusable evaluation harnesses
              that compress agent iteration. I enjoy taking ambiguous customer
              problems through to deployed software, and I think carefully
              about when deterministic logic beats LLM calls based on cost,
              accuracy, and latency tradeoffs.
            </p>
          </div>
          <div>
            <h1 className="text-primary my-8">Recent Work</h1>
            <p>
              At{" "}
              <Link className="text-blue-500" href="https://enhans.ai">
                Enhans
              </Link>
              , I architect{" "}
              <Link
                className="text-blue-500"
                href="https://act-2.enhans.ai/ko"
              >
                ACT-2
              </Link>
              , a browser automation platform organized as SDK → Runtime →
              Brain. ACT-2 reached as high as 2nd on the Mind2Web web-agent
              benchmark and currently sits at 3rd. Before that I designed the
              AgentOS dynamic-pricing product-matching pipeline — a three-stage
              funnel (cache → rule-based → selective LLM) sustaining 120K+
              SKUs/hour with ~95% lower per-unit cost than the prior LLM-only
              baseline.
            </p>
            <br />
            <p>
              I co-first-authored{" "}
              <Link
                className="text-blue-500"
                href="https://arxiv.org/abs/2509.01182"
              >
                Question-to-Knowledge (Q2K)
              </Link>{" "}
              at IEEE BigData 2025 — an interpretable multi-agent framework for
              product mapping (95.62% accuracy). Outside Enhans I co-founded{" "}
              <Link className="text-blue-500" href="/jaksam">
                Jaksam (작샘)
              </Link>
              , a cross-platform music-lesson app live on App Store and Google
              Play.
            </p>
            <br />
            <p>
              A topic I keep coming back to: agent harnesses. I built the AFK
              Research Test Harness — inspired by Karpathy&apos;s autoresearch
              — and applied it both to ACT-2&apos;s agentic loop and to growing
              the Korean e-commerce rulebook (~6,400 regex rules) for AgentOS
              matching. One conclusion worth sharing: fully automated agent
              self-improvement loops aren&apos;t cost- or time-effective at the
              current frontier; the strongest results come from human insight +
              AI assistance.
            </p>
          </div>
          <div>
            <h1 className="text-primary my-8">Work Experience</h1>
            <h2 className="font-semibold">
              <Link href="https://enhans.ai">Enhans</Link>
            </h2>
            <p>
              South Korea-based AI startup building Large Action Model
              (LAM)-based agents and AgentOS, a commerce automation operating
              system.
            </p>
            <div className="grid grid-cols-4 my-4">
              <div className="col-start-1">
                <p className="font-semibold">AI Engineer</p>
                <p className="text-subtext">2025.04 - Present</p>
              </div>
              <div className="col-start-2 col-end-5">
                <p>
                  ◦ Architected ACT-2 (browser automation platform; SDK →
                  Runtime → Brain). Reached as high as 2nd on the Mind2Web
                  benchmark.
                </p>
                <p>
                  ◦ Designed the AgentOS product-matching pipeline — three-stage
                  funnel sustaining 120K+ SKUs/hour and 300K+ requests/day; ~95%
                  cost reduction and 5x throughput vs. the prior LLM-only
                  baseline.
                </p>
                <p>
                  ◦ Built the Product Rulebook Extractor (~6,400 regex rules,
                  ~11,000 tests) for Korean e-commerce. The rulebook is grown
                  by an LLM agent harness rather than authored by hand.
                </p>
                <p>
                  ◦ Built the AFK Research Test Harness for unattended agent
                  iteration with budget-aware optimization and revert logic.
                </p>
                <p>
                  ◦ Co-first author, &quot;Question-to-Knowledge (Q2K)&quot; —
                  IEEE BigData 2025 (95.62% accuracy).
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 my-4">
              <div className="col-start-1">
                <p className="font-semibold">Self-directed sabbatical</p>
                <p className="text-subtext">2024.05 - 2025.04</p>
              </div>
              <div className="col-start-2 col-end-5">
                <p>
                  ◦ Took a year in Berlin to build engineering and AI side
                  projects, read deeply, and travel after eight years at one
                  company.
                </p>
              </div>
            </div>
            <h2 className="font-semibold mt-8">
              <Link href="https://www.visual.camp">Visualcamp</Link>
            </h2>
            <p>
              Provides a mobile gaze-tracking SDK used by developers worldwide.
            </p>
            <div className="grid grid-cols-4 my-4">
              <div className="col-start-1">
                <p className="font-semibold">Backend Engineer</p>
                <p className="text-subtext">2022.09 - 2024.05</p>
              </div>
              <div className="col-start-2 col-end-5">
                <p>
                  ◦ Built and operated scalable backend services on Kubernetes;
                  introduced Fluentd / Grafana monitoring and event-driven
                  workflows.
                </p>
                <p>
                  ◦ Applied TDD across the team to improve maintainability.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 my-4">
              <div className="col-start-1">
                <p className="font-semibold">Tech Lead</p>
                <p className="text-subtext">2020.03 - 2022.09</p>
              </div>
              <div className="col-start-2 col-end-5">
                <p>
                  ◦ Owned the SeeSo SDK platform roadmap; expanded support to
                  six platforms supporting 5M+ monthly authentications.
                </p>
                <p>
                  ◦ Refactored a monolithic auth server to microservices (~70%
                  server cost reduction); designed CDN-fronted global
                  authentication; introduced AWS CDK as the team&apos;s IaC
                  standard.
                </p>
                <p>
                  ◦ Contributed to the C++ SDK core and TensorFlow integration
                  for cross-platform inference.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 my-4">
              <div className="col-start-1">
                <p className="font-semibold">Machine Learning Researcher</p>
                <p className="text-subtext">2018.09 - 2020.03</p>
              </div>
              <div className="col-start-2 col-end-5">
                <p>
                  ◦ Reproduced state-of-the-art gaze-tracking models; built
                  crowdsourced data pipelines with engineering.
                </p>
                <p>
                  ◦ Improved model accuracy by 25%, reaching SotA on mobile
                  gaze tracking.
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-primary my-8">Awards & Publications</h1>
          <div className="grid grid-cols-4 my-4">
            <div className="col-start-1">
              <p className="font-semibold">IEEE BigData 2025</p>
              <p className="text-subtext">Co-first author</p>
            </div>
            <div className="col-start-2 col-end-5">
              <p>
                ◦{" "}
                <Link
                  className="text-blue-500"
                  href="https://arxiv.org/abs/2509.01182"
                >
                  Question-to-Knowledge (Q2K): Multi-Agent Generation of
                  Inspectable Facts for Product Mapping
                </Link>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 my-4">
            <div className="col-start-1">
              <p className="font-semibold">SeeSo SDK</p>
              <p className="text-subtext">Visualcamp</p>
            </div>
            <div className="col-start-2 col-end-5">
              <p>◦ CES 2023 Innovation Award</p>
              <p>◦ CES 2022 Innovation Award</p>
              <p>◦ MWC 2021 GLOMO Award, Best Mobile Innovation</p>
            </div>
          </div>
          <h1 className="text-primary my-8">Education</h1>
          <div className="grid grid-cols-4 my-4">
            <div className="col-start-1">
              <p className="font-semibold">
                Washington University in St. Louis - Missouri, USA
              </p>
              <p className="text-subtext">2009.09 - 2016.05</p>
            </div>
            <div className="col-start-2 col-end-5">
              <p>◦ Bachelor of Business Administration (BSBA) in 2016</p>
            </div>
          </div>
          <div className="grid grid-cols-4 my-4">
            <div className="col-start-1">
              <p className="font-semibold">
                Shawniganlake Secondary School - BC, Canada
              </p>
              <p className="text-subtext">2005.09 - 2009.05</p>
            </div>
            <div className="col-start-2 col-end-5">
              <p>◦ Graduated with Academic Honors</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
