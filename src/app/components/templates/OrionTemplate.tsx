"use client";
import { fontMap } from "@/app/config/fontConfig";
import { useResume } from "@/app/context/ResumeContext";
import { Mail, Phone, MapPin } from "lucide-react";
import type { ResumeData } from "@/app/types/resume";

interface OrionTemplateProps {
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


export default function OrionTemplate({ data, variant }: OrionTemplateProps) {
  const { resumeData } = useResume();
  const isThumbnail = variant === "thumbnail";

  return (
    <div className={`${fontMap[resumeData.fontFamily] || fontMap["Poppins"]}`}>

      {/* ================= HEADER ================= */}
      <header
        className="flex items-center justify-between p-8"
        style={{ backgroundColor: data.accentColor }}
      >
        <div>
          <h1 className="text-4xl text-white font-bold uppercase tracking-wide leading-none">
            {data?.firstName} {data?.lastName}
          </h1>

          {data?.jobTitle && (
            <p className="mt-2 text-sm font-medium uppercase tracking-widest text-white">
              {data.jobTitle}
            </p>
          )}
        </div>

        {/* CONTACT INFO */}
        <section className="flex flex-col gap-2 text-xs text-white">
          {(data?.address || data?.city) && (
            <div className="flex items-center gap-3">
              <MapPin size={13} />
              <span>
                {data.address}
                {data.address && data.city && ", "}
                {data.city}
              </span>
            </div>
          )}

          {data?.phone && (
            <div className="flex items-center gap-3">
              <Phone size={13} />
              <span>{data.phone}</span>
            </div>
          )}

          {data?.email && (
            <div className="flex items-center gap-3">
              <Mail size={13} />
              <span>{data.email}</span>
            </div>
          )}
        </section>
      </header>

      {/* ================= BODY ================= */}
      <div
        className="bg-white shadow-xl grid grid-cols-[220px_1fr]"
        style={{
          height: isThumbnail ? 1123 : "auto",
          minHeight: !isThumbnail ? 1123 : undefined,
        }}
      >

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="pl-8 pr-2">

          {/* ABOUT */}
          {data?.about && (
            <Block title="About Me" color={data.accentColor}>
              <p className="text-xs leading-relaxed text-gray-600">
                {data.about}
              </p>
            </Block>
          )}

          {/* SOCIAL LINKS */}
          {data?.socialLinks?.length > 0 && (
            <Block title="Social Links" color={data.accentColor}>
              <div className="space-y-3">
                {data.socialLinks.map(link => (
                  <p key={link.id} className="text-xs text-gray-600">
                    <span className="font-semibold block">{link.label}</span>
                    <span>{link.url}</span>
                  </p>
                ))}
              </div>
            </Block>
          )}

          {/* LANGUAGES */}
          {data?.languages?.length > 0 && (
            <Block title="Languages" color={data.accentColor}>
              <div className="space-y-3">
                {data.languages
                  .filter(lang => lang.name?.trim())
                  .map(lang => {
                    const width = languageWidths[lang.level] || "40%"

                    return (
                      <div key={lang.id}>
                        <p className="text-xs text-gray-600 mb-1">
                          {lang.name}
                        </p>

                        {resumeData.showLanguageMeter && (
                          <div className="w-full h-1.5 bg-gray-200">
                            <div
                              className="h-1.5"
                              style={{
                                width,
                                backgroundColor: data.accentColor,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </Block>
          )}

          {/* PERSONAL DETAILS */}
          {(data?.dateOfBirth || data?.nationality || data?.maritalStatus) && (
            <Block
              title="Personal Details"
              color={data.accentColor}
              withDivider={false}
            >
              <div className="text-xs text-gray-600 space-y-3">
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

        {/* ================= RIGHT CONTENT ================= */}
        <main className="p-8 pt-0">
          {/* WORK EXPERIENCE */}
          {data?.experience?.length > 0 && (
            <MainBlock title="Work Experience" color={data.accentColor}>
              <div className="mt-6 relative">
                <div className="absolute left-[170px] top-0 bottom-0 w-[1px] bg-gray-400" />

                <div className="space-y-5">
                  {data.experience
                    .filter(e => e.jobTitle?.trim() || e.company?.trim())
                    .map(e => (
                      <div
                        key={e.id}
                        className="grid grid-cols-[140px_30px_1fr] gap-4"
                      >
                        <div>
                          <p className="text-gray-700 font-semibold text-sm uppercase">
                            {e.company}
                          </p>
                          <p className="text-xs text-gray-500">
                            {e.city}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {formatDate(e.startDate)} –{" "}
                            {e.current ? "Present" : formatDate(e.endDate)}
                          </p>
                        </div>

                        <div className="relative flex justify-center">
                          <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute z-10" />
                        </div>

                        <div>
                          <p className="text-gray-700 font-semibold text-sm">
                            {e.jobTitle}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {e.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </MainBlock>
          )}

          {/* EDUCATION */}
          {data?.education?.length > 0 && (
            <MainBlock title="Education" color={data.accentColor}>
              <div className="mt-6 relative">
                <div className="absolute left-[170px] top-0 bottom-0 w-[1px] bg-gray-400" />

                <div className="space-y-6">
                  {data.education.map(edu => (
                    <div
                      key={edu.id}
                      className="grid grid-cols-[140px_30px_1fr] gap-4"
                    >
                      <div>
                        <p className="text-gray-700 font-semibold text-sm uppercase">
                          {edu.school}
                        </p>
                        <p className="text-xs text-gray-500">
                          {edu.city}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {formatDate(edu.graduationDate)}
                        </p>
                      </div>

                      <div className="relative flex justify-center">
                        <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute z-10" />
                      </div>

                      <div>
                        <p className="text-gray-700 font-semibold text-sm">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MainBlock>
          )}

          {/* SKILLS */}
          {data?.skills?.length > 0 && (
            <MainBlock title="Skills" color={data.accentColor}>
              <div
                className={`mt-5 grid grid-cols-2 ${
                  resumeData.showSkillMeter ? "gap-5" : "gap-2"
                } text-xs uppercase text-gray-700`}
              >
                {data.skills.map(skill => {
                  const width = skillWidths[skill.level] || "40%"

                  return (
                    <div key={skill.id}>
                      <span className="block mb-1">
                        {skill.skillName}
                      </span>

                      {resumeData.showSkillMeter && (
                        <div className="w-full h-1.5 bg-gray-200">
                          <div
                            className="h-1.5"
                            style={{
                              width,
                              backgroundColor: data.accentColor,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </MainBlock>
          )}

          {/* HOBBIES */}
          {data?.hobbies && (
            <MainBlock title="Hobbies" color={data.accentColor}>
              <div className="flex flex-wrap gap-3 mt-4 text-xs uppercase text-gray-600">
                {data.hobbies.split(",").map((hobby, i) => (
                  <span key={i}>{hobby.trim()}</span>
                ))}
              </div>
            </MainBlock>
          )}
      </main>

      </div>
    </div>
  )
}

/* ================= SHARED BLOCK (ORION STYLE) ================= */

function Block({
  title,
  color,
  children,
  withDivider = true,
}: {
  title: string
  color: string
  children: React.ReactNode
  withDivider?: boolean
}) {
  return (
    <section className={withDivider ? "border-b border-white/30" : ""}>
      <h2
        className="text-sm font-semibold uppercase tracking-widest border-b border-gray-300 pt-8 pb-2 mb-3"
        style={{ color }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function MainBlock({
  title,
  color,
  children,
}: {
  title: string
  color: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2
        className="text-sm font-semibold uppercase tracking-widest border-b border-gray-300 pt-8 pb-2"
        style={{ color }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
