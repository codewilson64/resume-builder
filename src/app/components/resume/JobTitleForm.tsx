"use client";

import { useResume } from "../../context/ResumeContext";

export default function JobTitleForm() {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
  }));
  };

  return (
    <div className="space-y-6">

      {/* Job Title */}
      <div>
        <label className="text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          className="input"
          value={resumeData.jobTitle || ""}
          onChange={handleChange}
          placeholder="Project Manager"
        />
      </div>

    </div>
  );
}
