"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const images: string[] = [
  "/hansol/lotte-concert-2026/image0.jpeg",
  "/hansol/lotte-concert-2026/image1.jpeg",
  "/hansol/lotte-concert-2026/image2.jpeg",
  "/hansol/lotte-concert-2026/image3.jpeg",
  "/hansol/lotte-concert-2026/image4.jpeg",
  "/hansol/lotte-concert-2026/image5.jpeg",
  "/hansol/lotte-concert-2026/image6.jpeg",
  "/hansol/lotte-concert-2026/image7.jpeg",
  "/hansol/lotte-concert-2026/image8.jpeg",
  "/hansol/lotte-concert-2026/image9.jpeg",
  "/hansol/lotte-concert-2026/image10.jpeg",
  "/hansol/lotte-concert-2026/image11.jpeg",
  "/hansol/lotte-concert-2026/image12.jpeg",
  "/hansol/lotte-concert-2026/image13.jpeg",
  "/hansol/lotte-concert-2026/image14.jpeg",
  "/hansol/lotte-concert-2026/image15.jpeg",
  "/hansol/lotte-concert-2026/image16.jpeg",
  "/hansol/lotte-concert-2026/image17.jpeg",
  "/hansol/lotte-concert-2026/image18.jpeg",
  "/hansol/lotte-concert-2026/image19.jpeg",
  "/hansol/lotte-concert-2026/image20.jpeg",
  "/hansol/lotte-concert-2026/image21.jpeg",
  "/hansol/lotte-concert-2026/image22.jpeg",
  "/hansol/lotte-concert-2026/image23.jpeg",
  "/hansol/lotte-concert-2026/image26.jpeg",
  "/hansol/lotte-concert-2026/image27.jpeg",
  "/hansol/lotte-concert-2026/image28.jpeg",
  "/hansol/lotte-concert-2026/image29.jpeg",
  "/hansol/lotte-concert-2026/image30.jpeg",
  "/hansol/lotte-concert-2026/image31.jpeg",
];

export default function LotteConcert2026() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.max(0, Math.min(images.length - 1, index)));
  }, []);

  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyOverscroll = document.body.style.overscrollBehavior;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.overscrollBehavior = originalBodyOverscroll;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex h-[100dvh] w-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, index) => (
          <div
            key={src}
            className="relative h-full w-screen shrink-0 snap-center"
          >
            <Image
              src={src}
              alt={`Lotte Concert 2026 photo ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority={index < 2}
            />
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tabular-nums text-white/85 backdrop-blur-sm"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}
