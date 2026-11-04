import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

// En Next.js 16 el fichero de middleware se llama proxy.ts (middleware.ts queda obsoleto).
// Se ejecuta antes de cada petición para refrescar la sesión de Supabase.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
