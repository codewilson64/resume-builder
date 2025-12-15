import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, 
};

// Create guest session
export const createGuestSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("guest_session")?.value;
  const now = new Date();

  if (token) {
    const guest = await prisma.guest.findUnique({
      where: { sessionToken: token },
    });

    if (guest && guest.expiresAt > now) {
      return guest; 
    }

    // expired → cleanup
    if (guest) {
      await prisma.guest.delete({
        where: { sessionToken: token },
      });
    }
  }

  // Create new guest
  const sessionToken = randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const guest = await prisma.guest.create({
    data: { sessionToken, expiresAt },
  });

  // Set cookie for browser
  cookieStore.set("guest_session", sessionToken, COOKIE_OPTIONS)

  return guest
}