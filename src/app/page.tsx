"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/firestore";
import { getImageUrl } from "@/lib/storage";
import type { DocumentData } from "firebase/firestore";

export default function Home() {
  const [content, setContent] = useState<DocumentData | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    getContent().then((data) => {
      if (data) {
        setContent(data);
        // Use photoUrl from Firestore (set via CMS image URL field)
        if (data.photoUrl) {
          setPhotoUrl(data.photoUrl as string);
          return; // URL from CMS takes priority
        }
      }
      // Fallback: check Firebase Storage for uploaded photo
      getImageUrl("portfolio/about.jpg").then((url) => {
        if (url) setPhotoUrl(url);
      });
    });
  }, []);

  return (
    <>
      <Hero content={content?.hero as Record<string, string> | undefined} />
      <About
        content={content?.about as Record<string, unknown> | undefined}
        photoUrl={photoUrl}
      />
      <Skills content={content?.skills as Record<string, unknown>[] | undefined} />
      <Projects content={content?.projects as Record<string, unknown>[] | undefined} />
      <Experience content={content?.experience as Record<string, unknown>[] | undefined} />
      <Contact content={content?.contact as Record<string, string> | undefined} />
    </>
  );
}