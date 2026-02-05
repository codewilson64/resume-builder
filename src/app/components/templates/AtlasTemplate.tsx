"use client";

import { fontMap } from "@/app/config/fontConfig";
import { useResume } from "@/app/context/ResumeContext";
import type { ResumeData } from "@/app/types/resume";
import Watermark from "../Watermark";

interface AtlasTemplateProps {
  data: ResumeData;
  variant?: "preview" | "thumbnail";
  isPremium: boolean;
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

// const DEV_USE_BAHASA = process.env.NODE_ENV === "development"; 
const DEV_USE_BAHASA = false; 

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

export default function AtlasTemplate({
  data,
  variant,
  isPremium
}: AtlasTemplateProps) {
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
        }}
      >
        <div className="p-10 flex gap-10 text-gray-900">
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex-1 flex flex-col">
            {/* HEADER */}
            <header className="h-20">
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
                <div
                  className="prose prose-sm max-w-none text-gray-900 text-[11px] leading-relaxed mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                  dangerouslySetInnerHTML={{ __html: data.about }}
                />
              </Block>
            )}

            {/* EXPERIENCE */}
            {data.experience?.filter(exp => exp.jobTitle?.trim() || exp.company?.trim()).length > 0 && (
              <Block title="Work Experience">
                <div className="space-y-6">
                  {data.experience
                    .filter(e => e.jobTitle || e.company)
                    .map(exp => (
                      <div key={exp.id}>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">
                            {[exp.jobTitle, exp.company, exp.city].filter(Boolean).join(", ")}
                          </p>

                          <p className="text-xs font-normal">
                            {exp.startDate && formatDate(exp.startDate)}
                            {exp.endDate || exp.current ? " – " : ""}
                            {exp.current ? "Present" : formatDate(exp.endDate)}
                          </p>
                        </div>

                        {exp.description && (
                          <div
                            className="prose prose-sm max-w-none text-gray-900 text-[11px] leading-relaxed mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                            dangerouslySetInnerHTML={{ __html: exp.description }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </Block>
            )}

            {/* EDUCATION */}
            {data.education?.filter(edu => edu.degree?.trim() || edu.school?.trim()).length > 0 && (
              <Block title="Education">
                <div className="space-y-6">
                  {data.education
                    .filter(e => e.degree || e.school)
                    .map(edu => (
                      <div key={edu.id}>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">
                            {[edu.school, edu.degree, edu.city].filter(Boolean).join(", ")}
                          </p>

                          {edu.graduationDate && (
                            <p className="text-xs font-normal">
                              {formatDate(edu.graduationDate)}
                            </p>
                          )}
                        </div>

                        {edu.description && (
                          <div
                            className="prose prose-sm max-w-none text-gray-900 text-[11px] leading-relaxed mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                            dangerouslySetInnerHTML={{ __html: edu.description }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </Block>
            )}

            {/* HOBBIES */}
            {data.hobbies && (
              <Block title="Hobbies">
                <ul className="text-[11px] list-disc list-inside space-y-1">
                  {data.hobbies.split(",").map((hobby, i) => (
                    <li key={i}>{hobby.trim()}</li>
                  ))}
                </ul>
              </Block>
            )}
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <aside className="w-64 flex flex-col">
            {/* DETAILS */}
            {(data.email || data.phone || data.address || data.city) && (
              <Block title="Contacts">
                {data.email && <p className="text-[11px]">{data.email}</p>}
                {(data.address || data.city) && (
                  <p className="text-[11px] mt-1">
                    {data.address}
                    {data.city ? `, ${data.city}` : ""}
                  </p>
                )}
                {data.phone && (
                  <p className="text-[11px] mt-1">
                    {data.phone}
                  </p>
                )}
              </Block>
            )}

            {/* SOCIAL LINKS */}
            {data.socialLinks?.filter(link => link.label?.trim() || link.url?.trim()).length > 0 && (
              <Block title="Links">
                <div className="space-y-2 text-[11px]">
                  {data.socialLinks
                    .filter(s => s.label || s.url)
                    .map(link => (
                      <div key={link.id}>
                        {link.label && (
                          <span className="font-semibold">
                            {link.label}:{" "}
                          </span>
                        )}
                        {link.url && (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block break-all"
                          >
                            {link.url}
                        </a>
                        )}
                      </div>
                    ))}
                </div>
              </Block>
            )}

            {/* SKILLS */}
            {data.skills?.filter(skill => skill.skillName?.trim()).length > 0 && (
              <Block title="Skills">
                {data.skills
                  .filter(skill => skill.skillName?.trim())
                  .map(skill => {
                    const width = skillWidths[skill.level] || "40%";

                    return resumeData.showSkillMeter ? (
                      /* ===== Meter ON ===== */
                      <div key={skill.id} className="mb-3">
                        <span className="text-[11px] text-black">
                          {skill.skillName}
                        </span>

                        <div className="w-2/3 h-1 bg-gray-200 mt-1">
                          <div
                            className="h-1 bg-gray-700 transition-all"
                            style={{ width }}
                          />
                        </div>
                      </div>
                    ) : (
                      /* ===== Meter OFF (bullets) ===== */
                      <div key={skill.id} className="mb-1 flex items-start gap-2">
                        <span className="text-black text-lg leading-none">
                          •
                        </span>
                        <span className="text-[11px] text-black">
                          {skill.skillName}
                        </span>
                      </div>
                    );
                  })}
              </Block>
            )}

            {/* LANGUAGES */}
            {data.languages?.filter(lang => lang.name?.trim()).length > 0 && (
              <Block title="Languages">
                {data.languages
                  .filter(lang => lang.name?.trim())
                  .map(lang => {
                    const width = languageWidths[lang.level] || "40%";

                    return resumeData.showLanguageMeter ? (
                      /* ===== Meter ON ===== */
                      <div key={lang.id} className="mb-3">
                        <span className="text-[11px] text-black">
                          {lang.name}
                        </span>

                        <div className="w-2/3 h-1 bg-gray-200 mt-1">
                          <div
                            className="h-1 bg-gray-700 transition-all"
                            style={{ width }}
                          />
                        </div>
                      </div>
                    ) : (
                      /* ===== Meter OFF (bullets) ===== */
                      <div key={lang.id} className="mb-1 flex items-start gap-2">
                        <span className="text-black text-lg leading-none">
                          •
                        </span>
                        <span className="text-xs text-black">
                          {lang.name}
                        </span>
                      </div>
                    );
                  })}
              </Block>
            )}

            {/* PERSONAL DETAILS */}
            {(data.dateOfBirth || data.nationality || data.maritalStatus) && (
              <Block title="Personal Details">
                <ul className="text-[11px] space-y-2 text-black">
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
            {data?.references?.filter(ref => ref.fullName?.trim() || ref.companyName?.trim() || ref.phone?.trim() || ref.email?.trim()).length > 0 && (
              <Block title="References">
                {resumeData.hideReferences ? (
                  <p className="text-[11px] text-black">
                    References available upon request
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.references.map((ref) => (
                      <div key={ref.id} className="text-[11px] text-black space-y-1">
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
                        className="prose prose-sm max-w-none text-[11px] leading-relaxed text-black
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
      <h2 className="text-[16px] font-bold border-b border-black pt-6 pb-1 mb-3">
        {t(title)}
      </h2>
      {children}
    </section>
  );
}
