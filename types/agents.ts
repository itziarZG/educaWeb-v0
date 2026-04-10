export type AgentType = string;
export type Roles = 'user' | 'assistant' | 'system';
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
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
}

export interface ChildInfoAPI {
  id: string;
  name: string;
  age: number;
  grade: string;
  interests: string;
  observations: string;
  user_id: string;
  system_prompt: string;
  region: string;
}

export interface ChildInfo {
  id: string;
  name: string;
  age: number;
  grade: string;
  interests: string;
  observations: string;
  userId: string;
  systemPrompt: string;
  region: string;
  topic?: string;
}
