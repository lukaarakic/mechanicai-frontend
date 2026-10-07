import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/app/lib/api";

// Server components can't delete cookies, so an expired or revoked session is
// sent here to drop the cookie before going to /login. Without this the proxy
// would bounce /login back to / while the cookie still exists.
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete(AUTH_COOKIE);
  return response;
}
