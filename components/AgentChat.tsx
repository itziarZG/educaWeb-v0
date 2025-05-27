import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { sendMessageToAgent } from "@/services/agentService";

interface AgentChatProps {
  agentType: "andrea" | "middle" | "senior" | "default";
  onHtmlContentUpdate: (content: string) => void;
}

interface ChatMessage {
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: number;
}

const AgentChat = ({ agentType, onHtmlContentUpdate }: AgentChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      content: input,
      role: "user",
      timestamp: Date.now(),
    };

    // Prepara el array de mensajes para la API (system + histórico + mensaje actual)
    const messagesForApi = [
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: input,
      },
    ];

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Llama a la API con el array de mensajes
      const response = await sendMessageToAgent(messagesForApi, agentType);

      if (response.error) {
        throw new Error(response.error);
      }

      const agentMessage: ChatMessage = {
        content: response.message,
        role: "assistant",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, agentMessage]);

      if (response.htmlContent) {
        onHtmlContentUpdate(response.htmlContent);
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message to chat
      const errorMessage: ChatMessage = {
        content:
          "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        role: "assistant",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <Bot size={48} className="mx-auto mb-2" />
              <p>¡Haz una pregunta al agente educativo!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[95%] px-4 py-2 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-gray-200 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === "assistant" ? (
                      <Bot size={16} />
                    ) : (
                      <User size={16} />
                    )}
                    <span className="text-xs font-semibold">
                      {msg.role === "assistant" ? "Agente" : "Tú"}
                    </span>
                  </div>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-tl-none max-w-[80%] flex items-center gap-2">
                  <Bot size={16} />
                  <span className="text-xs font-semibold">Agente</span>
                  <svg
                    className="animate-spin h-4 w-4 text-gray-500 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            disabled={loading}
            className="rounded-full"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full"
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AgentChat;
