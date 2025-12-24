"use client";
import ContactForm from "@/app/components/resume/ContactForm";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center px-5 lg:px-0 py-12 bg-gray-50 relative">
      
      <div className="w-full max-w-2xl space-y-10 pb-32">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">Contact Details</h1>
          <p className="text-lg text-gray-600">
            Provide your basic information so employers can reach you.
          </p>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>

      {/* Fixed Bottom Button */}
      <div className="max-w-2xl mx-auto absolute bottom-0 left-0 right-0 bg-gray-50 px-5 lg:px-0 py-4">
        <button
          onClick={() => router.push("/resume/experience")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium transition duration-200"
        >
          Continue to Experience →
        </button>
      </div>
    </div>
  );
}
