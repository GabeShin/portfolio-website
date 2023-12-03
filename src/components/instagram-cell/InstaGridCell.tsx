import InstagramLogo from "./InstagramLogo";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function InstaGridCell() {
  const { theme } = useTheme();
  const [logoColor, setLogoColor] = useState("#ffffff");

  useEffect(() => {
    if (theme === "light" || theme === "retro") {
      setLogoColor("#ffffff");
    } else if (theme === "dark" || theme === "neon") {
      setLogoColor("gradient");
    }
  }, [theme]);

  return (
    <div className="grid-cell instagram-theme flex h-full w-full items-center justify-center justify-items-center">
      <InstagramLogo width={75} height={75} color={logoColor} />
    </div>
  );
}
