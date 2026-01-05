import { getCurrentUser } from "@/lib/actions/auth-action";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return NextResponse.json({ status: "unauthenticated" });
  }

  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      status: true,
      cancelAtPeriodEnd: true,
      currentPeriodEnd: true,
    },
  });

  if (!subscription) {
    return NextResponse.json({ status: "inactive" });
  }

  const now = new Date();

  const hasTimeLeft =
    subscription.currentPeriodEnd &&
    subscription.currentPeriodEnd > now;

  const hasAccess =
    hasTimeLeft &&
    (subscription.status === "active" ||
    subscription.status === "trialing");

  return NextResponse.json({
    status: hasAccess ? "active" : "inactive",
  });
}
