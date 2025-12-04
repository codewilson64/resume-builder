"use client";

import { useResume } from "../../context/ResumeContext";

export default function AboutForm() {
  const { resumeData, setResumeData } = useResume();

  const updateField = (value) => {
    setResumeData({
      ...resumeData,
      about: value,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 space-y-4">
      <label className="text-sm font-medium text-gray-700">
        Summary
      </label>
      <textarea
        rows={8}
        className="textarea resize-none"
        placeholder="Motivated professional with experience in software development, project leadership, and problem-solving. Passionate about building meaningful digital experiences..."
        value={resumeData.about || ""}
        onChange={(e) => updateField(e.target.value)}
      ></textarea>
    </div>
  );
}
