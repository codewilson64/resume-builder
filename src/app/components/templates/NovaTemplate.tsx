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

        {/* ===== BODY ===== */}
        <div className="grid grid-cols-[260px_1fr]">

          {/* ===== LEFT COLUMN ===== */}
          <aside className="border-r border-black p-6 pt-0 text-gray-600">

            {/* CONTACTS */}
            {(data.phone || data.email || data.address || data.city) && (
              <Block title="Contacts" color={data.accentColor}>
                <div className="space-y-1 border-b border-black pb-6">
                  {(data?.address || data?.city || data?.postalCode) && (
                    <div className="text-xs ">
                      <span className="break-all">
                        {data.address}
                        {data.city ? `, ${data.city}` : ""}
                        {data.postalCode ? `, ${data.postalCode}` : ""}
                      </span>
                    </div>
                  )}
                  {data?.email && (
                    <div className="text-xs">
                      <span className="break-all">{data.email}</span>
                    </div>
                  )}
                  {data?.phone && (
                    <div className="text-xs">
                      <span className="break-all">{data.phone}</span>
                    </div>
                  )}               
              </div>
            </Block>        
            )}

            {/* LINKS */}
            {data?.socialLinks?.length > 0 && (
              <Block title="Links" color={data.accentColor}>
              <div className="space-y-3 text-xs border-b border-black pb-6">
                {data.socialLinks.map((link) => (
                  <p key={link.id}>
                    <span className="font-semibold block">{link.label}: </span>
                    <span className="text-gray-600">{link.url}</span>
                  </p>
                ))}
              </div>
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
                                backgroundColor: "#2D2D2D",
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

            {/* REFERENCES */}
            {data?.references.length > 0 && (
              <Block title="References" color={data.accentColor}>
                <div className="border-b border-black pb-6">
                {resumeData.hideReferences ? (
                  <p className="text-xs text-gray-600">
                    References available upon request
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.references.map((ref) => (
                      <div key={ref.id} className="text-xs space-y-1">
                        <p className="font-semibold">
                          {ref.fullName}
                        </p>

                        {ref.companyName && (
                          <p>{ref.companyName}</p>
                        )}

                        {(ref.phone) && (
                          <p className="text-[11px]">
                            {ref.phone}
                          </p>
                        )}

                        {(ref.email) && (
                          <p className="text-[11px]">
                            {ref.email}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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

          {/* ===== RIGHT COLUMN ===== */}
          <main className="p-6 pt-0 text-gray-600">

            {/* ABOUT */}
            {data?.about && (
              <Block title="About Me" color={data.accentColor}>
                <div
                  className="prose prose-sm max-w-none text-gray-600 text-xs leading-relaxed border-b border-black pb-6 mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                  dangerouslySetInnerHTML={{ __html: data.about }}
                />
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
                            <div
                              className="prose prose-sm max-w-none text-gray-700 text-xs mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-1"
                              dangerouslySetInnerHTML={{ __html: exp.description }}
                            />
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
                            <div
                              className="prose prose-sm max-w-none text-gray-700 text-xs mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-1"
                              dangerouslySetInnerHTML={{ __html: edu.description }}
                            />
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
                <div
                  className={`grid grid-cols-2 ${
                    resumeData.showSkillMeter ? "gap-4" : "gap-2"
                  } border-b border-black pb-6`}
                >
                  {data.skills
                    .filter(skill => skill.skillName?.trim())
                    .map(skill => {
                      const width = skillWidths[skill.level] || "40%";

                      return resumeData.showSkillMeter ? (
                        /* ===== Meter ON ===== */
                        <div key={skill.id}>
                          <p className="text-xs font-medium">
                            {skill.skillName}
                          </p>

                          <div className="w-full h-1.5 bg-gray-300 mt-1">
                            <div
                              className="h-1.5"
                              style={{
                                width,
                                backgroundColor: "#2D2D2D",
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        /* ===== Meter OFF (bullets, still grid-cols-2) ===== */
                        <div key={skill.id} className="flex items-start gap-2">
                          <span className="text-lg leading-none text-black">
                            •
                          </span>
                          <p className="text-xs font-medium">
                            {skill.skillName}
                          </p>
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
      <div className="mb-3 pt-6">
        <h2 className="text-sm font-bold uppercase tracking-widest">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
