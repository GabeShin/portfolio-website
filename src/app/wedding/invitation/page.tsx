import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "신태섭 & 노한솔 | 모바일 청첩장",
  description: "신태섭 & 노한솔 모바일 청첩장이 준비 중입니다.",
};

export default function WeddingInvitationPage() {
  redirect("https://www.pwinvitation.com/gfrjpotkubze");
}
