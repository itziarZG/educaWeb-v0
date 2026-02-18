import { RefObject } from 'react';

interface VisualizationInterfaceProps {
  htmlContent: string;
  htmlLoading: boolean;
  iframeRef: RefObject<HTMLIFrameElement | null>;
  handlePrint: () => void;
  handleDownloadPdf: () => void;
  handleVisualize: () => void;
  setShowMobileViz: (show: boolean) => void;
  isMobile: boolean;
}

export default function VisualizationInterface({
  htmlContent,
  htmlLoading,
  iframeRef,
  handlePrint,
  handleDownloadPdf,
  handleVisualize,
  setShowMobileViz,
  isMobile,
}: VisualizationInterfaceProps) {
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

      <div className="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth">
        <div className="max-w-4xl mx-auto bg-white dark:bg-dark-surface rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-200 dark:border-dark-border min-h-[800px] p-10 md:p-16 relative transition-all">
          {htmlLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400">
              <p className="animate-pulse">Creando visualización...</p>
            </div>
          ) : htmlContent ? (
            <iframe
              ref={iframeRef}
              srcDoc={htmlContent}
              className="w-full h-full min-h-[800px] border-0 rounded-xl"
              title="Visualization"
              sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-modals"
            />
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
