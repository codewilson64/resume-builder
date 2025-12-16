'use client';

import { useResume } from "@/app/context/ResumeContext";
import { FilePlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateResumeCard() {
  const router = useRouter();
  const { resetResume } = useResume();

  const handleCreateNew = () => {
    resetResume();             
    router.push("/resume/contact");
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
