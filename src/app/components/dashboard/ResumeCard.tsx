'use client';

import { useRouter } from "next/navigation";
import { ResumeData } from "@/app/types/resume";
import TemplateRenderer from "@/app/components/TemplateRenderer";

export default function ResumeCard({ resume }: { resume: ResumeData }) {
  const router = useRouter();

  return (
    <div className="w-56">
      {/* Preview */}
      <div
        className="border rounded-md bg-white shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
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
