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

/**
 * Traduce el error del agente a un mensaje para el usuario.
 * Los mensajes de límite y de servicio ya llegan en español desde el servidor;
 * el resto (detalles del proveedor, errores de red) se sustituye por uno genérico.
 */
const mensajeDeErrorAgente = (errorMessage: string): string => {
  if (errorMessage === 'Unauthorized') {
    return 'Tu sesión ha caducado. Vuelve a iniciar sesión para seguir.';
  }
  if (
    errorMessage.includes('límite de uso') ||
    errorMessage.includes('no está disponible en este momento')
  ) {
    return errorMessage;
  }
  return 'El asistente no está disponible ahora. Inténtalo más tarde.';
};

export const useChatInfo = (initialChildInfo?: ChildInfo | null) => {
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
  const [htmlError, setHtmlError] = useState<string | null>(null);

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
    if (!input.trim() || loading || !childInfo) return;

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
      // El system prompt lo compone el servidor a partir del niño y el tema
      const messagesForApi = newMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      const response = await sendMessageToAgent(
        messagesForApi,
        childInfo.id,
        topic
      );

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
            content: mensajeDeErrorAgente(errorMessage),
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
    const hasCredits = await checkCredits();
    if (!hasCredits) return;

    setHtmlLoading(true);
    setHtmlError(null);
    try {
      const res = await sendMessageToMaquetin(lastAgentMsg.content);
      if (res.error) throw new Error(res.error);
      setHtmlContent(cleanHtmlResponse(res.message));
      setHtmlError(null);
    } catch (error) {
      console.error('Error en visualización:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      setHtmlError(
        `Hubo un error al generar la visualización: ${errorMessage}. Por favor, intenta de nuevo.`
      );
      setHtmlContent('');
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
    htmlError,
    setHtmlError,
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
