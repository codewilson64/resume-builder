"use client";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useResume } from "../../context/ResumeContext";

export default function LanguagesForm() {
  const { resumeData, setResumeData } = useResume();
  const languages = resumeData.languages || [];

  const updateField = (id, field, value) => {
    setResumeData({
      ...resumeData,
      languages: languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const toggleCollapse = (id) => {
    setResumeData({
      ...resumeData,
      languages: languages.map((lang) =>
        lang.id === id ? { ...lang, collapsed: !lang.collapsed } : lang
      ),
    });
  };

  const deleteLanguage = (id) => {
    setResumeData({
      ...resumeData,
      languages: languages.filter((lang) => lang.id !== id),
    });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [
        ...languages,
        {
          id: Date.now(),
          collapsed: false,
          name: "",
          level: "",
        },
      ],
    });
  };

  return (
    <>
      {languages.map((language, idx) => (
        <div
          key={language.id}
          className="bg-white shadow-md rounded-lg p-5 space-y-5"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-800">
              {language.name?.trim() || 'Not Specified'}
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

          {/* Fields */}
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
            </div>
          )}
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={addLanguage}
        className="w-full border border-gray-300 hover:bg-gray-100 py-4 rounded-lg font-medium transition"
      >
        {languages.length === 0
          ? "+ Add Language"
          : "+ Add Another Language"}
      </button>
    </>
  );
}
