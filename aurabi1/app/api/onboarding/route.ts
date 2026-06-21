import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      businessName,
      industry,
      location,
      teamSize,
      revenueRange,
      goal,
    } = body;

    if (
      !businessName ||
      !industry ||
      !location ||
      !teamSize ||
      !revenueRange ||
      !goal
    ) {
      return NextResponse.json(
        { error: "All onboarding fields are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        businessName,
        industry,
        location,
        teamSize,
        revenueRange,
        goal,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save onboarding details" },
      { status: 500 }
    );
  }
}