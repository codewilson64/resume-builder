"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Home/Navbar";
import { ResumeProvider } from "../context/ResumeContext";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  // Hide navbar on resume builder pages
  const hideNavbar = pathname.startsWith("/resume");

  return (
    <ResumeProvider>
      {!hideNavbar && <Navbar />}
      {children}
    </ResumeProvider>
  );
};

export default RootLayout;
