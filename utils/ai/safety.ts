/**
 * SAFETY_SUFFIX: bloque de guardarraíles que se concatena al final de cualquier
 * system prompt que se envíe al LLM en producción.
 *
 * Reglas de uso:
 *  - NUNCA se persiste en la DB. Vive solo en código.
 *  - NUNCA se pasa por el meta-agente de regeneración (promptRegeneration.ts).
 *    El meta-agente solo lee/escribe `child.system_prompt` (la parte pedagógica).
 *  - Se concatena SIEMPRE en runtime, incluso en el fallback vacío
 *    (app/dashboard/chat/hooks.ts) cuando un niño no tiene system_prompt todavía.
 *
 * Si en el futuro se añaden más reglas de seguridad, deben ir aquí — NUNCA
 * dentro de generateSystemPrompt ni de ningún prompt que se persista.
 *
 * Esto previene:
 *  - Que la regla sea sobre-escrita por una regeneración del system_prompt.
 *  - Que desaparezca si el feedback de un padre manipula al meta-agente.
 *  - Que el chat corra sin guardarraíles si el system_prompt está vacío.
 */
export const SAFETY_SUFFIX = `

**Límites de la conversación (no editable):**
Mantente siempre dentro del ámbito educativo y del desarrollo del niño/a (deberes, refuerzo escolar, actividades, rutinas de estudio, dudas de los padres sobre su aprendizaje). Si la conversación se desvía hacia temas ajenos a este propósito (salud, temas personales de adultos, temas sensibles no relacionados con la educación, etc.), redirige amablemente hacia el objetivo de la app. No proporciones asesoramiento médico, psicológico o legal; si detectas una necesidad de este tipo, sugiere consultar con un profesional.`;
