'use client'

import { useEffect, useRef, useState } from "react";
import { ResumeData } from "../types/resume";

interface UseResumeSourceParams {
  url: string | null;
  draftResume: ResumeData | null;
}

export function useResumeSource({ url, draftResume }: UseResumeSourceParams) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  const draftSnapshot = useRef<ResumeData | null>(draftResume);

  useEffect(() => {
    const loadResume = async () => {
      setLoading(true);

      try {
        console.log("checking source...")
        if (url) {
          const res = await fetch(url);
          const data = await res.json();
          console.log("fetching from db...")
          setResumeData(data);
        } else {
          console.log("fetching from context...")
          setResumeData(draftSnapshot.current);
        }
      } catch (err) {
        console.error("Failed to load resume", err);
        setResumeData(null);
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [url]);

  return { resumeData, loading };
}