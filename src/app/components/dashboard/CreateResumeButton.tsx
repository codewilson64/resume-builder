'use client';

import { useResume } from "@/app/context/ResumeContext";
import { createResumeForUser } from "@/lib/actions/resume-action";
import { useRouter } from "next/navigation";

export default function CreateResumeButton() {
  const router = useRouter();
  const { setResumeId, resetResumeContext } = useResume();

  const handleCreateNew = async () => {
    resetResumeContext();    

    const resumeId = await createResumeForUser();
    setResumeId(resumeId);     

    router.push(`/resume/contact?id=${resumeId}`);
  };

  return (
    <button
      onClick={handleCreateNew}
      className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-white transition"
    >
      + New resume
    </button>
  );
}
