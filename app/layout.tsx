import type React from 'react';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import { Providers } from '@/app/providers';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { createClient } from '@/utils/supabase/server';
const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tutoraiapp.es'),
  title: 'TUTOR_AI - Educación Personalizada',
  description:
    'Devuelve la calma a tus tardes. Actividades personalizadas que conectan los intereses de tu hijo con su curso.',
  generator: 'ItziarZG',
  keywords: [
    'educación',
    'IA',
    'tutor',
    'personalizado',
    'niños',
    'primaria',
    'secundaria',
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="es" suppressHydrationWarning className="light">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Tutor_AI" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body
        className={`${lexend.variable} font-display bg-background-light dark:bg-background-dark dark:bg-opacity-10 text-slate-900 dark:text-slate-100 selection:bg-primary/30 antialiased`}
        suppressHydrationWarning
      >
        <Providers initialUser={user}>
          <Header />
          <main className="w-full max-w-7xl mx-auto">{children}</main>
          <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-6">
            <div className="max-w-7xl mx-auto px-2 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo_tutorai.png"
                  alt="TUTOR_AI Logo"
                  width={32}
                  height={32}
                  className="object-contain mr-2"
                />
                <span className="text-[#111813] dark:text-white font-bold text-lg uppercase tracking-wider">
                  TUTOR_AI
                </span>
              </div>
              <nav className="flex gap-8">
                <Link
                  className="text-slate-500 hover:text-primary transition-colors text-sm"
                  href="/privacidad"
                >
                  Privacidad
                </Link>
                <Link
                  className="text-slate-500 hover:text-primary transition-colors text-sm"
                  href="/terminos"
                >
                  Términos
                </Link>
                <a
                  className="text-slate-500 hover:text-primary transition-colors text-sm"
                  href="mailto:contact@tutoraiapp.es"
                >
                  Contacto
                </a>
              </nav>
              <p className="text-slate-400 text-sm">
                © 2026 TUTOR_AI. Hecho con ❤️ para familias.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
