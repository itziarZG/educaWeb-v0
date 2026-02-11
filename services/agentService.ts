import { AgentMessage, AgentResponse, AgentType } from "@/types/agents";

export async function sendMessageToAgent(
  messages: { role: string; content: string }[],
  agentType: string, // Asegúrate de que esto sea un string que exista en prompts.json
): Promise<AgentResponse> {
  try {
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages, // El array de mensajes [{role, content}]
        agentType, // La llave de tu JSON
      }),
    });

    if (!response.ok) {
      // Si falla, intentamos leer el error que enviamos desde el servidor
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error communicating with agent API:", error);
    return {
      message: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
export async function getConversationHistory(
  conversationId: string,
  agentType: AgentType,
): Promise<AgentMessage[]> {
  try {
    // Instead of calling external API directly
    const response = await fetch("/api/andrea-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agentType,
        conversationId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error("Error fetching conversation history:", error);
    return [];
  }
}
