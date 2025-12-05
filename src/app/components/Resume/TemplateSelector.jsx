"use client";

import { useState, useRef, useEffect } from "react";
import { useResume } from "../../context/ResumeContext";
import { ChevronDown } from "lucide-react";
import AccentSelector from "./AccentSelector";

const templates = [
  "Budapest",
  "Vienna",
  "Berlin",
  "Oslo",
  "Tokyo",
  "New York",
  "London",
  "Madrid",
  "Paris",
  "Jakarta",
];

export default function TemplateDropdown() {
  const { resumeData, setResumeData } = useResume();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Handle select
  const handleSelect = (value) => {
    setResumeData((prev) => ({ ...prev, template: value }));
    setOpen(false); // <-- closes dropdown after selecting
  };

  return (
    <div ref={rootRef} className="relative w-full mb-6 space-y-6">
      <label className="font-medium text-gray-700 text-sm block mb-1">
        Template
      </label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-3 bg-white text-left"
      >
        <span className="text-gray-800">
          {resumeData?.template || "Select a template..."}
        </span>
        <ChevronDown size={18} />
      </button>

      <AccentSelector
        value={resumeData.accentColor}
        onChange={(color) => setResumeData((prev) => ({ ...prev, accentColor: color }))}
      />

      {open && (
        <ul
          role="listbox"
          aria-activedescendant={resumeData?.template || undefined}
          className="absolute z-40 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-52 overflow-y-auto"
          style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}
        >
          {templates.map((t) => (
            <li
              key={t}
              role="option"
              aria-selected={resumeData?.template === t}
              onClick={() => handleSelect(t)}
              className={`cursor-pointer px-4 py-3 hover:bg-gray-50 transition flex justify-between items-center ${
                resumeData?.template === t ? "bg-blue-50 text-blue-700" : "text-gray-800"
              }`}
            >
              <span>{t}</span>
              {resumeData?.template === t && (
                <span className="text-sm text-blue-600">Selected</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
