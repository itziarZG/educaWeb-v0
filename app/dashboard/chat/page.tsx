import ChatClient from './chat-client';
import { getChildById } from './actions';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ChatPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const childId = searchParams.childId;
  let initialChildInfo = null;

  if (typeof childId === 'string') {
    initialChildInfo = await getChildById(childId);
  }

  // Si NO hay childId, muestra mensaje inicial
  if (!childId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">
          smart_toy
        </span>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Chat
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Selecciona un estudiante desde el menú para comenzar
        </p>
      </div>
    );
  }

  return (
    <ChatClient
      initialChildInfo={initialChildInfo}
      systemPrompt={initialChildInfo?.systemPrompt}
    />
  );
}
