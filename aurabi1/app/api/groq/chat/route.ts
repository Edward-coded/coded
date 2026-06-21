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

    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const formattedHistory = Array.isArray(history)
      ? history.map((entry: any) => ({
          role: entry.role || "user",
          content: entry.content || "",
        }))
      : [];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are Aura Business Intelligence AI, a premium strategic advisor.",
            },
            ...formattedHistory,
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            data?.message ||
            "Groq request failed",
        },
        { status: response.status }
      );
    }

    const assistantMessage =
      data?.choices?.[0]?.message?.content || "No response generated.";

    const savedMessages = [
      ...formattedHistory,
      { role: "user", content: message },
      { role: "assistant", content: assistantMessage },
    ];

    await prisma.chatSession.create({
      data: {
        userId: user.id,
        messages: savedMessages,
      },
    });

    return NextResponse.json({
      response: assistantMessage,
      history: savedMessages,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate chat response" },
      { status: 500 }
    );
  }
}
