'use server';

import { createClient } from '@/utils/supabase/server';
import { ChildInfo } from '@/types/agents';

export async function getChildById(childId: string): Promise<ChildInfo | null> {
  const supabase = await createClient();
  const { data: childData, error } = await supabase
    .from('hijos')
    .select('*')
    .eq('id', childId)
    .single();

  if (error) {
    console.error('Error fetching child:', error);
    return null;
  }

  const child: ChildInfo = {
    id: childData.id,
    nombre: childData.nombre,
    edad: childData.edad,
    curso: childData.curso,
    gustos: childData.gustos,
    observaciones: childData.observaciones,
    perfilId: childData.perfil_id,
    systemPrompt: childData.system_prompt,
    comunidadAutonoma: childData.comunidad_autonoma,
  };

  return child;
}
