import { Prisma } from "@/generated/prisma";
import { FontName } from "../config/fontConfig";
import { TemplateName } from "../config/templateConfig";

export interface ExperienceItem {
  id: string;
  collapsed: boolean;
  company?: string;
  jobTitle?: string;
  current?: boolean;
  city?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface EducationItem {
  id: string;
  collapsed: boolean;
  school?: string;
  degree?: string;
  graduationDate?: string;
  city?: string;
  description?: string;
}

export interface SkillItem {
  id: string;
  collapsed: boolean;
  skillName?: string;
  level: string; 
}

export interface SocialLinkItem {
  id: string;
  collapsed: boolean;
  label?: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  collapsed: boolean;
  name?: string;
  level: string; 
}

export interface ResumeData {
  resumeId: string | null;
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  jobTitle?: string;

  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  socialLinks: SocialLinkItem[];

  about?: string;
  hobbies?: string;

  template: TemplateName;
  accentColor: string;
  fontFamily: FontName;

  nationality?: string;
  dateOfBirth?: string;
  maritalStatus?: string;

  updatedAt?: Date | string
}

export type ResumeWithRelations = Prisma.ResumeGetPayload<{
  include: {
    experiences: true;
    educations: true;
    skills: true;
    languages: true;
    socialLinks: true;
  };
}>;


