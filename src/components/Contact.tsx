"use client";

import { useState } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface ContactProps {
  content?: Record<string, string> | null;
}

export default function Contact({ content }: ContactProps) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const email = content?.email ?? "hello@sivanandh.dev";
  const location = content?.location ?? "Remote / Bangalore, India";
  const formIntro = content?.formIntro ?? "Have a project in mind or just want to chat? Drop me a message and I'll get back to you within 24 hours.";
  const successMessage = content?.successMessage ?? "I'll get back to you within 24 hours.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <AnimatedSection id="contact" className="relative py-32 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] font-medium bg-white/[0.04] border border-white/[0.06] text-white/50">
            Connect
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.05] text-white/90 mb-8">
              Let&apos;s work{" "}
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                together
              </span>
            </h2>

            <p className="text-base text-white/40 leading-relaxed mb-12 max-w-md">
              {formIntro}
            </p>

            <div className="space-y-4">
              <div className="group relative p-[1px] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01] max-w-sm">
                <div className="rounded-xl bg-white/[0.02] p-[1px]">
                  <div className="rounded-[calc(0.75rem-1px)] bg-[#050505] p-4 border border-white/[0.04] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-white/50" />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 uppercase tracking-[0.15em] mb-0.5">Email</div>
                      <div className="text-sm text-white/70">{email}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative p-[1px] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01] max-w-sm">
                <div className="rounded-xl bg-white/[0.02] p-[1px]">
                  <div className="rounded-[calc(0.75rem-1px)] bg-[#050505] p-4 border border-white/[0.04] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-white/50" />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 uppercase tracking-[0.15em] mb-0.5">Location</div>
                      <div className="text-sm text-white/70">{location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - form */}
          <div className="group relative p-[1px] rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <div className="rounded-[2rem] bg-white/[0.02] p-[1px]">
              <div className="rounded-[calc(2rem-1px)] bg-[#050505] p-8 sm:p-10 border border-white/[0.04]">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400">
                        <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-medium text-white/80 mb-2">Message Sent!</h3>
                    <p className="text-sm text-white/40">{successMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.12] focus:bg-white/[0.05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={formState.email}
                        onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.12] focus:bg-white/[0.05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        required
                      />
                    </div>

                    <textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.12] focus:bg-white/[0.05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] resize-none"
                      required
                    />

                    <button
                      type="submit"
                      className="group/btn relative flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#050505] text-[14px] font-medium tracking-wide transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/90 active:scale-[0.98]"
                    >
                      <span>Send Message</span>
                      <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover/btn:translate-x-[3px] group-hover/btn:-translate-y-[1px] group-hover/btn:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                        <Send className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}