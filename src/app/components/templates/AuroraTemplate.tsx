"use client";

import { fontMap } from "@/app/config/fontConfig";
import { useResume } from "@/app/context/ResumeContext";
import type { ResumeData } from "@/app/types/resume";

interface AuroraTemplateProps {
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

export default function AuroraTemplate({
  data,
  variant,
}: AuroraTemplateProps) {
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
          // backgroundColor: "#E9B9FF",
        }}
      >
        <div className="p-10 flex flex-col text-gray-900">

          {/* ================= HEADER ================= */}
          <header className="flex justify-between items-start gap-6">
            {/* NAME */}
            <div>
              <h1 className="text-4xl font-bold leading-tight">
                {data.firstName} {data.lastName}
              </h1>
              <p className="mt-1 text-sm font-medium">
                {data.jobTitle}
              </p>
            </div>

            {/* CONTACT */}
            <div className="text-xs text-right space-y-2">
              {data.phone && <p>{data.phone}</p>}
              {data.email && <p>{data.email}</p>}
              {(data.address || data.city) && (
                <p>
                  {data.address}
                  {data.city ? `, ${data.city}` : ""}
                </p>
              )}
            </div>
          </header>

          {/* ================= PROFILE ================= */}
          {data.about && (
            <Block title="Summary">
              <p className="text-sm leading-relaxed">
                {data.about}
              </p>
            </Block>
          )}

          {/* ================= EXPERIENCE ================= */}
          {data.experience?.length > 0 && (
            <Block title="Experience">
              <div className="space-y-6">
                {data.experience
                  .filter(e => e.jobTitle || e.company)
                  .map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-center">
                        {exp.jobTitle && (
                            <p className="text-sm font-semibold">{exp.jobTitle}, {exp.company}, {exp.city}</p>
                          )}

                        <p className="text-sm font-semibold">
                          {exp.startDate && formatDate(exp.startDate)}
                          {exp.endDate || exp.current ? " – " : ""}
                          {exp.current ? "Present" : formatDate(exp.endDate)}
                        </p>                       
                      </div>

                      {exp.description && (
                        <p className="text-sm mt-2">
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
                {data.education
                  .filter(e => e.degree || e.school)
                  .map(edu => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-center">
                      {edu.degree && (
                        <p className="text-sm font-semibold">
                          {edu.degree}, {edu.school}, {edu.city}
                        </p>
                      )}

                      {edu.school && (
                        <p className="text-sm font-semibold">
                          
                          {edu.graduationDate &&
                            `${formatDate(edu.graduationDate)}`}
                        </p>
                      )}
                      </div>

                      {edu.description && (
                        <p className="text-sm mt-2">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </Block>
          )}

          {/* ================= SKILLS ================= */}
          {data.skills?.length > 0 && (
            <Block title="Skills">
              <div className={`grid grid-cols-3 ${resumeData.showSkillMeter ? 'gap-y-4' : 'gap-y-2'}`}>
                {data.skills
                  .filter(skill => skill.skillName?.trim())
                  .map(skill => {
                    const width = skillWidths[skill.level] || "40%";

                    return (
                      <div key={skill.id}>
                        {/* Skill Name */}
                        <span className="block mb-1 text-black text-sm">
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

          {/* ================= LANGUAGES ================= */}
          {data.languages?.length > 0 && (
            <Block title="Languages">
              <div className={`grid grid-cols-3 ${resumeData.showLanguageMeter ? 'gap-y-4' : 'gap-y-2'}`}>
                {data.languages
                  .filter(lang => lang.name?.trim())
                  .map(lang => {
                    const width = languageWidths[lang.level] || "40%";

                    return (
                      <div key={lang.id}>
                        {/* Skill Name */}
                        <span className="block mb-1 text-black text-sm">
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

          {/* ================= PERSONAL DETAILS ================= */}
          {(data.dateOfBirth || data.nationality || data.maritalStatus) && (
            <Block title="Personal Details">
              <ul className="text-sm space-y-2 text-gray-700">
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
          )}

          {/* ================= SOCIAL LINKS ================= */}
          {data.socialLinks?.length > 0 && (
            <Block title="Social Links">
              <ul className="space-y-2 text-sm">
                {data.socialLinks
                  .filter(s => s.label || s.url)
                  .map(link => (
                    <li key={link.id}>
                      {link.label && (
                        <span className="font-semibold block">
                          {link.label}
                        </span>
                      )}
                      {link.url && (
                        <span className="break-all">
                          {link.url}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </Block>
          )}

          {/* ================= HOBBIES ================= */}
          {data.hobbies && (
            <Block title="Hobbies and Interests">
              <ul className="text-sm list-disc list-inside space-y-1">
                {data.hobbies.split(",").map((hobby, i) => (
                  <li key={i}>{hobby.trim()}</li>
                ))}
              </ul>
            </Block>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= SHARED COMPONENTS ================= */

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold border-b border-black pb-1 mb-3 pt-8">
        {title}
      </h2>
      {children}
    </section>
  );
}

