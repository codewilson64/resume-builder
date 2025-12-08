"use client";

import { useResume } from "../../context/ResumeContext";

export default function PersonalDetailsForm() {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">

      {/* Nationality */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Nationality
        </label>
        <input
          type="text"
          name="nationality"
          className="input"
          value={resumeData.nationality || ""}
          onChange={handleChange}
          placeholder="French"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          type="date"
          name="dateOfBirth"
          className="input"
          value={resumeData.dateOfBirth || ""}
          onChange={handleChange}
        />
      </div>

      {/* Marital Status */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Marital Status
        </label>
        <input
          name="maritalStatus"
          className="input"
          value={resumeData.maritalStatus || ""}
          onChange={handleChange}
          placeholder="Single"
        >
        </input>
      </div>

    </div>
  );
}
