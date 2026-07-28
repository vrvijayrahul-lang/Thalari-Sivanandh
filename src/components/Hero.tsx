"use client";

import { motion } from "framer-motion";

interface HeroProps {
  content?: Record<string, string> | null;
}

export default function Hero({ content }: HeroProps) {
  const greeting = content?.greeting ?? "Crafting";
  const gradientText = content?.gradientText ?? "Digital";
  const ending = content?.ending ?? "Experiences";
  const subtitle = content?.subtitle ?? "Full-stack developer with an obsessive eye for detail — building premium digital products that feel as good as they look.";
  const ctaPrimary = content?.ctaPrimary ?? "View Projects";
  const ctaSecondary = content?.ctaSecondary ?? "Get in Touch";

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
          className="mb-8 inline-flex"
        >
          <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] font-medium bg-white/[0.04] border border-white/[0.06] text-white/50">
            Design Engineer
          </span>
        </motion.div>

        {/* Main heading with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.92] mb-8"
        >
          <span className="text-white/90">{greeting}</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
            {gradientText}
          </span>
          <br />
          <span className="text-white/90">{ending}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.6 }}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide"
        >
          {subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#050505] text-[14px] font-medium tracking-wide transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/90 active:scale-[0.98]"
          >
            <span>{ctaPrimary}</span>
            <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-[3px] group-hover:-translate-y-[1px] group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 9L9 1M9 1H2.5M9 1V7.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          <a
            href="#contact"
            className="group flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/[0.08] text-white/60 text-[14px] font-medium tracking-wide transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.04] hover:text-white/80 active:scale-[0.98]"
          >
            <span>{ctaSecondary}</span>
            <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-[2px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M1 9L9 1M9 1H2.5M9 1V7.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/[0.08] flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}