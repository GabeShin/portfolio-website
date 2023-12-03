"use client";
import { useState } from "react";
import "./theme-grid-cell.css";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ThemeGridCell() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleClick = (inputTheme: string) => {
    setTheme(inputTheme);
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="grid h-[180px] w-[180px] grid-cols-2 items-center justify-items-center gap-4">
        <div
          className="theme-button bg-gradient-to-r from-yellow-200 to-yellow-500"
          onClick={() => handleClick("light")}
        />
        <div
          className="theme-button bg-gradient-to-r from-gray-700 to-gray-900"
          onClick={() => handleClick("dark")}
        />
        <div
          className="theme-button bg-gradient-to-r from-green-700 to-red-700"
          onClick={() => handleClick("retro")}
        />
      </div>
    </div>
  );
}
