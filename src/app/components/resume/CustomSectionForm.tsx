"use client";

import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { CustomSectionItem } from "@/app/types/resume";
import TextEditor from "../TextEditor";

export default function CustomSectionForm() {
  const { resumeData, setResumeData } = useResume();
  const sections: CustomSectionItem[] = resumeData.customSections || [];

  const updateField = (
    id: string,
    field: keyof CustomSectionItem,
    value: string | boolean | number
  ) => {
    setResumeData((prev) => ({
      ...prev!,
      customSections: prev!.customSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      ),
    }));
  };

  const toggleCollapse = (id: string) => {
    setResumeData({
      ...resumeData,
      customSections: sections.map((section) =>
        section.id === id
          ? { ...section, collapsed: !section.collapsed }
          : section
      ),
    });
  };

  const deleteSection = (id: string) => {
    setResumeData({
      ...resumeData,
      customSections: sections.filter((section) => section.id !== id),
    });
  };

  const addSection = () => {
    setResumeData({
      ...resumeData,
      customSections: [
        ...sections,
        {
          id: crypto.randomUUID(),
          collapsed: false,
          sectionName: "",
          description: "",
        },
      ],
    });
  };

  return (
    <>
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-white shadow-md rounded-lg"
        >
          {/* Header */}
          <div
            role="button"
            tabIndex={0}
            className="w-full flex justify-between items-center p-5"
            onClick={() => toggleCollapse(section.id)}
          >
            <p className="font-semibold text-gray-800 text-left">
              {section.sectionName?.trim() || "Not Specified"}
            </p>

            <div className="flex items-center gap-3">
              <div className="text-gray-600 hover:text-gray-900">
                {section.collapsed ? <ChevronDown /> : <ChevronUp />}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSection(section.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>

          {/* Fields */}
          {!section.collapsed && (
            <div className="space-y-5 border-t p-5">
              {/* Section Name */}
              <div>
                <label className="text-sm text-gray-700">
                  Section Title
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Projects, Certifications, Awards..."
                  value={section.sectionName}
                  onChange={(e) =>
                    updateField(
                      section.id,
                      "sectionName",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Description */}
              <div>
                <TextEditor
                  label="Description"
                  value={section.description}
                  placeholder="Describe this section..."
                  onChange={(html) =>
                    updateField(section.id, "description", html)
                  }
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addSection}
        className="w-fit text-left text-cyan-400 hover:text-cyan-500 font-medium transition"
      >
        {sections.length === 0
          ? "+ Add Custom Section"
          : "+ Add Another Section"}
      </button>
    </>
  );
}
