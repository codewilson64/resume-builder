"use client";

import { useRef } from "react";
import { useResume } from "@/app/context/ResumeContext";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

import ChicagoTemplate from "@/app/components/templates/ChicagoTemplate";
import BudapestTemplate from "../templates/BudapestTemplate";

import { createResume, updateResume } from "@/lib/actions/resume-action";

export default function PreviewPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { resumeData, setResumeId } = useResume();
  const router = useRouter();
  const printRef = useRef(null);
  
  const { template } = resumeData;

  const handlePrintBase = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData?.firstName || "resume"}`,
  });

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
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      

      {/* ✅ PRINTABLE AREA – ref MUST be set here */}
      <div ref={printRef} className="resume-scale relative">
        {renderTemplate()}
      </div>
    </div>
  );
}
