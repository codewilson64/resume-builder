"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { fontMap } from "@/app/config/fontConfig";
import type { ResumeData } from "@/app/types/resume";
import { useResume } from "@/app/context/ResumeContext";

interface LineaTemplateProps {
  data: ResumeData;
  variant?: "preview" | "thumbnail";
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "-01");
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

export default function LineaTemplate({ data, variant }: LineaTemplateProps) {
  const { resumeData } = useResume();
  const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
  const isThumbnail = variant === "thumbnail";

  return (
    <div className={`${fontMap[data.fontFamily] || fontMap.Poppins} relative`}>
      <div
        className="bg-white shadow-xl"
        style={{ minHeight: isThumbnail ? 1123 : 1123 }}
      >
        {/* HEADER */}
        <header className="flex items-center justify-between px-10 pt-10 pb-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-gray-400">SMITH</p>
            <h1 className="text-4xl font-bold tracking-widest">{fullName || "WILLIAMS"}</h1>
            {data.jobTitle && (
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gray-500">
                {data.jobTitle}
              </p>
            )}
          </div>

          {/* {data.photo && (
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                src={data.photo}
                alt="Profile"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          )} */}
        </header>

        <div className="border-t border-black mx-10" />

        {/* BODY */}
        <div className="grid grid-cols-[280px_1fr]">
          {/* LEFT */}
          <aside className="px-8 pt-6 border-r border-black text-gray-600">
            <Block title="Contact">
              <div className="space-y-2 text-xs border-b border-black pb-6">
                {data.address && (
                  <div className="flex gap-2">
                    <MapPin size={12} />
                    <span>{data.address}</span>
                  </div>
                )}
                {data.phone && (
                  <div className="flex gap-2">
                    <Phone size={12} />
                    <span>{data.phone}</span>
                  </div>
                )}
                {data.email && (
                  <div className="flex gap-2">
                    <Mail size={12} />
                    <span>{data.email}</span>
                  </div>
                )}
              </div>
            </Block>

            {data.skills?.length > 0 && (
              <Block title="Skills">
                <ul className="list-disc pl-4 text-xs border-b border-black pb-6 space-y-1">
                  {data.skills.map(s => (
                    <li key={s.id}>{s.skillName}</li>
                  ))}
                </ul>
              </Block>
            )}

            {data.education?.length > 0 && (
              <Block title="Education">
                <div className="space-y-4 text-xs border-b border-black pb-6">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      <p className="font-semibold">{edu.degree}</p>
                      <p>{edu.school}</p>
                      {edu.graduationDate && (
                        <p className="text-gray-400">{formatDate(edu.graduationDate)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Block>
            )}
          </aside>

          {/* RIGHT */}
          <main className="px-8 pt-6 text-gray-600">
            {data.about && (
              <Block title="Profile">
                <p className="text-xs leading-relaxed border-b border-black pb-6">
                  {data.about}
                </p>
              </Block>
            )}

            {data.experience?.length > 0 && (
              <Block title="Experience">
                <div className="space-y-6 text-xs border-b border-black pb-6">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <p className="font-semibold uppercase">
                        {exp.jobTitle} · {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                      <p className="italic text-gray-500">{exp.company}</p>
                      {exp.description && (
                        <div
                          className="mt-1 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Block>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="text-sm font-bold tracking-widest uppercase mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}
