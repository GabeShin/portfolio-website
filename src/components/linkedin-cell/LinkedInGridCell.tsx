"use client";
import LinkedInLogo from "./LinkedInLogo";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function LinkedInGridCell() {
  const { theme } = useTheme();
  const [logoColor, setLogoColor] = useState("#ffffff");

  useEffect(() => {
    if (theme === "light" || theme === "retro") {
      setLogoColor("#ffffff");
    } else if (theme === "dark" || theme === "neon") {
      setLogoColor("#0077b5");
    }
  }, [theme]);

  return (
    <div className="linkedin-theme grid-cell flex h-full w-full  items-center justify-center">
      <LinkedInLogo width={75} height={75} color={logoColor} />
    </div>
  );
}
