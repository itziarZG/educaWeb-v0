// lib/ai/models.ts
import { createOpenAI, openai } from '@ai-sdk/openai'; // Importamos createOpenAI
import { google } from '@ai-sdk/google';
import { createOllama } from 'ollama-ai-provider';
import { LanguageModel } from 'ai';

/**
 * Valida que AI_API_KEY esté presente para proveedores que lo requieren
 */
function requireApiKey(provider: 'deepseek' | 'openrouter'): string {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    throw new Error(
      `AI_API_KEY es requerido cuando AI_PROVIDER es "${provider}".`
    );
  }
  return apiKey;
}

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

// Valores por defecto si no hay variables de entorno (OpenRouter).
const DEFAULT_PROVIDER = 'openrouter';
const DEFAULT_CHAT_MODEL = 'anthropic/claude-haiku-5.5';
const DEFAULT_VISUALIZATION_MODEL = 'deepseek/deepseek-v4-flash';

/**
 * Nombre del proveedor configurado (sin claves). Sirve para los logs.
 */
export function getProviderName(): string {
  return process.env.AI_PROVIDER || DEFAULT_PROVIDER;
}

/**
 * Nombre del modelo que se usará según el modo (sin claves). Sirve para los logs.
 * @param mode 'chat' para generación de fichas, 'visualization' para maquetación
 */
export function getModelName(mode: 'chat' | 'visualization'): string {
  // Para chat: usar el modelo configurado
  // Para visualization: usar el modelo optimizado (más barato)
  return mode === 'visualization'
    ? process.env.AI_MODEL_VISUALIZATION ||
        process.env.AI_MODEL ||
        DEFAULT_VISUALIZATION_MODEL
    : process.env.AI_MODEL || DEFAULT_CHAT_MODEL;
}

/**
 * Obtiene el modelo apropiado según el modo
 * @param mode 'chat' para generación de fichas, 'visualization' para maquetación
 */
function getModelForMode(mode: 'chat' | 'visualization'): LanguageModel {
  const provider = getProviderName();
  const modelName = getModelName(mode);

  let model: unknown;

  switch (provider) {
    case 'openai':
      model = openai(modelName);
      break;

    case 'gemini':
      model = google(modelName);
      break;

    case 'deepseek': {
      const ds = createOpenAI({
        apiKey: requireApiKey('deepseek'),
        baseURL: 'https://api.deepseek.com/v1',
      });
      model = ds.chat(modelName);
      break;
    }

    case 'openrouter': {
      const openrouter = createOpenAI({
        apiKey: requireApiKey('openrouter'),
        baseURL: 'https://openrouter.ai/api/v1',
        headers: {
          'HTTP-Referer':
            process.env.OPENROUTER_REFERER || 'https://educaweb.com',
          'X-Title': 'EducaWeb',
        },
      });
      model = openrouter.chat(modelName);
      break;
    }

    case 'ollama': {
      const ollama = createOllama();
      model = ollama(modelName);
      break;
    }

    default:
      // Mejor fallar en claro que usar en silencio un proveedor no previsto
      throw new Error(`AI_PROVIDER "${provider}" no está soportado.`);
  }

  return model as unknown as LanguageModel;
}
