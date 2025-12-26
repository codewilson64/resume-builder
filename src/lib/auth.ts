import { PrismaClient } from "@/generated/prisma/client";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaPg } from "@prisma/adapter-pg";
import { Polar } from "@polar-sh/sdk";
import { checkout, polar } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";

import { nextCookies } from 'better-auth/next-js'
import { v4 as uuidv4 } from 'uuid'

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

const prisma = new PrismaClient({ adapter })

const polarClient = new Polar({ 
    accessToken: process.env.POLAR_ACCESS_TOKEN, 
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
}); 

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
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
    plugins: [
        polar({ 
            client: polarClient, 
            createCustomerOnSignUp: true,
            use: [ 
                checkout({ 
                    products: [ 
                        { 
                            productId: "66ac7322-9315-4e8b-8ce1-020999226132", // ID of Product from Polar Dashboard
                            slug: "Weekly Access" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        },
                        { 
                            productId: "53b8125b-9fe8-4b26-8a98-c367c3048bcf", // ID of Product from Polar Dashboard
                            slug: "Monthly Access" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        },
                    ], 
                    successUrl: "/payment/success?checkout_id={CHECKOUT_ID}", 
                    authenticatedUsersOnly: true,
                    returnUrl: "http://localhost:3000/payment",
                    theme: "light"
                }), 
            ], 
        }), 
        nextCookies()
    ]
});