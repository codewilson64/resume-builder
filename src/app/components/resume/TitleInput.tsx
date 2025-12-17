"use client";

import { useResume } from "@/app/context/ResumeContext";

export default function TitleInput() {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* Job Title */}
      <div>
        <input
          type="text"
          name="title"
          className="bg-gray-50 text-3xl font-semibold outline-none"
          value={resumeData.title || ""}
          onChange={handleChange}
          placeholder="Untitled"
        />
      </div>

    </div>
  );
}
