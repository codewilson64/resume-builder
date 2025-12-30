"use client";

import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { EducationItem } from "@/app/types/resume";

export default function EducationForm() {
  const { resumeData, setResumeData } = useResume();
  const education: EducationItem[] = resumeData.education || [];

  const updateField = (
    id: string,
    field: keyof EducationItem,
    value: string | boolean | number
  ) => {
    setResumeData((prev) => ({
      ...prev!,
      education: prev!.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const toggleCollapse = (id: string) => {
    setResumeData({
      ...resumeData,
      education: education.map((edu) =>
        edu.id === id ? { ...edu, collapsed: !edu.collapsed } : edu
      ),
    });
  };

  const deleteEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: education.filter((edu) => edu.id !== id),
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...education,
        {
          id: crypto.randomUUID(),
          collapsed: false,
          school: "",
          degree: "",
          graduationDate: "",
          city: "",
        },
      ],
    });
  };

  return (
    <>
      {education.map((edu, idx) => (
        <div key={edu.id} className="bg-white shadow-md rounded-lg">
          
          {/* Header */}
          <div
            role="button"
            tabIndex={0}
            className="w-full flex justify-between items-center p-5"
            onClick={() => toggleCollapse(edu.id)}
          >
            <p className="font-semibold text-gray-800 text-left">
              {edu?.degree?.trim() && edu?.school?.trim()
              ? `${edu.degree.trim()} at ${edu.school.trim()}`
              : edu?.degree?.trim() || edu?.school?.trim() || "Not Specified"}
            </p>

            <div className="flex items-center gap-3">
              <div className="text-gray-600 hover:text-gray-900" >
                {edu.collapsed ? <ChevronDown /> : <ChevronUp />}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteEducation(edu.id)
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          {!edu.collapsed && (
            <div className="border-t p-5">

              {/* School + Degree */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-sm font-medium text-gray-700">School</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Harvard University"
                    value={edu.school}
                    onChange={(e) => updateField(edu.id, "school", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Bachelor’s of Accounting"
                    value={edu.degree}
                    onChange={(e) => updateField(edu.id, "degree", e.target.value)}
                  />
                </div>
              </div>

              {/* Graduation Date */}
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700">Graduation Date</label>
                <input
                  type="month"
                  className="input"
                  value={edu.graduationDate}
                  onChange={(e) => updateField(edu.id, "graduationDate", e.target.value)}
                />
              </div>

              {/* City */}
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Jakarta"
                  value={edu.city}
                  onChange={(e) => updateField(edu.id, "city", e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description 
                </label>
                <textarea
                  rows={4}
                  className="input resize-none"
                  placeholder="Key coursework, projects, or academic achievements..."
                  value={edu.description}
                  onChange={(e) =>
                    updateField(edu.id, "description", e.target.value)
                  }
                ></textarea>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={addEducation}
        className="w-fit text-left text-cyan-400 hover:text-cyan-500 font-medium transition"
      >
        {education.length === 0 ? "+ Add Education" : "+ Add Another Education"}
      </button>
    </>
  );
}
