import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Obtenemos la URL a la que Google nos ha redirigido
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    // Si hay un código, lo intercambiamos por una sesión de Supabase
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Una vez logueado, lo enviamos al panel principal de la app
  return NextResponse.redirect(
    new URL('/dashboard/select-profile', request.url)
  );
}
