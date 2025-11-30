"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type GalleryPlaceholder = {
  id: string;
  label: string;
  height: string;
  bg: string;
};

const weddingImages: string[] = [
  "/1835.jpeg",
  "/3120.jpeg",
  "/4607.jpeg",
  "/0134.jpeg",
  "/0316.jpeg",
  "/0655.jpeg",
  "/0691.jpeg",
  "/0856.jpeg",
  "/0907.jpeg",
  "/1044.jpeg",
  "/1164.jpeg",
  "/1245.jpeg",
  "/1308.jpeg",
  "/1750.jpeg",
  "/2179.jpeg",
  "/2295.jpeg",
  "/2440.jpeg",
  "/2881.jpeg",
  "/3432.jpeg",
  "/3543.jpeg",
  "/3592.jpeg",
  "/3700.jpeg",
  "/4089.jpeg",
  "/4231.jpeg",
  "/4391.jpeg",
  "/4750.jpeg",
  "/4880.jpeg",
  "/5013.jpeg",
  "/5098.jpeg",
  "/5326.jpeg",
];

const partyPlaceholders: GalleryPlaceholder[] = [
  { id: "p1", label: "파티 사진 예정", height: "h-48", bg: "bg-[#f6f7fb]" },
  { id: "p2", label: "파티 사진 예정", height: "h-44", bg: "bg-[#f5f9ff]" },
  { id: "p3", label: "파티 사진 예정", height: "h-52", bg: "bg-[#f8f8fd]" },
  { id: "p4", label: "파티 사진 예정", height: "h-46", bg: "bg-[#f7fbff]" },
];

const formatCountdown = (dateIso: string) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const target = new Date(dateIso);
  const diffMs = target.getTime() - startOfToday.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (!Number.isFinite(days)) {
    return "D-?";
  }
  if (days > 0) return `D-${days}`;
  if (days === 0) return "D-DAY";
  return `D+${Math.abs(days)}`;
};

export default function WeddingHome() {
  const mainWeddingDate = "2026-01-31T11:00:00+09:00";
  const mainWeddingCountdown = formatCountdown(mainWeddingDate);
  const partyDate = "2025-12-13T12:00:00+09:00";
  const partyCountdown = formatCountdown(partyDate);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [orderedImages, setOrderedImages] = useState<string[]>(weddingImages);

  const openImage = (index: number) => setActiveImageIndex(index);
  const closeImage = () => setActiveImageIndex(null);
  const showPrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + orderedImages.length) % orderedImages.length,
    );
  };
  const showNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev === null ? null : (prev + 1) % orderedImages.length,
    );
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    setOrderedImages((current) => {
      const next = [...current];
      const targetIndex =
        direction === "left"
          ? (index - 1 + next.length) % next.length
          : (index + 1) % next.length;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  return (
    <>
      <main
        className="relative min-h-screen overflow-hidden text-[#0f0a1a]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(240, 232, 244, 0.95) 0%, rgba(238, 226, 232, 0.95) 50%, rgba(227, 234, 246, 0.94) 100%), radial-gradient(circle at 20% 20%, rgba(255, 183, 197, 0.18), transparent 28%), radial-gradient(circle at 80% 0%, rgba(156, 211, 255, 0.16), transparent 32%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#ffafc5]/40 blur-[120px]" />
          <div className="absolute right-10 top-32 h-72 w-72 rounded-full bg-[#a6e8ff]/35 blur-[140px]" />
          <div className="absolute left-1/3 bottom-10 h-80 w-80 rounded-full bg-[#d8c3ff]/35 blur-[170px]" />
        </div>

        <section className="relative mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-14 pt-20 md:gap-8 md:pt-24">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-base uppercase tracking-[0.35em] text-[#b94b72]">
              Gabe & Hansol
            </p>
            <h1 className="text-5xl font-semibold leading-tight text-[#0b0613] drop-shadow-[0_6px_18px_rgba(12,8,22,0.12)] md:text-6xl">
              Wedding Hub
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-[#3a2f4b]">
              방문해 주신 모든 분들 감사합니다.
            </p>
          </div>
          <div className="mx-auto flex max-w-xl flex-col gap-4 rounded-3xl border border-white/50 bg-white/70 p-5 text-center shadow-[0_22px_70px_rgba(26,21,40,0.12)] backdrop-blur">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b94b72]">
              Wedding Day
            </span>
            <span className="text-4xl font-bold text-[#1a1528]">
              {mainWeddingCountdown}
            </span>
            <p className="text-sm text-[#4d4164]">2026년 1월 31일 · 11:00</p>
          </div>
          <div className="mx-auto flex w-full max-w-md flex-col gap-3">
            <Link
              href="/wedding/invitation"
              className="flex items-center justify-between gap-3 rounded-full bg-[#b94b72] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_16px_40px_rgba(185,75,114,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(185,75,114,0.35)]"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                {mainWeddingCountdown}
              </span>
              <span className="flex-1 text-center">모바일 청첩장 보러가기</span>
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/wedding/party"
              className="flex items-center justify-between gap-3 rounded-full border border-[#ff6b81]/40 bg-gradient-to-r from-[#12060c] via-[#1a0b12] to-[#2a0f1d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_16px_40px_rgba(255,107,129,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(255,107,129,0.35)]"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                {partyCountdown}
              </span>
              <span className="flex-1 text-center">
                청첩파티 초대장 보러가기
              </span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        <section className="relative mx-auto max-w-5xl px-6 pb-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#d84f77]">
                웨딩 사진 갤러리
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#4d4164]">
              Scroll →
            </span>
          </div>
          <div className="relative mt-8">
            <div className="-mx-6 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-3">
                {orderedImages.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => openImage(index)}
                    className="group relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_12px_30px_rgba(26,21,40,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,21,40,0.12)] sm:h-52 sm:w-72 md:h-56 md:w-80"
                  >
                    <Image
                      src={src}
                      alt={`Wedding photo ${index + 1}`}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 30vw"
                      priority={index < 3}
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur">
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
            onClick={closeImage}
          >
            닫기
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white transition hover:bg-white/25"
            onClick={showPrev}
            aria-label="이전 사진"
          >
            ←
          </button>
          <div className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-black">
            <Image
              src={orderedImages[activeImageIndex]}
              alt={`Wedding photo ${activeImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white transition hover:bg-white/25"
            onClick={showNext}
            aria-label="다음 사진"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
