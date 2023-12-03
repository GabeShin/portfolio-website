"use client";
import "./theme-grid-cell.css";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeGridCell() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);
  const handleClick = (inputTheme: string) => {
    setTheme(inputTheme);
    setCurrentTheme(inputTheme);
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="grid h-[120px] w-[120px] grid-cols-2 items-center justify-items-center gap-4">
        {["light", "dark", "retro", "neon"].map((themeName) => (
          <button
            key={themeName}
            className={`clickable-button theme-button ${themeName}-color-wheel ${
              currentTheme === themeName ? "active-theme" : ""
            }`}
            onClick={() => handleClick(themeName)}
          />
        ))}
      </div>
    </div>
  );
}
