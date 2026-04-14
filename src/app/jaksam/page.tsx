import JaksamLanding from "./JaksamLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "작샘 (Jaksam) — 레슨 이후에도 음악이 이어지도록",
  description:
    "학생, 선생님, 부모님을 함께 연결하는 음악교육 어플리케이션. AI가 레슨을 정리하고, 연습 계획을 세우고, 성장을 함께 지켜봅니다.",
};

export default function JaksamPage() {
  return <JaksamLanding />;
}
