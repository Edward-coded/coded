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

    const { businessDescription, competitorUrl } = await request.json();

    if (!businessDescription && !competitorUrl) {
      return NextResponse.json(
        { error: "businessDescription or competitorUrl is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        subscription: true,
        deepDiveCount: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const prompt = `
You are Aura Business Intelligence. Analyze the following business description and competitor URL and return ONLY valid JSON.

Business Description:
${businessDescription || "Not provided"}

Competitor URL:
${competitorUrl || "Not provided"}

Create a 10-section report containing exactly these sections in this exact order:
1. SWOT
2. MarketAnalysis
3. FinancialForecast
4. StrategicRoadmap
5. MarketingPlan
6. RiskMitigation
7. NextActions
8. PitchDeckSlides
9. ExecutiveSummary
10. RecommendedKPIs

Each section should be a JSON object or array appropriate for that section.
Return JSON with these top-level keys in the same order.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "Gemini request failed" },
        { status: response.status }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      JSON.stringify(data);

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      json = JSON.parse(cleanedText);
    }

    await prisma.$transaction([
      prisma.deepDive.create({
        data: {
          userId: user.id,
          competitorUrl: competitorUrl || null,
          analysis: json,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          deepDiveCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json(json);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate deep dive" },
      { status: 500 }
    );
  }
}
