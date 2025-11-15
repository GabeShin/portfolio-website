import WeddingPartyLanding from "./WeddingPartyLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "신태섭 & 노한솔 | 청첩 파티 초대장",
  description: "신태섭 & 노한솔의 결혼 전 청첩 모임 파티 안내.",
  metadataBase: new URL("https://imgabeshin.com"),
  alternates: {
    canonical: "/wedding/party",
  },
  openGraph: {
    title: "신태섭 & 노한솔 | 청첩 파티 초대",
    description: "12월 청첩 파티 초대장. 일정과 RSVP를 간편하게 확인하세요.",
    url: "https://imgabeshin.com/wedding/party",
    siteName: "Gabe & Hansol Wedding",
    images: [
      {
        url: "/wedding-hero.jpg",
        width: 2400,
        height: 1600,
        alt: "신태섭 · 노한솔 청첩 파티 메인 포스터",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "신태섭 & 노한솔 청첩 파티",
    description:
      "12월 프리미어 무드 청첩 파티 초대장. 일정과 RSVP를 간편하게 확인하세요.",
    images: ["https://imgabeshin.com/wedding-hero.jpg"],
  },
};

export default function WeddingPartyPage() {
  return <WeddingPartyLanding />;
}
