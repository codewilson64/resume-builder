"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./auth-action";
import { Polar } from "@polar-sh/sdk";

const polar = new Polar()

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

export async function createCustomerPortalSession() {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthenticated");

  const session = await polar.customerSessions.create({
    externalCustomerId: user.id,
    returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/account`,
  });

  return session.customerPortalUrl;
}