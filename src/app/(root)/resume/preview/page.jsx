"use client";

import { useRef } from "react";
import { useResume } from "../../../context/ResumeContext";
import BudapestTemplate from "../../../components/templates/BudapestTemplate";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
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
        return <BudapestTemplate data={resumeData} />;
      case "Vienna":
        return <div>Vienna Template Here</div>;
      default:
        return <BudapestTemplate data={resumeData} />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="relative flex items-center justify-center mb-5">
        <button
          onClick={() => router.back()}
          className="absolute left-0 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Resume Preview
        </h1>

        <button
          onClick={handlePrint}
          className="absolute right-0 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md text-sm"
        >
          <Download size={18} />
          Save PDF
        </button>
      </div>

      {/* ✅ PRINTABLE AREA – ref MUST be set here */}
      <div ref={printRef} className="">
        {renderTemplate()}
      </div>
    </div>
  );
}
