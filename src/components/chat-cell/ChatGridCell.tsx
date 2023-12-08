"use client";
import OpenAILogo from "./OpenAILogo";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import useWindowSize from "@/app/hooks/on-window-size";
import OnGridButton from "../button/OnGridButton";

export default function ChatGridCell() {
  const { theme, resolvedTheme } = useTheme();
  const windowSize = useWindowSize();

  const [size, setSize] = useState(0);
  const [logoColor, setLogoColor] = useState("#ffffff");

  useEffect(() => {
    if (theme === "light" || theme === "retro") {
      setLogoColor("#ffffff");
    } else if (theme === "dark" || theme === "neon") {
      setLogoColor("#00b48c");
    }
  }, [theme]);

  useEffect(() => {
    if (windowSize.width >= 1200) {
      setSize(400);
    } else if (windowSize.width >= 800) {
      setSize(280);
    } else {
      setSize(160);
    }
  }, [windowSize]);

  const goToChat = () => {
    // todo: implement
    console.log("go to chat");
  };

  return (
    <div className="chatgpt-theme grid-cell relative h-full w-full overflow-hidden">
      <h1 className="absolute left-0 top-0 z-50 p-6 text-white">
        Chat with AI
      </h1>
      <div className="absolute left-[50%] top-[25%] transition-transform duration-500 ease-in-out">
        <OpenAILogo width={size} height={size} color={logoColor} />
      </div>
      <div className="absolute bottom-2 left-2">
        <OnGridButton text={"Chat with me!"} onClick={goToChat} />
      </div>
    </div>
  );
}
