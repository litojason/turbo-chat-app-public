import { NextRequest, NextResponse } from "next/server";

import { getToken } from "./lib/cookies";

const redirectedRoute = "/chats";

const protectedRoutes = [redirectedRoute];
const publicRoutes = ["/login", "/register", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = await getToken();

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect to /chats if the user is authenticated
  if (
    isPublicRoute &&
    token &&
    !req.nextUrl.pathname.startsWith(redirectedRoute)
  ) {
    return NextResponse.redirect(new URL(redirectedRoute, req.nextUrl));
  }

  if (path === "/" && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
