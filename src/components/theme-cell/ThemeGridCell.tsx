"use client";
import "./theme-grid-cell.css";
import { useTheme } from "next-themes";

export default function ThemeGridCell() {
  const { theme, setTheme } = useTheme();

  const handleClick = (inputTheme: string) => {
    setTheme(inputTheme);
  };

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="grid h-[150px] w-[150px] grid-cols-2 items-center justify-items-center gap-4">
        {["light", "dark", "retro", "neon"].map((themeName) => (
          <button
            key={themeName}
            className={`clickable-button theme-button ${themeName}-color-wheel ${
              theme === themeName ? "active-theme" : ""
            }`}
            onClick={() => handleClick(themeName)}
          />
        ))}
      </div>
    </div>
  );
}
