import { SAFETY_SUFFIX } from '@/utils/ai/safety';

export const AGENT_LIMITS = {
  maxMessages: 100,
  maxMessageChars: 20_000,
  maxHistoryMessages: 30,
  maxHistoryChars: 40_000,
  maxTopicChars: 100,
  maxChildIdChars: 64,
} as const;

export const MAX_OUTPUT_TOKENS = {
  chat: 4_000,
  visualization: 8_000,
} as const;

export type ChatTurn = { role: 'user' | 'assistant'; content: string };

export type AgentRequest =
  | { mode: 'chat'; childId: string; topic?: string; messages: ChatTurn[] }
  | { mode: 'visualization'; content: string };

function isChatTurn(value: unknown): value is ChatTurn {
  if (typeof value !== 'object' || value === null) return false;
  const { role, content } = value as { role?: unknown; content?: unknown };
  return (
    (role === 'user' || role === 'assistant') &&
    typeof content === 'string' &&
    content.trim().length > 0 &&
    content.length <= AGENT_LIMITS.maxMessageChars
  );
}

/** Conserva los mensajes más recientes que caben en el presupuesto del historial. */
function trimHistory(messages: ChatTurn[]): ChatTurn[] {
  const kept: ChatTurn[] = [];
  let totalChars = 0;

  for (let i = messages.length - 1; i >= 0; i--) {
    totalChars += messages[i].content.length;
    if (
      kept.length >= AGENT_LIMITS.maxHistoryMessages ||
      totalChars > AGENT_LIMITS.maxHistoryChars
    ) {
      break;
    }
    kept.unshift(messages[i]);
  }

  // Algunos modelos exigen que la conversación empiece por el usuario.
  const firstUserIndex = kept.findIndex((message) => message.role === 'user');
  return firstUserIndex === -1 ? [] : kept.slice(firstUserIndex);
}

/** Valida el cuerpo de la petición. Devuelve null si no es válido. */
export function parseAgentRequest(body: unknown): AgentRequest | null {
  if (typeof body !== 'object' || body === null) return null;
  const { mode, childId, topic, messages, content } = body as Record<
    string,
    unknown
  >;

  if (mode === 'visualization') {
    if (
      typeof content !== 'string' ||
      content.trim().length === 0 ||
      content.length > AGENT_LIMITS.maxMessageChars
    ) {
      return null;
    }
    return { mode, content };
  }

  if (mode !== 'chat') return null;

  if (
    typeof childId !== 'string' ||
    childId.length === 0 ||
    childId.length > AGENT_LIMITS.maxChildIdChars ||
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > AGENT_LIMITS.maxMessages ||
    !messages.every(isChatTurn) ||
    messages[messages.length - 1].role !== 'user'
  ) {
    return null;
  }

  if (
    topic !== undefined &&
    (typeof topic !== 'string' || topic.length > AGENT_LIMITS.maxTopicChars)
  ) {
    return null;
  }

  return { mode, childId, topic, messages: trimHistory(messages) };
}

/**
 * Compone el system prompt del chat. Es el único punto donde se añade
 * SAFETY_SUFFIX, para que el cliente no pueda omitirlo.
 */
export function buildChatSystemPrompt(
  childSystemPrompt: string | null,
  topic?: string
): string {
  const basePrompt = `${childSystemPrompt || 'Eres un asistente educativo.'}${SAFETY_SUFFIX}`;
  // Sin saltos de línea, el tema no puede simular nuevas secciones del prompt.
  const cleanTopic = topic?.replace(/\s+/g, ' ').trim();

  if (!cleanTopic || cleanTopic === 'Sin especificar') return basePrompt;

  return `${basePrompt}\n\n**Temática de la ficha de hoy:** ${cleanTopic}. Asegúrate de que toda la ficha esté EXCLUSIVAMENTE enfocada en esta temática.`;
}
