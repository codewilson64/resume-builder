"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EducationForm from "../../../components/Resume/EducationForm";

export default function EducationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center px-5 sm:px-0 py-12 bg-gray-50 relative">
      <div className="w-full max-w-lg space-y-5 pb-28">

        {/* Header */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Education
          </h1>
        </div>

        <p className="text-lg text-gray-600">Add your academic background</p>

        {/* MOUNTED COMPONENT */}
        <EducationForm />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-50 px-5 py-4">
        <button
          onClick={() => router.push("/resume/skills")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium transition"
        >
          Continue to Skills →
        </button>
      </div>
    </div>
  );
}
