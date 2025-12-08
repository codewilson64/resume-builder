"use client";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { useResume } from "../../context/ResumeContext";

export default function SocialLinksForm() {
  const { resumeData, setResumeData } = useResume();
  const socialLinks = resumeData.socialLinks || [];

  const updateField = (id, field, value) => {
    setResumeData({
      ...resumeData,
      socialLinks: socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    });
  };

  const toggleCollapse = (id) => {
    setResumeData({
      ...resumeData,
      socialLinks: socialLinks.map((link) =>
        link.id === id ? { ...link, collapsed: !link.collapsed } : link
      ),
    });
  };

  const deleteLink = (id) => {
    setResumeData({
      ...resumeData,
      socialLinks: socialLinks.filter((link) => link.id !== id),
    });
  };

  const addLink = () => {
    setResumeData({
      ...resumeData,
      socialLinks: [
        ...socialLinks,
        {
          id: Date.now(),
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
          className="bg-white shadow-md rounded-lg p-5 space-y-5"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-800">
              {link.label?.trim() || 'Not Specified'}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleCollapse(link.id)}
                className="text-gray-600 hover:text-gray-900"
              >
                {link.collapsed ? <ChevronDown /> : <ChevronUp />}
              </button>

              <button
                onClick={() => deleteLink(link.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>

          {/* Fields */}
          {!link.collapsed && (
            <div className="space-y-6 border-t pt-5">

              {/* Label */}
              <div>
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
        className="w-full border border-gray-300 hover:bg-gray-100 py-4 rounded-lg font-medium transition"
      >
        {socialLinks.length === 0
          ? "+ Add Social Link"
          : "+ Add Another Social Link"}
      </button>
    </>
  );
}
