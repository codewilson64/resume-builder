import { PrismaClient } from "@/generated/prisma/client";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaPg } from "@prisma/adapter-pg";
import { Polar } from "@polar-sh/sdk";
import { checkout, polar, webhooks } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";

import { nextCookies } from 'better-auth/next-js'
import { v4 as uuidv4 } from 'uuid'
import { upsertSubscriptionFromPolar } from "./polar/subscription-service";

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

const prisma = new PrismaClient({ adapter })

const polarClient = new Polar({ 
    accessToken: process.env.POLAR_ACCESS_TOKEN, 
    // server: 'sandbox'
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
                            productId: "66ac7322-9315-4e8b-8ce1-020999226132",
                            slug: "Weekly Access"
                        },
                        { 
                            productId: "53b8125b-9fe8-4b26-8a98-c367c3048bcf", 
                            slug: "Monthly Access" 
                        },
                    ], 
                    successUrl: "/payment/success?checkout_id={CHECKOUT_ID}", 
                    authenticatedUsersOnly: true,
                    // returnUrl: "http://localhost:3000/payment",
                    theme: "light"
                }), 
                webhooks({
                    secret: process.env.POLAR_WEBHOOK_SECRET as string,
                    onSubscriptionCreated: async (payload) => {
                        await upsertSubscriptionFromPolar(payload.data);
                    },
                    onSubscriptionUpdated: async (payload) => {
                        await upsertSubscriptionFromPolar(payload.data);
                    },
                    onSubscriptionCanceled: async (payload) => {
                        await upsertSubscriptionFromPolar(payload.data);
                    },
                    onSubscriptionRevoked: async (payload) => {
                        await upsertSubscriptionFromPolar(payload.data);
                    }
                })
            ], 
        }), 
        nextCookies()
    ]
});