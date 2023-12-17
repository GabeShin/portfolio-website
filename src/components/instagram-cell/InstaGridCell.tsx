import InstagramLogo from "./InstagramLogo";
import OnGridButton from "@/components/button/OnGridButton";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function InstaGridCell() {
  const { theme } = useTheme();
  const [logoColor, setLogoColor] = useState("#ffffff");

  const goToInstagramProfile = () => {
    window.open("https://www.instagram.com/im.gabe.shin/");
  };

  useEffect(() => {
    if (theme === "light" || theme === "retro") {
      setLogoColor("#ffffff");
    } else if (theme === "dark" || theme === "neon") {
      setLogoColor("gradient");
    }
  }, [theme]);

  return (
    <div className="instagram-theme grid-cell relative  h-full w-full">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <InstagramLogo width={75} height={75} color={logoColor} />
      </div>
      <div className="absolute bottom-2 left-2">
        <OnGridButton text={"To Instagram"} onClick={goToInstagramProfile} />
      </div>
    </div>
  );
}
