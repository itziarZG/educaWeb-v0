import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ChatClient from './chat-client';
import Link from 'next/link';
import { getChildById } from './actions';

interface Child {
  id: string;
  name: string;
  avatar_url?: string;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ChatPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch all children
  const { data: children, error } = await supabase
    .from('children')
    .select('id, name')
    .eq('user_id', user.id)
    .order('name');

  const childId = searchParams.childId;

  // Si hay error en la query o no hay children, muestra mensaje
  // (verifica esto ANTES de hacer llamadas adicionales)
  if (error || !children || children.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">
          smart_toy
        </span>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Sin estudiantes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Crea un estudiante desde la sección CUENTA para comenzar
        </p>
      </div>
    );
  }

  // Si hay un childId en la URL, obtén los datos completos y muestra el chat
  if (typeof childId === 'string') {
    const initialChildInfo = await getChildById(childId);
    if (initialChildInfo) {
      return <ChatClient initialChildInfo={initialChildInfo} />;
    }
  }

  // Si no, muestra grid de selección de perfiles
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Chat</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Selecciona un estudiante para comenzar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children.map((child) => (
          <Link
            key={child.id}
            href={`/dashboard/chat?childId=${child.id}`}
            className="p-6 rounded-xl bg-white dark:bg-dark-surface border-2 border-gray-200 dark:border-dark-border hover:border-primary dark:hover:border-primary transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-primary">
                  person
                </span>
              </div>
              <div>
                <h2 className="text-lg font-bold">{child.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ir al chat
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
