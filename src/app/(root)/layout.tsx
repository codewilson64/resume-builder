
import React from "react";
import Navbar from "../components/Home/Navbar";
import { ResumeProvider } from "../context/ResumeContext";
import { getCurrentUser } from "@/lib/actions/auth-action";

export default async function RootLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()

  return (
    <ResumeProvider>
      <Navbar user={user}/>
      {children}
    </ResumeProvider>
  );
};

