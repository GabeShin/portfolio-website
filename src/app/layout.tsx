import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Am Gabe Shin",
  description: "Resume website for Gabe Shin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen bg-gray-300">
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
