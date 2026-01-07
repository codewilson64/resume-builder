'use client'

import { useResume } from '@/app/context/ResumeContext';
import { createResumeForGuest } from '@/lib/actions/resume-action';
import { ArrowRight, FileDown } from 'lucide-react';
import { useRouter } from "next/navigation";
import hero_image from "../../../assets/HeroImg.jpg";
import Image from 'next/image';

const Hero = () => {
  const { setResumeId } = useResume();
  const router = useRouter()

  const handleBuildResume = async () => {
    const resumeId = await createResumeForGuest();
    setResumeId(resumeId)
    router.push(`/resume/contact?id=${resumeId}`);
  };

  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-32">
  
  {/* Gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-white to-blue-100" />

  {/* Ambient glow layers */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl" />
  <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
  <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start mt-10 gap-16 md:gap-0">

    {/* LEFT — Text */}
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
        Build Your Resume
        <br />
        <span className="text-cyan-400">in Minutes</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0">
        Create a modern, professional resume that stands out — fast, simple,
        and built for recruiters.
      </p>

      <button
        onClick={handleBuildResume}
        className="mt-10 inline-flex items-center gap-2 px-10 py-4 text-lg font-semibold text-white bg-cyan-400 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 hover:-translate-y-1"
      >
        Build My Resume
        <ArrowRight size={22} />
      </button>
    </div>

    {/* RIGHT — Image */}
    <div className="flex-1 flex justify-center md:justify-end">
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
        {/* PDF Download Badge */}
        <div className="animate-float absolute top-2 right-2 z-20 flex items-center gap-1 px-3 py-1.5 bg-white backdrop-blur-sm rounded-full shadow-md text-xs font-semibold text-gray-800">
          <p className='text-red-500'>PDF</p>
          <FileDown className='w-4 h-4'/>
        </div>

        {/* ATS Badge */}
        <div className="animate-float absolute top-36 -left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-md text-xs font-semibold text-gray-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <p className='text-emerald-500'>ATS Perfect</p>
        </div>

        {/* Accent Balls */}
        <div className="animate-float absolute top-64 -right-5 z-20 flex items-center px-2 py-1.5 bg-white rounded-full shadow-md gap-2">
          <span className="w-5 h-5 rounded-full bg-[#4C1D95]" />
          <span className="w-5 h-5 rounded-full bg-[#14213D]" />
          <span className="w-5 h-5 rounded-full bg-[#06B6D4]" />
          <span className="w-5 h-5 rounded-full bg-[#991B1B]" />
          <span className="w-5 h-5 rounded-full bg-[#0F766E]" />
        </div>

        {/* CV Image */}
        <Image
          src={hero_image}
          alt="Resume preview"
          quality={90}
          width={600}
          height={400}
          className="relative z-10 rounded-xl shadow-xl scale-75 origin-top"
          priority
        />
      </div>
    </div>


  </div>
</section>

  );
};

export default Hero;
