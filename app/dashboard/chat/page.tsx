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
    .select('id, name, avatar_url')
    .eq('user_id', user.id)
    .order('name');

  if (error || !children || children.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No tienes estudiantes registrados
        </p>
        <Link
          href="/dashboard/create-child"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Crear estudiante
        </Link>
      </div>
    );
  }

  const childId = searchParams.childId;

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
              {child.avatar_url && (
                <img
                  src={child.avatar_url}
                  alt={child.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
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
