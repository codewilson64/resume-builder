"use client";

import { useEffect, useRef, useState } from "react";
import { useResume } from "@/app/context/ResumeContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";

import { createResume, updateResume } from "@/lib/actions/resume-action";
import useDimensions from "@/app/hooks/useDimensions";
import PreviewTopBar from "./PreviewTopBar";
import TemplateRenderer from "../TemplateRenderer";
import { ResumeData } from "@/app/types/resume";

export default function PreviewPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdFromUrl = searchParams.get("id");

  const { resumeData: draftResume } = useResume();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const printRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

   // 🔁 Decide source of truth
  useEffect(() => {
    const loadResume = async () => {
      console.log("checking source of truth...");

      if (resumeIdFromUrl) {
        console.log(`source comes from url...fetching api...`);

        try {
          const res = await fetch(`/api/resume/${resumeIdFromUrl}`);
          const data = await res.json();

          console.log("Fetched resume data:", data); 
          setResumeData(data);
        } catch (error) {
          console.error("Failed to fetch resume:", error);
        }
      } else {
        console.log("no id in url...fetching from context...");
        console.log("Draft resume data:", draftResume); 
        setResumeData(draftResume);
      }
    };

    loadResume();
  }, [resumeIdFromUrl, draftResume]);


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
