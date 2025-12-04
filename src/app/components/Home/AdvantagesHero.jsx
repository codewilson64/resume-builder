'use client'

import { Clock, Upload, Search, Palette } from "lucide-react";

const AdvantagesHero = () => {
  return (
     <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Everything You Need to <br className="hidden md:block" />
          <span className="text-orange-500">Build a Winning Resume</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Stop wasting time formatting. Our tools simplify resume building so you can apply faster and stand out instantly.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-14">
          
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center mb-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl">
                <Clock />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-3">
              Fast & Beginner-Friendly
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create a polished resume in minutes — no design skills needed. Just fill in your details and export.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center mb-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl">
                <Upload />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-3">
              Import & Update Easily
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Already have a CV? Upload it and instantly convert it into a clean, modern layout ready to improve.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center mb-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl">
                <Search />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-3">
              Showcase Your Strengths
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Highlight your expertise with structured, recruiter-approved formatting built to impress employers.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-center mb-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl">
                <Palette />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-3">
              Modern Design Templates
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Choose from beautifully crafted templates created by professional designers to make your CV stand out.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AdvantagesHero