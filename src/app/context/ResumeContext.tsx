"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { ResumeData } from "../types/resume";
import { createEmptyResume } from "@/utils/resumeDefaults";


interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  setResumeId: (id: string | null) => void;
  resetResumeContext: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    title: "Untitled",
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
    template: "Orion",
    accentColor: "#2D2D2D",
    fontFamily: "Poppins",
    showSkillMeter: true,
    showLanguageMeter: true,
    resumeId: null
  });

  // Load from localStorage on first client render
  useEffect(() => {
    const stored = localStorage.getItem("resumeData");
    if (stored) {
      try {
        setResumeData(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse stored resume:", err);
      }
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Setter for resumeId so we prevent duplicates
  const setResumeId = (id: string | null) => {
    setResumeData((prev) => ({
      ...prev,
      resumeId: id,
    }));
  };

  // Reset local storage
  const resetResumeContext = () => {
    const empty = createEmptyResume();
    setResumeData(empty);
    localStorage.setItem("resumeData", JSON.stringify(empty));
  };


  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, setResumeId, resetResumeContext }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used inside ResumeProvider");
  }
  return context;
};
