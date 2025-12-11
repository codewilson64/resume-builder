import { FontName } from "../config/fontConfig";
import { TemplateName } from "../config/templateConfig";

export interface ExperienceItem {
  id: number;
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
  id: number;
  collapsed: boolean;
  school?: string;
  degree?: string;
  graduationDate?: string;
  city?: string;
  description?: string;
}

export interface SkillItem {
  id: number;
  collapsed: boolean;
  skillName?: string;
  level: string; 
}

export interface SocialLinkItem {
  id: number;
  collapsed: boolean;
  label?: string;
  url?: string;
}

export interface LanguageItem {
  id: number;
  collapsed: boolean;
  name?: string;
  level: string; 
}

export interface ResumeData {
  resumeId: string | null;
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
}


