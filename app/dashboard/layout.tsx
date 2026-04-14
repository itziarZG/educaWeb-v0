import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import ChildSelector from '@/components/ChildSelector';

interface Child {
  id: string;
  name: string;
  avatar_url?: string;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch children for the child selector
  let childrenList: Child[] = [];
  if (user) {
    const { data, error } = await supabase
      .from('children')
      .select('id, name')
      .eq('user_id', user.id)
      .order('name');

    if (error) {
      // Error silencioso: no loguear en producción
      console.debug('Error fetching children:', error);
    } else if (data) {
      childrenList = data as Child[];
    }
  } else {
    // No user found - redirect should handle this in most cases
  }

  const userEmail = user?.email || 'usuario@tutoraiapp.es';
  const userName = userEmail.split('@')[0];
  const avatarUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC5zGeI8vlgJgmGZi1GKbM8EMImTHbWxyYEhR4LEXoLsQVFH39OpffvFFxtatVCeaiAqQ4wAEUeKG4YsZjWs1biv6feuIXFa65iySSaVTel4BGtDlWqbQSqW0sbLZiyVuXpDpnBuyjShRa1AAHfj3HxbRDmY8r-7VIkoosEoKPa-YcZj8IkAoikgBu1HwJZF08qPi8ly4CYOdDrJEg2rX72BsJj9IP-MegEwBsXmYQ5yloigMW8hoH7pQGdRVwU3Yln_XL65Dy894Q';

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-white transition-colors duration-200 overflow-hidden">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface shadow-sm z-20">
        {/* Links */}
        <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
          {/* PRINCIPAL */}
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Principal
          </p>
          <NavLink href="/dashboard" icon="home" label="Inicio" />
          <NavLink href="/dashboard/chat" icon="smart_toy" label="Chat" />

          <div className="my-2 border-t border-gray-100 dark:border-gray-800 opacity-50"></div>

          {/* PROGRESO - COMENTADO TEMPORALMENTE HASTA CORRECCIONES */}
          {/* 
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Progreso
          </p>
          <NavLink
            href="/dashboard/analytics"
            icon="monitoring"
            label="Analíticas"
          />
          <NavLink
            href="/dashboard/worksheets"
            icon="history"
            label="Worksheets"
          />

          <div className="my-2 border-t border-gray-100 dark:border-gray-800 opacity-50"></div>
          */}

          {/* CUENTA */}
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Cuenta
          </p>
          <NavLink href="/dashboard/profile" icon="person" label="Profile" />
          <Link
            href="/dashboard/create-child"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-highlight hover:text-primary dark:hover:text-primary transition-all font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">
              person_add
            </span>
            <span className="text-sm">Crear Estudiante</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header (Visible on small screens) */}
        <header className="lg:hidden flex h-16 items-center justify-between px-4 bg-white dark:bg-dark-surface border-b border-gray-100 dark:border-gray-800 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <ChildSelector initialChildren={childrenList} />
            <Link href="/dashboard/profile">
              <div
                className="size-8 rounded-full bg-cover bg-center border border-gray-200"
                style={{ backgroundImage: `url("${avatarUrl}")` }}
              ></div>
            </Link>
            <button className="text-gray-500">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-hidden p-0 relative">
          <div className="max-w-7xl mx-auto w-full h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-highlight hover:text-primary dark:hover:text-primary transition-all font-medium"
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}
