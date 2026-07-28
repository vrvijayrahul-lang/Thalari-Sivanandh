import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel | Portfolio CMS",
  description: "Content management system for portfolio website",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body className="bg-[#050505] text-[#f5f5f7] font-sans antialiased">
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}