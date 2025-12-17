"use client";

import { useEffect, useRef, useState } from "react";
import { useResume } from "@/app/context/ResumeContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";

import { updateResume } from "@/lib/actions/resume-action";
import useDimensions from "@/app/hooks/useDimensions";
import PreviewTopBar from "./PreviewTopBar";
import TemplateRenderer from "../TemplateRenderer";
import { useResumeSource } from "@/app/hooks/useResumeSource";

export default function PreviewPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdFromUrl = searchParams.get("id");

  const { resumeData: draftResume} = useResume();

  const printRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const { resumeData, loading } = useResumeSource({ resumeIdFromUrl, draftResume });

  // handle print
  const handlePrintBase = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData?.firstName || "resume"}`,
  });

  const handlePrint = async () => {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }

    if (!resumeData?.resumeId) return;

    await updateResume(resumeData.resumeId, resumeData);
    handlePrintBase();
  };

  if (!resumeData) return <p>Loading…</p>;

  return (
    <div className="bg-gray-200 min-h-screen py-12 px-5">
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
          className="w-full max-w-[900px] mx-auto aspect-[210/297] flex justify-center"
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
