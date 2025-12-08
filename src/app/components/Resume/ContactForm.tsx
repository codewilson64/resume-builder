"use client";

import { usePathname } from "next/navigation";
import { useResume } from "../../context/ResumeContext";
import JobTitleForm from "./JobTitleForm";

export default function ContactForm() {
  const { resumeData, setResumeData } = useResume();
  const pathname = usePathname();

  const isFinishingPage = pathname === "/resume/finishing";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
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
            value={resumeData.firstName || ""}
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
            value={resumeData.lastName || ""}
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
          value={resumeData.email || ""}
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
          value={resumeData.address || ""}
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
          value={resumeData.phone || ""}
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
            value={resumeData.city || ""}
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
            value={resumeData.postalCode || ""}
            onChange={handleChange}
            placeholder="10210"
          />
        </div>
      </div>
    </div>
  );
}
