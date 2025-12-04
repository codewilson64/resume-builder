"use client";

import { useRef } from "react";
import { useResume } from "../../../context/ResumeContext";
import BudapestTemplate from "../../../components/templates/BudapestTemplate";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

export default function PreviewPage() {
  const { resumeData } = useResume();
  const { template } = resumeData;
  const router = useRouter();

  // ✅ THIS ref is what react-to-print will use
  const printRef = useRef(null);

  // ✅ v3 API: pass contentRef, not content: () => ref.current
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData?.firstName || "resume"}`,
  });

  const renderTemplate = () => {
    switch (template) {
      case "Budapest":
        return <BudapestTemplate data={resumeData} onBack={() => router.back()} onPrint={handlePrint}/>;
      case "Vienna":
        return <div>Vienna Template Here</div>;
      default:
        return <BudapestTemplate data={resumeData} />;
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
