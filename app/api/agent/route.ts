import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getLanguageModel } from "@utils/ai/models";
import promptsData from "@utils/prompts.json";

const prompts = promptsData as Record<string, string>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, agentType } = body;

    // LOG 1: Verificar qué llega
    console.log("DEBUG: Datos recibidos:", {
      agentType,
      messagesCount: messages?.length,
    });

    const provider = process.env.AI_PROVIDER;
    const modelName = process.env.AI_MODEL;
    const hasKey = !!process.env.AI_API_KEY;

    // LOG 2: Verificar configuración de entorno
    console.log("DEBUG: Configuración:", {
      provider,
      modelName,
      hasApiKey: hasKey,
    });

    if (!prompts[agentType]) {
      return NextResponse.json(
        { error: `Agent ${agentType} no existe` },
        { status: 400 },
      );
    }

    const model = getLanguageModel();

    // LOG 3: Antes de llamar a la IA
    console.log("DEBUG: Llamando a la IA...");

    const { text } = await generateText({
      model: model,
      system: prompts[agentType],
      messages: messages,
    });

    return NextResponse.json({ message: text, htmlContent: text });
  } catch (error: any) {
    // ESTE ES EL LOG CLAVE: Verás el error real en la consola de Vercel
    console.error("ERROR CRÍTICO EN API/AGENT:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });

    return NextResponse.json(
      { error: "Error interno", details: error.message },
      { status: 500 },
    );
  }
}
