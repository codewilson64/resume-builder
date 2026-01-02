"use client";

import Image from "next/image";
import logo from "../../../public/confidencv_logo.png"
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export default function DashboardLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <section className="min-h-screen relative bg-slate-50">

      <div className="w-full absolute top-0 left-0 z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={logo}
            alt="ConfidenCV logo"
            width={40}
            height={40}
            priority
          />

          <h1 className="text-xl font-bold">
            ConfidenCV
          </h1>
        </div>
          <button
            onClick={() => router.push('/account')}
            className="flex items-center gap-2 text-sm text-black hover:text-cyan-400"
          >
            <User className="w-4 h-4" />
            My Account
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {children}
      </div>
    </section>
  );
}
