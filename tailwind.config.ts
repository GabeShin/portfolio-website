import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "oklch(var(--primary-color) / <alpha-value>)",
        accent1: "oklch(var(--accent-color-1) / <alpha-value>)",
        accent2: "oklch(var(--accent-color-2) / <alpha-value>)",
        text1: "oklch(var(--text-color-1) / <alpha-value>)",
        text2: "oklch(var(--text-color-2) / <alpha-value>)",
        background1: "oklch(var(--background-color-1) / <alpha-value>)",
        background2: "oklch(var(--background-color-2) / <alpha-value>)",
      },
    },
    screens: {
      md: "800px",
      lg: "1200px",
    },
  },
  plugins: [],
};
export default config;
