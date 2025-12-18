"use client";

import { usePathname } from "next/navigation";
import JobTitleForm from "./JobTitleForm";
import { ResumeData } from "@/app/types/resume";
import { useResume } from "@/app/context/ResumeContext";

interface ContactFormProps {
  resume: ResumeData,
}

export default function ContactForm({ resume }: ContactFormProps) {
  const pathname = usePathname();
  const { setResumeData } = useResume()

  const isFinishingPage = pathname === "/resume/finishing";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
  }));
  };

  return (
    <div className="space-y-6">

      {isFinishingPage && <JobTitleForm />}
        
      {/* First & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            className="input"
            value={resume.firstName || ""}
            onChange={handleChange}
            placeholder="John"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="input"
            value={resume.lastName || ""}
            onChange={handleChange}
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className="input"
          value={resume.email || ""}
          onChange={handleChange}
          placeholder="you@example.com"
        />
      </div>

      {/* Address */}
      <div>
        <label className="text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          className="input"
          value={resume.address || ""}
          onChange={handleChange}
          placeholder="Enter a location"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          className="input"
          value={resume.phone || ""}
          onChange={handleChange}
          placeholder="+62 812 3456 7890"
        />
      </div>

      {/* City & Postal */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            className="input"
            value={resume.city || ""}
            onChange={handleChange}
            placeholder="Jakarta"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            className="input"
            value={resume.postalCode || ""}
            onChange={handleChange}
            placeholder="10210"
          />
        </div>
      </div>
    </div>
  );
}
