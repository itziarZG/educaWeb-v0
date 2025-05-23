import { NextRequest, NextResponse } from "next/server";
import promptsData from "@/utils/promtps.json";

type AgentType = "andrea" | "middle";

interface Prompts {
  [key: string]: string;
  andrea: string;
  middle: string;
}

const prompts = promptsData as Prompts;

export async function POST(req: NextRequest) {
  try {
    console.log("API Route Called: /api/andrea-agent");

    // Parse the request body
    const body = await req.json();
    const { message, agentType, conversationId } = body;

    // Map agent type to appropriate prompt style
    let nivel: AgentType = (agentType as AgentType) || "andrea";

    // Ensure the agentType is valid, default to 'andrea' if not
    if (nivel !== "andrea" && nivel !== "middle") {
      nivel = "andrea";
    }

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    // Get the appropriate prompt based on agent type
    const prompt = prompts[nivel];
    const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL;
    if (!DEEPSEEK_API_URL) {
      console.error("DEEPSEEK_API_URL environment variable not configured");
      return NextResponse.json(
        { error: "DeepSeek API URL not configured" },
        { status: 500 }
      );
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      console.error("DEEPSEEK_API_KEY environment variable not configured");
      return NextResponse.json(
        { error: "DeepSeek API key not configured" },
        { status: 500 }
      );
    }
    const reqBody = JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    console.log("Making request to Deepseek API with body: ", reqBody);
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
      console.error(`Deepseek API error (${response.status}):`, errorText);
      return NextResponse.json(
        {
          error: `Deepseek API returned error status: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Deepseek API response:", data.choices?.[0]?.message?.content);

    const responseContent = data.choices?.[0]?.message?.content || "";

    // Format response for agentService expectations
    return NextResponse.json({
      message: responseContent,
      htmlContent: responseContent, // Same content used for both display methods
      conversationId: conversationId || data.id || Date.now().toString(),
    });
  } catch (error) {
    console.error("Error in andrea-agent API route:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing your request",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
