import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "신태섭 & 노한솔 | 모바일 청첩장",
  description: "신태섭 & 노한솔 모바일 청첩장이 준비 중입니다.",
};

export default function WeddingInvitationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#f6f2f8] via-[#fefbff] to-[#f2f7ff] px-6 text-center text-[#1a1528]">
      <div className="flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-white/60 bg-white/70 p-8 shadow-[0_18px_55px_rgba(26,21,40,0.12)] backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b94b72]">Invitation</p>
        <h1 className="text-3xl font-semibold md:text-4xl">아직 준비 중입니다.</h1>
        <p className="text-base text-[#4d4164]">
          모바일 청첩장은 곧 공개될 예정입니다. 조금만 기다려 주세요!
        </p>
      </div>
    </main>
  );
}
