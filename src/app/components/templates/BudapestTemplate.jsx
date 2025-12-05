"use client";
import { fontMap } from "@/app/config/fontConfig";
import { useResume } from "@/app/context/ResumeContext";
import { Mail, Phone, MapPin, ArrowLeft, Download } from "lucide-react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr + "-01");
  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const proficiencyWidths = {
  Beginner: "30%",
  Intermediate: "50%",
  Advanced: "75%",
  Expert: "100%",
};

export default function BudapestTemplate({ data, onBack, onPrint }) {
  const { resumeData } = useResume();

  return (
    <div className={`${fontMap[resumeData.fontFamily] || fontMap["Poppins"]} relative`}>
      {/* ✅ FLOATING BUTTONS */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 no-print z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-5 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Download size={18} />
          Save PDF
        </button>
      </div>

      {/* ✅ RESUME */}
      <div
        className="bg-white shadow-xl grid grid-cols-[220px_1fr]"
        style={{ width: "794px", minHeight: "1123px" }}
      >
        {/* ================= LEFT SIDEBAR ================= */}
        <aside 
          className="text-white p-6 space-y-8"
          style={{ backgroundColor: data.accentColor }}
        >

          {/* ABOUT */}
          {data?.about && (
            <section className="border-b border-white/30 pb-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-3">
                About Me
              </h2>
              <p className="text-xs leading-relaxed text-gray-200">
                {data.about}
              </p>
            </section>
          )}

          {/* SOCIAL LINKS */}
          {data?.socialLinks?.length > 0 && (
            <section className="border-b border-white/30 pb-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-3">
                Social Links
              </h2>
              <div className="space-y-3">
                {data.socialLinks.map((link) => (
                  <p key={link.id} className="text-xs text-gray-200">
                    <span className="font-semibold block">{link.label}</span>
                    <span className="text-gray-300">{link.url}</span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {data?.languages?.length > 0 && (
            <section className="border-b border-white/30 pb-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-3">
                Languages
              </h2>
              <ul className="text-xs text-gray-200 space-y-2">
                {data.languages.map((lang) => (
                  <li key={lang.id}>{lang.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* PERSONAL DETAILS */}
          {(data?.dateOfBirth || data?.nationality || data?.maritalStatus) && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest mb-3">
                Personal Details
              </h2>

              <div className="text-xs text-gray-200 space-y-3">
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
            </section>
          )}
        </aside>

        {/* ================= RIGHT MAIN CONTENT ================= */}
        <main className="py-8 px-5 space-y-10">

          {/* NAME + JOB TITLE */}
          <header className="flex flex-row items-start justify-between gap-6">
            <div>
              <h1 
                className="text-3xl font-bold tracking-wide uppercase leading-none"
                style={{ color: data.accentColor }}
              >
                <span className="block">{data?.firstName}</span>
                <span className="block">{data?.lastName}</span>
              </h1>

              <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">
                {data?.jobTitle}
              </p>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col gap-1 text-gray-600 text-xs">
              {(data?.address || data?.city || data?.postalCode) && (
                <div className="flex items-center gap-3">                 
                  <MapPin size={13} color={data.accentColor} />                 
                  <span className="leading-snug">
                    {data.address}, {data.city}, {data.postalCode}
                  </span>
                </div>
              )}

              {data?.phone && (
                <div className="flex items-center gap-3">                 
                  <Phone size={13} color={data.accentColor} />
                  <span>{data.phone}</span>
                </div>
              )}

              {data?.email && (
                <div className="flex items-center gap-3">                  
                  <Mail size={13} color={data.accentColor} />
                  <span>{data.email}</span>
                </div>
              )}
            </div>
          </header>

          {/* ================= WORK EXPERIENCE ================= */}
          {data?.experience?.length > 0 && (
            <section>
              <h2 
                className="text-sm font-semibold uppercase tracking-widest border-b pb-2"
                style={{ color: data.accentColor }}
              >
                Work Experience
              </h2>

              <div className="mt-6 relative">
                {/* ✅ FULL CONNECTING VERTICAL LINE */}
                <div className="absolute left-[170px] top-0 bottom-0 w-[1px] bg-gray-300" />

                <div className="space-y-5">
                  {data.experience
                    // ✅ ONLY KEEP ROWS WHERE jobTitle OR company EXISTS
                    .filter(
                      (experience) =>
                        experience?.jobTitle?.trim() || experience?.company?.trim()
                    )
                    .map((experience) => {
                      const hasJobTitle = !!experience?.jobTitle?.trim();
                      const hasCompany = !!experience?.company?.trim();

                      return (
                        <div
                          key={experience.id}
                          className="grid grid-cols-[140px_30px_1fr] gap-4 relative"
                        >
                          {/* ✅ LEFT — COMPANY + CITY + DATE (ONLY IF TITLE OR COMPANY EXISTS) */}
                          <div>
                            {hasCompany && (
                              <p className="font-semibold text-sm uppercase">
                                {experience.company}
                              </p>
                            )}

                            {(hasJobTitle || hasCompany) && experience?.city && (
                              <p className="text-xs text-gray-500">
                                {experience.city}
                              </p>
                            )}

                            {(hasJobTitle || hasCompany) && experience?.startDate && (
                              <p className="text-[11px] text-gray-400">
                                {formatDate(experience.startDate)} -{" "}
                                {experience.current
                                  ? "Present"
                                  : formatDate(experience.endDate)}
                              </p>
                            )}
                          </div>

                          {/* ✅ DOT */}
                          <div className="relative flex justify-center">
                            <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute z-10" />
                          </div>

                          {/* ✅ RIGHT — JOB TITLE + DESCRIPTION */}
                          <div>
                            {hasJobTitle && (
                              <p className="font-semibold text-sm">
                                {experience.jobTitle}
                              </p>
                            )}

                            {experience?.description && (
                              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                {experience.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          )}


          {/* ================= EDUCATION ================= */}
          {data?.education?.length > 0 && (
            <section>
              <h2 
                className="text-sm font-semibold uppercase tracking-widest border-b pb-2"
                style={{ color: data.accentColor }}
              >
                Education
              </h2>

              <div className="mt-6 relative">
                {/* FULL CONNECTING VERTICAL LINE */}
                <div className="absolute left-[170px] top-0 bottom-0 w-[1px] bg-gray-300" />

                <div className="space-y-8">
                  {data.education
                    // ✅ Only allow rows where degree OR school exists
                    .filter((edu) => edu?.degree?.trim() || edu?.school?.trim())
                    .map((edu) => {
                      const hasDegree = !!edu?.degree?.trim();
                      const hasSchool = !!edu?.school?.trim();

                      return (
                        <div
                          key={edu.id}
                          className="grid grid-cols-[140px_30px_1fr] gap-4"
                        >
                          {/* ✅ LEFT — SCHOOL + CITY + DATE (ONLY IF DEGREE OR SCHOOL EXISTS) */}
                          <div>
                            {hasSchool && (
                              <p className="font-semibold text-sm uppercase">
                                {edu.school}
                              </p>
                            )}

                            {(hasDegree || hasSchool) && edu?.city && (
                              <p className="text-xs text-gray-500">
                                {edu.city}
                              </p>
                            )}

                            {(hasDegree || hasSchool) && edu?.graduationDate && (
                              <p className="text-[11px] text-gray-400">
                                {formatDate(edu.graduationDate)}
                              </p>
                            )}
                          </div>

                          {/* ✅ DOT */}
                          <div className="relative flex justify-center">
                            <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute z-10" />
                          </div>

                          {/* ✅ RIGHT — DEGREE */}
                          <div>
                            {hasDegree && (
                              <p className="font-semibold text-sm">
                                {edu.degree}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          )}

          {/* ================= SKILLS ================= */}
          {data?.skills?.length > 0 && (
            <section>
              <h2 
                className="text-sm font-semibold uppercase tracking-widest border-b pb-2"
                style={{ color: data.accentColor }}
              >
                Skills
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5 text-xs uppercase text-gray-700">
                {data.skills.map((skill) => {
                  const width = proficiencyWidths[skill.level] || "40%"

                  return (
                    <div key={skill.id}>
                      <span className="block mb-1">{skill.skillName}</span>

                      <div className="w-full h-1.5 bg-gray-200">
                        <div
                          className="h-1.5 transition-all"
                          style={{
                            width,
                            backgroundColor: data.accentColor,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ================= HOBBIES ================= */}
          {data?.hobbies && (
            <section>
              <h2 
                className="text-sm font-semibold uppercase tracking-widest border-b pb-2"
                style={{ color: data.accentColor }}
              >
                Hobbies
              </h2>

              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs uppercase text-gray-600">
                {data.hobbies.split(",").map((hobby, i) => (
                  <span key={i}>{hobby.trim()}</span>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}
