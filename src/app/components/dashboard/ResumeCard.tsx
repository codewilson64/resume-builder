'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResumeData } from "@/app/types/resume";
import { Pencil, Trash2, Download } from "lucide-react";
import { deleteResumeById } from "@/lib/actions/resume-action";
import TemplateRenderer from "@/app/components/TemplateRenderer";

export default function ResumeCard({ resume }: { resume: ResumeData }) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Delete resume
  const handleDelete = async () => {
    if (!resume.resumeId) return;

    setDeleting(true);
    try {
      await deleteResumeById(resume.resumeId);
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete resume");
    } finally {
      setDeleting(false);
    }
  };


  return (
    <div className="flex flex-col sm:flex-row items-start gap-3">
      {/* Preview */}
      <div
        className="w-64 h-[360px] border rounded-md bg-gray-200 shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden"
        onClick={() => router.push(`/resume/preview?id=${resume.resumeId}`)}
      >
        <TemplateRenderer resume={resume} variant="thumbnail" />
      </div>

    {/* Meta + Actions */}
      <div className="flex flex-row sm:flex-col justify-between gap-3">
        {/* Meta */}
        <div>
          <p className="font-medium text-sm break-words sm:truncate sm:whitespace-nowrap">
            {resume.title || "Untitled"}
          </p>
          <p className="text-xs text-gray-500">
            Updated {new Date(resume.updatedAt!).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col gap-2">
          {/* Edit */}
          <button
            onClick={() => router.push(`/resume/finishing?id=${resume.resumeId}`)}
            className="flex items-center gap-2 text-sm hover:text-orange-500"
            aria-label="Edit resume"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit</span>
          </button>

          {/* Download */}
          <button
            onClick={() => router.push(`/resume/preview?id=${resume.resumeId}`)}
            className="flex items-center gap-2 text-sm hover:text-orange-500"
            aria-label="Edit resume"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>

          {/* Delete */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 text-sm hover:text-red-600"
            aria-label="Delete resume"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5 bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">
              Delete resume?
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {resume.title || "Untitled"}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}
