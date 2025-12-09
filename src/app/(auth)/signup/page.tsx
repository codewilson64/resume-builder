"use client";

import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/actions/auth-action";

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await signUp(name, email, password)

      if(response.user) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <section className="w-[900px] min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">

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
              type="email"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-sm hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-500 text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link 
            href="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
