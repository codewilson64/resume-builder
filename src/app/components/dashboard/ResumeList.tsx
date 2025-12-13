'use client';

import CreateResumeCard from "@/app/components/dashboard/CreateResumeCard";
import ResumeCard from "@/app/components/dashboard/ResumeCard";
import type { ResumeData } from "@/app/types/resume";

export default function ResumeList({ resumes }: { resumes: ResumeData[] }) {
  return (
    <div className="flex flex-wrap gap-8">
      {resumes.map((resume) => (
        <ResumeCard key={resume.resumeId} resume={resume} />
      ))}

      <CreateResumeCard />
    </div>
  );
}
