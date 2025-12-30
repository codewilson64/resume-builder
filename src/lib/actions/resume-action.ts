"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/actions/auth-action";
import { ResumeData } from "@/app/types/resume";
import { mapPrismaResumeToResumeData } from "../mappers/resumeMapper";
import { createGuestSession } from "./guest-action";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";


export async function createResumeForGuest() {
  let guestId: string | null = null;

  const guest = await createGuestSession();
  guestId = guest.id;

  const resume = await prisma.resume.create({
    data: {
      guestId,
      title: "Untitled",
      template: "Orion",
      accentColor: "#2D2D2D",
      fontFamily: "Poppins",
    },
  });

  return resume.id;
}

export async function createResumeForUser() {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Not authenticated");

  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      title: "Untitled",
      template: "Orion",
      accentColor: "#2D2D2D",
      fontFamily: "Poppins",
    },
  });

  return resume.id;
}

export async function createResume(data: ResumeData) {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("User not authenticated");

  // Create Resume + Nested Relations
  const resume = await prisma.resume.create({
    data: {
      userId: user.id,

      // PERSONAL INFO
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality,
      maritalStatus: data.maritalStatus,
      about: data.about,
      jobTitle: data.jobTitle,
      hobbies: data.hobbies,

      // FORMAT
      template: data.template,
      accentColor: data.accentColor,
      fontFamily: data.fontFamily,
      showSkillMeter: data.showSkillMeter,
      showLanguageMeter: data.showLanguageMeter,

      // EXPERIENCES
      experiences: {
        create: data.experience.map((exp) => ({
          jobTitle: exp.jobTitle,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current ?? false,
          city: exp.city,
          description: exp.description,
        })),
      },

      // EDUCATION
      educations: {
        create: data.education.map((edu) => ({
          school: edu.school,
          degree: edu.degree,
          graduationDate: edu.graduationDate,
          city: edu.city,
        })),
      },

      // SKILLS
      skills: {
        create: data.skills.map((skill) => ({
          skillName: skill.skillName,
          level: skill.level,
        })),
      },

      // LANGUAGES
      languages: {
        create: data.languages.map((lang) => ({
          name: lang.name,
          level: lang.level,
        })),
      },

      // SOCIAL LINKS
      socialLinks: {
        create: data.socialLinks.map((social) => ({
          label: social.label,
          url: social.url,
        })),
      },
    },
  });

  return resume;
}

export async function updateResume(resumeId: string, data: ResumeData) {
  const start = performance.now()

  const user = await getCurrentUser();
  if (!user?.id) throw new Error("User not authenticated");

  const resume = await prisma.resume.update({
    where: { id: resumeId },
    data: {
      // PERSONAL INFO
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality,
      maritalStatus: data.maritalStatus,
      about: data.about,
      jobTitle: data.jobTitle,
      hobbies: data.hobbies,

      // FORMAT
      template: data.template,
      accentColor: data.accentColor,
      fontFamily: data.fontFamily,
      showSkillMeter: data.showSkillMeter,
      showLanguageMeter: data.showLanguageMeter,

      // EXPERIENCES
      experiences: {
        deleteMany: {},
        create: data.experience.map((exp) => ({
          jobTitle: exp.jobTitle,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current ?? false,
          city: exp.city,
          description: exp.description,
        })),
      },

      // EDUCATION
      educations: {
        deleteMany: {},
        create: data.education.map((edu) => ({
          school: edu.school,
          degree: edu.degree,
          graduationDate: edu.graduationDate,
          city: edu.city,
          description: edu.description,
        })),
      },

      // SKILLS
      skills: {
        deleteMany: {},
        create: data.skills.map((skill) => ({
          skillName: skill.skillName,
          level: skill.level,
        })),
      },

      // LANGUAGES
      languages: {
        deleteMany: {},
        create: data.languages.map((lang) => ({
          name: lang.name,
          level: lang.level,
        })),
      },

      // SOCIAL LINKS
      socialLinks: {
        deleteMany: {},
        create: data.socialLinks.map((social) => ({
          label: social.label,
          url: social.url,
        })),
      },
    },
  });
  const end = performance.now()
  console.log(`Update query duration: ${end - start}ms`)
  
  revalidateTag("resume", "default");
  return resume;
}

export async function getUserResumes(): Promise<ResumeData[]> {
  const user = await getCurrentUser()
  if (!user?.id) throw new Error("User not authenticated")

  const resumes = await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      experiences: true,
      educations: true,
      skills: true,
      languages: true,
      socialLinks: true,
    },
  });
  return resumes.map(mapPrismaResumeToResumeData)
}

const getResumeByIdCached = unstable_cache(
  async (resumeId: string, userId: string) => {
    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
        userId,
      },
      include: {
        experiences: true,
        educations: true,
        skills: true,
        languages: true,
        socialLinks: true,
      },
    });

    if (!resume) return null;

    return mapPrismaResumeToResumeData(resume);
  },
  // cache key factory
  ["resume-by-id"],
  { revalidate: 60, tags: ["resume"] },
);

export async function getResumeById(
  resumeId: string
): Promise<ResumeData | null> {

  const user = await getCurrentUser();
  if (!user?.id) throw new Error("User not authenticated");

  const result = await getResumeByIdCached(resumeId, user.id);
  
  return result;
}


export async function deleteResumeById(resumeId: string): Promise<void> {
  const user = await getCurrentUser();

  if (!user?.id) throw new Error("User not authenticated");

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
    select: { id: true },
  });

  if (!resume) throw new Error("Resume not found or access denied")

  await prisma.resume.delete({
    where: {
      id: resumeId,
    },
  });

  revalidatePath('/profile')
}
