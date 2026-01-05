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

      if (
        draftResume &&
        draftResume.resumeId &&
        url?.includes(draftResume.resumeId)
      ) {
        setResumeData(draftSnapshot.current);
        setLoading(false);
        console.log("No fetching...")
        return;
      }
      console.log("Fetch from db!!")  
      try {
        if (url) {
          const res = await fetch(url);
          const data = await res.json();
          setResumeData(data);
        } else {
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