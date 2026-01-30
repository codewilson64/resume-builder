"use client";

import ResumeSkeleton from "../skeletons/ResumeSkeleton";
import TemplateRenderer from "../TemplateRenderer";
import { useResume } from "@/app/context/ResumeContext";
import { useSubscription } from "@/app/context/SubscriptionContext";

export default function DesktopPreview() {
  const { resumeData } = useResume(); 
  const { isPremium, isLoading } = useSubscription();

  if (isLoading) {
    return <div className="p-4 text-gray-400">Loading preview…</div>;
  }

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
