import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify",
  "/",
];
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify",
];

const routeMatches = (pathname: string, route: string) =>
  route === "/"
    ? pathname === "/"
    : pathname === route || pathname.startsWith(route + "/");

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) => routeMatches(pathname, route));
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    routeMatches(pathname, route),
  );

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
