"use client";

import Image from "next/image";
import logo from "../../../public/karierly_logo.png"
import { useRouter } from "next/navigation";

export default function AuthLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-blue-50 relative">

      {/* Logo positioned exactly like main navbar */}
      <div className="w-full absolute top-0 left-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-5">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={logo}
              alt="Karierly logo"
              width={55}
              height={55}
              priority
            />

            <h1 className="text-xl font-bold">
              Karierly
            </h1>
          </div>
        </div>
      </div>

      {/* Auth Content Container */}
      <div className="flex justify-center items-center min-h-screen px-2">
        {children}
      </div>
    </section>
  );
}
