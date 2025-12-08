"use client";

import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function Signup() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center">Create an Account</h2>
        <p className="text-gray-500 text-center mt-2 text-sm">
          Start building your professional resume
        </p>

        {/* Form */}
        <form className="mt-8 space-y-5">

          {/* Name */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 ring-orange-500 transition">
            <User className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 ring-orange-500 transition">
            <Mail className="text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50 focus-within:bg-white focus-within:ring-2 ring-orange-500 transition">
            <Lock className="text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
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
