import React from "react";
import Navbar from "../components/Home/Navbar";
import { getCurrentUser } from "@/lib/actions/auth-action";

export default async function RootLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()

  return (
    <div>
      <Navbar user={user}/>
      {children}
    </div>
  );
};

