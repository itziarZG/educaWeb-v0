'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth-context';
import { Toaster } from 'sonner';

import { User } from '@supabase/supabase-js';

export function Providers({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) {
  return (
    <AuthProvider initialUser={initialUser} key={initialUser?.id}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster richColors position="top-center" />
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
