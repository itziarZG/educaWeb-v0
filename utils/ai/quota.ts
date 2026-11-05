import type { SupabaseClient } from '@supabase/supabase-js';

export type AgentQuotaResult = 'allowed' | 'exceeded' | 'unavailable';

/**
 * Consume una petición de la cuota de IA del usuario de la sesión.
 * Quien llama debe bloquear la petición si el resultado no es 'allowed':
 * sin poder comprobar la cuota, el coste de la IA no tendría límite.
 */
export async function consumeAgentQuota(
  supabase: SupabaseClient
): Promise<AgentQuotaResult> {
  const { data, error } = await supabase.rpc('consume_agent_quota');

  if (error) {
    console.error('Error al comprobar la cuota de IA:', error);
    return 'unavailable';
  }

  return data === true ? 'allowed' : 'exceeded';
}

export type CreditChargeResult = 'charged' | 'no_credits' | 'unavailable';

/**
 * Descuenta un crédito al usuario de la sesión en una sola operación.
 * Quien llama no debe entregar la ficha si el resultado no es 'charged'.
 */
export async function consumeCredit(
  supabase: SupabaseClient
): Promise<CreditChargeResult> {
  const { data, error } = await supabase.rpc('consume_credit');

  if (error) {
    console.error('Error al descontar crédito:', error);
    return 'unavailable';
  }

  return data === true ? 'charged' : 'no_credits';
}
