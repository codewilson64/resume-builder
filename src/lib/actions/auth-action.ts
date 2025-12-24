'use server'

import { headers } from "next/headers"
import { auth } from "../auth"
import { prisma } from "@/lib/prisma";

// sign up
export const signUp = async (name: string, email: string, password: string ) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const response = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    }
  })
  return response
}

// sign in
export const signIn = async (email: string, password: string ) => {
  if (!email || !password) {
    return {
      success: false,
      message: "All fields are required",
    };
  }
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true, user: response.user };
  } catch (err: unknown) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

// get user session 
export const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers() 
  })
    return session?.user ?? null
  } catch (error) {
    console.log(error)
    return null
  }
} 

// sign out
export const signOut = async () => {
  try {
    await auth.api.signOut({headers: await headers()})
  } catch (e) {
    console.log("Log out failed", e)
  }
}