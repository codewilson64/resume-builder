import { cookies } from "next/headers";

export function getGuestId() {
  return cookies().get("guestId")?.value || null;
}
