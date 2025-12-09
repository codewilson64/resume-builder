'use server'

import { headers } from "next/headers"
import { auth } from "../auth"

// sign up
export const signUp = async (name: string, email: string, password: string ) => {
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
  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    }
  })
  return response
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