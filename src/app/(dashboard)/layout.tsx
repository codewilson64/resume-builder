"use client";

import { signOut } from "@/lib/actions/auth-action";
import Image from "next/image";
import logo from "../../../public/karierly_logo.png"
import { useRouter } from "next/navigation";

export default function DashboardLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  };

  return (
    <section className="min-h-screen relative bg-gray-50">

      <div className="w-full absolute top-0 left-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
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
          <button
            onClick={handleLogout}
            className="text-sm px-6 py-3 text-white bg-cyan-400 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {children}
      </div>
    </section>
  );
}
