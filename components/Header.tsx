"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
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
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Hola,{" "}
                {user.user_metadata?.name ||
                  user.identities?.[0]?.identity_data?.name ||
                  "Usuario"}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-primary hover:bg-primary/90 text-[#111813] px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
              >
                Salir
              </button>
            </div>
          ) : (
            <>
              <Link
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="bg-primary hover:bg-primary/90 text-[#111813] px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
                href="/register"
              >
                Probar gratis
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
