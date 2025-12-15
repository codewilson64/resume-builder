'use client';

import { useRouter } from "next/navigation";
import { ResumeData } from "@/app/types/resume";
import TemplateRenderer from "@/app/components/TemplateRenderer";

export default function ResumeCard({ resume }: { resume: ResumeData }) {
  const router = useRouter();

  return (
    <div className="">
      {/* Preview */}
      <div
        className="w-64 h-[360px] border rounded-md bg-gray-200 shadow-lg hover:shadow-xl transition cursor-pointer overflow-y-hidden"
        onClick={() => router.push(`/resume/preview?id=${resume.resumeId}`)}
      >
        <TemplateRenderer resume={resume} variant="thumbnail" />
      </div>

      {/* Meta */}
      <div className="mt-2">
        <p className="font-medium text-sm truncate">
          Untitled
        </p>
        <p className="text-xs text-gray-500">
          Updated at 2 Feb 2018
        </p>
      </div>
    </div>
  );
}
