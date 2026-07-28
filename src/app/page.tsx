"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

type ContentData = Record<string, unknown>;

export default function Home() {
  const [content, setContent] = useState<ContentData | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setContent(data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Hero content={content?.hero as Record<string, string> | undefined} />
      <About content={content?.about as Record<string, unknown> | undefined} />
      <Skills content={content?.skills as Record<string, unknown>[] | undefined} />
      <Projects content={content?.projects as Record<string, unknown>[] | undefined} />
      <Experience content={content?.experience as Record<string, unknown>[] | undefined} />
      <Contact content={content?.contact as Record<string, string> | undefined} />
    </>
  );
}