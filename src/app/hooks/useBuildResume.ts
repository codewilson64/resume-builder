'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createResumeForGuest } from "@/lib/actions/resume-action";
import { useResume } from "@/app/context/ResumeContext";

export function useBuildResume() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setResumeId } = useResume();

  const buildResume = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const resumeId = await createResumeForGuest();
      setResumeId(resumeId);

      router.push(`/resume/contact?id=${resumeId}`);
    } catch (error) {
      console.error("Failed to build resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return { buildResume, loading };
}