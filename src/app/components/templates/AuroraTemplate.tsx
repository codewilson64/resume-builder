"use client";

import { fontMap } from "@/app/config/fontConfig";
import { useResume } from "@/app/context/ResumeContext";
import type { ResumeData } from "@/app/types/resume";
import Watermark from "../Watermark";

interface AuroraTemplateProps {
  data: ResumeData;
  variant?: "preview" | "thumbnail";
  isPremium: Boolean | null;
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

const DEV_USE_BAHASA = process.env.NODE_ENV === "development"; 

const TITLE_TRANSLATIONS: Record<string, string> = {
  "About Me": "Tentang Saya",
  "Summary": "Tentang Saya",
  "Contacts": "Kontak",
  "Social Links": "Media Sosial",
  "Links": "Media Sosial",
  "Languages": "Bahasa",
  "References": "Referensi",
  "Personal Details": "Data Pribadi",
  "Work Experience": "Pengalaman Kerja",
  "Education": "Pendidikan",
  "Skills": "Keahlian",
  "Hobbies": "Hobi",
};

function t(title: string) {
  return DEV_USE_BAHASA
    ? TITLE_TRANSLATIONS[title] || title
    : title;
}

const LABEL_TRANSLATIONS: Record<string, string> = {
  "Date of Birth": "Tanggal Lahir",
  "Nationality": "Kewarganegaraan",
  "Marital Status": "Status Pernikahan",
};

function tl(text: string) {
  return DEV_USE_BAHASA
    ? TITLE_TRANSLATIONS[text] ||
        LABEL_TRANSLATIONS[text] ||
        text
    : text;
}

export default function AuroraTemplate({
  data,
  variant,
  isPremium
}: AuroraTemplateProps) {
  const { resumeData } = useResume();
  const isThumbnail = variant === "thumbnail";

  return (
    <div className={`relative ${fontMap[data.fontFamily] || fontMap["Poppins"]}`}>
      {!isPremium && <Watermark />}
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
              {(data.address || data.city) && (
                <p>
                  {data.address}
                  {data.city ? `, ${data.city}` : ""}
                </p>
              )}
              {data.email && <p>{data.email}</p>}
              {data.phone && <p>{data.phone}</p>}
            </div>
          </header>

          {/* ================= PROFILE ================= */}
          {data.about && (
            <Block title="Summary">
              <div
                className="prose prose-sm max-w-none text-gray-900 text-xs leading-relaxed mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                dangerouslySetInnerHTML={{ __html: data.about }}
              />
            </Block>
          )}

          {/* ================= EXPERIENCE ================= */}
          {data.experience?.length > 0 && (
            <Block title="Work Experience">
              <div className="space-y-6">
                {data.experience
                  .filter(e => e.jobTitle || e.company)
                  .map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-center">
                        {exp.jobTitle && (
                            <p className="text-sm font-semibold">{exp.jobTitle}, {exp.company}, {exp.city}</p>
                          )}

                        <p className="text-xs font-semibold">
                          {exp.startDate && formatDate(exp.startDate)}
                          {exp.endDate || exp.current ? " – " : ""}
                          {exp.current ? "Present" : formatDate(exp.endDate)}
                        </p>                       
                      </div>

                      {exp.description && (
                        <div
                          className="prose prose-sm max-w-none text-gray-900 text-xs leading-relaxed mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
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
                        <p className="text-xs font-semibold">
                          
                          {edu.graduationDate &&
                            `${formatDate(edu.graduationDate)}`}
                        </p>
                      )}
                      </div>

                      {edu.description && (
                        <div
                          className="prose prose-sm max-w-none text-gray-900 text-xs leading-relaxed mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                          dangerouslySetInnerHTML={{ __html: edu.description }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </Block>
          )}

          {/* ================= SKILLS ================= */}
          {data.skills?.length > 0 && (
            <Block title="Skills">
              <div
                className={`grid grid-cols-3 ${
                  resumeData.showSkillMeter ? "gap-y-4" : "gap-y-2"
                }`}
              >
                {data.skills
                  .filter(skill => skill.skillName?.trim())
                  .map(skill => {
                    const width = skillWidths[skill.level] || "40%";

                    return (
                      <div key={skill.id} className="flex items-start gap-2">
                        {!resumeData.showSkillMeter && (
                          <span className="text-black text-lg leading-none">
                            •
                          </span>
                        )}

                        <div className="w-full">
                          {/* Skill name */}
                          <span className="block text-black text-xs">
                            {skill.skillName}
                          </span>

                          {/* Skill meter when enabled */}
                          {resumeData.showSkillMeter && (
                            <div className="mt-1 w-3/4 h-1 bg-gray-200">
                              <div
                                className="h-1 bg-gray-700 transition-all"
                                style={{ width }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Block>
          )}

          {/* ================= LANGUAGES ================= */}
          {data.languages?.length > 0 && (
            <Block title="Languages">
              <div
                className={
                  resumeData.showLanguageMeter
                    ? "grid grid-cols-3 gap-y-4"
                    : "space-y-2"
                }
              >
                {data.languages
                  .filter(lang => lang.name?.trim())
                  .map(lang => {
                    const width = languageWidths[lang.level] || "40%";

                    return resumeData.showLanguageMeter ? (
                      /* ===== Meter ON (grid) ===== */
                      <div key={lang.id}>
                        <span className="block mb-1 text-black text-xs">
                          {lang.name}
                        </span>

                        <div className="w-3/4 h-1 bg-gray-200">
                          <div
                            className="h-1 bg-gray-700 transition-all"
                            style={{ width }}
                          />
                        </div>
                      </div>
                    ) : (
                      /* ===== Meter OFF (block list with bullets) ===== */
                      <div key={lang.id} className="flex items-start gap-2">
                        <span className="mt-[1px] text-black text-lg leading-none">
                          •
                        </span>
                        <span className="text-black text-xs">
                          {lang.name}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </Block>
          )}

          {/* ================= PERSONAL DETAILS ================= */}
          {(data.dateOfBirth || data.nationality || data.maritalStatus) && (
            <Block title="Personal Details">
              <ul className="text-xs space-y-2 text-gray-700">
                {data.dateOfBirth && (
                  <li>
                    <span className="font-semibold">{tl("Date of Birth")}:</span>{" "}
                    {data.dateOfBirth}
                  </li>
                )}
                {data.nationality && (
                  <li>
                    <span className="font-semibold">{tl("Nationality")}:</span>{" "}
                    {data.nationality}
                  </li>
                )}
                {data.maritalStatus && (
                  <li>
                    <span className="font-semibold">{tl("Marital Status")}:</span>{" "}
                    {data.maritalStatus}
                  </li>
                )}
              </ul>
            </Block>
          )}

          {/* REFERENCES */}
          {data?.references.length > 0 && (
            <Block title="References">
              {resumeData.hideReferences ? (
                <p className="text-xs">
                  References available upon request
                </p>
              ) : (
                <div className="space-y-3 text-xs">
                  {data.references.map((ref) => (
                    <div key={ref.id} className="space-y-1">
                      <p className="font-semibold text-gray-800">
                        {ref.fullName}
                      </p>

                      {ref.companyName && (
                        <p>{ref.companyName}</p>
                      )}

                      {(ref.phone) && (
                        <p className="">
                          {ref.phone}
                        </p>
                      )}

                      {(ref.email) && (
                        <p className="">
                          {ref.email}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Block>
          )}

          {/* ================= SOCIAL LINKS ================= */}
          {data.socialLinks?.length > 0 && (
            <Block title="Social Links">
              <ul className="space-y-2 text-xs">
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
            <Block title="Hobbies">
              <ul className="text-xs list-disc list-inside space-y-1">
                {data.hobbies.split(",").map((hobby, i) => (
                  <li key={i}>{hobby.trim()}</li>
                ))}
              </ul>
            </Block>
          )}

          {/* CUSTOM SECTIONS */}
          {data?.customSections?.length > 0 &&
            data.customSections
              .filter(
                (section) =>
                  section.sectionName?.trim() || section.description?.trim()
              )
              .map((section) => (
                <Block
                  key={section.id}
                  title={section.sectionName || "Custom Section"}
                >
                  {section.description && (
                    <div
                      className="prose prose-sm max-w-none text-xs leading-relaxed
                                prose-li:marker:text-gray-900
                                prose-p:my-0
                                prose-ul:my-1
                                prose-ol:my-1
                                prose-li:my-0"
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                  )}
                </Block>
          ))}
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
        {t(title)}
      </h2>
      {children}
    </section>
  );
}

