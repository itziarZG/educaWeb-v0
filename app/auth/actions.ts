'use server';

import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error al registrarse:', error.message);
    return { error: error.message };
  }

  return { success: true, user: data.user };
}
export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error al iniciar sesión:', error.message);
    return { error: error.message };
  }
  return { success: true, user: data.user };
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}
