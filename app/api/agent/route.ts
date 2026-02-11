import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getLanguageModel } from "@utils/ai/models";
import promptsData from "@utils/prompts.json";

const prompts = promptsData as Record<string, string>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, agentType } = body;

    // Debug: mira tu consola de VSCode/Terminal al hacer la petición
    console.log("Recibido agentType:", agentType);

    const systemPrompt = prompts[agentType];

    if (!systemPrompt) {
      console.error(
        `Error: agentType "${agentType}" no existe en prompts.json`,
      );
      return NextResponse.json(
        { error: `El tipo de agente "${agentType}" no es válido.` },
        { status: 400 }, // Aquí es donde solía dar el 400
      );
    }

    const model = getLanguageModel();
    const { text } = await generateText({
      model: model,
      system: systemPrompt,
      messages: messages,
    });

    return NextResponse.json({
      message: text,
      htmlContent: text,
    });
  } catch (error) {
    console.error("DETALLE DEL ERROR:", error);
    return NextResponse.json(
      { error: "Error interno", details: String(error) },
      { status: 500 },
    );
  }
}
