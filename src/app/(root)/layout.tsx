import React from "react";
import Navbar from "../components/home/Navbar";

export default async function RootLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

