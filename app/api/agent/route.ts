import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { getLanguageModel, getMaquetinModel } from '@/utils/ai/models';
import { createClient } from '@/utils/supabase/server';

type MessageInput = {
  role: string;
  content: unknown;
};

function isValidMessage(message: unknown): message is MessageInput {
  return (
    typeof message === 'object' &&
    message !== null &&
    typeof (message as { role?: unknown }).role === 'string' &&
    'content' in message
  );
}

function isValidRequestBody(
  body: unknown
): body is { messages: MessageInput[]; mode?: unknown } {
  return (
    typeof body === 'object' &&
    body !== null &&
    Array.isArray((body as { messages?: unknown }).messages) &&
    (body as { messages: unknown[] }).messages.every(isValidMessage)
  );
}

export async function POST(req: NextRequest) {
  console.log('DEBUG: Entrando en API/AGENT');

  const supabase = await createClient();

  // 1. Verificar Sesión (usamos getUser para validar la sesión en el servidor)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = user.id;

  // 2. Extraemos el cuerpo de la petición antes de validar créditos
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!isValidRequestBody(body)) {
    return NextResponse.json(
      {
        error:
          "Invalid request body: 'messages' must be an array of { role, content }.",
      },
      { status: 400 }
    );
  }

  const { messages, mode } = body;

  // 3. VERIFICAR CRÉDITOS (Solo si es visualización)
  let profile = null;
  if (mode === 'visualization') {
    const { data, error: profileError } = await supabase
      .from('clients')
      .select('credits')
      .eq('id', userId)
      .single();

    if (profileError || !data) {
      console.error('Error al leer perfil:', profileError);
      return NextResponse.json(
        { error: 'Error al leer perfil' },
        { status: 500 }
      );
    }
    profile = data;

    if ((profile.credits || 0) < 1) {
      return NextResponse.json(
        {
          error:
            'Sin créditos. Por favor, contacta con soporte o espera al lanzamiento oficial.',
        },
        { status: 402 } // 402 = Payment Required
      );
    }
  }

  try {
    // 4. Usamos la función generateText de la librería 'ai' (Vercel AI SDK)
    // Seleccionamos el modelo según el modo: chat usa el modelo potente, visualization usa uno más económico
    const model =
      mode === 'visualization' ? getMaquetinModel() : getLanguageModel();

    const debugAgentLogs = process.env.DEBUG_AGENT === 'true';

    // Normalizamos los mensajes para asegurar que 'content' es siempre un string
    // (algunos modelos pueden recibir arrays, pero OpenRouter los rechaza)
    const normalizedMessages = messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content:
        typeof msg.content === 'string'
          ? msg.content
          : JSON.stringify(msg.content),
    }));

    if (debugAgentLogs) {
      console.log(
        'DEBUG: Mensajes normalizados enviados a generateText:',
        JSON.stringify(normalizedMessages, null, 2)
      );
    }

    const { text } = await generateText({
      model,
      messages: normalizedMessages, // Pasamos el array normalizado
    });

    if (debugAgentLogs) {
      console.log('DEBUG: Respuesta del agente generada', {
        mode,
        responseLength: text.length,
      });
    }

    // 5. COBRAR EL CRÉDITO (Solo si es visualización y OpenAI funcionó bien)
    if (mode === 'visualization' && profile) {
      const { error: updateError } = await supabase
        .from('clients')
        .update({ credits: (profile.credits || 0) - 1 })
        .eq('id', userId);

      if (updateError) {
        console.error('Error al descontar crédito', updateError);
        // Opcional: Podrías alertarte a ti mismo, pero dejamos pasar al usuario por hoy.
      }
    }

    return NextResponse.json({
      message: text,
      htmlContent: text, // O la lógica que uses para extraer lo que hay entre '----'
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('ERROR CRÍTICO EN API/AGENT:', error);
    // IMPORTANTE: Si OpenAI falla, NO descontamos el crédito.
    return NextResponse.json(
      { error: 'Error interno', details: errorMessage },
      { status: 500 }
    );
  }
}
