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
        accent: "oklch(var(--accent-color) / <alpha-value>)",
        text: "oklch(var(--text-color) / <alpha-value>)",
        subtext: "oklch(var(--subtext-color) / <alpha-value>)",
        header: "oklch(var(--header-color) / <alpha-value>)",
        background: "oklch(var(--background-color) / <alpha-value>)",
        content: "oklch(var(--content-bg-color) / <alpha-value>)",
        border: "oklch(var(--border-color) / <alpha-value>)",
        buttonborder: "oklch(var(--button-border-color) / <alpha-value>)",
        buttonring: "oklch(var(--button-ring-color) / <alpha-value>)",
        invertborder: "oklch(var(--invert-border-color) / <alpha-value>)",
      },
    },
    screens: {
      sm: "400px",
      md: "600px",
      lg: "800px",
      xl: "1200px",
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
