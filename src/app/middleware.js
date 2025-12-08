import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  let guestId = req.cookies.get("guestId")?.value;

  if (!guestId) {
    guestId = uuid();
    res.cookies.set("guestId", guestId, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, 
    });
  }

  return res;
}
