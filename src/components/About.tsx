"use client";

import AnimatedSection from "./AnimatedSection";

interface AboutProps {
  content?: Record<string, unknown> | null;
  photoUrl?: string | null;
}

export default function About({ content, photoUrl }: AboutProps) {
  const heading1 = (content?.heading1 as string) ?? "Turning complex";
  const gradientHeading = (content?.gradientHeading as string) ?? "problems";
  const heading2 = (content?.heading2 as string) ?? "into elegant code";
  const paragraph1 =
    (content?.paragraph1 as string) ??
    "I'm a full-stack developer and design engineer with a passion for building digital products that are both beautiful and functional. With years of experience across the entire stack, I specialize in creating seamless user experiences that delight users at every touchpoint.";
  const paragraph2 =
    (content?.paragraph2 as string) ??
    "My approach combines meticulous attention to detail with a deep understanding of modern web technologies. Every pixel, every interaction, and every line of code is crafted with intention.";
  const stats = (content?.stats as { value: string; label: string }[]) ?? [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Delivered" },
    { value: "30+", label: "Happy Clients" },
  ];

  return (
    <AnimatedSection id="about" className="relative py-32 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] font-medium bg-white/[0.04] border border-white/[0.06] text-white/50">
            About
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column - text */}
          <div className="space-y-6 lg:order-1 order-2">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.05] text-white/90">
              {heading1}
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                {gradientHeading}
              </span>
              <br />
              {heading2}
            </h2>

            <p className="text-base sm:text-lg text-white/40 leading-relaxed tracking-wide">
              {paragraph1}
            </p>
            <p className="text-base sm:text-lg text-white/30 leading-relaxed tracking-wide">
              {paragraph2}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-medium text-white/90 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-white/30 mt-1 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - photo */}
          <div className="lg:order-2 order-1 flex justify-center lg:justify-end">
            <div className="group relative p-[2px] rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] w-[320px] sm:w-[380px]">
              {/* Gradient border ring */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/40 via-violet-500/20 to-emerald-500/40 opacity-60 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />

              {/* Outer shell */}
              <div className="relative rounded-[2rem] bg-white/[0.03] p-[2px]">
                {/* Inner core */}
                <div className="rounded-[calc(2rem-2px)] bg-[#0a0a0a] overflow-hidden">
                  <div className="relative w-full aspect-[4/5]">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt="Profile photo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-violet-900/20 to-emerald-900/30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-emerald-400 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-purple-500/20">
                              <span className="text-3xl font-bold text-white">TS</span>
                            </div>
                            <p className="text-white/30 text-sm tracking-wide">
                              Upload photo via CMS
                            </p>
                            <p className="text-white/15 text-xs mt-1">
                              /admin/dashboard
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    {/* Inner shadow */}
                    <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[calc(2rem-2px)] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}