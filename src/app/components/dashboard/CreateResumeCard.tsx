'use client';

import { useResume } from "@/app/context/ResumeContext";
import { createResumeForUser } from "@/lib/actions/resume-action";
import { FilePlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateResumeCard() {
  const router = useRouter();
  const { setResumeId, resetResumeContext } = useResume();

  const handleCreateNew = async () => {
    resetResumeContext();    

    const resumeId = await createResumeForUser();
    setResumeId(resumeId);     

    router.push(`/resume/contact?id=${resumeId}`);
  };

  return (
    <div
      className="border rounded-md bg-white p-8 w-64 h-[360px] flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition cursor-pointer"
      onClick={handleCreateNew}
    >
      <FilePlus size={40} className="text-blue-600 mb-4" />
      <h2 className="text-lg font-semibold text-gray-400 text-center">
        Create new
      </h2>
    </div>
  );
}
