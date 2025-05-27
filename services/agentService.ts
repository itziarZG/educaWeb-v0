// API service to interact with educational agents

interface AgentMessage {
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

interface AgentResponse {
  message: string;
  htmlContent?: string;
  conversationId?: string;
  error?: string;
}

// API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_AGENT_API_URL || "https://api.example.com";

/**
 * Send message to educational agent via API
 * @param message The message content
 * @param agentType The type of agent (junior, middle, senior, default)
 * @param conversationId Optional conversation ID for continuing conversations
 */
export async function sendMessageToAgent(
  messages: { role: string; content: string }[],
  agentType: "andrea" | "junior" | "middle" | "senior" | "default"
): Promise<AgentResponse> {
  try {
    // Instead of calling external API directly
    const response = await fetch("/api/andrea-agent", {
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

/**
 * Get conversation history
 * @param conversationId The conversation ID
 * @param agentType The type of agent
 */
export async function getConversationHistory(
  conversationId: string,
  agentType: "andrea" | "junior" | "middle" | "senior" | "default"
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
