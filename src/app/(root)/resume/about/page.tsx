"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AboutForm from "@/app/components/resume/AboutForm";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center px-5 lg:px-0 py-12 bg-slate-50 relative">
      <div className="w-full max-w-2xl space-y-6 pb-28">

        {/* Header */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            About You
          </h1>
        </div>

        <p className="text-lg text-gray-600">
          Write a short summary that highlights your skills, experience, and career goals.
        </p>

        {/* About Form Component */}
        <AboutForm />
      </div>

      {/* Bottom button */}
      <div className="max-w-2xl mx-auto absolute bottom-0 left-0 right-0 bg-gray-50 px-5 lg:px-0 py-5">
        <button
          onClick={() => router.push("/resume/finishing")}
          className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-4 rounded-lg font-medium transition"
        >
          Continue to Finish it →
        </button>
      </div>
    </div>
  );
}
