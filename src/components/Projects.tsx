"use client";

import { ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface ProjectsProps {
  content?: Record<string, unknown>[] | null;
}

const defaultProjects = [
  {
    title: "Nova Dashboard",
    description: "A real-time analytics dashboard with AI-powered insights, serving millions of data points with sub-millisecond query times.",
    tags: ["Next.js", "Python", "WebSockets", "PostgreSQL"],
    gradient: "from-purple-600/20 via-violet-600/10 to-transparent",
    href: "#",
    github: "#",
    featured: true,
  },
  {
    title: "Flux Commerce",
    description: "Headless e-commerce platform with composable architecture, built for scale with dynamic pricing and inventory management.",
    tags: ["React", "Node.js", "GraphQL", "Redis"],
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    href: "#",
    github: "#",
    featured: true,
  },
  {
    title: "Pulse Health",
    description: "Telemedicine platform connecting patients with healthcare providers through secure video consultations and health tracking.",
    tags: ["Next.js", "WebRTC", "MongoDB", "AWS"],
    gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
    href: "#",
    github: "#",
    featured: false,
  },
  {
    title: "Synth AI Studio",
    description: "Creative AI toolkit for generating music, art, and design assets using state-of-the-art machine learning models.",
    tags: ["Python", "FastAPI", "React", "TensorFlow"],
    gradient: "from-amber-600/20 via-orange-600/10 to-transparent",
    href: "#",
    github: "#",
    featured: false,
  },
];

const gradients = [
  "from-purple-600/20 via-violet-600/10 to-transparent",
  "from-emerald-600/20 via-teal-600/10 to-transparent",
  "from-blue-600/20 via-cyan-600/10 to-transparent",
  "from-amber-600/20 via-orange-600/10 to-transparent",
  "from-pink-600/20 via-rose-600/10 to-transparent",
  "from-cyan-600/20 via-sky-600/10 to-transparent",
];

export default function Projects({ content }: ProjectsProps) {
  const projects = content ?? defaultProjects;

  return (
    <AnimatedSection id="projects" className="relative py-32 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] font-medium bg-white/[0.04] border border-white/[0.06] text-white/50">
            Work
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.05] text-white/90 mb-16">
          Selected{" "}
          <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => {
            const title = project.title as string;
            const description = project.description as string;
            const tags = project.tags as string[];
            const href = project.href as string;
            const github = project.github as string;
            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={title}
                className="group relative p-[1px] rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015]"
              >
                <div className="rounded-[2rem] bg-white/[0.02] p-[1px] h-full">
                  <div className="rounded-[calc(2rem-1px)] bg-[#050505] p-8 sm:p-10 border border-white/[0.04] h-full flex flex-col relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`} />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/20 mb-6 font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-medium text-white/90 mb-4 tracking-tight">
                        {title}
                      </h3>

                      <p className="text-sm sm:text-base text-white/40 leading-relaxed mb-8 flex-1">
                        {description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-3 py-1 text-[11px] font-medium bg-white/[0.04] border border-white/[0.06] text-white/40 tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <a
                          href={href}
                          className="group/link flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live</span>
                        </a>
                        <a
                          href={github}
                          className="group/link flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                          <span>Source</span>
                        </a>
                      </div>
                    </div>
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