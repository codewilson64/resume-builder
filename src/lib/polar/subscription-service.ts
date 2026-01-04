import { PolarSubscription } from "@/app/types/polar";
import { prisma } from "@/lib/prisma";

export async function upsertSubscriptionFromPolar(sub: PolarSubscription) {
  const userId = sub.customer?.externalId;
  if (!userId) {
    console.error("Missing externalId on customer", sub.id);
    return;
  }

  const price = sub.prices?.[0];

  await prisma.subscription.upsert({
    where: { polarSubId: sub.id },
    update: {
        polarSubId: sub.id,
        polarCustomerId: sub.customer?.id,
        status: sub.status,

        cancelAtPeriodEnd: sub.cancelAtPeriodEnd,

        currentPeriodEnd: sub.currentPeriodEnd
        ? new Date(sub.currentPeriodEnd)
        : null,

        productId: sub.product.id,
        planName: sub.product?.name ?? "Unknown Plan",

        interval: sub.recurringInterval,
        intervalCount: sub.recurringIntervalCount,

        priceAmount: price?.priceAmount ?? 0,
        currency: price?.priceCurrency ?? "usd",

        isTrial: sub.status === "trialing",
    },
    create: {
        userId,
        polarSubId: sub.id,
        polarCustomerId: sub.customer?.id,
        status: sub.status,

        cancelAtPeriodEnd: sub.cancelAtPeriodEnd,

        currentPeriodEnd: sub.currentPeriodEnd
        ? new Date(sub.currentPeriodEnd)
        : null,

        productId: sub.product.id,
        planName: sub.product?.name ?? "Unknown Plan",

        interval: sub.recurringInterval,
        intervalCount: sub.recurringIntervalCount,

        priceAmount: price?.priceAmount ?? 0,
        currency: price?.priceCurrency ?? "usd",

        isTrial: sub.status === "trialing",
    },
  });
}
