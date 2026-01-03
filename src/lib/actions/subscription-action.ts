"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./auth-action";
import { Polar } from "@polar-sh/sdk";

const polarClient = new Polar({ 
    accessToken: process.env.POLAR_ACCESS_TOKEN, 
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
}); 

export async function getCurrentSubscription() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return null;
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
    select: {
      status: true,
      planName: true,
      currentPeriodEnd: true,
      interval: true,
      intervalCount: true,
      priceAmount: true,
      currency: true,
      isTrial: true,
    },
  });

  if (!subscription) {
    return null;
  }

  const hasAccess =
    subscription.status === "active" ||
    subscription.status === "trialing";

  return {
    hasAccess,
    status: subscription.status,
    planName: subscription.planName,
    isTrial: subscription.isTrial,
    expiresAt: subscription.currentPeriodEnd,
    interval: subscription.interval,
    intervalCount: subscription.intervalCount,
    priceAmount: subscription.priceAmount,
    currency: subscription.currency,
  };
}

export async function cancelCurrentSubscription() {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthenticated");

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
    select: { polarSubId: true },
  });

  if (!subscription?.polarSubId) throw new Error("No active subscription");

  await polarClient.subscriptions.revoke({
    id: subscription.polarSubId,
  });

  return { success: true };
}
