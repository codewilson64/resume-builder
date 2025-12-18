"use client";


import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useResume } from "@/app/context/ResumeContext";

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
import { useResumeSource } from "@/app/hooks/useResumeSource";

export default function FinalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeIdFromUrl = searchParams.get("id");

  const { resumeData: draftResume} = useResume();

  const url = resumeIdFromUrl
    ? `/api/resume/${resumeIdFromUrl}`
    : null;
   
  const { resumeData, setResumeData, loading } = useResumeSource({ url, draftResume });
  console.log(resumeData)

  if (!resumeData) {
    return <p className="text-center text-gray-500">Loading…</p>;
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


        <section className="">
          <TitleInput />
          <h2 className="font-semibold text-xl mb-4 mt-4">Resume Format</h2>
          <TemplateSelector />
          <FontSelector />
          <AccentSelector
            value={resumeData.accentColor}
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
          <ContactForm resume={resumeData} />
        </section>

        <section className="">
          <h2 className="font-semibold text-xl mb-4">About You</h2>
          <AboutForm />
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-xl mb-4">Experience</h2>
          <ExperienceForm />
        </section>

        <section className="space-y-6">
          <h2 className="font-semibold text-xl mb-4">Education</h2>
          <EducationForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl mb-4">Skills</h2>
          <SkillsForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl mb-4">Personal Details</h2>
          <PersonalDetailsForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl mb-4">Hobbies</h2>
          <HobbiesForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl mb-4">Languages</h2>
          <LanguagesForm />
        </section>

        <section className="space-y-5">
          <h2 className="font-semibold text-xl mb-4">Social Links</h2>
          <SocialLinksForm />
        </section>

        {/* Export or Continue */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-50 px-5 py-4">
        <button
          onClick={() => router.push("/resume/preview")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium transition"
        >
          Continue to Download →
        </button>
        </div>
      </div>
    </div>
  );
}
