import Link from 'next/link';
import type { ChatMessage } from '@/types/agents';
export default function Sidebar({
  sidebarOpen,
  setMessages,
  agentDetails,
}: {
  sidebarOpen: boolean;
  setMessages: (messages: ChatMessage[]) => void;
  agentDetails: { name: string; emoji: string };
}) {
  return (
    <aside
      className={`${sidebarOpen ? 'flex' : 'hidden'} md:flex w-64 bg-white dark:bg-dark-surface border-r border-[#f0f2f4] dark:border-dark-border flex-col h-full shrink-0 transition-all duration-200`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: '24px' }}
            >
              school
            </span>
          </div>
          <Link
            href="/"
            className="text-[#111318] dark:text-gray-100 text-lg font-bold tracking-tight hover:opacity-80"
          >
            AI Tutor
          </Link>
        </div>
        <button
          onClick={() => setMessages([])}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-lg h-10 px-4 font-bold text-sm tracking-[0.015em] transition-all shadow-sm mb-6"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Session</span>
        </button>
        <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-1">
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Active
            </p>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#f0f2f4] dark:bg-dark-highlight cursor-pointer group">
              <span className="material-symbols-outlined text-gray-500 dark:text-gray-300 text-[20px] group-hover:text-primary transition-colors">
                chat_bubble
              </span>
              <p className="text-[#111318] dark:text-gray-200 text-sm font-medium truncate">
                {agentDetails.name}
              </p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-[#f0f2f4] dark:border-dark-border mt-2">
          <Link
            href="/profile"
            className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-[#f0f2f4] dark:hover:bg-dark-highlight/50 transition-colors text-left"
          >
            <div
              className="w-8 h-8 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAVFuNIGJSTQlpevLUk89g3Ny9KG1pySpB_9bV7J2rk2eeylwdRWhecVoSbYfcDuJyaI1mtmrpeu3AUwcDnDn0KRgQKdPpcvfgOLS3vkdVQgtcg4Nj1YX79eGYyf9E2HKdvGjnQa2MtOm_5HYqehjXXvf9P0SmoUrYnK1IRlC4sqjHFtiP8UQXI4MYzT-f2vse8Y914jzBheli7D47ireA7cVB9PiOxs-ubVjsCc3RzQVqoiOoFQT7hzgaN8LDRHxI8jPZN_pq6BlZU")',
              }}
            ></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#111318] dark:text-gray-100 truncate">
                Alex Student
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Pro Plan
              </p>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[20px]">
              settings
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
