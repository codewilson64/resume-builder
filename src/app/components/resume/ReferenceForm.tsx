"use client";

import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { ReferenceItem } from "@/app/types/resume";

export default function ReferenceForm() {
  const { resumeData, setResumeData } = useResume();
  const references: ReferenceItem[] = resumeData.references || [];

  const updateField = (
    id: string,
    field: keyof ReferenceItem,
    value: string | boolean
  ) => {
    setResumeData((prev) => ({
      ...prev!,
      references: prev!.references.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref
      ),
    }));
  };

  const toggleCollapse = (id: string) => {
    setResumeData({
      ...resumeData,
      references: references.map((ref) =>
        ref.id === id ? { ...ref, collapsed: !ref.collapsed } : ref
      ),
    });
  };

  const deleteReference = (id: string) => {
    setResumeData({
      ...resumeData,
      references: references.filter((ref) => ref.id !== id),
    });
  };

  const addReference = () => {
    setResumeData({
      ...resumeData,
      references: [
        ...references,
        {
          id: crypto.randomUUID(),
          collapsed: false,
          fullName: "",
          companyName: "",
          phone: "",
          email: "",
        },
      ],
    });
  };

  return (
    <>
      {references.map((reference) => (
        <div
          key={reference.id}
          className="bg-white shadow-md rounded-lg"
        >
          {/* Header */}
          <div
            role="button"
            tabIndex={0}
            className="w-full flex justify-between items-center p-5"
            onClick={() => toggleCollapse(reference.id)}
          >
            <p className="font-semibold text-gray-800 text-left">
              {reference?.fullName?.trim() && reference?.companyName?.trim()
                ? `${reference.fullName.trim()} from ${reference.companyName.trim()}`
                : reference?.fullName?.trim() || reference?.companyName?.trim() || "Not Specified"}
            </p>

            <div className="flex items-center gap-3">
              <div className="text-gray-600 hover:text-gray-900">
                {reference.collapsed ? <ChevronDown /> : <ChevronUp />}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteReference(reference.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>

          {/* Fields */}
          {!reference.collapsed && (
            <div className="space-y-5 border-t p-5">
              {/* Full Name / Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Referent's Full Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={reference.fullName}
                    onChange={(e) =>
                      updateField(reference.id, "fullName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={reference.companyName}
                    onChange={(e) =>
                      updateField(reference.id, "companyName", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Phone / Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="input"
                    value={reference.phone}
                    onChange={(e) =>
                      updateField(reference.id, "phone", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input"
                    value={reference.email}
                    onChange={(e) =>
                      updateField(reference.id, "email", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addReference}
        className="w-fit text-left text-cyan-400 hover:text-cyan-500 font-medium transition"
      >
        {references.length === 0
          ? "+ Add Reference"
          : "+ Add Another Reference"}
      </button>

      <div className="flex items-center justify-start gap-2">
        <button
            type="button"
            onClick={() =>
            setResumeData((prev) => ({
                ...prev,
                hideReferences: !prev.hideReferences,
            }))
            }
            className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition
            ${resumeData.hideReferences ? "bg-cyan-400" : "bg-gray-300"}
            `}
            aria-pressed={resumeData.hideReferences}
        >
            <span
            className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition
                ${resumeData.hideReferences ? "translate-x-6" : "translate-x-1"}
            `}
            />
        </button>

        <div>
          <p className="text-xs text-gray-500">Hide references and make them available only upon request</p>
        </div>
      </div>
    </>
  );
}
