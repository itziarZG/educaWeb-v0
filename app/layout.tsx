import type React from "react";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tutoraiapp.es"),
  title: "TUTOR_AI - Educación Personalizada",
  description:
    "Devuelve la calma a tus tardes. Actividades personalizadas que conectan los intereses de tu hijo con su curso.",
  generator: "ItziarZG",
  keywords: [
    "educación",
    "IA",
    "tutor",
    "personalizado",
    "niños",
    "primaria",
    "secundaria",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="light">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </head>
      <body
        className={`${lexend.variable} font-display bg-background-light dark:bg-background-dark dark:bg-opacity-10 text-slate-900 dark:text-slate-100 selection:bg-primary/30 antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo_tutorai.png"
                  alt="TUTOR_AI Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h2 className="text-[#111813] dark:text-white text-lg font-bold leading-tight tracking-tight">
                  TUTOR_AI
                </h2>
              </div>
              <div className="flex items-center gap-6">
                <a
                  className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                  href="/login"
                >
                  Login
                </a>
                <a
                  className="bg-primary hover:bg-primary/90 text-[#111813] px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
                  href="/register"
                >
                  Probar gratis
                </a>
              </div>
            </div>
          </header>
          <main className="w-full">{children}</main>
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
                <a
                  className="text-slate-500 hover:text-primary transition-colors text-sm"
                  href="#"
                >
                  Privacidad
                </a>
                <a
                  className="text-slate-500 hover:text-primary transition-colors text-sm"
                  href="#"
                >
                  Términos
                </a>
                <a
                  className="text-slate-500 hover:text-primary transition-colors text-sm"
                  href="mailto:contact@tutoraiapp.es"
                >
                  Contacto
                </a>
                <a
                  className="text-slate-500 hover:text-primary transition-colors text-sm"
                  href="#"
                >
                  Blog
                </a>
              </nav>
              <p className="text-slate-400 text-sm">
                © 2026 TUTOR_AI. Hecho con ❤️ para familias.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
