"use client";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { LanguageItem } from "@/app/types/resume";
import { useEffect, useRef, useState } from "react";

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"] as const;

export default function LanguagesForm() {
  const { resumeData, setResumeData } = useResume();
  const languages: LanguageItem[] = resumeData.languages || [];

  const updateField = (
    id: string,
    field: keyof LanguageItem,
    value: string | boolean | number
  ) => {
    setResumeData((prev) => ({
      ...prev!,
      languages: prev!.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const toggleCollapse = (id: string) => {
    setResumeData((prev) => ({
      ...prev!,
      languages: prev!.languages.map((lang) =>
        lang.id === id ? { ...lang, collapsed: !lang.collapsed } : lang
      ),
    }));
  };

  const deleteLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev!,
      languages: prev!.languages.filter((lang) => lang.id !== id),
    }));
  };

  const addLanguage = () => {
    setResumeData((prev) => ({
      ...prev!,
      languages: [
        ...(prev?.languages || []),
        {
          id: crypto.randomUUID(),
          collapsed: false,
          name: "",
          level: "",
        },
      ],
    }));
  };

  return (
    <>
      {languages.map((language) => (
        <LanguageCard
          key={language.id}
          language={language}
          updateField={updateField}
          toggleCollapse={toggleCollapse}
          deleteLanguage={deleteLanguage}
        />
      ))}

      {/* Add Button */}
      <button
        onClick={addLanguage}
        className="w-full border border-gray-300 hover:bg-gray-100 py-4 rounded-lg font-medium transition"
      >
        {languages.length === 0 ? "+ Add Language" : "+ Add Another Language"}
      </button>
    </>
  );
}

/* ---------------------------------------------
    Language Card Component (with dropdown)
---------------------------------------------- */

interface LanguageCardProps {
  language: LanguageItem;
  updateField: (id: string, field: keyof LanguageItem, value: string | number | boolean) => void;
  toggleCollapse: (id: string) => void;
  deleteLanguage: (id: string) => void;
}

function LanguageCard({
  language,
  updateField,
  toggleCollapse,
  deleteLanguage,
}: LanguageCardProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-5 space-y-5">

      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800">
          {language.name?.trim() || "Not Specified"}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleCollapse(language.id)}
            className="text-gray-600 hover:text-gray-900"
          >
            {language.collapsed ? <ChevronDown /> : <ChevronUp />}
          </button>

          <button
            onClick={() => deleteLanguage(language.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      {!language.collapsed && (
        <div className="space-y-6 border-t pt-5">

          {/* Language Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Language
            </label>
            <input
              type="text"
              className="input"
              placeholder="English"
              value={language.name}
              onChange={(e) =>
                updateField(language.id, "name", e.target.value)
              }
            />
          </div>

          {/* Proficiency Dropdown (same logic as SkillsForm) */}
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
                {language.level || "Select Level"}
              </span>
              <ChevronDown size={18} />
            </button>

            {open && (
              <ul
                role="listbox"
                className="absolute z-40 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-52 overflow-y-auto"
              >
                {proficiencyLevels.map((level) => (
                  <li
                    key={level}
                    onClick={() => {
                      updateField(language.id, "level", level);
                      setOpen(false);
                    }}
                    className={`cursor-pointer px-4 py-3 hover:bg-gray-50 transition flex justify-between items-center ${
                      language.level === level
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-800"
                    }`}
                  >
                    <span>{level}</span>
                    {language.level === level && (
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
