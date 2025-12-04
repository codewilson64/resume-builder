'use client'

import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden pt-40 pb-40 px-6 bg-gradient-to-br from-orange-100 via-white to-blue-50">
      
      {/* Decorative Background Shapes */}
      <div className="absolute -top-6 -left-6 w-28 h-28 bg-orange-300 rounded-xl opacity-30 rotate-12"></div>
      <div className="absolute -bottom-10 right-6 w-32 h-32 bg-blue-300 rounded-2xl opacity-30 rotate-[15deg]"></div>
      <div className="absolute top-1/2 left-1/2 w-52 h-52 bg-orange-400 opacity-[0.07] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
          Build Your Resume in Minutes
        </h1>

        <p className="text-gray-600 mt-4 text-lg md:text-xl max-w-xl">
          Create a modern resume that stands out — fast, simple, and professional.
        </p>

        <button 
          onClick={() => router.push('/resume-options')}
          className="mt-10 px-10 py-4 text-lg font-semibold text-white bg-orange-500 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
        >
          Build My Resume
          <ArrowRight size={22} />
        </button>
      </div>

    </section>
  );
};

export default Hero;
