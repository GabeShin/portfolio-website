import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import ThemeClientProvider from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Eczar, Noto_Sans } from "next/font/google";

const noto_sans = Noto_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});
const noto_serif = Eczar({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-eczar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "I am Gabe Shin",
  description: "Gabe's Personal Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${noto_sans.variable} ${noto_serif.variable}`}>
        <ThemeClientProvider>
          <NavBar />
          {children}
        </ThemeClientProvider>
      </body>
    </html>
  );
}
