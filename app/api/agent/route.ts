import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { getLanguageModel, getMaquetinModel } from '@/utils/ai/models';
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

  // 2. Extraemos el cuerpo de la petición antes de validar créditos
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
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

    // Normalizamos los mensajes para asegurar que 'content' es siempre un string
    // (algunos modelos pueden recibir arrays, pero OpenRouter los rechaza)
    const normalizedMessages = messages.map((msg: Record<string, unknown>) => ({
      role: msg.role as string,
      content:
        typeof msg.content === 'string'
          ? msg.content
          : JSON.stringify(msg.content),
    }));

    console.log(
      'DEBUG: Mensajes normalizados enviados a generateText:',
      JSON.stringify(normalizedMessages, null, 2)
    );

    const { text } = await generateText({
      model,
      messages: normalizedMessages, // Pasamos el array normalizado
    });

    console.log('DEBUG: Respuesta del agente', text);

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
