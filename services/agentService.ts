// API service to interact with educational agents

interface AgentMessage {
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

interface AgentResponse {
  message: string;
  htmlContent?: string;
  conversationId?: string;
  error?: string;
}

// Agent types and their IDs in the external API
const AGENT_API_IDS = {
  junior: 'AGENT_JUNIOR_ID', // Replace with actual API ID
  middle: 'AGENT_MIDDLE_ID', // Replace with actual API ID
  senior: 'AGENT_SENIOR_ID', // Replace with actual API ID
  default: 'AGENT_DEFAULT_ID', // Replace with actual API ID
};

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_AGENT_API_URL || 'https://api.example.com';

/**
 * Send message to educational agent via API
 * @param message The message content
 * @param agentType The type of agent (junior, middle, senior, default)
 * @param conversationId Optional conversation ID for continuing conversations
 */
export async function sendMessageToAgent(
  message: string, 
  agentType: 'junior' | 'middle' | 'senior' | 'default', 
  conversationId?: string
): Promise<AgentResponse> {
  try {
    const agentId = AGENT_API_IDS[agentType];
    
    const response = await fetch(`${API_BASE_URL}/agents/${agentId}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers as needed
        // 'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        message,
        conversationId,
        options: {
          includeHtmlContent: true, // Request HTML formatted content
        }
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
    console.error('Error communicating with agent API:', error);
    return {
      message: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
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
  agentType: 'junior' | 'middle' | 'senior' | 'default'
): Promise<AgentMessage[]> {
  try {
    const agentId = AGENT_API_IDS[agentType];
    
    const response = await fetch(`${API_BASE_URL}/agents/${agentId}/conversations/${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers as needed
        // 'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    return [];
  }
}
