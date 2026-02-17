import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { getLanguageModel } from '@utils/ai/models';

export async function POST(req: NextRequest) {
  console.log('DEBUG: Entrando en API/AGENT', req.body);
  try {
    const body = await req.json();
    // 1. Extraemos los mensajes que ya vienen con el system prompt incluido
    const { messages } = body;

    // 2. Usamos la función generateText de la librería 'ai' (Vercel AI SDK)
    const { text } = await generateText({
      model: getLanguageModel(),
      messages: messages, // Pasamos el array completo (System + Historial + User)
    });

    console.log('DEBUG: Respuesta del agente', text);
    return NextResponse.json({
      message: text,
      htmlContent: text, // O la lógica que uses para extraer lo que hay entre '----'
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('ERROR CRÍTICO EN API/AGENT:', error);
    return NextResponse.json(
      { error: 'Error interno', details: errorMessage },
      { status: 500 }
    );
  }
}
