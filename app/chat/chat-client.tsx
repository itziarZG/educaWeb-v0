"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage, ChildInfo } from "@/types/agents";
import { useChatInfo } from "./hooks";

// Import html2pdf dynamically in component

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
    setHtmlContent,
    htmlLoading,
    childInfo,
    handleSubmit,
    handleVisualize,
  } = useChatInfo(initialChildInfo, systemPrompt);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Mobile check
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  const handleDownloadPdf = async () => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const element = iframeRef.current.contentDocument.body;
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: 0.5,
        filename: "visualization.pdf",
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait" as const,
        },
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-gray-100 h-screen overflow-hidden flex transition-colors duration-200">
      {/* Main Content */}
      <main className="flex-1 flex h-full relative overflow-hidden bg-white dark:bg-dark-surface transition-colors duration-200">
        {/* Chat Section */}
        <section
          className={`w-full md:w-[380px] lg:w-[420px] flex flex-col border-r border-[#f0f2f4] dark:border-dark-border bg-white dark:bg-dark-surface z-20 shrink-0 ${htmlContent && isMobile ? "hidden" : "flex"}`}
        >
          <div className="h-16 shrink-0 border-b border-[#f0f2f4] dark:border-dark-border flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                edit_note
              </span>
              <div className="flex flex-col">
                <h2 className="font-bold text-sm text-[#111318] dark:text-gray-100">
                  Creador de fichas{" "}
                  {childInfo ? `para ${childInfo.nombre}` : ""}
                </h2>
              </div>
            </div>
            <div className="md:hidden" onClick={toggleSidebar}>
              <span className="material-symbols-outlined text-gray-400">
                menu_open
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background-light dark:bg-background-dark">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <p>Inicia una conversación con el agente</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {msg.role === "assistant" ? (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0 text-primary border border-indigo-200 dark:border-indigo-800/50">
                    <span className="material-symbols-outlined text-[18px]">
                      smart_toy
                    </span>
                  </div>
                ) : (
                  <div
                    className="w-8 h-8 rounded-full bg-cover bg-center shrink-0 border-2 border-white dark:border-gray-600 shadow-sm"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDowIUv-XZ2aq9He1qvfmTIM8-swGM7D2B-7eF2-uInVy7SAKOCJ6zJ_5CS_qxrh6nwu3bSkzqos9Bw3kxESalui6o_wIZr5kMx9fuill-rcQo1l8WwyNm48230fUQOzGscFCR8u23OFj2bXs67M4T_Ii1riGRCCYavFDgTVP6g6qaHyugg0_qo935-OeExY_6JeBgaeIqDGgfUI5NaXxHbBEe7BGMngsIzI4qC6F4i9buhNZNV3w1wr3kEPlhFL2aDAX7qTSIQuIqo")',
                    }}
                  ></div>
                )}

                <div
                  className={`flex flex-col gap-1 max-w-[85%] ${msg.role === "user" ? "items-end" : ""}`}
                >
                  <span
                    className={`text-xs font-semibold text-gray-500 ${msg.role === "user" ? "mr-1" : "ml-1"}`}
                  >
                    {msg.role === "assistant" ? "Agent" : "You"}
                  </span>
                  <div
                    className={`${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-white dark:bg-dark-surface dark:text-gray-200 border border-gray-100 dark:border-dark-border rounded-tl-none"
                    } 
                            p-3 rounded-xl shadow-sm text-sm leading-relaxed`}
                  >
                    <p>{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    sync
                  </span>
                </div>
                <div className="bg-white dark:bg-dark-surface p-3 rounded-xl rounded-tl-none shadow-sm border border-gray-100 dark:border-dark-border text-sm text-gray-500">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-[#f0f2f4] dark:border-dark-border bg-white dark:bg-dark-surface">
            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                className="w-full bg-gray-50 dark:bg-dark-highlight border-gray-200 dark:border-dark-border/50 rounded-xl text-sm p-3 pr-12 focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none placeholder-gray-400 text-gray-800 dark:text-gray-200 shadow-sm transition-all outline-none"
                placeholder="Refine the content..."
                rows={3}
                disabled={loading}
              ></textarea>
              <button
                onClick={() => handleSubmit()}
                disabled={loading || !input.trim()}
                className="absolute bottom-2 right-2 p-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">
                  send
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Action Bar / Divider */}
        <div className="hidden md:flex w-[80px] flex-col items-center justify-center border-r border-[#f0f2f4] dark:border-dark-border bg-gray-50/50 dark:bg-dark-surface/50 z-10">
          <button
            onClick={handleVisualize}
            disabled={htmlLoading || messages.length === 0}
            className={`
              w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
              ${
                htmlLoading || messages.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                  : "bg-linear-to-r from-primary to-indigo-600 text-white hover:scale-110 hover:shadow-xl hover:shadow-primary/20"
              }
            `}
            title="Generate Visualization"
          >
            <span
              className={`material-symbols-outlined text-[28px] ${
                htmlLoading ? "animate-spin" : ""
              }`}
            >
              {htmlLoading ? "sync" : "arrow_forward"}
            </span>
          </button>
          <span className="mt-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Visualize
          </span>
        </div>

        {/* Visualization Section */}
        <section
          className={`hidden md:flex flex-1 flex-col bg-slate-50 dark:bg-background-dark h-full overflow-hidden relative transition-colors duration-200 ${htmlContent && isMobile ? "flex! w-full absolute inset-0 z-30" : ""}`}
        >
          <div className="h-16 shrink-0 bg-white dark:bg-dark-surface border-b border-[#f0f2f4] dark:border-dark-border flex items-center justify-between px-6 lg:px-8">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  onClick={() => setHtmlContent("")}
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
                    Visual Output
                  </h2>
                </div>
                {htmlLoading && (
                  <div className="flex items-center gap-1.5 text-[11px] text-green-600 dark:text-green-400 ml-0.5 mt-0.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    <span>Generating...</span>
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
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 bg-transparent border border-gray-200 dark:border-dark-border/60 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-highlight transition-colors"
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
                  <span className="material-symbols-outlined text-6xl animate-spin mb-4 text-primary/50">
                    settings
                  </span>
                  <p className="animate-pulse">Creating visualization...</p>
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
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-300 dark:text-gray-600">
                  <span className="material-symbols-outlined text-8xl mb-4 opacity-50">
                    rocket_launch
                  </span>
                  <p className="text-lg font-medium">Ready to visualize</p>
                  <p className="text-sm mt-2 max-w-xs text-center opacity-75">
                    Click the arrow button to generate a visual representation
                    of the chat.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
