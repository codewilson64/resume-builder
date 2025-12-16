import { ResumeData } from "@/app/types/resume";

export const createEmptyResume = (): ResumeData => ({
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  phone: "",
  jobTitle: "",
  experience: [],
  education: [],
  skills: [],
  languages: [],
  socialLinks: [],
  about: "",
  hobbies: "",
  template: "Budapest",
  accentColor: "#2D2D2D",
  fontFamily: "Poppins",
  resumeId: null,
});
