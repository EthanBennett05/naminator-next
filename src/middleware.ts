import NextAuth from "next-auth";
import { authConfig } from "../auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isApiAuth = req.nextUrl.pathname.startsWith("/api/auth");

  if (isApiAuth) return;

  if (isOnLoginPage && isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  if (!isLoggedIn && !isOnLoginPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};