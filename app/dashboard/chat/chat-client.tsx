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

    // 2. Crear elemento temporal para impresión
    if (!htmlContent) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);

    // 3. Esperar a que se carguen las imágenes/estilos
    setTimeout(() => {
      window.print();
      document.body.removeChild(tempDiv);
    }, 500);
  };

  const handleDownloadPdf = async () => {
    // 1. Guardar ficha en BD
    await saveWorksheet();

    // 2. Generar PDF usando html2canvas + jsPDF
    if (!htmlContent) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      // Crear contenedor temporal
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '1000px'; // Ancho fijo para consistencia
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '40px';
      document.body.appendChild(tempDiv);

      // Esperar a que se carguen recursos
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Convertir a canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      // Limpiar elemento temporal
      document.body.removeChild(tempDiv);

      // Crear PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      // Agregar páginas si es necesario
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      // Descargar
      pdf.save('ficha-educativa.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
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
