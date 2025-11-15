import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "신태섭 & 노한솔 | Wedding",
  description:
    "신태섭 & 노한솔의 결혼 초대 허브입니다. 프리미어 파티와 주요 업데이트를 한 곳에서 확인하세요.",
};

export default function WeddingHomePage() {
  return (
    <main className="min-h-screen bg-[#080103] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-10 px-6 text-center">
        <p className="text-sm tracking-[0.4em] text-[#FF6B81]">
          WEDDING LANDING HUB
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          곧 이곳에서 결혼과 관련된 모든 소식을 안내드릴 예정이에요.
        </h1>
        <p className="max-w-2xl text-lg text-[#E4C4CE]">
          청첩장, 모임 정보, 그리고 특별한 업데이트를 여기에 정리할 예정입니다.
          그때까지는 프리미어 파티 페이지에서 세부 정보를 확인해 주세요.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white"
          >
            Back to Portfolio
          </Link>
          <Link
            href="/wedding/party"
            className="rounded-full bg-[#FF5C8A] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#ff759c]"
          >
            View Party Page
          </Link>
        </div>
        <p className="text-xs uppercase tracking-[0.5em] text-white/40">
          신태섭 & 노한솔
        </p>
      </section>
    </main>
  );
}
