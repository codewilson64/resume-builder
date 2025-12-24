"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/actions/auth-action";
import { useResume } from "@/app/context/ResumeContext";
import { migrateGuestToUser } from "@/lib/actions/guest-action";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { resumeData } = useResume()

  useEffect(() => {
    if (resumeData?.email) setEmail(resumeData.email);
  }, [resumeData?.email])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if(loading) return
    setLoading(true)
    setError(null)
    
    const result = await signIn(email, password);

    if (!result.success) {
      setError(result.message ?? null);
      setLoading(false);
      return;
    }
  
    if (result.user) {
      await migrateGuestToUser();
      router.push("/profile");
    }
  }

  return (
    <section className="w-[900px] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Log in to continue building your resume.
        </p>

      {/* Form */}
      <form onSubmit={handleSignIn} className="mt-8 space-y-5" noValidate>
        {/* Email Input */}
        <div className="mb-5">
          <label className="text-gray-700 font-semibold text-sm">Email</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-3 mt-1">
            <Mail size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="text-gray-700 font-semibold text-sm">Password</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-3 mt-1">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-400 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm text-center mt-5">{error}</p>}

        {/* Switch Auth */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-cyan-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
