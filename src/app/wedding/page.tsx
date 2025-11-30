import WeddingHome from "./WeddingHome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "신태섭 & 노한솔 | Wedding",
  description: "신태섭 & 노한솔의 결혼 소식 및 웨딩 정보 안내 페이지.",
};

export default function WeddingHomePage() {
  return <WeddingHome />;
}
