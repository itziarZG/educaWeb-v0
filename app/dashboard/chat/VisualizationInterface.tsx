import { RefObject, useState, useEffect } from 'react';
import type { WorksheetFeedback } from '@/types/worksheet';
import FeedbackForm from '@/components/FeedbackForm';
import { Skeleton } from '@/components/ui/skeleton';

interface VisualizationInterfaceProps {
  htmlContent: string;
  htmlLoading: boolean;
  htmlError: string | null;
  setHtmlError: (error: string | null) => void;
  iframeRef: RefObject<HTMLIFrameElement | null>;
  handlePrint: () => void;
  handleDownloadPdf: () => void;
  handleVisualize: () => void;
  setShowMobileViz: (show: boolean) => void;
  isMobile: boolean;
  worksheetId?: string;
  feedback?: WorksheetFeedback;
  onFeedbackSubmitted?: () => void;
}

export default function VisualizationInterface({
  htmlContent,
  htmlLoading,
  htmlError,
  setHtmlError,
  iframeRef,
  handlePrint,
  handleDownloadPdf,
  handleVisualize,
  setShowMobileViz,
  isMobile,
  worksheetId,
  feedback,
  onFeedbackSubmitted,
}: VisualizationInterfaceProps) {
  const [iframeHeight, setIframeHeight] = useState<number>(800);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type === 'setHeight' &&
        typeof event.data.height === 'number'
      ) {
        // Añadimos un pequeño padding extra para evitar scrollbars traicioneros
        setIframeHeight(event.data.height + 40);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Inyectamos un script para que el iframe reporte su altura
  const contentWithAutoResize = htmlContent
    ? `
    ${htmlContent}
    <script>
      (function() {
        const sendHeight = () => {
          const height = document.documentElement.scrollHeight || document.body.scrollHeight;
          window.parent.postMessage({ type: 'setHeight', height: height }, '*');
        };
        
        // Ejecutar en carga y cambios de tamaño
        window.addEventListener('load', sendHeight);
        window.addEventListener('resize', sendHeight);
        
        // Observer para cambios dinámicos en el contenido
        if (window.ResizeObserver) {
          const ro = new ResizeObserver(sendHeight);
          ro.observe(document.body);
        }
        
        // Un último intento por las dudas
        setTimeout(sendHeight, 500);
        setTimeout(sendHeight, 1500);
      })();
    </script>
  `
    : '';

  return (
    <>
      <div className="h-16 shrink-0 bg-white dark:bg-dark-surface border-b border-[#f0f2f4] dark:border-dark-border flex items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              onClick={() => setShowMobileViz(false)}
              className="md:hidden"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                preview
              </span>
              <h2 className="font-bold text-gray-900 dark:text-gray-100">
                Ficha generada:
              </h2>
            </div>
            {htmlLoading && (
              <div className="flex items-center gap-1.5 text-[11px] text-green-600 dark:text-green-400 ml-0.5 mt-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                <span>Generando...</span>
              </div>
            )}
          </div>
        </div>
        {htmlContent && (
          <div className="flex items-center gap-3">
            <div className="h-6 w-px bg-gray-200 dark:bg-dark-border"></div>
            <button
              onClick={handleVisualize}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 bg-transparent border border-gray-200 dark:border-dark-border/60 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-highlight transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                refresh
              </span>
              Update
            </button>
            <div className="h-6 w-px bg-gray-200 dark:bg-dark-border"></div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 bg-transparent border border-gray-200 dark:border-dark-border/60 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-highlight transition-colors"
              title="Print"
            >
              <span className="material-symbols-outlined text-[18px]">
                print
              </span>
              Print
            </button>
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-300 bg-transparent border border-gray-200 dark:border-dark-border/60 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-highlight transition-colors"
              title="Download PDF"
            >
              <span className="material-symbols-outlined text-[18px]">
                picture_as_pdf
              </span>
              PDF
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto scroll-smooth">
        <div className="max-w-4xl mx-auto bg-white dark:bg-dark-surface rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-200 dark:border-dark-border min-h-screen p-6 md:p-10 relative transition-all">
          {htmlLoading ? (
            <div className="flex flex-col gap-8 h-full">
              <div className="flex justify-between items-center">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-5/6" />
                <Skeleton className="h-8 w-4/6" />
              </div>
              <Skeleton className="flex-1 w-full rounded-xl" />
              <div className="flex justify-center gap-4">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>
            </div>
          ) : htmlContent ? (
            <div className="h-full">
              <iframe
                ref={iframeRef}
                srcDoc={contentWithAutoResize}
                style={{ height: iframeHeight, minHeight: '500px' }}
                className="w-full border-0 rounded-xl"
                title="Visualization"
                sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-modals"
              />

              {/* FeedbackForm Component */}
              {worksheetId && (
                <FeedbackForm
                  worksheetId={worksheetId}
                  initialFeedback={feedback}
                  onFeedbackSubmitted={onFeedbackSubmitted}
                />
              )}
            </div>
          ) : htmlError ? (
            <div className="flex flex-col items-center justify-center h-full min-h-screen text-red-600 dark:text-red-400 p-6">
              <span className="material-symbols-outlined text-8xl mb-4 opacity-70">
                error_outline
              </span>
              <p className="text-lg font-medium mb-2">
                Error al generar la visualización
              </p>
              <p className="text-sm text-center max-w-md opacity-90">
                {htmlError}
              </p>
              <button
                onClick={handleVisualize}
                className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Reintentar
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-300 dark:text-gray-400">
              <span className="material-symbols-outlined text-8xl mb-4 opacity-50">
                rocket_launch
              </span>
              <p className="text-lg font-medium">Lista para visualizar</p>
              <p className="text-sm mt-2 max-w-xs text-center opacity-75">
                Dale al botón de Visualizar para generar la ficha una vez esté
                como te gusta.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
