import type { Metadata } from "next";
import WeddingPartyLanding from "./WeddingPartyLanding";

export const metadata: Metadata = {
  title: "신태섭 & 노한솔 | Wedding Party",
  description:
    "신태섭 & 노한솔의 결혼 전 청첩 모임 파티 안내. 일정, 장소, 드레스 코드, FAQ, RSVP를 한 페이지에서 확인하세요.",
};

export default function WeddingPartyPage() {
  return <WeddingPartyLanding />;
}
