'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function CreditosBadge() {
  const [credits, setCredits] = useState<number | null>(null);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setupSubscription = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 1. Carga inicial
        const { data } = await supabase
          .from('clients')
          .select('credits')
          .eq('id', user.id)
          .single();
        setCredits(data?.credits ?? 0);

        // 2. Suscripción a cambios
        channel = supabase
          .channel('realtime-clients-credits')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'clients',
              filter: `id=eq.${user.id}`,
            },
            (payload) => {
              setCredits(payload.new.credits);
            }
          )
          .subscribe((status) => {
            console.log('Estado suscripción créditos:', status);
          });
      }
    };

    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [supabase]);

  if (credits === null) return null; // Cargando...

  return (
    <div className="relative group flex flex-col items-center">
      <div
        className={`cursor-help px-3 py-1 rounded-full text-xs font-bold ${
          credits > 0
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}
      >
        {credits} 🪙
      </div>
      <div className="absolute top-full mt-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 text-center animate-in fade-in zoom-in-95 duration-200">
        <p>Estamos en Beta 🚀</p>
        <p className="mt-1 text-slate-300">
          Tienes {credits} fichas gratis de regalo para probar la magia.
        </p>
      </div>
    </div>
  );
}
