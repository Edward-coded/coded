import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!token) {
    return NextResponse.next();
  }

  const userId = token.id as string | undefined;
  if (!userId) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      subscription: true,
      trialEnd: true,
      deepDiveCount: true,
    },
  });

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (
    user.subscription === "FREE_TRIAL" &&
    user.trialEnd &&
    new Date(user.trialEnd) < new Date()
  ) {
    await prisma.user.update({
      where: { id: userId },
      data: { subscription: "EXPIRED" },
    });

    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/pricing", req.url));
    }
  }

  if (
    pathname === "/api/gemini/deepdive" &&
    req.method === "POST" &&
    user.subscription === "FREE_TRIAL" &&
    user.deepDiveCount >= 2
  ) {
    return NextResponse.json(
      {
        error:
          "Free trial users are limited to 2 deep dives. Please upgrade to continue.",
      },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/gemini/:path*"],
};
