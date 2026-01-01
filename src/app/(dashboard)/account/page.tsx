"use client";

import { signOut } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/"); 
  };

  return (
    <div className="w-full max-w-3xl px-6 py-28">
      <h1 className="text-2xl font-bold mb-12">My Account</h1>

      <div className="mb-3">
        <h2 className="text-lg font-semibold">Current Plan</h2>
      </div>

      {/* Plan Card */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="flex items-center justify-between">
        </div>

        <div className="flex items-center justify-between">
          <div>
            {/* 🔒 Hard-coded for now */}
            <p className="text-base font-medium">7-Day Trial</p>
            <p className="text-sm text-gray-500">
              Expires in 6 days
            </p>
          </div>

          <button
            onClick={() => router.push("/payment")}
            className="text-sm font-medium text-cyan-400 hover:text-cyan-500"
          >
            Change Plan
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-xl border p-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </div>
  );
}
