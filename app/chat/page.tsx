"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, FileDown, Smartphone, Laptop, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import AgentChat from "@/components/AgentChat";

export default function ChatPage() {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const renderAreaRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const agent = searchParams.get("agent") || "default";

  // Determine agent details based on URL parameter
  const agentDetails = {
    junior: {
      name: "Pequeños Exploradores",
      color: "green",
      emoji: "🌈",
    },
    middle: {
      name: "Curiosos del Saber",
      color: "blue",
      emoji: "🔍",
    },
    senior: {
      name: "Jóvenes Científicos",
      color: "purple",
      emoji: "🚀",
    },
    default: {
      name: "Asistente Educativo",
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

  // Handle HTML content updates from the Agent API
  const handleHtmlContentUpdate = (content: string) => {
    setHtmlContent(content);
  };

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
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
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
          <Tabs defaultValue="chat" className="w-full">
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
                  agentType={
                    agent as "junior" | "middle" | "senior" | "default"
                  }
                  onHtmlContentUpdate={handleHtmlContentUpdate}
                />
              </Card>
            </TabsContent>

            <TabsContent value="render" className="h-[70vh]">
              <Card
                className="h-full p-4 overflow-auto rounded-3xl border-4"
                style={{ borderColor: `var(--${agentDetails?.color}-400)` }}
              >
                <div
                  ref={renderAreaRef}
                  className="render-area"
                  dangerouslySetInnerHTML={{
                    __html:
                      htmlContent ||
                      `<p style="text-align: center; font-size: 18px; color: #666;">¡Hola! Pregúntame algo en el chat y te mostraré la respuesta aquí con dibujos y explicaciones...</p>`,
                  }}
                />
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          // Desktop layout - Side by side
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <Card
              className="p-4 h-[70vh] rounded-3xl border-4"
              style={{ borderColor: `var(--${agentDetails?.color}-400)` }}
            >
              <h2
                className="text-xl font-semibold mb-2 text-center"
                style={{ color: `var(--${agentDetails?.color}-600)` }}
              >
                Chat con {agentDetails?.name}
              </h2>
              <AgentChat
                agentType={agent as "junior" | "middle" | "senior" | "default"}
                onHtmlContentUpdate={handleHtmlContentUpdate}
              />
            </Card>

            <Card
              className="p-4 h-[70vh] overflow-auto rounded-3xl border-4"
              style={{ borderColor: `var(--${agentDetails?.color}-400)` }}
            >
              <h2
                className="text-xl font-semibold mb-2 text-center"
                style={{ color: `var(--${agentDetails?.color}-600)` }}
              >
                Visualización
              </h2>
              <div
                ref={renderAreaRef}
                className="render-area h-[calc(100%-2rem)]"
                dangerouslySetInnerHTML={{
                  __html:
                    htmlContent ||
                    `<p style="text-align: center; font-size: 18px; color: #666;">¡Hola! Pregúntame algo en el chat y te mostraré la respuesta aquí con dibujos y explicaciones...</p>`,
                }}
              />
            </Card>
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

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Dispositivo actual:{" "}
            {isMobile ? (
              <span className="flex items-center justify-center gap-1 mt-1">
                <Smartphone size={16} /> Móvil
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1 mt-1">
                <Laptop size={16} /> Escritorio
              </span>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
