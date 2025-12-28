"use client";

import { fontMap } from "@/app/config/fontConfig";
import { useResume } from "@/app/context/ResumeContext";
import type { ResumeData } from "@/app/types/resume";

interface ZenithTemplateProps {
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
    month: "2-digit",
    year: "numeric",
  });
}

export default function ZenithTemplate({
  data,
  variant,
}: ZenithTemplateProps) {
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
        <div className="p-12 text-gray-900 space-y-8">

          {/* ================= HEADER ================= */}
          <header className="text-center space-y-1">
            <h1 className="text-2xl font-bold uppercase tracking-wide">
              {data.firstName} {data.lastName}
            </h1>

            {data.jobTitle && (
              <p className="text-sm text-gray-600">
                {data.jobTitle}
              </p>
            )}

            {/* CONTACT LINE */}
            <p className="text-xs text-gray-600">
              {data.email && <span>{data.email}</span>}
              {data.email && data.socialLinks?.length ? " • " : ""}
              {data.socialLinks?.[0]?.url && (
                <span>{data.socialLinks[0].url}</span>
              )}
              {(data.address || data.city) && " • "}
              {(data.address || data.city) && (
                <span>
                  {data.address}
                  {data.city && `, ${data.city}`}
                </span>
              )}
            </p>
          </header>

          {/* ================= SUMMARY ================= */}
          {data.about && (
            <CenteredBlock title="Summary">
              <p className="text-xs leading-relaxed text-gray-800 text-left">
                {data.about}
              </p>
            </CenteredBlock>
          )}

          {/* ================= EXPERIENCE ================= */}
          {data.experience?.length > 0 && (
            <CenteredBlock title="Experience">
              <div className="space-y-8">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="">
                    <div className="flex items-center justify-between">
                    {/* LEFT */}
                      <div>
                        <p className="text-sm font-semibold">
                            {exp.company}
                        </p>
                        <p className="text-sm">
                            {exp.jobTitle}
                        </p>
                      </div>
                      {/* RIGHT */}
                        <div className="text-right text-xs text-gray-600">
                            {(exp.city || exp.city) && (
                                <p>
                                {exp.city}
                                </p>
                            )}
                            <p>
                                {formatDate(exp.startDate)} –{" "}
                                {exp.current ? "Present" : formatDate(exp.endDate)}
                            </p>
                        </div>
                    </div>
                      {exp.description && (
                        <ul className="text-xs list-disc list-inside mt-2 space-y-1">
                          {exp.description.split(".").filter(Boolean).map((d, i) => (
                            <li key={i}>{d.trim()}.</li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
              </div>
            </CenteredBlock>
          )}

          {/* ================= EDUCATION ================= */}
          {data.education?.length > 0 && (
            <CenteredBlock title="Education">
                <div className="space-y-8">
                {data.education.map((edu) => (
                    <div key={edu.id}>
                    <div className="flex items-center justify-between">
                        {/* LEFT */}
                        <div>
                        <p className="text-sm font-semibold">
                            {edu.school}
                        </p>
                        <p className="text-sm">
                            {edu.degree}
                        </p>
                        </div>

                        {/* RIGHT */}
                        <div className="text-right text-xs text-gray-600">
                        {edu.city && (
                            <p>{edu.city}</p>
                        )}
                        {edu.graduationDate && (
                            <p>{formatDate(edu.graduationDate)}</p>
                        )}
                        </div>
                    </div>

                    {edu.description && (
                        <ul className="text-xs list-disc list-inside mt-2 space-y-1">
                        {edu.description
                            .split(".")
                            .filter(Boolean)
                            .map((d, i) => (
                            <li key={i}>{d.trim()}.</li>
                            ))}
                        </ul>
                    )}
                    </div>
                ))}
                </div>
            </CenteredBlock>
          )}

          {/* ================= SKILLS ================= */}
          {data.skills?.length > 0 && (
            <CenteredBlock title="Skills">
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
            </CenteredBlock>
          )}

          {/* ================= LANGUAGES ================= */}
            {data.languages?.length > 0 && (
            <CenteredBlock title="Languages">
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
            </CenteredBlock>
          )}

          {/* ================= PERSONAL DETAILS ================= */}
          {(data.nationality || data.dateOfBirth || data.maritalStatus) && (
            <CenteredBlock title="Personal Details">
                <div className="flex justify-between text-xs text-gray-700">
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
            </CenteredBlock>
            )}

          {/* ================= HOBBIES ================= */}
          {data.hobbies && (
            <CenteredBlock title="Hobbies">
                <p className="text-xs text-gray-700 text-left">
                {data.hobbies
                    .split(",")
                    .map(hobby => hobby.trim())
                    .join(" • ")}
                </p>
            </CenteredBlock>
          )}


        </div>
      </div>
    </div>
  );
}

/* ================= CENTERED BLOCK ================= */

function CenteredBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mt-2 border-t border-gray-400 w-full mx-auto" />
      </div>
      {children}
    </section>
  );
}
