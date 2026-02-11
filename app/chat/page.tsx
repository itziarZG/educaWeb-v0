"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { sendMessageToAgent } from "@/services/agentService";
import type { AgentType, ChatMessage } from "@/types/agents";

// Import html2pdf dynamically in component

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [htmlLoading, setHtmlLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const renderAreaRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const agent = (searchParams.get("agent") as AgentType) || "default";

  // Determine agent details
  const agentDetails = {
    andrea: { name: "Andrea (Mates)", emoji: "📐" },
    arnau: { name: "Arnau (Explorador)", emoji: "🌍" },
    gadea: { name: "Lunara (Guía)", emoji: "🐺" },
    socrates: { name: "Socrates", emoji: "🏛️" },
    ada: { name: "Ada", emoji: "💻" },
    newton: { name: "Newton", emoji: "🍎" },
    maquetin: { name: "Maquetín", emoji: "🎨" },
    default: { name: "Agente General", emoji: "🎓" },
  }[agent] || { name: "Agente", emoji: "🤖" };

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
      // Create a clean version of messages for the API (removing timestamps)
      const messagesForApi = newMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      const response = await sendMessageToAgent(messagesForApi, agent);
      if (response.error) throw new Error(response.error);

      const agentMsg: ChatMessage = {
        role: "assistant",
        content: response.message,
        timestamp: Date.now(),
      };
      setMessages([...newMessages, agentMsg]);

      if (response.htmlContent) {
        setHtmlContent(cleanHtmlResponse(response.htmlContent));
      } else {
        // If no explicit HTML but we want to try visually, we could auto-request
        // For now, respect the response
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
      const res = await sendMessageToAgent(
        [{ role: "user", content: lastAgentMsg.content }],
        "maquetin",
      );
      setHtmlContent(cleanHtmlResponse(res.message));
    } catch (e) {
      console.error(e);
    } finally {
      setHtmlLoading(false);
    }
  };

  function cleanHtmlResponse(response: string): string {
    return response
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
  }

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
                  Content Creator
                </h2>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                  {agentDetails.name}
                </span>
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
                <p>
                  Start a conversation with {agentDetails.emoji}{" "}
                  {agentDetails.name}!
                </p>
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
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleVisualize}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-400"
                  title="Visualize last response"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    preview
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Visualization Section */}
        <section
          className={`hidden md:flex flex-1 flex-col bg-slate-50 dark:bg-background-dark h-full overflow-hidden relative transition-colors duration-200 ${htmlContent && isMobile ? "!flex w-full absolute inset-0 z-30" : ""}`}
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
                <div className="flex items-center gap-1.5 text-[11px] text-green-600 dark:text-green-400 ml-0.5 mt-0.5 font-medium">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${htmlLoading ? "bg-yellow-500" : "bg-green-500"} animate-pulse`}
                  ></span>
                  <span>
                    {htmlLoading ? "Generating..." : "Agent 2: Display Updated"}
                  </span>
                </div>
              </div>
            </div>
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
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth">
            <div className="max-w-4xl mx-auto bg-white dark:bg-dark-surface rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-200 dark:border-dark-border min-h-[800px] p-10 md:p-16 relative transition-all">
              {htmlLoading ? (
                <div className="flex flex-col items-center justify-center p-20 text-gray-400">
                  <span className="material-symbols-outlined text-6xl animate-spin mb-4">
                    settings
                  </span>
                  <p>Generating visual content...</p>
                </div>
              ) : htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              ) : (
                <div className="text-center text-gray-400 py-20">
                  <p className="mb-4">No content generated yet.</p>
                  <p className="text-sm">
                    Ask the agent to explain a concept, then click the eye icon
                    or "Update" button.
                  </p>
                  <div className="mt-8 opacity-50 pointer-events-none filter blur-sm select-none">
                    {/* Placeholder visual */}
                    <div className="border-b pb-4 mb-4">
                      <h1 className="text-4xl font-bold mb-4">
                        The Uncertainty Principle
                      </h1>
                      <p>Understanding the fundamental limits...</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center">
                      <div className="text-5xl font-serif italic mb-4">
                        Δx · Δp ≥ ℏ/2
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
