"use client";

import { useResume } from "../../context/ResumeContext";

export default function HobbiesForm() {
  const { resumeData, setResumeData } = useResume();

  const updateField = (value) => {
    setResumeData({
      ...resumeData,
      hobbies: value,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 space-y-4">
      <label className="text-sm font-medium text-gray-700">
        What are your hobbies?
      </label>
      <textarea
        rows={2}
        className="textarea resize-none"
        placeholder="Sport, Music, Travel"
        value={resumeData.hobbies || ""}
        onChange={(e) => updateField(e.target.value)}
      ></textarea>
    </div>
  );
}
