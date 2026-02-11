import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { createOllama } from "ollama-ai-provider";

export function getLanguageModel() {
  const provider = process.env.AI_PROVIDER || "openai";
  const modelName = process.env.AI_MODEL || "gpt-4o-mini";

  switch (provider) {
    case "openai":
      return openai(modelName);

    case "gemini":
      return google(modelName);

    case "deepseek":
      return openai(modelName, {
        baseURL: "https://api.deepseek.com/v1",
        apiKey: process.env.AI_API_KEY,
      });

    case "ollama":
      const ollama = createOllama();
      return ollama(modelName);

    default:
      return openai("gpt-4o-mini");
  }
}
