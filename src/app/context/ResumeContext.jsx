"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null); // start with null to avoid SSR mismatch

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

  console.log(resumeData)


  if (resumeData === null) return null; // prevent SSR mismatch while loading

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
