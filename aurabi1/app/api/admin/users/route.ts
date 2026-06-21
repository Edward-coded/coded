import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const dayInMs = 1000 * 60 * 60 * 24;

function normalizeDateOnly(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;

    if (!session || role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        subscription: true,
        trialEnd: true,
        deepDiveCount: true,
        createdAt: true,
      },
    });

    const today = normalizeDateOnly(new Date());

    const stats = {
      totalUsers: users.length,
      activeSubscribers: users.filter(
        (user) => user.subscription === "ACTIVE"
      ).length,
      trialExpiringToday: users.filter((user) => {
        if (user.subscription !== "FREE_TRIAL" || !user.trialEnd) {
          return false;
        }
        return normalizeDateOnly(new Date(user.trialEnd)).getTime() === today.getTime();
      }).length,
    };

    return NextResponse.json({ users, stats });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch admin users" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;

    if (!session || role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, action } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { error: "userId and action are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let updatedData:
      | { subscription: "ACTIVE" | "FREE_TRIAL"; trialEnd?: Date }
      | { deepDiveCount: number } = { subscription: "ACTIVE" };

    if (action === "upgrade") {
      updatedData = {
        subscription: "ACTIVE",
      };
    } else if (action === "extend") {
      updatedData = {
        subscription: "FREE_TRIAL",
        trialEnd: new Date(Date.now() + 7 * dayInMs),
      };
    } else if (action === "reset") {
      updatedData = {
        deepDiveCount: 0,
      };
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    return NextResponse.json({ message: "Action completed successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
