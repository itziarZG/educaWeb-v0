import { generateText } from 'ai';
import { getLanguageModel } from '@/utils/ai/models';
import { FeedbackSummary } from '@/types/worksheet';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Extrae palabras clave de un texto (para identificar temas comunes)
 */
function extractKeywords(text: string): string[] {
  if (!text) return [];

  // Lista de palabras stop comunes en español
  const stopWords = new Set([
    'el',
    'la',
    'de',
    'que',
    'y',
    'a',
    'en',
    'es',
    'se',
    'lo',
    'no',
    'un',
    'una',
    'por',
    'con',
    'para',
    'o',
    'del',
    'al',
    'más',
    'como',
    'pero',
    'su',
    'si',
    'me',
    'mi',
    'tu',
    'este',
    'ese',
    'muy',
    'hace',
    'han',
    'él',
    'ella',
    'los',
    'las',
    'les',
    'nos',
    'os',
  ]);

  // Dividir por espacios y puntuación, convertir a minúsculas, filtrar palabras cortas
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];

  return words
    .filter((word) => word.length > 3 && !stopWords.has(word))
    .slice(0, 5); // Retornar top 5 keywords
}

/**
 * Obtiene un resumen del feedback para un niño
 */
export async function getFeedbackSummary(
  childId: string,
  supabase: SupabaseClient
): Promise<FeedbackSummary> {
  try {
    // Primero obtener IDs de worksheets del niño
    const { data: worksheets, error: worksheetError } = await supabase
      .from('worksheets')
      .select('id')
      .eq('child_id', childId);

    if (worksheetError) {
      console.error('Error fetching worksheets:', worksheetError);
      return {
        avgRating: 0,
        totalFeedbacks: 0,
        commonThemes: [],
        recentComments: [],
      };
    }

    const worksheetIds =
      worksheets?.map((w: Record<string, unknown>) => w.id as string) || [];

    if (worksheetIds.length === 0) {
      return {
        avgRating: 0,
        totalFeedbacks: 0,
        commonThemes: [],
        recentComments: [],
      };
    }

    // Obtener feedbacks para esos worksheets
    const { data: feedbacks, error } = await supabase
      .from('worksheet_feedback')
      .select('rating, comments')
      .in('worksheet_id', worksheetIds);

    if (error) {
      console.error('Error fetching feedbacks:', error);
      return {
        avgRating: 0,
        totalFeedbacks: 0,
        commonThemes: [],
        recentComments: [],
      };
    }

    const feedbackList = feedbacks || [];

    if (feedbackList.length === 0) {
      return {
        avgRating: 0,
        totalFeedbacks: 0,
        commonThemes: [],
        recentComments: [],
      };
    }

    // Calcular promedio de rating
    const totalRating = feedbackList.reduce(
      (sum: number, fb: Record<string, unknown>) =>
        sum + ((fb.rating as number) || 0),
      0
    );
    const avgRating = parseFloat(
      (totalRating / feedbackList.length).toFixed(2)
    );

    // Extraer comentarios y palabras clave
    const allComments = feedbackList
      .filter((fb: Record<string, unknown>) => fb.comments)
      .map((fb: Record<string, unknown>) => fb.comments as string);

    const recentComments = allComments.slice(-3); // Últimos 3 comentarios

    // Extraer palabras clave de todos los comentarios
    const allKeywords = allComments
      .flatMap((comment: string) => extractKeywords(comment))
      .filter(
        (word: string, index: number, array: string[]) =>
          array.indexOf(word) === index
      ); // Unique

    const commonThemes = allKeywords.slice(0, 5); // Top 5 temas

    return {
      avgRating,
      totalFeedbacks: feedbackList.length,
      commonThemes,
      recentComments,
    };
  } catch (error) {
    console.error('Error in getFeedbackSummary:', error);
    return {
      avgRating: 0,
      totalFeedbacks: 0,
      commonThemes: [],
      recentComments: [],
    };
  }
}

/**
 * Regenera el system_prompt basado en feedback del estudiante
 */
export async function regenerateSystemPrompt(
  childId: string,
  feedbackSummary: FeedbackSummary,
  supabase: SupabaseClient
): Promise<string> {
  try {
    // 1. Obtener info del niño
    const { data: child, error: childError } = await supabase
      .from('children')
      .select(
        'name, age, grade, interests, observations, system_prompt, region'
      )
      .eq('id', childId)
      .single();

    if (childError || !child) {
      console.error('Error fetching child:', childError);
      throw new Error('Child not found');
    }

    // 2. Construir prompt de ajuste para la IA
    const adjustmentPrompt = buildAdjustmentPrompt(child, feedbackSummary);

    // 3. Llamar a generateText con el prompt de ajuste
    const { text: newPrompt } = await generateText({
      model: getLanguageModel(),
      messages: [
        {
          role: 'system',
          content:
            'Eres un experto en educación personalizada. Tu tarea es mejorar y ajustar prompts de sistema basándote en feedback de estudiantes. Devuelve SOLO el prompt mejorado, sin explicaciones ni comentarios adicionales.',
        },
        {
          role: 'user',
          content: adjustmentPrompt,
        },
      ],
    });

    return newPrompt;
  } catch (error) {
    console.error('Error in regenerateSystemPrompt:', error);
    throw error;
  }
}

/**
 * Construye el prompt que se envía a la IA para regenerar el system_prompt
 */
function buildAdjustmentPrompt(
  child: Record<string, unknown>,
  feedbackSummary: FeedbackSummary
): string {
  const difficultyAdjustment =
    feedbackSummary.avgRating < 3
      ? 'Reduce la dificultad significativamente. Las fichas actuales parecen ser demasiado complejas.'
      : feedbackSummary.avgRating > 4
        ? 'Aumenta la dificultad gradualmente. El estudiante está dominando el contenido actual.'
        : 'Mantén la dificultad actual, es apropiada.';

  const themesContent =
    feedbackSummary.commonThemes.length > 0
      ? `Los siguientes temas han generado feedback: ${feedbackSummary.commonThemes.join(', ')}. Evita o ajusta estos temas en futuros prompts.`
      : 'No hay patrones detectados aún, mantén el enfoque actual.';

  const recentFeedback =
    feedbackSummary.recentComments.length > 0
      ? `Comentarios recientes de los padres: ${feedbackSummary.recentComments.join(' | ')}`
      : 'No hay comentarios recientes disponibles.';

  return `
Basándote en el feedback de estudiantes, mejora el siguiente prompt para que sea más efectivo:

**Información del Estudiante:**
- Nombre: ${child.name as string}
- Edad: ${child.age as number}
- Grado: ${child.grade as string}
- Intereses principales: ${child.interests as string}
- Región: ${child.region as string}
- Observaciones: ${(child.observations as string) || 'Ninguna'}

**Métricas de Feedback:**
- Calificación promedio: ${feedbackSummary.avgRating}/5 (${feedbackSummary.totalFeedbacks} fichas evaluadas)
- ${difficultyAdjustment}
- ${themesContent}
- ${recentFeedback}

**Prompt Actual:**
${child.system_prompt as string}

**Instrucciones para la mejora:**
1. Mantén la estructura y personalidad general del prompt.
2. Ajusta la dificultad según el feedback.
3. Incorpora los intereses del estudiante de manera más efectiva.
4. Si hay temas problemáticos, reformula cómo se abordan.
5. Asegúrate de que el prompt siga siendo claro y ejecutable por un asistente IA.
6. Devuelve SOLO el prompt mejorado, sin explicaciones.
`;
}
