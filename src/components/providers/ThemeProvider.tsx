"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="light" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}
