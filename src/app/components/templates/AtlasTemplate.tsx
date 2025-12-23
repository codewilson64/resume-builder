"use client";

import { fontMap } from "@/app/config/fontConfig";
import type { ResumeData } from "@/app/types/resume";

interface AtlasTemplateProps {
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

export default function AtlasTemplate({
  data,
  variant,
}: AtlasTemplateProps) {
  const isThumbnail = variant === "thumbnail";

  return (
    <div className={fontMap[data.fontFamily] || fontMap["Poppins"]}>
      {/* PAGE */}
      <div
        className="bg-white shadow-xl"
        style={{
          height: isThumbnail ? 1123 : "auto",
          minHeight: !isThumbnail ? 1123 : undefined,
        }}
      >
        <div className="p-10 flex gap-10 text-gray-900">
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex-1 flex flex-col gap-8">
            {/* HEADER */}
            <header>
              <h1 className="text-4xl font-bold leading-tight">
                {data.firstName} {data.lastName}
              </h1>
              <p className="mt-1 text-sm font-medium">
                {data.jobTitle}
              </p>
            </header>

            {/* SUMMARY */}
            {data.about && (
              <Block title="Summary">
                <p className="text-xs leading-relaxed">
                  {data.about}
                </p>
              </Block>
            )}

            {/* EXPERIENCE */}
            {data.experience?.length > 0 && (
              <Block title="Experience">
                <div className="space-y-6">
                  {data.experience
                    .filter(e => e.jobTitle || e.company)
                    .map(exp => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-semibold">
                            {exp.jobTitle}
                            {exp.company && `, ${exp.company}`}
                          </p>

                          <p className="text-xs font-semibold">
                            {exp.startDate && formatDate(exp.startDate)}
                            {exp.endDate || exp.current ? " – " : ""}
                            {exp.current ? "Present" : formatDate(exp.endDate)}
                          </p>
                        </div>

                        {exp.description && (
                          <p className="text-xs mt-2">
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
              <Block title="Education">
                <div className="space-y-6">
                  {data.education
                    .filter(e => e.degree || e.school)
                    .map(edu => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-semibold">
                            {edu.degree}
                            {edu.school && `, ${edu.school}`}
                          </p>

                          {edu.graduationDate && (
                            <p className="text-xs font-semibold">
                              {formatDate(edu.graduationDate)}
                            </p>
                          )}
                        </div>

                        {edu.description && (
                          <p className="text-xs mt-2">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </Block>
            )}
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <aside className="w-64 flex flex-col gap-8">
            {/* DETAILS */}
            {(data.email || data.phone || data.address || data.city) && (
              <section>
                <h2 className="text-sm font-bold mb-3">
                  Contact
                </h2>

                {data.email && <p className="text-xs">{data.email}</p>}
                {(data.address || data.city) && (
                  <p className="text-xs mt-1">
                    {data.address}
                    {data.city ? `, ${data.city}` : ""}
                  </p>
                )}
                {data.phone && (
                  <p className="text-xs mt-1">
                    {data.phone}
                  </p>
                )}
              </section>
            )}

            {/* SOCIAL LINKS */}
            {data.socialLinks?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold mb-3">
                  Websites and Social Links
                </h2>

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
              </section>
            )}

            {/* SKILLS */}
            {data.skills?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold mb-3">
                  Skills
                </h2>

                {data.skills
                  .filter(skill => skill.skillName?.trim())
                  .map(skill => {
                    const width = skillWidths[skill.level] || "40%";

                    return (
                      <div key={skill.id} className="mb-3">
                        <span className="text-xs">
                          {skill.skillName}
                        </span>
                        <div className="w-full h-1 bg-gray-200 mt-1">
                          <div
                            className="h-1 transition-all"
                            style={{
                              width,
                              backgroundColor: data.accentColor,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </section>
            )}

            {/* LANGUAGES */}
            {data.languages?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold mb-3">
                  Languages
                </h2>

                {data.languages
                  .filter(lang => lang.name?.trim())
                  .map(lang => {
                    const width = languageWidths[lang.level] || "40%";

                    return (
                      <div key={lang.id} className="mb-3">
                        <span className="text-xs">
                          {lang.name}
                        </span>
                        <div className="w-full h-1 bg-gray-200 mt-1">
                          <div
                            className="h-1 transition-all"
                            style={{
                              width,
                              backgroundColor: data.accentColor,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </section>
            )}

            {/* PERSONAL DETAILS */}
            {(data.dateOfBirth || data.nationality || data.maritalStatus) && (
              <section>
                <h2 className="text-sm font-bold mb-3">
                  Personal Details
                </h2>

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
              </section>
            )}

            {/* HOBBIES */}
            {data.hobbies && (
              <section>
                <h2 className="text-sm font-bold mb-3">
                  Hobbies and Interests
                </h2>
                <ul className="text-xs list-disc list-inside space-y-1">
                  {data.hobbies.split(",").map((hobby, i) => (
                    <li key={i}>{hobby.trim()}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ================= SHARED ================= */

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-sm font-bold border-b border-black pb-1 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}
