"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { fontMap } from "@/app/config/fontConfig";
import type { ResumeData } from "@/app/types/resume";
import { useResume } from "@/app/context/ResumeContext";

interface NovaTemplateProps {
  data: ResumeData;
  variant?: "preview" | "thumbnail";
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

export default function NovaTemplate({ data, variant }: NovaTemplateProps) {
  const { resumeData } = useResume();
  const fullName = `${data?.firstName || ""} ${data?.lastName || ""}`.trim();
  const isThumbnail = variant === "thumbnail";

  return (
    <div className={`${fontMap[data.fontFamily] || fontMap["Poppins"]} relative`}>

      {/* PAGE */}
      <div
        className="bg-white shadow-xl"
        style={{
          height: isThumbnail ? 1123 : "auto",
          minHeight: !isThumbnail ? 1123 : undefined,
        }}
      >

        {/* HEADER */}
        <header className="text-center p-6">
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
        </header>

        {/* HEADER DIVIDER */}
        <div className="border-b border-black"></div>

        {/* 2-COLUMN GRID */}
        <div className="grid grid-cols-[260px_1fr]">

          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="border-r border-black p-6 space-y-6 text-gray-600">

            {/* CONTACTS */}
            {(data.phone || data.email || data.address || data.city) && (
              <Block title="Contacts" color={data.accentColor}>
              {data?.phone && (
                <div className="grid grid-cols-[20px_1fr] gap-3 text-xs">
                  <Phone size={14} className="mt-1" />
                  <span className="break-all">{data.phone}</span>
                </div>
              )}
            
              {data?.email && (
                <div className="grid grid-cols-[20px_1fr] gap-3 text-xs">
                  <Mail size={14} className="mt-1" />
                  <span className="break-all">{data.email}</span>
                </div>
              )}
            
              {(data?.address || data?.city || data?.postalCode) && (
                <div className="grid grid-cols-[20px_1fr] gap-3 text-xs border-b border-black pb-6">
                  <MapPin size={14} className="mt-1" />
                  <span className="break-all">
                    {data.address}
                    {data.city ? `, ${data.city}` : ""}
                    {data.postalCode ? `, ${data.postalCode}` : ""}
                  </span>
                </div>
              )}
            </Block>        
            )}

            {/* LINKS */}
            {data?.socialLinks?.length > 0 && (
              <Block title="Links" color={data.accentColor}>
              <ul className="space-y-2 text-xs border-b border-black pb-6">
                {data.socialLinks.map((link) => (
                  <li key={link.id}>
                    <span className="font-semibold">{link.label}: </span>
                    <span className="text-gray-600">{link.url}</span>
                  </li>
                ))}
              </ul>
            </Block>            
            )}

            {/* LANGUAGES (WITH METER BARS) */}
            {data?.languages?.length > 0 && (
              <Block title="Languages" color={data.accentColor}>
              <div className="space-y-3 border-b border-black pb-6">
                {data.languages
                  .filter((lang) => lang.name?.trim())
                  .map((lang) => {
                    const width = languageWidths[lang.level] || "40%";
            
                    return (
                      <div key={lang.id}>
                        <p className="text-xs font-medium">{lang.name}</p>
                        {resumeData.showLanguageMeter && (
                          <div className="w-full h-1.5 bg-gray-300 mt-1">
                            <div
                              className="h-1.5"
                              style={{
                                width,
                                backgroundColor: data.accentColor || "#000",
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

            {/* PERSONAL DETAILS */}
            {(data?.dateOfBirth || data?.nationality || data?.maritalStatus) && (
              <Block title="Personal Details" color={data.accentColor}>
                <div className="text-xs space-y-3">
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
              </Block>          
            )}
          </aside>

          {/* ================= RIGHT MAIN ================= */}
          <main className="p-6 space-y-6 text-gray-600">

            {/* ABOUT */}
            {data?.about && (
              <Block title="About Me" color={data.accentColor}>
                <p className="text-xs leading-relaxed border-b border-black pb-6">
                  {data.about}
                </p>
              </Block>            
            )}

            {/* EXPERIENCE */}
            {data?.experience?.filter(exp =>
              exp.jobTitle?.trim() || exp.company?.trim()
            ).length > 0 && (
              <Block title="Work Experience" color={data.accentColor}>
                <div className="space-y-6 border-b border-black pb-6">
                  {data.experience
                    .filter(exp => exp.jobTitle?.trim() || exp.company?.trim())
                    .map((exp) => {
                      const line = [
                        exp.jobTitle?.trim(),
                        exp.company?.trim(),
                        exp.city?.trim()
                      ].filter(Boolean).join(", ");

                      return (
                        <div key={exp.id}>
                          {line && <p className="text-sm font-semibold">{line}</p>}

                          {(exp.startDate || exp.endDate) && (
                            <p className="text-xs text-gray-500">
                              {formatDate(exp.startDate)} -{" "}
                              {exp.current ? "Present" : formatDate(exp.endDate)}
                            </p>
                          )}

                          {exp.description && (
                            <p className="text-xs mt-1">{exp.description}</p>
                          )}
                        </div>
                      );
                    })}
                </div>
              </Block>
            )}

            {/* EDUCATION */}
            {data?.education?.filter(edu =>
              edu.degree?.trim() || edu.school?.trim()
            ).length > 0 && (
              <Block title="Education" color={data.accentColor}>
                <div className="space-y-6 border-b border-black pb-6">
                  {data.education
                    .filter(edu => edu.degree?.trim() || edu.school?.trim())
                    .map((edu) => {
                      const line = [
                        edu.degree?.trim(),
                        edu.school?.trim(),
                        edu.city?.trim()
                      ].filter(Boolean).join(", ");

                      return (
                        <div key={edu.id}>
                          {line && <p className="text-sm font-semibold">{line}</p>}

                          {edu.graduationDate && (
                            <p className="text-xs text-gray-500">
                              {formatDate(edu.graduationDate)}
                            </p>
                          )}

                          {edu.description && (
                            <p className="text-xs mt-1">{edu.description}</p>
                          )}
                        </div>
                      );
                    })}
                </div>
              </Block>
            )}

            {/* SKILLS (WITH METER BARS) */}
            {data?.skills?.length > 0 && (
              <Block title="Skills" color={data.accentColor}>
              <div className={`grid grid-cols-2 ${resumeData.showSkillMeter ? 'gap-4' : 'gap-2'} border-b border-black pb-6`}>
                {data.skills
                  .filter(skill => skill.skillName?.trim())
                  .map((skill) => {
                    const width = skillWidths[skill.level] || "40%";
            
                    return (
                      <div key={skill.id}>
                        <p className="text-xs font-medium">{skill.skillName}</p>
                        {resumeData.showSkillMeter && (
                          <div className="w-full h-1.5 bg-gray-300 mt-1">
                            <div
                              className="h-1.5"
                              style={{
                                width,
                                backgroundColor: data.accentColor || "#000",
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

            {/* HOBBIES */}
            {data?.hobbies && (
              <Block title="Hobbies" color={data.accentColor}>
              <div className="flex gap-4 text-xs">
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
    <section>
      <div className="mb-3">
        <h2 className="text-sm font-bold uppercase tracking-widest">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
