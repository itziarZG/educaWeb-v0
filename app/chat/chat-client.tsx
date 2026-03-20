'use client';

import { useState, useRef, useEffect } from 'react';
import type { ChildInfo } from '@/types/agents';
import type { WorksheetFeedback } from '@/types/worksheet';
import { useChatInfo } from './hooks';
import NoCreditsModal from './NoCreditsModal';
import ChatInterface from './ChatInterface';
import VisualizationInterface from './VisualizationInterface';

interface ChatClientProps {
  initialChildInfo?: ChildInfo | null;
  systemPrompt?: string;
}

export default function ChatClient({
  initialChildInfo,
  systemPrompt,
}: ChatClientProps) {
  const {
    messages,
    input,
    setInput,
    loading,
    htmlContent,
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
  } = useChatInfo(initialChildInfo, systemPrompt);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showMobileViz, setShowMobileViz] = useState(false);
  const [worksheetId, setWorksheetId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<WorksheetFeedback | undefined>();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Mobile check
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleVisualizeWithReset = () => {
    setWorksheetId(null);
    handleVisualize();
  };

  const onVisualize = () => {
    setShowMobileViz(true);
    handleVisualizeWithReset();
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePrint = async () => {
    // 1. Guardar ficha en BD
    await saveWorksheet();

    // 2. Abrir dialog de impresión
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  const handleDownloadPdf = async () => {
    // 1. Guardar ficha en BD
    await saveWorksheet();

    // 2. Descargar PDF
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const element = iframeRef.current.contentDocument.body;
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 0.5,
        filename: 'visualization.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait' as const,
        },
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  const saveWorksheet = async (): Promise<string | null> => {
    if (!childInfo || !htmlContent) return null;

    // Guard: si ya fue guardada esta visualización, devolver el ID existente
    if (worksheetId) return worksheetId;

    try {
      const response = await fetch('/api/worksheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childId: childInfo.id,
          topic: topic || 'Sin especificar',
          htmlContent: htmlContent,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error saving worksheet:', error);
        return null;
      }

      const data = await response.json();
      const id = data.id;
      setWorksheetId(id);
      console.log('Worksheet saved successfully with ID:', id);
      return id;
    } catch (error) {
      console.error('Error in saveWorksheet:', error);
      return null;
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-gray-100 h-screen overflow-hidden flex transition-colors duration-200">
      {/* Main Content */}
      <main className="flex-1 flex h-full relative overflow-hidden bg-white dark:bg-dark-surface transition-colors duration-200">
        {/* Chat Section */}
        <section
          className={`w-full md:w-[380px] lg:w-[420px] flex flex-col border-r border-[#f0f2f4] dark:border-dark-border bg-white dark:bg-dark-surface z-20 shrink-0 ${showMobileViz && isMobile ? 'hidden' : 'flex'}`}
        >
          <ChatInterface
            messages={messages}
            loading={loading}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            childInfo={childInfo}
            toggleSidebar={toggleSidebar}
            isMobile={isMobile}
            messagesEndRef={messagesEndRef}
            onVisualize={onVisualize}
            htmlLoading={htmlLoading}
            topic={topic}
            setTopic={setTopic}
            showTopicCustom={showTopicCustom}
            setShowTopicCustom={setShowTopicCustom}
          />
        </section>

        {/* Action Bar / Divider */}
        <div className="hidden md:flex w-[80px] flex-col items-center justify-center border-r border-[#f0f2f4] dark:border-dark-border bg-gray-50/50 dark:bg-dark-surface/50 z-10">
          <button
            onClick={onVisualize}
            disabled={htmlLoading || messages.length === 0}
            className={`
              w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
              ${
                htmlLoading || messages.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-linear-to-r from-primary to-indigo-600 text-white hover:scale-110 hover:shadow-xl hover:shadow-primary/20'
              }
            `}
            title="Generate Visualization"
          >
            <span
              className={`material-symbols-outlined text-[28px] ${
                htmlLoading ? 'animate-spin' : ''
              }`}
            >
              {htmlLoading ? 'sync' : 'arrow_forward'}
            </span>
          </button>
          <span className="mt-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Visualize
          </span>
        </div>

        {/* Visualization Section */}
        <section
          className={`hidden md:flex flex-1 flex-col bg-slate-50 dark:bg-background-dark h-full overflow-hidden relative transition-colors duration-200 ${showMobileViz && isMobile ? 'flex! w-full absolute inset-0 z-30' : ''}`}
        >
          <VisualizationInterface
            htmlContent={htmlContent}
            htmlLoading={htmlLoading}
            iframeRef={iframeRef}
            handlePrint={handlePrint}
            handleDownloadPdf={handleDownloadPdf}
            handleVisualize={handleVisualizeWithReset}
            setShowMobileViz={setShowMobileViz}
            isMobile={isMobile}
            worksheetId={worksheetId ?? undefined}
            feedback={feedback}
            onFeedbackSubmitted={() => {
              // Opcionalmente refrescar estado aquí si es necesario
              console.log('Feedback submitted');
            }}
          />
        </section>
      </main>
      <NoCreditsModal
        isOpen={noCreditsModalOpen}
        onClose={() => setNoCreditsModalOpen(false)}
      />
    </div>
  );
}
