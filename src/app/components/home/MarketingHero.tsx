"use client";

import Image from "next/image";
import marketingImage_1 from "../../../assets/MarketingImg_1.jpg";
import marketingImage_2 from "../../../assets/MarketingImg_2.jpg";
import { createResumeForGuest } from "@/lib/actions/resume-action";
import { useResume } from "@/app/context/ResumeContext";
import { useRouter } from "next/navigation";

const MarketingHero = () => {
  const { setResumeId } = useResume();
  const router = useRouter()

  const handleBuildResume = async () => {
    const resumeId = await createResumeForGuest();
    setResumeId(resumeId)
    router.push(`/resume/contact?id=${resumeId}`);
  };

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
            width={550}
            height={420}
          />
        </div>

        {/* Text */}
        <div className="order-1 md:order-2">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug">
            Stand Out in Your Career{" "}
            <span className="block text-cyan-400">
              With a Resume That Impresses.
            </span>
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            Want to land more interviews? A polished resume can set you apart 
            from other applicants. ConfidenCV gives you access to modern, 
            employer-approved templates you can customize in minutes — 
            even if you're not a designer.
          </p>

          <button 
            onClick={handleBuildResume}
            className="mt-8 bg-cyan-400 text-white text-lg px-8 py-4 rounded-full shadow-md hover:opacity-85 transition"
          >
            Create My Resume
          </button>
        </div>
      </section>


      {/* Section 2 */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug">
            Create a professional CV{" "}
            <span className="block text-cyan-400">
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
