"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const APP_STORE_URL = "https://apps.apple.com/app/id6759096853";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.jaksam.app";

/* ------------------------------------------------------------------ */
/* Animations                                                          */
/* ------------------------------------------------------------------ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/* Store badges                                                        */
/* ------------------------------------------------------------------ */

function AppStoreBadge() {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-14 items-center gap-3 rounded-2xl bg-[#1a1400] px-6 shadow-lg shadow-[#1a1400]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1a1400]/25"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 shrink-0 fill-white"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] tracking-wide text-white/60">
          Download on the
        </span>
        <span className="text-[15px] font-semibold leading-tight text-white">
          App Store
        </span>
      </div>
    </a>
  );
}

function PlayStoreBadge() {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-14 items-center gap-3 rounded-2xl bg-[#1a1400] px-6 shadow-lg shadow-[#1a1400]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1a1400]/25"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 shrink-0 fill-white"
      >
        <path d="M3 22V2l18 10L3 22z" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] tracking-wide text-white/60">
          GET IT ON
        </span>
        <span className="text-[15px] font-semibold leading-tight text-white">
          Google Play
        </span>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: "🎙",
    title: "AI 레슨 요약",
    description:
      "레슨을 녹음하면 AI가 핵심 내용을 정리하고 타임라인으로 요약합니다.",
  },
  {
    icon: "📋",
    title: "맞춤 연습 계획",
    description:
      "AI가 레슨 내용을 기반으로 맞춤 연습 계획을 자동으로 생성합니다.",
  },
  {
    icon: "⏱",
    title: "연습 기록",
    description:
      "타이머로 연습 시간을 측정하고, 집중도를 스스로 확인합니다.",
  },
  {
    icon: "🏅",
    title: "목표와 성취",
    description:
      "스스로 목표를 세우고, 피드백을 남기며, 배지를 통해 성장을 확인합니다.",
  },
  {
    icon: "📊",
    title: "선생님 대시보드",
    description:
      "학생의 연습 현황과 진도를 한눈에 파악하고 피드백합니다.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "부모님 연결",
    description:
      "주간 리포트로 아이의 레슨과 연습 상황을 함께 확인합니다.",
  },
];

const roles = [
  {
    label: "학생",
    accent: "#e8a44a",
    text: "혼자 연습하는 시간에도 레슨의 핵심을 놓치지 않고, 스스로 계획하고 성장할 수 있습니다.",
  },
  {
    label: "선생님",
    accent: "#6b8e5b",
    text: "학생의 연습 상태를 정확히 파악하고, 더 효율적으로 피드백할 수 있습니다.",
  },
  {
    label: "부모님",
    accent: "#7b7bb5",
    text: "아이의 음악 학습 과정을 구체적으로 이해하고, 성장을 함께 응원할 수 있습니다.",
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function JaksamLanding() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: "var(--font-noto-sans)" }}
    >
      {/* ---- Hero ---- */}
      <section
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, #fffbed 0%, #fff8e0 50%, #fffbed 100%)",
        }}
      >
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
            style={{ background: "#f0d68a" }}
          />
        </div>

        <motion.div
          className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-24 text-center sm:pt-32"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <Image
              src="/jaksam-logo.png"
              width={88}
              height={88}
              alt="작샘 로고"
              className="rounded-[22px] shadow-xl shadow-black/10"
              priority
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-8 text-sm font-semibold uppercase tracking-[0.25em]"
            style={{ color: "#a08540" }}
          >
            Music Education App
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={2}
            className="mt-4 text-6xl font-bold tracking-tight sm:text-7xl"
            style={{ fontFamily: "var(--font-eczar)", color: "#1a1400" }}
          >
            작샘
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-5 text-xl font-medium sm:text-2xl"
            style={{ color: "#3d3220" }}
          >
            레슨 이후에도 음악이 이어지도록
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={4}
            className="mt-4 max-w-lg text-base leading-relaxed"
            style={{ color: "#6b5d45" }}
          >
            학생, 선생님, 부모님을 연결하는 음악교육 앱.
            <br />
            AI가 레슨을 정리하고, 연습 계획을 세우고, 성장을 함께 지켜봅니다.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <AppStoreBadge />
            <PlayStoreBadge />
          </motion.div>
        </motion.div>
      </section>

      {/* ---- Features ---- */}
      <section style={{ background: "#fffdf5" }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#a08540" }}
            >
              Features
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-3xl font-bold sm:text-4xl"
              style={{ fontFamily: "var(--font-eczar)", color: "#1a1400" }}
            >
              주요 기능
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="group rounded-3xl border border-[#e8dfc8] bg-white/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4c9a8]/30"
              >
                <span className="text-3xl" aria-hidden="true">
                  {f.icon}
                </span>
                <h3
                  className="mt-4 text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-eczar)",
                    color: "#1a1400",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#6b5d45" }}
                >
                  {f.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---- For whom ---- */}
      <section style={{ background: "#fffbed" }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#a08540" }}
            >
              For Everyone
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-3xl font-bold sm:text-4xl"
              style={{ fontFamily: "var(--font-eczar)", color: "#1a1400" }}
            >
              누구를 위한 앱인가요?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-14 grid gap-5 sm:grid-cols-3"
          >
            {roles.map((role, i) => (
              <motion.div
                key={role.label}
                variants={fadeUp}
                custom={i}
                className="relative overflow-hidden rounded-3xl border border-[#e8dfc8] bg-white/80 p-8 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4c9a8]/30"
              >
                <div
                  className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: `${role.accent}18` }}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: role.accent }}
                  />
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "var(--font-eczar)",
                    color: "#1a1400",
                  }}
                >
                  {role.label}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "#6b5d45" }}
                >
                  {role.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---- Philosophy ---- */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #f7f0dc 0%, #fffbed 100%)",
        }}
      >
        <div className="mx-auto max-w-2xl px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-center text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: "#a08540" }}
            >
              Our Story
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-center text-3xl font-bold sm:text-4xl"
              style={{ fontFamily: "var(--font-eczar)", color: "#1a1400" }}
            >
              작샘의 이야기
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-12 flex flex-col gap-6 text-base leading-[1.85]"
            >
              <p style={{ color: "#3d3220" }}>
                작샘은 기술을 위한 기술이 아닙니다. 학생이 자신의 연습을
                이해하고, 선생님이 더 깊이 있게 지도하며, 부모님이 그 과정을
                함께 바라볼 수 있도록 하기 위한 교육적 시도입니다.
              </p>
              <p style={{ color: "#3d3220" }}>
                음악교육이 레슨 시간 안에서 끝나는 것이 아니라, 학생의 일상
                속에서 이어지고 자라나야 한다는 믿음에서 태어났습니다. 레슨에서
                배운 내용이 집에서도 자연스럽게 이어질 수 있도록, 학생이 더
                주도적으로 연습하고 스스로 성장을 돌아볼 수 있도록 돕는
                것—그것이 작샘이 추구하는 방향입니다.
              </p>
              <p style={{ color: "#3d3220" }}>
                작샘은 그 믿음에서 태어난 작은 시작이며, 앞으로도 계속 발전해
                나갈 교육의 한 방향입니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section style={{ background: "#1a1400" }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="flex flex-col items-center"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl font-bold sm:text-4xl"
              style={{ fontFamily: "var(--font-eczar)", color: "#fffbed" }}
            >
              지금 시작해 보세요
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-4 max-w-sm text-base leading-relaxed"
              style={{ color: "#c8b88a" }}
            >
              작샘은 iOS와 Android에서 무료로 다운로드할 수 있습니다.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-3 rounded-2xl border border-[#fffbed]/20 bg-[#fffbed]/10 px-6 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fffbed]/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0"
                  style={{ fill: "#fffbed" }}
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span
                    className="text-[10px] tracking-wide"
                    style={{ color: "#c8b88a" }}
                  >
                    Download on the
                  </span>
                  <span
                    className="text-[15px] font-semibold leading-tight"
                    style={{ color: "#fffbed" }}
                  >
                    App Store
                  </span>
                </div>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-3 rounded-2xl border border-[#fffbed]/20 bg-[#fffbed]/10 px-6 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fffbed]/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0"
                  style={{ fill: "#fffbed" }}
                >
                  <path d="M3 22V2l18 10L3 22z" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span
                    className="text-[10px] tracking-wide"
                    style={{ color: "#c8b88a" }}
                  >
                    GET IT ON
                  </span>
                  <span
                    className="text-[15px] font-semibold leading-tight"
                    style={{ color: "#fffbed" }}
                  >
                    Google Play
                  </span>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
