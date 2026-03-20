import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import type { Worksheet, WorksheetFeedback } from '@/types/worksheet';

// POST /api/worksheets - Guardar ficha
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

    const { childId, topic, htmlContent } = body;

    if (!childId || !htmlContent) {
      return NextResponse.json(
        { error: 'childId and htmlContent are required' },
        { status: 400 }
      );
    }

    // 3. Validar que childId pertenece al usuario (verificar en tabla children)
    const { data: childData, error: childError } = await supabase
      .from('children')
      .select('id')
      .eq('id', childId)
      .eq('user_id', userId)
      .single();

    if (childError || !childData) {
      return NextResponse.json(
        { error: 'Child not found or does not belong to user' },
        { status: 403 }
      );
    }

    // 4. Insertar en tabla worksheets
    const { data: insertedWorksheet, error: insertError } = await supabase
      .from('worksheets')
      .insert([
        {
          user_id: userId,
          child_id: childId,
          topic: topic || null,
          html_content: htmlContent,
        },
      ])
      .select()
      .single();

    if (insertError || !insertedWorksheet) {
      console.error('Error inserting worksheet:', insertError);
      return NextResponse.json(
        { error: 'Failed to save worksheet' },
        { status: 500 }
      );
    }

    // 5. Preparar respuesta (sin feedback ya que es nueva)
    const worksheetResponse: Worksheet = {
      id: insertedWorksheet.id,
      user_id: insertedWorksheet.user_id,
      child_id: insertedWorksheet.child_id,
      topic: insertedWorksheet.topic,
      html_content: insertedWorksheet.html_content,
      created_at: insertedWorksheet.created_at,
    };

    return NextResponse.json(worksheetResponse, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('ERROR in POST /api/worksheets:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}

// GET /api/worksheets - Listar fichas de un niño
export async function GET(req: NextRequest) {
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

    // 2. Extraer query params
    const searchParams = req.nextUrl.searchParams;
    const childId = searchParams.get('childId');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!childId) {
      return NextResponse.json(
        { error: 'childId query parameter is required' },
        { status: 400 }
      );
    }

    // 3. Validar que childId pertenece al usuario
    const { data: childData, error: childError } = await supabase
      .from('children')
      .select('id')
      .eq('id', childId)
      .eq('user_id', userId)
      .single();

    if (childError || !childData) {
      return NextResponse.json(
        { error: 'Child not found or does not belong to user' },
        { status: 403 }
      );
    }

    // 4. Obtener worksheets con LEFT JOIN a worksheet_feedback
    const { data: worksheetsData, error: queryError } = await supabase
      .from('worksheets')
      .select(
        `
        id,
        user_id,
        child_id,
        topic,
        html_content,
        created_at,
        worksheet_feedback (
          id,
          worksheet_id,
          user_id,
          rating,
          comments,
          created_at
        )
      `
      )
      .eq('child_id', childId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (queryError) {
      console.error('Error fetching worksheets:', queryError);
      return NextResponse.json(
        { error: 'Failed to fetch worksheets' },
        { status: 500 }
      );
    }

    // 5. Mapear resultados y tomar el primer feedback (si existe)
    const worksheets: Worksheet[] = (worksheetsData || []).map(
      (ws: Record<string, unknown>) => {
        const feedback = (
          ws.worksheet_feedback as WorksheetFeedback[] | undefined
        )?.[0];
        return {
          id: ws.id as string,
          user_id: ws.user_id as string,
          child_id: ws.child_id as string,
          topic: ws.topic as string | null,
          html_content: ws.html_content as string,
          created_at: ws.created_at as string,
          ...(feedback && { feedback }),
        } as Worksheet;
      }
    );

    return NextResponse.json(
      {
        worksheets,
        total: worksheets.length,
        offset,
        limit,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('ERROR in GET /api/worksheets:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
