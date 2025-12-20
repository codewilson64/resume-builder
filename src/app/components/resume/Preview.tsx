"use client";

import { useRef } from "react";
import { useResume } from "@/app/context/ResumeContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";

import { updateResume } from "@/lib/actions/resume-action";
import PreviewTopBar from "./PreviewTopBar";
import TemplateRenderer from "../TemplateRenderer";
import { useResumeSource } from "@/app/hooks/useResumeSource";

export default function PreviewPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdFromUrl = searchParams.get("id");

  const { resumeData: draftResume} = useResume();

  const printRef = useRef(null);

  const url = resumeIdFromUrl
   ? `/api/resume/${resumeIdFromUrl}`
   : null;

  const { resumeData } = useResumeSource({ url, draftResume });

  // handle print
  const handlePrintBase = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData?.firstName || "resume"}`,
  });

  const handlePrint = async () => {
    console.log("checking auth...")
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }

    if (!resumeData?.resumeId) {
      console.log("resume id does not exist!")
      return;
    }

    await updateResume(resumeData.resumeId, resumeData);
    handlePrintBase();
  };

  if (!resumeData) return <p>Loading…</p>;

  return (
    <div className="bg-gray-200 min-h-screen pb-20 px-5">
      <div className="no-print">
        <PreviewTopBar
          onSettings={() => {
            console.log("Open settings");
          }}
          onDownload={handlePrint}
          onCancel={() => router.back()}
        />
        <div className="h-20" />
      </div>
        
        <div
          className='w-full h-screen md:h-full max-w-[900px] mx-auto flex justify-center'
        >
          <div
            className="resume-print bg-white scale-50 scale-small-mobile scale-desktop origin-top"
            style={{
              width: "794px",
              height: "1123px"
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
