"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { fontMap } from "@/app/config/fontConfig";
import type { ResumeData } from "@/app/types/resume";
import { useResume } from "@/app/context/ResumeContext";

interface OrionTemplateProps {
  data: ResumeData;
  variant?: "preview" | "thumbnail";
}

function formatDate(dateStr?: string) {
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

export default function OrionTemplate({ data, variant }: OrionTemplateProps) {
  const { resumeData } = useResume();
  const isThumbnail = variant === "thumbnail";

  return (
    <div className={fontMap[data.fontFamily] || fontMap.Poppins}>
      <div
        className="grid grid-cols-[260px_1fr] shadow-xl bg-white"
        style={{
          height: isThumbnail ? 1123 : "auto",
          minHeight: !isThumbnail ? 1123 : undefined,
        }}
      >
        {/* ================= LEFT COLUMN ================= */}
        <aside
          className="p-8 pt-0 text-white"
          style={{ backgroundColor: data.accentColor }}
        >
          {/* CONTACT INFO */}
          <Block title="Contact">
            <section className="flex flex-col gap-2 text-xs text-white">
              {data.email && (
                <div className="flex items-center gap-2">
                  <Mail size={13} />
                  {data.email}
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={13} />
                  {data.phone}
                </div>
              )}
              {(data.address || data.city) && (
                <div className="flex items-center gap-2">
                  <MapPin size={13} />
                    <span>
                      {data.address}
                      {data.city && `, ${data.city}`}
                    </span>
                </div>
              )}
              </section>
          </Block>

          {data.socialLinks?.length > 0 && (
            <Block title="Links">
              <div className="space-y-3 text-xs">
                {data.socialLinks.map(link => (
                  <div key={link.id}>
                    <p className="font-semibold">{link.label}</p>
                    <p className="text-white/90">{link.url}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {data.languages?.length > 0 && (
            <Block title="Languages">
              <div className="space-y-3">
                {data.languages
                  .filter(l => l.name?.trim())
                  .map(lang => {
                    const width =
                      languageWidths[lang.level] || "40%";

                    return (
                      <div key={lang.id}>
                        <p className="text-xs mb-1">{lang.name}</p>
                        {resumeData.showLanguageMeter && (
                          <div className="w-full h-1.5 bg-white/30">
                            <div
                              className="h-1.5 bg-white"
                              style={{ width }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </Block>
          )}

          {(data.dateOfBirth ||
            data.nationality ||
            data.maritalStatus) && (
            <Block title="Personal Details">
              <div className="text-xs text-white/90 space-y-3">
                {data?.dateOfBirth && (
                  <p>
                    <span className="font-semibold block">
                      Date of Birth
                    </span>
                    {data.dateOfBirth}
                  </p>
                )}

                {data?.nationality && (
                  <p>
                    <span className="font-semibold block">
                      Nationality
                    </span>
                    {data.nationality}
                  </p>
                )}

                {data?.maritalStatus && (
                  <p>
                    <span className="font-semibold block">
                      Marital Status
                    </span>
                    {data.maritalStatus}
                  </p>
                )}
              </div>
            </Block>
          )}
        </aside>

        {/* ================= RIGHT COLUMN ================= */}
        <main className="p-8 text-gray-700">
          {/* HEADER */}
          <section>
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              {data.firstName} {data.lastName}
            </h1>

            {data.jobTitle && (
              <p
                className="mt-2 text-sm uppercase tracking-widest"
              >
                {data.jobTitle}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-6 text-xs text-gray-600">
              {data.about && (
                <Block title="About Me">
                  <p className="text-xs leading-relaxed">
                    {data.about}
                  </p>
                </Block>
              )}
            </div>
          </section>

          {data.experience?.length > 0 && (
            <Block title="Work Experience">
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <p className="font-semibold text-sm">
                      {exp.jobTitle} – {exp.company}, {exp.city}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(exp.startDate)} –{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                    {exp.description && (
                      <p className="text-xs mt-1">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </Block>
          )}

          {data.education?.length > 0 && (
            <Block title="Education">
              <div className="space-y-6">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="font-semibold text-sm">
                      {edu.degree} – {edu.school}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(edu.graduationDate)}
                    </p>
                    {edu.description && (
                      <p className="text-xs mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </Block>
          )}

          {data.skills?.length > 0 && (
            <Block title="Skills">
              <div className={`grid grid-cols-2 ${resumeData.showSkillMeter ? "gap-4" : "gap-2"}`}>
                {data.skills.map(skill => {
                  const width = skillWidths[skill.level] || "40%";

                  return (
                    <div key={skill.id}>
                      <p className="text-xs font-medium">
                        {skill.skillName}
                      </p>
                      {resumeData.showSkillMeter && (
                        <div className="w-full h-1.5 bg-gray-300 mt-1">
                          <div
                            className="h-1.5 bg-gray-700"
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

          {data.hobbies && (
            <Block title="Hobbies">
              <div className="flex gap-4 text-xs">
                {data.hobbies.split(",").map((h, i) => (
                  <span key={i}>{h.trim()}</span>
                ))}
              </div>
            </Block>
          )}
        </main>
      </div>
    </div>
  );
}

/* ================= SHARED BLOCK ================= */

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-widest border-b border-gray-300 pt-8 pb-2 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}
