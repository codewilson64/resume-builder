import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"

import { nextCookies } from 'better-auth/next-js'
import { v4 as uuidv4 } from 'uuid'

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

const prisma = new PrismaClient({ adapter })

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite"
    }),
    emailAndPassword: { 
        enabled: true, 
        requireEmailVerification: false
    }, 
    socialProviders: {},
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60*60*24*7
        }
    },
    cookies: {
        sessionToken: {
            name: "auth_session",
            options: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: '/',
                maxAge: 60*60*24*7
            }
        }
    },
    advanced: {
        database: {
            generateId: () => uuidv4()
        }
    },
    plugins: [nextCookies()]
});