import { ChatMessage, ChildInfo } from '@/types/agents';
import { RefObject } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  loading: boolean;
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  childInfo: ChildInfo | null;
  toggleSidebar: () => void;
  isMobile: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onVisualize: () => void; // Mobile only
  htmlLoading: boolean; // For mobile visualize button state
  topic: string;
  setTopic: (value: string) => void;
  showTopicCustom: boolean;
  setShowTopicCustom: (value: boolean) => void;
}

export default function ChatInterface({
  messages,
  loading,
  input,
  setInput,
  handleSubmit,
  childInfo,
  toggleSidebar,
  messagesEndRef,
  onVisualize,
  htmlLoading,
  isMobile,
  topic,
  setTopic,
  showTopicCustom,
  setShowTopicCustom,
}: ChatInterfaceProps) {
  return (
    <>
      <div className="h-16 shrink-0 border-b border-[#f0f2f4] dark:border-dark-border flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            edit_note
          </span>
          <div className="flex flex-col">
            <h2 className="font-bold text-sm text-[#111318] dark:text-gray-100">
              Creador de fichas {childInfo ? `para ${childInfo.name}` : ''}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <button
              onClick={onVisualize}
              disabled={htmlLoading || messages.length === 0}
              className={`p-2 rounded-full transition-colors ${
                htmlLoading || messages.length === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-primary hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
              }`}
              title="Visualize"
            >
              <span
                className={`material-symbols-outlined ${
                  htmlLoading ? 'animate-spin' : ''
                }`}
              >
                {htmlLoading ? 'sync' : 'preview'}
              </span>
            </button>
          </div>
          <div className="md:hidden" onClick={toggleSidebar}>
            <span className="material-symbols-outlined text-gray-400">
              menu_open
            </span>
          </div>
          <button
            onClick={() => (window.location.href = '/dashboard/chat')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-highlight transition-colors text-sm"
            title="Cambiar estudiante"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            <span className="hidden sm:inline">Cambiar est.</span>
          </button>
        </div>
      </div>

      {/* Topic Selector */}
      <div className="px-4 lg:px-6 py-3 border-b border-[#f0f2f4] dark:border-dark-border bg-gray-50 dark:bg-dark-highlight">
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Tema de hoy
        </label>
        <div className="flex gap-2 items-start">
          <select
            value={showTopicCustom ? 'otros' : topic}
            onChange={(e) => {
              if (e.target.value === 'otros') {
                setShowTopicCustom(true);
                setTopic('');
              } else {
                setShowTopicCustom(false);
                setTopic(e.target.value);
              }
            }}
            className="flex-1 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg text-sm p-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-gray-800 dark:text-gray-200"
          >
            <option value="Matemáticas">Matemáticas</option>
            <option value="Ciencias">Ciencias</option>
            <option value="Lenguaje">Lenguaje</option>
            <option value="Historia">Historia</option>
            <option value="Inglés">Inglés</option>
            <option value="Artes">Artes</option>
            <option value="Educación Física">Educación Física</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        {showTopicCustom && (
          <input
            type="text"
            placeholder="Especifica el tema..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full mt-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg text-sm p-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background-light dark:bg-background-dark">
        {messages.length === 0 && (
          <div className="text-center text-gray-600  dark:text-gray-300 mt-10">
            <p>Inicia una conversación con el agente.</p>
            <p>Pide que te ayude a crear una ficha educativa.</p>
            <p>
              {' '}
              Itera las veces que te haga falta hasta que creas que el contenido
              es adecuado para la ficha de hoy y luego{' '}
              {isMobile
                ? 'pulsa el icono de visualizar(arriba)'
                : 'dale al botón de visualizar'}{' '}
              para darle forma y color.{' '}
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'assistant' ? (
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
              className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}
            >
              <span
                className={`text-xs font-semibold text-gray-500 ${msg.role === 'user' ? 'mr-1' : 'ml-1'}`}
              >
                {msg.role === 'assistant' ? 'Agent' : 'You'}
              </span>
              <div
                className={`${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white dark:bg-dark-surface dark:text-gray-200 border border-gray-100 dark:border-dark-border rounded-tl-none'
                } 
                        p-3 rounded-xl shadow-sm text-sm leading-relaxed`}
              >
                <p>{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div role="status" aria-live="polite">
            <span className="sr-only">
              El asistente está generando una respuesta…
            </span>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  sync
                </span>
              </div>
              <div className="flex-1 space-y-2">
                <Skeleton className="h-10 w-3/4 rounded-xl rounded-tl-none" />
                <Skeleton className="h-4 w-1/4 rounded-lg" />
              </div>
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
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="w-full bg-gray-50 dark:bg-dark-highlight border-gray-200 dark:border-dark-border/50 rounded-xl text-sm p-3 pr-12 focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none placeholder-gray-400 text-gray-800 dark:text-gray-200 shadow-sm transition-all outline-none"
            placeholder="Escribe lo que quieras..."
            rows={3}
            disabled={loading}
          ></textarea>
          <button
            onClick={() => handleSubmit()}
            disabled={loading || !input.trim()}
            className="absolute bottom-2 right-2 p-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </>
  );
}
