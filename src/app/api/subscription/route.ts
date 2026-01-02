import { getCurrentUser } from "@/lib/actions/auth-action";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return NextResponse.json({ status: "unauthenticated" });
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
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

  const hasAccess =
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    (subscription.cancelAtPeriodEnd &&
      subscription.currentPeriodEnd &&
      subscription.currentPeriodEnd > now);

  return NextResponse.json({
    status: hasAccess ? "active" : "inactive",
  });
}
