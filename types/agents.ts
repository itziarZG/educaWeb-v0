export type AgentType = "andrea" | "maquetin" | "default";
export type Roles = "user" | "assistant" | "system";
export interface ChatMessage {
  content: string;
  role: Roles;
  timestamp: number;
}

export interface AgentMessage {
  content: string;
  role: Roles;
  timestamp: number;
}

export interface AgentResponse {
  message: string;
  htmlContent?: string;
  conversationId?: string;
  error?: string;
}

export interface AgentChatProps {
  agentType: AgentType;
  onHtmlContentUpdate: (content: string) => void;
}
