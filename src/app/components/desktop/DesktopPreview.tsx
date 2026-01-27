"use client";

import { useResume } from "@/app/context/ResumeContext";
import ResumeSkeleton from "../skeletons/ResumeSkeleton";
import TemplateRenderer from "../TemplateRenderer";

export default function DesktopPreview({
  isPremium,
}: {
  isPremium: boolean | null;
}) {
  const { resumeData } = useResume(); 

  return (
    <div className="w-full flex justify-center pt-12">
      <div
        className="bg-white origin-top"
        style={{
          width: "794px",
          height: "1123px",
          transform: "scale(0.88)",
        }}
      >
        {resumeData ? (
          <TemplateRenderer resume={resumeData} isPremium={isPremium} />
        ) : (
          <ResumeSkeleton />
        )}
      </div>
    </div>
  );
}
