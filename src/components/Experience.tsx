"use client";

import { Briefcase, Calendar } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface ExperienceProps {
  content?: Record<string, unknown>[] | null;
}

const defaultExperience = [
  {
    company: "TechCorp Inc.",
    role: "Senior Full-Stack Developer",
    period: "2023 — Present",
    description: "Architected and built scalable microservices handling 10M+ daily requests. Led a team of 5 developers, reducing deployment time by 60% through CI/CD optimization.",
    highlights: ["Scaled system to handle 10M+ daily requests", "Reduced deployment time by 60%", "Led team of 5 developers"],
  },
  {
    company: "Digital Agency Co.",
    role: "Full-Stack Developer",
    period: "2021 — 2023",
    description: "Delivered 20+ client projects across fintech, healthcare, and e-commerce. Built reusable component libraries that accelerated project delivery by 40%.",
    highlights: ["Delivered 20+ client projects", "Built reusable component library", "Accelerated delivery by 40%"],
  },
  {
    company: "StartupXYZ",
    role: "Frontend Developer",
    period: "2019 — 2021",
    description: "Built the core product from the ground up using React and TypeScript. Implemented real-time collaboration features and a comprehensive design system.",
    highlights: ["Built product from ground up", "Implemented real-time collaboration", "Created comprehensive design system"],
  },
];

export default function Experience({ content }: ExperienceProps) {
  const experience = content ?? defaultExperience;

  return (
    <AnimatedSection id="experience" className="relative py-32 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] font-medium bg-white/[0.04] border border-white/[0.06] text-white/50">
            Career
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.05] text-white/90 mb-16">
          Experience &{" "}
          <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Timeline
          </span>
        </h2>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-white/[0.06]" />

          <div className="space-y-12">
            {experience.map((exp, index) => {
              const company = exp.company as string;
              const role = exp.role as string;
              const period = exp.period as string;
              const description = exp.description as string;
              const highlights = exp.highlights as string[];

              return (
                <div key={company} className="relative pl-14">
                  <div className="absolute left-[11px] top-1.5 w-[17px] h-[17px] rounded-full bg-[#050505] border-2 border-white/[0.12] flex items-center justify-center">
                    <div className="w-[7px] h-[7px] rounded-full bg-gradient-to-r from-purple-400 to-emerald-400" />
                  </div>

                  <div className="group relative p-[1px] rounded-[1.5rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01]">
                    <div className="rounded-[1.5rem] bg-white/[0.02] p-[1px]">
                      <div className="rounded-[calc(1.5rem-1px)] bg-[#050505] p-6 sm:p-8 border border-white/[0.04]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                          <div>
                            <h3 className="text-xl font-medium text-white/80 tracking-tight">{role}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Briefcase className="w-3.5 h-3.5 text-white/30" />
                              <span className="text-sm text-white/50">{company}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-white/30">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{period}</span>
                          </div>
                        </div>

                        <p className="text-sm text-white/40 leading-relaxed mb-4">{description}</p>

                        <div className="flex flex-wrap gap-2">
                          {highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="rounded-full px-3 py-1 text-[11px] font-medium bg-white/[0.04] border border-white/[0.06] text-white/40 tracking-wide"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}