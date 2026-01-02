import { PrismaClient } from "@/generated/prisma/client";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaPg } from "@prisma/adapter-pg";
import { Polar } from "@polar-sh/sdk";
import { checkout, polar, webhooks } from "@polar-sh/better-auth";
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
                    onSubscriptionActive: async (payload) => {
                        console.log(
                            "POLAR subscription.active payload:",
                            JSON.stringify(payload, null, 2)
                          )

                        const sub = payload.data

                        // Get Polar customer ID from subscription
                        const polarCustomerId = sub.customerId
                        if (!polarCustomerId) {
                            console.error("Missing customerId on subscription", sub.id)
                            return
                        }

                        // Find user by Polar customer externalId
                        const customer = await polarClient.customers.get({
                            id: polarCustomerId,
                        })

                        const userId = customer.externalId
                        if (!userId) {
                            console.error("Customer has no externalId", polarCustomerId)
                            return
                        }

                        const product = sub.product;
                        const price = sub.prices?.[0];

                        await prisma.subscription.upsert({
                            where: { userId },
                            update: {
                              status: sub.status,
                              polarSubId: sub.id,
                              currentPeriodEnd: sub.currentPeriodEnd
                                ? new Date(sub.currentPeriodEnd)
                                : null,
                              productId: sub.productId,
                              planName: product?.name ?? "Unknown Plan",
                              interval: sub.recurringInterval,
                              intervalCount: sub.recurringIntervalCount,
                              priceAmount: price?.priceAmount ?? 0,
                              currency: price?.priceCurrency ?? "usd",
                              isTrial: sub.status === "trialing",
                            },
                            create: {
                              userId,
                              polarSubId: sub.id,
                              polarCustomerId: sub.customerId,
                              status: sub.status,
                              cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
                              currentPeriodEnd: sub.currentPeriodEnd
                                ? new Date(sub.currentPeriodEnd)
                                : null,
                              productId: sub.productId,
                              planName: product?.name ?? "Unknown Plan",
                              interval: sub.recurringInterval,
                              intervalCount: sub.recurringIntervalCount,
                              priceAmount: price?.priceAmount ?? 0,
                              currency: price?.priceCurrency ?? "usd",
                              isTrial: sub.status === "trialing",
                            },
                        })
                    },
                    onSubscriptionCanceled: async (payload) => {
                        console.log(
                            "POLAR subscription.canceled payload:",
                            JSON.stringify(payload, null, 2)
                          )
                        
                        const sub = payload.data

                        // Get Polar customer ID from subscription
                        const polarCustomerId = sub.customerId
                        if (!polarCustomerId) {
                            console.error("Missing customerId on subscription", sub.id)
                            return
                        }

                        // Find user by Polar customer externalId
                        const customer = await polarClient.customers.get({
                            id: polarCustomerId,
                        })

                        const userId = customer.externalId
                        if (!userId) {
                            console.error("Customer has no externalId", polarCustomerId)
                            return
                        }

                        await prisma.subscription.update({
                            where: { userId },
                            data: {
                                status: sub.status,
                                cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
                                currentPeriodEnd: sub.currentPeriodEnd
                                ? new Date(sub.currentPeriodEnd)
                                : null,
                            },
                        });
                    },
                })
            ], 
        }), 
        nextCookies()
    ]
});