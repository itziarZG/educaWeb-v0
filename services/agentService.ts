import { AgentMessage, AgentResponse, AgentType } from "@/types/agents";

export async function sendMessageToAgent(
  messages: { role: string; content: string }[],
  agentType: AgentType
): Promise<AgentResponse> {
  try {
    // Instead of calling external API directly
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        agentType,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      message: data.message,
      htmlContent: data.htmlContent,
      conversationId: data.conversationId,
    };
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
  agentType: AgentType
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
