import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thalari Sivanandh | Portfolio",
  description:
    "Design engineer & full-stack developer crafting premium digital experiences with obsessive attention to detail.",
  openGraph: {
    title: "Thalari Sivanandh | Portfolio",
    description:
      "Design engineer & full-stack developer crafting premium digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[#050505] text-[#f5f5f7] font-sans antialiased relative">
        {/* Grain overlay */}
        <div className="grain-overlay" />
        {/* Ambient gradient orbs */}
        <div className="fixed top-[-400px] left-[-200px] w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-300px] right-[-200px] w-[600px] h-[600px] rounded-full bg-emerald-500/8 blur-[100px] pointer-events-none" />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}