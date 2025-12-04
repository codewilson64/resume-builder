"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Log in to continue building your resume.
        </p>

        {/* Email Input */}
        <div className="mb-5">
          <label className="text-gray-700 font-semibold text-sm">Email</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-3 mt-1">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
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
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full outline-none text-gray-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Switch Auth */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-orange-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
