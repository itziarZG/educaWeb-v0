import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@utils/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userEmail = user?.email || 'usuario@tutoraiapp.es';
  const userName = userEmail.split('@')[0];
  const avatarUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC5zGeI8vlgJgmGZi1GKbM8EMImTHbWxyYEhR4LEXoLsQVFH39OpffvFFxtatVCeaiAqQ4wAEUeKG4YsZjWs1biv6feuIXFa65iySSaVTel4BGtDlWqbQSqW0sbLZiyVuXpDpnBuyjShRa1AAHfj3HxbRDmY8r-7VIkoosEoKPa-YcZj8IkAoikgBu1HwJZF08qPi8ly4CYOdDrJEg2rX72BsJj9IP-MegEwBsXmYQ5yloigMW8hoH7pQGdRVwU3Yln_XL65Dy894Q';

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-white transition-colors duration-200 overflow-hidden">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2e20] shadow-sm z-20">
        {/* Brand */}
        <div className="flex h-16 items-center px-6 border-b border-gray-100 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo_tutorai.png"
              alt="TUTOR_AI Logo"
              width={32}
              height={32}
              className="object-contain mr-2"
            />
            <span className="text-xl font-bold tracking-tight">TUTOR_AI</span>
          </Link>
        </div>

        {/* Links */}
        <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Principal
          </p>
          <NavLink href="/dashboard" icon="home" label="Inicio" />
          <NavLink
            href="/dashboard/library"
            icon="library_books"
            label="Librería"
          />
          <NavLink
            href="/dashboard/virtual-world"
            icon="workspace_premium"
            label="Mundo Virtual"
          />
          <NavLink
            href="/dashboard/calendar"
            icon="calendar_today"
            label="Calendario"
          />

          <div className="my-2 border-t border-gray-100 dark:border-gray-800 opacity-50"></div>

          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Progreso
          </p>
          <NavLink
            href="/dashboard/analytics"
            icon="monitoring"
            label="Analíticas"
          />
          <NavLink
            href="/dashboard/worksheet"
            icon="assignment"
            label="Fichas Activas"
          />

          <div className="my-2 border-t border-gray-100 dark:border-gray-800 opacity-50"></div>
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Herramientas
          </p>
          <NavLink
            href="/dashboard/generator"
            icon="auto_awesome"
            label="Generador AI"
          />
          <NavLink
            href="/dashboard/teacher"
            icon="school"
            label="Panel Profesor"
          />
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <Link href="/dashboard/profile">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-[#102216] transition-colors cursor-pointer group">
              <div
                className="size-10 rounded-full bg-cover bg-center border-2 border-transparent group-hover:border-primary transition-all"
                style={{ backgroundImage: `url("${avatarUrl}")` }}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {userEmail}
                </p>
              </div>
              <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                settings
              </span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header (Visible on small screens) */}
        <header className="lg:hidden flex h-16 items-center justify-between px-4 bg-white dark:bg-[#1a2e20] border-b border-gray-100 dark:border-gray-800 z-10 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo_tutorai.png"
              alt="TUTOR_AI Logo"
              width={32}
              height={32}
              className="object-contain mr-2"
            />
          </Link>
          <div className="flex items-center gap-4">
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
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 relative">
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
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#102216] hover:text-primary dark:hover:text-primary transition-all font-medium"
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}
