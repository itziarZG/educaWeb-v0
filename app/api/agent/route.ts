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

    // Cambia aquí a la API de OpenAI
    const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const reqBody = JSON.stringify({
      model: "gpt-4.1-mini", // o "gpt-4" si tienes acceso
      messages: [{ role: "system", content: prompt }, ...messages],
      temperature: 0.7,
    });

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: reqBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `OpenAI API returned error status: ${response.status}`,
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
