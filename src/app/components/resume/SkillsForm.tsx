"use client";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { useState, useRef, useEffect } from "react";
import { SkillItem } from "@/app/types/resume";

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

export default function SkillsForm() {
  const { resumeData, setResumeData } = useResume();
  const skills: SkillItem[] = resumeData.skills || [];

  const updateField = (
    id: string,
    field: keyof SkillItem,
    value: string | number | boolean
  ) => {
    setResumeData((prev) => ({
      ...prev!,
      skills: prev!.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const toggleCollapse = (id: string) => {
    setResumeData((prev) => ({
      ...prev!,
      skills: prev!.skills.map((skill) =>
        skill.id === id ? { ...skill, collapsed: !skill.collapsed } : skill
      ),
    }));
  };

  const deleteSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev!,
      skills: prev!.skills.filter((skill) => skill.id !== id),
    }));
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [
        ...skills,
        {
          id: crypto.randomUUID(),
          collapsed: false,
          skillName: "",
          level: "",
        },
      ],
    });
  };

  return (
    <>
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          updateField={updateField}
          toggleCollapse={toggleCollapse}
          deleteSkill={deleteSkill}
        />
      ))}

      {/* Add Button */}
      <button
        onClick={addSkill}
        className="w-full border border-gray-300 hover:bg-gray-100 py-4 rounded-lg font-medium transition"
      >
        {skills.length === 0 ? "+ Add Skill" : "+ Add Another Skill"}
      </button>
    </>
  );
}

interface SkillCardProps {
    skill: SkillItem;
    updateField: (
      id: string,
      field: keyof SkillItem,
      value: string | number | boolean
    ) => void;
    toggleCollapse: (id: string) => void;
    deleteSkill: (id: string) => void;
  }

function SkillCard({ skill, updateField, toggleCollapse, deleteSkill }: SkillCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click (same logic as TemplateDropdown)
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-5 space-y-5">

      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800">
          {skill.skillName?.trim() || "Not Specified"}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleCollapse(skill.id)}
            className="text-gray-600 hover:text-gray-900"
          >
            {skill.collapsed ? <ChevronDown /> : <ChevronUp />}
          </button>

          <button
            onClick={() => deleteSkill(skill.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>

      {/* Form */}
      {!skill.collapsed && (
        <div className="space-y-6 border-t pt-5">

          {/* Skill Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Skill Name
            </label>
            <input
              type="text"
              className="input"
              placeholder="JavaScript, UI Design, Leadership"
              value={skill.skillName}
              onChange={(e) =>
                updateField(skill.id, "skillName", e.target.value)
              }
            />
          </div>

          {/* ✅ Custom Proficiency Selector (TemplateDropdown Style) */}
          <div ref={rootRef} className="relative w-full">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Proficiency
            </label>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-3 bg-white text-left"
            >
              <span className="text-gray-800">
                {skill.level || "Select Level"}
              </span>
              <ChevronDown size={18} />
            </button>

            {open && (
              <ul
                role="listbox"
                aria-activedescendant={skill.level || undefined}
                className="absolute z-40 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-52 overflow-y-auto"
                style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}
              >
                {proficiencyLevels.map((level) => (
                  <li
                    key={level}
                    role="option"
                    aria-selected={skill.level === level}
                    onClick={() => {
                      updateField(skill.id, "level", level);
                      setOpen(false);
                    }}
                    className={`cursor-pointer px-4 py-3 hover:bg-gray-50 transition flex justify-between items-center ${
                      skill.level === level
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-800"
                    }`}
                  >
                    <span>{level}</span>
                    {skill.level === level && (
                      <span className="text-sm text-blue-600">Selected</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
