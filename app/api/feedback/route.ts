import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getFeedbackSummary } from '@/services/promptRegeneration';
import { regenerateSystemPrompt } from '@/services/promptRegeneration';

// POST /api/feedback - Guardar feedback y regenerar prompt
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // 1. Verificar sesión
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;

    // 2. Extraer y validar body
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { worksheetId, rating, comments } = body;

    if (!worksheetId || !rating) {
      return NextResponse.json(
        { error: 'worksheetId and rating are required' },
        { status: 400 }
      );
    }

    // Validar que rating está entre 1 y 5
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'rating must be a number between 1 and 5' },
        { status: 400 }
      );
    }

    // 3. Obtener worksheet para validar pertenencia y obtener childId
    const { data: worksheet, error: worksheetError } = await supabase
      .from('worksheets')
      .select('id, user_id, child_id')
      .eq('id', worksheetId)
      .single();

    if (worksheetError || !worksheet) {
      return NextResponse.json(
        { error: 'Worksheet not found' },
        { status: 404 }
      );
    }

    if (worksheet.user_id !== userId) {
      return NextResponse.json(
        { error: 'Worksheet does not belong to user' },
        { status: 403 }
      );
    }

    const childId = worksheet.child_id;

    // 4. Intentar insertar feedback (puede haber constraint UNIQUE)
    const { data: insertedFeedback, error: insertError } = await supabase
      .from('worksheet_feedback')
      .insert([
        {
          worksheet_id: worksheetId,
          user_id: userId,
          rating,
          comments: comments || null,
        },
      ])
      .select()
      .single();

    // Si ya existe feedback para este worksheet, retornar 409
    if (insertError) {
      if (insertError.code === '23505') {
        // Unique constraint violation
        return NextResponse.json(
          { error: 'Feedback already exists for this worksheet' },
          { status: 409 }
        );
      }
      console.error('Error inserting feedback:', insertError);
      return NextResponse.json(
        { error: 'Failed to save feedback' },
        { status: 500 }
      );
    }

    // 5. Obtener resumen de feedback del niño
    const feedbackSummary = await getFeedbackSummary(childId, supabase);

    // 6. Regenerar system prompt (no bloquear si falla)
    try {
      const newPrompt = await regenerateSystemPrompt(
        childId,
        feedbackSummary,
        supabase
      );

      // 7. Actualizar system_prompt en tabla children
      const { error: updateError } = await supabase
        .from('children')
        .update({ system_prompt: newPrompt })
        .eq('id', childId);

      if (updateError) {
        console.error('Error updating system_prompt:', updateError);
        // No retornamos error aquí - el feedback ya se guardó correctamente
      }
    } catch (regenerateError) {
      // Log del error pero no interrumpimos la respuesta
      console.error('Error regenerating system prompt:', regenerateError);
      // El feedback ya fue guardado exitosamente
    }

    return NextResponse.json(
      {
        feedback: insertedFeedback,
        feedbackSummary,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('ERROR in POST /api/feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
