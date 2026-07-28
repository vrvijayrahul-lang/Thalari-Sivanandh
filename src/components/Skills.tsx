"use client";

import {
  Code2,
  Server,
  Database,
  Globe,
  PenTool,
  Terminal,
  Cpu,
  Palette,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface SkillsProps {
  content?: Record<string, unknown>[] | null;
}

const defaultSkills = [
  { icon: Code2, title: "Frontend", items: ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { icon: Server, title: "Backend", items: ["Node.js", "Python", "GraphQL", "REST APIs"] },
  { icon: Database, title: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
  { icon: Globe, title: "DevOps", items: ["Docker", "AWS", "Vercel", "CI/CD"] },
  { icon: PenTool, title: "Design", items: ["Figma", "UI/UX", "Prototyping", "Design Systems"] },
  { icon: Terminal, title: "Languages", items: ["JavaScript", "TypeScript", "Python", "Rust"] },
];

const iconMap: Record<string, typeof Code2> = {
  Code2, Server, Database, Globe, PenTool, Terminal, Cpu, Palette,
};

export default function Skills({ content }: SkillsProps) {
  const skillData = content ?? defaultSkills;

  return (
    <AnimatedSection id="skills" className="relative py-32 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] font-medium bg-white/[0.04] border border-white/[0.06] text-white/50">
            Expertise
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.05] text-white/90 mb-16">
          Tools &{" "}
          <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Technologies
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillData.map((skill, index) => {
            const title = skill.title as string;
            const items = skill.items as string[];
            const iconName = defaultSkills[index]?.title === title
              ? defaultSkills[index].icon
              : Code2;
            const Icon = iconName;
            return (
              <div
                key={title}
                className="group relative p-[1px] rounded-[1.5rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02]"
              >
                <div className="rounded-[1.5rem] bg-white/[0.02] p-[1px]">
                  <div className="rounded-[calc(1.5rem-1px)] bg-[#050505] p-7 border border-white/[0.04] h-full">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-5 border border-white/[0.04] group-hover:bg-white/[0.06] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <Icon className="w-5 h-5 text-white/60" />
                    </div>

                    <h3 className="text-lg font-medium text-white/80 mb-3 tracking-tight">
                      {title}
                    </h3>

                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-white/30 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}