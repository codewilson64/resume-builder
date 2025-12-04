"use client";
import { Mail, Phone, MapPin, ArrowLeft, Download } from "lucide-react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr + "-01");
  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}


export default function BudapestTemplate({ data, onBack, onPrint }) {
  return (
    <div className="relative">
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
        <aside className="bg-[#3e3e3e] text-white p-6 space-y-8">

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
        </aside>

        {/* ================= RIGHT MAIN CONTENT ================= */}
        <main className="py-8 px-5 space-y-10">

          {/* NAME + JOB TITLE */}
          <header className="flex flex-row items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 uppercase leading-tight">
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
                  <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                    <MapPin size={13} />
                  </div>
                  <span className="leading-snug">
                    {data.address}, {data.city}, {data.postalCode}
                  </span>
                </div>
              )}

              {data?.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                    <Phone size={13} />
                  </div>
                  <span>{data.phone}</span>
                </div>
              )}

              {data?.email && (
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center shrink-0">
                    <Mail size={13} />
                  </div>
                  <span>{data.email}</span>
                </div>
              )}
            </div>
          </header>

          {/* ================= WORK EXPERIENCE ================= */}
          {data?.experience?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-700 border-b pb-2">
                Work Experience
              </h2>

              <div className="mt-6 relative">
                {/* ✅ FULL CONNECTING VERTICAL LINE */}
                <div className="absolute left-[170px] top-0 bottom-0 w-[1px] bg-gray-300" />

                <div className="space-y-5">
                  {data.experience.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="grid grid-cols-[140px_30px_1fr] gap-4 relative"
                    >
                      {/* LEFT */}
                      <div>
                        <p className="font-semibold text-sm uppercase">{exp.company}</p>
                        <p className="text-xs text-gray-500">{exp.city}</p>
                        <p className="text-[11px] text-gray-400">
                          {formatDate(exp.startDate)} -{" "}
                          {exp.current ? "Present" : formatDate(exp.endDate)}
                        </p>
                      </div>

                      {/* ✅ DOT ONLY (NO SHORT LINE PER ITEM) */}
                      <div className="relative flex justify-center">
                        <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute top-0.2 z-10" />
                      </div>

                      {/* RIGHT */}
                      <div>
                        <p className="font-semibold text-sm top-2">{exp.jobTitle}</p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}


          {/* ================= EDUCATION ================= */}
          {data?.education?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-700 border-b pb-2">
                Education
              </h2>

              <div className="mt-6 relative">
                {/* ✅ FULL CONNECTING VERTICAL LINE */}
                <div className="absolute left-[170px] top-0 bottom-0 w-[1px] bg-gray-300" />

                <div className="space-y-8">
                  {data.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="grid grid-cols-[140px_30px_1fr] gap-4"
                    >
                      {/* LEFT */}
                      <div>
                        <p className="font-semibold text-sm uppercase">{edu.school}</p>
                        <p className="text-xs text-gray-500">{edu.city}</p>
                        <p className="text-[11px] text-gray-400">
                          {formatDate(edu.graduationDate)}
                        </p>
                      </div>

                      {/* ✅ DOT ONLY */}
                      <div className="relative flex justify-center">
                        <span className="w-2.5 h-2.5 bg-gray-700 rounded-full absolute z-10" />
                      </div>

                      {/* RIGHT */}
                      <div>
                        <p className="font-semibold text-sm">{edu.degree}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {edu.fieldOfStudy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}


          {/* ================= SKILLS ================= */}
          {data?.skills?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-700 border-b pb-2">
                Skills
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5 text-xs uppercase text-gray-700">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <span className="block mb-1">{skill.skillName}</span>
                    <div className="w-full h-1.5 bg-gray-200">
                      <div className="h-1.5 bg-gray-700 w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================= HOBBIES ================= */}
          {data?.hobbies && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-700 border-b pb-2">
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
