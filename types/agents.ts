export type AgentType = string;
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
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
}

export interface ChildInfoAPI {
  id: string;
  nombre: string;
  edad: number;
  curso: string;
  gustos: string;
  observaciones: string;
  perfil_id: string;
  system_prompt: string;
  comunidad_autonoma: string;
}

export interface ChildInfo {
  id: string;
  nombre: string;
  edad: number;
  curso: string;
  gustos: string;
  observaciones: string;
  perfilId: string;
  systemPrompt: string;
  comunidadAutonoma: string;
}
