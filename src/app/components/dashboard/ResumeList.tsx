'use client';

import CreateResumeCard from "@/app/components/dashboard/CreateResumeCard";
import ResumeCard from "@/app/components/dashboard/ResumeCard";
import type { ResumeData } from "@/app/types/resume";

export default function ResumeList({ 
  resumes,
  isPremium,
}: {
  resumes: ResumeData[];
  isPremium: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-8">
      {resumes.map((resume) => (
        <ResumeCard key={resume.resumeId} resume={resume} isPremium={isPremium}/>
      ))}

      <CreateResumeCard />
    </div>
  );
}
