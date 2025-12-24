"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/auth-action";
import { useResume } from "@/app/context/ResumeContext";
import { hasResumeData } from "@/utils/hasResumeData";
import { migrateGuestToUser } from "@/lib/actions/guest-action";

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { resumeData } = useResume()

  useEffect(() => {
    const combined = `${resumeData?.firstName || ""} ${resumeData?.lastName || ""}`.trim();
    if (combined) setName(combined);
    if (resumeData?.email) setEmail(resumeData.email);  
  }, [resumeData?.firstName, resumeData?.lastName, resumeData?.email]);

  // handle sign up
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if(loading) return
    setLoading(true)
    setError(null)
    
    try {
      const response = await signUp(name, email, password)

      if (response.user) {
        await migrateGuestToUser()
        
        if (hasResumeData(resumeData)) {
          router.push("/resume/preview");
        } else {
          router.push("/profile");
        }
        
        return
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        setLoading(false)
      }
    } 
  }

  return (
    <section className="w-[900px] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center">Create an Account</h2>
        <p className="text-gray-500 text-center mt-2 text-sm">
          Start building your professional resume
        </p>

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-8 space-y-5">

          {/* Name */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 ring-orange-500 transition">
            <User className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 ring-orange-500 transition">
            <Mail className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 ring-orange-500 transition">
            <Lock className="text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password (8+ characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-sm hover:shadow-lg"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-5">{error}</p>}

        {/* Footer */}
        <p className="text-gray-500 text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link 
            href="/login"
            className="text-cyan-400 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
