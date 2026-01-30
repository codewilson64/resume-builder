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
  const [resumeData, setResumeData] = useState<ResumeData>(createEmptyResume);
  const [hydrated, setHydrated] = useState(false);

  // LOAD from localStorage FIRST
  useEffect(() => {
    const stored = localStorage.getItem("resumeData");
    if (stored) {
      try {
        setResumeData(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse stored resume:", err);
      }
    }
    setHydrated(true);
  }, []);

  // SAVE only AFTER hydration
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData, hydrated]);
  
  // Setter for resumeId so we prevent duplicates
  const setResumeId = (id: string | null) => {
    setResumeData((prev) => ({
      ...prev,
      resumeId: id,
    }));
  };
  
  // Reset local storage and context
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
