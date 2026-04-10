// lib/ai/models.ts
import { createOpenAI, openai } from '@ai-sdk/openai'; // Importamos createOpenAI
import { google } from '@ai-sdk/google';
import { createOllama } from 'ollama-ai-provider';
import { LanguageModel } from 'ai';

/**
 * Obtiene el modelo de lenguaje para chat (generación de fichas)
 * Usa la configuración más potente para mejor razonamiento y creatividad
 */
export function getLanguageModel(): LanguageModel {
  return getModelForMode('chat');
}

/**
 * Obtiene el modelo de lenguaje para maquetación (visualización HTML)
 * Usa un modelo más económico optimizado para formatos y estructura
 */
export function getMaquetinModel(): LanguageModel {
  return getModelForMode('visualization');
}

/**
 * Obtiene el modelo apropiado según el modo
 * @param mode 'chat' para generación de fichas, 'visualization' para maquetación
 */
function getModelForMode(mode: 'chat' | 'visualization'): LanguageModel {
  const provider = process.env.AI_PROVIDER || 'openai';

  // Para chat: usar el modelo configurado
  // Para visualization: usar el modelo optimizado (más barato)
  const modelName =
    mode === 'visualization'
      ? process.env.AI_MODEL_VISUALIZATION ||
        process.env.AI_MODEL ||
        'gpt-4o-mini'
      : process.env.AI_MODEL || 'gpt-4o-mini';

  const apiKey = process.env.AI_API_KEY;

  let model: unknown;

  switch (provider) {
    case 'openai':
      model = openai(modelName);
      break;

    case 'gemini':
      model = google(modelName);
      break;

    case 'deepseek':
      const ds = createOpenAI({
        apiKey: apiKey,
        baseURL: 'https://api.deepseek.com/v1',
      });
      model = ds.chat(modelName);
      break;

    case 'openrouter':
      const openrouter = createOpenAI({
        apiKey: apiKey,
        baseURL: 'https://openrouter.ai/api/v1',
        headers: {
          'HTTP-Referer':
            process.env.OPENROUTER_REFERER || 'https://educaweb.com',
          'X-Title': 'EducaWeb',
        },
      });
      model = openrouter(modelName);
      break;

    case 'ollama':
      const ollama = createOllama();
      model = ollama(modelName);
      break;

    default:
      model = openai('gpt-4o-mini');
      break;
  }

  return model as unknown as LanguageModel;
}
