"use client";

import JaksamLogo from "./JaksamLogo";
import ArrowLogo from "@/components/button/ArrowIcon";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JaksamGridCell() {
  const router = useRouter();
  const { theme } = useTheme();
  const [logoColor, setLogoColor] = useState("#1a1a1a");
  const [btnColor, setBtnColor] = useState("#1a1a1a");

  const goToJaksam = () => {
    router.push("/jaksam");
  };

  useEffect(() => {
    if (theme === "light" || theme === "retro") {
      setLogoColor("#1a1a1a");
      setBtnColor("#1a1a1a");
    } else {
      setLogoColor("#fffbed");
      setBtnColor("#ffffff");
    }
  }, [theme]);

  return (
    <div className="grid-cell jaksam-theme relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%]">
        <JaksamLogo width={160} height={160} color={logoColor} />
      </div>
      <div className="absolute bottom-2 left-2">
        <button
          className="clickable-button group relative h-10 w-10 rounded-full border-2 border-border transition-all duration-300 hover:w-36 hover:ring-4"
          style={{ ["--tw-ring-color" as string]: `${btnColor}80` }}
          onClick={goToJaksam}
        >
          <p
            className="left-2px absolute left-3 -translate-y-1/2 text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:delay-300"
            style={{ color: btnColor }}
          >
            Jaksam
          </p>
          <div className="absolute right-[6px] top-[50%] -translate-y-1/2">
            <ArrowLogo width={24} height={24} color={btnColor} />
          </div>
        </button>
      </div>
    </div>
  );
}
