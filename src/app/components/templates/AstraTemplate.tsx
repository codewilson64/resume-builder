"use client";

import { fontMap } from "@/app/config/fontConfig";
import { useResume } from "@/app/context/ResumeContext";
import type { ResumeData } from "@/app/types/resume";

interface AstraTemplateProps {
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
    month: "long",
    year: "numeric",
  }).toUpperCase();
}

export default function AstraTemplate({
    data,
    variant,
  }: AstraTemplateProps) {
    const { resumeData } = useResume();
    const isThumbnail = variant === "thumbnail";
  
    return (
      <div className={fontMap[data.fontFamily] || fontMap["Lora"]}>
        <div
          className="bg-white shadow-xl"
          style={{
            height: isThumbnail ? 1123 : "auto",
            minHeight: !isThumbnail ? 1123 : undefined,
          }}
        >
          <div className="p-12 text-gray-900 space-y-10">
  
            {/* ================= HEADER ================= */}
            <header className="grid grid-cols-2 gap-8 items-start">
              <div>
                {data.jobTitle && (
                  <p className="text-xs uppercase tracking-widest mb-2">
                    {data.jobTitle}
                  </p>
                )}
                <h1 className="text-4xl font-bold uppercase tracking-wide">
                  {data.firstName} {data.lastName}
                </h1>
              </div>
  
              <div className="text-right text-xs uppercase tracking-wide space-y-2 text-gray-600">
                {(data.address || data.city) && (
                  <p>
                    {data.address}
                    {data.city && `, ${data.city}`}
                  </p>
                )}
                {data.phone && <p>{data.phone}</p>}
                {data.email && <p>{data.email}</p>}
              </div>
            </header>
  
            <hr className="border-t border-gray-800" />
  
            {/* ================= SOCIAL LINKS (TOP) ================= */}
            {data.socialLinks?.length > 0 && (
              <Block title="Social Links">
                <div className="space-y-2 text-xs">
                  {data.socialLinks
                    .filter(s => s.label || s.url)
                    .map(link => (
                      <div key={link.id}>
                        {link.label && (
                          <span className="font-semibold">
                            {link.label}:{" "}
                          </span>
                        )}
                        {link.url && <span>{link.url}</span>}
                      </div>
                    ))}
                </div>
              </Block>
            )}
  
            {/* ================= SUMMARY ================= */}
            {data.about && (
              <Block title="Summary">
                <p className="text-xs leading-relaxed text-gray-800">
                  {data.about}
                </p>
              </Block>
            )}
  
            {/* ================= SKILLS ================= */}
            {data.skills?.length > 0 && (
              <Block title="Skills">
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  {data.skills
                    .filter(s => s.skillName?.trim())
                    .map(skill => {
                      const width = skillWidths[skill.level] || "40%";
  
                      return (
                        <div key={skill.id}>
                          <span className="text-xs block mb-1">
                            {skill.skillName}
                          </span>
                          {resumeData.showSkillMeter && (
                            <div className="w-3/4 h-1 bg-gray-200">
                              <div
                                className="h-1 transition-all"
                                style={{
                                  width,
                                  backgroundColor: data.accentColor,
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
  
            {/* ================= EXPERIENCE ================= */}
            {data.experience?.length > 0 && (
              <Block title="Experience">
                <div className="space-y-6">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <p className="text-xs uppercase tracking-wide text-gray-600 mb-1">
                        {formatDate(exp.startDate)}
                        {(exp.endDate || exp.current) && " – "}
                        {exp.current ? "PRESENT" : formatDate(exp.endDate)}
                      </p>
  
                      <p className="text-sm font-semibold">
                        {exp.jobTitle} | {exp.company}
                      </p>
  
                      {exp.description && (
                        <p className="text-xs mt-2 text-gray-700 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Block>
            )}
  
            {/* ================= EDUCATION ================= */}
            {data.education?.length > 0 && (
              <Block title="Education">
                <div className="space-y-6">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      {edu.graduationDate && (
                        <p className="text-xs uppercase tracking-wide text-gray-600 mb-1">
                          {formatDate(edu.graduationDate)}
                        </p>
                      )}
  
                      <p className="text-sm font-semibold">
                        {edu.degree} | {edu.school}
                      </p>
  
                      {edu.description && (
                        <p className="text-xs mt-2 text-gray-700 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Block>
            )}
  
            {/* ================= LANGUAGES (BOTTOM) ================= */}
            {data.languages?.length > 0 && (
              <Block title="Languages">
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  {data.languages
                    .filter(l => l.name?.trim())
                    .map(lang => {
                      const width = languageWidths[lang.level] || "40%";
  
                      return (
                        <div key={lang.id}>
                          <span className="text-xs block mb-1">
                            {lang.name}
                          </span>
                          {resumeData.showLanguageMeter && (
                            <div className="w-3/4 h-1 bg-gray-200">
                              <div
                                className="h-1 transition-all"
                                style={{
                                  width,
                                  backgroundColor: data.accentColor,
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

            {(data.nationality || data.dateOfBirth || data.maritalStatus) && (
            <Block title="Personal Details">
                <div className="flex flex-col space-y-2 text-xs">
                {data.nationality && (
                    <span>
                    <span className="font-semibold">Nationality:</span>{" "}
                    {data.nationality}
                    </span>
                )}

                {data.dateOfBirth && (
                    <span>
                    <span className="font-semibold">Date of Birth:</span>{" "}
                    {data.dateOfBirth}
                    </span>
                )}

                {data.maritalStatus && (
                    <span>
                    <span className="font-semibold">Marital Status:</span>{" "}
                    {data.maritalStatus}
                    </span>
                )}
                </div>
            </Block>
            )}

            {/* ================= HOBBIES (BOTTOM) ================= */}
            {data.hobbies && (
              <Block title="Hobbies">
              <div className="flex flex-wrap items-center text-xs">
                {data.hobbies
                  .split(",")
                  .map(hobby => hobby.trim())
                  .filter(Boolean)
                  .map((hobby, i, arr) => (
                    <span key={i} className="flex items-center">
                      <span>{hobby}</span>
                      {i < arr.length - 1 && (
                        <span className="mx-2 text-gray-800">•</span>
                      )}
                    </span>
                  ))}
              </div>
              </Block>
            )}
          </div>
        </div>
      </div>
    );
  }

function Block({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <section className="grid grid-cols-[150px_1fr] gap-8">
        <h2 className="text-sm font-bold uppercase tracking-widest">
          {title}
        </h2>
        <div>{children}</div>
      </section>
    );
}
  
