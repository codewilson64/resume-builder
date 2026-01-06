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
    if (
      draftResume &&
      draftResume.resumeId &&
      url?.includes(draftResume.resumeId)
    ) {
      console.log("Use resume from context");
      setResumeData(draftResume);
      setLoading(false);
      return;
    }

    // If no URL → fallback to context (Preview case)
    if (!url) {
      console.log("No URL, fallback to context");
      setResumeData(draftResume);
      setLoading(false);
      return;
    }

    // Otherwise → fetch
    const loadResume = async () => {
      console.log("Fetch from db");
      setLoading(true);

      try {
        const res = await fetch(url);
        const data = await res.json();
        setResumeData(data);
      } catch (err) {
        console.error("Failed to load resume", err);
        setResumeData(null);
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [url, draftResume]);

  return { resumeData, loading };
}