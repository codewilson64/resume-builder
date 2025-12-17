'use client';

import { useRouter } from "next/navigation";
import { ResumeData } from "@/app/types/resume";
import { Pencil, Trash2 } from "lucide-react";
import TemplateRenderer from "@/app/components/TemplateRenderer";
import { deleteResumeById } from "@/lib/actions/resume-action";

export default function ResumeCard({ resume }: { resume: ResumeData }) {
  const router = useRouter();

  const handleDelete = async (resumeId: string | null) => {
    if(!resumeId) return
    if (!confirm("Delete this resume?")) return;
    await deleteResumeById(resumeId);
  };

  return (
    <div className="flex items-start gap-3">
      {/* Preview */}
      <div
        className="w-64 h-[360px] border rounded-md bg-gray-200 shadow-lg hover:shadow-xl transition cursor-pointer overflow-y-hidden"
        onClick={() => router.push(`/resume/preview?id=${resume.resumeId}`)}
      >
        <TemplateRenderer resume={resume} variant="thumbnail" />
      </div>

    {/* Meta + Actions */}
      <div className="flex flex-col justify-between gap-5">
        {/* Meta */}
        <div>
          <p className="font-medium text-sm truncate">
            {resume.title || "Untitled"}
          </p>
          <p className="text-xs text-gray-500">
            Updated {new Date(resume.updatedAt!).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {/* Edit */}
          <button
            onClick={() => router.push(`/resume/edit?id=${resume.resumeId}`)}
            className="flex items-center gap-2 text-sm hover:text-orange-500"
            aria-label="Edit resume"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </button>

          {/* Delete */}
          <button
            onClick={() => handleDelete(resume.resumeId)}
            className="flex items-center gap-2 text-sm hover:text-orange-500"
            aria-label="Delete resume"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>

  );
}
