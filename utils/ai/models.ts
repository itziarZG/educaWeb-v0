// lib/ai/models.ts
import { createOpenAI, openai } from "@ai-sdk/openai"; // Importamos createOpenAI
import { google } from "@ai-sdk/google";
import { createOllama } from "ollama-ai-provider";

export function getLanguageModel() {
  const provider = process.env.AI_PROVIDER || "openai";
  const modelName = process.env.AI_MODEL || "gpt-4o-mini";
  const apiKey = process.env.AI_API_KEY;
  switch (provider) {
    case "openai":
      return openai(modelName);

    case "gemini":
      return google(modelName);

    case "deepseek":
      const ds = createOpenAI({
        apiKey: apiKey,
        baseURL: "https://api.deepseek.com/v1",
      });
      return ds.chat(modelName);
    case "ollama":
      const ollama = createOllama();
      return ollama(modelName);

    default:
      return openai("gpt-4o-mini");
  }
}
