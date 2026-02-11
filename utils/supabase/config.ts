export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

if (!supabaseConfig.url || !supabaseConfig.key) {
  throw new Error("Faltan variables de entorno de Supabase");
}
