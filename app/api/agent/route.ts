import { NextRequest, NextResponse } from 'next/server';
import { generateText, type ModelMessage } from 'ai';
import { getLanguageModel, getMaquetinModel } from '@/utils/ai/models';
import {
  buildChatSystemPrompt,
  MAX_OUTPUT_TOKENS,
  parseAgentRequest,
} from '@/utils/ai/agentRequest';
import { consumeAgentQuota } from '@/utils/ai/quota';
import prompts from '@/utils/prompts.json';
import { createClient } from '@/utils/supabase/server';

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

  // 2. Extraemos y validamos el cuerpo antes de gastar cuota o créditos
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const request = parseAgentRequest(body);
  if (!request) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  // 3. Preparamos el prompt en el servidor según el modo
  let systemPrompt: string;
  let messages: ModelMessage[];
  let profile: { credits: number | null } | null = null;

  if (request.mode === 'visualization') {
    // VERIFICAR CRÉDITOS (Solo si es visualización)
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

    systemPrompt = prompts.maquetin;
    messages = [{ role: 'user', content: request.content }];
  } else {
    const { data: child, error: childError } = await supabase
      .from('children')
      .select('system_prompt')
      .eq('id', request.childId)
      .eq('user_id', userId)
      .maybeSingle();

    if (childError || !child) {
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }

    systemPrompt = buildChatSystemPrompt(child.system_prompt, request.topic);
    messages = request.messages;
  }

  // 4. Comprobamos la cuota justo antes de llamar a la IA
  const quota = await consumeAgentQuota(supabase);
  if (quota === 'exceeded') {
    return NextResponse.json(
      {
        error:
          'Has alcanzado el límite de uso del asistente. Inténtalo de nuevo más tarde.',
      },
      { status: 429 }
    );
  }
  if (quota === 'unavailable') {
    return NextResponse.json(
      { error: 'El asistente no está disponible en este momento.' },
      { status: 503 }
    );
  }

  try {
    // 5. Seleccionamos el modelo: chat usa el potente, visualization el económico
    const model =
      request.mode === 'visualization'
        ? getMaquetinModel()
        : getLanguageModel();

    const debugAgentLogs = process.env.DEBUG_AGENT === 'true';

    if (debugAgentLogs) {
      console.log(
        'DEBUG: Mensajes enviados a generateText:',
        JSON.stringify(messages, null, 2)
      );
    }

    const { text } = await generateText({
      model,
      system: systemPrompt,
      messages,
      maxOutputTokens: MAX_OUTPUT_TOKENS[request.mode],
    });

    if (debugAgentLogs) {
      console.log('DEBUG: Respuesta del agente generada', {
        mode: request.mode,
        responseLength: text.length,
      });
    }

    // 6. COBRAR EL CRÉDITO (Solo si es visualización y OpenAI funcionó bien)
    if (profile) {
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
