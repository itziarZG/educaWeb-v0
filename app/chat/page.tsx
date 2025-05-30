"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, FileDown, Smartphone, Laptop, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AgentChat from "@/components/AgentChat";
import { sendMessageToAgent } from "@/services/agentService";
import type { AgentType, ChatMessage } from "@/types/agents";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [htmlLoading, setHtmlLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<string>("chat");
  const [lastRenderedAgentMsg, setLastRenderedAgentMsg] = useState<string>("");
  const renderAreaRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const agent = searchParams.get("agent") || "default";

  // Determine agent details based on URL parameter
  const agentDetails = {
    andrea: {
      name: "Agente de Andrea",
      color: "green",
      emoji: "🌈",
    },
    arnau: {
      name: "Agente de Arnau",
      color: "blue",
      emoji: "⚽",
    },
    default: {
      name: "Asistente Educativo General",
      color: "indigo",
      emoji: "✨",
    },
  }[agent];

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // used to make request in visualisation tab in mobile
  useEffect(() => {
    if (!isMobile) return;
    if (mobileTab !== "render") return;
    const lastAgentMsg = [...messages]
      .reverse()
      .find((msg) => msg.role === "assistant");
    if (!lastAgentMsg) return;
    if (lastRenderedAgentMsg === lastAgentMsg.content) return;
    // request to maquetin
    (async () => {
      setHtmlLoading(true);
      setHtmlContent("");
      const maquetinAgent = await sendMessageToAgent(
        [{ role: "user", content: lastAgentMsg.content }],
        "maquetin"
      );
      setHtmlContent(cleanHtmlResponse(maquetinAgent.message));
      setHtmlLoading(false);
      setLastRenderedAgentMsg(lastAgentMsg.content);
    })();
  }, [mobileTab, messages, isMobile, lastRenderedAgentMsg]);

  // Handle HTML content updates from the Agent API
  const handleHtmlContentUpdate = async (content: string) => {
    setHtmlLoading(true);
    setHtmlContent("");
    const message = [{ role: "user", content }];
    const maquetinAgent = await sendMessageToAgent(message, "maquetin");
    setHtmlContent(cleanHtmlResponse(maquetinAgent.message));
    setHtmlLoading(false);
  };

  // send last principal agent to maquetin
  const handleSendToMaquetin = async () => {
    const lastAgentMsg = [...messages]
      .reverse()
      .find((msg) => msg.role === "assistant");
    if (!lastAgentMsg) return;
    setHtmlLoading(true);
    setHtmlContent("");
    const maquetinAgent = await sendMessageToAgent(
      [{ role: "user", content: lastAgentMsg.content }],
      "maquetin"
    );
    setHtmlContent(cleanHtmlResponse(maquetinAgent.message));
    setHtmlLoading(false);
  };

  function cleanHtmlResponse(response: string): string {
    // delete ```html in response
    return response
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
  }

  // Function to export content as PDF
  const exportToPDF = async () => {
    if (renderAreaRef.current) {
      // Dynamically import html2pdf only on client side
      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = html2pdfModule.default;

      const element = renderAreaRef.current;
      const opt = {
        margin: 10,
        filename: `${agentDetails?.name
          .toLowerCase()
          .replace(/\s+/g, "-")}-contenido.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait" as "portrait",
        },
      };

      html2pdf().set(opt).from(element).save();
    }
  };

  // Function to print content
  const printContent = () => {
    if (renderAreaRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${agentDetails?.name} - Contenido Educativo</title>
              <style>
                body { font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif; }
                .content { padding: 20px; }
                h1 { color: #6366f1; }
              </style>
            </head>
            <body>
              <h1>${agentDetails?.emoji} ${agentDetails?.name}</h1>
              <div class="content">
                ${renderAreaRef.current.innerHTML}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  // Get background color based on agent
  const getBgColor = () => {
    const colors = {
      green: "bg-gradient-to-b from-green-50 to-green-100",
      blue: "bg-gradient-to-b from-blue-50 to-blue-100",
      purple: "bg-gradient-to-b from-purple-50 to-purple-100",
      indigo: "bg-gradient-to-b from-indigo-50 to-indigo-100",
    };
    return colors[agentDetails?.color as keyof typeof colors] || colors.indigo;
  };

  // Get button color based on agent
  const getButtonColor = () => {
    const colors = {
      green: "bg-green-500 hover:bg-green-600",
      blue: "bg-blue-500 hover:bg-blue-600",
      purple: "bg-purple-500 hover:bg-purple-600",
      indigo: "bg-indigo-500 hover:bg-indigo-600",
    };
    return colors[agentDetails?.color as keyof typeof colors] || colors.indigo;
  };

  return (
    <main className={`min-h-screen ${getBgColor()}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full"
            >
              <Home size={16} />
              Volver a Inicio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-center">
            {agentDetails?.emoji} {agentDetails?.name}
          </h1>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </div>

        {isMobile ? (
          // Mobile layout - Tabs
          <div className="relative w-full">
            <Tabs
              defaultValue="chat"
              className="w-full"
              onValueChange={setMobileTab}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4 rounded-full">
                <TabsTrigger value="chat" className="rounded-l-full">
                  Chat
                </TabsTrigger>
                <TabsTrigger value="render" className="rounded-r-full">
                  Visualización
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="h-[70vh]">
                <Card
                  className="h-full p-4 rounded-3xl border-4"
                  style={{ borderColor: `var(--${agentDetails?.color}-400)` }}
                >
                  <AgentChat
                    agentType={agent as AgentType}
                    onHtmlContentUpdate={() => {}}
                    messages={messages}
                    onMessagesChange={setMessages}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="render" className="h-[70vh]">
                <Card
                  className="h-full p-4 overflow-auto rounded-3xl border-4"
                  style={{ borderColor: `var(--${agentDetails?.color}-400)` }}
                >
                  <div ref={renderAreaRef} className="render-area">
                    {htmlLoading ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg
                          className="animate-spin h-8 w-8 text-gray-400 mb-2"
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
                        <span>Maquetín está maquetando...</span>
                      </div>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            htmlContent ||
                            `<p style="text-align: center; font-size: 18px; color: #666;">¡Hola! Pregúntame algo en el chat y cuando estén listos los ejercicions dale al botón y yo me encargo</p>`,
                        }}
                      />
                    )}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
            {/* No hay botón flotante en móvil */}
          </div>
        ) : (
          // Desktop layout - Side by side
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 items-center">
            <Card
              className="p-4 h-[70vh] rounded-3xl border-4"
              style={{ borderColor: `var(--${agentDetails?.color}-400)` }}
            >
              <AgentChat
                agentType={agent as AgentType}
                onHtmlContentUpdate={() => {}}
                messages={messages}
                onMessagesChange={setMessages}
              />
            </Card>
            <Card
              className="p-4 h-[70vh] overflow-auto rounded-3xl border-4"
              style={{ borderColor: `var(--${agentDetails?.color}-400)` }}
            >
              <div
                ref={renderAreaRef}
                className="render-area h-[calc(100%-2rem)]"
              >
                {htmlLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <svg
                      className="animate-spin h-8 w-8 text-gray-400 mb-2"
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
                    <span>Maquetín está maquetando...</span>
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        htmlContent ||
                        `<p style="text-align: center; font-size: 18px; color: #666;">¡Hola! Pregúntame algo en el chat y cuando estén listos los ejercicions dale al botón y yo me encargo.</p>`,
                    }}
                  />
                )}
              </div>
            </Card>
            {messages.some((msg) => msg.role === "assistant") && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <Button
                  size="icon"
                  onClick={handleSendToMaquetin}
                  className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white w-10 h-10 shadow-md pointer-events-auto"
                  title="Visualizar en Maquetín"
                >
                  <span className="text-xl">→</span>
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={printContent}
            className={`flex items-center gap-2 rounded-full ${getButtonColor()}`}
          >
            <Printer size={16} />
            Imprimir
          </Button>
          <Button
            onClick={exportToPDF}
            className={`flex items-center gap-2 rounded-full ${getButtonColor()}`}
          >
            <FileDown size={16} />
            Guardar PDF
          </Button>
        </div>
      </div>
    </main>
  );
}
