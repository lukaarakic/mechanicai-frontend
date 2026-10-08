import { NextRequest, NextResponse } from "next/server";

// Pages for signed-out users. A signed-in user visiting one is sent to the app.
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify",
];
// The app itself, for signed-in users only. Every other path is public, and
// one that doesn't exist gets the 404 page rather than a login redirect, so
// search engines don't see missing pages as a login page.
const APP_ROUTES = ["/dashboard", "/chat", "/history", "/settings"];

const routeMatches = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(route + "/");

// Only checks that a cookie exists. The API validates the token; an invalid
// one ends up at /api/auth/clear, which removes the cookie.
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  // Code pages live at lowercase URLs; /codes/P0420 is how people type it.
  if (/^\/codes\/[^/]*[A-Z]/.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  // The landing page; signed-in users go straight to their dashboard.
  if (pathname === "/") {
    return token
      ? NextResponse.redirect(new URL("/dashboard", request.url))
      : NextResponse.next();
  }

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    routeMatches(pathname, route),
  );

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isAppRoute = APP_ROUTES.some((route) => routeMatches(pathname, route));

  if (!token && isAppRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image|icon0.svg|icon1.png|apple-icon.png|manifest.json|web-app-manifest-192x192.png|web-app-manifest-512x512.png|images/).*)",
  ],
};
