"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { fontMap, FontName } from "../../config/fontConfig";

export default function FontSelector() {
  const { resumeData, setResumeData } = useResume();
  const [open, setOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const fonts: FontName[] = Object.keys(fontMap) as Array<keyof typeof fontMap>;

  // Close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Handle selection
  const handleSelect = (fontName: keyof typeof fontMap) => {
    setResumeData((prev) => ({
      ...prev!,
      fontFamily: fontName,
    }));
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative w-full mb-6 space-y-2">
      <label className="font-medium text-gray-700 text-sm block mb-1">
        Font Family
      </label>

      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-3 bg-white text-left"
      >
        <span className={`${fontMap[resumeData.fontFamily] || fontMap["Poppins"]} text-gray-800`}>
          {resumeData.fontFamily || "Select a font..."}
        </span>

        <ChevronDown size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          aria-activedescendant={resumeData.fontFamily}
          className="absolute z-40 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-52 overflow-y-auto"
          style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}
        >
          {fonts.map((fontName) => (
            <li
              key={fontName}
              role="option"
              aria-selected={resumeData.fontFamily === fontName}
              onClick={() => handleSelect(fontName)}
              className={`cursor-pointer px-4 py-3 hover:bg-gray-50 transition flex justify-between items-center ${
                resumeData.fontFamily === fontName
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-800"
              }`}
            >
              <span className={fontMap[fontName]}>
                {fontName}
              </span>

              {resumeData.fontFamily === fontName && (
                <span className="text-sm text-blue-600">Selected</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
