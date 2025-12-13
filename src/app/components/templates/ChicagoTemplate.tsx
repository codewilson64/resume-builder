"use client";

import { ArrowLeft, Download, Mail, Phone, MapPin } from "lucide-react";
import { fontMap } from "@/app/config/fontConfig";
import type { ResumeData } from "@/app/types/resume";

interface ChicagoTemplateProps {
  data: ResumeData;
  onBack: () => void;
  onPrint: () => void;
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr + "-01");
  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const skillWidths: Record<string, string> = {
  Beginner: "30%",
  Intermediate: "50%",
  Advanced: "75%",
  Expert: "100%",
};

const languageWidths: Record<string, string> = {
  Beginner: "25%",
  Intermediate: "50%",
  Advanced: "70%",
  Fluent: "85%",
  Native: "100%",
};

export default function ChicagoTemplate({ data, onBack, onPrint }: ChicagoTemplateProps) {
  const fullName = `${data?.firstName || ""} ${data?.lastName || ""}`.trim();

  const initials = [
    data?.firstName?.charAt(0) || "",
    data?.lastName?.charAt(0) || "",
  ].join("");

  return (
    <div className={`${fontMap[data.fontFamily] || fontMap["Poppins"]} relative`}>

      {/* PAGE */}
      <div
        className="bg-white shadow-md"
        style={{ width: "794px", minHeight: "1123px" }}
      >

        {/* HEADER */}
        <header className="flex justify-between items-center p-6">
          {/* LEFT — NAME & JOB */}
          <div>
            <h1 className="text-[38px] font-light tracking-wide leading-none">
              {fullName}
            </h1>

            {data?.jobTitle && (
              <p className="uppercase text-gray-500 tracking-[0.25em] text-sm mt-2">
                {data.jobTitle}
              </p>
            )}
          </div>

          {/* RIGHT — CIRCLE TEXT + INITIALS */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Circular text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <path
                    id="circlePath"
                    d="M50 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>

                <text fill="gray" fontSize="6.5" letterSpacing="2.5">
                  <textPath href="#circlePath">
                    {fullName} {fullName} {fullName}
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Initials stacked */}
            <div className="flex flex-col items-center justify-center gap-[1px] leading-none">
              <span className="text-xl font-semibold tracking-widest">
                {initials.charAt(0)}
              </span>

              <div className="h-[1px] w-7 bg-gray-400"></div>

              <span className="text-xl font-semibold tracking-widest">
                {initials.charAt(1)}
              </span>
            </div>
          </div>
        </header>

        {/* HEADER DIVIDER */}
        <div className="border-b border-black"></div>

        {/* 2-COLUMN GRID */}
        <div className="grid grid-cols-[260px_1fr]">

          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="border-r border-black p-6 space-y-6 text-gray-600">

            {/* CONTACTS */}
            {(data.phone || data.email || data.address || data.city) && (
            <section>
                <h2 className="text-xl font-bold tracking-widest mb-3">CONTACTS</h2>

                {data?.phone && (
                <div className="grid grid-cols-[20px_1fr] gap-3 text-sm">
                    <Phone size={14} className="mt-1" />
                    <span className="break-all">{data.phone}</span>
                </div>
                )}

                {data?.email && (
                <div className="grid grid-cols-[20px_1fr] gap-3 text-sm">
                    <Mail size={14} className="mt-1" />
                    <span className="break-all">{data.email}</span>
                </div>
                )}

                {(data?.address || data?.city || data?.postalCode) && (
                <div className="grid grid-cols-[20px_1fr] gap-3 text-sm border-b border-black pb-6">
                    <MapPin size={14} className="mt-1" />
                    <span className="break-all">
                    {data.address}
                    {data.city ? `, ${data.city}` : ""}
                    {data.postalCode ? `, ${data.postalCode}` : ""}
                    </span>
                </div>
                )}
            </section>
            )}

            {/* LINKS */}
            {data?.socialLinks?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold tracking-widest mb-3">LINKS</h2>

                <ul className="space-y-2 text-sm border-b border-black pb-6">
                  {data.socialLinks.map((link) => (
                    <li key={link.id}>
                      <span className="font-semibold">{link.label}: </span>
                      <span className="text-blue-700">{link.url}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* LANGUAGES (WITH METER BARS) */}
            {data?.languages?.length > 0 && (
            <section className="border-b border-black pb-6">
              <h2 className="text-xl font-bold uppercase tracking-widest mb-3">
                Languages
              </h2>

              <div className="space-y-3">
                {data.languages
                  .filter((lang) => lang.name?.trim())  // Only show if language exists
                  .map((lang) => {
                    const width = languageWidths[lang.level] || "40%";

                    return (
                      <div key={lang.id}>
                        {/* Language Name */}
                        <p className="text-sm font-medium">{lang.name}</p>

                        {/* Meter Bar */}
                        <div className="w-full h-1.5 bg-gray-300 mt-1">
                          <div
                            className="h-1.5 transition-all"
                            style={{
                              width,
                              backgroundColor: data.accentColor || "#000",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

            {/* PERSONAL DETAILS */}
          {(data?.dateOfBirth || data?.nationality || data?.maritalStatus) && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-3">
                Personal Details
              </h2>

              <div className="text-sm space-y-3">
                {data?.dateOfBirth && (
                  <p>
                    <span className="font-semibold block">Date of Birth</span>
                    <span>{data.dateOfBirth}</span>
                  </p>
                )}

                {data?.nationality && (
                  <p>
                    <span className="font-semibold block">Nationality</span>
                    <span>{data.nationality}</span>
                  </p>
                )}

                {data?.maritalStatus && (
                  <p>
                    <span className="font-semibold block">Marital Status</span>
                    <span>{data.maritalStatus}</span>
                  </p>
                )}
              </div>
            </section>
          )}
          </aside>

          {/* ================= RIGHT MAIN ================= */}
          <main className="p-6 space-y-6 text-gray-600">

            {/* ABOUT */}
            {data?.about && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-widest">
                  About Me
                </h2>
                <p className="text-sm leading-relaxed mt-3 border-b border-black pb-6">{data.about}</p>
              </section>
            )}

            {/* EXPERIENCE */}
            {data?.experience?.filter(exp =>
              exp.jobTitle?.trim() || exp.company?.trim()
            ).length > 0 && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-widest">
                  Work Experience
                </h2>

                <div className="mt-4 space-y-6 border-b border-black pb-6">
                  {data.experience
                    .filter(exp => exp.jobTitle?.trim() || exp.company?.trim())
                    .map((exp) => {
                      const line = [
                        exp.jobTitle?.trim(),
                        exp.company?.trim(),
                        exp.city?.trim()
                      ]
                        .filter(Boolean)
                        .join(", ");

                      return (
                        <div key={exp.id}>
                          {line && <p className="font-semibold">{line}</p>}

                          {(exp.startDate || exp.endDate) && (
                            <p className="text-xs text-gray-500">
                              {formatDate(exp.startDate)} -{" "}
                              {exp.current ? "Present" : formatDate(exp.endDate)}
                            </p>
                          )}

                          {exp.description && (
                            <p className="text-sm mt-1">{exp.description}</p>
                          )}
                        </div>
                      );
                    })}
                </div>
              </section>
            )}

            {/* EDUCATION */}
            {data?.education?.filter(edu =>
              edu.degree?.trim() || edu.school?.trim()
            ).length > 0 && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-widest">
                  Education
                </h2>

                <div className="mt-4 space-y-6 border-b border-black pb-6">
                  {data.education
                    .filter(edu => edu.degree?.trim() || edu.school?.trim())
                    .map((edu) => {
                      const line = [
                        edu.degree?.trim(),
                        edu.school?.trim(),
                        edu.city?.trim()
                      ]
                        .filter(Boolean)
                        .join(", ");

                      return (
                        <div key={edu.id}>
                          {line && <p className="font-semibold">{line}</p>}

                          {edu.graduationDate && (
                            <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                          )}

                          {edu.description && (
                            <p className="text-sm mt-1">{edu.description}</p>
                          )}
                        </div>
                      );
                    })}
                </div>
              </section>
            )}


            {/* SKILLS (WITH METER BARS) */}
            {data?.skills?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-widest">
                  Skills
                </h2>

                <div className="grid grid-cols-2 gap-4 mt-4 border-b border-black pb-6">
                  {data.skills
                    .filter((skill) => skill.skillName?.trim())
                    .map((skill) => {
                      const width = skillWidths[skill.level] || "40%";

                      return (
                        <div key={skill.id}>
                          <p className="text-sm font-medium">{skill.skillName}</p>

                          <div className="w-full h-1.5 bg-gray-300 mt-1">
                            <div
                              className="h-1.5"
                              style={{
                                width,
                                backgroundColor: data.accentColor || "#000",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            )}


            {/* HOBBIES */}
            {data?.hobbies && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-widest">
                  Hobbies
                </h2>

                <div className="flex gap-4 text-sm mt-4">
                  {data.hobbies.split(",").map((hobby, i) => (
                    <span key={i}>{hobby.trim()}</span>
                  ))}
                </div>
              </section>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
