"use client"

import { FilePlus, FileEdit } from "lucide-react";
import { useRouter } from "next/navigation";

const ResumeOptions = () => {
  const router = useRouter()

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 md:px-0">
      <div className="max-w-2xl w-full text-center space-y-10">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          How do you want to build your resume?
        </h1>

        {/* Options */}
        <div className="grid gap-5 md:grid-cols-2">
          
          {/* Option 1 */}
          <button 
            onClick={() => router.push('/resume/contact')} 
            className="border rounded-xl p-6 bg-white hover:shadow-lg transition duration-200 text-left space-y-3"
          >
            <FilePlus size={36} className="text-blue-600" />
            <h2 className="text-lg font-medium text-gray-800">Create a new resume</h2>
            <p className="text-sm text-gray-500">
              Start from scratch and use our guided builder to design a resume step-by-step.
            </p>
          </button>

          {/* Option 2 */}
          <button className="border rounded-xl p-6 bg-white hover:shadow-lg transition duration-200 text-left space-y-3">
            <FileEdit size={36} className="text-green-600" />
            <h2 className="text-lg font-medium text-gray-800">I already have a resume</h2>
            <p className="text-sm text-gray-500">
              Upload your existing resume and improve or update it with our tools.
            </p>
          </button>

        </div>
      </div>
    </section>
  );
};

export default ResumeOptions;
