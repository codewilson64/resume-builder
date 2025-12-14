"use client";

import { signOut } from "@/lib/actions/auth-action";
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
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            ResumeBuilder
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm px-6 py-3 text-white bg-orange-500 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center min-h-screen">
        {children}
      </div>
    </section>
  );
}
