'use client'

import { useEffect, useState } from "react";
import { ResumeData } from "../types/resume";

interface UseResumeSourceParams {
  url: string | null;
  draftResume: ResumeData | null;
}

export function useResumeSource({ url, draftResume }: UseResumeSourceParams) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

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
          setResumeData(draftResume);
        }
      } catch (err) {
        console.error("Failed to load resume", err);
        setResumeData(null);
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [url, draftResume]);

  return { resumeData, loading, setResumeData };
}