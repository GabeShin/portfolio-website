"use client";
import LinkedInLogo from "./LinkedInLogo";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import OnGridButton from "../button/OnGridButton";

export default function LinkedInGridCell() {
  const { theme } = useTheme();
  const [logoColor, setLogoColor] = useState("#ffffff");

  const goToLinkedInProfile = () => {
    window.open("https://www.linkedin.com/in/gabeshin0929");
  };

  useEffect(() => {
    if (theme === "light" || theme === "retro") {
      setLogoColor("#ffffff");
    } else if (theme === "dark" || theme === "neon") {
      setLogoColor("#0077b5");
    }
  }, [theme]);

  return (
    <div className="linkedin-theme grid-cell relative  h-full w-full">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <LinkedInLogo width={75} height={75} color={logoColor} />
      </div>
      <div className="absolute bottom-2 left-2">
        <OnGridButton text={"Go to"} onClick={goToLinkedInProfile} />
      </div>
    </div>
  );
}
