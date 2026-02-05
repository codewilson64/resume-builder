"use client";

import { fontMap } from "@/app/config/fontConfig";
import { useResume } from "@/app/context/ResumeContext";
import type { ResumeData } from "@/app/types/resume";
import Watermark from "../Watermark";

interface AstraTemplateProps {
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
    month: "long",
    year: "numeric",
  }).toUpperCase();
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
  "Experience": "Pengalaman Kerja",
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

export default function AstraTemplate({
    data,
    variant,
    isPremium
  }: AstraTemplateProps) {
    const { resumeData } = useResume();
    const isThumbnail = variant === "thumbnail";
  
    return (
      <div className={`relative ${fontMap[resumeData.fontFamily] || fontMap["Poppins"]}`}>
        {!isPremium && <Watermark />}
        <div
          className="bg-white shadow-xl"
          style={{
            height: isThumbnail ? 1123 : "auto",
            minHeight: !isThumbnail ? 1123 : undefined,
          }}
        >
          <div className="p-12 text-gray-900">
  
            {/* ================= HEADER ================= */}
            <header className="h-20 grid grid-cols-2 gap-8 items-start">
              <div>
                {data.jobTitle && (
                  <p className="text-xs tracking-widest mb-2">
                    {data.jobTitle}
                  </p>
                )}
                <h1 className="text-3xl font-bold tracking-wide mb-3">
                  {data.firstName} {data.lastName}
                </h1>
              </div>
  
              <div className="text-right text-[11px] tracking-wide space-y-2 text-gray-600">
                {(data.address || data.city || data.postalCode) && (
                  <p>
                    {data.address}
                    {data.city && `, ${data.city}`}
                    {data.postalCode && `, ${data.postalCode}`}
                  </p>
                )}
                {data.email && <p>{data.email}</p>}
                {data.phone && <p>{data.phone}</p>}
              </div>
            </header>
  
            <hr className="border-t border-gray-800" />
  
            {/* ================= SUMMARY ================= */}
            {data.about && (
              <Block title="Summary">
                <div
                  className="prose prose-sm max-w-none text-gray-800 text-[11px] leading-relaxed prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                  dangerouslySetInnerHTML={{ __html: data.about }}
                />
              </Block>
            )}
  
            {/* ================= SKILLS ================= */}
            {data.skills?.filter(s => s.skillName?.trim()).length > 0 && (
              <Block title="Skills">
                <div
                  className={`grid grid-cols-2 ${
                    resumeData.showSkillMeter ? "gap-y-4" : "gap-y-2"
                  }`}
                >
                  {data.skills
                    .filter(s => s.skillName?.trim())
                    .map(skill => {
                      const width = skillWidths[skill.level] || "40%";

                      return resumeData.showSkillMeter ? (
                        /* ===== Meter ON ===== */
                        <div key={skill.id}>
                          <span className="text-[11px] block mb-1 text-black">
                            {skill.skillName}
                          </span>

                          <div className="w-3/4 h-1 bg-gray-200">
                            <div
                              className="h-1 bg-gray-700 transition-all"
                              style={{ width }}
                            />
                          </div>
                        </div>
                      ) : (
                        /* ===== Meter OFF (bullets) ===== */
                        <div key={skill.id} className="flex items-start gap-2">
                          <span className="text-black text-lg leading-none">
                            •
                          </span>
                          <span className="text-[11px] text-black">
                            {skill.skillName}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </Block>
            )}

            {/* ================= EXPERIENCE ================= */}
            {data.experience?.filter(exp => exp.jobTitle?.trim() || exp.company?.trim()).length > 0 && (
              <Block title="Experience">
                <div className="space-y-6">
                  {data.experience
                  .filter(e => e.jobTitle || e.company)
                  .map(exp => (
                    <div key={exp.id}>
                      <p className="text-xs uppercase tracking-wide text-gray-600 mb-1">
                        {formatDate(exp.startDate)}
                        {(exp.endDate || exp.current) && " – "}
                        {exp.current ? "PRESENT" : formatDate(exp.endDate)}
                      </p>
  
                      <p className="text-sm font-semibold">
                        {exp.jobTitle} | {exp.company}, {exp.city}
                      </p>
  
                      {exp.description && (
                        <div
                          className="prose prose-sm max-w-none text-gray-700 text-[11px] leading-relaxed mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Block>
            )}
  
            {/* ================= EDUCATION ================= */}
            {data.education?.filter(edu => edu.degree?.trim() || edu.school?.trim()).length > 0 && (
              <Block title="Education">
                <div className="space-y-6">
                  {data.education
                    .filter(edu => edu.degree?.trim() || edu.school?.trim())
                    .map(edu => (
                      <div key={edu.id}>
                        {edu.graduationDate && (
                        <p className="text-xs uppercase tracking-wide text-gray-600 mb-1">
                          {formatDate(edu.graduationDate)}
                        </p>
                      )}
  
                      <p className="text-sm font-semibold">
                        {edu.degree} | {edu.school}, {edu.city}
                      </p>
  
                      {edu.description && (
                        <div
                          className="prose prose-sm max-w-none text-gray-700 text-[11px] leading-relaxed mt-2 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                          dangerouslySetInnerHTML={{ __html: edu.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Block>
            )}
  
            {/* ================= LANGUAGES (BOTTOM) ================= */}
            {data.languages?.filter(l => l.name?.trim()).length > 0 && (
              <Block title="Languages">
                <div
                  className={
                    resumeData.showLanguageMeter
                      ? "grid grid-cols-2 gap-y-4"
                      : "space-y-2"
                  }
                >
                  {data.languages
                    .filter(l => l.name?.trim())
                    .map(lang => {
                      const width = languageWidths[lang.level] || "40%";

                      return resumeData.showLanguageMeter ? (
                        /* ===== Meter ON (2-column grid) ===== */
                        <div key={lang.id}>
                          <span className="text-[11px] block mb-1 text-black">
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
                          <span className="text-black text-lg leading-none">
                            •
                          </span>
                          <span className="text-xs text-black">
                            {lang.name}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </Block>
            )}

            {/* ================= SOCIAL LINKS (TOP) ================= */}
            {data.socialLinks?.filter(s => s.label?.trim() || s.url?.trim()).length > 0 && (
              <Block title="Social Links">
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
                            className="break-all"
                          >
                            {link.url}
                        </a>
                        )}
                      </div>
                    ))}
                </div>
              </Block>
            )}

            {/* ================= PERSONAL DETAILS ================= */}
            {(data.nationality || data.dateOfBirth || data.maritalStatus) && (
            <Block title="Personal Details">
                <div className="flex flex-col space-y-2 text-[11px]">
                {data.nationality && (
                    <span>
                    <span className="font-semibold">{tl("Nationality")}:</span>{" "}
                    {data.nationality}
                    </span>
                )}

                {data.dateOfBirth && (
                    <span>
                    <span className="font-semibold">{tl("Date of Birth")}:</span>{" "}
                    {data.dateOfBirth}
                    </span>
                )}

                {data.maritalStatus && (
                    <span>
                    <span className="font-semibold">{tl("Marital Status")}:</span>{" "}
                    {data.maritalStatus}
                    </span>
                )}
                </div>
            </Block>
            )}

            {/* REFERENCES */}
            {data?.references?.filter(ref => ref.fullName?.trim() || ref.companyName?.trim() || ref.phone?.trim() || ref.email?.trim()).length > 0 && (
              <Block title="References">
                {resumeData.hideReferences ? (
                  <p className="text-[11px]">
                    References available upon request
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.references
                      .filter(ref => ref.fullName?.trim() || ref.companyName?.trim() || ref.phone?.trim() || ref.email?.trim())  
                      .map(ref => (
                      <div key={ref.id} className="text-[11px] space-y-1">
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
                        className="prose prose-sm max-w-none text-[11px] leading-relaxed
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

function Block({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <section className="grid grid-cols-[150px_1fr] gap-8 pt-10">
        <h2 className="text-sm font-bold uppercase tracking-widest">
          {t(title)}
        </h2>
        <div>{children}</div>
      </section>
    );
}
  
