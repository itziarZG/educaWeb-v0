import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { getChildById } from "./actions";
import {
  sendMessageToAgent,
  sendMessageToMaquetin,
} from "@/services/agentService";
import type { ChatMessage, ChildInfo } from "@/types/agents";

export const useChatInfo = (
  initialChildInfo?: ChildInfo | null,
  systemPrompt?: string,
) => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const childId = searchParams.get("childId");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [htmlLoading, setHtmlLoading] = useState<boolean>(false);
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(
    initialChildInfo || null,
  );

  // Sync state with prop
  useEffect(() => {
    setChildInfo(initialChildInfo || null);
  }, [initialChildInfo]);

  // Fetch child info if childId is present and not already loaded via props
  useEffect(() => {
    if (childId && !childInfo) {
      getChildById(childId).then((data) => {
        if (data) setChildInfo(data);
      });
    }
  }, [childId, childInfo]);

  function cleanHtmlResponse(response: string): string {
    return response
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
  }

  // Handle Send Message
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      // 1. Creamos el array para la API empezando por el System Prompt
      const messagesForApi = [
        {
          role: "system",
          content: systemPrompt || "Eres un asistente educativo.", // Fallback por si llega vacío
        },
        // 2. Añadimos el resto de mensajes (mapeados para quitar el timestamp)
        ...newMessages.map(({ role, content }) => ({
          role,
          content,
        })),
      ];

      // 3. Enviamos el array que ya incluye el system prompt al inicio
      const response = await sendMessageToAgent(messagesForApi, childInfo);

      if (response.error) throw new Error(response.error);

      const agentMsg: ChatMessage = {
        role: "assistant",
        content: response.message,
        timestamp: Date.now(),
      };
      setMessages([...newMessages, agentMsg]);

      if (response.htmlContent) {
        setHtmlContent(cleanHtmlResponse(response.htmlContent));
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error al conectar con el agente.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Manual Trigger for Visualization (Maquetin)
  const handleVisualize = async () => {
    const lastAgentMsg = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");
    if (!lastAgentMsg) return;

    setHtmlLoading(true);
    try {
      const res = await sendMessageToMaquetin([
        { role: "user", content: lastAgentMsg.content },
      ]);
      setHtmlContent(cleanHtmlResponse(res.message));
    } catch (e) {
      console.error(e);
    } finally {
      setHtmlLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    htmlContent,
    setHtmlContent,
    htmlLoading,
    childInfo,
    handleSubmit,
    handleVisualize,
  };
};
