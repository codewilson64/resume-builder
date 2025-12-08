"use client";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { ExperienceItem } from "@/app/types/resume";

export default function ExperienceForm() {
  const { resumeData, setResumeData } = useResume();
  const experiences: ExperienceItem[] = resumeData.experience || [];

  const updateField = (
    id: number,
    field: keyof ExperienceItem,
    value: string | boolean | number
  ) => {
    setResumeData((prev) => ({
      ...prev!,
      experience: prev!.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const toggleCollapse = (id: number) => {
    setResumeData({
      ...resumeData,
      experience: experiences.map((exp) =>
        exp.id === id ? { ...exp, collapsed: !exp.collapsed } : exp
      ),
    });
  };

  const deleteExperience = (id: number) => {
    setResumeData({
      ...resumeData,
      experience: experiences.filter((exp) => exp.id !== id),
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...experiences,
        {
          id: Date.now(),
          collapsed: false,
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          current: false,
          city: "",
          description: "",
        },
      ],
    });
  };

  return (
    <>
      {experiences.map((experience, idx) => (
        <div
          key={experience.id}
          className="bg-white shadow-md rounded-lg p-5 space-y-5"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-800">
              {experience?.jobTitle?.trim() && experience?.company?.trim()
               ? `${experience.jobTitle.trim()} from ${experience.company.trim()}`
               : experience?.jobTitle?.trim() || experience?.company?.trim() || "Not Specified"}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleCollapse(experience.id)}
                className="text-gray-600 hover:text-gray-900"
              >
                {experience.collapsed ? <ChevronDown /> : <ChevronUp />}
              </button>

              <button
                onClick={() => deleteExperience(experience.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>

          {/* Fields */}
          {!experience.collapsed && (
            <div className="space-y-6 border-t pt-5">

              {/* Job Title / Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Job Title 
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Software Engineer"
                    value={experience.jobTitle}
                    onChange={(e) =>
                      updateField(experience.id, "jobTitle", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Company Name 
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Google"
                    value={experience.company}
                    onChange={(e) =>
                      updateField(experience.id, "company", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Start Date 
                  </label>
                  <input
                    type="month"
                    className="input"
                    value={experience.startDate}
                    onChange={(e) =>
                      updateField(experience.id, "startDate", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    End Date 
                  </label>
                  <input
                    type="month"
                    className="input"
                    disabled={experience.current}
                    value={experience.current ? "" : experience.endDate}
                    onChange={(e) =>
                      updateField(experience.id, "endDate", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Current Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={experience.current}
                  onChange={(e) =>
                    updateField(experience.id, "current", e.target.checked)
                  }
                />
                <label className="text-sm text-gray-700">
                  I currently work here
                </label>
              </div>

              {/* City */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  City 
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Jakarta"
                  value={experience.city}
                  onChange={(e) =>
                    updateField(experience.id, "city", e.target.value)
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Job Description 
                </label>
                <textarea
                  rows={4}
                  className="input resize-none"
                  placeholder="Describe your role and achievements..."
                  value={experience.description}
                  onChange={(e) =>
                    updateField(experience.id, "description", e.target.value)
                  }
                ></textarea>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full border border-gray-300 hover:bg-gray-100 py-4 rounded-lg font-medium transition"
      >
        {experiences.length === 0
          ? "+ Add Experience"
          : "+ Add Another Experience"}
      </button>
    </>
  );
}
