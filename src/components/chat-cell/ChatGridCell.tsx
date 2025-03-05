"use client";

import OpenAILogo from "./OpenAILogo";
import OnGridButton from "@/components/button/OnGridButton";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatGridCell() {
  const { theme } = useTheme();
  const router = useRouter();
  const [logoColor, setLogoColor] = useState("#ffffff");

  useEffect(() => {
    if (theme === "light" || theme === "retro") {
      setLogoColor("#ffffff");
    } else if (theme === "dark" || theme === "neon") {
      setLogoColor("#00b48c");
    }
  }, [theme]);

  const goToChat = () => {
    router.push("/chat");
  };

  return (
    <div className="chatgpt-theme grid-cell relative h-full w-full overflow-hidden">
      <h1 className="absolute left-0 top-0 z-50 p-6 text-white">
        Chat with AI
      </h1>
      <div className="absolute left-[60%] top-[-20%] transition-transform duration-500 ease-in-out">
        <OpenAILogo width={100} height={100} color={logoColor} />
      </div>
      <div className="absolute bottom-2 left-2">
        <OnGridButton text={"Chat with me!"} onClick={goToChat} />
      </div>
    </div>
  );
}
