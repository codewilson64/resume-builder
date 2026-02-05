"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { fontMap } from "@/app/config/fontConfig";
import type { ResumeData } from "@/app/types/resume";
import { useResume } from "@/app/context/ResumeContext";
import Watermark from "../Watermark";

interface OrionTemplateProps {
  data: ResumeData;
  variant?: "preview" | "thumbnail";
  isPremium: boolean;
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

export default function OrionTemplate({ data, variant, isPremium }: OrionTemplateProps) {
  const { resumeData } = useResume();
  const isThumbnail = variant === "thumbnail";

  return (
    <div className={`relative ${fontMap[resumeData.fontFamily] || fontMap.Poppins}`}>
      {!isPremium && <Watermark />}
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
          {(data?.email || data?.phone || data?.address || data?.city || data?.postalCode) && (
            <Block title="Contacts">
              <section className="flex flex-col gap-2 items-start text-[11px] text-white">
                
                {data.email && (
                  <div className="flex gap-2">
                    <Mail size={13} />
                    <span>{data.email}</span>
                  </div>
                )}

                {data.phone && (
                  <div className="flex gap-2">
                    <Phone size={13} />
                    <span>{data.phone}</span>
                  </div>
                )}

                {(data.address || data.city || data.postalCode) && (
                  <div className="flex gap-2">
                    <MapPin size={13} />
                    <span>
                      {[data.address, data.city, data.postalCode]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}

              </section>
            </Block>
          )}

          {data?.socialLinks?.filter(link => link.label?.trim() || link.url?.trim()).length > 0 && (
            <Block title="Links">
              <div className="space-y-3 text-[11px]">
                {data.socialLinks
                  .filter(link => link.label?.trim() || link.url?.trim())
                  .map(link => (
                  <div key={link.id}>
                    <p className="font-semibold">{link.label}</p>
                     <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block break-all text-white/90"
                      >
                        {link.url}
                      </a>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {data.languages?.filter(l => l.name?.trim()).length > 0 && (
            <Block title="Languages">
              <div className="space-y-3">
                {data.languages
                  .filter(l => l.name?.trim())
                  .map(lang => {
                    const width =
                      languageWidths[lang.level] || "40%";

                    return (
                      <div key={lang.id}>
                        <p className="text-[11px] mb-1">{lang.name}</p>
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

          {(data.dateOfBirth || data.nationality || data.maritalStatus) && (
            <Block title="Personal Details">
              <div className="text-[11px] text-white/90 space-y-3">
                {data?.dateOfBirth && (
                  <p>
                    <span className="font-semibold block">
                      {tl("Date of Birth")}
                    </span>
                    {data.dateOfBirth}
                  </p>
                )}

                {data?.nationality && (
                  <p>
                    <span className="font-semibold block">
                      {tl("Nationality")}
                    </span>
                    {data.nationality}
                  </p>
                )}

                {data?.maritalStatus && (
                  <p>
                    <span className="font-semibold block">
                      {tl("Marital Status")}
                    </span>
                    {data.maritalStatus}
                  </p>
                )}
              </div>
            </Block>
          )}

          {/* REFERENCES */}
          {data?.references?.filter(ref => ref.fullName?.trim() || ref.companyName?.trim() || ref.phone?.trim() || ref.email?.trim()).length > 0 && (
            <Block title="References">
              {resumeData.hideReferences ? (
                <p className="text-xs">
                  References available upon request
                </p>
              ) : (
                <div className="space-y-3">
                  {data.references
                  .filter(ref => ref.fullName?.trim() || ref.companyName?.trim() || ref.phone?.trim() || ref.email?.trim())
                  .map((ref) => (
                    <div key={ref.id} className="text-[11px] space-y-1">
                      <p className="font-semibold">
                        {ref.fullName}
                      </p>

                      {ref.companyName && (
                        <p>{ref.companyName}</p>
                      )}

                      {(ref.phone) && (
                        <p>
                          {ref.phone}
                        </p>
                      )}

                      {(ref.email) && (
                        <p>
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
                      className="prose prose-sm max-w-none text-[11px] leading-relaxed text-white
                                prose-li:marker:text-white
                                prose-strong:text-white
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

        {/* ================= RIGHT COLUMN ================= */}
        <main className="p-8 text-gray-700">
          {/* HEADER */}
          <header className="h-20">
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              {data.firstName} {data.lastName}
            </h1>

            {data.jobTitle && (
              <p className="mt-2 text-sm uppercase tracking-widest">
                {data.jobTitle}
              </p>
            )}
          </header>

          {data.about && (
                <Block title="About Me">
                  <div
                    className="prose prose-sm max-w-none text-[11px] leading-relaxed prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                    dangerouslySetInnerHTML={{ __html: data.about }}
                  />
                </Block>
          )}

          {data.skills?.filter(skill => skill.skillName?.trim()).length > 0 && (
            <Block title="Skills">
              <div
                className={`grid grid-cols-2 ${
                  resumeData.showSkillMeter ? "gap-4" : "gap-1"
                }`}
              >
                {data.skills
                  .filter(skill => skill.skillName?.trim())
                  .map(skill => {
                    const width = skillWidths[skill.level] || "40%";

                  return resumeData.showSkillMeter ? (
                    /* ===== Meter ON ===== */
                    <div key={skill.id}>
                      <p className="text-[11px]">
                        {skill.skillName}
                      </p>

                      <div className="w-full h-1.5 bg-gray-300 mt-1">
                        <div
                          className="h-1.5 bg-gray-700"
                          style={{ width }}
                        />
                      </div>
                    </div>
                  ) : (
                    /* ===== Meter OFF (bullets, still grid-cols-2) ===== */
                    <div key={skill.id} className="flex items-start gap-2">
                      <span className="text-lg leading-none text-black">
                        •
                      </span>
                      <p className="text-[11px]">
                        {skill.skillName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Block>
          )}

          {data.experience?.filter(exp => exp.jobTitle?.trim() || exp.company?.trim()).length > 0 && (
            <Block title="Work Experience">
              <div className="space-y-6">
                {data.experience
                .filter(exp => exp.jobTitle?.trim() || exp.company?.trim())
                .map(exp => (
                  <div key={exp.id}>
                    <p className="font-semibold text-sm">
                      {exp.jobTitle} – {exp.company}, {exp.city}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(exp.startDate)} –{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                    {exp.description && (
                      <div
                        className="prose prose-sm max-w-none text-[11px] leading-relaxed mt-1 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Block>
          )}

          {data.education?.filter(edu => edu.degree?.trim() || edu.school?.trim()).length > 0 && (
            <Block title="Education">
              <div className="space-y-6">
                {data.education
                .filter(edu => edu.degree?.trim() || edu.school?.trim())
                .map(edu => (
                  <div key={edu.id}>
                    <p className="font-semibold text-sm">
                      {edu.degree} – {edu.school}, {edu.city}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(edu.graduationDate)}
                    </p>
                    {edu.description && (
                      <div
                        className="prose prose-sm max-w-none text-[11px] leading-relaxed mt-1 prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                        dangerouslySetInnerHTML={{ __html: edu.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Block>
          )}

          {data.hobbies && (
            <Block title="Hobbies">
              <div className="flex gap-4 text-[11px]">
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
        {t(title)}
      </h2>
      {children}
    </section>
  );
}
