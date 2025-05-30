import { NextRequest, NextResponse } from "next/server";
import promptsData from "@/utils/prompts.json";

const prompts = promptsData as Record<string, string>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, agentType } = body;

    const prompt = prompts[agentType];
    if (!prompt) {
      return NextResponse.json(
        { error: `No system prompt found for agentType: ${agentType}` },
        { status: 400 }
      );
    }

    const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL;
    if (!DEEPSEEK_API_URL) {
      return NextResponse.json(
        { error: "DeepSeek API URL not configured" },
        { status: 500 }
      );
    }

    const reqBody = JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "system", content: prompt }, ...messages],
    });

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: reqBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `Deepseek API returned error status: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const responseContent = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({
      message: responseContent,
      htmlContent: responseContent,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while processing your request",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
