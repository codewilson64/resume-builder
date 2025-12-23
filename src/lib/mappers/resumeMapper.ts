// src/lib/mappers/resumeMapper.ts
import type { ResumeData, ResumeWithRelations } from "@/app/types/resume";
import { templates, TemplateName } from "@/app/config/templateConfig";
import { fontMap, FontName } from "@/app/config/fontConfig";

export function isTemplateName(value: string): value is TemplateName {
  return (templates as readonly string[]).includes(value);
}

export function isFontName(value: string): value is FontName {
  return value in fontMap;
}

export function mapPrismaResumeToResumeData(resume: ResumeWithRelations): ResumeData {
  return {
    resumeId: resume.id,

    title: resume.title ?? undefined,
    firstName: resume.firstName ?? undefined,
    lastName: resume.lastName ?? undefined,
    email: resume.email ?? undefined,
    address: resume.address ?? undefined,
    city: resume.city ?? undefined,
    postalCode: resume.postalCode ?? undefined,
    phone: resume.phone ?? undefined,
    jobTitle: resume.jobTitle ?? undefined,
    updatedAt: resume.updatedAt.toISOString(),

    about: resume.about ?? undefined,
    hobbies: resume.hobbies ?? undefined,

    template: isTemplateName(resume.template) ? resume.template : "Orion",
    accentColor: resume.accentColor,
    fontFamily: isFontName(resume.fontFamily) ? resume.fontFamily : "Poppins",

    nationality: resume.nationality ?? undefined,
    dateOfBirth: resume.dateOfBirth ?? undefined,
    maritalStatus: resume.maritalStatus ?? undefined,

    experience: resume.experiences.map((exp) => ({
      id: exp.id,          
      collapsed: true,             
      company: exp.company ?? undefined,
      jobTitle: exp.jobTitle ?? undefined,
      current: exp.current ?? false,
      city: exp.city ?? undefined,
      startDate: exp.startDate ?? undefined,
      endDate: exp.endDate ?? undefined,
      description: exp.description ?? undefined,
    })),

    education: resume.educations.map((edu) => ({
      id: edu.id,
      collapsed: true,
      school: edu.school ?? undefined,
      degree: edu.degree ?? undefined,
      graduationDate: edu.graduationDate ?? undefined,
      city: edu.city ?? undefined,
      description: edu.description ?? undefined,
    })),

    skills: resume.skills.map((skill) => ({
      id: skill.id,
      collapsed: true,
      skillName: skill.skillName ?? undefined,
      level: skill.level ?? "Beginner",
    })),

    languages: resume.languages.map((lang) => ({
      id: lang.id,
      collapsed: true,
      name: lang.name ?? undefined,
      level: lang.level ?? "Beginner",
    })),

    socialLinks: resume.socialLinks.map((social) => ({
      id: social.id,
      collapsed: true,
      label: social.label ?? undefined,
      url: social.url ?? undefined,
    })),
  };
}
