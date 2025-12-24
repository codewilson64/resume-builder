'use client'

import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-40 px-6 bg-gradient-to-br from-cyan-100 via-white to-blue-100">
      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight md:leading-snug">
          You're closer than you think.
          <span className="block text-cyan-400">Create a resume that gets noticed.</span>
        </h2>

        {/* Sub text */}
        <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
          Give recruiters a reason to call back. Build a polished, high-impact resume in minutes.
        </p>

        {/* Button */}
        <button className="mt-10 px-10 py-4 text-lg font-semibold text-white bg-cyan-400 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 hover:-translate-y-1 mx-auto inline-flex items-center gap-2">
          Build My Resume
          <ArrowRight size={22} />
        </button>
      </div>

      {/* Decorative Shapes (pure CSS, no images) */}
      <div className="absolute top-10 -left-2 w-40 h-40 bg-cyan-300 rounded-xl opacity-30 rotate-12"></div>
      <div className="absolute -bottom-10 -right-5 w-40 h-40 bg-blue-300 rounded-2xl opacity-30 rotate-[15deg]"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-cyan-400 opacity-[0.07] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    </section>
  )
}

export default CTA