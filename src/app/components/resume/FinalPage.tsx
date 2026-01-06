"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useResume } from "@/app/context/ResumeContext";
import { useResumeSource } from "@/app/hooks/useResumeSource";

import ContactForm from "@/app/components/resume/ContactForm";
import AboutForm from "@/app/components/resume/AboutForm";
import ExperienceForm from "@/app/components/resume/ExperienceForm";
import EducationForm from "@/app/components/resume/EducationForm";
import SkillsForm from "@/app/components/resume/SkillsForm";
import FontSelector from "@/app/components/resume/FontSelector";
import AccentSelector from "@/app/components/resume/AccentSelector";

import PersonalDetailsForm from "@/app/components/resume/PersonalDetailsForm";
import HobbiesForm from "@/app/components/resume/HobbiesForm";
import LanguagesForm from "@/app/components/resume/LanguagesForm";
import SocialLinksForm from "@/app/components/resume/SocialLinksForm";
import TemplateSelector from "@/app/components/resume/TemplateSelector";
import TitleInput from "@/app/components/resume/TitleInput";
import FinalPageSkeleton from "../skeletons/FinalPageSkeleton";

export default function FinalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdFromUrl = searchParams.get("id");

  // Context API
  const { resumeData: draftResume, setResumeData } = useResume();

  const url = resumeIdFromUrl
    ? `/api/resume/${resumeIdFromUrl}`
    : null;
  
    
  const { resumeData } = useResumeSource({ url, draftResume });

  const lastHydratedId = useRef<string | null>(null);

  useEffect(() => {
    if (!resumeData?.resumeId) return;

    if (lastHydratedId.current === resumeData.resumeId) return;

    setResumeData(resumeData);
    lastHydratedId.current = resumeData.resumeId;
  }, [resumeData]);


  if (!resumeData) {
    return <FinalPageSkeleton />;
  }

  return (
    <div className="min-h-screen px-5 sm:px-0 py-12 flex justify-center bg-gray-50 relative">
      <div className="max-w-2xl w-full space-y-12 pb-32">

        {/* Header */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Finalize Your Resume
          </h1>
        </div>

        <p className="text-lg text-gray-600">
          Review and update your details before exporting
        </p>


        <section>
          <TitleInput />
          <h2 className="font-semibold text-xl mb-4 mt-4">Resume Format</h2>
          <TemplateSelector />
          <FontSelector />
          <AccentSelector
            value={draftResume.accentColor}
            template={draftResume.template}
            onChange={(color) =>
              setResumeData((prev) => ({
                ...prev!,
                accentColor: color,
              }))
            }
          />
        </section>

        {/* Mount all forms fully editable */}
        <section className="">
          <h2 className="font-semibold text-xl mb-4">Contact Info</h2>
          <ContactForm />
        </section>

        <section className="">
          <h2 className="font-semibold text-xl mb-4">About You</h2>
          <AboutForm />
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-xl">Experience</h2>
          <ExperienceForm />
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-xl">Education</h2>
          <EducationForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl">Skills</h2>
          <SkillsForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl mb-4">Personal Details</h2>
          <PersonalDetailsForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl">Hobbies</h2>
          <HobbiesForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl">Languages</h2>
          <LanguagesForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl">Social Links</h2>
          <SocialLinksForm />
        </section>

        {/* Export or Continue */}
        <div className="max-w-2xl mx-auto fixed bottom-0 left-0 right-0 bg-transparent px-5 lg:px-0 py-4">
        <button
          onClick={() => router.push("/resume/preview")}
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-4 rounded-lg font-medium transition"
        >
          Continue to Download →
        </button>
        </div>
      </div>
    </div>
  );
}
