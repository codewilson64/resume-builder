import { ExperienceItem } from "@/app/types/resume";


export function getValidExperiences(
  experience?: ExperienceItem[] | null
): ExperienceItem[] {
  if (!experience) return [];

  return experience.filter(
    e => e.jobTitle?.trim() || e.company?.trim()
  );
}

export function hasValidExperience(
  experience?: ExperienceItem[] | null
): boolean {
  return getValidExperiences(experience).length > 0;
}
