import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) { // authはユーザーセクションが含まれる
      const isLoggedIn = !!auth?.user; // ユーザーがログインしているか
      const isOnDashboard =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/manage");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl)); // ログインしてなければloginページにリダイレクトされる
      } else if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
