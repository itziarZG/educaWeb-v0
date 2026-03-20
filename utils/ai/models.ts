// lib/ai/models.ts
import { createOpenAI, openai } from '@ai-sdk/openai'; // Importamos createOpenAI
import { google } from '@ai-sdk/google';
import { createOllama } from 'ollama-ai-provider';
import { LanguageModel } from 'ai';

export function getLanguageModel(): LanguageModel {
  const provider = process.env.AI_PROVIDER || 'openai';
  const modelName = process.env.AI_MODEL || 'gpt-4o-mini';
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
