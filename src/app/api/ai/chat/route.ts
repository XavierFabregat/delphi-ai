// app/api/ai/chat/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { openai } from "~/lib/openai";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { idea } = (await req.json()) as { idea: string };

  if (!idea) {
    return NextResponse.json(
      { error: "No messages provided" },
      { status: 400 },
    );
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a professional business consultant. Your goal is to ask relevant questions to clarify vague or incomplete business ideas so a proper viability, market, and financial report can be generated.",
        },
        {
          role: "user",
          content: `
  A user submitted this business idea:
  
  "${idea}"
  
  Your job:
  1. Identify what key information is missing.
  2. Ask up to 6 clear, conversational questions grouped into:
    - Business Model & Viability
    - Market & Competition
    - Financials
  
  Respond ONLY with the grouped questions, like:
  {
    "Business Model & Viability": [...],
    "Market & Competition": [...],
    "Financials": [...]
  }
          `,
        },
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ response: response.choices[0]?.message });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "OpenAI request failed" },
      { status: 500 },
    );
  }
}
