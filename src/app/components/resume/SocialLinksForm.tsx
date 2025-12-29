"use client";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { SocialLinkItem } from "@/app/types/resume";

export default function SocialLinksForm() {
  const { resumeData, setResumeData } = useResume();
  const socialLinks: SocialLinkItem[] = resumeData.socialLinks || [];

  const updateField = (
    id: string,
    field: keyof SocialLinkItem,
    value: string | boolean | number
  ) => {
    setResumeData((prev) => ({
      ...prev!,
      socialLinks: prev!.socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    }));
  };

  const toggleCollapse = (id: string) => {
    setResumeData((prev) => ({
      ...prev!,
      socialLinks: prev!.socialLinks.map((link) =>
        link.id === id ? { ...link, collapsed: !link.collapsed } : link
      ),
    }));
  };

  const deleteLink = (id: string) => {
    setResumeData((prev) => ({
      ...prev!,
      socialLinks: prev!.socialLinks.filter((link) => link.id !== id),
    }));
  };

  const addLink = () => {
    setResumeData({
      ...resumeData,
      socialLinks: [
        ...socialLinks,
        {
          id: crypto.randomUUID(),
          collapsed: false,
          label: "",
          url: "",
        },
      ],
    });
  };

  return (
    <>
      {socialLinks.map((link, idx) => (
        <div
          key={link.id}
          className="bg-white shadow-md rounded-lg"
        >
          {/* Header */}
          <button 
            className="w-full flex justify-between items-center p-5"
            onClick={() => toggleCollapse(link.id)}
          >
            <p className="font-semibold text-gray-800">
              {link.label?.trim() || 'Not Specified'}
            </p>

            <div className="flex items-center gap-3">
              <div className="text-gray-600 hover:text-gray-900" >
                {link.collapsed ? <ChevronDown /> : <ChevronUp />}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteLink(link.id)
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          </button>

          {/* Fields */}
          {!link.collapsed && (
            <div className="border-t p-5">

              {/* Label */}
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700">
                  Label
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Instagram"
                  value={link.label}
                  onChange={(e) =>
                    updateField(link.id, "label", e.target.value)
                  }
                />
              </div>

              {/* URL */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Link
                </label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://instagram.com/username"
                  value={link.url}
                  onChange={(e) =>
                    updateField(link.id, "url", e.target.value)
                  }
                />
              </div>

            </div>
          )}
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={addLink}
        className="w-fit text-left text-cyan-400 hover:text-cyan-500 font-medium transition"
      >
        {socialLinks.length === 0
          ? "+ Add Social Link"
          : "+ Add Another Social Link"}
      </button>
    </>
  );
}
