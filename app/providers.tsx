'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth-context';
import { ChildProvider } from '@/context/child-context';
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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider initialUser={initialUser} key={initialUser?.id}>
        <ChildProvider>{children}</ChildProvider>
      </AuthProvider>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
