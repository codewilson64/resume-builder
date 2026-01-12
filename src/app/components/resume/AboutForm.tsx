"use client";

import { useResume } from "../../context/ResumeContext";
import TextEditor from "../TextEditor";

export default function AboutForm() {
  const { resumeData, setResumeData } = useResume();

  const updateField = (value: string) => {
    setResumeData((prev) => {
      if (!prev) return prev 
      return { ...prev, about: value }
    });
  };


  return (
    <div className="bg-white shadow-md rounded-lg p-5 space-y-4">
      <TextEditor
        label="Summary"
        value={resumeData.about || ""}
        placeholder="Motivated professional with experience in software development, project leadership, and problem-solving. Passionate about building meaningful digital experiences..."
        onChange={(html) =>
          updateField(html)
        }
      />
    </div>
  );
}
