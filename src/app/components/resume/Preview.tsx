"use client";

import { useRef } from "react";
import { useResume } from "@/app/context/ResumeContext";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

import { createResume, updateResume } from "@/lib/actions/resume-action";
import useDimensions from "@/app/hooks/useDimensions";
import PreviewTopBar from "./PreviewTopBar";
import TemplateRenderer from "../TemplateRenderer";

export default function PreviewPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { resumeData, setResumeId } = useResume();
  const router = useRouter();
  const printRef = useRef(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const handlePrintBase = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData?.firstName || "resume"}`,
  });

  // handle print
  const handlePrint = async () => {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }

    if (resumeData.resumeId) {
    // Already saved once → update
    await updateResume(resumeData.resumeId, resumeData);
  } else {
    // First time → create
    const saved = await createResume(resumeData);
    setResumeId(saved.id);
  }

    handlePrintBase();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-5">
      <div className="no-print">
        <PreviewTopBar
          onSettings={() => {
            console.log("Open settings");
          }}
          onDownload={handlePrint}
          onCancel={() => router.back()}
        />
        <div className="h-10" />
      </div>
        
        <div
          ref={containerRef}
          className="w-full max-w-[900px] mx-auto aspect-[210/297] bg-gray-100 flex justify-center"
        >
          <div
            className="resume-print bg-white"
            style={{
              width: "794px",
              zoom: width ? width / 794 : 1,
            }}
          >
            <div ref={printRef} className="resume-print">
              <TemplateRenderer resume={resumeData} />
            </div>
          </div>
        </div>

    </div>
  );
}
