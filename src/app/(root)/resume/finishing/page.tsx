"use client";

import { useResume } from "../../../context/ResumeContext";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ContactForm from "../../../components/Resume/ContactForm";
import SkillsForm from "../../../components/Resume/SkillsForm";
import ExperienceForm from "../../../components/Resume/ExperienceForm";
import EducationForm from "../../../components/Resume/EducationForm";
import AboutForm from "../../../components/Resume/AboutForm";
import TemplateSelector from "@/app/components/Resume/TemplateSelector";
import PersonalDetailsForm from "@/app/components/Resume/PersonalDetailsForm";
import HobbiesForm from "@/app/components/Resume/HobbiesForm";
import LanguagesForm from "@/app/components/Resume/LanguagesForm";
import SocialLinksForm from "@/app/components/Resume/SocialLinksForm";
import AccentSelector from "@/app/components/Resume/AccentSelector";
import FontSelector from "@/app/components/Resume/FontSelector";

export default function FinalPage() {
  const { resumeData, setResumeData } = useResume();
  const router = useRouter();

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
          <h2 className="font-semibold text-xl mb-4">Resume Format</h2>
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
          <ContactForm />
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
