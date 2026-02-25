'use server';

import { createClient } from '@/utils/supabase/server';
import { ChildInfo } from '@/types/agents';

export async function getChildById(childId: string): Promise<ChildInfo | null> {
  const supabase = await createClient();
  const { data: childData, error } = await supabase
    .from('children')
    .select('*')
    .eq('id', childId)
    .single();

  if (error) {
    console.error('Error fetching child:', error);
    return null;
  }

  const child: ChildInfo = {
    id: childData.id,
    name: childData.name,
    age: childData.age,
    grade: childData.grade,
    interests: childData.interests,
    observations: childData.observations,
    userId: childData.user_id,
    systemPrompt: childData.system_prompt,
    region: childData.region,
  };

  return child;
}
