import type { Metadata } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import "antd/dist/reset.css";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Track",
  description: "Academic project tracker with role-based dashboard and task board.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${sourceSerif.variable}`}>
        <SiteNav />
        {children}
        <footer className="border-t border-[var(--border)] bg-[color:rgba(255,255,255,0.72)] py-4">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 text-xs text-[var(--ink-muted)]">
            <span>Campus Track • Multi-page Admissions Build</span>
            <span>Next.js API • Ant Design • Framer Motion</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
