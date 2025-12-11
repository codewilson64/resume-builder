import { ResumeData } from "@/app/types/resume";

export function hasResumeData(data: ResumeData | undefined): boolean {
  if (!data) return false;

  return Boolean(
    data.firstName?.trim() ||
    data.lastName?.trim() ||
    data.jobTitle?.trim() ||
    (data.experience && data.experience.length > 0) ||
    (data.education && data.education.length > 0) ||
    (data.skills && data.skills.length > 0) ||
    (data.languages && data.languages.length > 0) ||
    data.about?.trim()
  );
}
