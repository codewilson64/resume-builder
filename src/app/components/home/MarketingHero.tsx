"use client";

import Image from "next/image";
import marketingImage_1 from "../../../assets/MarketingImg_1.jpg";
import marketingImage_2 from "../../../assets/MarketingImg_2.jpg";

const MarketingHero = () => {
  return (
    <>
      {/* Section 1 */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className="order-2 md:order-1 flex justify-center">
          <Image
            src={marketingImage_1}
            alt="Person working on resume"
            className="rounded-2xl shadow-lg object-cover"
            width={450}
            height={350}
          />
        </div>

        {/* Text */}
        <div className="order-1 md:order-2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Stand Out in Your Career{" "}
            <br className="hidden md:block" />
            <span className="text-orange-500">
              With a Resume That Impresses.
            </span>
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            Want to land more interviews? A polished resume can set you apart 
            from other applicants. ResumeForge gives you access to modern, 
            employer-approved templates you can customize in minutes — 
            even if you're not a designer.
          </p>

          <button className="mt-8 bg-orange-500 text-white text-lg px-8 py-4 rounded-full shadow-md hover:opacity-85 transition">
            Create My Resume
          </button>
        </div>
      </section>


      {/* Section 2 */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <div className="order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Create a professional CV{" "}
            <br className="hidden md:block" />
            <span className="text-orange-500">
              in minutes and get hired faster.
            </span>
          </h2>

          <p className="text-gray-600 mt-6 text-lg leading-relaxed">
            Skip the confusing formatting and start with a proven template. 
            Our builder makes it effortless to enter your experience, customize 
            your design, and export a polished CV ready for employers — all in one place.
          </p>
        </div>

        {/* Image */}
        <div className="order-2 md:order-1 flex justify-center">
          <Image
            src={marketingImage_2}
            alt="CV Builder Preview"
            className="rounded-2xl shadow-xl border border-gray-100"
            width={550}
            height={420}
          />
        </div>

      </section>
    </>
  );
};

export default MarketingHero;
