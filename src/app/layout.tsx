"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"; // ✅ use client version
import { ThemeToggleFloating } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        {children}

        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ThemeToggleFloating />
          {children}
        </ThemeProvider> */}
      </body>
    </html>
  );
}
