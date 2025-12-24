'use client'

import { useResume } from '@/app/context/ResumeContext';
import { createResumeForGuest } from '@/lib/actions/resume-action';
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";

const Hero = () => {
  const { setResumeId } = useResume();
  const router = useRouter()

  const handleBuildResume = async () => {
    const resumeId = await createResumeForGuest();
    setResumeId(resumeId)
    router.push(`/resume/contact?id=${resumeId}`);
  };

  return (
    <section className="relative overflow-hidden pt-40 pb-40 px-6 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      
      {/* Decorative Background Shapes */}
      <div className="absolute top-10 -left-2 w-40 h-40 bg-cyan-300 rounded-xl opacity-30 rotate-12"></div>
      <div className="absolute -bottom-10 right-6 w-40 h-40 bg-blue-300 rounded-2xl opacity-30 rotate-[15deg]"></div>
      <div className="absolute top-1/2 left-1/2 w-52 h-52 bg-cyan-400 opacity-[0.07] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight md:leading-snug text-gray-900">
          Build Your Resume in Minutes
        </h1>

        <p className="text-gray-600 mt-4 text-lg md:text-xl max-w-xl">
          Create a modern resume that stands out — fast, simple, and professional.
        </p>

        <button 
          onClick={handleBuildResume}
          className="mt-10 px-10 py-4 text-lg font-semibold text-white bg-cyan-400 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
        >
          Build My Resume
          <ArrowRight size={22} />
        </button>
      </div>

    </section>
  );
};

export default Hero;
