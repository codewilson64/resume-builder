"use client";

import { fontMap } from "@/app/config/fontConfig";
import { useResume } from "@/app/context/ResumeContext";
import { Mail, Phone, MapPin } from "lucide-react";
import type { ResumeData } from "@/app/types/resume";
import Watermark from "../Watermark";

interface VegaTemplateProps {
  data: ResumeData;
  variant?: "preview" | "thumbnail";
  isPremium: boolean;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "-01");
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

const skillDots: Record<string, number> = {
  Beginner: 2,
  Intermediate: 3,
  Advanced: 4,
  Expert: 5,
};

const languageDots: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Fluent: 4,
  Native: 5,
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

export default function VegaTemplate({ data, variant, isPremium }: VegaTemplateProps) {
  const { resumeData } = useResume();
  const isThumbnail = variant === "thumbnail";

  return (
    <div className={`relative ${fontMap[resumeData.fontFamily] || fontMap.Poppins}`}>
      {!isPremium && <Watermark />}
      <div
        className="bg-white shadow-xl"
        style={{
          height: isThumbnail ? 1123 : "auto",
          minHeight: !isThumbnail ? 1123 : undefined,
        }}
      >
        {/* HEADER */}
        <header className="h-48 flex flex-col items-start justify-center px-8 bg-[#EFE6DE]">
          <h1 className="text-3xl font-bold text-gray-800">
            {data.firstName} {data.lastName}
          </h1>
          {data.jobTitle && (
            <p className="mt-1 text-sm font-medium text-gray-800">
              {data.jobTitle}
            </p>
          )}
          {/* CONTACT DETAILS */}
          <div className="mt-4 space-y-1 text-[11px] text-gray-800">
            {(data.address || data.city || data.postalCode) && (
              <p className="flex items-center gap-2">
                <MapPin size={12} />
                <span>
                  {data.address}
                  {data.address && data.city && ", "}
                  {data.city}
                  {data.postalCode && `, ${data.postalCode}`}
                </span>
              </p>
            )}
            {data.email && (
              <p className="flex items-center gap-2">
                <Mail size={12} /> {data.email}
              </p>
            )}
            {data.phone && (
              <p className="flex items-center gap-2">
                <Phone size={12} /> {data.phone}
              </p>
            )}
          </div>
        </header>

        {/* BODY */}
        <div className="grid grid-cols-[260px_1fr] relative">
          {/* LEFT */}
          <aside className="px-8 py-6 pt-0 text-gray-800 border-r border-gray-300">
            {/* ABOUT ME */}
            {data.about && (
              <Block title="Summary">
                <div
                  className="prose prose-sm max-w-none text-gray-800 text-[11px] leading-relaxed prose-li:marker:text-gray-900 prose-p:my-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                  dangerouslySetInnerHTML={{ __html: data.about }}
                />
              </Block>
            )}

            {/* SKILLS */}
            {data.skills?.filter(skill => skill.skillName?.trim()).length > 0 && (
              <Block title="Skills">
                {data.skills
                  .filter(skill => skill.skillName?.trim())
                  .map(skill => {
                    const filled = skillDots[skill.level] ?? 2;

                    return resumeData.showSkillMeter ? (
                      /* ===== 5 DOT METER ===== */
                      <div key={skill.id} className="mb-2">
                        <span className="text-[11px] text-gray-800">
                          {skill.skillName}
                        </span>

                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < filled ? "bg-gray-800" : "bg-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* ===== Meter OFF (bullets) ===== */
                      <div key={skill.id} className="mb-1 flex items-start gap-2">
                        <span className="text-gray-800 text-lg leading-none">•</span>
                        <span className="text-[11px] text-gray-800">
                          {skill.skillName}
                        </span>
                      </div>
                    );
                  })}
              </Block>
            )}

            {/* LANGUAGES */}
            {data?.languages?.filter(lang => lang.name?.trim()).length > 0 && (
              <Block title="Languages">
                <div className="space-y-3">
                  {data.languages
                    .filter(lang => lang.name?.trim())
                    .map(lang => {
                      const filled = languageDots[lang.level] ?? 3;

                      return (
                        <div key={lang.id}>
                          <p className="text-[11px] text-gray-800 mb-1">
                            {lang.name}
                          </p>

                          {resumeData.showLanguageMeter && (
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < filled ? "bg-gray-800" : "bg-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </Block>
            )}

            {/* PERSONAL DETAILS */}
            {(data?.dateOfBirth || data?.nationality || data?.maritalStatus) && (
              <Block title="Personal Details">
                <div className="text-[11px] space-y-3">
                  {data?.dateOfBirth && (
                    <p>
                      <span className="font-semibold block">{tl("Date of Birth")}</span>
                      <span className="text-gray-800">{data.dateOfBirth}</span>
                    </p>
                  )}
              
                  {data?.nationality && (
                    <p>
                      <span className="font-semibold block">{tl("Nationality")}</span>
                      <span className="text-gray-800">{data.nationality}</span>
                    </p>
                  )}
              
                  {data?.maritalStatus && (
                    <p>
                      <span className="font-semibold block">{tl("Marital Status")}</span>
                      <span className="text-gray-800">{data.maritalStatus}</span>
                    </p>
                  )}
                </div>
              </Block>          
            )}

            {/* REFERENCES */}
            {data?.references.filter(ref => ref.fullName?.trim() || ref.companyName?.trim() || ref.phone?.trim() || ref.email?.trim()).length > 0 && (
              <Block title="References">
                <div>
                {resumeData.hideReferences ? (
                  <p className="text-[11px] text-gray-800">
                    References available upon request
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.references
                    .filter(ref => ref.fullName?.trim() || ref.companyName?.trim() || ref.phone?.trim() || ref.email?.trim())
                    .map((ref) => (
                      <div key={ref.id} className="text-xs space-y-1">
                        <p className="font-semibold">
                          {ref.fullName}
                        </p>

                        {ref.companyName && (
                          <p className="text-[11px] text-gray-800">
                            {ref.companyName}
                          </p>
                        )}

                        {(ref.phone) && (
                          <p className="text-[11px] text-gray-800">
                            {ref.phone}
                          </p>
                        )}

                        {(ref.email) && (
                          <p className="text-[11px] text-gray-800">
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

            {/* CUSTOM SECTIONS */}
            {data?.customSections?.filter(section => section.sectionName?.trim() || section.description?.trim()).length > 0 && (
              <>
                {data.customSections
                  .filter(section => section.sectionName?.trim() || section.description?.trim())
                  .map(section => (
                    <Block
                      key={section.id}
                      title={section.sectionName || "Custom Section"}
                    >
                      {section.description && (
                        <div
                          className="prose prose-sm max-w-none text-[11px] leading-relaxed text-gray-800
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
              </>
            )}
          </aside>

          {/* RIGHT */}
          <main className="px-8 py-6 pt-0 text-gray-800">
            {/* LINKS */}
            {data?.socialLinks?.filter(link => link.label?.trim() || link.url?.trim()).length > 0 && (
              <Block title="Links">
              <div className="space-y-3 text-[11px]">
                {data.socialLinks
                  .filter(link => link.label?.trim() || link.url?.trim())
                  .map((link) => (
                  <p key={link.id}>
                    <span className="font-semibold block">{link.label}: </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block break-all"
                    >
                     {link.url}
                    </a>
                  </p>
                ))}
              </div>
            </Block>            
            )}

            {data.experience?.filter(exp => exp.jobTitle?.trim() || exp.company?.trim()).length > 0 && (
              <MainBlock title="Work Experience">
                <div className="space-y-6">
                {data.experience
                  .filter(exp => exp.jobTitle?.trim() || exp.company?.trim())
                  .map(exp => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between gap-3">
                      <p className="text-sm font-semibold leading-tight">
                        {exp.jobTitle}
                      </p>

                      <p className="text-xs text-gray-600 whitespace-nowrap">
                        {formatDate(exp.startDate)}
                        {exp.startDate && (exp.current || exp.endDate) && " – "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>

                    <p className="text-xs text-gray-700">
                      {exp.company}
                      {exp.city && ` | ${exp.city}`}
                    </p>

                    {exp.description && (
                      <div
                        className="mt-2 text-[11px] leading-relaxed text-gray-800 prose prose-sm max-w-none
                                  prose-li:marker:text-gray-800
                                  prose-strong:text-gray-800
                                  prose-p:my-0
                                  prose-ul:my-1
                                  prose-ol:my-1
                                  prose-li:my-0"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                ))}
                </div>
              </MainBlock>
            )}

            {data.education?.filter(edu => edu.school?.trim() || edu.degree?.trim()).length > 0 && (
              <MainBlock title="Education">
                <div className="space-y-4">
                  {data.education
                    .filter(edu => edu.school?.trim() || edu.degree?.trim())
                    .map(edu => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between gap-3">
                          <p className="text-sm font-semibold leading-tight">
                            {edu.school}
                          </p>

                          <p className="text-xs text-gray-600 whitespace-nowrap">
                            {formatDate(edu.graduationDate)}
                          </p>
                        </div>

                        <p className="text-xs text-gray-700">
                          {edu.degree}
                          {edu.city && ` | ${edu.city}`}
                        </p>

                        {edu.description && (
                          <div
                            className="mt-2 text-[11px] leading-relaxed text-gray-800 prose prose-sm max-w-none
                                      prose-li:marker:text-gray-800
                                      prose-strong:text-gray-800
                                      prose-p:my-0
                                      prose-ul:my-1
                                      prose-ol:my-1
                                      prose-li:my-0"
                            dangerouslySetInnerHTML={{ __html: edu.description }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </MainBlock>
            )}

            {data.hobbies && (
              <MainBlock title="Hobbies">
                <ul className="list-disc pl-4 text-[11px] space-y-2">
                  {data.hobbies.split(",").map((h, i) => (
                    <li key={i}>{h.trim()}</li>
                  ))}
                </ul>
              </MainBlock>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 pt-6">
        <h2 className="text-sm font-bold uppercase tracking-wide mb-3 border-b">
          {t(title)}
        </h2>
      </div>
      {children}
    </section>
  );
}

function MainBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 pt-6">
        <h2 className="text-sm font-bold uppercase tracking-wide mb-3 border-b">
          {t(title)}
        </h2>
      </div>
      {children}
    </section>
  );
}
