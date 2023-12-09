import ArrowLogo from "./ArrowIcon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type PropsType = { text: string; onClick: () => void; invert?: boolean };

export default function LargeGridButton({ text, onClick }: PropsType) {
  const { theme } = useTheme();
  const [iconColor, setIconColor] = useState("#000");

  useEffect(() => {
    if (theme === "dark" || theme === "neon") {
      setIconColor("#fff");
    } else {
      setIconColor("#000");
    }
  }, [theme]);

  return (
    <button
      className={`clickable-button group relative h-10 w-36 rounded-full border-2 border-buttonborder transition-all duration-300 hover:ring-4 hover:ring-opacity-50 hover:ring-buttonring`}
      onClick={onClick}
    >
      <p className="left-2px absolute left-3 -translate-y-1/2 text-sm font-semibold text-text">
        {text}
      </p>
      <div className="absolute right-[6px] top-[50%] -translate-y-1/2">
        <ArrowLogo width={24} height={24} color={iconColor} />
      </div>
    </button>
  );
}
