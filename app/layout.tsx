import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Guider — Find your path",
  description:
    "AI-powered career guidance for Indian students. Get a personalised roadmap based on your education and interests, or a complete guide to reach your goal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-slate-200">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070912]/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-white"
            >
              <span className="text-xl">🧭</span>
              <span className="bg-gradient-to-r from-indigo-300 to-emerald-300 bg-clip-text text-transparent">
                Career Guider
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/discover"
                className="rounded-lg px-3 py-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Discover
              </Link>
              <Link
                href="/goal"
                className="rounded-lg px-3 py-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                I have a goal
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:py-8">
          {children}
        </main>

        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-slate-500">
            Built for Indian students · Guidance is AI-generated — always verify exam
            dates and details from official sources.
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
