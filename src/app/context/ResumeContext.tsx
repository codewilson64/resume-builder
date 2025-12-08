"use client";

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, } from "react";
import { ResumeData } from "../types/resume";

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData | null>>;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null); 

  // Load from localStorage ONLY on client
  useEffect(() => {
    const stored = localStorage.getItem("resumeData");
    setResumeData(
      stored
        ? JSON.parse(stored)
        : {
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
            accentColor: "#2D2D2D", // Dark Gray
            fontFamily: "Poppins",
            personalDetails: []
          }
    );
  }, []);

  // Save to localStorage when state changes (only after loaded)
  useEffect(() => {
    if (resumeData !== null) {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }
  }, [resumeData]);


  if (resumeData === null) return null; // prevent SSR mismatch while loading

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
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
