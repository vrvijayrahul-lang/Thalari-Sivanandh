"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Floating Island Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden sm:block px-4 py-2 text-[13px] font-medium text-white/50 hover:text-white/90 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] tracking-wide"
            >
              {item.label}
            </a>
          ))}
          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="sm:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <span className="sr-only">Menu</span>
            <div className="relative w-5 h-4">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="absolute left-0 top-0 w-full h-[1.5px] bg-white/70 rounded-full"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                className="absolute left-0 top-[7px] w-full h-[1.5px] bg-white/70 rounded-full"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="absolute left-0 bottom-0 w-full h-[1.5px] bg-white/70 rounded-full"
              />
            </div>
          </button>
          {/* Resume CTA button */}
          <a
            href="#contact"
            className="hidden sm:flex items-center gap-2 px-4 py-2 ml-2 rounded-full bg-white/10 hover:bg-white/15 text-[13px] font-medium tracking-wide text-white/80 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group active:scale-[0.98]"
          >
            <span>Resume</span>
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[1px] group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
                <path d="M1 9L9 1M9 1H2.5M9 1V7.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-30 bg-black/90 backdrop-blur-3xl flex items-center justify-center sm:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * i,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="text-[28px] font-medium tracking-tight text-white/70 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}