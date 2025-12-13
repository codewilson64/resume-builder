"use client";

import { useRef } from "react";
import { useResume } from "@/app/context/ResumeContext";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

import ChicagoTemplate from "@/app/components/templates/ChicagoTemplate";
import BudapestTemplate from "../templates/BudapestTemplate";

import { createResume, updateResume } from "@/lib/actions/resume-action";
import useDimensions from "@/app/hooks/useDimensions";
import PreviewTopBar from "./PreviewTopBar";

export default function PreviewPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { resumeData, setResumeId } = useResume();
  const router = useRouter();
  const printRef = useRef(null);
  
  const { template } = resumeData;

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

  const renderTemplate = () => {
    switch (template) {
      case "Budapest":
        return <BudapestTemplate data={resumeData} onBack={() => router.back()} onPrint={handlePrint}/>;
      case "Chicago":
        return <ChicagoTemplate data={resumeData} onBack={() => router.back()} onPrint={handlePrint}/>;
      default:
        return <BudapestTemplate data={resumeData} onBack={() => router.back()} onPrint={handlePrint}/>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-5">
      <PreviewTopBar
        onSettings={() => {
          console.log("Open settings");
        }}
        onDownload={handlePrint}
        onCancel={() => router.back()}
      />
      <div className="h-12" />
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
            {renderTemplate()}
          </div>
        </div>
      </div>

    </div>
  );
}
