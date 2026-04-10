import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { getChildById } from './actions';
import {
  sendMessageToAgent,
  sendMessageToMaquetin,
} from '@/services/agentService';
import { createClient } from '@/utils/supabase/client';
import type { ChatMessage, ChildInfo } from '@/types/agents';

export const useChatInfo = (
  initialChildInfo?: ChildInfo | null,
  systemPrompt?: string
) => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const childId = searchParams.get('childId');

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [htmlLoading, setHtmlLoading] = useState<boolean>(false);
  const [childInfo, setChildInfo] = useState<ChildInfo | null>(
    initialChildInfo || null
  );
  const [topic, setTopic] = useState<string>('Matemáticas'); // Default topic
  const [showTopicCustom, setShowTopicCustom] = useState(false); // Para mostrar input cuando es "Otros"

  const [noCreditsModalOpen, setNoCreditsModalOpen] = useState(false);

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

  const checkCredits = useCallback(async () => {
    if (!user) return false;
    const supabase = createClient();
    const { data: clientData, error } = await supabase
      .from('clients')
      .select('credits')
      .eq('id', user.id)
      .single();

    if (error || !clientData || (clientData.credits || 0) <= 0) {
      setNoCreditsModalOpen(true);
      return false;
    }
    return true;
  }, [user]);

  // Check credits on load
  useEffect(() => {
    if (user) {
      checkCredits();
    }
  }, [user, checkCredits]);

  function cleanHtmlResponse(response: string): string {
    return response
      .replace(/^```html\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();
  }

  // Handle Send Message
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      // 1. Creamos el array para la API empezando por el System Prompt
      // Incluimos el topic en el prompt si está seleccionado
      const basePrompt = systemPrompt || 'Eres un asistente educativo.';
      const topicAddition =
        topic && topic !== 'Sin especificar'
          ? `\n\n**Temática de la ficha de hoy:** ${topic}. Asegúrate de que toda la ficha esté EXCLUSIVAMENTE enfocada en esta temática.`
          : '';

      const messagesForApi = [
        {
          role: 'system',
          content: basePrompt + topicAddition,
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
        role: 'assistant',
        content: response.message,
        timestamp: Date.now(),
      };
      setMessages([...newMessages, agentMsg]);
    } catch (error: Error | unknown) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : '';

      // Chequeamos si es error de créditos (402 o mensaje específico)
      if (
        errorMessage.includes('Sin créditos') ||
        errorMessage.includes('402')
      ) {
        setNoCreditsModalOpen(true);
        // Opcional: Eliminar el último mensaje del usuario para que no parezca que se envió
        // setMessages(messages);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Error al conectar con el agente. ' + errorMessage,
            timestamp: Date.now(),
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Manual Trigger for Visualization (Maquetin)
  const handleVisualize = async () => {
    const lastAgentMsg = [...messages]
      .reverse()
      .find((m) => m.role === 'assistant');
    if (!lastAgentMsg) return;

    // Check for credits
    // Check for credits
    const hasCredits = await checkCredits();
    if (!hasCredits) return;

    setHtmlLoading(true);
    try {
      const res = await sendMessageToMaquetin([
        { role: 'user', content: lastAgentMsg.content },
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
    topic,
    setTopic,
    showTopicCustom,
    setShowTopicCustom,
    handleSubmit,
    handleVisualize,
    noCreditsModalOpen,
    setNoCreditsModalOpen,
  };
};
