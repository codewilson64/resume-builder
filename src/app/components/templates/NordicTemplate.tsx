"use client";

import { fontMap } from "@/app/config/fontConfig";
import { Mail, Phone, MapPin } from "lucide-react";
import type { ResumeData } from "@/app/types/resume";
import { useResume } from "@/app/context/ResumeContext";

interface NordicSlateTemplateProps {
  data: ResumeData;
  variant?: "preview" | "thumbnail";
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

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr + "-01");
  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function NordicSlateTemplate({
  data,
  variant,
}: NordicSlateTemplateProps) {
  const { resumeData } = useResume();
  const isThumbnail = variant === "thumbnail";

  return (
    <div className={`${fontMap[data.fontFamily] || fontMap["Poppins"]}`}>
      {/* PAGE */}
      <div
        className="bg-white shadow-xl"
        style={{
          height: isThumbnail ? 1123 : "auto",
          minHeight: !isThumbnail ? 1123 : undefined,
        }}
      >
        {/* ================= HEADER ================= */}
        <header className="px-8 pt-8 pb-6 border-b flex flex-row items-start justify-between gap-6">
          {/* NAME */}
          <div>
            <h1
              className="text-3xl text-gray-800 font-bold tracking-wide"
            >
              {data.firstName} {data.lastName}
            </h1>
            <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
              {data.jobTitle}
            </p>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-1 text-gray-600 text-xs">
              {(data?.address || data?.city || data?.postalCode) && (
                <div className="flex items-center gap-3">                 
                  <MapPin size={13} />                 
                  <span className="leading-snug">
                    {data.address}, {data.city}, {data.postalCode}
                  </span>
                </div>
              )}

              {data?.phone && (
                <div className="flex items-center gap-3">                 
                  <Phone size={13} />
                  <span>{data.phone}</span>
                </div>
              )}

              {data?.email && (
                <div className="flex items-center gap-3">                  
                  <Mail size={13} />
                  <span>{data.email}</span>
                </div>
              )}
          </div>
        </header>

        {/* ================= BODY ================= */}
        <div className="grid grid-cols-[220px_1fr] gap-8">
          {/* ===== LEFT COLUMN ===== */}
          <aside className="pl-9 pt-0">
            {/* PROFILE */}
            {data.about && (
              <Block title="Profile" color={data.accentColor}>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {data.about}
                </p>
              </Block>
            )}

            {/* SKILLS */}
            {data.skills?.length > 0 && (
            <Block title="Skills" color={data.accentColor}>
              <div className="space-y-3 text-xs">
                {data.skills
                    .filter((skill) => skill.skillName?.trim())
                    .map((skill) => {
                    const width = skillWidths[skill.level] || "40%";

                    return (
                      <div key={skill.id}>
                        {/* Skill Name */}
                        <span className="block mb-1 text-black">
                            {skill.skillName}
                        </span>

                        {/* Skill Meter */}
                        {resumeData.showSkillMeter && (
                        <div className="w-3/4 h-1 bg-gray-200">
                          <div
                            className="h-1 bg-gray-700 transition-all"
                            style={{
                              width,
                            }}
                          />
                        </div>
                        )}
                      </div>
                    );
                })}
              </div>
            </Block>
            )}

            {/* LANGUAGES */}
            {data.languages?.length > 0 && (
              <Block title="Languages" color={data.accentColor}>
                <div className="space-y-3 text-xs">
                {data.languages
                    .filter((lang) => lang.name?.trim())
                    .map((lang) => {
                    const width = languageWidths[lang.level] || "40%";

                    return (
                      <div key={lang.id}>
                        {/* Skill Name */}
                        <span className="block mb-1 text-black">
                          {lang.name}
                        </span>

                        {/* Skill Meter */}
                        {resumeData.showLanguageMeter && (
                          <div className="w-3/4 h-1 bg-gray-200">
                            <div
                              className="h-1 bg-gray-700 transition-all"
                              style={{
                                  width,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                })}
              </div>
              </Block>
            )}

            {/* SOCIAL LINKS */}
            {data.socialLinks?.length > 0 && (
              <Block title="Social Links" color={data.accentColor}>
                <ul className="text-xs space-y-3">
                  {data.socialLinks
                    .filter((s) => s.label || s.url)
                    .map((social) => (
                      <li key={social.id}>
                        {social.label && (
                          <span className="font-semibold block mb-1">
                            {social.label}
                          </span>
                        )}
                        {social.url && (
                          <span className="text-gray-600 break-all">
                            {social.url}
                          </span>
                        )}
                      </li>
                    ))}
                </ul>
              </Block>
            )}

            {/* PERSONAL DETAILS  */}
            {(data.dateOfBirth || data.nationality || data.maritalStatus) && (
                <section>
                  <Block title="Personal Details" color={data.accentColor}>
                    <ul className="text-xs space-y-2 text-gray-700">
                      {data.dateOfBirth && (
                        <li>
                          <span className="font-semibold">Date of Birth:</span>{" "}
                          {data.dateOfBirth}
                        </li>
                      )}
                      {data.nationality && (
                        <li>
                          <span className="font-semibold">Nationality:</span>{" "}
                          {data.nationality}
                        </li>
                      )}
                      {data.maritalStatus && (
                        <li>
                          <span className="font-semibold">Marital Status:</span>{" "}
                          {data.maritalStatus}
                        </li>
                      )}
                    </ul>
                  </Block>
                </section>
              )}
          </aside>

          {/* ===== RIGHT COLUMN ===== */}
          <main className="p-9 pt-0">
            {/* EXPERIENCE */}
            {data.experience?.length > 0 && (
              <Block title="Work Experience" color={data.accentColor}>
                <div className="space-y-6">
                  {data.experience
                    .filter((e) => e.jobTitle || e.company)
                    .map((exp) => (
                      <div key={exp.id}>
                        {exp.jobTitle && (
                          <p className="text-sm font-semibold mb-1">
                            {exp.jobTitle}
                          </p>
                        )}
                        <p className="text-xs text-gray-600">
                          {exp.company}
                          {exp.startDate &&
                            ` · ${formatDate(exp.startDate)} – ${
                              exp.current
                                ? "Present"
                                : formatDate(exp.endDate)
                            }`}
                        </p>
                        {exp.description && (
                          <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </Block>
            )}

            {/* EDUCATION */}
            {data.education?.length > 0 && (
              <Block title="Education" color={data.accentColor}>
                <div className="space-y-6">
                    {data.education
                    .filter((e) => e.degree || e.school)
                    .map((edu) => (
                        <div key={edu.id}>
                        {edu.degree && (
                            <p className="text-sm font-semibold mb-1">{edu.degree}</p>
                        )}
                        {edu.school && (
                            <p className="text-xs text-gray-600">
                            {edu.school}
                            {edu.graduationDate &&
                                ` · ${formatDate(edu.graduationDate)}`}
                            </p>
                        )}
                        {edu.description && (
                            <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                            {edu.description}
                            </p>
                        )}
                        </div>
                    ))}
                  </div>
              </Block>
            )}

            {/* HOBBIES */}
            {data.hobbies && (
              <Block title="Hobbies" color={data.accentColor}>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700">
                  {data.hobbies.split(",").map((hobby, i) => (
                    <span key={i}>{hobby.trim()}</span>
                  ))}
                </div>
              </Block>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ================= SHARED BLOCK ================= */

function Block({
  title,
  children,
  color,
}: {
  title: string;
  children: React.ReactNode;
  color: string;
}) {
  return (
    <section className="">
      <div className="flex items-center gap-2 mb-4 pt-9">
        <span className="h-4 w-1 bg-[#2D2D2D]" />
        <h2 className="text-sm font-semibold uppercase tracking-widest">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
