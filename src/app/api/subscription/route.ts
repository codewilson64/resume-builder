import { getCurrentUser } from "@/lib/actions/auth-action"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";

export async function GET() {
    const user = await getCurrentUser()
  
    if (!user?.id) {
      return NextResponse.json({ status: "unauthenticated" })
    }
  
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
      select: { status: true },
    })
  
    if (
      subscription?.status === "active" ||
      subscription?.status === "trialing"
    ) {
      return NextResponse.json({ status: "active" })
    }
  
    return NextResponse.json({ status: "inactive" })
  }